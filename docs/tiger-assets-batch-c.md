# Batch C professional exam tiger assets

Batch C adds two role-specific eight-expression sets. `rdexam` uses a
dietitian in a white coat and teal shirt holding a nutrition plate.
`phr` uses an HR professional in a teal jacket holding a navy folder
with a people symbol. They replace the borrowed food-manager and CAPM
artwork respectively. The character, outfit and props remain consistent
through each set, following `docs/TIGER_ASSET_PROMPTS.md`.

The other eight exams continue to reuse reviewed family artwork without
duplicating any files:

| Exam ID | Existing family |
| --- | --- |
| `aswbclin` | `aswb`: social work |
| `cisa` | `cissp`: cybersecurity |
| `cssgb` | `pmp`: project management |
| `ccs` | `cpc`: medical coding |
| `praxis5001` | `praxis`: teacher certification |
| `fladjuster` | `pnc`: property and casualty insurance |
| `llqp` | `insurance`: life and health insurance |
| `cemap` | `nmls`: mortgage professional |

## Production exports

New files live at `public/tigers/{rdexam,phr}/tiger_face_01.png` through
`08.png`. All sixteen exports are transparent 512 × 512 PNGs, with clear
transparent outer margins. Expression 03 remains the
happy default. Existing score boundaries and exam pass marks do not change.

Only reviewed optimized exports belong under `public/`. Masters, prompts,
ZIPs and contact sheets remain outside it. Exact export SHA-256 checksums
are recorded in `tests/fixtures/tiger-batch-c-sha256.json`. Budgets remain
100 KB per PNG, 1.6 MB for the sixteen exports and 200 KB for the two new
default faces. Palette PNGs must retain decoded alpha and crisp edges.
Quality-90 palette compression follows the earlier batches. The reviewed
sixteen-file batch totals **1,021,162 bytes**, with **128,497 bytes** for
the two happy defaults. Individual PNGs range from 60,809 to 66,517 bytes.

The scoped `batch-c-mascots-1` share-image version refreshes only `rdexam`
and `phr`, ahead of `share-copy-1`. All other exam cache versions stay
unchanged. Existing tracing includes only happy face 03 for exam cards.
Score-card exam images remain fetched over HTTP, and full tiger sets stay
excluded from that function. No route or deployment-configuration changes
are needed.

Run `node --test tests/tiger-batch-c-sets.test.cjs` for all ten batch-C
mappings, score boundaries, cache scope, exact export hashes, decoded
alpha, clear margins, distinct expressions and size budgets. Run all
`tests/tiger-*.test.cjs` for earlier-set regressions. Trace-configuration
assertions do not replace inspection of a real production build trace.
