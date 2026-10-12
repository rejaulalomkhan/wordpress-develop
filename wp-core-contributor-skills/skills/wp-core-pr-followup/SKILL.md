---
name: wp-core-pr-followup
description: "Use when the user's own WordPress Core PR gets review comments, failing CI, a merge conflict, or needs a nudge: reproduce failures locally, push minimal fixes as normal commits, draft replies per reviewer, and keep the PR healthy without spamming."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Needs gh CLI, the wp-env PHPUnit setup, and Docker for PHP-version-specific reproduction."
---

# PR follow-up (the user's own PRs)

## When to use

- A reviewer commented, CI is red, GitHub shows a conflict, or the user asks "what should I do on PR <n>?".

## Inputs required

- PR number; `gh pr view <n> --repo WordPress/wordpress-develop --json headRefName,headRefOid,mergeable,reviews,comments`.
- `gh pr checks <n> --repo WordPress/wordpress-develop` and the failed job logs (`gh run view <run> --log-failed`).

## Procedure

1. Read every review comment and failing check. Separate: must-fix (failing CI, Blocking/Should-fix), optional (nits/questions), not the PR's fault (infra flake, failures also red on trunk).
2. **Reproduce first**: run the failing job's equivalent locally (PHP version, multisite, full group). See `references/ci-failures.md`.
3. Fix the root cause minimally on the PR branch (`git switch <headRefName>`; pull first if the remote moved). Run the quality gate.
4. Push a normal commit. No force-push, no empty commits, no "Update branch" unless there is a real conflict or a reviewer asks.
5. Draft replies (`references/reply-templates.md`): one per reviewer thread or one summary, naming the commit SHA. Verify the PR number before posting (comments mirror to Trac and edits don't sync).
6. Don't resolve reviewers' threads; let them resolve.
7. Update the PR description if scope changed (keep the AI disclosure accurate).
8. Log with `wp-tracker`.

## Verification

- `gh pr checks <n>` all green on the latest commit (or remaining failures explained as not caused by the PR).
- Each review point has a reply or a fix.

## Failure modes / debugging

- Fix correct alone but fails in the full suite → leaked global/static state (see `wp-unit-test-writer/references/lessons-learned.md`).
- Red on PHP 8.5 only → deprecations (e.g. `setAccessible()`); reproduce with a PHP 8.5 container.
- "This branch is out-of-date with the base branch" with "can be cleanly merged" → normal; do nothing.
- A local test run "passes" instantly → database container down; check exit codes.

## Escalation

- Reviewer asks for a design change you disagree with → explain once, politely, with evidence; let the committer decide.
- No review for a long time → one polite Trac comment after about two weeks, not repeated pings.
