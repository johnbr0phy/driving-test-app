import { getBank, getStimulus } from "@/lib/v2/bank";
import { getExamV2 } from "@/lib/v2/registry";
import { heldOutTests } from "@/lib/v2/training";
import type { QuestionV2, Stimulus } from "@/lib/v2/types";
import { SAMPLE_COPY } from "@/components/exam/ExamSampleQuestions";
import { RichText } from "@/components/v2/RichText";
import { BANK_SIZES } from "@/lib/v2/bankSizes";
import { SITE_URL } from "@/lib/siteUrl";
import "katex/dist/katex.min.css";

const LETTERS = "ABCDEF";

/** Rich-text marks out, for the structured data. */
const plain = (s: string) => s.replace(/\$\$?/g, "").replace(/\*\*|__|\*/g, "").replace(/\s+/g, " ").trim();

/**
 * Sample questions for a v2 exam's landing, the v2 twin of
 * ExamSampleQuestions: one single-answer question per domain that stands on
 * its own (no passage, shared stimulus, figure or table), never from a
 * held-out test, with the answer and explanation in plain HTML and a Quiz
 * node. Stable between builds: the last such question of each domain by id.
 * Server component: the page imports its bank ("@/lib/v2/banks/<id>") first.
 */
const hasMath = (q: QuestionV2) => [q.stem, q.explanation, ...(q.options ?? [])].some((t) => t.includes("$"));

// Longest shared passage the landing will print with a sample (AP English
// Language and AP Italian put every item on a passage, so without this they
// had no samples and no Quiz node at all).
const MAX_SAMPLE_PASSAGE = 1600;

/** A text-only passage short enough to print on the landing, or null. */
function samplePassage(examId: string, q: QuestionV2): Stimulus | null {
  const s = getStimulus(examId, q);
  if (!s || s.figure || s.text.length > MAX_SAMPLE_PASSAGE || /\||\{\{|\[\[/.test(s.text)) return null;
  return s;
}

export function pickSampleQuestionsV2(examId: string, count: number): QuestionV2[] {
  const alone = pickSamples(examId, count, false);
  // Only an exam with no stand-alone questions at all shows passage questions.
  return alone.length > 0 ? alone : pickSamples(examId, count, true);
}

function pickSamples(examId: string, count: number, withPassage: boolean): QuestionV2[] {
  const exam = getExamV2(examId);
  const heldOut = heldOutTests(exam);
  const usable = getBank(examId)
    .questions.filter(
      (q) =>
        q.format === "single" &&
        (withPassage ? (q.passage || q.stimulusId) && samplePassage(examId, q) !== null : !q.passage && !q.stimulusId) &&
        !q.figure &&
        (q.options?.length ?? 0) >= 3 &&
        q.correct?.length === 1 &&
        !heldOut.includes(q.test) &&
        !/\||\{\{|\[\[|\n- /.test(q.stem) &&
        q.stem.length <= 420
    )
    .sort((a, b) => a.id.localeCompare(b.id));
  const byDomain = new Map<string, QuestionV2[]>();
  for (const q of usable) byDomain.set(q.domain, [...(byDomain.get(q.domain) ?? []), q]);
  // Words before symbols: a domain's last question without math when it has one.
  if (!withPassage)
    return [...byDomain.values()].map((list) => [...list].reverse().find((q) => !hasMath(q)) ?? list[list.length - 1]).slice(0, count);
  // One question per passage, so the section is not two questions on one text:
  // each domain takes its latest question on a passage no earlier domain used.
  const seen = new Set<string>();
  const picked: QuestionV2[] = [];
  for (const list of byDomain.values()) {
    const q = [...list].reverse().find((x) => !seen.has(samplePassage(examId, x)!.id));
    if (!q) continue;
    seen.add(samplePassage(examId, q)!.id);
    picked.push(q);
  }
  return picked.slice(0, count);
}

export function SampleQuestionsV2({ examId, count = 6 }: { examId: string; count?: number }) {
  const exam = getExamV2(examId);
  const sample = pickSampleQuestionsV2(examId, count);
  if (sample.length === 0) return null;
  const language = exam.language ?? "en";
  const copy = SAMPLE_COPY[language] ?? SAMPLE_COPY.en!;
  const shortName = language === "en" ? exam.english?.shortName ?? exam.shortName : exam.shortName;
  const total = (BANK_SIZES[exam.id] ?? 0).toLocaleString(exam.locale ?? "en-US");
  const url = `${SITE_URL}${exam.landingPath}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "@id": `${url}#sample-questions`,
    name: copy.quiz(shortName),
    about: exam.name,
    inLanguage: exam.locale ?? "en-US",
    isAccessibleForFree: true,
    isPartOf: { "@id": `${url}#webpage` },
    hasPart: sample.map((q) => ({
      "@type": "Question",
      eduQuestionType: "Multiple choice",
      text: plain([samplePassage(examId, q)?.text, q.stem].filter(Boolean).join("\n\n")),
      acceptedAnswer: { "@type": "Answer", text: plain(q.options![q.correct![0]]) },
      suggestedAnswer: q.options!.filter((_, i) => i !== q.correct![0]).map((text) => ({ "@type": "Answer", text: plain(text) })),
      comment: { "@type": "Comment", text: plain(q.explanation) },
    })),
  };

  return (
    <section aria-labelledby="sample-questions" className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="sample-questions" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
        {copy.title(shortName)}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-10">{copy.sub(sample.length, total)}</p>
      <ol className="space-y-6">
        {sample.map((q, n) => (
          <li key={q.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            {(q.passage || q.stimulusId) && samplePassage(examId, q) && (
              <blockquote className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">
                {samplePassage(examId, q)!.title && (
                  <p className="font-semibold mb-1">
                    <RichText text={samplePassage(examId, q)!.title!} />
                  </p>
                )}
                <RichText text={samplePassage(examId, q)!.text} />
              </blockquote>
            )}
            <div role="heading" aria-level={3} className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-4 flex gap-1">
              <span>{n + 1}.</span>
              <RichText text={q.stem} />
            </div>
            <ul className="space-y-2 mb-4">
              {q.options!.map((opt, i) => (
                <li
                  key={i}
                  className={
                    i === q.correct![0]
                      ? "flex gap-2 rounded-lg border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950 px-4 py-2 text-green-900 dark:text-green-200"
                      : "flex gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-700 dark:text-gray-200"
                  }
                >
                  <span className="font-semibold">{LETTERS[i]}.</span>
                  <RichText text={opt} />
                </li>
              ))}
            </ul>
            <div className="text-gray-600 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-50">
                {copy.answer}: {LETTERS[q.correct![0]]}.
              </strong>{" "}
              <RichText text={q.explanation} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
