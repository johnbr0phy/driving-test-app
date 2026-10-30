import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CBSE Central Teacher Eligibility Test (CTET), Paper I (Classes 1 to 5), per the
// CTET information bulletin and syllabus (pattern unchanged through the February
// 2026 session): 150 one-mark multiple-choice questions in 2 hours 30 minutes, no
// negative marking, five sections of 30: Child Development and Pedagogy (15 child
// development, 5 inclusive education, 10 learning and pedagogy), Language I (15
// comprehension, 15 pedagogy), Language II (same split), Mathematics (15 content,
// 15 pedagogy) and Environmental Studies (15 content, 15 pedagogy). Qualifying
// mark 60% (90 of 150); reserved categories get a concession under NCTE
// guidelines (55%). Pen-and-paper OMR in recent sessions. Certificate valid for life.
// Modelled here: CDP, Language I (English) with an unseen prose passage and an
// unseen poem, Mathematics and EVS, each as a 15-question section at the real
// pace of one minute per question (60 in 60 minutes). Language II is not
// modelled: candidates pick it from twenty languages. Test 2 is held out of the
// drills. Sources: tools/ctet/sources.md.
const minutes = (n: number) => n * 60;

export const CTET: ExamV2Config = {
  id: "ctet",
  slug: "/ctet",
  landingPath: "/ctet-practice-test",
  name: "CTET Practice Test",
  shortName: "CTET",
  fullName: "CTET Paper I (Classes 1 to 5)",
  tagline: "CTET Paper I mock tests: child development and pedagogy, English, maths and EVS, with content and pedagogy questions.",
  icon: "book",
  theme: { brand: "22 80% 28%", brandDark: "22 80% 19%", brandLight: "22 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cdp",
      name: "Child Development and Pedagogy",
      shortName: "CDP",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "Child development at the primary stage (principles of development, Piaget, Vygotsky and Kohlberg, gender and socialisation), inclusive education and children with special needs, then learning and pedagogy. 15 questions in 15 minutes, the real paper's pace.",
      scale: percentScale(15),
      domains: ["ctetDev", "ctetLearn"],
    },
    {
      key: "lang",
      name: "Language I (English)",
      shortName: "English",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "An unseen prose passage and an unseen poem with comprehension, vocabulary and grammar questions, then questions on the pedagogy of language development. 15 questions in 15 minutes.",
      scale: percentScale(15),
      domains: ["ctetComp", "ctetLangPed"],
    },
    {
      key: "maths",
      name: "Mathematics",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "Primary mathematics content (numbers, operations, fractions, shapes, measurement, money, data and patterns), then mathematics pedagogy. A few questions ask you to type a number: type digits only, with no units, commas or rupee sign. No calculator, as on the real paper.",
      scale: percentScale(15),
      domains: ["ctetMaths", "ctetMathsPed"],
    },
    {
      key: "evs",
      name: "Environmental Studies",
      shortName: "EVS",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "EVS content on the CTET themes (family and friends, food, shelter, water, travel, things we make and do), then EVS pedagogy. 15 questions in 15 minutes.",
      scale: percentScale(15),
      domains: ["ctetEvs", "ctetEvsPed"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ctetDev: "Child Development and Inclusive Education",
    ctetLearn: "Learning and Pedagogy",
    ctetComp: "Reading Comprehension (Passage and Poem)",
    ctetLangPed: "Pedagogy of Language Development",
    ctetMaths: "Mathematics Content",
    ctetMathsPed: "Pedagogy of Mathematics",
    ctetEvs: "EVS Content",
    ctetEvsPed: "Pedagogy of EVS",
  },
  drills: [
    { key: "development", name: "Child Development", section: "cdp", domains: ["ctetDev"], blurb: "Principles of development, Piaget, Vygotsky, Kohlberg, gender, inclusive education and learning disabilities." },
    { key: "learning", name: "Learning and Pedagogy", section: "cdp", domains: ["ctetLearn"], blurb: "How children think and learn, errors, motivation, assessment and NCF 2005." },
    { key: "comprehension", name: "English Comprehension", section: "lang", domains: ["ctetComp"], blurb: "Unseen passages and poems: main idea, inference, vocabulary, grammar and figures of speech." },
    { key: "langPedagogy", name: "Language Pedagogy", section: "lang", domains: ["ctetLangPed"], blurb: "Acquisition, LSRW skills, grammar in context, multilingual classrooms and remedial teaching." },
    { key: "maths", name: "Mathematics Content", section: "maths", domains: ["ctetMaths"], blurb: "Place value, operations, fractions, shapes, measurement, money, data and patterns." },
    { key: "mathsPedagogy", name: "Mathematics Pedagogy", section: "maths", domains: ["ctetMathsPed"], blurb: "Mathematisation, concrete to abstract, van Hiele, errors and remedial teaching." },
    { key: "evs", name: "EVS Content", section: "evs", domains: ["ctetEvs"], blurb: "Plants, animals, food, water, shelter, travel and things we make and do." },
    { key: "evsPedagogy", name: "EVS Pedagogy", section: "evs", domains: ["ctetEvsPed"], blurb: "Integrated EVS, activities and experiments, field trips, discussion and CCE indicators." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80],
  goalNotes: {
    60: "The CTET qualifying mark for general candidates",
    65: "A small margin over 60 percent",
    70: "A safe margin over the qualifying mark",
    75: "Strong: ready to sit Paper I",
    80: "Well above the qualifying mark",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each section, then take a full mock.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for CTET Paper I.",
    ],
    sourceLine: "Original questions on the CBSE CTET Paper I syllabus (CDP, Language I English, Mathematics, EVS). Language II is not included. Not affiliated with or endorsed by CBSE.",
    scoreNote: "Percent correct across the four sections modelled here. The real CTET has no negative marking and you qualify with 60 percent (90 of 150) as a general candidate; reserved categories are usually given a concession to 55 percent.",
  },
};
