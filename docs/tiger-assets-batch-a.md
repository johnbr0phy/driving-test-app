# Batch A professional exam tiger assets

Ten reviewed sets replace borrowed mascots: `cpafar`, `cpareg`, `nmls`,
`series63`, `series65`, `aswb`, `arrt`, `nce`, `texesppr`, `praxisplt`.
Each has eight expressions at `public/tigers/{id}/tiger_face_01.png` through
`08.png`. Expression 03 is the happy default. Existing score thresholds and
exam pass marks are unchanged.

## Artwork and size

- All 80 exports are transparent 512 × 512 PNGs. The same character, clothing
  and props persist through each set. Every expression and optimized export
  passed visual review on light and dark backgrounds.
- Quality-90 palette compression follows the existing production approach.
  Tests decode pixels to check alpha; palette PNGs need not have color type 6.
- The reviewed files total **6,383,409 bytes**, down from **18,586,493 bytes**
  of masters. Individual exports are 69,833–86,672 bytes.
- The ten happy faces add **804,432 bytes** to the existing exam OG include.
  Score-card exam images remain fetched over HTTP. No tracing, route or
  deployment configuration changes are needed.
- Masters, previews, contact sheets, ZIPs and generation files stay outside
  `public/`. SHA-256 checksums for the exact approved exports live in
  `tests/fixtures/tiger-batch-a-sha256.json`.

The registry adds only these complete sets and removes their borrowed aliases.
The scoped `batch-a-mascots-1` share-image version precedes `share-copy-1`,
so social crawlers request the new art without invalidating other exams.

Run `node --test tests/tiger-batch-a-sets.test.cjs` for exact hashes, mappings,
share-card selection, cache precedence, score boundaries, decoded alpha,
clear margins, distinct expressions and file-size guards. Trace configuration
assertions preserve existing inclusion rules; they do not replace inspection
of an actual production build trace.
