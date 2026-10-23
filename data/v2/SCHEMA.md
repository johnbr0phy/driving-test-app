# Tigertest question model v2

Banks live in `data/v2/<exam>/*.json` as arrays of `QuestionV2`. Rich text
(`passage`, `stem`, `options[]`, `explanation`) supports: `$...$` inline KaTeX,
`$$...$$` display KaTeX, `**bold**`, `*italic*`, `__underline__`, blank lines
for paragraphs, and pipe tables (`| a | b |` with a `|---|---|` row). A
literal dollar sign (a price) is written `\$` so it is never read as a math
delimiter.

```jsonc
{
  "id": "SAT-RW-101",          // unique, prefix-section-number
  "section": "rw",             // key from the exam config's sections
  "test": 1,                   // practice test number; 0 = drill only, never in a test
  "module": 1,                 // module within the section (1 or 2)
  "variant": "upper",          // optional; adaptive module 2 variants ("lower" | "upper")
  "domain": "craftStructure",  // key from the exam config's domains
  "skill": "Words in context", // free text, shown in results
  "basics": "wordsInContext", // optional: Basics skill id offered under a miss ("Brush up on the basics")
  "difficulty": 2,             // 1 easy, 2 medium, 3 hard
  "format": "single",          // "single" | "multi" | "numeric"
  "passage": "...",            // optional stimulus shown above/beside the stem
  "stimulusId": "ACT-R-P01",   // optional shared stimulus (see stimuli files)
  "stem": "...",
  "options": ["...", "...", "...", "..."],   // 2 to 5, single/multi only
  "correct": [1],              // option indices, single/multi only
  "numeric": { "answers": ["3/4", "0.75", ".75"], "tolerance": 0 }, // numeric only
  "lockedOrder": false,        // true when options must not be shuffled
  "figure": { "src": "/figures/sat/ma-101.svg", "alt": "..." },  // optional
  "calculator": true,          // math sections: calculator allowed
  "explanation": "..."
}
```

Drills draw every item in their domains except those from a test the exam
config marks `heldOut`, so a held-out test stays unseen until it is taken.
Items tagged `test: 0` exist only for the drills.

Rules: original items only (never reproduce College Board, ACT or other
publishers' questions), plain apostrophes, every option plausible, one
unambiguous key, explanations say why the key is right and why the strongest
distractor is wrong.

## Formats beyond single, multi and numeric

Every answer is stored as a `number[]` (or a string for numeric), so sync,
merge and analytics need nothing new. Scoring is all or nothing per item.

| format | fields | `correct` | answer while working |
|---|---|---|---|
| `single` | `options` (2 to 6) | `[i]` | `[i]` |
| `multi` | `options` (2 to 6), optional `select: N` ("Choose two"; exactly N correct) | option indices | chosen indices |
| `numeric` | `numeric.answers`, `tolerance`, optional `wholeNumber` (digits keypad, no fraction hint) | none | typed string |
| `order` | `options` (3 to 6) are the steps, shown shuffled | every option index, in the right order | indices in the order tapped |
| `highlight` | `{{phrase}}` markers in `passage` (or in `stem` when there is no passage); 4 to 10 markers; no `options` | marker indices (0-based, order of appearance) that should be selected | selected marker indices |
| `matrix` | `rows` (2 to 6 statements), `columns` (2 to 4 headings) | column index per row | column per row, -1 = unanswered |
| `cloze` | `[[1]]`, `[[2]]`... in `stem`; `blanks[k]` = choices for `[[k+1]]` (3 to 5 each) | choice index per blank | choice per blank, -1 = unanswered |
| `bowtie` | `groups`: exactly 3, `{ "label", "pick", "options" }` in the order actions to take (pick 2), condition most likely (pick 1), parameters to monitor (pick 2) | flat indices: group 0 options first, then group 1, then group 2 | selected flat indices |

```jsonc
{ "format": "order", "stem": "Place the steps for donning PPE in order.",
  "options": ["Gown", "Mask or respirator", "Goggles or face shield", "Gloves"], "correct": [0, 1, 2, 3] }
{ "format": "highlight", "passage": "| Time | Finding |\n|---|---|\n| 0800 | {{BP 88/50 mm Hg}} |\n| 0800 | {{Oriented x3}} |",
  "stem": "Highlight the findings that require immediate follow-up.", "correct": [0] }
{ "format": "matrix", "stem": "For each finding, specify whether it is expected or unexpected 2 hours after a cesarean birth.",
  "rows": ["Fundus firm at the umbilicus", "Saturated pad in 15 minutes"], "columns": ["Expected", "Unexpected"], "correct": [0, 1] }
{ "format": "cloze", "stem": "The client is most likely experiencing [[1]] as shown by [[2]].",
  "blanks": [["hypokalemia", "hyperkalemia", "hyponatremia"], ["peaked T waves", "a U wave", "muscle twitching"]], "correct": [1, 0] }
{ "format": "bowtie", "groups": [
    { "label": "Actions to take", "pick": 2, "options": ["...", "...", "...", "..."] },
    { "label": "Condition most likely experiencing", "pick": 1, "options": ["...", "...", "...", "..."] },
    { "label": "Parameters to monitor", "pick": 2, "options": ["...", "...", "...", "..."] } ],
  "correct": [0, 2, 5, 8, 10] }
```

**Case studies.** An item may carry both `stimulusId` (the shared case, in the
bank's `stimuli`) and its own `passage` (what changed: new vitals, new orders);
the screen shows the update first ("New information") and the case under it. Never put highlight
markers in a shared stimulus.
