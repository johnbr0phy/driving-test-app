# TigerTest question model v2

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
  "test": 1,                   // practice test number
  "module": 1,                 // module within the section (1 or 2)
  "variant": "upper",          // optional; adaptive module 2 variants ("lower" | "upper")
  "domain": "craftStructure",  // key from the exam config's domains
  "skill": "Words in context", // free text, shown in results
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

Rules: original items only (never reproduce College Board, ACT or other
publishers' questions), plain apostrophes, every option plausible, one
unambiguous key, explanations say why the key is right and why the strongest
distractor is wrong.
