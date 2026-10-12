---
name: wp-core-phpstan
description: "Use when fixing PHPStan errors or retiring PHPStan baseline entries in WordPress Core (wordpress-develop): reproducing the CI job locally, fixing types or annotations instead of ignoring, and removing every baseline entry that becomes stale (ignore.unmatched)."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Uses the repo's Composer PHPStan (composer phpstan) and tests/phpstan baselines."
---

# Core PHPStan

## When to use

- The "PHPStan Static Analysis" CI job fails on a PR.
- The user wants to retire a baseline file/entry (e.g. `tests/phpstan/baselines/booleanOr.alwaysFalse.neon`).

## Inputs required

- The failing error identifier(s) or the baseline file to retire.
- Open PRs touching the same baseline (`gh pr list --repo WordPress/wordpress-develop --search "baseline <identifier>"`) — retirements are popular and often duplicated.

## Procedure

1. Baseline: run `composer phpstan` on clean `upstream/trunk` → expect `[OK] No errors`.
2. Make the change (types, `@phpstan-*` annotations, nullable property docs, or a real code fix). Prefer correcting types over ignoring.
3. Run `composer phpstan` again and read every message:
   - New errors → fix the cause (don't add ignores).
   - `ignore.unmatched` ("Ignored error pattern … was not matched") → the fix also resolved other entries; delete those entries from `tests/phpstan/baselines/*.neon`, and remove an emptied baseline file from `phpstan.neon.dist`.
4. Repeat until `[OK] No errors`.
5. If `src/` docs changed, run PHPCS on the files; if behaviour changed, add tests (`wp-core-fixer`).
6. Commit as `Code Quality: …` or `Docs: …` with `See #<ticket>.` (PHPStan umbrella tickets exist per release; check Trac). Approval gate before the PR.

## Verification

- `composer phpstan` exits 0 with `[OK] No errors` on the branch.
- Every baseline entry the change made obsolete is removed (no `ignore.unmatched`).
- The PR description lists the removed baseline entries.

## Failure modes / debugging

- Only CI fails, locally OK → different PHPStan version or cache; use the repo's `composer.json` version and clear the result cache.
- `@phpstan-impure` placement: Core puts it after `@return` in the docblock; match existing usages (`git grep -n "@phpstan-impure" src`).
- Composer cannot download PHPStan (dist-only package) in restricted networks → install from the tagged git repo via a path repository in a temporary composer file; never commit that file.

## Escalation

- The "fix" would change public types/signatures → discuss on Trac first.
- Another contributor's open PR already retires the same baseline → don't duplicate; review/test theirs instead.
