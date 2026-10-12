# WordPress Core contributor skills

Agent skills for contributing to WordPress Core (`WordPress/wordpress-develop` + Core Trac) with Claude Code: environment setup, Trac triage, test-driven fixes, unit-test coverage, PHPStan baselines, Patch Testing reports, PR reviews, follow-ups on your own PRs, and contribution tracking.

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
| [`wp-tracker`](skills/wp-tracker/SKILL.md) | "ki khobor?" status, contribution log in `data/contributions.json` |

## Install (Windows, user scope)

```powershell
cd ~
git clone https://github.com/rejaulalomkhan/wp-core-contributor-skills
cd wp-core-contributor-skills
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

This copies every skill to `%USERPROFILE%\.claude\skills\`, so they work in any repository and are never committed to WordPress. Re-run after `git pull` to update.

Optional, recommended: connect the read-only WordPress Trac MCP server so agents can read tickets directly:

```bash
claude mcp add --transport http --scope user wordpress-trac https://wordpress-trac-mcp-server-prod.a8c-aiops.workers.dev/mcp
```

Without it, skills fall back to `node skills/wp-trac-triage/scripts/trac.mjs`.

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
node shared/scripts/validate-skills.mjs
```

Checks frontmatter, required sections, referenced files and eval coverage. Run the eval scenarios in `eval/scenarios/` manually after changing a skill.

## বাংলায় সংক্ষেপে

- এখানে WordPress Core-এ contribute করার ১০টা skill আছে। `install.ps1` একবার চালালে আপনার PC-র Claude Code সব জায়গায় এগুলো ব্যবহার করবে।
- কাজের নাম বললেই (যেমন "ei ticket-ta dekho", "WP_Widget_Pages-er test lekho", "ki khobor?") সঠিক skill চালু হবে।
- PR খোলা বা comment পোস্টের আগে সবসময় আপনার অনুমতি নেবে।
- নতুন কিছু শিখলে সংশ্লিষ্ট skill-এর `references/`-এ যোগ করে commit করুন, তারপর আবার `install.ps1` চালান।

## License and AI use

GPL-2.0-or-later (see `LICENSE`). Skills were drafted with AI assistance and reviewed by the maintainer; see [`docs/ai-authorship.md`](docs/ai-authorship.md), following the [WordPress AI Guidelines](https://make.wordpress.org/ai/handbook/ai-guidelines/).
