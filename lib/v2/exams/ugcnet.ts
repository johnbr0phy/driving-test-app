import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// UGC-NET Paper 1 (General Paper on Teaching and Research Aptitude, code 00),
// conducted by the National Testing Agency for the UGC in computer-based mode,
// twice a year (June and December cycles). Per the UGC-NET December 2026
// information bulletin (NTA, revised 16 October 2026; exam 14 to 18 and 21
// December 2026), unchanged from December 2025: two papers in one sitting of 3
// hours (180 minutes) with no break; Paper 1 has 50 compulsory questions for
// 100 marks, Paper 2 (the candidate's subject) 100 questions for 200 marks;
// 2 marks per correct answer, no negative marking; question paper in English
// and Hindi. To be considered for qualification a candidate needs at least 40%
// aggregate across both papers (35% for reserved categories); subject and
// category cut-offs are then set from the result. The UGC NET Bureau's Paper I
// syllabus has ten units and sets five questions from each: Teaching Aptitude,
// Research Aptitude, Comprehension (a passage), Communication, Mathematical
// Reasoning and Aptitude, Logical Reasoning (with Indian logic), Data
// Interpretation, ICT, People Development and Environment, Higher Education
// System. Modelled: two full Paper 1 mocks of 50 questions (5 per unit, in
// syllabus order; one reading passage and one data table of 5 questions each)
// in 60 minutes, the Paper 1 share of the real 3 hours at 1.2 minutes per
// question. Test 2 is held out of the drills. Paper 2 is not modelled. No
// current affairs. Sources: tools/next100/ugcnet/sources.md.
const minutes = (n: number) => n * 60;

export const UGCNET: ExamV2Config = {
  id: "ugcnet",
  slug: "/ugc-net-paper-1",
  landingPath: "/ugc-net-paper-1-practice-test",
  name: "UGC-NET Paper 1 Practice Test",
  shortName: "UGC-NET Paper 1",
  fullName: "UGC-NET Paper 1: Teaching and Research Aptitude",
  tagline: "Full 50-question UGC-NET Paper 1 mocks across all ten units, with a reading passage and a data table, plus a drill for every unit.",
  icon: "graduation",
  theme: { brand: "240 22% 41%", brandDark: "240 22% 31%", brandLight: "240 22% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "p1",
      name: "Paper 1: Teaching and Research Aptitude",
      shortName: "Paper 1",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(60) }],
      directions:
        "50 questions in 60 minutes, five from each of the ten units in syllabus order, including a reading passage and a data table with five questions each. The real exam gives 3 hours for Paper 1 and Paper 2 together (150 questions), so 60 minutes is Paper 1's share. Every question carries 2 marks and there is no negative marking, so answer every one. You can move between questions and flag them.",
      scale: percentScale(50),
      domains: [
        "ugcnetTeaching", "ugcnetResearch", "ugcnetComprehension", "ugcnetCommunication", "ugcnetMaths",
        "ugcnetLogic", "ugcnetData", "ugcnetIct", "ugcnetEnvironment", "ugcnetHigherEd",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ugcnetTeaching: "Teaching Aptitude",
    ugcnetResearch: "Research Aptitude",
    ugcnetComprehension: "Comprehension",
    ugcnetCommunication: "Communication",
    ugcnetMaths: "Mathematical Reasoning and Aptitude",
    ugcnetLogic: "Logical Reasoning",
    ugcnetData: "Data Interpretation",
    ugcnetIct: "Information and Communication Technology",
    ugcnetEnvironment: "People, Development and Environment",
    ugcnetHigherEd: "Higher Education System",
  },
  drills: [
    { key: "teaching", name: "Teaching Aptitude", section: "p1", domains: ["ugcnetTeaching"], blurb: "Levels of teaching, learner characteristics, teaching methods, SWAYAM and MOOCs, and evaluation systems including CBCS." },
    { key: "research", name: "Research Aptitude", section: "p1", domains: ["ugcnetResearch"], blurb: "Types and methods of research, sampling, hypotheses, referencing styles, research ethics and ICT in research." },
    { key: "comprehension", name: "Comprehension", section: "p1", domains: ["ugcnetComprehension"], blurb: "Original passages with five questions each: main idea, detail, inference, tone and vocabulary in context." },
    { key: "communication", name: "Communication", section: "p1", domains: ["ugcnetCommunication"], blurb: "Models and types of communication, non-verbal cues, barriers, classroom communication and mass media theories." },
    { key: "maths", name: "Mathematical Reasoning", section: "p1", domains: ["ugcnetMaths"], blurb: "Number and letter series, codes, relationships, percentages, profit and loss, interest, averages and ratio." },
    { key: "logic", name: "Logical Reasoning", section: "p1", domains: ["ugcnetLogic"], blurb: "Categorical propositions, the square of opposition, syllogisms, fallacies, Venn diagrams and Indian logic: pramanas, vyapti and hetvabhasa." },
    { key: "data", name: "Data Interpretation", section: "p1", domains: ["ugcnetData"], blurb: "Tables with five questions each: totals, averages, percentage change, ratios, shares and pie chart angles." },
    { key: "ict", name: "ICT and Higher Education", section: "p1", domains: ["ugcnetIct", "ugcnetHigherEd"], blurb: "Internet and email basics, digital initiatives in higher education, e-governance, and India's higher education system and policies." },
    { key: "environment", name: "People and Environment", section: "p1", domains: ["ugcnetEnvironment"], blurb: "SDGs, pollution and health, waste, energy resources, disasters, and international environmental agreements." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "The minimum aggregate for general candidates, across both papers",
    50: "Above the minimum, but cut-offs run higher",
    60: "A solid Paper 1 score",
    70: "Strong: Paper 1 can lift your aggregate",
    80: "Very strong, aiming for JRF",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full Paper 1 mock.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for UGC-NET Paper 1.",
    ],
    sourceLine: "Original practice questions on the UGC NET Bureau's Paper I syllabus (Teaching and Research Aptitude). Paper 2 is not included. Not affiliated with or endorsed by the UGC or the National Testing Agency.",
    scoreNote: "Percent correct on Paper 1, which is one third of the real exam's marks (100 of 300). The real UGC-NET has no negative marking. To be considered for qualification you need at least 40% aggregate across Paper 1 and Paper 2 together (35% for reserved categories), and the actual cut-offs for Assistant Professor and JRF are set for each subject and category after the result, usually well above that minimum.",
  },
};
