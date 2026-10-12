# Cross-testing competing PRs on one ticket

When two PRs fix the same ticket (example: #66279, PRs 14187 and 14199), run every fix against every PR's tests on a detached trunk checkout.

```bash
git switch --detach upstream/trunk
# for each CODE pr and each TEST pr:
git checkout pr-<code> -- <changed src files>
git checkout pr-<test> -- <test file(s)>   # if the file is new on trunk, it is simply added
npm run test:php -- --filter <test>         # record OK / failures + data set names
# cleanup (new files are not in HEAD):
git reset -q HEAD -- <files> && git checkout -- <tracked files> && rm -f <new files>
git status   # must be clean
```

Also run each PR's tests on unmodified trunk to show the tests reproduce the bug.

Report as a small matrix:

| | `search` | `name__like` |
|---|---|---|
| trunk | ❌ | ❌ |
| PR A | ✅ | ❌ (10 cases) |
| PR B | ✅ | ✅ |

Distinguish behaviour tests from implementation-detail tests (e.g. asserting an exact SQL string): failing the latter isn't necessarily a defect.
