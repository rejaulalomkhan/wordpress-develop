# Test standards for Core PHPUnit tests

## 1. File and class

- Path mirrors the area: `tests/phpunit/tests/<area>/<camelCaseName>.php`, e.g. `tests/phpunit/tests/widgets/wpWidgetPages.php`.
- Class: `Tests_<Area>_<CamelName> extends WP_UnitTestCase`, class docblock with `@group <area>`.

## 2. Annotations on every test method

```php
/**
 * Tests that <behaviour>.
 *
 * @ticket 65819
 *
 * @covers WP_Widget_Pages::widget
 */
```

- `@covers Class_Name::method_name` or `@covers ::function_name` on each test method.
- `@ticket <n>` on every new test: the defect ticket when there is one, otherwise the release umbrella ticket the PR is filed under (#65819 for 7.2).

## 3. Data providers

- Declare them `public static function data_<test_name>()`, never use `$this` inside.
- Give every data set a readable string key.

## 4. Assertions

| Prefer | Instead of |
|---|---|
| `assertSame()` | `assertEquals()` |
| `assertWPError()` / `assertNotWPError()` | `assertTrue( is_wp_error() )` |
| `assertIsCallable()` | `assertTrue( is_callable() )` |
| `assertIsArray()` / `assertIsNotArray()` | `assertTrue( is_array() )` |
| `assertSameSets()` | sorting arrays by hand for unordered comparison |
| `assertErrorResponse( $code, $response, $status )` | manual REST error checks |

- Always add a message argument when an assertion's purpose isn't obvious.
- HTML: assert attributes through `WP_HTML_Tag_Processor`, not substring matches.
- XML: parse with `DOMDocument` + `DOMXPath` and assert node values. JSON: decode and assert the structure. Avoid fragile entity strings (`&quot;` vs `"`).

## 5. Isolation

- The database is rolled back per test, but globals and static properties are not. Reset what you touch (`$GLOBALS['posts']`, static counters, `$_GET`/`$_POST`, constants you can't undefine → separate process).
- Code that emits HTTP headers, defines constants or exits:
  ```php
  /**
   * @runInSeparateProcess
   * @preserveGlobalState disabled
   */
  ```
- Never install an error handler that returns `false` (`set_error_handler()`); it breaks PHPUnit's own handler. Use `expectDeprecation()`/`setExpectedIncorrectUsage()` or the test-case helpers instead.
- Reflection on private members: guard `setAccessible( true )` with `PHP_VERSION_ID < 80100`.

## 6. Fixtures and doubles

- Use `self::factory()->post->create()` etc.; shared expensive fixtures in `wpSetUpBeforeClass( WP_UnitTest_Factory $factory )`.
- Use `MockAction` to assert hook calls and arguments.
- Use `createMock()` for simple doubles; avoid `getMockBuilder()` unless custom constructor args or methods are required.
- Shared input (e.g. widget `$args`) as a class property. No empty `set_up()`/`tear_down()` overrides; if you override, call the parent.

## 7. What to cover

- Every public method's main path plus the branches that matter: empty/`'0'` values, quotes/HTML, missing keys, filters and their arguments, capability checks.
- Widgets: `__construct` options, `widget()` output (default/custom title, `widget_title` filter args, HTML5 vs XHTML navigation wrapper), `update()` (start old instance enabled; include absent checkboxes), `form()` fields via `_set( 2 )`.
- Assert behaviour, not implementation details (no exact SQL strings).

## 8. Self-review checklist

See `review-checklist.md`; every item must hold before committing.
