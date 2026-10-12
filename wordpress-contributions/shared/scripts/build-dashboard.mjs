#!/usr/bin/env node
// Builds CONTRIBUTIONS.md (a readable dashboard) from the JSON files in data/.
//
// Usage:
//   node shared/scripts/build-dashboard.mjs          write CONTRIBUTIONS.md
//   node shared/scripts/build-dashboard.mjs --check  validate data and fail if CONTRIBUTIONS.md is stale

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dataDir = path.join(root, "data");
const outFile = path.join(root, "CONTRIBUTIONS.md");
const check = process.argv.includes("--check");

const SCHEMA = {
  "prs.json": ["number", "repo", "title", "state", "url"],
  "reviews.json": ["number", "repo", "date", "summary"],
  "test-reports.json": ["ticket", "target", "where", "status", "date", "summary"],
  "trac-comments.json": ["ticket", "date", "summary"],
  "props.json": ["changeset", "ticket", "date"],
  "scopes.json": ["scope", "status"],
};

const problems = [];
const data = {};
for (const [file, required] of Object.entries(SCHEMA)) {
  const full = path.join(dataDir, file);
  if (!fs.existsSync(full)) {
    problems.push(`data/${file}: missing`);
    data[file] = [];
    continue;
  }
  let rows;
  try {
    rows = JSON.parse(fs.readFileSync(full, "utf8"));
  } catch (e) {
    problems.push(`data/${file}: invalid JSON (${e.message})`);
    data[file] = [];
    continue;
  }
  if (!Array.isArray(rows)) {
    problems.push(`data/${file}: must be an array`);
    rows = [];
  }
  rows.forEach((row, i) => {
    for (const key of required) {
      if (row[key] === undefined || row[key] === "") problems.push(`data/${file}[${i}]: missing "${key}"`);
    }
  });
  data[file] = rows;
}

const cell = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const table = (headers, rows) =>
  rows.length
    ? [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`)].join("\n")
    : "_None yet._";
const trac = (n) => (n ? `[#${n}](https://core.trac.wordpress.org/ticket/${n})` : "");
const byDateDesc = (a, b) => String(b.date || b.updated || b.opened || "").localeCompare(String(a.date || a.updated || a.opened || ""));

const prs = [...data["prs.json"]].sort((a, b) => b.number - a.number);
const count = (state) => prs.filter((p) => p.state === state).length;
const merged = count("merged");

const md = `# WordPress contributions — rejaulalomkhan

> Generated from \`data/*.json\` by \`npm run dashboard\`. Edit the data, not this file.

## Summary

| PRs open | PRs merged/committed | PRs closed | Reviews | Test reports | Trac comments | Props |
|---|---|---|---|---|---|---|
| ${count("open")} | ${merged} | ${count("closed")} | ${data["reviews.json"].length} | ${data["test-reports.json"].length} | ${data["trac-comments.json"].length} | ${data["props.json"].length} |

## Pull requests

${table(
  ["PR", "Title", "Ticket", "State", "CI", "Notes"],
  prs.map((p) => [`[#${p.number}](${p.url})`, p.title, trac(p.ticket), p.state, p.ci || "", p.notes || ""])
)}

## Reviews given

${table(
  ["PR", "Date", "Summary"],
  [...data["reviews.json"]].sort(byDateDesc).map((r) => [`[#${r.number}](https://github.com/${r.repo}/pull/${r.number})`, r.date, r.summary])
)}

## Test reports

${table(
  ["Ticket", "Target", "Where", "Status", "Date", "Summary"],
  [...data["test-reports.json"]].sort(byDateDesc).map((r) => [trac(r.ticket), r.target, r.where, r.status, r.date, r.summary])
)}

## Trac comments

${table(
  ["Ticket", "Date", "Summary"],
  [...data["trac-comments.json"]].sort(byDateDesc).map((r) => [r.url ? `[#${r.ticket}](${r.url})` : trac(r.ticket), r.date, r.summary])
)}

## Props received

${table(
  ["Changeset", "Ticket", "Date"],
  [...data["props.json"]].sort(byDateDesc).map((r) => [`[r${r.changeset}](https://core.trac.wordpress.org/changeset/${r.changeset})`, trac(r.ticket), r.date])
)}

## Scopes (planned work)

${table(
  ["Scope", "Ticket", "Size", "Status", "Notes"],
  data["scopes.json"].map((s) => [s.scope, trac(s.ticket), s.size || "", s.status, s.notes || ""])
)}
`;

if (check) {
  const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
  if (current !== md) problems.push("CONTRIBUTIONS.md is out of date; run `npm run dashboard`");
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

if (check) {
  console.log("✓ data valid and CONTRIBUTIONS.md up to date.");
} else {
  fs.writeFileSync(outFile, md);
  console.log(`✓ wrote ${path.relative(root, outFile)}`);
}
