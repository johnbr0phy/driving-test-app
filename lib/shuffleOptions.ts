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

  // Options that name other options by letter: "A and B", "Both B and C",
  // "A, B, and C", "A y B", "Tanto A como B", "Cả A và B", "A와 B", "A和B".
  // Capital letters only: matched without regard to case, an ordinary Spanish
  // "o a" or Vietnamese "và a" counted as a reference and kept a translated
  // question in bank order while its English original was shuffled. Korean
  // and Chinese put no space before the particle, so those branches use \s*.
  const letterReferencePattern = /\b[ABCD]\s+(and|or|y|o|và|hoặc|,)\s+[ABCD]\b|\b[Bb]oth\s+[ABCD]\s+and\s+[ABCD]\b|\b[Tt]anto\s+[ABCD]\s+como\s+[ABCD]\b|[ABCD]\s*(와|과|및)\s*[ABCD]|[ABCD]\s*(和|与|或|及|、)\s*[ABCD]/;

  // Options that mean "the options before this one" (English, Spanish,
  // Vietnamese, Korean, Chinese). The Chinese ones start with 以上 ("以上都对"),
  // which never starts a plain answer ("18岁及以上" ends with it). "Any of
  // these", "All of these" and their translations count only as the whole
  // option, since "Any of these roads" is an ordinary answer.
  const aboveReferencePattern = /\bAll of the above\b|\bNone of the above\b|^(All|Any|None|Both|Either|Neither) of these\.?$|^이 모두$|^이 중 어느 것이든$|\bTodas las anteriores\b|\bNinguna de las anteriores\b|^Cualquiera de est[ao]s\.?$|Tất cả các câu trên|Không câu nào đúng|^Bất kỳ điều nào trong số này$|위의 모든 것|위의 어느 것도 아님|위 항목 모두|정답 없음|^以上/i;

  if (options.some(option => letterReferencePattern.test(option) || aboveReferencePattern.test(option.trim()) || OTHER_LANGUAGE_PATTERNS.some((p) => p.test(option)))) return true;

  // "All these choices are correct" (the ham radio pool's wording) is always
  // the last option, like "All of the above".
  if (options.some(option => /^All (of )?these (choices|answers) are correct\.?$/i.test(option))) return true;

  // Options that are themselves the letters A to D (suspects A, B, C, D):
  // shuffled, slot A would read "C".
  return options.every(option => /^[A-D]$/.test(option.trim()));
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
  sv: { connectors: ["och", "eller"], phrases: ["Alla ovanstående", "Inget av ovanstående", "Ingen av ovanstående", "Alla svaren", "Alla alternativen"], both: ["Båda", "Båda är rätt", "Båda svaren", "Båda alternativen"] },
  da: { connectors: ["og", "eller"], phrases: ["Alle ovenstående", "Ingen af ovenstående", "Alle svarene er rigtige", "Alle svar er rigtige", "Ingen af svarene"], both: ["Begge", "Begge dele", "Begge svar", "Begge svar er rigtige"] },
  fi: { connectors: ["ja", "tai"], phrases: ["Kaikki edellä mainitut", "Kaikki yllä olevat", "Ei mikään edellä mainituista", "Ei mikään yllä olevista", "Kaikki vastaukset", "Kaikki vaihtoehdot"], both: ["Molemmat", "Molemmat ovat oikein", "Molemmat vastaukset", "Molemmat vaihtoehdot"] },
  hu: { connectors: ["és", "vagy"], phrases: ["A fentiek mindegyike", "A fentiek közül egyik sem", "Egyik fenti sem", "Egyik válasz sem", "Mindegyik válasz helyes", "Minden válasz helyes"], both: ["Mindkettő", "Mindkettő helyes", "Mindkét válasz", "Mindkét válasz helyes"] },
  ro: { connectors: ["și", "sau", "ori"], phrases: ["Toate cele de mai sus", "Niciuna dintre cele de mai sus", "Niciunul dintre cele de mai sus", "Toate variantele", "Toate variantele sunt corecte", "Toate răspunsurile sunt corecte", "Niciuna dintre variante", "Niciun răspuns nu este corect"], both: ["Ambele", "Amândouă", "Amândoi", "Ambii", "Ambele variante", "Ambele răspunsuri", "Ambele sunt corecte"] },
  el: { connectors: ["και", "ή"], phrases: ["Όλα τα παραπάνω", "Όλες οι παραπάνω", "Όλοι οι παραπάνω", "Κανένα από τα παραπάνω", "Καμία από τις παραπάνω", "Κανένας από τους παραπάνω", "Όλες οι απαντήσεις"], both: ["Και τα δύο", "Και οι δύο", "Αμφότερα", "Και οι δύο απαντήσεις"] },
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
