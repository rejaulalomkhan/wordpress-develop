#!/usr/bin/env node
// Lists PHP classes declared under a source directory of wordpress-develop and
// counts how many files under tests/phpunit reference each class name.
//
// Usage (from the wordpress-develop root):
//   node find_untested.mjs src/wp-includes/widgets [--json]
//
// Output is sorted by reference count, so classes with 0 references (no tests)
// come first. A non-zero count does not prove the class is well tested.
// Size columns help pick medium/complex scopes: lines, methods and branch
// keywords (if/elseif/case/?:/&&/||/foreach/while) in the declaring file.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const json = args.includes("--json");
const target = args.find((a) => !a.startsWith("--"));

if (!target) {
  console.error("Usage: node find_untested.mjs <src-directory> [--json]");
  process.exit(2);
}

const root = process.cwd();
const srcDir = path.resolve(root, target);
const testsDir = path.resolve(root, "tests/phpunit");

if (!fs.existsSync(srcDir) || !fs.existsSync(testsDir)) {
  console.error("Run this from the wordpress-develop root; directory not found.");
  process.exit(2);
}

function walk(dir, ext, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, ext, out);
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

const classRe = /^\s*(?:final\s+|abstract\s+)*class\s+([A-Za-z_][A-Za-z0-9_]*)/gm;
function size(code) {
  const lines = code.split("\n").length;
  const methods = (code.match(/\bfunction\s+[A-Za-z_]/g) || []).length;
  const branches = (code.match(/\b(if|elseif|case|foreach|for|while)\b|\?\s|&&|\|\|/g) || []).length;
  const level = branches >= 60 || lines >= 600 ? "complex" : branches >= 15 || lines >= 150 ? "medium" : "small";
  return { lines, methods, branches, level };
}

const classes = [];
for (const file of walk(srcDir, ".php")) {
  const code = fs.readFileSync(file, "utf8");
  for (const m of code.matchAll(classRe)) {
    classes.push({ name: m[1], file: path.relative(root, file).split(path.sep).join("/"), ...size(code) });
  }
}

const testFiles = walk(testsDir, ".php").map((f) => fs.readFileSync(f, "utf8"));
const results = classes.map((c) => {
  const re = new RegExp(`\\b${c.name}\\b`);
  return { ...c, testFiles: testFiles.filter((t) => re.test(t)).length };
});
results.sort((a, b) => a.testFiles - b.testFiles || a.name.localeCompare(b.name));

if (json) {
  console.log(JSON.stringify({ tool: "find_untested", source: target, classes: results }, null, 2));
} else {
  console.log("tests  size     lines  methods  branches  class (file)");
  for (const r of results) {
    console.log(
      `${String(r.testFiles).padStart(5)}  ${r.level.padEnd(7)}  ${String(r.lines).padStart(5)}  ${String(r.methods).padStart(7)}  ${String(r.branches).padStart(8)}  ${r.name} (${r.file})`
    );
  }
}
