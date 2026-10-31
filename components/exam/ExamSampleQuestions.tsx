import { getExamQuestions } from "@/lib/examData";
import { getExamById, type ExamId } from "@/lib/exams";
import { getCatalogEntry } from "@/lib/testCatalog";
import { getSignIdForQuestion } from "@/lib/signImages";
import { hasPositionDependentAnswers } from "@/lib/shuffleOptions";
import type { Question } from "@/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const LETTERS = ["A", "B", "C", "D"] as const;

/**
 * A few real questions from the bank, one per topic, with the answer and the
 * explanation in plain text. Searches like "LTO exam questions and answers"
 * and assistants asked for example questions both want this text on the page,
 * not behind a tap. Picks the last question of each category in ID order, so
 * the sample is stable between builds; questions drawn as a sign image are
 * skipped (the stem alone would read "What does this sign mean?"), and so are
 * "A and B" / "all of the above" items, whose options cannot move. Banks often
 * store every key at one letter, so each sample's options are rotated (order
 * kept) to spread the keys over A to D.
 *
 * Server component: the page must import its bank module ("@/lib/banks/<id>")
 * first, which keeps the bank out of every other page.
 */
export function pickSampleQuestions(bank: Question[], count: number): Question[] {
  const byCategory = new Map<string, Question[]>();
  for (const q of [...bank].sort((a, b) => a.questionId.localeCompare(b.questionId))) {
    if (getSignIdForQuestion(q.questionId) || hasPositionDependentAnswers(q)) continue;
    const list = byCategory.get(q.category) ?? [];
    list.push(q);
    byCategory.set(q.category, list);
  }
  return [...byCategory.values()]
    .map((list) => list[list.length - 1])
    .slice(0, count)
    .map((q, n) => rotateKeyTo(q, KEY_SPREAD[n % KEY_SPREAD.length]));
}

const KEY_SPREAD = [1, 3, 0, 2, 2, 0, 3, 1];

/** The same options in the same cyclic order, turned so the key sits at `target`. */
function rotateKeyTo(q: Question, target: number): Question {
  const opts = [q.optionA, q.optionB, q.optionC, q.optionD];
  const key = Math.max(0, LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]));
  const r = (key - target + 4) % 4;
  const turned = opts.map((_, i) => opts[(i + r) % 4]);
  return {
    ...q,
    optionA: turned[0],
    optionB: turned[1],
    optionC: turned[2],
    optionD: turned[3],
    correctAnswer: LETTERS[target],
    correctIndex: target,
  };
}

export function ExamSampleQuestions({ examId, count = 6 }: { examId: ExamId; count?: number }) {
  const exam = getExamById(examId);
  const test = getCatalogEntry(examId);
  if (!exam || !test) return null;
  const sample = pickSampleQuestions(getExamQuestions(examId), count);
  if (sample.length === 0) return null;

  const options = (q: Question) => [q.optionA, q.optionB, q.optionC, q.optionD];
  const key = (q: Question) => Math.max(0, LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]));
  const url = `${siteUrl}${test.href}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "@id": `${url}#sample-questions`,
    name: `${test.shortName} sample questions`,
    about: test.name,
    educationalLevel: "beginner",
    isAccessibleForFree: true,
    isPartOf: { "@id": `${url}#webpage` },
    hasPart: sample.map((q) => {
      const opts = options(q);
      return {
        "@type": "Question",
        eduQuestionType: "Multiple choice",
        text: q.question,
        acceptedAnswer: { "@type": "Answer", text: opts[key(q)] },
        suggestedAnswer: opts.filter((_, i) => i !== key(q)).map((text) => ({ "@type": "Answer", text })),
        comment: { "@type": "Comment", text: q.explanation },
      };
    }),
  };

  return (
    <section aria-labelledby="sample-questions" className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="sample-questions" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
        {test.shortName} sample questions and answers
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-10">
        {sample.length} of the {test.questions.toLocaleString("en-US")} practice questions, one from each topic, with the
        answer explained.
      </p>
      <ol className="space-y-6">
        {sample.map((q, n) => (
          <li key={q.questionId} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-4">
              {n + 1}. {q.question}
            </h3>
            <ul className="space-y-2 mb-4">
              {options(q).map((opt, i) => (
                <li
                  key={i}
                  className={
                    i === key(q)
                      ? "rounded-lg border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950 px-3 py-2 text-green-900 dark:text-green-100"
                      : "rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200"
                  }
                >
                  <span className="font-semibold mr-2">{LETTERS[i]}.</span>
                  {opt}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 dark:text-gray-200">
              <strong className="text-gray-900 dark:text-gray-50">Answer: {LETTERS[key(q)]}.</strong>{" "}
              {q.explanation}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
