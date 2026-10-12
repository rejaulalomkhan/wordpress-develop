---
name: wp-tracker
description: "Use when the user asks about the status of their WordPress Core contributions (\"ki khobor?\"), wants a summary of PRs, reviews and test reports, or after any contribution to record it: checks every open PR for new comments, CI state and merge conflicts, detects landed changes, and keeps data/contributions.json up to date."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Needs gh CLI logged in as the contributor, git with an upstream remote, and node for the helper script."
---

# Contribution tracker

## When to use

- "ki khobor?", "what's the status of my PRs?", "any new comments?", "check all PRs for changes or merge conflicts".
- After posting a PR, review, test report or Trac comment (to record it).

## Inputs required

- GitHub username (default `rejaulalomkhan`).
- Path of this skills repo's `data/contributions.json` (create it from `references/contributions.example.json` if missing).

## Procedure

1. **Collect** (deterministic):
   `node <this-skill>/scripts/status.mjs --author rejaulalomkhan`
   It calls `gh` for every PR by the author (open and recently closed) and prints state, CI rollup, mergeability, review decision, last update and new comments.
2. **Landed?** For open PRs, check if the change reached trunk: `git fetch upstream trunk` then `git log upstream/trunk --oneline --grep "#<ticket>" -20`, or whether the new test file exists on `upstream/trunk`.
3. **Act on signals**:
   - new review comments or red CI → `wp-core-pr-followup`
   - merge conflict → resolve via merge (no force-push) after asking
   - "out-of-date but cleanly mergeable" → nothing to do
4. **Record**: append or update entries in `data/contributions.json` (types: `pr`, `review`, `test-report`, `trac-comment`; fields in `references/contributions.example.json`). Commit to the skills repo with a short message.
5. **Report** to the user in Bangla as a short table: item, state, CI, last activity, next action. Mention reviews/test reports given and props received when known.

## Verification

- Every open PR in `gh pr list` appears in the report.
- `data/contributions.json` parses as JSON after editing (`node -e "JSON.parse(require('fs').readFileSync('data/contributions.json','utf8'))"`).

## Failure modes / debugging

- `gh` not logged in → `gh auth status`; ask the user to run `gh auth login` (never ask for a token in chat).
- Cloud session: `gh`/API access to WordPress/wordpress-develop is unavailable → use `git ls-remote upstream refs/pull/<n>/head`, public pages, and the user's screenshots.
- Trac activity isn't visible via `gh` → use the Trac MCP `getTimeline` with the user's Trac username, or ask the user.

## Escalation

- Long silence on a PR (about two weeks) → suggest one polite Trac comment; never spam pings.
