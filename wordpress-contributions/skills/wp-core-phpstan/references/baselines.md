# PHPStan baselines in wordpress-develop

- Config: `phpstan.neon.dist` includes `tests/phpstan/base.neon` and one baseline file per error identifier under `tests/phpstan/baselines/<identifier>.neon`.
- Analysed paths: `src/wp-admin`, `src/wp-includes` and bundled themes — not `tests/`.
- Entry shape:
  ```neon
  -
      message: '#^Negated boolean expression is always true\.$#'
      identifier: booleanNot.alwaysTrue
      count: 1
      path: ../../../src/wp-includes/class-wp-block.php
  ```
- When an entry's `count` drops (not to zero), lower the count instead of deleting it.
- When a whole file becomes empty, delete it and remove its `includes:` line from `phpstan.neon.dist`.
- Regenerating all baselines (`composer phpstan:baselines`) is a maintainer task; for a PR, edit only the entries your change affects.

Example from experience: annotating `WP_HTML_Processor::next_token()` with `@phpstan-impure` retired the `booleanOr.alwaysTrue` entry but also made two `class-wp-block.php` entries (`booleanNot.alwaysTrue`, `deadCode.unreachable`) stale; CI failed with `ignore.unmatched` until they were removed too.
