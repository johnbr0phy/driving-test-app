# EU citizenship and practitioner tiger assets

Five complete eight-expression sets replace mismatched artwork for six of
the 43 EU exams introduced in PR #718. The other 37 keep their existing
reviewed family artwork. No question bank, pass mark or score boundary changes.

| Exam | Set | Character and props |
| --- | --- | --- |
| Swedish citizenship (`semedb`) | `semedb` | Navy blazer, cream shirt, yellow scarf, Swedish flag and blue civic-study book. |
| Danish citizenship (`dkindfoed`) | `dkindfoed` | Navy blazer, cream shirt, red scarf, Danish flag and red civic-study book. |
| Danish residence civics (`dkmedborger`) | `dkindfoed` | Shares the Danish citizenship artwork, with no duplicate images. |
| Greek citizenship (`grcitizen`) | `grcitizen` | Blue blazer, cream shirt, white scarf, Greek flag and blue civic-study book with a classical temple. |
| Romanian residency (`rorezid`) | `rorezid` | Medical resident in a white coat over blue scrubs, stethoscope, study book, clipboard and Romanian tricolor pin. No nursing insignia. |
| German Heilpraktiker (`deheilpr`) | `deheilpr` | Non-physician practitioner in a green cardigan with an anatomy book and checklist. No doctor label, clinical uniform or nursing insignia. |

## Generation and visual review

Artwork was made with the built-in image generation tool, using the existing
citizenship and dietitian mascots as style references. Each set starts with
happy face 03. Each other expression is a separate edit of that exact
character, preserving the outfit, props, pose and markings. Mechanical PNG
resizing and palette optimization preserve the generated alpha channel.

The shared prompt follows `docs/TIGER_ASSET_PROMPTS.md`: a centered chest-up
friendly orange tiger, thick clean black outlines, cream cheek tufts,
pink-red nose, big expressive eyes and crisp shaded cartoon illustration.
The full ears, paws and accessories stay inside the frame, with transparent
margins. There is no background, readable text or watermark.

The role prompts are the clothing and prop descriptions in the table above.
Swedish and Danish flags have their Nordic crosses offset toward the actual
flagpole. The Greek flag has nine alternating blue and white stripes and a
white-cross canton at the upper hoist, next to the pole. The Romanian pin
uses vertical blue, yellow and red bands.

Expression prompts preserve the character and change only these features:

1. Triumphant toothy grin, sparkling open eyes and a gold crown with red jewels.
2. Delighted laughing smile and a small scattering of colorful confetti, no crown.
3. Friendly happy open-mouth smile, the default.
4. Confident warm closed-mouth smile with clearly upturned corners.
5. Small tentative closed-mouth smile, flatter than 04, with slightly concerned
   inner eyebrows and both eyes open. No visible teeth or tongue.
6. Concerned neutral face with a short flat closed mouth, no smile.
7. Disappointed, determined closed-mouth frown, still friendly.
8. Worried knitted eyebrows, wide eyes, open downturned mouth and three blue
   sweat drops. No smile.

All forty final exports were visually reviewed for the expression sequence,
country symbols, consistent clothing and props, transparency and clipping.

## Production exports and caching

Only the forty optimized 512 x 512 PNGs belong under
`public/tigers/{semedb,dkindfoed,grcitizen,rorezid,deheilpr}/tiger_face_01.png`
through `08.png`. Masters, contact sheets and ZIPs remain outside `public/`.
Exact reviewed SHA-256 hashes are in `tests/fixtures/tiger-eu-sha256.json`.
Budgets are 100 KB per PNG, 4 MB for all forty, and 500 KB for five happy faces.
The reviewed exports total 2,872,482 bytes; the five happy faces total
360,854 bytes. Individual files range from 61,948 to 80,664 bytes.

The scoped `eu-mascots-1` share-image version refreshes all six changed exams,
including `dkmedborger`. Earlier cache versions and all unrelated mappings
remain unchanged. Existing tracing already includes only face 03 for exam
cards; score-card functions continue fetching exam images over HTTP. No
route or deployment-configuration changes are required.

Run `node --test tests/tiger-eu-sets.test.cjs` for mappings, all score boundaries,
cache scope, exact hashes, decoded alpha, clear margins, distinct expressions,
size budgets, the Danish shared set and the other 37 EU exams. Trace-rule
assertions do not replace inspecting a real production build trace.
