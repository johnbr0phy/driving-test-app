import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// WAEC WASSCE English Language (West African Examinations Council), a core
// subject for every WASSCE candidate. Format from WAEC's English Language
// syllabus as published by waecsyllabus.com (updated September 5, 2026) and
// myschool.ng, which agree with the hosted syllabus PDF: Paper 1 is 80
// four-option objective questions in 1 hour for 40 marks, forty lexical
// (everyday vocabulary and sixteen fields of activity, synonyms and antonyms,
// idioms and figurative usage) and forty structural (concord, number, tense,
// degree, word order, pronouns, prepositions, conjunctions, determiners);
// Paper 2 is essay, comprehension and summary in 2 hours (written, not
// modelled); Paper 3 is 60 multiple-choice items in 45 minutes for 30 marks,
// the Test of Orals in Nigeria and Liberia (vowels, consonants and clusters,
// rhymes, word stress and syllables, emphatic stress and intonation, phonetic
// symbols) and listening comprehension elsewhere (not modelled). Ghana's
// Paper 1 is different (30 lexis, 20 structure, 30 literature).
//
// Paper 1 is modelled at full length; Paper 3 at half length at the real pace
// (30 in 23 minutes). Two practice tests, Test 2 held out; ten drills, 12
// dashboard steps. WAEC reports grades A1 to F9 and publishes no conversion,
// so the score is percent correct. Sources: tools/next100/wassceeng/sources.md.
const minutes = (n: number) => n * 60;

export const WASSCEENG: ExamV2Config = {
  id: "wassceeng",
  slug: "/wassce-english",
  landingPath: "/wassce-english-practice-test",
  name: "WASSCE English Language Practice Test",
  shortName: "WASSCE English",
  fullName: "WAEC WASSCE English Language",
  tagline: "Paper 1 objectives in full (80 lexis and structure questions in 1 hour) and the Test of Orals, with every answer explained.",
  icon: "book",
  theme: { brand: "275 95% 30%", brandDark: "275 95% 22%", brandLight: "275 95% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "p1",
      name: "Paper 1: Objective Test",
      shortName: "Paper 1",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(60) }],
      directions:
        "80 questions in 1 hour, like the real Paper 1: 40 on lexis (vocabulary of everyday life and the syllabus's fields of activity, synonyms, antonyms, idioms and figurative usage) and 40 on structure (concord, tenses, word forms, pronouns, prepositions and question tags). Each question has four options. You can move between questions and flag them.",
      scale: percentScale(80),
      domains: ["wassceengFields", "wassceengSynonyms", "wassceengIdioms", "wassceengConcord", "wassceengTenses", "wassceengStructure"],
    },
    {
      key: "p3",
      name: "Paper 3: Test of Orals",
      shortName: "Orals",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(23) }],
      directions:
        "30 questions in 23 minutes, half the real Test of Orals at the same pace (60 in 45 minutes): vowels, consonants and clusters, rhymes, word stress, emphatic stress and intonation. Underlined letters show the sound being tested, and in stress questions the syllable in capital letters carries the stress. Pronunciation follows standard British English.",
      scale: percentScale(30),
      domains: ["wassceengVowels", "wassceengConsonants", "wassceengRhymes", "wassceengStress"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    wassceengFields: "Vocabulary in Context",
    wassceengSynonyms: "Synonyms and Antonyms",
    wassceengIdioms: "Idioms and Figurative Usage",
    wassceengConcord: "Concord and Word Forms",
    wassceengTenses: "Tenses and Verb Forms",
    wassceengStructure: "Pronouns, Prepositions and Question Tags",
    wassceengVowels: "Vowels and Diphthongs",
    wassceengConsonants: "Consonants and Clusters",
    wassceengRhymes: "Rhymes",
    wassceengStress: "Stress and Intonation",
  },
  drills: [
    { key: "vocabulary", name: "Vocabulary in Context", section: "p1", domains: ["wassceengFields"], blurb: "The everyday words of building, farming, health, law, sport, religion, advertising and the other fields the syllabus lists." },
    { key: "synonyms", name: "Synonyms and Antonyms", section: "p1", domains: ["wassceengSynonyms"], blurb: "The word nearest in meaning, or most nearly opposite in meaning, to an underlined word." },
    { key: "idioms", name: "Idioms and Figurative Usage", section: "p1", domains: ["wassceengIdioms"], blurb: "What an idiom or a figurative expression really means, and what a sentence implies." },
    { key: "concord", name: "Concord and Word Forms", section: "p1", domains: ["wassceengConcord"], blurb: "Subject and verb agreement, plurals, comparison, adjective order, determiners and conjunctions." },
    { key: "tenses", name: "Tenses and Verb Forms", section: "p1", domains: ["wassceengTenses"], blurb: "Sequence of tenses, perfect and continuous tenses, the passive, conditionals and -ing or to after a verb." },
    { key: "structure", name: "Pronouns, Prepositions and Tags", section: "p1", domains: ["wassceengStructure"], blurb: "Pronoun case, relative pronouns, the right preposition, phrasal verbs and question tags." },
    { key: "vowels", name: "Vowels and Diphthongs", section: "p3", domains: ["wassceengVowels"], blurb: "Pure vowels, diphthongs, triphthongs and the phonetic symbols for them." },
    { key: "consonants", name: "Consonants and Clusters", section: "p3", domains: ["wassceengConsonants"], blurb: "Consonant sounds, clusters, silent letters and how -s and -ed endings are said." },
    { key: "rhymes", name: "Rhymes", section: "p3", domains: ["wassceengRhymes"], blurb: "Words that rhyme in sound, even when their spellings differ." },
    { key: "stress", name: "Stress and Intonation", section: "p3", domains: ["wassceengStress"], blurb: "Word stress, syllables, emphatic stress and rising and falling tunes." },
  ],
  composite: { name: "Overall score (percent)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the question types",
    60: "Building up: every candidate needs English",
    70: "A solid score on the objective papers",
    80: "Strong: aiming for a top grade",
    90: "Excellent",
  },
  testLength: "1 hr 23 min",
  copy: {
    heroSubs: [
      "Drill each part of the objective papers, then sit a full practice test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for WASSCE English.",
    ],
    sourceLine: "Original practice questions on the WAEC English Language syllabus (Paper 1 lexis and structure, Paper 3 Test of Orals). Not affiliated with or endorsed by WAEC.",
    scoreNote: "Percent correct across Paper 1 and the Test of Orals. WAEC grades English Language from A1 to F9 and does not publish how marks turn into grades, so this is not a grade. Paper 2 (essay, comprehension and summary) is not modelled, and it carries 100 of the 170 marks.",
  },
};
