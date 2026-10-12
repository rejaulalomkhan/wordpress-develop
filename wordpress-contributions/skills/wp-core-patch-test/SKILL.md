---
name: wp-core-patch-test
description: "Use when testing someone else's WordPress Core PR or Trac patch and writing a Test Team style Patch Testing (or Bug Reproduction) report: run the PR's tests, prove they fail without the fix, cross-test competing PRs, manual Playground testing for UI changes, and a short factual report."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Needs the wp-env PHPUnit setup; a browser (Claude in Chrome or the user) for UI/Playground testing."
---

# Patch testing (WordPress Core)

## When to use

- "Test this PR", "give a test report", or a Trac ticket with `needs-testing` / a patch attached.
- Two PRs target one ticket and the committer needs a comparison.

## Inputs required

- PR number(s) or Trac ticket + patch.
- Whether the change is code-only (unit tests) or UI (needs a browser, before/after screenshots).

## Procedure

1. Read the full diff and the Trac ticket (Trac MCP `getTicket`, fallback `wp-trac-triage/scripts/trac.mjs`). Note what the PR claims to fix and what testers already reported.
2. `git fetch upstream pull/<n>/head:pr-<n>`; work on a detached checkout, never on the user's branches.
3. Unit-tested changes:
   - Run the PR's test file: single site, multisite, `--order-by=reverse`, and the related group.
   - Prove the test catches the bug: run the new tests on trunk code (or with the fix reverted) → they must fail.
   - Optional mutation: break the fixed code → a test fails → restore.
   - PHP-version-sensitive code: also run on PHP 8.5.
4. Competing PRs on one ticket: run each fix against both PRs' tests (`references/cross-testing.md`).
5. UI changes: use the PR's Playground link or a local env; capture before/after screenshots (user or Claude in Chrome).
6. Decide whether a report adds value. Trivially correct and already tested by others → tell the user, don't post.
7. Draft the report from `references/report-template.md`: short, factual, environment filled from real values (`src/wp-includes/version.php`, `php -v`, DB version). Prefer the Trac ticket; never post the same report in two places.
8. Approval gate: show the exact text, wait, then post (user or Claude in Chrome). Log it with `wp-tracker`.

## Verification

- Results table: trunk vs PR for each test/data set, with exit codes.
- The report's Environment matches the machine that actually ran the tests.
- `git status` clean afterwards; any files restored.

## Failure modes / debugging

- New test file doesn't exist on trunk → `git checkout HEAD -- <file>` fails during cleanup; delete the file instead and verify `git status`.
- A filter like `--filter <name>` matches nothing → the run "passes" with few tests; check the test count.
- Tests depend on order → rerun with `--order-by=reverse` and in the full group before reporting.

## Escalation

- The PR fixes the symptom but the test shows a remaining case (e.g. `search` fixed, `name__like` not) → report facts only; let authors and committers decide.
- Security issues found while testing → don't post publicly; tell the user to use the security reporting channel.
