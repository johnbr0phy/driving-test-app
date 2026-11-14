# MCAT, LSAT and IELTS Reading tigers

Three bespoke sets replace the borrowed NCLEX, GRE and AP English Language mascots. Each set has eight 512 × 512 transparent PNGs. HiSET keeps the GED set and France code de la route keeps the driving set.

## Character designs

| Exam / folder | Outfit and props |
| --- | --- |
| MCAT / `mcat` | Teal pre-med student hoodie, burgundy biology study book with a cream DNA pictogram, and a small chemistry flask. No nurse uniform, medical licence insignia or stethoscope. |
| LSAT / `lsat` | Navy blazer, cream shirt, burgundy tie, burgundy study book with gold scales pictogram, and yellow pencil. A law-school applicant, not a judge. |
| IELTS Reading / `ieltsread` | Turquoise cardigan over cream shirt, coral language study book with a cream speech bubble and three dots, and two page tabs. No national flag. |

## Expression contract

1. Crowned mastery: joyful grin, bright eyes, gold crown.
2. Celebration: broad delighted smile, colourful confetti, no crown.
3. Default: friendly open-mouth smile.
4. Confident: warm closed-mouth smile, relaxed eyebrows, no teeth or tongue.
5. Tentative: smaller, subtler closed-mouth smile, slightly concerned inner eyebrows, open eyes. No teeth, tongue, sweat, tears, crown or confetti.
6. Neutral concern: short flat closed mouth, attentive eyes.
7. Determined disappointment: downward closed-mouth frown, angled eyebrows, still friendly.
8. Worried: knitted raised inner brows, wide eyes, open worried mouth and blue sweat drops.

## Generation and review

Built-in image generation, not the CLI/API fallback. Each happy base uses existing Tigertest artwork as the character/style reference. Each expression is a separate identity-preserving edit of that exam's base, not an independent redesign. Prompts preserve rounded head, orange/cream fur, bold outlines, glossy eyes, outfit, body pose, paws and props. Only expression, crown, confetti or sweat changes. No text, watermark, background scene or ground shadow. All ears and accessories stay in frame with transparent outer margins.

Export normalization preserves alpha, scales to 512 × 512 and optimizes the PNGs to at most 100 KB each. The hash fixture pins the visually reviewed production files. Tests cover exact file count, distinct decoded pixels, transparent borders, dimensions, default face, all score boundaries, retained donor/HiSET/France mappings and the isolated OG cache refresh.

The resolver now maps these three IDs to their own folders. `shareImageUrl` refreshes only their cached share cards with `admissions-mascots-1`. Existing OG tracing already includes each set's happy face only, so no tracing changes are required.

## Review gallery

Columns are expressions 1 through 8.

### MCAT

<img src="../public/tigers/mcat/tiger_face_01.png" width="96" alt="MCAT expression 1"> <img src="../public/tigers/mcat/tiger_face_02.png" width="96" alt="MCAT expression 2"> <img src="../public/tigers/mcat/tiger_face_03.png" width="96" alt="MCAT expression 3"> <img src="../public/tigers/mcat/tiger_face_04.png" width="96" alt="MCAT expression 4"> <img src="../public/tigers/mcat/tiger_face_05.png" width="96" alt="MCAT expression 5"> <img src="../public/tigers/mcat/tiger_face_06.png" width="96" alt="MCAT expression 6"> <img src="../public/tigers/mcat/tiger_face_07.png" width="96" alt="MCAT expression 7"> <img src="../public/tigers/mcat/tiger_face_08.png" width="96" alt="MCAT expression 8">

### LSAT

<img src="../public/tigers/lsat/tiger_face_01.png" width="96" alt="LSAT expression 1"> <img src="../public/tigers/lsat/tiger_face_02.png" width="96" alt="LSAT expression 2"> <img src="../public/tigers/lsat/tiger_face_03.png" width="96" alt="LSAT expression 3"> <img src="../public/tigers/lsat/tiger_face_04.png" width="96" alt="LSAT expression 4"> <img src="../public/tigers/lsat/tiger_face_05.png" width="96" alt="LSAT expression 5"> <img src="../public/tigers/lsat/tiger_face_06.png" width="96" alt="LSAT expression 6"> <img src="../public/tigers/lsat/tiger_face_07.png" width="96" alt="LSAT expression 7"> <img src="../public/tigers/lsat/tiger_face_08.png" width="96" alt="LSAT expression 8">

### IELTS Reading

<img src="../public/tigers/ieltsread/tiger_face_01.png" width="96" alt="IELTS Reading expression 1"> <img src="../public/tigers/ieltsread/tiger_face_02.png" width="96" alt="IELTS Reading expression 2"> <img src="../public/tigers/ieltsread/tiger_face_03.png" width="96" alt="IELTS Reading expression 3"> <img src="../public/tigers/ieltsread/tiger_face_04.png" width="96" alt="IELTS Reading expression 4"> <img src="../public/tigers/ieltsread/tiger_face_05.png" width="96" alt="IELTS Reading expression 5"> <img src="../public/tigers/ieltsread/tiger_face_06.png" width="96" alt="IELTS Reading expression 6"> <img src="../public/tigers/ieltsread/tiger_face_07.png" width="96" alt="IELTS Reading expression 7"> <img src="../public/tigers/ieltsread/tiger_face_08.png" width="96" alt="IELTS Reading expression 8">
