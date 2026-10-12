# Trac access

## WordPress Trac MCP server (read-only, official)

Project: https://github.com/WordPress/trac-mcp

- Core endpoint: `https://wordpress-trac-mcp-server-prod.a8c-aiops.workers.dev/mcp`
- Other Tracs: `/mcp/meta`, `/mcp/themes`, `/mcp/plugins`, … (one client entry per instance)

Connect in Claude Code (user scope, local machine):

```bash
claude mcp add --transport http --scope user wordpress-trac https://wordpress-trac-mcp-server-prod.a8c-aiops.workers.dev/mcp
```

Clients without remote MCP support can bridge with `npx mcp-remote <url>` (see the project README).

Tools:

| Tool | Use |
|---|---|
| `searchTickets` | keywords, numbers or filters joined with `&`, e.g. `component=Widgets&status!=closed&keywords~=needs-unit-tests&order=changetime&desc=1` |
| `getTicket` | ticket, attachments, changesets, human comments, linked PRs (`commentLimit` up to 500) |
| `getChangeset` | `{ "revision": 58504, "includeDiff": false }` |
| `getTimeline` | recent days (max 30) or a `from`/`to` range (max 90 days), optional author filter |
| `getTracInfo` | components, milestones, priorities, severities, types, statuses |

Notes: plain keywords match the summary only — use `description~=text` for bodies. Filters on fields an instance doesn't configure are rejected (Trac itself would silently return everything).

## Without MCP

- Ticket page: `https://core.trac.wordpress.org/ticket/<n>` (the user's browser or Claude in Chrome).
- Posting always requires the user's WordPress.org login in a browser.
- Cloud sessions can't reach Trac or the MCP server; ask the user for screenshots.
