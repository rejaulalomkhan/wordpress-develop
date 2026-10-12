# Contributor brain: rejaulalomkhan → WordPress Core

Read this before doing any WordPress Core contribution work for this user.
**This file must never be included in a pull request to WordPress/wordpress-develop.**

## Who and how
- GitHub: `rejaulalomkhan`. WordPress.org account is used for Trac (browser login).
- Prefers replies in Bangla; code, commits, PR text and Trac comments in English.
- Goal: become a trusted, noteworthy Core contributor through high-quality, reviewable work — not volume.
- Machine: Windows, PowerShell, Docker Desktop (WSL 2), Claude Code CLI, Claude in Chrome extension, `gh` logged in as rejaulalomkhan.
- Local clone: `C:\Users\User\wordpress-develop` (`origin` = fork, `upstream` = WordPress/wordpress-develop).
- Node: fnm with `--use-on-cd`; repo uses Node 24.18 from `.nvmrc`; global Node 22 must stay untouched.

## Where work can happen
- **Local Claude Code (PC):** full access — code, Docker tests, push to fork, `gh pr create/comment/checks` on WordPress repo.
- **Claude in Chrome:** GitHub UI, Trac comments (logged in), Playground UI testing.
- **Cloud Claude Code sessions:** can push only to the fork; cannot use the GitHub API on WordPress/wordpress-develop and cannot reach Trac or make.wordpress.org. Use public pages, git fetch of `pull/<n>/head`, and ask the user for screenshots.

## Non-negotiable rules
1. Always `git fetch upstream trunk` and branch from `upstream/trunk`. The fork's own `trunk` is very outdated.
2. Before starting: search open PRs and the Trac ticket for duplicates. If covered, don't duplicate — offer a test report.
3. At most one new PR per day; no floods of near-identical PRs.
4. Never push, open a PR, or post a comment (GitHub or Trac) without showing the user the exact text and getting approval.
5. Every PR description includes the AI disclosure required by `.github/pull_request_template.md`:
   `AI assistance: Yes / Tool(s): Claude Code / Model(s): Claude Opus 5.5 / Used for: … reviewed and verified by me.`
   Every review or test report ends with a one-line AI disclosure.
6. Never paste or store tokens in chat or in a repository. Never push empty "Trigger CI" commits. Never force-push without asking.
7. Don't click "Update branch" on PRs unless there is a conflict or a reviewer asks. "Merging is blocked / protected ref" is normal (Core commits via SVN).
8. Don't resolve reviewers' conversations yourself; reply and let them resolve.
9. GitHub PR comments are mirrored to Trac and later edits are NOT synced — verify the PR number before posting.
10. Review/test other people's PRs too, not only the friend's (huzaifaalmesbah) — avoid looking like a props circle.

## Quality gate before any push
- Changed test file: single site, multisite (`-c tests/phpunit/multisite.xml`), and `--order-by=reverse`.
- Whole related group (e.g. `--group widgets`); a new test must also pass inside the full suite.
- `vendor/bin/phpcs` on changed files; `composer phpstan` when `src/` or PHPStan baselines change.
- PHP 8.5 when reflection or deprecated APIs are involved.
- Mutation check: temporarily break the code under test, confirm the new test fails, revert.
- Check exit codes, not just tail output (a stopped DB once produced a false "pass").

## Technical lessons learned (do not repeat these mistakes)
- `ReflectionProperty::setAccessible()` is deprecated in PHP 8.5 → wrap in `if ( PHP_VERSION_ID < 80100 )`.
- `get_calendar()` outputs nothing without published posts, and skips its no-posts check when the global `$posts` is populated → create a post when asserting the table; `unset( $GLOBALS['posts'] )` for the no-posts case.
- `checked()` outputs `checked='checked'`, so `WP_HTML_Tag_Processor::get_attribute( 'checked' )` returns the string `'checked'`, not `true`.
- `next_tag()` query keys are only `tag_name`, `class_name`, `match_offset`, `tag_closers`. An `id` key is silently ignored — assert `get_attribute( 'id' )` instead.
- Adding `@phpstan-impure` (or fixing types) can make other baseline entries stale → PHPStan fails with `ignore.unmatched`; remove those entries too.
- Widget test classes: shared `$args` as a class property; no empty `tear_down()`; data providers can be `public static`.
- In widget `update()` tests, start the old instance from enabled values and include a data set where unchecked checkboxes are absent.

## Formats
- Commit message: `Tests: Add unit test coverage for WP_Widget_Pages.` + blank line + body + `See #<ticket>.`
- Test reports (Trac or GitHub), Patch Testing format, short and factual:
  ```
  == Patch Testing Report
  Patch Tested: <PR URL>
  === Environment
  - WordPress / PHP / Server / Database / Browser / OS / Theme / MU Plugins / Plugins
  === Actual Results
  1. ✅ Issue resolved with patch.
  === Additional Notes
  - <facts only>
  - AI assistance: Claude Code was used to run the tests; results reviewed by me.
  === Supplemental Artifacts
  None.
  ```

## Contribution history
- Trac #65819 (umbrella: test improvements for 7.2):
  - PR 14184 `WP_Widget_Search` — open, CI green; review feedback addressed in 1319de6 (removed empty `tear_down()`, `$args` property).
  - PR 14185 `WP_Widget_Archives` — open, CI green; fixed in dd201f7.
  - PR 14186 `WP_Widget_Calendar` — open, CI green; fixed in 145d5ec and 9d94223.
  - Trac comment:137 announced all three as ready for review.
- PR 14182 (`WP_Http_Cookie` nullable) — closed as duplicate of #13983.
- PR 14183 (`next_token()` impure) — closed as duplicate of #14037.
- Reviews / test reports prepared: PR 14195 (#66287 icon collections), Trac #66279 comparison of PRs 14187 vs 14199 (14199 covers `search` and `name__like`; 14187 only `search`).

## Next work candidates
- Widgets still without tests in trunk and without open PRs (re-check before starting): `WP_Widget_Pages`, `WP_Widget_Categories`, `WP_Widget_Tag_Cloud`, `WP_Widget_Recent_Posts`, `WP_Widget_Recent_Comments`. `WP_Widget_Meta` is taken (PR 14181).
- Test reports for bug-fix PRs with tests (verify the test fails without the fix).
- UI PRs: manual testing via the PR's Playground link, with before/after screenshots.
