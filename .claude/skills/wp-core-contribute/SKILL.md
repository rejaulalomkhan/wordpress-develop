---
name: wp-core-contribute
description: Step-by-step workflow for rejaulalomkhan's WordPress Core contributions — new test-coverage PRs, Patch Testing reports on other people's PRs/Trac tickets, and answering review feedback or CI failures. Use whenever the task involves WordPress/wordpress-develop PRs, Trac tickets, test reports, or Core unit tests.
---

# WordPress Core contribution workflow

Read `CLAUDE.md` (contributor brain) first if it is available. Its rules override anything below.
Reply to the user in Bangla; write code, commits, PR text and Trac comments in English.
Never push, open a PR, or post any comment without showing the exact text and getting the user's approval.

## A. New test-coverage PR

1. **Pick and de-duplicate**
   - `git fetch upstream trunk`.
   - Confirm the target has no tests in trunk: `git grep -l "<ClassName>" upstream/trunk -- tests/phpunit`.
   - Search open PRs: `gh pr list --repo WordPress/wordpress-develop --state open --search "<ClassName>"`.
   - Find the Trac ticket (umbrella for test work in 7.2: #65819). If someone already covers it, stop and suggest a test report instead.
   - Max one new PR per day.
2. **Branch**: `git switch -c tests/<short-name> upstream/trunk` (never from the fork's `trunk`).
3. **Write tests** following existing style (see `tests/phpunit/tests/widgets/` and the user's PRs 14184–14186):
   - `@group`, `@covers`, `@ticket` annotations; shared fixtures as class properties; no empty `set_up`/`tear_down`.
   - Use data providers for input variations; include edge cases (`'0'`, empty, unchecked/absent fields, HTML/quotes).
   - Assert real behaviour, not implementation details. Use `WP_HTML_Tag_Processor` for HTML attributes (remember: no `id` query key; `checked` returns `'checked'`).
   - Isolate from global state (e.g. `$GLOBALS['posts']`, static counters via reflection guarded by `PHP_VERSION_ID < 80100`).
4. **Quality gate** (report exit codes):
   - `npm run test:php -- --filter <Class>`; multisite: `npm run test:php -- -c tests/phpunit/multisite.xml --filter <Class>`; `--order-by=reverse`.
   - Related group, e.g. `npm run test:php -- --group widgets`.
   - `vendor/bin/phpcs <files>` (inside the env if needed: `npm run env:composer -- run lint -- <files>`); `composer phpstan` if `src/` changed.
   - Mutation check: break the code under test, confirm a test fails, revert. Confirm `git status` is clean afterwards.
5. **Commit**: `Tests: Add unit test coverage for <Class>.` + body + `See #<ticket>.`
6. **Show the user**: diff summary, test results table, draft PR description (from `.github/pull_request_template.md`, with Trac link and the AI disclosure block). Wait for approval.
7. **Publish** (after approval): `git push -u origin <branch>`, then `gh pr create --repo WordPress/wordpress-develop --base trunk --head rejaulalomkhan:<branch> --title "..." --body-file <file>`.
8. **Trac**: draft a short comment linking the PR for the user (or post via Claude in Chrome after approval).

## B. Test report on someone else's PR

1. `git fetch upstream pull/<n>/head:pr-<n>`; read the full diff and the linked Trac ticket. Check for competing PRs on the same ticket.
2. Run the PR's tests (single site, multisite, reverse order, related group). Verify the new tests **fail on trunk / without the fix** and pass with it. For PHP-version-sensitive code also run PHP 8.5.
3. If two PRs target one ticket, cross-run each fix against both test sets.
4. Only report when there is something useful (results, a gap, a regression). If the PR is trivially correct and complete, say so to the user and skip commenting.
5. Draft in Patch Testing format (see `CLAUDE.md` → Formats): short, factual, one-line AI disclosure. Prefer posting on the Trac ticket; don't post the same report in two places.
6. Don't use "Approve"/"Request changes" on PRs the user doesn't maintain — plain comments only.

## C. Review feedback or CI failure on the user's PR

1. Fetch the PR head and read every review comment; reproduce CI failures locally before changing anything (PHP 8.5 jobs, multisite jobs, full-suite isolation issues).
2. Fix the root cause; keep the change minimal; run the full quality gate.
3. Push a normal commit (no force-push, no empty commits).
4. Draft one reply per reviewer: what changed and in which commit. Check the PR number before posting. Don't resolve threads yourself.
5. Don't click "Update branch" unless there's a conflict or a reviewer asks.

## Status check ("ki khobor?")

- `gh pr list --repo WordPress/wordpress-develop --author rejaulalomkhan --state all --limit 20`
- For each open PR: `gh pr checks <n>`, new reviews/comments since last check, whether the change landed in trunk.
- Summarise in a short Bangla table with the next action for each item.
