# Commit messages and inline docs for Core fixes

## Commit message

```
<Component>: <Imperative summary ending with a period>.

<Why the bug happened and what changes, in prose.>

Follow-up to [r12345].

See #<ticket>.
```

- Component prefixes follow Trac components: `Widgets:`, `Taxonomy:`, `Media:`, `REST API:`, `Docs:`, `Tests:`, `Code Quality:`, `Build/Test Tools:` …
- Use `Fixes #<ticket>.` only if the change fully resolves the ticket.
- Committers rewrite messages on commit; a clear one still helps review.

## Docblocks

- New function/hook: summary, `@since <x.y.0>`, all `@param` with types and descriptions, `@return`.
- Changed behaviour: add a line under the existing `@since` tags, e.g. `@since 7.2.0 Now matches HTML-encoded term names.`
- Types: `int`, `bool`, `callable`, `string|null`, `array<string, mixed>` — not `integer`, `boolean`, `callback`.
- Hooks: `do_action()`/`apply_filters()` preceded by a hook docblock.
