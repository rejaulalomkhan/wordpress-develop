# AI authorship disclosure

Following the [WordPress AI Guidelines](https://make.wordpress.org/ai/handbook/ai-guidelines/).

| Aspect | Details |
|---|---|
| AI tool | Claude Code |
| Model | Claude Opus 5.5 |
| Source material | Hands-on work on WordPress/wordpress-develop PRs (CI failures reproduced and fixed, reviews received, test reports), the WordPress/agent-skills authoring guide, the WordPress/trac-mcp README and tests, the Core PR template and the Make WordPress Test handbook |
| Human review | The maintainer (rejaulalomkhan) reviews every skill before use |
| Testing | `shared/scripts/validate-skills.mjs`; helper scripts tested against the wordpress-develop trunk checkout (`find_untested.mjs`) and a local mock of the Trac MCP protocol (`trac.mjs`); eval scenarios are run manually |
| License | GPL-2.0-or-later |

Ideas about workflow (approval gates, verdict-before-contributing, review tone, test standards) were inspired by discussions with other contributors; the text and scripts here are original.

Skills will contain mistakes. When a skill gives bad advice, fix the skill, add the lesson to its references, and add or update an eval scenario.
