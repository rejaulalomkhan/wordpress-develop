---
name: wp-pr-reviewer
description: "Use when code-reviewing someone else's pull request on WordPress/wordpress-develop: reading the diff and the code around it, running linters on added lines, writing severity-tagged findings anchored in the diff, a warm main comment with a one-line AI footer, and an approval gate before anything is posted."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Needs gh CLI for posting reviews and a clean wordpress-develop checkout with Docker for linting."
---

# PR reviewer (WordPress Core)

## When to use

- The user asks to review a PR (code quality, correctness, standards), not only to test it. For a pure test run, use `wp-core-patch-test`.

## Inputs required

- PR number. Its head SHA (`gh pr view <n> --repo WordPress/wordpress-develop --json headRefOid,author,files,reviews,comments`).
- The linked Trac ticket and any competing PRs on it.
- Whether the user has already reviewed or commented on this PR.

## Procedure

1. **Context**
   - Read the Trac ticket and existing reviews. If another PR already solves the ticket better, the review can be a short, kind pointer to it.
   - Failing CI: read the failed job log down to the actual assertion/error and tie it to a diff line. Leave out failures the PR didn't cause (runner errors, flaky infra).
2. **Tools** (clean checkout + Docker running; otherwise skip and say so — don't clean the user's checkout):
   - `git fetch upstream pull/<n>/head:pr-<n>`; run PHPCS (and ESLint for JS) on **added lines only** — see `references/lint-added-lines.md`.
   - Style findings come only from these tools; don't hand-review whitespace or braces.
   - Behaviour changes: run the PR's PHPUnit tests or hand over to `wp-core-patch-test`.
3. **Review** with `references/review-checklist.md` (security, back-compat, docs, tests, performance, code quality). For each real problem record: `file:line`, severity (**Blocking / Should fix / Nit / Question**), why it matters, a concrete suggestion.
   - Anchor every claim in the diff. If unsure, make it a Question. Don't invent problems to look thorough.
   - Read the code under review, not only the diff: for a test PR, open the function being tested and check each assertion against the source; for a source change, read the callers.
   - Verify the PR's own claims (e.g. "had no tests": search `tests/phpunit` for the function).
4. **Write** following `references/review-format.md`: one main comment (tone rules, ends with the AI footer) plus inline comments without footers. Recommend Comment / Request changes / Approve.
5. **Approval gate** (required): show what was verified and what wasn't, the main comment and every inline comment with line and severity, then ask:
   1. Post everything
   2. Post the main comment with only Blocking + Should-fix inline comments
   3. Pick which comments to post
   4. Post as a single general PR comment instead
   5. Edit the draft, or cancel
   Wait for an explicit answer. Running non-interactively → don't post; leave the draft file and report its path.
6. **Post** (only after 1–4): re-check `headRefOid`; if the head moved, re-read the diff and line numbers first. Create the review with its body in one call (GitHub can't add a body later). Then log it with `wp-tracker`.

## Verification

- Every finding has file:line, severity and a suggestion, and is reproducible from the diff.
- The posted review has exactly one AI footer, on the main comment.
- The PR head SHA at posting time matches the one reviewed.

## Failure modes / debugging

- Line numbers drifted after a push → re-fetch and re-anchor before posting.
- Review posted without a body → tell the user; don't post an extra comment just to add the footer.
- Lint flags lines the PR didn't add → drop them; they're pre-existing.

## Escalation

- Security-sensitive findings (XSS, SQLi, capability bypass): don't post publicly; tell the user to report via HackerOne/security channels.
- Approve only when there are no Blocking or Should-fix findings **and** the user says they reviewed the change themselves — AI must never be the only reviewer.
