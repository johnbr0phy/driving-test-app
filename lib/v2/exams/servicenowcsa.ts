import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// January 2026 owner blueprint, checked 2026-11-17.
// 7/10/20/20/30/13% rounded to 4/6/12/12/18/8 questions per practice test.
const domains = ["servicenowcsaNavigation", "servicenowcsaConfiguration", "servicenowcsaCollaboration", "servicenowcsaAutomation", "servicenowcsaDatabase", "servicenowcsaMigration"];
export const SERVICENOWCSA: ExamV2Config = {
  id: "servicenowcsa", slug: "/servicenow-csa", landingPath: "/servicenow-csa-practice-test",
  name: "ServiceNow CSA Practice Test", shortName: "ServiceNow CSA",
  fullName: "ServiceNow Certified System Administrator (CSA)",
  tagline: "Practice platform administration across six domains with original scenarios and explanations.",
  icon: "server", theme: { brand: "152 15% 38%", brandDark: "152 15% 29%", brandLight: "152 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "servicenowcsa", name: "ServiceNow administration", shortName: "CSA",
    modules: [{ module: 1, questionCount: 60, timeLimit: 90 * 60 }],
    directions: "60 original questions in 90 minutes. Single-answer questions have one correct choice. Multiple-select questions state how many choices to select; all correct choices and no incorrect choices are required for credit. This is selected conceptual and applied administration practice, not a hands-on platform assessment or exhaustive feature coverage. The official cut score is not public; practice percentages do not predict an official result.",
    scale: percentScale(60), domains }],
  tests: [{ number: 1, name: "Practice Test 1" }, { number: 2, name: "Practice Test 2", heldOut: true }],
  domainLabels: {
    servicenowcsaNavigation: "Platform Overview and Navigation", servicenowcsaConfiguration: "Instance Configuration",
    servicenowcsaCollaboration: "Configuring Applications for Collaboration", servicenowcsaAutomation: "Self Service and Automation",
    servicenowcsaDatabase: "Database Management and Platform Security", servicenowcsaMigration: "Data Migration and Integration",
  },
  drills: [
    { key: "navigation", name: "Platform Overview and Navigation", section: "servicenowcsa", domains: ["servicenowcsaNavigation"], blurb: "Navigation, views, preferences and instance context." },
    { key: "configuration", name: "Instance Configuration", section: "servicenowcsa", domains: ["servicenowcsaConfiguration"], blurb: "Applications, plugins, access context and configuration decisions." },
    { key: "collaboration", name: "Applications for Collaboration", section: "servicenowcsa", domains: ["servicenowcsaCollaboration"], blurb: "Lists, forms, filters, visualizations and notifications." },
    { key: "automation", name: "Self Service and Automation", section: "servicenowcsa", domains: ["servicenowcsaAutomation"], blurb: "Knowledge, catalog, workflows and Virtual Agent." },
    { key: "database", name: "Database and Platform Security", section: "servicenowcsa", domains: ["servicenowcsaDatabase"], blurb: "Tables, references, imports, access controls and CMDB relationships." },
    { key: "migration", name: "Data Migration and Integration", section: "servicenowcsa", domains: ["servicenowcsaMigration"], blurb: "Client and server behavior, configuration migration and validation." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80, goalChoices: [70, 75, 80, 85, 90],
  goalNotes: { 70: "Practice target", 75: "Practice target", 80: "Practice target", 85: "Practice target", 90: "Practice target" },
  testLength: "90 minutes",
  copy: {
    heroSubs: ["Six drills and two practice tests. Start with platform navigation.", "Work through the domain drills and explanations.", "Use Practice Test 1 to check your understanding.", "Review missed concepts before Practice Test 2.", "Practice goals complete. Continue with the official outline and hands-on platform preparation."],
    sourceLine: "Original questions following the January 2026 CSA blueprint. Selected conceptual and applied administration; not exhaustive or hands-on platform assessment. Not affiliated with ServiceNow.",
    scoreNote: "Percentage correct for study only. ServiceNow does not publish the official cut score. The 80% practice goal is editorial and does not predict certification results. Multiple-select items receive no partial credit.",
  },
};
