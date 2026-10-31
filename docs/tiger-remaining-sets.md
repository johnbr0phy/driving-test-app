# Remaining exam tiger sets

Dedicated eight-expression sets are available for: `capm`, `psm`, `cissp`, `rbt`, `pcoc`, `ukseru`, `ibpspo`, `ctet`, `praxis`, `gre`.

Each exam has eight 512 × 512 transparent RGBA PNGs in
`public/tigers/<examId>/tiger_face_01.png` through `tiger_face_08.png`.
The happy default is expression 03. Expressions follow
[`TIGER_ASSET_PROMPTS.md`](TIGER_ASSET_PROMPTS.md), retaining the character's
clothing, props, colors and pose across its score reactions.

The built-in image tool generated the artwork. Visual review covers identity,
expression progression, costume, props and clear margins. Pixel checks verify
actual transparent backgrounds, opaque characters, clear outer edges and eight
distinct expressions. The Library source ZIPs are retained with their metadata
in the integration workspace.

`lib/tigerAssets.ts` registers only complete, reviewed sets. The shared resolver
uses them across catalog cards, dashboards, training, results and score images.
Only these exams get the `remaining-mascots-1` social-image cache version.
Site branding, borrowed sets, earlier cache versions and score cutoffs stay intact.

Run `node --test tests/tiger-remaining-sets.test.cjs` to verify decoded RGBA
pixels, dimensions, transparency, margins, distinct expressions, registry paths,
all score boundaries and scoped social-image URLs.
