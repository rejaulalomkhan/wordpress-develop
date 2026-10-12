---
name: wp-unit-test-writer
description: "Use when adding PHPUnit test coverage to WordPress Core (wordpress-develop) for a class or function with no or weak tests, e.g. widgets, walkers, sitemaps, HTTP helpers. Covers picking an untested target, de-duplication, writing tests to committer standards, a self-review loop, the quality gate and an approval-gated PR."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Requires the wp-env PHPUnit setup from wp-core-env-setup; node for the helper script; gh CLI for PRs."
---

# Unit test writer (WordPress Core)

## When to use

- The user wants a new test-coverage PR, or asks which classes still need tests.
- Umbrella ticket for test work in 7.2: Trac #65819 (use a dedicated ticket instead when one exists).

## Inputs required

- Target class or function (or a directory to scan).
- Trac ticket to reference.
- A clean working tree (`git status`). If dirty, stop and let the user handle it.

## Procedure

0. **Scope survey** (when the user asks "where can I work?" or gives an umbrella ticket): follow `references/scope-survey.md` — list merged/closed/open work under the ticket, then propose 10–20 untaken medium/complex scopes as a table and let the user choose.
1. **Find a target** deterministically:
   `node <this-skill>/scripts/find_untested.mjs src/wp-includes/widgets` (columns: test-file count, size level, lines, methods, branches)
2. **De-duplicate**: `gh pr list --repo WordPress/wordpress-develop --state open --search "<Class>"` and check the Trac ticket. Covered → stop and suggest `wp-core-patch-test`.
3. **Branch**: `git fetch upstream trunk && git switch -c tests/<slug> upstream/trunk`.
4. **Write tests** to `references/test-standards.md`: `@covers` + `@ticket` on every method, `public static` data providers, dedicated assertions, isolation of globals/statics/headers. Read the class under test fully first.
5. **Self-review loop**: run `references/review-checklist.md` as a separate reviewer pass (or a reviewer subagent). Fix every finding and re-run until the checklist is fully clean.
6. **Quality gate**: `references/quality-gate.md` (single site, multisite, reverse order, group, PHPCS, mutation check; PHP 8.5 when relevant).
7. **Commit** using `references/contributor-workflow.md`.
8. **Approval gate**: push the branch to the fork, then present results and ask "Shall I open the pull request?". **Never run `gh pr create` without explicit confirmation.**
9. **After confirmation**: open the PR with the body from `references/contributor-workflow.md`, watch CI (`gh pr checks <n> --watch`), and draft a short Trac comment for the user.

## Verification

- Quality gate all PASS (exit code 0) and review checklist fully ticked.
- Mutation check: breaking the code under test makes a new test fail; source restored; `git status` shows only the test file(s).
- After the PR opens: all required CI checks green.

## Failure modes / debugging

- See `references/lessons-learned.md` (PHP 8.5 `setAccessible()`, leaked `$posts`, `checked` value, `next_tag()` ignoring `id`, static counters, weak `update()` tests).
- Passes alone, fails in the full suite → leaked global/static state.
- Fails only on multisite → missing fixtures or network-specific options.
- PHPCS errors on Windows about line endings → clone with `core.autocrlf=input`.

## Escalation

- Behaviour that looks like a bug while writing tests → stop, describe it, consider `wp-trac-triage` / `wp-core-fixer`; don't encode the bug in a test.
- Unsure whether behaviour is intended → ask before asserting it.
