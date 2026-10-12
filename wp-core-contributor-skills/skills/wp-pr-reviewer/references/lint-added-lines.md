# Lint only the lines a PR adds

```bash
git fetch upstream trunk
git fetch upstream pull/<n>/head:pr-<n>
base=$(git merge-base upstream/trunk pr-<n>)
files=$(git diff --name-only --diff-filter=AM "$base" pr-<n> -- '*.php')

git switch --detach pr-<n>
vendor/bin/phpcs --report=json $files > /tmp/phpcs.json   # or: npm run env:composer -- run lint -- $files
git diff -U0 "$base" pr-<n> -- $files                      # added line ranges: lines starting with @@ ... +start,count
git switch -                                               # back to where you were
```

Keep only PHPCS messages whose line falls inside an added range (`+start` … `+start+count-1`). For JS, run `npx eslint <files>` and filter the same way.

Rules:
- Requires a clean working tree. If `git status` isn't clean, skip linting and tell the user.
- Never commit, stash or reset the user's work to make room.
- Pre-existing problems on unchanged lines are out of scope for the review.
