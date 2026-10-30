import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Scrum.org Professional Scrum Master I (PSM I), as described by Scrum.org in
// October 2026: 80 questions in 60 minutes, multiple choice, multiple answer
// and true/false, 85% to pass, English, online, based on the Scrum Guide.
// Every item here is original and written from the Scrum Guide (November 2020
// edition, by Ken Schwaber and Jeff Sutherland, CC BY-SA 4.0), not from
// Scrum.org's Open Assessments. True/false items are single-answer items with
// two options. Practice tests are full length at the real pace, 80 items in
// 60 minutes. Scrum.org publishes no domain weighting, so the six drills group
// the Scrum Guide's sections (per test 12/14/18/14/10/12; 40 drill-only items).
// Sources: tools/psm/sources.md.
const minutes = (n: number) => n * 60;

export const PSM: ExamV2Config = {
  id: "psm",
  slug: "/psm-1",
  landingPath: "/psm-1-practice-test",
  name: "PSM I Practice Test",
  shortName: "PSM I",
  fullName: "Professional Scrum Master I (PSM I) assessment",
  tagline: "80 questions in 60 minutes on the 2020 Scrum Guide, with multiple answer and true/false items like the real PSM I.",
  icon: "badge",
  theme: { brand: "264 90% 43%", brandDark: "264 90% 34%", brandLight: "264 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "psm",
      name: "PSM I practice assessment",
      shortName: "PSM I",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(60) }],
      directions: "80 questions in 60 minutes, the real assessment's pace. Questions are multiple choice, multiple answer (the question says how many to choose) and true or false, all based on the 2020 Scrum Guide. Flag questions and come back to them.",
      scale: percentScale(80),
      domains: ["psmTheory", "psmTeam", "psmEvents", "psmArtifacts", "psmValue", "psmFacilitation"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    psmTheory: "Scrum Theory, Pillars and Values",
    psmTeam: "The Scrum Team and Accountabilities",
    psmEvents: "Scrum Events and Timeboxes",
    psmArtifacts: "Artifacts and Commitments",
    psmValue: "Product Value, Backlog and Stakeholders",
    psmFacilitation: "Scrum Master Service and Facilitation",
  },
  drills: [
    { key: "theory", name: "Theory, Pillars and Values", section: "psm", domains: ["psmTheory"], blurb: "Empiricism, lean thinking, transparency, inspection, adaptation and the five values." },
    { key: "team", name: "The Scrum Team", section: "psm", domains: ["psmTeam"], blurb: "Product Owner, Scrum Master and Developers, self-management and team size." },
    { key: "events", name: "Events and Timeboxes", section: "psm", domains: ["psmEvents"], blurb: "The Sprint, Sprint Planning, Daily Scrum, Sprint Review and Retrospective." },
    { key: "artifacts", name: "Artifacts and Commitments", section: "psm", domains: ["psmArtifacts"], blurb: "Product Goal, Sprint Goal, Definition of Done, backlogs and the Increment." },
    { key: "value", name: "Value and Stakeholders", section: "psm", domains: ["psmValue"], blurb: "Ordering the backlog, forecasting, releasing value and working with stakeholders." },
    { key: "facilitation", name: "Serving as Scrum Master", section: "psm", domains: ["psmFacilitation"], blurb: "Coaching, removing impediments and serving the team, Product Owner and organization." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 90,
  goalChoices: [80, 85, 90, 95],
  goalNotes: {
    80: "Below the 85% pass mark",
    85: "The PSM I pass mark",
    90: "A safe margin over the pass mark",
    95: "Ready to book with confidence",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each part of the Scrum Guide, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your PSM I assessment.",
    ],
    sourceLine: "Original questions written from the 2020 Scrum Guide. Not affiliated with or endorsed by Scrum.org.",
    scoreNote: "Percent correct. The real PSM I needs 85 percent (68 of 80). Here every item is all or nothing: a multiple answer item counts only when every choice is right.",
  },
};
