# Reproducing wordpress-develop CI failures locally

| Failing job | Reproduce with |
|---|---|
| PHPUnit `PHP 8.x / MySQL …` | `npm run test:php -- --filter <Class>`; for a different PHP version set `LOCAL_PHP=8.5-fpm` in `.env` then `npm run env:restart` (or a `php:8.5-cli` container) |
| PHPUnit multisite jobs | `npm run test:php -- -c tests/phpunit/multisite.xml --filter <Class>` |
| A test fine alone, red in CI | run the whole group or suite; look for leaked globals/statics |
| Coding Standards / PHP checks | `vendor/bin/phpcs <files>` |
| PHPStan Static Analysis | `composer phpstan` (see `wp-core-phpstan`) |
| HTML API jobs | `npm run test:php -- --group html-api` |

Read the failed log down to the first real assertion or fatal error. Ignore jobs that also fail on trunk or die before tests run (checkout/install/runner loss) — mention them, don't "fix" them.
