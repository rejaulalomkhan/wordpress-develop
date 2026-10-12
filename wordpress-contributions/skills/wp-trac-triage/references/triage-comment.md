# Triage comment patterns

Short, factual, Trac WikiFormatting. End with the AI disclosure line.

## Reproduced

Use the Reproduction Report from `wp-core-patch-test/references/report-template.md`, then one line on the next step:
"Reproduced on trunk. The existing PR https://github.com/WordPress/wordpress-develop/pull/<n> looks like the right place to continue; I'll test it next."

## Could not reproduce

```
I couldn't reproduce this on trunk (<version>, PHP <x>, <browser>).

Steps tried:
1. …
2. …

@<reporter> could you share <one precise missing detail> so I can try again?

AI assistance: Claude Code was used to set up and run the reproduction; results reviewed by me.
```

## Possible duplicate

```
This looks like a duplicate of #<n> (<one-line reason>). Leaving it to a maintainer to confirm and close.
```

Don't: change milestone/owner/status, add "+1" comments, or post the same thing twice.
