import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Uttar Pradesh Teacher Eligibility Test (UPTET), Paper 1 (primary level,
// Classes 1 to 5), conducted since 2026 by the Uttar Pradesh Education Service
// Selection Commission (UPESSC). The 2026 test (notification March 2026) was held
// on 2 to 4 July 2026 on OMR sheets, with results on 26 August 2026. Paper 1:
// 150 one-mark multiple-choice questions in 2 hours 30 minutes, no negative
// marking, five sections of 30: Child Development and Pedagogy, Language I
// (Hindi), Language II (English, Urdu or Sanskrit), Mathematics and Environmental
// Studies. Qualifying mark 90 of 150 (60%) for general candidates and 82 of 150
// (55%) for reserved categories (UPTET 2026 information booklet, Adv. No.
// 01/UPTET/2026, section 10).
// Modelled here: all five sections with Language II as English, each a
// 12-question section at the real pace of one minute per question (60 in 60
// minutes). Hindi items are written in Hindi with English explanations.
// Test 2 is held out of the drills. Sources: tools/next100/uptet/sources.md.
const minutes = (n: number) => n * 60;

export const UPTET: ExamV2Config = {
  id: "uptet",
  slug: "/uptet",
  landingPath: "/uptet-paper-1-practice-test",
  name: "UPTET Practice Test",
  shortName: "UPTET",
  fullName: "UPTET Paper 1 (Classes 1 to 5)",
  tagline: "UPTET Paper 1 mock tests: child development and pedagogy, Hindi, English, maths and EVS, with content and pedagogy questions.",
  icon: "book",
  theme: { brand: "156 30% 31%", brandDark: "156 30% 21%", brandLight: "156 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cdp",
      name: "Child Development and Pedagogy",
      shortName: "CDP",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(12) }],
      directions:
        "Child development of the primary school child, individual differences, inclusive education and children with special needs, then theories of learning, assessment and the RTE Act in the classroom. 12 questions in 12 minutes, the real paper's pace.",
      scale: percentScale(12),
      domains: ["uptetDev", "uptetLearn"],
    },
    {
      key: "hindi",
      name: "Language I (Hindi)",
      shortName: "Hindi",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(12) }],
      directions:
        "हिंदी: एक अपठित गद्यांश, फिर वर्ण, संधि, समास, अलंकार और अन्य व्याकरण, फिर हिंदी भाषा शिक्षण। Questions are in Hindi; every explanation is in English. 12 questions in 12 minutes.",
      scale: percentScale(12),
      domains: ["uptetHindi", "uptetHindiPed"],
    },
    {
      key: "english",
      name: "Language II (English)",
      shortName: "English",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(12) }],
      directions:
        "An unseen passage with comprehension questions, then grammar and vocabulary, then the pedagogy of teaching English. Language II can also be Urdu or Sanskrit on the real paper; this section is English. 12 questions in 12 minutes.",
      scale: percentScale(12),
      domains: ["uptetEnglish"],
    },
    {
      key: "maths",
      name: "Mathematics",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(12) }],
      directions:
        "Primary mathematics content (place value, Roman numerals, fractions and decimals, factors, geometry, measurement, time, money and averages), then mathematics pedagogy. A few questions ask you to type a number: type digits only, with no units, commas or rupee sign. No calculator.",
      scale: percentScale(12),
      domains: ["uptetMaths", "uptetMathsPed"],
    },
    {
      key: "evs",
      name: "Environmental Studies",
      shortName: "EVS",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(12) }],
      directions:
        "EVS content (plants, animals, our body, food, water, shelter, maps, Uttar Pradesh and our surroundings), then EVS pedagogy. 12 questions in 12 minutes.",
      scale: percentScale(12),
      domains: ["uptetEvs", "uptetEvsPed"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    uptetDev: "Child Development and Inclusive Education",
    uptetLearn: "Learning and Pedagogy",
    uptetHindi: "Hindi: Passage and Grammar",
    uptetHindiPed: "Hindi Pedagogy",
    uptetEnglish: "English (Language II)",
    uptetMaths: "Mathematics Content",
    uptetMathsPed: "Pedagogy of Mathematics",
    uptetEvs: "EVS Content",
    uptetEvsPed: "Pedagogy of EVS",
  },
  drills: [
    { key: "development", name: "Child Development", section: "cdp", domains: ["uptetDev"], blurb: "Piaget, Vygotsky, Erikson, Kohlberg, Gardner, intelligence, inclusive education and learning disabilities." },
    { key: "learning", name: "Learning and Pedagogy", section: "cdp", domains: ["uptetLearn"], blurb: "Thorndike, Pavlov, Skinner, Bandura, assessment, motivation, NEP 2020 and the RTE Act." },
    { key: "hindi", name: "Hindi Passage and Grammar", section: "hindi", domains: ["uptetHindi"], blurb: "अपठित गद्यांश, वर्ण, संधि, समास, अलंकार, पर्यायवाची, विलोम and रचनाकार." },
    { key: "hindiPedagogy", name: "Hindi Pedagogy", section: "hindi", domains: ["uptetHindiPed"], blurb: "भाषा कौशल, पठन और लेखन शिक्षण, व्याकरण शिक्षण, उच्चारण and assessment." },
    { key: "english", name: "English (Language II)", section: "english", domains: ["uptetEnglish"], blurb: "An unseen passage, grammar, vocabulary and the pedagogy of teaching English." },
    { key: "maths", name: "Mathematics Content", section: "maths", domains: ["uptetMaths"], blurb: "Place value, Roman numerals, fractions, decimals, primes, LCM, geometry, measurement and time." },
    { key: "mathsPedagogy", name: "Mathematics Pedagogy", section: "maths", domains: ["uptetMathsPed"], blurb: "Inductive and analytic methods, materials, errors and remedial teaching, Polya and estimation." },
    { key: "evs", name: "EVS Content", section: "evs", domains: ["uptetEvs"], blurb: "Plants, animals, our body, food, water, shelter, maps, crops and Uttar Pradesh." },
    { key: "evsPedagogy", name: "EVS Pedagogy", section: "evs", domains: ["uptetEvsPed"], blurb: "Integrated EVS, surveys, concept maps, experiments, inclusion and assessment indicators." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 65, 70, 75, 80],
  goalNotes: {
    55: "The qualifying mark for reserved categories",
    60: "The UPTET qualifying mark for general candidates",
    65: "A small margin over 60 percent",
    70: "A safe margin over the qualifying mark",
    75: "Strong: ready to sit Paper 1",
    80: "Well above the qualifying mark",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each section, then take a full mock.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for UPTET Paper 1.",
    ],
    sourceLine: "Original questions on the UPTET Paper 1 syllabus (CDP, Hindi, English, Mathematics, EVS). Not affiliated with or endorsed by UPESSC or the Government of Uttar Pradesh.",
    scoreNote: "Percent correct across the five sections, each modelled at 12 of the real 30 questions at the real pace of one minute per question. The real UPTET Paper 1 has 150 questions in 2 hours 30 minutes with no negative marking; the 2026 information booklet sets the qualifying mark at 90 of 150 (60 percent) for general candidates and 82 of 150 (55 percent) for reserved categories. Check the booklet for your cycle.",
  },
};
