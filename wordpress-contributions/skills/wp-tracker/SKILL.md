---
name: wp-tracker
description: "Use when the user asks about the status of their WordPress Core contributions (\"ki khobor?\"), wants a summary of PRs, reviews, test reports, Trac comments, props or planned scopes, or after any contribution to record it in this repository's data/ files and regenerate CONTRIBUTIONS.md."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Needs gh CLI logged in as the contributor, git with an upstream remote, node, and optionally the WordPress Trac MCP for Trac activity."
---

# Contribution tracker

## When to use

- "ki khobor?", "status of my PRs?", "any new comments?", "check all PRs for changes or merge conflicts".
- After a PR, review, test report, Trac comment or props — to record it.

## Inputs required

- GitHub username (default `rejaulalomkhan`) and Trac username (ask once if unknown).
- This contributions repository (data lives in `data/`, schema in `references/data-schema.md`).

## Procedure

1. **Collect PRs** (deterministic): `node <this-skill>/scripts/status.mjs --author rejaulalomkhan` → state, CI, mergeability, review decision, human comments.
2. **Trac activity**: Trac MCP `getTimeline` with `author` = the user's Trac username (last 7–30 days) and `getTicket` for tickets in `data/`.
3. **Landed / props**: `git fetch upstream trunk`; `git log upstream/trunk --grep "#<ticket>"` and look for the user's name in `Props` lines; add matches to `data/props.json`.
4. **Act on signals**: new review comments or red CI → `wp-core-pr-followup`; merge conflict → merge (no force-push) after asking; "out-of-date but cleanly mergeable" → nothing.
5. **Record**: update `data/prs.json`, `reviews.json`, `test-reports.json`, `trac-comments.json`, `props.json`, `scopes.json` (fields in `references/data-schema.md`).
6. **Rebuild and check**: `npm run dashboard` then `npm run check`; commit `data/` and `CONTRIBUTIONS.md` together ("Tracker: …").
7. **Report** in Bangla: a short table (item, state, CI, last activity, next action) plus counts of reviews, test reports and props.

## Verification

- Every open PR from `gh pr list` appears in `data/prs.json` and the report.
- `npm run check` prints `✓ data valid and CONTRIBUTIONS.md up to date.`

## Failure modes / debugging

- `gh` not logged in → ask the user to run `gh auth login` (never ask for a token in chat).
- Cloud session without GitHub API for WordPress/wordpress-develop → `git ls-remote upstream refs/pull/<n>/head`, public pages, and the user's screenshots.
- Trac MCP unavailable → `node <wp-trac-triage skill>/scripts/trac.mjs timeline --author <user>` or ask the user.

## Escalation

- Long silence on a PR (about two weeks) → suggest one polite Trac comment; never spam pings.
