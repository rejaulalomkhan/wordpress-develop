# wordpress-contributions

Everything for rejaulalomkhan's WordPress Core contributions in one place:

- **Skills** for Claude Code (`skills/`): environment setup, Trac triage, test-driven fixes, unit-test coverage, PHPStan baselines, Patch Testing reports, PR reviews, follow-ups and tracking.
- **WordPress Trac MCP** wired in (`.mcp.json`), so agents read tickets, discussions, linked PRs and changesets directly and decide from them.
- **Contribution log** (`data/*.json`) and a generated dashboard: [`CONTRIBUTIONS.md`](CONTRIBUTIONS.md).

Structure and conventions follow [WordPress/agent-skills](https://github.com/WordPress/agent-skills): short procedural `SKILL.md` files, depth in `references/`, deterministic helpers in `scripts/`, and eval scenarios in `eval/scenarios/`.

## Skills

| Skill | Use it for |
|---|---|
| [`wp-core-contributor`](skills/wp-core-contributor/SKILL.md) | Router: golden rules, profile, untrusted-input policy, picks the right skill |
| [`wp-core-env-setup`](skills/wp-core-env-setup/SKILL.md) | Docker/WSL, Node via `.nvmrc`, wp-env, smoke test |
| [`wp-trac-triage`](skills/wp-trac-triage/SKILL.md) | Read/reproduce a ticket, verdict + recommendation, Trac script |
| [`wp-core-fixer`](skills/wp-core-fixer/SKILL.md) | Test-first bug fixes from Trac tickets |
| [`wp-unit-test-writer`](skills/wp-unit-test-writer/SKILL.md) | New test coverage PRs to committer standards |
| [`wp-core-phpstan`](skills/wp-core-phpstan/SKILL.md) | PHPStan errors and baseline retirement |
| [`wp-core-patch-test`](skills/wp-core-patch-test/SKILL.md) | Testing other people's PRs, Patch Testing reports, cross-testing |
| [`wp-pr-reviewer`](skills/wp-pr-reviewer/SKILL.md) | Code review with severities, tone rules and an approval gate |
| [`wp-core-pr-followup`](skills/wp-core-pr-followup/SKILL.md) | Review feedback and CI failures on your own PRs |
| [`wp-tracker`](skills/wp-tracker/SKILL.md) | "ki khobor?" status, contribution log in `data/`, dashboard |

## Install (Windows, user scope)

```powershell
cd ~
git clone https://github.com/rejaulalomkhan/wordpress-contributions
cd wordpress-contributions
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

This copies every skill to `%USERPROFILE%\.claude\skills\`, so they work in any repository and are never committed to WordPress. Re-run after `git pull` to update.

## WordPress Trac MCP

The official, read-only [WordPress/trac-mcp](https://github.com/WordPress/trac-mcp) server gives agents `getTicket`, `searchTickets`, `getChangeset`, `getTimeline` and `getTracInfo`.

- **In this repo:** `.mcp.json` declares `wordpress-trac` (Core) and `wordpress-meta-trac`. Claude Code asks once to approve them; cloud sessions load them automatically.
- **Everywhere (recommended):**
  ```bash
  claude mcp add --transport http --scope user wordpress-trac https://wordpress-trac-mcp-server-prod.a8c-aiops.workers.dev/mcp
  ```
- **claude.ai / cloud sessions:** add a custom connector with the same URL at https://claude.ai/customize/connectors.
- **No MCP:** `node skills/wp-trac-triage/scripts/trac.mjs ticket <id>` uses the same server over HTTP.

Skills read the ticket's discussion, keywords, linked PRs and changesets before deciding, and recommend not contributing when a ticket is already fixed, covered or heading for closure.

## Contribution log and dashboard

```bash
npm run dashboard   # rebuild CONTRIBUTIONS.md from data/*.json
npm run check       # validate skills + data, fail if the dashboard is stale
```

The `wp-tracker` skill keeps `data/` up to date (`ki khobor?`).

## Use

In Claude Code (CLI or Desktop app), open your `wordpress-develop` clone and either name a skill or just describe the task:

```
/wp-core-fixer https://core.trac.wordpress.org/ticket/66277 fix it, don't commit
/wp-unit-test-writer WP_Widget_Pages
/wp-core-patch-test PR 14199
/wp-pr-reviewer 14195
ki khobor?
```

Every skill stops for your approval before opening a PR or posting any comment, and recommends **not** contributing when a ticket is already fixed, covered or heading for closure.

## Validate

```bash
npm run check
```

Checks skill frontmatter, required sections, referenced files, eval coverage, data files and the dashboard. Run the eval scenarios in `eval/scenarios/` manually after changing a skill.

## বাংলায় সংক্ষেপে

- এটা আপনার WordPress contribution-এর পুরো repo: ১০টা skill, Trac MCP সংযোগ, আর সব PR/review/test report-এর হিসাব (`CONTRIBUTIONS.md`)।
- এখানে WordPress Core-এ contribute করার ১০টা skill আছে। `install.ps1` একবার চালালে আপনার PC-র Claude Code সব জায়গায় এগুলো ব্যবহার করবে।
- কাজের নাম বললেই (যেমন "ei ticket-ta dekho", "WP_Widget_Pages-er test lekho", "ki khobor?") সঠিক skill চালু হবে।
- PR খোলা বা comment পোস্টের আগে সবসময় আপনার অনুমতি নেবে।
- নতুন কিছু শিখলে সংশ্লিষ্ট skill-এর `references/`-এ যোগ করে commit করুন, তারপর আবার `install.ps1` চালান।

## License and AI use

GPL-2.0-or-later (see `LICENSE`). Skills were drafted with AI assistance and reviewed by the maintainer; see [`docs/ai-authorship.md`](docs/ai-authorship.md), following the [WordPress AI Guidelines](https://make.wordpress.org/ai/handbook/ai-guidelines/).
