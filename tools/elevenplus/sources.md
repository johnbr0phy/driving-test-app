# 11+ (elevenplus) sources

All 238 questions, the six passages (five prose texts and one poem) and the 13 Basics skills are original and
written for Tigertest. No item is copied or adapted from GL Assessment familiarisation papers, CEM material,
local authority booklets or commercial practice books. The sources below set coverage, format and timing only.

| Source | What it was used for | Checked |
|---|---|---|
| GL Assessment 11+ free materials, https://11plus.gl-assessment.co.uk/free-materials/ | Confirms GL's papers (English, maths, verbal reasoning, non-verbal reasoning) and the warning that local timings and question counts differ from the familiarisation papers. The page returned HTTP 429 on 2026-10-30, so this row rests on the search snippet. | 2026-10-30 |
| Kent County Council, "Prepare for the Kent Test" and the Kent Test familiarisation booklet, https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test | An official GL-based 11+: multiple choice on a separate answer sheet, computer marked, English and maths in one booklet and reasoning in another, standardised scores (minimum 69, maximum 141). | 2026-10-30 |
| Cognito, "GL Assessment 11+ explained", https://cognito.org/blog/gl-assessment-11-plus-guide | Typical GL paper sizes: English about 50 to 60 questions in about 50 minutes, maths about 50 in about 50 minutes, verbal reasoning about 80 in about 60 minutes; no fixed national pass mark; scores standardised with 100 as average. A commercial blog, used only for typical lengths. | 2026-10-30 |
| Redbridge 11+ page, https://www.redbridge.gov.uk/11plus | Example of an area that combines English with verbal reasoning and maths with non-verbal reasoning (local variation). | 2026-10-30 |
| DfE, National curriculum in England: English and mathematics programmes of study, Key Stage 2 (2013, current), https://www.gov.uk/government/collections/national-curriculum | Maths content (number, fractions, decimals, percentages, ratio, algebra, measurement, geometry, statistics) and English spelling, punctuation and grammar terms (fronted adverbials, subjunctive "were", word classes, apostrophes). | 2026-10-30 |

## Design decisions
- Non-verbal reasoning is excluded (it is all figures), as the wave brief says.
- Each practice test is a shorter sitting: English 25 in 25 min, Maths 25 in 25 min, Verbal Reasoning 40 in 30 min,
  roughly the real pace (about a minute a question in English and maths, about 45 seconds in VR).
- Question formats copy GL's generic multiple-choice conventions: "which part has a mistake / No mistake",
  five options in maths, and the long-standing verbal reasoning types (synonyms, opposites, hidden words, move a
  letter, compound words, missing three letters, odd two out, word analogies, letter series, letter analogies,
  letter codes, word/number codes, number series, letter sums, related numbers, logic).
- Verbal reasoning word items were checked against the system dictionary (`/usr/share/dict/words`) by the asserts in
  `q_vr_words.py`: each hidden word crosses exactly the stated gap and no distractor appears in the sentence;
  in move-a-letter no other letter makes two words; in compound words only the key pair forms a word; no
  distractor in missing-three-letters makes a word. Code and number items are computed and asserted in
  `q_vr_codes.py`; maths keys are recomputed in asserts in `q_maths.py`.
- Score is percent correct with a default goal of 80%. The real 11+ is age-standardised and each area sets its own
  qualifying score; this is said in the config, results note and landing FAQ.

## Facts in the reading passages (checked 2026-10-30, general knowledge)
- Hedgehogs: 13 cm square fence gaps (Hedgehog Street guidance), hibernation roughly November to March, milk is
  harmful, travel about a mile a night.
- Thames frost fairs: last fair 1814; the old London Bridge's narrow arches slowed the river; the bridge was
  replaced (new bridge opened 1831) and the Victorian embankments narrowed the river.
- Mary Anning: born 1799 in Lyme Regis, ichthyosaur found with her brother Joseph around 1811 to 1812, first
  complete plesiosaur (1823), her dog Tray killed in a landslide, women barred from the Geological Society of
  London, died 1847.
