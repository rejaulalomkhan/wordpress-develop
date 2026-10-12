# Start here (read at the beginning of every session)

This is rejaulalomkhan's WordPress contributions repository: skills, Trac MCP config and the contribution log. Reply to the user in **Bangla**; write code, commits, PRs and public comments in **English**.

## First steps in a new session

1. Read `AGENTS.md`, then `skills/wp-core-contributor/SKILL.md` and its `references/` (golden rules, profile, untrusted input, Trac MCP, decision tree).
2. For any WordPress task, follow the routing in `skills/wp-core-contributor/references/decision-tree.md` and read the chosen skill's `SKILL.md` before acting. These skills live in `skills/`; they are not auto-loaded as Claude Code skills in this repo, so read the files.
3. Read `CONTRIBUTIONS.md` for the current state of PRs, reviews, test reports and planned scopes.
4. Check what this session can reach (report it to the user in one line):
   - Trac: WordPress Trac MCP tools (`getTicket` …) from `.mcp.json` or a connector; else `node skills/wp-trac-triage/scripts/trac.mjs ticket 65819 --comments 1`.
   - GitHub: `gh auth status` (local PC) — cloud sessions can only push to repositories attached to the session.
   - wordpress-develop clone: local `~/wordpress-develop` (PC) or attach `rejaulalomkhan/wordpress-develop` to the session.

## Where things are

| What | Where |
|---|---|
| Skills (10) | `skills/` |
| Contribution log | `data/*.json` → `npm run dashboard` → `CONTRIBUTIONS.md` |
| Checks | `npm run check` |
| History of how this was built | `docs/history.md` |

## Never

- Open a PR or post a GitHub/Trac comment without showing the text and getting approval.
- Ask for or store tokens/passwords. Branch from the fork's outdated `trunk`.
