# Batch B professional exam tiger assets

Batch B uses two new role-specific eight-expression sets and eight reviewed
existing exam mappings across six mascot families. Reusing a set does not duplicate its files.

| Exam ID | Artwork |
| --- | --- |
| `nhie` | New home inspector set |
| `nptepta` | New physical therapy assistant set |
| `cma` | `ccma`: medical assisting |
| `nbdhe` | `danb`: dental care |
| `txadjuster` | `pnc`: property and casualty insurance |
| `sfadmin` | `aws`: cloud computing |
| `cfal1` | `series7`: finance and investment |
| `cpaaud` | `cpafar`: accounting, ledger and calculator |
| `accafa` | `cpafar`: accounting, ledger and calculator |
| `aatl2` | `cpafar`: accounting, ledger and calculator |

The three accounting exams now share the accountant artwork rather than the
medical-coding CPC mascot. Home inspection and physical therapy have their
own role art rather than construction safety and personal training.

## Production exports

New sets live at `public/tigers/{id}/tiger_face_01.png` through `08.png`.
All sixteen exports are transparent 512 × 512 PNGs. Expression 03 remains
the happy default. Score boundaries and exam pass marks do not change.
Quality-90 palette compression follows batch A. Decoded pixels must retain
alpha, clear outer margins and eight distinct expressions per set.

Only optimized exports belong under `public/`. Masters, ZIPs, previews and
contact sheets stay outside it. Exact reviewed export checksums live in
`tests/fixtures/tiger-batch-b-sha256.json`. The budget is 100 KB per PNG,
1.6 MB for the sixteen exports and 200 KB for the two new happy faces.
The approved exports total **1,310,903 bytes**, with **164,973 bytes** for
the two happy faces. Individual PNGs range from 68,052 to 97,912 bytes.

The `batch-b-mascots-1` share-image version refreshes only `nhie`, `nptepta`,
`cpaaud`, `accafa` and `aatl2`, ahead of the existing share-copy version.
The other five batch B mappings and cache versions remain unchanged.

No route or deployment configuration changes are needed. Existing exam-card
tracing includes only happy face 03. Score-card exam images remain fetched
over HTTP, and the tracing exclusions keep full sets out of that function.

Run `node --test tests/tiger-batch-b-sets.test.cjs` for mappings, score
boundaries, share-card selection, cache scope, exact hashes, decoded alpha,
margins and size budgets. Run all `tests/tiger-*.test.cjs` for previous-set
regressions. Trace-configuration assertions are not a substitute for checking
the final production build trace.
