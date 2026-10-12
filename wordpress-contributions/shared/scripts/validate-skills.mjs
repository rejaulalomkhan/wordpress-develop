#!/usr/bin/env node
// Structural validator for this skills repository.
// Checks every skills/<name>/SKILL.md for frontmatter, required sections,
// existing local references/scripts, and eval coverage.
//
// Usage: node shared/scripts/validate-skills.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillsDir = path.join(root, "skills");
const scenariosDir = path.join(root, "eval/scenarios");
const REQUIRED_SECTIONS = [
  "When to use",
  "Inputs required",
  "Procedure",
  "Verification",
  "Failure modes / debugging",
  "Escalation",
];

const errors = [];
const err = (msg) => errors.push(msg);

function frontmatter(md) {
  const lines = md.split("\n");
  if (lines[0].trim() !== "---") return null;
  const end = lines.indexOf("---", 1);
  if (end === -1) return null;
  const meta = {};
  for (const line of lines.slice(1, end)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return meta;
}

const skills = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (!skills.length) err("No skills found under skills/");

for (const name of skills) {
  const dir = path.join(skillsDir, name);
  const file = path.join(dir, "SKILL.md");
  const rel = path.relative(root, file);
  if (!fs.existsSync(file)) {
    err(`${rel}: missing`);
    continue;
  }
  const md = fs.readFileSync(file, "utf8");
  const fm = frontmatter(md);
  if (!fm) {
    err(`${rel}: missing YAML frontmatter`);
    continue;
  }
  if (fm.name !== name) err(`${rel}: frontmatter name "${fm.name}" must equal directory "${name}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) err(`${rel}: invalid skill name`);
  if (!fm.description) err(`${rel}: missing description`);
  else if (fm.description.length > 1024) err(`${rel}: description longer than 1024 chars`);
  if (!fm.compatibility) err(`${rel}: missing compatibility`);
  else if (!fm.compatibility.includes("WordPress 7.0") || !fm.compatibility.includes("PHP 7.4.0"))
    err(`${rel}: compatibility must mention "WordPress 7.0" and "PHP 7.4.0"`);

  for (const section of REQUIRED_SECTIONS) {
    if (!md.includes(`## ${section}`)) err(`${rel}: missing section "## ${section}"`);
  }

  // Local references/scripts mentioned in backticks must exist in this skill.
  for (const m of md.matchAll(/`((?:references|scripts)\/[A-Za-z0-9_.\-/]+)`/g)) {
    if (!fs.existsSync(path.join(dir, m[1]))) err(`${rel}: referenced file not found: ${m[1]}`);
  }
  // Cross-skill references like `other-skill/references/x.md` must exist too.
  for (const m of md.matchAll(/`([a-z0-9-]+)\/((?:references|scripts)\/[A-Za-z0-9_.\-/]+)`/g)) {
    if (!fs.existsSync(path.join(skillsDir, m[1], m[2]))) err(`${rel}: cross-skill file not found: ${m[1]}/${m[2]}`);
  }

  const lineCount = md.split("\n").length;
  if (lineCount > 150) err(`${rel}: ${lineCount} lines; keep SKILL.md short and move depth into references/`);
}

// Eval coverage.
const covered = new Set();
if (!fs.existsSync(scenariosDir)) err("eval/scenarios missing");
else {
  for (const f of fs.readdirSync(scenariosDir).filter((f) => f.endsWith(".json"))) {
    let s;
    try {
      s = JSON.parse(fs.readFileSync(path.join(scenariosDir, f), "utf8"));
    } catch (e) {
      err(`eval/scenarios/${f}: invalid JSON (${e.message})`);
      continue;
    }
    for (const key of ["name", "skills", "query", "expected_behavior", "success_criteria"]) {
      if (!(key in s)) err(`eval/scenarios/${f}: missing "${key}"`);
    }
    for (const sk of s.skills || []) {
      if (!skills.includes(sk)) err(`eval/scenarios/${f}: unknown skill "${sk}"`);
      covered.add(sk);
    }
  }
}
for (const name of skills) if (!covered.has(name)) err(`skills/${name}: no eval scenario references it`);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${skills.length} skills valid, all covered by eval scenarios.`);
