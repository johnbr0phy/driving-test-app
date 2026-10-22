// The TigerTest question-writing rules, distilled from the exam-bank skill
// the site's own banks are written to (.claude/skills/exam-bank/SKILL.md),
// for the AI assistants that write quizzes through the MCP server. The MCP
// server offers it as a prompt and a tool (lib/server/mcp-tools.ts), and
// create_quiz's description points at it, so a quiz written in Claude or
// ChatGPT gets the same care as a bank written here: research first, short
// options, a key that never stands out, distractors that are real mistakes.
// The cost of that work lands on the person's own chat plan, not on us.

export const QUIZ_WRITING_GUIDE = `# How to write a TigerTest quiz

You are writing multiple-choice questions for a practice test on TigerTest. The questions go into a mastery engine (a missed question keeps coming back until it is answered right) and a timed test with a pass mark, so every question must have exactly one defensible answer. Work in this order.

## 1. Research before you write

- Read the whole source the person gave you (notes, a chapter, a syllabus, a handbook, a term list). If they gave you a topic instead of a source, research it first: find the current, authoritative text (the official outline, standard, manual or textbook) and write from that. Say which source you used.
- List the ideas the material actually covers, grouped into 3 to 6 topics. Write questions only about what the material supports. Never invent a fact to fill a slot; if the material supports fewer questions than asked, write fewer and say so.
- Prefer the ideas a learner must know over trivia. A good quiz is the checklist of what the person needs to be able to answer, not a scavenger hunt through the text.

## 2. The shape of a question

- One question, one idea. The stem is self-contained and ends with a question mark or a colon completion. No negatives like "which is NOT", no trick questions, no "all of the above", "none of the above", "both A and B" or options that refer to other options.
- Exactly four options, one correct. Options are phrases, not sentences. Match the length to the question: a fact is 1 to 3 words, an action 3 to 6, a reason or condition 6 to 12. Put the detail in the explanation, not the option.
- The key must not stand out. Write the correct option first, short, then write three wrong options of the same shape and length. The correct option should sit within about 20% of the average length of the wrong ones. If the key needs a qualifier ("only when supervised"), give a distractor one too. A test-wise student passes a quiz by picking the longest answer; do not let that work.
- Distractors are plausible mistakes, not strawmen: the adjacent number, the rule from the other standard, the step done in the wrong order, the term a half-prepared learner confuses with the right one. For a numeric answer the wrong options are what plausible errors produce.
- Rotate the correct answer: question 1 keys A, question 2 keys B, then C, D, A... so each letter is right about a quarter of the time without you thinking about it. (correctIndex 0, 1, 2, 3, 0, ...)
- Explanations are 1 to 3 sentences: why the right answer is right and why the most tempting wrong one is wrong, in plain words. Cite a standard or source by name, not by paragraph number, unless you have checked that paragraph.
- Give every question a short topic label (1 to 3 words), reusing labels so the quiz has 3 to 6 topics. The creator's report groups misses by topic.
- Plain apostrophes, no em dashes, no markdown inside questions or options.

## 3. Before you call create_quiz

- Re-read every item asking "could a well-prepared person defend a different option?" Fix or drop any where the answer is yes.
- Check that no two stems ask the same thing and no option appears twice in one question.
- Check the letter rotation and that the correct option is not the longest in more than a quarter of items.
- Suggest a title under 60 characters and a one-sentence description. Default visibility is "link" (anyone with the link). Offer "public" if the person wants it in the TigerTest library, and "private" if it is only for them.

## 4. After

Tell the person the link (tigertest.io/q/CODE), that it opens as Practice, Test and Flashcards, that they can share the link, and that get_quiz_report shows who played and which questions were missed most. Offer to add more questions with add_quiz_questions or fix one with update_quiz.`;

/** The guide with one example item, for the MCP prompt. */
export const QUIZ_WRITING_EXAMPLE = `Example of a well-formed item (this one keys A, the next should key B):
{
  "question": "What happens to a forklift's rated capacity when the load center moves out from 24 to 30 inches?",
  "options": ["It decreases", "It stays the same", "It increases", "It doubles"],
  "correctIndex": 0,
  "explanation": "A longer load center lengthens the lever arm, so the same weight tips the truck sooner and capacity drops. The data plate gives capacity at the rated load center only.",
  "topic": "Stability"
}`;
