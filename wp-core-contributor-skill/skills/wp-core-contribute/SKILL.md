---
name: wp-core-contribute
description: All-in-one master skill for rejaulalomkhan's WordPress Core contributions — environment setup, picking work, writing test-coverage PRs, Patch Testing reports on other people's PRs and Trac tickets, answering reviews and CI failures, and status checks. Use for any task involving WordPress/wordpress-develop, Core Trac tickets, Core unit tests, PR reviews or test reports, or when the user asks "ki khobor?" about their contributions.
---

# WordPress Core contribution — master skill

Reply to the user in **Bangla**. Write code, commits, PR text, review replies and Trac comments in **English**.
The goal is to make the user a trusted, noteworthy Core contributor through high-quality, reviewable work — not volume.

---

## 1. Profile and setup

- GitHub: `rejaulalomkhan`. Trac uses the user's WordPress.org account (browser login).
- Windows + PowerShell, Docker Desktop (WSL 2), Claude Code CLI, Claude in Chrome extension, `gh` CLI logged in.
- Local clone: `C:\Users\User\wordpress-develop` — `origin` = `rejaulalomkhan/wordpress-develop` (fork), `upstream` = `WordPress/wordpress-develop`.
- Node via **fnm** (`--use-on-cd`): the repo uses the version in `.nvmrc` (24.18 at time of writing). The global Node 22 must stay untouched for other projects. Each shell command must load fnm first.
- Tests run in Docker via the repo's npm scripts (`npm run env:start`, `npm run test:php`).

### Where each kind of work happens
| Surface | Can do |
|---|---|
| Local Claude Code (PC) | Code, Docker tests, push to fork, `gh pr create/comment/checks` on the WordPress repo |
| Claude in Chrome | GitHub UI, Trac comments (logged in), Playground UI testing |
| Cloud Claude Code session | Push to the fork only. No GitHub API on WordPress/wordpress-develop, no Trac or make.wordpress.org. Use public pages, `git fetch upstream pull/<n>/head`, and ask the user for screenshots |

---

## 2. Golden rules (never break these)

1. Always `git fetch upstream trunk` and branch from `upstream/trunk`. The fork's own `trunk` is very outdated.
2. Before starting anything, search open PRs and the Trac ticket for duplicates. If it's already covered, don't duplicate — offer a test report instead.
3. At most **one new PR per day**. No floods of near-identical PRs.
4. **Never push, open a PR, or post any comment (GitHub or Trac) without showing the user the exact text and getting approval.**
5. Every PR includes the AI disclosure from `.github/pull_request_template.md`. Every review or test report ends with a one-line AI disclosure.
6. Never paste or store tokens/secrets in chat or in any repository. If the user pastes one, tell them to revoke it immediately and don't use it.
7. Never push empty "Trigger CI" commits. Never force-push or rewrite history on a PR branch without asking.
8. Don't click/run "Update branch" unless there's a conflict or a reviewer asks. "Merging is blocked / Cannot update this protected ref" is normal: Core commits through SVN and the GitHub PR is closed afterwards.
9. Don't resolve reviewers' conversations yourself. Reply, and let the reviewer resolve.
10. GitHub PR comments are mirrored to Trac and later edits are **not** synced — verify the PR number before posting.
11. Review and test many people's PRs, not only the friend's (`huzaifaalmesbah`), so it never looks like a props circle.
12. Report results honestly: check exit codes, label each check PASS / FAIL / BLOCKED / NOT RUN, never claim a pass that wasn't run.

---

## 3. Workflows

### A. New test-coverage PR

1. **Pick and de-duplicate**
   - `git fetch upstream trunk`
   - Confirm the target has no tests: `git grep -l "<ClassName>" upstream/trunk -- tests/phpunit`
   - `gh pr list --repo WordPress/wordpress-develop --state open --search "<ClassName>"`
   - Find the Trac ticket (umbrella for test work in 7.2: **#65819**). Covered already → stop, suggest a test report.
2. **Branch**: `git switch -c tests/<short-name> upstream/trunk`
3. **Write tests** in the style of `tests/phpunit/tests/widgets/` and the user's PRs 14184–14186:
   - `@group`, `@covers`, `@ticket` on every test; shared fixtures (e.g. widget `$args`) as class properties; no empty `set_up()`/`tear_down()`.
   - Data providers for input variations, including edge cases (`'0'`, empty, quotes/HTML, absent/unchecked fields).
   - Assert behaviour, not implementation details. Use `WP_HTML_Tag_Processor` for HTML attributes.
   - Isolate from global and static state (see Lessons).
4. **Quality gate** (section 4).
5. **Commit**: `Tests: Add unit test coverage for <Class>.` + body + `See #<ticket>.`
6. **Show the user**: diff summary, results table, draft PR body (section 6). Wait for approval.
7. **Publish after approval**:
   - `git push -u origin <branch>`
   - `gh pr create --repo WordPress/wordpress-develop --base trunk --head rejaulalomkhan:<branch> --title "<title>" --body-file <file>`
8. **Trac**: draft a short comment linking the PR. The user posts it, or Claude in Chrome posts it after approval.

### B. Test report on someone else's PR

1. `git fetch upstream pull/<n>/head:pr-<n>`; read the whole diff and the linked Trac ticket. Look for competing PRs on the same ticket.
2. Run the PR's tests: single site, multisite, reverse order, related group. PHP 8.5 when the code is PHP-version sensitive.
3. Prove the tests are meaningful: they fail on trunk (or with the fix reverted) and pass with the fix. Optionally mutate the code under test.
4. Two PRs for one ticket → cross-run each fix against both test sets and report which cases each covers.
5. Only comment when there's something useful. If the PR is trivially correct and complete, tell the user and skip it.
6. Draft in the Patch Testing format (section 6). Prefer the Trac ticket; never post the same report in two places.
7. Plain comments only — no "Approve" / "Request changes" on PRs the user doesn't maintain.
8. UI PRs: the user tests via the PR's Playground link in the browser and adds before/after screenshots.

### C. Review feedback or CI failure on the user's PR

1. Fetch the PR head and read every review comment and failing check.
2. Reproduce CI failures locally before changing anything (PHP 8.5 jobs, multisite jobs, full-suite isolation problems, PHPStan baseline issues).
3. Fix the root cause with a minimal change; run the full quality gate.
4. Push a normal commit (no force-push, no empty commits).
5. Draft one reply per reviewer naming the commit and what changed. Verify the PR number before posting.

### D. Status check ("ki khobor?")

- `gh pr list --repo WordPress/wordpress-develop --author rejaulalomkhan --state all --limit 20`
- For each open PR: `gh pr checks <n>`, new reviews/comments, and whether the change has landed in trunk (`git log upstream/trunk --grep`, or the test file now exists).
- Reply with a short Bangla table: PR, state, CI, last activity, next action.

### E. Environment setup / repair (Windows)

1. Virtualization enabled (Task Manager → Performance → CPU).
2. Admin PowerShell: `Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart` and the same for `Microsoft-Windows-Subsystem-Linux`; restart Windows; `wsl --update`.
3. Docker Desktop shows "Engine running"; `docker run --rm hello-world` works.
4. `winget install Schniz.fnm`; add `fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression` to `$PROFILE`; `fnm install` / `fnm use` the `.nvmrc` version.
5. In the repo: `npm install`, `npm run build:dev`, `npm run env:start`, `npm run env:install`, then `npm run test:php -- --group widgets` → expect `OK`.
6. Never use pnpm here (the repo uses npm + `package-lock.json`). Never run Claude Code from an Administrator shell.

---

## 4. Quality gate (before any push)

| Check | Command |
|---|---|
| Changed test file, single site | `npm run test:php -- --filter <Class>` |
| Multisite | `npm run test:php -- -c tests/phpunit/multisite.xml --filter <Class>` |
| Order independence | add `--order-by=reverse` |
| Related group | e.g. `npm run test:php -- --group widgets` |
| Coding standards | `vendor/bin/phpcs <files>` (or `npm run env:composer -- run lint -- <files>`) |
| Static analysis | `composer phpstan` when `src/` or PHPStan baselines change |
| PHP 8.5 | when reflection or deprecated APIs are involved |
| Mutation check | break the code under test → a test must fail → revert → `git status` clean |
| Whitespace | `git diff --check upstream/trunk` |

A new test must also pass when the whole suite runs, not just on its own.

---

## 5. Lessons learned (don't repeat these mistakes)

- `ReflectionProperty::setAccessible()` is deprecated in PHP 8.5 and has had no effect since PHP 8.1 → wrap it in `if ( PHP_VERSION_ID < 80100 ) { … }`.
- `get_calendar()` outputs nothing when there are no published posts, and skips that check when the global `$posts` is populated → create a post when asserting the calendar table; `unset( $GLOBALS['posts'] )` for the no-posts case.
- `checked()` outputs `checked='checked'`, so `WP_HTML_Tag_Processor::get_attribute( 'checked' )` returns the string `'checked'`, not `true`.
- `next_tag()` only understands `tag_name`, `class_name`, `match_offset` and `tag_closers`. An `id` key is silently ignored → assert `get_attribute( 'id' )` instead.
- Fixing types or adding `@phpstan-impure` can make other baseline entries stale → PHPStan fails with `ignore.unmatched`; remove those entries in the same PR.
- In widget `update()` tests, start the old instance with options enabled and include a data set where unchecked checkboxes are absent from the new instance.
- WordPress resets the database between tests but not every global or static — isolate them explicitly.
- A stopped local database once produced a fake "pass" (tests never ran). Always check exit codes and the `OK (...)` line.
- Before pushing a fix for CI, run the full related group: one fix was correct alone but failed inside the full suite.

---

## 6. Formats

### Commit message
```
Tests: Add unit test coverage for WP_Widget_Pages.

<what is covered and why, wrapped prose>

See #65819.
```

### PR body (follows `.github/pull_request_template.md`)
```
<one-paragraph summary of the change>

<bullet list of what the tests cover>

This is a test-only change; no production code is modified.

Trac ticket: https://core.trac.wordpress.org/ticket/<n>

## Use of AI Tools

AI assistance: Yes
Tool(s): Claude Code
Model(s): Claude Opus 5.5
Used for: <drafting tests / diagnosing CI / …>. I reviewed the changes, ran the tests locally, and take responsibility for them.

---
**This Pull Request is for code review only. Please keep all other discussion in the Trac ticket. Do not merge this Pull Request. See [GitHub Pull Requests for Code Review](https://make.wordpress.org/core/handbook/contribute/git/github-pull-requests-for-code-review/) in the Core Handbook for more details.**
```

### Patch Testing report (Trac or GitHub) — short and factual
```
== Patch Testing Report

Patch Tested: <PR URL>

=== Environment
- WordPress: <version from src/wp-includes/version.php>
- PHP: <version>
- Server: <wp-env / PHP CLI (PHPUnit x.y)>
- Database: <MySQL/MariaDB version>
- Browser: <browser or N/A (unit tests)>
- OS: <OS>
- Theme: <theme or N/A>
- MU Plugins: None activated
- Plugins: None activated

=== Actual Results
1. ✅ Issue resolved with patch.

=== Additional Notes
- <facts only: what was run, what failed on trunk, any gap found>
- AI assistance: Claude Code was used to run the tests; results reviewed by me.

=== Supplemental Artifacts
None.
```

### Reply to a reviewer
```
@<reviewer> Thanks! Addressed in <sha>:

- <change 1>
- <change 2>
```

### Closing a duplicate PR
```
Thanks @<user>. #<other PR> covers the same change and also <extra>, so closing in favour of #<other PR>.
```

---

## 7. Contribution history (update after every change)

- **Trac #65819** (test improvements for 7.2):
  - PR 14184 `WP_Widget_Search` — open, CI green; review feedback addressed in `1319de6`.
  - PR 14185 `WP_Widget_Archives` — open, CI green; fixed in `dd201f7`.
  - PR 14186 `WP_Widget_Calendar` — open, CI green; fixed in `145d5ec` and `9d94223`.
  - Trac comment:137 announced all three as ready for review.
- PR 14182 (`WP_Http_Cookie` nullable) — closed as duplicate of #13983.
- PR 14183 (`next_token()` impure) — closed as duplicate of #14037.
- Test reports prepared: PR 14195 (Trac #66287, icon collections), Trac #66279 comparison of PRs 14187 vs 14199 (14199 covers `search` and `name__like`; 14187 only `search`).

### Next work candidates (re-check before starting)
- Widgets with no tests in trunk and no open PR: `WP_Widget_Pages`, `WP_Widget_Categories`, `WP_Widget_Tag_Cloud`, `WP_Widget_Recent_Posts`, `WP_Widget_Recent_Comments`. (`WP_Widget_Meta` is taken by PR 14181.)
- Test reports for bug-fix PRs that include tests.
- Manual Playground testing for UI PRs.
