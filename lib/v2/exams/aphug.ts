import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP Human Geography (College Board). AP Human Geography Course and Exam
// Description (effective fall 2020, with the clarifications implemented as
// of June 2026), the AP Central exam page and the 2026 course overview
// (checked 1 November 2026): a fully digital exam of 2 hours 15 minutes in
// the Bluebook app. Section I is 60 multiple-choice questions in 60
// minutes, 50% of the score, "both individual and set-based questions";
// about 30 to 40% of them reference a stimulus (maps, tables, charts,
// graphs, images, infographics or landscapes), roughly half quantitative
// and half qualitative. The sample questions have five choices, (A) to (E).
// Section II is 3 free-response questions in 75 minutes (50%). Unit
// weights on the multiple-choice section: Unit 1 8-10%, Units 2 to 7
// 12-17% each.
// Modelled: Section I only, at full length and pace (60 in 60 minutes),
// one module per test, in unit order. Per test: Unit 1 6 (10%), Units 2 to
// 7 9 each (15%); one stimulus set of 3 per unit, so 21 of 60 items (35%)
// use a stimulus: hypothetical data tables, and maps, landscapes and a
// population pyramid described in words (images are not modelled). Five
// answer choices. Percent score; the College Board converts a weighted
// composite to 1 to 5 each year and publishes no fixed cut.
// Sources: tools/next100/aphug/sources.md.
export const APHUG: ExamV2Config = {
  id: "aphug",
  slug: "/ap-human-geography",
  landingPath: "/ap-human-geography-practice-test",
  icon: "graduation",
  name: "AP Human Geography Practice Test",
  shortName: "AP Human Geography",
  fullName: "AP Human Geography Exam",
  tagline: "The AP Human Geography multiple-choice section: 60 questions in 60 minutes across all seven units.",
  theme: { brand: "57 25% 34%", brandDark: "57 25% 24%", brandLight: "57 25% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 60, timeLimit: 60 * 60 }],
      directions:
        "60 multiple-choice questions in 60 minutes, like Section I of the AP Human Geography Exam. Most questions stand alone; some come in sets of three that share a stimulus shown beside them: a data table, or a map, landscape or population pyramid described in words. The data are hypothetical, made up for practice. Each question has five choices and one best answer, and there is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(60),
      domains: ["aphugU1", "aphugU2", "aphugU3", "aphugU4", "aphugU5", "aphugU6", "aphugU7"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    aphugU1: "Unit 1: Thinking Geographically",
    aphugU2: "Unit 2: Population and Migration",
    aphugU3: "Unit 3: Cultural Patterns and Processes",
    aphugU4: "Unit 4: Political Patterns and Processes",
    aphugU5: "Unit 5: Agriculture and Rural Land Use",
    aphugU6: "Unit 6: Cities and Urban Land Use",
    aphugU7: "Unit 7: Industrial and Economic Development",
  },
  drills: [
    { key: "u1", name: "Unit 1: Thinking Geographically", section: "mcq", domains: ["aphugU1"], blurb: "Maps and projections, geographic data, spatial concepts, human-environment interaction, scales of analysis and regions." },
    { key: "u2", name: "Unit 2: Population and Migration", section: "mcq", domains: ["aphugU2"], blurb: "Density, the demographic transition, population pyramids and policies, Malthus, and the causes and types of migration." },
    { key: "u3", name: "Unit 3: Cultural Patterns and Processes", section: "mcq", domains: ["aphugU3"], blurb: "Cultural landscapes, types of diffusion, languages, religions, and the effects of globalization on culture." },
    { key: "u4", name: "Unit 4: Political Patterns and Processes", section: "mcq", domains: ["aphugU4"], blurb: "States and nations, boundaries, forms of government, redistricting, devolution and supranationalism." },
    { key: "u5", name: "Unit 5: Agriculture and Rural Land Use", section: "mcq", domains: ["aphugU5"], blurb: "Agricultural hearths and revolutions, farming systems, von Thunen, the global food system and its consequences." },
    { key: "u6", name: "Unit 6: Cities and Urban Land Use", section: "mcq", domains: ["aphugU6"], blurb: "Urbanization, the urban hierarchy, city models, density and land use, and urban sustainability." },
    { key: "u7", name: "Unit 7: Industrial and Economic Development", section: "mcq", domains: ["aphugU7"], blurb: "Economic sectors, measures of development, theories of development, trade and industrial location." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 65, 70, 75, 80, 85],
  goalNotes: {
    55: "A starting target",
    60: "Building a solid base",
    65: "Getting there",
    70: "A strong multiple-choice section",
    75: "Strong with room to spare",
    80: "Aiming high",
    85: "Aiming for the top score",
  },
  testLength: "60 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions written to the College Board AP Human Geography course framework. AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 50% of the real AP score. The three free-response questions (the other 50%) are not included, and maps and images are described in words. The College Board combines both sections into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
