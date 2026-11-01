import { Question } from "@/types";

// Answer-option shuffling, kept out of lib/testGenerator.ts so registry exam
// pages can use it without bundling the DMV question banks.

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Check if a question has position-dependent answers (e.g., "A and B", "Both B and C")
// These questions should not have their answers randomized
export function hasPositionDependentAnswers(question: Question): boolean {
  const options = [question.optionA, question.optionB, question.optionC, question.optionD];

  // Pattern to detect references to other answer options (English, Spanish,
  // Vietnamese, Korean, Chinese).
  // Matches: "A and B", "B and C", "Both A and B", "A, B, and C", "A y B", "Tanto A como B",
  // "Todas las anteriores", "Cả A và B", "Tất cả các câu trên", "A와 B", etc.
  // Korean has no space before the particle ("A와 B"), so that branch uses \s*
  // rather than the \s+ the Latin-script branches rely on. Chinese is the same
  // ("A和B都对"), and its "of the above" options start with 以上 ("以上都对"),
  // which never starts a plain answer ("18岁及以上" ends with it). English
  // "All of these" and Korean "이 모두" are matched as whole options only, so
  // they stay last like the Spanish, Vietnamese and Chinese "of the above".
  const positionReferencePattern = /\b(A|B|C|D)\s+(and|or|y|o|và|hoặc|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b|\bTanto\s+(A|B|C|D)\s+como\s+(A|B|C|D)\b|\bAll of the above\b|\bNone of the above\b|^All of these$|^이 모두$|\bTodas las anteriores\b|\bNinguna de las anteriores\b|Tất cả các câu trên|Không câu nào đúng|(A|B|C|D)\s*(와|과|및)\s*(A|B|C|D)|위의 모든 것|위의 어느 것도 아님|위 항목 모두|정답 없음|(A|B|C|D)\s*(和|与|或|及|、)\s*(A|B|C|D)|^以上/i;

  return options.some(option => positionReferencePattern.test(option) || OTHER_LANGUAGE_PATTERNS.some((p) => p.test(option)));
}

// The same guard for the European languages, one list per language, joined at
// module load. Add a language's "A and B" / "all of the above" wording here
// before its first bank ships. Letter connectors are case-sensitive (capital
// option letters only) so the Italian and Portuguese "e", Polish "i" or Dutch
// "en" between ordinary words never match; a "both" option counts only as the
// whole option ("Beide", "Beide sind richtig"), since "Beide halten an" or the
// Spanish "Ambos conductores..." are ordinary answers. A false match only keeps
// an item unshuffled.
const LANGUAGE_PATTERNS: Record<string, { connectors: string[]; phrases: string[]; both: string[] }> = {
  de: { connectors: ["und", "oder"], phrases: ["Alle Antworten sind richtig", "Alle genannten", "Keine der Antworten", "Keine der genannten"], both: ["Beide", "Beide sind richtig", "Beide Antworten sind richtig"] },
  fr: { connectors: ["et", "ou"], phrases: ["Toutes les réponses", "Aucune de ces réponses", "Aucune des réponses"], both: ["Les deux", "Les deux réponses"] },
  it: { connectors: ["e", "o"], phrases: ["Tutte le precedenti", "Nessuna delle precedenti", "Tutte le risposte"], both: ["Entrambe", "Entrambi", "Entrambe le risposte"] },
  pl: { connectors: ["i", "lub", "oraz"], phrases: ["Wszystkie powyższe", "Żadna z powyższych", "Wszystkie odpowiedzi"], both: ["Obie", "Oba", "Obie odpowiedzi"] },
  nl: { connectors: ["en", "of"], phrases: ["Alle bovenstaande", "Geen van de bovenstaande", "Alle antwoorden"], both: ["Beide", "Beide antwoorden"] },
  pt: { connectors: ["e", "ou"], phrases: ["Todas as anteriores", "Nenhuma das anteriores", "Todas as respostas"], both: ["Ambas", "Ambos", "Ambas as anteriores", "Ambas estão corretas"] },
};

const escape = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const OTHER_LANGUAGE_PATTERNS: RegExp[] = Object.values(LANGUAGE_PATTERNS).flatMap(({ connectors, phrases, both }) => [
  new RegExp(`\\b[ABCD]\\s+(?:${connectors.join("|")})\\s+[ABCD]\\b`),
  new RegExp(`(?:${phrases.map(escape).join("|")})`, "i"),
  new RegExp(`^(?:${both.map(escape).join("|")})\\.?$`, "iu"),
]);

// Shuffle the answer options for a question (returns new question with shuffled options)
// Skips shuffling for questions with position-dependent answers
export function shuffleQuestionOptions(question: Question): Question {
  // Don't shuffle if any option references other options by letter
  if (hasPositionDependentAnswers(question)) {
    return { ...question, optionOrder: "ABCD" };
  }

  const options = [
    { letter: 'A', text: question.optionA },
    { letter: 'B', text: question.optionB },
    { letter: 'C', text: question.optionC },
    { letter: 'D', text: question.optionD },
  ];

  const shuffled = shuffle(options);

  // Find new position of correct answer
  const correctOptionText = question[`option${question.correctAnswer}` as keyof Question] as string;
  const newCorrectIndex = shuffled.findIndex(opt => opt.text === correctOptionText);
  const newCorrectLetter = ['A', 'B', 'C', 'D'][newCorrectIndex];

  return {
    ...question,
    optionA: shuffled[0].text,
    optionB: shuffled[1].text,
    optionC: shuffled[2].text,
    optionD: shuffled[3].text,
    correctAnswer: newCorrectLetter,
    correctIndex: newCorrectIndex,
    optionOrder: shuffled.map((o) => o.letter).join(""),
  };
}
