# Contributor workflow: commit, PR body, links

## Commit message

```
Tests: Add unit test coverage for <Class>.

<One or two sentences on what is covered and why.>

See #<ticket>.
```

Use `Tests: Improve unit test coverage for <Class>.` when the class already had some tests.

## PR body (follows `.github/pull_request_template.md`)

```
### Description
<Concise summary of what was changed and why.>
<Optional: Follow-up to [r12345](https://core.trac.wordpress.org/changeset/12345) / [#14185](https://github.com/WordPress/wordpress-develop/pull/14185).>

The tests cover:
- <…>

This is a test-only change; no production code is modified.

### Testing Instructions
1. `npm run test:php -- --filter <TestClass>`
2. `npm run test:php -- -c tests/phpunit/multisite.xml --filter <TestClass>`
3. `npm run test:php -- --group <group>`

Trac ticket: https://core.trac.wordpress.org/ticket/<n>

## Use of AI Tools

AI assistance: Yes
Tool(s): Claude Code
Model(s): Claude Opus 5.5
Used for: Drafting the tests and running the checks. I reviewed the changes, ran the tests locally, and take responsibility for them.

---
**This Pull Request is for code review only. Please keep all other discussion in the Trac ticket. Do not merge this Pull Request. See [GitHub Pull Requests for Code Review](https://make.wordpress.org/core/handbook/contribute/git/github-pull-requests-for-code-review/) in the Core Handbook for more details.**
```

## Link rules

- Changesets: always `[r<rev>](https://core.trac.wordpress.org/changeset/<rev>)`, never a bare number.
- PRs: always `[#<n>](https://github.com/WordPress/wordpress-develop/pull/<n>)`.
- `Trac ticket:` line: the dedicated defect/task ticket if one exists; otherwise the active release umbrella ticket (#65819 for 7.2 test work). Mention older related tickets/changesets in the Description, not on the `Trac ticket:` line.
- Keep the `Trac ticket:` line clean: one URL, nothing else.
- The AI disclosure names the tool and model actually used in this session.

## Approval gate

1. Commit locally after the quality gate and self-review pass.
2. Pushing the branch to the user's own fork is allowed (`git push -u origin tests/<slug>`).
3. **Never run `gh pr create` automatically.** Tell the user: "Tests verified (single site + multisite + PHPCS) and pushed to your fork on `tests/<slug>`. Shall I open the pull request?" and wait.
4. Only after explicit confirmation: open the PR, then monitor CI (`gh pr checks <n> --watch`) and report.
