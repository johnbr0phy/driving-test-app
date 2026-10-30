# Citizenship and PMP tiger artwork

Four dedicated sets cover Life in the UK (`uklitu`), Canadian citizenship
(`cacit`), Australian citizenship (`aucit`) and Project Management Professional
(`pmp`). Each set contains eight 512 × 512 transparent RGBA PNGs under
`public/tigers/<examId>/tiger_face_01.png` through `tiger_face_08.png`.

The happy characters were approved before the remaining expressions were made.
Each expression uses the built-in image generation tool with that character as
its identity reference. The source costume, props and colors stay consistent:

- UK: navy blazer, burgundy scarf, Union Jack and burgundy Parliament handbook.
- Canada: red vest, cream shirt, Canadian flag and maple-leaf handbook.
- Australia: green-and-gold polo, Australian flag and green wattle handbook.
- PMP: teal shirt, navy waistcoat, pencil and three-check task clipboard.

The existing expression and score mapping is unchanged: crowned 01 (100%),
celebrating 02 (85–99%), happy 03 (70–84%), confident closed smile 04
(55–69%), tentative closed smile 05 (40–54%), neutral closed mouth 06
(25–39%), closed frown 07 (10–24%), worried open mouth and sweat 08 (0–9%).
Expression 03 is also the default category portrait.

`lib/tigerAssets.ts` registers the complete sets. The existing resolver applies
them to test cards, headers, dashboards, results, training and score images.
Only these four exams receive a fresh social-image URL version. Other exam
artwork, root branding, question banks, scoring and pass marks are unchanged.

Run `node --test tests/tiger-global-sets.test.cjs` to verify each exported PNG's
dimensions and RGBA format, eight distinct files, registry resolution, score
boundaries and unchanged fallback behavior. Actual transparency and expression
quality also require pixel and visual review.
