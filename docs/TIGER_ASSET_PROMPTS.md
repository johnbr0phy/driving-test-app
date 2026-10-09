# TigerTest mascot prompts

Generated with the built-in image generation tool. Each expression was a separate edit of the exam's happy mascot. The production exports are in `public/tigers/{examId}/tiger_face_01.png` through `tiger_face_08.png`.

## Shared constraints

Keep the exact same TigerTest character, normally rounded skull, ears, forehead stripes, muzzle, body pose, paws, clothing, tools, prop symbols and colors as image 1. Change only the facial expression and the requested crown, confetti or sweat. Preserve thick clean black outlines, polished orange fur, cream cheek tufts, big expressive eyes, crisp shaded cartoon illustration. One centered chest-up mascot with the entire ears, accessories, paws and props in frame, comfortable clear margin on all sides. True transparent RGBA background, no background color, no checkerboard drawn into pixels, no ground shadow, no scene, no text labels, no watermark, no extra limbs.

## Roles

| Exam | ID | Clothing and props |
| --- | --- | --- |
| CCMA Medical Assistant | `ccma` | Sky-blue V-neck medical-assistant scrubs, a navy stethoscope around the neck, and one paw holding a compact cream patient clipboard with a small blue heart symbol and three simple horizontal lines. No hat, no mask. Face fully visible. |
| Dental Assistant | `danb` | Pale mint-green dental scrubs, clear protective glasses with slim turquoise frames, a pale surgical mask pulled BELOW the chin to leave the entire mouth visible, and one paw holding a large friendly white tooth model while the other holds a small silver dental mirror. No surgical cap. |
| EMT | `emt` | An indigo emergency medical technician uniform with yellow reflective shoulder strips and a small black shoulder radio. Hold a compact navy first-aid bag with orange trim and a simple white medical asterisk pictogram. No cap, no helmet, no official service name or badge. |
| Food Protection Manager | `foodmgr` | A compact soft white chef hat, a white food-service jacket with amber collar and amber neckerchief, one paw holding a small food safety clipboard with green check marks, the other a short silver digital food probe thermometer. No goggles, microscope or lab equipment. |
| Real Estate | `realestate` | A slate-blue blazer over a cream shirt with an ochre tie, and one paw holding an oversized gold house key on a small ring with a simple white house-shaped keyring. No hat, no reflective vest, no official seal. |
| Life & Health Insurance | `insurance` | A rich plum blazer with a pale rose shirt and dark plum tie, holding a compact teal shield with a single cream heart emblem against the chest. No hat, no reflective vest. Keep the friendly TigerTest character, not an armored character. |
| Notary Public | `notary` | A bronze-brown waistcoat over a cream shirt with a navy tie, one paw holding a round wooden-handled rubber stamp, the other holding a small cream document with three navy lines and a gold circular seal. No hat, no reflective vest, no readable legal text or official seal. |
| ATI TEAS | `teas` | An olive-green student hoodie with cream drawstrings, holding a deep olive study book with a simple cream open-book pictogram and a large yellow pencil beside it. No hat, no graduation cap, no vest. The tiger is an enthusiastic nursing-school applicant. |
| AWS Cloud Practitioner | `aws` | A navy technology hoodie with warm orange lining and cream drawstrings, both paws holding a small dark laptop with a large simple white cloud pictogram and an orange status dot on its lid. No hat, no reflective vest, no vendor logo or lettering. |
| CompTIA A+ | `aplus` | An emerald-green technician polo under a charcoal utility vest, one paw holding a small green circuit board with a central square silver chip and gold edge contacts, the other holding a short silver screwdriver with emerald handle. No hat, no reflective safety strips, no brand logo. |
| Food Handler | `foodhandler` | A teal food-service apron over a clean white polo shirt and a low white food-service paper cap with teal trim. Hold a small silver food tray at chest height with a simple triangular sandwich and one red apple. Clearly a food-service worker; no chef toque, no clipboard, no thermometer. No printed words. |
| Boating Safety | `boating` | A bright orange properly fastened life jacket with charcoal buckles over a navy shirt, a navy baseball cap with a simple white anchor pictogram, and one paw holding a compact white-and-red life buoy against the chest. Keep both ears and the full face visible. No safety stripes or land-vehicle imagery. |
| Hunter Safety | `hunter` | A blaze-orange hunter safety cap and blaze-orange vest over a forest-green outdoor shirt. A small pair of charcoal binoculars hang at the chest; hold a closed olive field guide with a simple cream deer-head pictogram. No firearms, no ammunition, no trophies, no camouflage on the tiger's face. Keep both ears and full face visible. |
| CompTIA Security+ | `secplus` | A charcoal cybersecurity polo shirt with cyan collar trim, no cap or other headwear. Both paws hold a compact dark laptop with a bright cyan shield pictogram containing one simple white padlock on the lid. No cloud symbol, no vendor logo, no lettering, no reflective vest. Keep the tiger's normal rounded forehead and ears. |
| HESI A2 | `hesi` | A burgundy student cardigan over a cream shirt, no headwear, holding a mauve nursing-admissions study book bearing a simple cream heart-and-pulse pictogram, with two colored page tabs. A compact teal pencil case sits under the book, supported by the other paw. No stethoscope, no graduation cap, no vest, no text. Preserve the normal rounded tiger skull. |

## Expressions

Use case: identity-preserve. Image 1 is the exact character and outfit reference. Change only the expression and requested crown, confetti or sweat.

| File suffix | Expression | Direction |
| --- | --- | --- |
| 01 | Crowned winner | A triumphant broad toothy grin with bright sparkling eyes. Add a large gold crown with red jewels, matching the expression reference. Perch it on top of any existing headwear, or on the bare head if the role has no headwear. Retain all clothing, props and role accessories. The complete crown must fit within the frame. |
| 02 | Celebrating | A delighted wide open laughing smile, cheerful lifted eyebrows and sparkling eyes. Add a restrained scattering of clean colourful paper confetti around the head. No crown. Keep every confetti piece fully inside the frame. |
| 03 | Happy | The default friendly happy open-mouth smile. |
| 04 | Confident smile | A confident warm CLOSED-mouth smile, clearly upturned corners and relaxed slightly lifted eyebrows. Mouth completely closed, no tongue and no teeth visible. No added decorations. |
| 05 | Tentative smile | A small tentative CLOSED-mouth smile, distinctly subtler and flatter than a confident smile. Inner eyebrows lift in slight concern. Gentle, unsure but hopeful. No visible tongue or teeth. No added decorations. |
| 06 | Neutral | A neutral concerned face with a short FLAT horizontal CLOSED mouth, slightly lifted inner eyebrows and attentive round eyes. Absolutely no smile, no teeth, no tongue and no added decorations. |
| 07 | Frowning | A disappointed determined frown, CLOSED mouth curving downward, one eyebrow raised and the other angled inward. No smile, teeth or tongue. Friendly rather than menacing. No added decorations. |
| 08 | Worried | A visibly worried face with raised knitted inner eyebrows, wide eyes with smaller pupils, an open downturned mouth and three bright blue cartoon sweat drops at the temples. No smile, crown or confetti. |

Final cleanup for TEAS 03 and CompTIA A+ 06 removed stray pixels or gray halos outside the mascot while preserving the expression, character, clothing, props, and transparency.
