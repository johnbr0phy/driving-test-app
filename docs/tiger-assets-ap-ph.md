# AP and Philippine civil-service tiger assets

Nine reviewed sets: `appsych`, `apush`, `apbio`, `apworld`, `aplang`, `apcalcab`, `aphug`, `apgov`, `phcse`. Each has eight expressions at `public/tigers/{id}/tiger_face_01.png` through `08.png`.

## Artwork and QA

Each happy mascot was generated from the existing Tigertest character reference; each other expression was an identity-preserving image edit. Outfits and props stay consistent. Face 05 is a subtle closed-mouth tentative smile, 06 a flat closed mouth, and 08 a worried open mouth with three blue sweat drops. Every master/export pair was visually compared on light and dark backgrounds.

## Deployment size

- 512 × 512 transparent PNGs, preserving the existing asset paths.
- Palette PNG compression follows the merged #398/#401 precedent (quality 90; retain only worthwhile savings). Palette PNGs decode to RGBA but need not have PNG color type 6.
- 72 reviewed exports total **5,238,204 bytes**, down from **18,739,930 bytes** (72.05%). Individual files are 63,822–80,158 bytes.
- Only the nine happy/default images add to the exam OG include pattern: **660,789 bytes**. No source masters, previews, contact sheets or generation files are committed under `public/`.
- Keep #616/#631/#633 tracing exclusions intact. Score-card exam images remain fetched over HTTP; only the root DMV fallback is bundled there. Exam OG cards include face 03 only. No route or deployment configuration changes.

The nine IDs are registered only after all expressions passed review. Their scoped `ap-ph-mascots-1` share-image version precedes `share-copy-1`, refreshing previously cached generic artwork without changing other exams.

Run focused checks: `node --test tests/tiger-ap-ph-sets.test.cjs`. The configuration assertions guard tracing intent; inspect actual build traces after a production build before treating them as verified deployed bundles.
