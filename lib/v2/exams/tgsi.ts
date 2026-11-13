import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Telangana Police Sub-Inspector (SI) Preliminary Written Test, conducted by
// the Telangana State Level Police Recruitment Board (TSLPRB, site
// www.tgprb.in; often called TGLPRB / TGPRB since the state's code changed
// to TG). Pattern from the board's own 2026 notification, Rc. No. 225 /
// Rect. / Rect.1 / 2026 dated 29 July 2026 (275 SCT SI and equivalent posts),
// para 16(A) and Annexure II, read 2026-11-13: one 3-hour paper of 200
// objective questions for 200 marks, Arithmetic and Test of Reasoning /
// Mental Ability 100 and General Studies 100; OMR sheet; for each question
// full marks for the one right bubble, zero for a blank, and 20% of the
// question's marks deducted otherwise; to qualify 30% for OCs (with EWS), 25%
// for BCs, 20% for SCs / STs / Ex-Servicemen; questions in English-Telugu and
// English-Urdu, the English version final. The board's press note of 17
// September 2026 puts the SI PWT tentatively on 29 November 2026. Qualifiers
// go on to PMT / PET and a Final Written Examination of four papers (not
// modelled).
// Modelled at half length and the real pace: 100 questions in 90 minutes,
// Part A 50 (arithmetic 25, reasoning 25) then Part B 50 (10 each for the five
// static General Studies areas). "Current events of national and
// international importance" is not modelled (static facts only), nor are
// non-verbal figure and visual memory items. English only.
// Sources: tools/next100/tgsi/sources.md.
const minutes = (n: number) => n * 60;

export const TGSI: ExamV2Config = {
  id: "tgsi",
  slug: "/telangana-police-si",
  landingPath: "/telangana-police-si-practice-test",
  name: "Telangana Police SI Practice Test",
  shortName: "TG Police SI",
  fullName: "Telangana Police SI Preliminary Written Test (TSLPRB)",
  tagline: "Telangana Police SI mock tests on the TSLPRB Preliminary Written Test syllabus: Arithmetic, Reasoning and Mental Ability, and General Studies with the Telangana Movement.",
  icon: "siren",
  theme: { brand: "114 60% 24%", brandDark: "114 60% 16%", brandLight: "114 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paper",
      name: "Preliminary Written Test",
      shortName: "PWT",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(90) }],
      directions: "100 questions in 90 minutes, half the real paper at the same pace, in its two parts: Arithmetic and Test of Reasoning / Mental Ability (1 to 50), then General Studies (51 to 100). You can move between questions and flag them. The real paper deducts a fifth of a mark for each wrong answer; this practice test simply counts your right answers.",
      scale: percentScale(100),
      domains: ["tgsiArithA", "tgsiArithB", "tgsiVerbal", "tgsiLogical", "tgsiScience", "tgsiHistory", "tgsiGeography", "tgsiPolity", "tgsiTelangana"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    tgsiArithA: "Arithmetic: Numbers, Percentages, Interest and Ratio",
    tgsiArithB: "Arithmetic: Work, Distance, Clocks, Calendars and Mensuration",
    tgsiVerbal: "Reasoning: Analogies, Odd One Out, Series and Coding",
    tgsiLogical: "Reasoning: Problem Solving, Judgment and Spatial Ability",
    tgsiScience: "General Science and Environment",
    tgsiHistory: "History of India and the National Movement",
    tgsiGeography: "Geography of India and Telangana",
    tgsiPolity: "Indian Polity and Economy",
    tgsiTelangana: "Telangana Movement and State Formation",
  },
  drills: [
    { key: "numbers", name: "Numbers, Percentages and Interest", section: "paper", domains: ["tgsiArithA"], blurb: "Number system, percentage, profit and loss, simple and compound interest, ratio, partnership and averages." },
    { key: "work", name: "Work, Distance and Mensuration", section: "paper", domains: ["tgsiArithB"], blurb: "Time and work, work and wages, trains and boats, clocks, calendars and areas and volumes." },
    { key: "verbal", name: "Analogies, Series and Coding", section: "paper", domains: ["tgsiVerbal"], blurb: "Word, number and letter analogies, odd one out, series and coding-decoding." },
    { key: "logical", name: "Problem Solving and Judgment", section: "paper", domains: ["tgsiLogical"], blurb: "Blood relations, directions, ranking, syllogisms, arrangements, assumptions, police judgment, dice and mirrors." },
    { key: "science", name: "General Science", section: "paper", domains: ["tgsiScience"], blurb: "Everyday physics, chemistry and biology, health and the environment." },
    { key: "history", name: "History and National Movement", section: "paper", domains: ["tgsiHistory"], blurb: "Ancient, medieval and modern India, the freedom struggle and Telangana's early rulers." },
    { key: "geography", name: "Geography of India and Telangana", section: "paper", domains: ["tgsiGeography"], blurb: "Earth, climate, rivers and soils, India's states and borders, and Telangana's place on the map." },
    { key: "polity", name: "Polity and Economy", section: "paper", domains: ["tgsiPolity"], blurb: "The Constitution, Parliament, panchayats, planning, rural development and economic reforms." },
    { key: "telangana", name: "Telangana Movement", section: "paper", domains: ["tgsiTelangana"], blurb: "From Hyderabad State and the Gentlemen's Agreement to the Mulki Rules, the 1969 agitation and the 2014 Act." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A starting target",
    60: "A solid score",
    70: "A competitive score",
    80: "A strong, safe score",
    90: "An excellent score",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full mock test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the Preliminary Written Test.",
    ],
    sourceLine: "Original practice questions on the TSLPRB SI Preliminary Written Test syllabus (Annexure II of the 2026 notification). Not affiliated with or endorsed by the Telangana State Level Police Recruitment Board or Telangana Police.",
    scoreNote: "Percent correct. The real Preliminary Written Test has 200 questions of one mark each in 3 hours, and a fifth of a mark (20% of the question's marks) is deducted for each wrong answer or for marking more than one bubble; a blank scores zero. To qualify you need 30% if you are OC or EWS, 25% if BC and 20% if SC, ST or an Ex-Serviceman. Only qualifiers go on to the physical tests and the Final Written Examination, so aim well above the minimum. With four options and a one-fifth penalty, a question where you can rule out even one option is worth answering.",
  },
};
