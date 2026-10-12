# Report templates (Make WordPress Test handbook style)

Source: https://make.wordpress.org/test/handbook/test-reports/patch-testing/ — check it for the current wording.
Trac uses WikiFormatting (`==` headings, `*`/`-` bullets, backticks for code). Preview before submitting.

## Patch Testing Report

```
== Patch Testing Report

Patch Tested: https://github.com/WordPress/wordpress-develop/pull/<n>

=== Environment
- WordPress: <from src/wp-includes/version.php, e.g. 7.2-alpha-63166-src>
- PHP: <version>
- Server: <wp-env (Docker) / PHP CLI (PHPUnit x.y)>
- Database: <MySQL/MariaDB version>
- Browser: <browser + version, or N/A (unit tests)>
- OS: <OS>
- Theme: <theme or N/A>
- MU Plugins: None activated
- Plugins: None activated

=== Actual Results
1. ✅ Issue resolved with patch.

=== Additional Notes
- <facts only: what was run, failed on trunk / passes with patch, any remaining gap>
- AI assistance: Claude Code was used to run the tests; results reviewed by me.

=== Supplemental Artifacts
<screenshots / none>
```

For enhancements, list each expected result in Actual Results and mark ✅ or ❌.

## Bug Reproduction Report

```
== Reproduction Report

=== Description
This report validates whether the issue can be reproduced.

=== Environment
<same fields as above>

=== Actual Results
1. ✅ Error condition occurs (reproduced).   (or ❌ Could not reproduce)

=== Additional Notes
- <steps actually taken>

=== Supplemental Artifacts
<screenshots / none>
```

Keep it short. No long explanations, no marketing tone, no repeated summaries.
