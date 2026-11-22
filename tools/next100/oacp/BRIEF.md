# OACP Certificate (Ontario) Part B practice bank: writer brief

Exam: Ontario Association of Chiefs of Police (OACP) Certificate, Part B online assessment
(SIGMA Survey for Police Officers): 74 multiple-choice questions in 35 minutes.
Section A, 44 questions: spelling, vocabulary, punctuation and grammar.
Section B, 30 questions: "police problem-solving". OACP says the old quantitative section is gone;
math is only basic-operation word problems (no calculator) and "not the focus".
OACP publishes no sample items. Every question here is ORIGINAL. Never copy or reword items from
prep sites (JobTestPrep, practicetestgeeks, policeprep, etc.), Quizlet or any book.

## File format
One Python file per category in this folder, e.g. q_spelling.py:

    CAT = "oacpSpelling"; SEG = "SPL"
    Q = [
    ("Stem ending in ? or :", "key", ["wrong1", "wrong2", "wrong3"], "Explanation, 1-3 sentences."),
    ...
    ]

The build script places the key in slot A, B, C, D in rotation, so just write key first.
Plain ASCII apostrophes and straight double quotes. NO em-dashes or en-dashes anywhere.
Canadian spelling in all prose (colour, centre, licence as a noun, offence, defence, cheque,
neighbour, program, -ize endings are fine). Metric units, dollars.

## House style (a validator enforces it; failures get sent back)
- Options are short phrases, not sentences: a word or fact 1-3 words, an action 3-6 words, a
  reason 6-12. Bank average 20-35 characters per option; no option over ~42 chars except where a
  whole sentence is being judged (grammar/punctuation "which sentence is correct" items may run
  longer, keep them as short as the sentence allows).
- The key must NOT stand out: within ~20% of the average length of the three wrong options. Key
  must be the single longest option in at most 1 in 5 of your items. Write key first, then three
  wrong options of the same shape and length.
- Distractors are plausible errors (common misspellings, near-synonyms, the comma rule people
  misapply, the arithmetic slip), never silly strawmen.
- No "All/None of the above", no "Both A and B", no option referring to other options, no option
  referring to positions ("the first", "the second", "the last"), in options OR explanations.
- No duplicate or near-duplicate stems. Never reuse one key word for word in a file.
- No 4+ consecutive items whose keys share a word. Vary wording.
- Explanations: why the key is right and why the most tempting wrong option is wrong. Name options
  by what they say, never by letter or position.
- Never ask about the test itself (counts, time, scoring, booking, retakes, OACP fees).
- For judgment/scenario items avoid an answer pattern: the "most cautious" or "tell the sergeant"
  option must NOT always be right. When escalating is right, give a distractor with the same
  move at the wrong time or to the wrong person. At least a third of items where such a "safe"
  option appears should have it wrong.
