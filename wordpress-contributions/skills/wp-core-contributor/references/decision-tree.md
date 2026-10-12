# Routing decision tree

```
Is the local environment working (Docker engine running, `npm run test:php` OK)?
├─ no  → wp-core-env-setup
└─ yes
   Whose work is it?
   ├─ the user's own open PR
   │   ├─ reviewer feedback or red CI → wp-core-pr-followup
   │   └─ just checking progress      → wp-tracker
   ├─ someone else's PR
   │   ├─ "test it" / report wanted   → wp-core-patch-test
   │   └─ "review the code"           → wp-pr-reviewer
   └─ new work
       ├─ Trac ticket needs reproducing / triage → wp-trac-triage
       ├─ Trac bug with a clear cause            → wp-core-fixer
       ├─ class or function without tests        → wp-unit-test-writer
       └─ PHPStan error or baseline entry        → wp-core-phpstan
```

When a task spans several skills (e.g. a fix that also retires a PHPStan baseline entry), run them in that order and apply the stricter rule when they differ.
