# MAP Growth 2-5 practice bank: writer brief

Exam: NWEA MAP Growth, the grades 2-5 tests (Math 2-5, Reading 2-5, Language Usage 2+),
Common Core-aligned version. Tigertest id `mapgrowth`. Every question is ORIGINAL. Never use or
reword NWEA sample items, practice-test items, "MAP practice" sites or any commercial item.
Write from the Common Core State Standards (grades 2-5) and plain knowledge of English.

Readers are US children aged 7 to 11. Short sentences, everyday settings (school, park,
library, garden, sports, pets, family), US spelling, US customary and metric units, US money.
Kind names from many backgrounds. No brands, no scary or sad content beyond a lost pet found.

## Difficulty
`diff` 1 = grade 3 standard, 2 = grade 4, 3 = grade 5. Spread: about 30% 1, 40% 2, 30% 3.
(The real test is adaptive across grades 2-5; a fixed practice test spans the band.)

## Item format (Python source file, read by tools/next100/mapgrowth/build.py with runpy)

```python
D = "\\$"   # dollar sign; plain "$" starts KaTeX math. Write money as f"{D}4.50".
STIMULI = {  # reading only: key -> (title, text). Optional in other files.
    "L1": ("The Kite", """Paragraph one.\n\nParagraph two."""),
}
ITEMS = [
  dict(test=1, skill="Place value", diff=1, basics=None,
       stem="What is the value of the 7 in 4,732?",
       key="700", wrong=["7", "70", "7,000"],
       expl="The 7 is in the hundreds place, so its value is 7 hundreds, or 700."),
  # select-all (multiselect, a real MAP type): key is a list of 2-3 correct, wrong has 2-3.
  dict(test=1, skill="...", diff=2, basics=None, stem="Which two ... ? Choose two.",
       key=["...", "..."], wrong=["...", "...", "..."], expl="..."),
  # typed number (math only, whole numbers or simple decimals): num instead of key/wrong.
  dict(test=1, skill="...", diff=2, basics=None, stem="... Type the number.", num=["36"], expl="..."),
  # reading item on a stimulus: stim="L1". Inline short passage instead: passage="...".
]
```
- `test`: 1 (Practice Test 1), 2 (Practice Test 2) or 0 (drill only). Exact counts per file are in
  your task. 
- Options: four for single (key + 3 wrong). The build shuffles key position and sorts all-number
  options itself, so never refer to an option by position or letter anywhere.
- `basics`: one of these shared skill ids if the item truly tests that skill, else None:
  rounding, fractionConvert, wordProblems, areaPerimeter, readingTable, mainIdea, findingDetail,
  inference, wordsInContext, authorPurpose, textStructure, sequenceEvents, synonyms, wordParts,
  subjectVerb, apostrophes, commonlyConfused, pronounCase, verbTense, commaSplices, transitions,
  topicSentences, preciseWords, itsIts, listIntroCommas, concision.
- `skill`: a short label (2-4 words) of the sub-skill.

## House style (enforced by a validator)
- Options are short phrases: average 15-35 characters. The KEY MUST NOT STAND OUT: write the
  key first and short, then three wrong options of the same shape and length. The key may be the
  single longest option in at most 1 item in 5. Give distractors any qualifier the key has.
- Distractors are real mistakes a child makes (wrong operation, adjacent place value, off by one,
  the other homophone, a detail from the passage that is not the main idea).
- No "all/none of the above", no "both", no option that refers to other options, no duplicates.
- Stems end in "?" or ":" (or "... Choose two." / "... Type the number." after a question).
  Each stem self-contained. Describe any picture, table, graph or shape in words or a pipe table
  in `passage` (markdown pipe table, header row then |---|---| row).
- Explanations: 1-3 sentences, kind and simple: why the key is right, why the most tempting
  wrong option is wrong. Plain apostrophes, NO em-dashes or en-dashes as punctuation.
- Never ask about the MAP test itself, RIT scores or NWEA.
- Every number must be right: recompute each math key. Math items: no calculator needed.
- No two stems alike across the bank; vary contexts and numbers.
