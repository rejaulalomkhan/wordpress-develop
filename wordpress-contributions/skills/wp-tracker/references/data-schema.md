# data/ schema (one JSON array per file)

| File | Required fields | Optional |
|---|---|---|
| `prs.json` | `number`, `repo`, `title`, `state` (`open`/`merged`/`closed`), `url` | `ticket`, `ci` (`green`/`red`/`pending`/`unknown`), `opened`, `updated`, `notes` |
| `reviews.json` | `number`, `repo`, `date`, `summary` | `ticket`, `recommendation` (`Comment`/`Request changes`/`Approve`), `url` |
| `test-reports.json` | `ticket`, `target`, `where` (`trac`/`github`), `status` (`prepared`/`posted`), `date`, `summary` | `url` |
| `trac-comments.json` | `ticket`, `date`, `summary` | `comment` (number), `url` |
| `props.json` | `changeset`, `ticket`, `date` | `summary` |
| `scopes.json` | `scope`, `status` (`candidate`/`in-progress`/`pr-open`/`done`/`taken`) | `ticket`, `size` (`small`/`medium`/`complex`), `notes` |

Dates are `YYYY-MM-DD`. After editing, run `npm run dashboard` and `npm run check`.

Example `reviews.json` entry:

```json
{
  "number": 14195,
  "repo": "WordPress/wordpress-develop",
  "ticket": 66287,
  "date": "2026-10-12",
  "recommendation": "Comment",
  "summary": "Tests pass on single site, multisite and PHP 8.5; permission test catches a mutated check."
}
```
