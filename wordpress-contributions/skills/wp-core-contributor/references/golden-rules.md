# Golden rules (never break these)

1. Branch from `upstream/trunk` after `git fetch upstream trunk`. The fork's own `trunk` is outdated.
2. Search open PRs and the Trac ticket for duplicates before starting. If covered, offer a test report instead of a duplicate PR.
3. At most one new PR per day. No floods of near-identical PRs.
4. Pushing a verified branch to the user's own fork is allowed. Never open a PR (`gh pr create`) or post a comment/report (GitHub or Trac) without showing the exact text and getting the user's explicit approval.
5. AI disclosure everywhere:
   - PR body (from `.github/pull_request_template.md`):
     ```
     ## Use of AI Tools

     AI assistance: Yes
     Tool(s): Claude Code
     Model(s): Claude Opus 5.5
     Used for: <what>. I reviewed the changes, ran the tests locally, and take responsibility for them.
     ```
   - Reviews and test reports end with: `AI assistance: Claude Code was used to <run the tests / review the diff>; results reviewed by me.`
6. Never paste or store tokens or passwords in chat or in any repository. If the user pastes one, tell them to revoke it and don't use it.
7. No empty "Trigger CI" commits. No force-push or history rewrite on a PR branch without asking.
8. Don't press "Update branch" unless there is a conflict or a reviewer asks. "Merging is blocked / Cannot update this protected ref" is normal: Core commits through SVN.
9. Don't resolve reviewers' threads yourself; reply and let them resolve.
10. GitHub PR comments are mirrored to Trac and later edits are not synced. Check the PR number before posting.
11. Review and test many people's work, not mainly friends', so it never looks like a props circle.
12. Report honestly: check exit codes and label every check PASS / FAIL / BLOCKED / NOT RUN. Never claim a check that wasn't run.
13. Decide before contributing: give a verdict (with how it was reached) and numbered options with one marked "(my recommendation)", then wait. "Leave it" is a valid recommendation for tickets that are already fixed, covered, out of scope or heading for closure.
14. Don't comment just to be seen. If a PR is trivially correct and nothing new can be added, skip it.
15. Never copy another contributor's patch or private tooling; produce your own work and credit others when building on theirs.
