# Scope survey for an umbrella ticket (e.g. #65819 test improvements)

Goal: find meaningful, untaken work — not the smallest possible change.

## 1. What already happened

- Landed: changesets referencing the ticket — Trac MCP `getTicket` (changesets section) or `git log upstream/trunk --oneline --grep "#<ticket>"`.
- Closed without merge: `gh pr list --repo WordPress/wordpress-develop --state closed --search "<ticket>"`; note why (duplicate, superseded).
- Open: `gh pr list --repo WordPress/wordpress-develop --state open --search "<ticket>"` plus open PRs that mention the target class without the ticket number.
- Record who is working on what so nobody's scope is taken.

## 2. Find candidates

- Run `scripts/find_untested.mjs` over likely directories (`src/wp-includes/widgets`, `sitemaps`, `rest-api/endpoints`, `html-api`, `class-wp-*.php` helpers, `wp-admin/includes`).
- Keep classes with 0–1 test files and size `medium` or `complex`. Skip `small` ones unless they hide tricky branches.
- For functions (not classes): `git grep -c "<function>(" upstream/trunk -- tests/phpunit`.
- Drop anything already in an open PR (step 1).

## 3. Present 10–20 scopes

| # | Scope | Size | Why it matters | Risk / notes | Taken? |
|---|---|---|---|---|---|
| 1 | `WP_Widget_Pages` | medium (23 branches) | `exclude`/`sortby` handling, filters | needs page fixtures | no |

- Prefer scopes with real logic (sanitisation, capability checks, filters, error paths) over constructor-only checks.
- Mark the recommended next one, keep the one-PR-per-day rule, and wait for the user's pick.
