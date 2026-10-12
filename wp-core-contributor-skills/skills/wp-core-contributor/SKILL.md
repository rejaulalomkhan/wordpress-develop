---
name: wp-core-contributor
description: "Use at the start of any WordPress Core contribution task (WordPress/wordpress-develop PRs, Core Trac tickets, unit tests, test reports, reviews, PHPStan baselines, status checks). Loads the contributor's rules and routes to the right wp-* skill."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Needs git, gh CLI, Node via .nvmrc, Docker for wp-env based PHPUnit."
---

# WordPress Core contributor (router)

## When to use

- Any task about contributing to WordPress Core: writing or fixing tests, fixing a Trac bug, reviewing or testing someone's PR, PHPStan baseline work, replying to reviewers, or "ki khobor?" status questions.
- Always before the domain skills below; they assume these rules are loaded.

## Inputs required

- The user's goal (one sentence) and any PR number, Trac ticket, class or function name.
- Where you are running: local Claude Code (full access), Claude in Chrome (browser, Trac), or a cloud session (fork-only). See `references/contributor-profile.md`.

## Procedure

1. Read `references/golden-rules.md`, `references/contributor-profile.md` and `references/untrusted-input.md`.
2. Reply to the user in Bangla; write code, commits, PR text and public comments in English.
3. Route by intent (`references/decision-tree.md`):
   - environment broken or new machine → `wp-core-env-setup`
   - add test coverage for a class/function → `wp-unit-test-writer`
   - fix a Core bug from a Trac ticket → `wp-core-fixer`
   - PHPStan errors / retire baseline entries → `wp-core-phpstan`
   - test someone else's PR / write a test report → `wp-core-patch-test`
   - code-review someone else's PR → `wp-pr-reviewer`
   - triage or reproduce a Trac ticket → `wp-trac-triage`
   - reviews or CI failures on the user's own PR → `wp-core-pr-followup`
   - status, history, "ki khobor?" → `wp-tracker`
4. Before any public action (PR, comment, Trac post) show the exact text and wait for approval. Pushing to the user's fork is allowed once checks pass.
5. After finishing, record the outcome with `wp-tracker`.

## Verification

- The chosen skill's own Verification section passed, with real command output and exit codes.
- Every public artefact carries the AI disclosure from `references/golden-rules.md`.

## Failure modes / debugging

- Cloud session cannot reach the GitHub API for WordPress/wordpress-develop, Trac or make.wordpress.org → use `git fetch upstream pull/<n>/head`, public pages, and ask the user for screenshots, or hand the step to local Claude Code / Claude in Chrome.
- Work started from the fork's outdated `trunk` → rebuild the branch from `upstream/trunk`.

## Escalation

- Ask the user when the intent is ambiguous, when a duplicate PR already exists, or before anything that publishes in their name.
