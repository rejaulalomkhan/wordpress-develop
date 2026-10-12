# WordPress contributions — rejaulalomkhan

> Generated from `data/*.json` by `npm run dashboard`. Edit the data, not this file.

## Summary

| PRs open | PRs merged/committed | PRs closed | Reviews | Test reports | Trac comments | Props |
|---|---|---|---|---|---|---|
| 3 | 0 | 2 | 0 | 2 | 1 | 0 |

## Pull requests

| PR | Title | Ticket | State | CI | Notes |
|---|---|---|---|---|---|
| [#14186](https://github.com/WordPress/wordpress-develop/pull/14186) | Tests: Add unit test coverage for WP_Widget_Calendar | [#65819](https://core.trac.wordpress.org/ticket/65819) | open | green | PHP 8.5 setAccessible guard and post fixture (145d5ec), global $posts isolation (9d94223). |
| [#14185](https://github.com/WordPress/wordpress-develop/pull/14185) | Tests: Add unit test coverage for WP_Widget_Archives | [#65819](https://core.trac.wordpress.org/ticket/65819) | open | green | checked assertion, id assertions, unchecked-checkbox update() case fixed in dd201f7. |
| [#14184](https://github.com/WordPress/wordpress-develop/pull/14184) | Tests: Add unit test coverage for WP_Widget_Search | [#65819](https://core.trac.wordpress.org/ticket/65819) | open | green | Review feedback addressed in 1319de6 (removed empty tear_down, $args property). |
| [#14183](https://github.com/WordPress/wordpress-develop/pull/14183) | Code Quality: Annotate WP_HTML_Processor::next_token() as impure for PHPStan | [#65817](https://core.trac.wordpress.org/ticket/65817) | closed | red | Closed as duplicate of #14037 (missed two stale baseline entries). |
| [#14182](https://github.com/WordPress/wordpress-develop/pull/14182) | Docs: Document WP_Http_Cookie properties as nullable | [#65817](https://core.trac.wordpress.org/ticket/65817) | closed | unknown | Closed as duplicate of #13983. |

## Reviews given

_None yet._

## Test reports

| Ticket | Target | Where | Status | Date | Summary |
|---|---|---|---|---|---|
| [#66279](https://core.trac.wordpress.org/ticket/66279) | PR 14187 vs PR 14199 | trac | prepared | 2026-10-12 | 14199 covers search and name__like; 14187 only search. |
| [#66287](https://core.trac.wordpress.org/ticket/66287) | PR 14195 | github | prepared | 2026-10-12 | 22 tests pass single site, multisite and PHP 8.5; permission test catches a mutated check. |

## Trac comments

| Ticket | Date | Summary |
|---|---|---|
| [#65819](https://core.trac.wordpress.org/ticket/65819#comment:137) | 2026-10-11 | Announced PRs 14184, 14185, 14186 as ready for review. |

## Props received

_None yet._

## Scopes (planned work)

| Scope | Ticket | Size | Status | Notes |
|---|---|---|---|---|
| WP_Widget_Pages | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | candidate | No tests in trunk; no open PR at last check (2026-10-12). |
| WP_Widget_Categories | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | candidate | No tests in trunk; #8071 is an unrelated change. |
| WP_Widget_Tag_Cloud | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | candidate |  |
| WP_Widget_Recent_Posts | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | candidate |  |
| WP_Widget_Recent_Comments | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | candidate |  |
| WP_Nav_Menu_Widget | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | candidate | Found by find_untested.mjs. |
| WP_Widget_Meta | [#65819](https://core.trac.wordpress.org/ticket/65819) | medium | taken | PR 14181 by huzaifaalmesbah. |
