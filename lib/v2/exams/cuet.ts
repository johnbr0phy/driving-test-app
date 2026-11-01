import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CUET (UG) General Aptitude Test (test code 501): the general test of the
// Common University Entrance Test for undergraduate admission, conducted by
// the National Testing Agency. Pattern per the CUET (UG) 2026 Information
// Bulletin (exam 11-31 May 2026, tentative): every test paper, the General
// Aptitude Test included, has 50 compulsory multiple-choice questions in 60
// minutes, +5 for a right answer and -1 for a wrong one, computer based, in
// 13 mediums. Syllabus: general knowledge, current affairs, general mental
// ability, numerical ability, quantitative reasoning (simple application of
// basic mathematical concepts: arithmetic, algebra, geometry, mensuration,
// statistics), logical and analytical reasoning (the 2026 syllabus for test
// 501 adds general science and environment literacy). NTA publishes no section
// split, so Tigertest's per-test blueprint is its own: GK 18 (history and
// culture 6, geography, polity and economy 6, science 6), general mental
// ability 7, numerical ability 7, quantitative reasoning 8, logical 5 and
// analytical reasoning 5. A test is one 50-item, 60-minute section in
// syllabus order: two full-length practice tests, Test 2 held out. Eight
// drills, one per domain, so the dashboard is 10 steps. GK is static only
// (current affairs change every cycle and are left out); reasoning is text
// only; English only. Score is percent correct; the +5/-1 marking is explained
// in scoreNote and on the landing, not applied. Sources:
// tools/next100/cuet/sources.md.
const minutes = (n: number) => n * 60;

export const CUET: ExamV2Config = {
  id: "cuet",
  slug: "/cuet",
  landingPath: "/cuet-general-test-practice-test",
  name: "CUET General Test Practice Test",
  shortName: "CUET GAT",
  fullName: "CUET (UG) General Aptitude Test",
  tagline: "50 compulsory questions in 60 minutes: general knowledge, mental ability, numerical ability, quantitative and logical reasoning.",
  icon: "graduation",
  theme: { brand: "280 30% 30%", brandDark: "280 30% 20%", brandLight: "280 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "gat",
      name: "CUET (UG) General Aptitude Test",
      shortName: "General Test",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(60) }],
      directions: "50 questions in 60 minutes, all compulsory: general knowledge, general mental ability, numerical ability, quantitative reasoning, and logical and analytical reasoning. Move freely and flag questions to come back to. The real test gives 5 marks for a right answer and takes 1 mark off for a wrong one; this practice test scores percent correct.",
      scale: percentScale(50),
      domains: [
        "cuetHistory",
        "cuetGeoPolity",
        "cuetScience",
        "cuetMental",
        "cuetNumerical",
        "cuetQuant",
        "cuetLogical",
        "cuetAnalytical",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cuetHistory: "General Knowledge: History, Culture and Sports",
    cuetGeoPolity: "General Knowledge: Geography, Polity and Economy",
    cuetScience: "General Knowledge: Science and Technology",
    cuetMental: "General Mental Ability",
    cuetNumerical: "Numerical Ability",
    cuetQuant: "Quantitative Reasoning",
    cuetLogical: "Logical Reasoning",
    cuetAnalytical: "Analytical Reasoning",
  },
  drills: [
    { key: "history", name: "History, Culture and Sports", section: "gat", domains: ["cuetHistory"], blurb: "Ancient, medieval and modern India, the national movement, art, dance and literature, and sports." },
    { key: "geopolity", name: "Geography, Polity and Economy", section: "gat", domains: ["cuetGeoPolity"], blurb: "Rivers, ports, plateaus and world geography, the Constitution and Parliament, and basic economics." },
    { key: "science", name: "Science and Technology", section: "gat", domains: ["cuetScience"], blurb: "Everyday physics, chemistry and biology, health and nutrition, space, and computers and the internet." },
    { key: "mental", name: "General Mental Ability", section: "gat", domains: ["cuetMental"], blurb: "Number and letter series, analogies, odd one out, coding-decoding, symbol substitution and missing numbers." },
    { key: "numerical", name: "Numerical Ability", section: "gat", domains: ["cuetNumerical"], blurb: "Percentage, ratio, profit and discount, interest, averages, ages, mixtures, speed, trains and work." },
    { key: "quant", name: "Quantitative Reasoning", section: "gat", domains: ["cuetQuant"], blurb: "Algebra, triangles, circles and polygons, mensuration, coordinates, and mean, median, mode and tables." },
    { key: "logical", name: "Logical Reasoning", section: "gat", domains: ["cuetLogical"], blurb: "Syllogisms, statements with conclusions, assumptions and courses of action, blood relations and directions." },
    { key: "analytical", name: "Analytical Reasoning", section: "gat", domains: ["cuetAnalytical"], blurb: "Seating arrangements, ranking, comparisons, calendars, clocks, Venn diagrams and simple counting." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you build speed",
    60: "A fair score to build on",
    70: "A solid target for a good percentile",
    80: "Strong: aiming for top universities",
    90: "Topper territory",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full practice test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the General Test.",
    ],
    sourceLine: "Original practice questions on the CUET (UG) General Aptitude Test syllabus and pattern. Not affiliated with or endorsed by the National Testing Agency.",
    scoreNote: "Percent correct. The real General Aptitude Test has 50 compulsory questions: each right answer earns 5 marks and each wrong one loses 1, out of 250, and unanswered questions score zero. Results from different shifts are turned into NTA scores, and each university sets its own merit lists and cut-offs, so treat your goal as a readiness line.",
  },
};
