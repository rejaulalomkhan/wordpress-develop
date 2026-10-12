# Quality gate (run before every push)

| Check | Command | Pass when |
|---|---|---|
| New/changed file, single site | `npm run test:php -- --filter <TestClass>` | `OK`, exit 0 |
| Multisite | `npm run test:php -- -c tests/phpunit/multisite.xml --filter <TestClass>` | `OK`, exit 0 |
| Order independence | add `--order-by=reverse` | `OK`, exit 0 |
| Related group | `npm run test:php -- --group <group>` | `OK`, exit 0 |
| Coding standards | `vendor/bin/phpcs <files>` (or `npm run env:composer -- run lint -- <files>`) | no errors |
| Static analysis | `composer phpstan` (only if `src/` or baselines changed) | `[OK] No errors` |
| PHP 8.5 | run the file on PHP 8.5 when reflection or deprecated APIs are used | `OK` |
| Mutation | break the code under test → a new test fails → revert | fails, then clean `git status` |
| Whitespace | `git diff --check upstream/trunk` | no output |

Rules:
- Read the exit code, not just the last line. A stopped database once produced a fake pass.
- A new test must also pass inside the full suite; CI runs everything together.
- Record results as PASS / FAIL / BLOCKED / NOT RUN when reporting to the user.
