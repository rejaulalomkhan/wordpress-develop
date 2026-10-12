#!/usr/bin/env node
// Prints the status of a contributor's pull requests on WordPress/wordpress-develop
// using the GitHub CLI (`gh`), which must be installed and logged in.
//
// Usage:
//   node status.mjs [--author <login>] [--repo <owner/name>] [--limit <n>] [--json]

import { execFileSync } from "node:child_process";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const author = arg("author", "rejaulalomkhan");
const repo = arg("repo", "WordPress/wordpress-develop");
const limit = arg("limit", "30");
const asJson = process.argv.includes("--json");

function gh(args) {
  try {
    return execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    const msg = (error.stderr || error.message || "").toString().trim();
    console.error(`gh ${args.slice(0, 2).join(" ")} failed: ${msg}`);
    console.error("Check `gh auth status`. Never paste tokens into chat.");
    process.exit(1);
  }
}

const fields = [
  "number",
  "title",
  "state",
  "isDraft",
  "mergeable",
  "reviewDecision",
  "updatedAt",
  "url",
  "statusCheckRollup",
  "comments",
  "reviews",
].join(",");

const prs = JSON.parse(
  gh(["pr", "list", "--repo", repo, "--author", author, "--state", "all", "--limit", limit, "--json", fields])
);

function ciSummary(rollup = []) {
  const counts = { success: 0, failure: 0, pending: 0, skipped: 0 };
  for (const c of rollup) {
    const v = (c.conclusion || c.state || c.status || "").toUpperCase();
    if (["SUCCESS", "NEUTRAL"].includes(v)) counts.success++;
    else if (["FAILURE", "ERROR", "TIMED_OUT", "CANCELLED", "ACTION_REQUIRED", "STARTUP_FAILURE"].includes(v)) counts.failure++;
    else if (v === "SKIPPED") counts.skipped++;
    else counts.pending++;
  }
  const state = counts.failure ? "red" : counts.pending ? "pending" : rollup.length ? "green" : "none";
  return { state, ...counts };
}

const rows = prs.map((pr) => {
  const others = [...(pr.comments || []), ...(pr.reviews || [])].filter(
    (c) => c.author && c.author.login !== author && !/\[bot\]$|^github-actions$/.test(c.author.login)
  );
  const last = others
    .map((c) => c.submittedAt || c.createdAt)
    .filter(Boolean)
    .sort()
    .pop();
  return {
    number: pr.number,
    title: pr.title,
    state: pr.isDraft ? "DRAFT" : pr.state,
    ci: ciSummary(pr.statusCheckRollup),
    mergeable: pr.mergeable,
    reviewDecision: pr.reviewDecision || "",
    humanComments: others.length,
    lastHumanActivity: last || "",
    updatedAt: pr.updatedAt,
    url: pr.url,
  };
});

if (asJson) {
  console.log(JSON.stringify({ tool: "wp-tracker-status", author, repo, prs: rows }, null, 2));
} else {
  for (const r of rows) {
    console.log(
      `#${r.number} [${r.state}] CI:${r.ci.state} merge:${r.mergeable} review:${r.reviewDecision || "-"} ` +
        `comments:${r.humanComments} last:${r.lastHumanActivity || "-"}\n    ${r.title}`
    );
  }
}
