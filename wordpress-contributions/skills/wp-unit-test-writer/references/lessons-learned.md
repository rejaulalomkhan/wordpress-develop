# Lessons learned (from real CI failures and reviews)

| Symptom | Cause | Fix |
|---|---|---|
| Every PHP 8.5 job fails | `ReflectionProperty::setAccessible()` is deprecated in 8.5 (no effect since 8.1) | `if ( PHP_VERSION_ID < 80100 ) { $property->setAccessible( true ); }` |
| Calendar table assertion fails (multisite or alone) | `get_calendar()` prints nothing without published posts | create a post in the test |
| "No posts" test fails only in the full suite | `get_calendar()` skips its no-posts check when global `$posts` is populated by an earlier test | `unset( $GLOBALS['posts'] );` before rendering |
| `Failed asserting that 'checked' is true` | `checked()` outputs `checked='checked'`, so `get_attribute( 'checked' )` returns `'checked'` | `assertSame( 'checked', … )` |
| Attribute assertions pass by accident | `next_tag()` only supports `tag_name`, `class_name`, `match_offset`, `tag_closers`; an `id` key is ignored | use `next_tag( 'INPUT' )` then `assertSame( '<id>', get_attribute( 'id' ) )` |
| Static counter leaks between tests | private static properties (e.g. `WP_Widget_Calendar::$instance`) | reset via reflection in `set_up()`/`tear_down()` (guard `setAccessible`) |
| `update()` test proves nothing | old instance already had `0` values | start old instance at `1`, test checkboxes absent from new instance |
| Reviewer: remove empty `tear_down()` | override only called the parent | delete it |
| Reviewer: repeated `$args` arrays | duplicated fixtures | class property |
