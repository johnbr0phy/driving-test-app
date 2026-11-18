import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Salesforce Certified Platform App Builder, exam guide refreshed August 21,
// 2026 (questions align to the Summer '26 release): 60 scored multiple-choice
// and multiple-select questions (plus up to 5 unscored) in 105 minutes, 73% to
// pass. Weighted to the guide: Salesforce Fundamentals 18%, Data Modeling and
// Management 20%, Business Logic and Process Automation 32%, User Interface
// 17%, App Deployment 13%. Sources: tools/build-run-2026-11-18/sfappbuilder/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "sfappFundamentals", "sfappSecurity", "sfappDataModel", "sfappDataMgmt",
  "sfappFormulas", "sfappFlow", "sfappUI", "sfappDeploy",
];

export const SFAPPBUILDER: ExamV2Config = {
  id: "sfappbuilder",
  slug: "/salesforce-app-builder",
  landingPath: "/salesforce-platform-app-builder-practice-test",
  name: "Salesforce Platform App Builder Practice Test",
  shortName: "App Builder",
  fullName: "Salesforce Certified Platform App Builder exam",
  tagline: "60 questions in 105 minutes on data models, Flow, security, Lightning pages and deployment, like the real exam.",
  icon: "cloud",
  theme: { brand: "278 80% 40%", brandDark: "278 80% 31%", brandLight: "278 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pab",
      name: "Platform App Builder",
      shortName: "App Builder",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(105) }],
      directions: "60 questions across the five exam guide sections in 105 minutes. Some questions ask you to choose two. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    sfappFundamentals: "Declarative Limits and Reports",
    sfappSecurity: "Object, Record and Field Access",
    sfappDataModel: "Relationships and Field Types",
    sfappDataMgmt: "Import, Export and External Data",
    sfappFormulas: "Formulas, Roll-Ups and Validation",
    sfappFlow: "Flow, Approvals and Agentforce",
    sfappUI: "Lightning Pages, Actions and Mobile",
    sfappDeploy: "Sandboxes, Change Sets and Packages",
  },
  drills: [
    { key: "fundamentals", name: "Declarative Limits and Reports", section: "pab", domains: ["sfappFundamentals"], blurb: "Where clicks end and code begins, AgentExchange, core CRM objects, report formats, cross filters, report types and dashboards." },
    { key: "security", name: "Object, Record and Field Access", section: "pab", domains: ["sfappSecurity"], blurb: "Org-wide defaults, roles, sharing rules, teams, queues, restriction rules, profiles, permission sets and field-level security." },
    { key: "datamodel", name: "Relationships and Field Types", section: "pab", domains: ["sfappDataModel"], blurb: "Lookup, master-detail and junction objects, delete and reparenting options, picklists and choosing the right field type." },
    { key: "datamgmt", name: "Import, Export and External Data", section: "pab", domains: ["sfappDataMgmt"], blurb: "Data Loader and the Data Import Wizard, exports, duplicate rules, Salesforce Connect, external and indirect lookups, Schema Builder." },
    { key: "formulas", name: "Formulas, Roll-Ups and Validation", section: "pab", domains: ["sfappFormulas"], blurb: "Formula functions, cross-object formulas, roll-up summary fields and validation rules." },
    { key: "flow", name: "Flow, Approvals and Agentforce", section: "pab", domains: ["sfappFlow"], blurb: "Record-triggered paths, screen and scheduled flows, flow elements and resources, approval processes, case rules and Agentforce actions." },
    { key: "ui", name: "Lightning Pages, Actions and Mobile", section: "pab", domains: ["sfappUI"], blurb: "Lightning App Builder, Dynamic Forms and Actions, compact layouts, actions, custom buttons, tabs and mobile layouts." },
    { key: "deploy", name: "Sandboxes, Change Sets and Packages", section: "pab", domains: ["sfappDeploy"], blurb: "Sandbox types and refreshes, change sets, unmanaged, managed and unlocked packages, and the application lifecycle." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 73, 80, 85, 90],
  goalNotes: {
    70: "Below the pass line",
    73: "The real pass mark",
    80: "A safe margin over 73%",
    85: "Strong: ready to book",
    90: "Top band",
  },
  testLength: "1 hr 45 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your App Builder exam.",
    ],
    sourceLine: "Weighted to the Salesforce Certified Platform App Builder exam guide (Summer '26). Not affiliated with Salesforce.",
    scoreNote: "Percent correct. The real exam needs 73% of its 60 scored questions; aim for 80 percent here.",
  },
};
