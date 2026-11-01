import { getExamQuestions } from "@/lib/examData";
import { examBaseLanguage, getExamById, localizeExam, type ExamId } from "@/lib/exams";
import { examLandingLocale } from "@/lib/examSeo";
import type { Language } from "@/i18n";
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

// Headings in each language a landing is written in; English otherwise.
const SAMPLE_COPY: Partial<Record<Language, { title: (name: string) => string; sub: (n: number, total: string) => string; answer: string; quiz: (name: string) => string }>> = {
  en: {
    title: (name) => `${name} sample questions and answers`,
    sub: (n, total) => `${n} of the ${total} practice questions, one from each topic, with the answer explained.`,
    answer: "Answer",
    quiz: (name) => `${name} sample questions`,
  },
  es: {
    title: (name) => `Preguntas de ejemplo del ${name} con respuestas`,
    sub: (n, total) => `${n} de las ${total} preguntas de práctica, una de cada tema, con la respuesta explicada.`,
    answer: "Respuesta",
    quiz: (name) => `Preguntas de ejemplo: ${name}`,
  },
  de: {
    title: (name) => `${name}: Beispielfragen mit Antworten`,
    sub: (n, total) => `${n} der ${total} Übungsfragen, eine aus jedem Thema, mit erklärter Antwort.`,
    answer: "Antwort",
    quiz: (name) => `${name}: Beispielfragen`,
  },
  fr: {
    title: (name) => `${name}\u00a0: exemples de questions et réponses`,
    sub: (n, total) => `${n} des ${total} questions d'entraînement, une par thème, avec la réponse expliquée.`,
    answer: "Réponse",
    quiz: (name) => `${name}\u00a0: exemples de questions`,
  },
  it: {
    title: (name) => `${name}: domande di esempio con risposte`,
    sub: (n, total) => `${n} delle ${total} domande di esercitazione, una per argomento, con la risposta spiegata.`,
    answer: "Risposta",
    quiz: (name) => `${name}: domande di esempio`,
  },
  pl: {
    title: (name) => `${name}: przykładowe pytania z odpowiedziami`,
    sub: (n, total) => `${n} z ${total} pytań treningowych, po jednym z każdego tematu, z wyjaśnioną odpowiedzią.`,
    answer: "Odpowiedź",
    quiz: (name) => `${name}: przykładowe pytania`,
  },
  nl: {
    title: (name) => `${name}: voorbeeldvragen met antwoorden`,
    sub: (n, total) => `${n} van de ${total} oefenvragen, één per onderwerp, met uitleg bij het antwoord.`,
    answer: "Antwoord",
    quiz: (name) => `${name}: voorbeeldvragen`,
  },
  pt: {
    title: (name) => `${name}: perguntas de exemplo com respostas`,
    sub: (n, total) => `${n} das ${total} perguntas de treino, uma de cada tema, com a resposta explicada.`,
    answer: "Resposta",
    quiz: (name) => `${name}: perguntas de exemplo`,
  },
};

/**
 * `lang` picks the bank (a translated one when registered, else the base
 * bank) and the headings; it defaults to the exam's base language, so a
 * native exam's landing shows its own questions with no prop.
 */
export function ExamSampleQuestions({ examId, count = 6, lang }: { examId: ExamId; count?: number; lang?: Language }) {
  const exam = getExamById(examId);
  const test = getCatalogEntry(examId);
  if (!exam || !test) return null;
  const language = lang ?? examBaseLanguage(exam);
  const sample = pickSampleQuestions(getExamQuestions(examId, language), count);
  if (sample.length === 0) return null;
  const copy = SAMPLE_COPY[language] ?? SAMPLE_COPY.en!;
  // English pages keep the catalog's English name; other languages use the exam's own.
  const shortName = language === "en" ? test.shortName : localizeExam(exam, language).shortName;
  const locale = examLandingLocale(examId, language);
  const total = test.questions.toLocaleString(locale);
  const landing = language === examBaseLanguage(exam) ? exam.landingPath ?? test.href : exam.translations?.[language]?.landingPath ?? test.href;

  const options = (q: Question) => [q.optionA, q.optionB, q.optionC, q.optionD];
  const key = (q: Question) => Math.max(0, LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]));
  const url = `${siteUrl}${landing}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "@id": `${url}#sample-questions`,
    name: copy.quiz(shortName),
    about: language === "en" ? test.name : localizeExam(exam, language).name,
    inLanguage: locale,
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
        {copy.title(shortName)}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-10">
        {copy.sub(sample.length, total)}
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
              <strong className="text-gray-900 dark:text-gray-50">{copy.answer}: {LETTERS[key(q)]}.</strong>{" "}
              {q.explanation}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
