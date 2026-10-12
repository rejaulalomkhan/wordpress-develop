# Reply templates

## Addressed review

```
@<reviewer> Thanks for the review! Addressed in <sha>:

- <change 1>
- <change 2>
```

## Not changing something (politely, with a reason)

```
Thanks! I kept <X> because <evidence/reason>. Happy to change it if you still prefer <Y>.
```

## CI fixed

```
The failing <job> was caused by <cause>; fixed in <sha>. All checks are green now.
```

## Closing in favour of another PR

```
Thanks @<user>. #<n> covers the same change and also <extra>, so closing in favour of #<n>.
```

Rules: no AI footer needed on short replies to your own PR (the PR body already discloses AI use); never edit a posted comment expecting Trac to update.
