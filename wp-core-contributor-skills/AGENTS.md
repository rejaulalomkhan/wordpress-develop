# Agent instructions for this repository

This repository contains skills, not WordPress code.

- When asked to do WordPress Core work, start with `skills/wp-core-contributor/SKILL.md` and follow its routing. The actual work happens in the user's `wordpress-develop` clone, not here.
- When editing skills:
  - Keep each `SKILL.md` short and procedural with the sections When to use, Inputs required, Procedure, Verification, Failure modes / debugging, Escalation.
  - Put depth in `references/`; keep references one hop from `SKILL.md`.
  - Add or update a scenario in `eval/scenarios/` for every new or changed behaviour.
  - Run `node shared/scripts/validate-skills.mjs` and make sure it passes before committing.
- New lessons learned from real CI failures or reviews go into the relevant `references/lessons-learned.md` or checklist, with the symptom, cause and fix.
- `data/contributions.json` is the contribution log maintained by `wp-tracker`; keep it valid JSON.
- Never commit tokens, passwords or personal data other than the public GitHub username.
