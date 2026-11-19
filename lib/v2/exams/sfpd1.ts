import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Salesforce Certified Platform Developer (formerly Platform Developer I, PDI;
// exam code Plat-Dev-201). Guides quoting the exam guide (the Help article does
// not render for automated fetchers): 60 scored multiple-choice and
// multiple-select questions plus up to 5 unscored, 105 minutes, 68% to pass.
// Weighted to the Trailhead cert prep outline: Developer Fundamentals 27%,
// Process Automation and Logic 28%, User Interface 25%, Testing, Debugging,
// and Deployment 20%. Sources: tools/build-run-2026-11-18/sfpd1/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "sfpdPlatform", "sfpdDataModel", "sfpdApex", "sfpdQueries", "sfpdTriggers",
  "sfpdLwc", "sfpdUiSecurity", "sfpdTesting", "sfpdDeploy",
];

export const SFPD1: ExamV2Config = {
  id: "sfpd1",
  slug: "/salesforce-platform-developer",
  landingPath: "/salesforce-platform-developer-practice-test",
  name: "Salesforce Platform Developer Practice Test",
  shortName: "Platform Developer",
  fullName: "Salesforce Certified Platform Developer exam (formerly Platform Developer I)",
  tagline: "60 questions in 105 minutes, with Apex, SOQL and LWC code to read, like the real exam.",
  icon: "server",
  theme: { brand: "266 100% 32%", brandDark: "266 100% 25%", brandLight: "266 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pd",
      name: "Platform Developer",
      shortName: "Platform Developer",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(105) }],
      directions: "60 questions across the four exam sections in 105 minutes. Some ask you to choose two. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    sfpdPlatform: "Platform, Limits and Declarative Tools",
    sfpdDataModel: "Data Model and Relationships",
    sfpdApex: "Apex Basics and Automation",
    sfpdQueries: "SOQL, SOSL and DML",
    sfpdTriggers: "Triggers and Async Apex",
    sfpdLwc: "Lightning Web Components",
    sfpdUiSecurity: "Security and Visualforce",
    sfpdTesting: "Testing",
    sfpdDeploy: "Debugging and Deployment",
  },
  drills: [
    { key: "platform", name: "Platform and Limits", section: "pd", domains: ["sfpdPlatform"], blurb: "Multitenancy and governor limits, MVC and the Lightning Component Framework, formula and roll-up summary fields, when to use code, and Agentforce Vibes." },
    { key: "datamodel", name: "Data Model", section: "pd", domains: ["sfpdDataModel"], blurb: "Master-detail and lookup relationships, junction objects, external IDs and upsert, relationship names in SOQL and schema describe calls." },
    { key: "apex", name: "Apex Basics", section: "pd", domains: ["sfpdApex"], blurb: "Flow automation and invocable methods, variables, constants and collections, control flow, classes and exception handling." },
    { key: "queries", name: "SOQL, SOSL and DML", section: "pd", domains: ["sfpdQueries"], blurb: "Queries and searches and what they return, bind variables, DML and partial success, savepoints, locking and the limits on all of them." },
    { key: "triggers", name: "Triggers and Async Apex", section: "pd", domains: ["sfpdTriggers"], blurb: "Trigger context variables, the save order of execution, recursion and cascading, and future, Queueable, Batch and Scheduled Apex." },
    { key: "lwc", name: "Lightning Web Components", section: "pd", domains: ["sfpdLwc"], blurb: "Decorators and reactivity, events, the wire service, Lightning Data Service, calling Apex and Apex agent actions." },
    { key: "security", name: "Security and Visualforce", section: "pd", domains: ["sfpdUiSecurity"], blurb: "SOQL injection and XSS, sharing keywords, user mode and stripInaccessible, and Visualforce controllers, extensions and view state." },
    { key: "testing", name: "Testing", section: "pd", domains: ["sfpdTesting"], blurb: "Coverage rules, startTest and stopTest, test data and @TestSetup, callout mocks, runAs and testing asynchronous Apex." },
    { key: "deploy", name: "Debugging and Deployment", section: "pd", domains: ["sfpdDeploy"], blurb: "Sandboxes and scratch orgs, the Salesforce CLI and DX project files, test levels, change sets, debug logs and the Developer Console." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [68, 75, 80, 85, 90],
  goalNotes: {
    68: "The real pass mark",
    75: "Just over the line",
    80: "A safe margin over 68%",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "1 hr 45 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Platform Developer exam.",
    ],
    sourceLine: "Weighted to the Platform Developer exam's four sections as Salesforce's Trailhead cert prep lists them. Not affiliated with Salesforce.",
    scoreNote: "Percent correct. Guides quoting Salesforce's exam guide put the passing score at 68%; aim for 80 percent here before you book.",
  },
};
