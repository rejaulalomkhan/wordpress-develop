---
name: wp-core-fixer
description: "Use when fixing a WordPress Core bug from a Trac ticket test-first: reproduce, write a failing PHPUnit test, make the smallest fix in src/, run the full quality gate, and open an approval-gated PR with proper docs (@since, changelog) and AI disclosure."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Requires the wp-env PHPUnit setup, PHPCS and PHPStan via Composer, gh CLI."
---

# Core fixer (test-driven)

## When to use

- A Trac defect with a clear, reproducible cause and no adequate existing PR.
- Run `wp-trac-triage` first if the ticket isn't reproduced yet.

## Inputs required

- Trac ticket number and a confirmed reproduction.
- Confirmation that no open PR already fixes it (`gh pr list --repo WordPress/wordpress-develop --search "<ticket number>"`, Trac "Pull requests" section).

## Procedure

0. **Read and decide first.** Read the ticket (Trac MCP `getTicket`, or `node <wp-trac-triage skill>/scripts/trac.mjs ticket <id>`), related changesets and current trunk code. Give a verdict with its basis and numbered options with one marked "(my recommendation)" — see `wp-trac-triage/references/verdicts.md` — and stop until the user chooses. Don't fix tickets that are already fixed, covered by another PR, out of scope or heading for closure. Honour user constraints such as "don't commit".
1. `git fetch upstream trunk && git switch -c fix/<ticket>-<slug> upstream/trunk`.
2. **Failing test first**: add a test (with `@ticket <n>` and `@covers`) that demonstrates the bug. Run it → it must fail on trunk for the right reason.
3. **Smallest fix** in `src/`. No unrelated refactors or formatting changes.
4. **Docs**: changed/added functions, hooks or filters get docblocks; behaviour changes get a `@since <next version>` note (e.g. `@since 7.2.0 Added the $foo parameter.`).
5. **Back-compat**: public signatures, return types and hook arguments unchanged unless the ticket requires it; deprecate properly when needed.
6. **Quality gate** (`wp-unit-test-writer/references/quality-gate.md`): the new test passes, related groups pass, single site + multisite, PHPCS, `composer phpstan` (fix types; if a baseline entry becomes stale, use `wp-core-phpstan`).
7. **Self-review** with `wp-pr-reviewer/references/review-checklist.md` on your own diff.
8. Commit: `<Component>: <Imperative summary of the fix>.` + body + `Fixes #<ticket>.` only if the PR fully resolves it, otherwise `See #<ticket>.`
9. Approval gate: push to the fork, show results + PR body (`wp-unit-test-writer/references/contributor-workflow.md`, with the dedicated ticket on the `Trac ticket:` line), and wait before `gh pr create`.

## Verification

- The test fails on trunk and passes with the fix (both runs recorded).
- No new PHPStan errors; no stale baseline entries.
- Diff touches only what the fix needs.

## Failure modes / debugging

- Test passes on trunk → it doesn't reproduce the bug; rethink the test before touching `src/`.
- Fix breaks other tests → read them; they may encode intended behaviour. Ask before changing existing tests.
- Multisite-only failures → network options, `switch_to_blog()` state, or capability differences.

## Escalation

- The right fix changes public behaviour or needs a design decision → describe options on the Trac ticket and wait for maintainer input.
- Security-relevant bugs → private disclosure, not a public PR.
