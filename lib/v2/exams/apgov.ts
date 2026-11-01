import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP United States Government and Politics (College Board). AP U.S.
// Government and Politics Course and Exam Description, effective fall 2026,
// its fall 2026 clarifications, and the AP Central exam page (checked
// 1 November 2026): a fully digital exam of 3 hours. Section I is 55
// multiple-choice questions in 80 minutes, 50% of the score: about 30
// individual questions with no stimulus, five quantitative analysis sets of
// two or three questions (tables, charts, graphs, maps, infographics), two
// text-based sets of three or four (one on a foundational document, one on a
// primary or secondary text) and three visual sets of two (a map, cartoon or
// infographic); four answer choices (A to D). Section II is four
// free-response questions in 100 minutes (50%). Unit weights on the
// multiple choice: Unit 1 15-22%, Unit 2 25-36%, Unit 3 13-18%, Unit 4
// 10-15%, Unit 5 20-27%. Required: 13 foundational documents (four added
// for 2026-27: Federalist No. 39, the Emancipation Proclamation, the
// Gettysburg Address and Adam Smith's The Wealth of Nations) and 14
// Supreme Court cases.
// Modelled: Section I only, at full length and pace (55 in 80 minutes), one
// module per test, in unit order with each set kept together. Per test:
// Unit 1 10, Unit 2 17 (Congress and the presidency 9, courts and the
// bureaucracy 8), Unit 3 9, Unit 4 7, Unit 5 12 (voting and parties 6,
// campaigns, groups and media 6); 30 individual questions, five data sets
// (12 questions), two text sets (7) and three visual sets (6). Data tables
// are hypothetical, labelled so; visuals are described in words; document
// excerpts are public-domain texts, lightly adapted. Percent score; the
// College Board converts a weighted composite to 1 to 5 each year and
// publishes no fixed cut. Sources: tools/next100/apgov/sources.md.
export const APGOV: ExamV2Config = {
  id: "apgov",
  slug: "/ap-us-government",
  landingPath: "/ap-us-government-practice-test",
  icon: "graduation",
  name: "AP US Government Practice Test",
  shortName: "AP US Government",
  fullName: "AP United States Government and Politics Exam",
  tagline: "The AP U.S. Government and Politics multiple-choice section: 55 questions in 80 minutes across all five units.",
  theme: { brand: "5 30% 30%", brandDark: "5 30% 24%", brandLight: "5 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 55, timeLimit: 80 * 60 }],
      directions:
        "55 multiple-choice questions in 80 minutes, like Section I of the AP U.S. Government and Politics Exam. Most questions stand alone; the rest come in sets of two to four that share a source shown beside them: a data table, an excerpt from a foundational document, a practice text, or a map, cartoon or infographic described in words. Data tables are hypothetical, made for practice. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(55),
      domains: ["apgovFoundations", "apgovCongress", "apgovCourts", "apgovRights", "apgovIdeology", "apgovVoting", "apgovCampaigns"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    apgovFoundations: "Unit 1: Foundations of American Democracy",
    apgovCongress: "Unit 2: Congress and the Presidency",
    apgovCourts: "Unit 2: Courts and the Bureaucracy",
    apgovRights: "Unit 3: Civil Liberties and Civil Rights",
    apgovIdeology: "Unit 4: Ideologies and Beliefs",
    apgovVoting: "Unit 5: Voting and Parties",
    apgovCampaigns: "Unit 5: Campaigns, Groups and Media",
  },
  drills: [
    { key: "foundations", name: "Foundations of Democracy", section: "mcq", domains: ["apgovFoundations"], blurb: "Models of democracy, the Articles and the Constitution, Federalist and Anti-Federalist ideas, and federalism." },
    { key: "congress", name: "Congress and the Presidency", section: "mcq", domains: ["apgovCongress"], blurb: "How Congress works, models of representation, and the president's formal and informal powers." },
    { key: "courts", name: "Courts and the Bureaucracy", section: "mcq", domains: ["apgovCourts"], blurb: "Judicial review, how the Supreme Court decides, checks on the courts, and the federal bureaucracy." },
    { key: "rights", name: "Civil Liberties and Rights", section: "mcq", domains: ["apgovRights"], blurb: "The Bill of Rights, selective incorporation, due process, equal protection and the required cases." },
    { key: "ideology", name: "Ideologies and Beliefs", section: "mcq", domains: ["apgovIdeology"], blurb: "Core values, political socialization, measuring public opinion, and ideology in economic and social policy." },
    { key: "voting", name: "Voting and Parties", section: "mcq", domains: ["apgovVoting"], blurb: "Voting rights and turnout, models of voting, political parties, third parties and nominations." },
    { key: "campaigns", name: "Campaigns, Groups and Media", section: "mcq", domains: ["apgovCampaigns"], blurb: "Elections and campaign finance, interest groups, and the changing media." },
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
  testLength: "80 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions written to the College Board AP U.S. Government and Politics course framework. AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 50% of the real AP score. The four free-response questions (concept application, quantitative analysis, SCOTUS comparison and the argument essay, 50% together) are not included. The College Board combines both sections into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
