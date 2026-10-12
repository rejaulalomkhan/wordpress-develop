# How this setup was built (summary for future sessions)

## 2026-10-11 — first PRs and CI fixes
- Audited PRs 14182–14186 on WordPress/wordpress-develop (Trac #65819, #65817).
- 14185 (`WP_Widget_Archives`): `checked` attribute is the string `'checked'`; `next_tag()` ignores an `id` key; added unchecked-checkbox `update()` case → fixed in dd201f7.
- 14186 (`WP_Widget_Calendar`): PHP 8.5 `setAccessible()` deprecation, missing post fixture, leaked global `$posts` in the full suite → fixed in 145d5ec and 9d94223.
- 14184 (`WP_Widget_Search`): review feedback addressed in 1319de6.
- 14182 and 14183 closed as duplicates of #13983 and #14037 (14183 also missed two stale PHPStan baseline entries).
- All three widget PRs green; Trac #65819 comment:137 announced them.

## 2026-10-12 — process
- Learned the WordPress AI Guidelines (disclosure required in every PR via the template).
- Test reports switched to the Make WordPress Test "Patch Testing Report" format after feedback that long reports read as AI-written.
- Prepared test reports: PR 14195 (#66287) and a cross-test of PRs 14187 vs 14199 (#66279).
- Windows PC set up: Docker Desktop (WSL 2, Virtual Machine Platform), fnm with Node from `.nvmrc`, wp-env; widgets group passes locally (248 tests).
- Claude Code CLI, Claude in Chrome and `gh` installed on the PC. Cloud sessions can't use the PC's terminal; use local Claude Code or `claude remote-control`.
- Built this repository following WordPress/agent-skills conventions, inspired by (not copied from) another contributor's workflow ideas: approval gates, verdict-before-contributing, scope surveys, review tone, Trac MCP.

## Where the source lives
- Fork branch `claude/keen-clarke-4o6qs3` on `rejaulalomkhan/wordpress-develop` contains this folder (`wordpress-contributions/`) and the earlier `CLAUDE.md` brain.
- PR branches on the fork: `tests/widget-search`, `tests/widget-archives`, `tests/widget-calendar`.
