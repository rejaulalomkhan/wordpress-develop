# Review checklist

## Security
- Output escaped late with the right function (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_*`).
- Input sanitized/validated; `$wpdb->prepare()` for SQL with variables.
- Capability checks (`current_user_can()`) and nonces on state-changing requests; REST `permission_callback` present and correct.
- No secrets, debug output or new remote calls without reason.

## Backward compatibility
- Public function/hook/filter signatures and return types unchanged, or deprecated properly (`_deprecated_function()`, `@deprecated`).
- Default behaviour unchanged unless that is the point of the ticket.
- Minimum PHP version respected (no syntax newer than PHP 7.4 in `src/`).

## Documentation
- New/changed functions, hooks and filters have complete docblocks with `@since <next version>`.
- Types use `int`, `bool`, `callable`, `string|null` etc. Hooks documented where fired.

## Tests
- Behaviour change comes with tests that fail without the fix.
- Test standards from `wp-unit-test-writer/references/test-standards.md` (`@covers`, `@ticket`, static data providers, dedicated assertions, isolation).
- Assertions match what the source actually does.

## Performance
- No extra queries in loops; caching respected (`wp_cache_*`, `last_changed`); no autoloaded options added without need.

## Code quality
- Smallest change that fixes the ticket; no unrelated refactors.
- Clear names, early returns, no dead code.
- Consistent with surrounding code and Core conventions (Yoda conditions, spacing — but leave style to PHPCS).
