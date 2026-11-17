import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// PRINCE2 7 Foundation (PeopleCert): 60 multiple-choice questions of one mark
// in 60 minutes, closed book, no negative marking, 36 marks (60%) to pass,
// Bloom's levels 1 and 2. PRINCE2 7 (launched September 2023) is still the
// current edition in November 2026; no newer edition is announced.
// Weighted to the PRINCE2 7 Foundation syllabus exam specification: key
// concepts 3% (2), principles 8% (5), people 14% (8), practices 60% (36:
// business case 5, organizing 6, plans 5, quality 5, risk 5, issues 5,
// progress 5, Tigertest's split), processes 15% (9). Practice tests are full
// length at the real pace. 7 drills + 2 tests = 9 steps.
// Sources: tools/next100/prince2/sources.md.
const minutes = (n: number) => n * 60;

export const PRINCE2: ExamV2Config = {
  id: "prince2",
  slug: "/prince2-foundation",
  landingPath: "/prince2-foundation-practice-test",
  name: "PRINCE2 7 Foundation Practice Test",
  shortName: "PRINCE2",
  fullName: "PRINCE2 7 Foundation exam",
  tagline: "60 questions in 60 minutes with a 60 percent pass line, like the real PRINCE2 7 Foundation exam.",
  icon: "badge",
  theme: { brand: "262 35% 20%", brandDark: "262 35% 14%", brandLight: "262 35% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "prince2",
      name: "PRINCE2 7 Foundation",
      shortName: "PRINCE2",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(60) }],
      directions: "60 multiple-choice questions in 60 minutes, closed book, like the real exam. Each question has one correct answer and there is no negative marking. You need 36 correct (60 percent) to pass. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: [
        "p2Concepts", "p2Principles", "p2People",
        "p2BusinessCase", "p2Organizing", "p2Plans", "p2Quality", "p2Risk", "p2Issues", "p2Progress",
        "p2Processes",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    p2Concepts: "Key Concepts of Projects and PRINCE2",
    p2Principles: "Principles and Tailoring",
    p2People: "People",
    p2BusinessCase: "Business Case Practice",
    p2Organizing: "Organizing Practice",
    p2Plans: "Plans Practice",
    p2Quality: "Quality Practice",
    p2Risk: "Risk Practice",
    p2Issues: "Issues Practice",
    p2Progress: "Progress Practice",
    p2Processes: "Processes",
  },
  drills: [
    { key: "principles", name: "Principles and Tailoring", section: "prince2", domains: ["p2Concepts", "p2Principles"], blurb: "Projects and the five integrated elements, the seven principles and how the method is tailored." },
    { key: "people", name: "People", section: "prince2", domains: ["p2People"], blurb: "Ecosystems, stakeholders, change management, leadership, teams and communication." },
    { key: "organizing", name: "Business Case and Organizing", section: "prince2", domains: ["p2BusinessCase", "p2Organizing"], blurb: "Outputs, outcomes and benefits, the business case lifecycle, and the project roles." },
    { key: "plansQuality", name: "Plans and Quality", section: "prince2", domains: ["p2Plans", "p2Quality"], blurb: "Plan types, product-based planning, acceptance criteria and quality control." },
    { key: "riskIssues", name: "Risk and Issues", section: "prince2", domains: ["p2Risk", "p2Issues"], blurb: "Risk terms, responses and technique, issue types, baselines and change control." },
    { key: "progress", name: "Progress", section: "prince2", domains: ["p2Progress"], blurb: "Tolerances, event- and time-driven controls, reports, logs and exceptions." },
    { key: "processes", name: "Processes", section: "prince2", domains: ["p2Processes"], blurb: "The purpose, objectives and context of the seven PRINCE2 processes." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80],
  goalNotes: {
    60: "The pass mark: 36 of 60",
    65: "Passing with a little room",
    70: "A safe margin over 60",
    75: "Strong: ready to book",
    80: "Top band",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each syllabus area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your PRINCE2 7 Foundation exam.",
    ],
    sourceLine: "Original practice questions written to the PRINCE2 7 Foundation syllabus. PRINCE2 is a registered trademark of PeopleCert group. Not affiliated with or endorsed by PeopleCert.",
    scoreNote: "Percent correct. The real exam passes at 60 percent, 36 of 60, with no negative marking. Aim for 70 percent here so a few unfamiliar questions on the day do not matter.",
  },
};
