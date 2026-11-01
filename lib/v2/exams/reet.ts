import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Rajasthan Eligibility Examination for Teachers (REET), Level 1 (Classes 1 to 5),
// conducted by the Board of Secondary Education, Rajasthan (BSER), Ajmer. Pattern
// from the board's REET 2024 notification (No. 01/2024, 12 December 2024; exam
// held 27 and 28 February 2025; read from the board's short notice and a copy of
// the detailed notice, November 2026): 150 one-mark multiple-choice questions in
// 2 hours 30 minutes, five parts of 30: Child Development and Pedagogy, Language I,
// Language II, Mathematics and Environmental Studies. Language I and II are chosen
// from Hindi, English, Sanskrit, Urdu, Sindhi, Punjabi and Gujarati. The question
// paper has four options (A to D); the OMR sheet has a fifth bubble, E, for a
// question the candidate chooses not to answer. A question with no bubble filled
// loses one-third of its mark, and a candidate who leaves more than 10 percent of
// questions with no bubble is disqualified; the notification sets no deduction for
// a wrong answer. Qualifying marks: 60% general; 55% SC, OBC, MBC, EWS and ST
// (36% for ST in TSP areas); 50% widows, divorced women and ex-servicemen; 40%
// persons with disabilities; 36% Sahariya. Guides list Rajasthan's culture, fairs,
// festivals and environment under Level 1 EVS. No new REET notice had been
// published as of November 2026.
// Modelled here: CDP, Language I (Hindi, in Devanagari), Language II (English),
// Mathematics and EVS, each as a 15-question section at the real pace of one
// minute per question (75 in 75 minutes), with four answer choices. Negative
// marking is explained, not applied. Test 2 is held out of the drills. Sources:
// tools/next100/reet/sources.md.
const minutes = (n: number) => n * 60;

export const REET: ExamV2Config = {
  id: "reet",
  slug: "/reet",
  landingPath: "/reet-level-1-practice-test",
  name: "REET Level 1 Practice Test",
  shortName: "REET",
  fullName: "REET Level 1 (Classes 1 to 5)",
  tagline: "REET Level 1 mock tests: child development and pedagogy, Hindi, English, maths and EVS with Rajasthan, content and pedagogy.",
  icon: "book",
  theme: { brand: "39 25% 34%", brandDark: "39 25% 24%", brandLight: "39 25% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cdp",
      name: "Child Development and Pedagogy",
      shortName: "CDP",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "Child development, individual differences, intelligence and personality, learning theories and motivation, children with special needs, assessment, action research and the RTE Act 2009. 15 questions in 15 minutes, the real paper's pace.",
      scale: percentScale(15),
      domains: ["reetCdp"],
    },
    {
      key: "hindi",
      name: "Language I (Hindi)",
      shortName: "Hindi",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "हिंदी में: एक अपठित गद्यांश पर प्रश्न, फिर व्याकरण और हिंदी शिक्षण की विधियाँ। An unseen Hindi passage, grammar, then the pedagogy of teaching Hindi. 15 questions in 15 minutes.",
      scale: percentScale(15),
      domains: ["reetHindi", "reetHindiPed"],
    },
    {
      key: "english",
      name: "Language II (English)",
      shortName: "English",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "An unseen prose passage, grammar and vocabulary, then the pedagogy of teaching English. 15 questions in 15 minutes.",
      scale: percentScale(15),
      domains: ["reetEnglish", "reetEnglishPed"],
    },
    {
      key: "maths",
      name: "Mathematics",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "Primary mathematics (numbers, operations, fractions and decimals, measurement, time, shapes, patterns and data), then mathematics pedagogy. A few questions ask you to type a number: type digits only, with no units or commas. No calculator.",
      scale: percentScale(15),
      domains: ["reetMaths", "reetMathsPed"],
    },
    {
      key: "evs",
      name: "Environmental Studies",
      shortName: "EVS",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(15) }],
      directions:
        "EVS content, including Rajasthan's culture, fairs, festivals, wildlife and water, then EVS pedagogy. 15 questions in 15 minutes.",
      scale: percentScale(15),
      domains: ["reetEvs", "reetEvsPed"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    reetCdp: "Child Development and Pedagogy",
    reetHindi: "Hindi: Passage and Grammar",
    reetHindiPed: "Pedagogy of Hindi",
    reetEnglish: "English: Passage and Grammar",
    reetEnglishPed: "Pedagogy of English",
    reetMaths: "Mathematics Content",
    reetMathsPed: "Pedagogy of Mathematics",
    reetEvs: "EVS and Rajasthan",
    reetEvsPed: "Pedagogy of EVS",
  },
  drills: [
    { key: "cdp", name: "Child Development and Pedagogy", section: "cdp", domains: ["reetCdp"], blurb: "Erikson, Piaget, Skinner, Pavlov, Kohler, intelligence, personality, special needs, assessment and the RTE Act." },
    { key: "hindi", name: "Hindi Passage and Grammar", section: "hindi", domains: ["reetHindi"], blurb: "अपठित गद्यांश, संधि, समास, लिंग, उपसर्ग, कारक, पर्यायवाची, विलोम और वर्तनी।" },
    { key: "hindiPedagogy", name: "Hindi Pedagogy", section: "hindi", domains: ["reetHindiPed"], blurb: "भाषा अर्जन, पठन विधियाँ, व्याकरण और कविता शिक्षण, निदान और उपचार।" },
    { key: "english", name: "English Passage and Grammar", section: "english", domains: ["reetEnglish"], blurb: "Unseen passages, agreement, articles, prepositions, voice, narration and vocabulary." },
    { key: "englishPedagogy", name: "English Pedagogy", section: "english", domains: ["reetEnglishPed"], blurb: "Phonics, TPR, direct and communicative methods, reading strategies and assessing writing." },
    { key: "maths", name: "Mathematics Content", section: "maths", domains: ["reetMaths"], blurb: "Place value, fractions, decimals, LCM, measurement, time, shapes, patterns and data." },
    { key: "mathsPedagogy", name: "Mathematics Pedagogy", section: "maths", domains: ["reetMathsPed"], blurb: "Pre-number concepts, teaching aids, children's errors, mental maths and open questions." },
    { key: "evs", name: "EVS and Rajasthan", section: "evs", domains: ["reetEvs"], blurb: "Plants, animals, food, water and shelter, plus Rajasthan's fairs, dances, wildlife and lakes." },
    { key: "evsPedagogy", name: "EVS Pedagogy", section: "evs", domains: ["reetEvsPed"], blurb: "Projects, inquiry, field visits, community resources, discussion and assessing process skills." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80],
  goalNotes: {
    60: "The REET qualifying mark for general candidates",
    65: "A small margin over 60 percent",
    70: "A safe margin over the qualifying mark",
    75: "Strong: ready to sit Level 1",
    80: "Well above the qualifying mark",
  },
  testLength: "1 hr 15 min",
  copy: {
    heroSubs: [
      "Drill each section, then take a full mock.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for REET Level 1.",
    ],
    sourceLine: "Original questions on the REET Level 1 syllabus (CDP, Hindi, English, Mathematics, EVS with Rajasthan). Not affiliated with or endorsed by the Board of Secondary Education, Rajasthan.",
    scoreNote: "Percent correct across the five sections, modelled at 75 questions in 75 minutes (the real paper is 150 in 2 hours 30 minutes, the same pace). On the real REET a general candidate qualifies with 60 percent (55 percent for SC, OBC, MBC, EWS and ST candidates, with lower marks for some other groups). Since REET 2024 the answer sheet has a fifth bubble, E, for a question you choose not to answer: per the notification, a question with no bubble filled loses one-third of a mark, more than 10 percent left with no bubble disqualifies, and a wrong answer is not penalised. Tigertest scores right answers only and does not deduct marks.",
  },
};
