# Verdict before contributing

Before writing any code or comment for a ticket, decide whether a contribution is worth making, and tell the user. Not contributing is often the right answer.

## 1. Check the signals

- Already fixed? Search changesets and the ticket's linked changesets; check whether trunk already has the fix (`git log upstream/trunk --grep "#<ticket>"`, read the current code).
- Heading for closure? Keywords `close`, `reporter-feedback`, `needs-patch` removed, a maintainer saying "can't reproduce" / "belongs to plugin X".
- Already covered? An open PR or patch that addresses it (then test or review that instead).
- Ticket version vs current trunk: an old report may describe behaviour that has since changed.
- Scope: is the remaining problem Core's, or a plugin/theme's (e.g. a plugin notice)?

## 2. State the verdict with its basis

One of:

| Verdict | Meaning |
|---|---|
| `REPRODUCED` | Seen on current trunk with exact steps |
| `NOT-REPRODUCIBLE` | Tried and couldn't reproduce on trunk |
| `ALREADY-FIXED` | Fixed in a changeset (name it, e.g. [r62943]) |
| `COVERED` | An existing PR/patch addresses it |
| `OUT-OF-SCOPE` | Belongs to a plugin/theme or is intended behaviour |
| `NEEDS-INFO` | Can't decide without more details from the reporter |

Always say how the verdict was reached: "from reading the code only", "reproduced in wp-env on PHP 8.3", "browser check not done because Docker isn't running". Never present a code-reading guess as a confirmed reproduction.

## 3. Offer options, mark one as the recommendation, then stop

```
How to proceed?
1. Leave it (my recommendation): <why — e.g. ticket likely to be closed; a patch against a `close`-keyword ticket is unlikely to land>.
2. Verify visually: <what the user must start/do, what you'll then do>.
3. Patch the leftover: <smallest change>, only after option 2 confirms the problem.
```

Wait for the user's choice. Don't start Docker, install anything, or write code until they pick.
