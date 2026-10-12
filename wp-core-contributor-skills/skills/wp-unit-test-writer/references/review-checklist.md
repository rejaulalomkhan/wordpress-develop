# Self-review checklist (run as a separate pass before every commit)

Do this as a reviewer, not as the author: re-read the diff from `git diff upstream/trunk` with fresh eyes, or hand it to a reviewer subagent with this checklist. Loop until every item passes.

## Standards
- [ ] Every test method has `@covers` and `@ticket`.
- [ ] Every data provider is `public static` and doesn't use `$this`.
- [ ] Dedicated assertions are used (`assertSame`, `assertWPError`, `assertSameSets`, …).
- [ ] No `set_error_handler()` returning `false`; no `@` error suppression.
- [ ] Header/constant/exit code runs with `@runInSeparateProcess` + `@preserveGlobalState disabled`.
- [ ] No duplicated fixtures; no empty `set_up()`/`tear_down()`.
- [ ] Docblocks describe the behaviour ("Tests that …"), types use `int`/`bool`/`callable`.

## Correctness
- [ ] Each test exercises a real production branch, not the test's own setup.
- [ ] Mutation check done: removing a guard, escaping call or argument in the source makes a test fail; source restored.
- [ ] Globals and statics touched by the code under test are reset.
- [ ] No assertion encodes behaviour that looks like a bug (if so, stop and report it).

## Verification
- [ ] Single site, multisite, `--order-by=reverse` and the related group all pass (exit 0).
- [ ] PHPCS clean for the changed files (0 errors, 0 warnings).
- [ ] `git status` shows only the intended files; `git diff --check` is clean.

## Communication
- [ ] Commit message in Core style with `See #<ticket>.`
- [ ] PR body follows `contributor-workflow.md` including the AI disclosure.
