import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JAMB UTME Use of English (Joint Admissions and Matriculation Board, Nigeria).
// The UTME is one computer-based sitting of four subjects, 180 objective
// questions in 2 hours: Use of English (compulsory) 60 questions and three
// other subjects of 40 each, every subject scored out of 100, so 400 in all.
// The Use of English syllabus has three sections: Comprehension and Summary,
// Lexis and Structure, and Oral Forms. Guides (not JAMB) give the paper as
// about 25 comprehension items (a passage, a cloze passage of 10 and about 10
// on the prescribed reading text), 25 lexis and structure (sentence
// interpretation, synonyms, antonyms, sentence completion) and 10 oral forms.
// The prescribed reading text changes by cycle and is copyrighted, so it is
// not modelled: its share goes to two more original passages. One section of
// 60 four-option questions in 40 minutes, the pro rata share of the 2 hours,
// with free navigation as on the real CBT. Two practice tests, Test 2 held
// out; six drills (per test 15/10/5/10/10/10), 8 dashboard steps. Percent
// score out of 100, like the subject score. Sources:
// tools/next100/jambeng/sources.md.
const minutes = (n: number) => n * 60;

export const JAMBENG: ExamV2Config = {
  id: "jambeng",
  slug: "/jamb-use-of-english",
  landingPath: "/jamb-use-of-english-practice-test",
  name: "JAMB Use of English Practice Test",
  shortName: "JAMB English",
  fullName: "JAMB UTME Use of English",
  tagline: "60 questions in 40 minutes: comprehension passages, a cloze test, lexis and structure, and oral forms, scored out of 100.",
  icon: "book",
  theme: { brand: "133 70% 30%", brandDark: "133 70% 22%", brandLight: "133 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "eng",
      name: "Use of English",
      shortName: "English",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(40) }],
      directions:
        "60 questions in 40 minutes, the share of the UTME's 2 hours that Use of English gets when you split the time by questions. Three comprehension passages, a cloze passage with ten gaps, then sentence interpretation, synonyms and antonyms, sentence completion and oral forms. You can move between questions and flag them, as on the real CBT. Wrong answers lose no marks here, so answer every question.",
      scale: percentScale(60),
      domains: ["jambengComprehension", "jambengCloze", "jambengInterpretation", "jambengVocabulary", "jambengCompletion", "jambengOral"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jambengComprehension: "Comprehension Passages",
    jambengCloze: "Cloze Test",
    jambengInterpretation: "Sentence Interpretation and Idioms",
    jambengVocabulary: "Synonyms and Antonyms",
    jambengCompletion: "Sentence Completion (Grammar)",
    jambengOral: "Oral Forms",
  },
  drills: [
    { key: "comprehension", name: "Comprehension", section: "eng", domains: ["jambengComprehension"], blurb: "Main idea, detail, inference, words in context, tone and figures of speech on original passages." },
    { key: "cloze", name: "Cloze Test", section: "eng", domains: ["jambengCloze"], blurb: "Choosing the word that fits each numbered gap in a passage." },
    { key: "interpretation", name: "Sentence Interpretation", section: "eng", domains: ["jambengInterpretation"], blurb: "Idioms, figurative expressions and what a sentence implies." },
    { key: "vocabulary", name: "Synonyms and Antonyms", section: "eng", domains: ["jambengVocabulary"], blurb: "The word nearest in meaning, or opposite in meaning, to an underlined word." },
    { key: "completion", name: "Sentence Completion", section: "eng", domains: ["jambengCompletion"], blurb: "Concord, tenses, question tags, prepositions, pronouns, phrasal verbs and collocation." },
    { key: "oral", name: "Oral Forms", section: "eng", domains: ["jambengOral"], blurb: "Vowels, consonants, silent letters, rhymes, word stress, emphatic stress and intonation." },
  ],
  composite: { name: "Use of English score (out of 100)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the question types",
    60: "Building up: English counts in every course's aggregate",
    70: "A solid score that lifts your UTME total",
    80: "Strong: a big boost for competitive courses",
    90: "Excellent",
  },
  testLength: "40 min",
  copy: {
    heroSubs: [
      "Drill each part of the paper, then sit a full practice test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for Use of English.",
    ],
    sourceLine: "Original practice questions on the JAMB UTME Use of English syllabus (comprehension, lexis and structure, oral forms). Not affiliated with or endorsed by JAMB.",
    scoreNote: "Score out of 100, like the UTME subject score, from 60 questions. The prescribed reading text is not modelled: its questions are replaced by original passages. Your real UTME total is out of 400 across four subjects, and the cut-off mark depends on the institution and course.",
  },
};
