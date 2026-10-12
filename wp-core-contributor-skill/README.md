# wp-core-contributor-skill

An all-in-one [Claude Code](https://claude.com/claude-code) skill for contributing to WordPress Core (`WordPress/wordpress-develop` + Core Trac): environment setup, picking work, writing test-coverage PRs, Patch Testing reports, answering reviews and CI failures, and status checks.

The skill lives in [`skills/wp-core-contribute/SKILL.md`](skills/wp-core-contribute/SKILL.md).

## Install (Windows)

```powershell
cd ~
git clone https://github.com/rejaulalomkhan/wp-core-contributor-skill
cd wp-core-contributor-skill
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

This copies the skill to `%USERPROFILE%\.claude\skills\wp-core-contribute`, so it works in every repository and branch and is never committed to WordPress.

## Update

```powershell
cd ~\wp-core-contributor-skill
git pull
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

## Use

In Claude Code, type `/wp-core-contribute`, or simply describe the task, for example:

- "ki khobor?" (status of my Core PRs)
- "Write unit tests for WP_Widget_Pages"
- "Give a test report for PR 14199"
- "PR 14186 CI failed, fix it"

## বাংলায় সংক্ষেপে

- এই repo-তে WordPress Core-এ contribute করার পুরো নিয়ম আর পদ্ধতি একটা skill হিসেবে রাখা আছে।
- উপরের install command একবার চালালে আপনার PC-র Claude Code সবসময় এই নিয়ম মেনে চলবে।
- নতুন কিছু শিখলে `SKILL.md` আপডেট করে commit করুন, তারপর আবার `install.ps1` চালান।

## Safety

- Never put tokens, passwords or other secrets in this repository.
- The skill requires the user's approval before any push, PR, or public comment, and always includes an AI-use disclosure, following the [WordPress AI Guidelines](https://make.wordpress.org/ai/handbook/ai-guidelines/).
