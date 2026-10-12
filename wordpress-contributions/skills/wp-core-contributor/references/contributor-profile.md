# Contributor profile

- GitHub: `rejaulalomkhan`. Trac: WordPress.org account (browser login).
- Language: reply in Bangla; public text in English.
- Goal: trusted, noteworthy Core contributor through quality, not volume.

## Machine

- Windows + PowerShell (oh-my-posh "CONFIG NOT FOUND" banner is cosmetic).
- Docker Desktop with WSL 2.
- Node via fnm `--use-on-cd`; repo uses `.nvmrc` (24.18 at time of writing); global Node 22 stays for other projects.
- `gh` logged in as rejaulalomkhan. Claude Code CLI and the Claude in Chrome extension installed.
- Clone: `C:\Users\User\wordpress-develop`, remotes `origin` (fork) and `upstream` (WordPress/wordpress-develop).
- Never run Claude Code from an Administrator shell.

## Surfaces

| Surface | Can | Cannot |
|---|---|---|
| Local Claude Code | code, Docker tests, push to fork, `gh` on the WordPress repo | browser-only actions |
| Claude in Chrome | GitHub UI, Trac comments, Playground UI testing | run tests |
| Cloud Claude Code session | push to the fork, run PHPUnit in its own container; Trac MCP when the repo's `.mcp.json` is loaded or the WordPress Trac connector is enabled, and the network allows the MCP host | GitHub API on WordPress/wordpress-develop, posting to Trac, make.wordpress.org |
