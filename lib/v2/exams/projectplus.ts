import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Project+ (exam PK0-005, V5, launched November 8, 2022; no PK0-006
// or retirement date announced in November 2026). Built to the PK0-005
// exam objectives, document version 7.0: Project Management Concepts 33%,
// Project Life Cycle Phases 30%, Tools and Documentation 19%, Basics of IT
// and Governance 18%. CompTIA's certification page gives a maximum of 90
// questions (the objectives PDF says 95), multiple choice and performance
// based, in 90 minutes, and a passing score of 710 on a scale of 100 to 900.
// Each practice test is 90 questions in 90 minutes with free navigation.
// Per test: methodologies 7, change, risk and issues 9, scheduling and
// quality 7, communication, teams and procurement 7 (30); discovery,
// initiation and planning 14, execution and closing 13 (27); tools and
// charts 17; IT, security and governance 16.
// Sources: tools/next100/projectplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "ppConcepts", "ppChange", "ppSchedule", "ppPeople",
  "ppInitPlan", "ppExecClose",
  "ppTools",
  "ppGovernance",
];

export const PROJECTPLUS: ExamV2Config = {
  id: "projectplus",
  slug: "/comptia-project-plus",
  landingPath: "/comptia-project-plus-practice-test",
  name: "CompTIA Project+ Practice Test",
  shortName: "Project+",
  fullName: "CompTIA Project+ (PK0-005) exam",
  tagline: "90 questions in 90 minutes on methodologies, change, risk and scheduling, the project life cycle, tools and charts, and IT governance, weighted to the Project+ PK0-005 objectives.",
  icon: "target",
  theme: { brand: "250 45% 14%", brandDark: "250 45% 10%", brandLight: "250 45% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "projectplus",
      name: "CompTIA Project+",
      shortName: "Project+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the four Project+ domains in 90 minutes. Flag questions and come back to them.",
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ppConcepts: "Projects and Methodologies",
    ppChange: "Change, Risk and Issues",
    ppSchedule: "Scheduling and Quality",
    ppPeople: "Communication, Teams and Procurement",
    ppInitPlan: "Discovery, Initiation and Planning",
    ppExecClose: "Execution and Closing",
    ppTools: "Tools, Charts and Documentation",
    ppGovernance: "IT Basics and Governance",
  },
  drills: [
    { key: "concepts", name: "Projects and Methodologies", section: "projectplus", domains: ["ppConcepts"], blurb: "Projects, programs and portfolios, Waterfall, Scrum, Kanban, XP, SAFe, PRINCE2 and DevOps, and choosing Agile or Waterfall." },
    { key: "change", name: "Change, Risk and Issues", section: "projectplus", domains: ["ppChange"], blurb: "The change control process, scope creep, risk responses for threats and opportunities, risk analysis and issue management." },
    { key: "schedule", name: "Scheduling and Quality", section: "projectplus", domains: ["ppSchedule"], blurb: "Dependencies, task relationships, critical path, story points, reserves, cost and schedule variance, SLAs and testing types." },
    { key: "people", name: "Communication, Teams and Procurement", section: "projectplus", domains: ["ppPeople"], blurb: "Communication methods, meetings and roles, organizational structures, team stages, project roles, RFQs and contract types." },
    { key: "initplan", name: "Initiation and Planning", section: "projectplus", domains: ["ppInitPlan"], blurb: "Business case, CapEx and OpEx, ROI, the charter, stakeholders, RACI, kickoff, scope, WBS and the planning documents." },
    { key: "execclose", name: "Execution and Closing", section: "projectplus", domains: ["ppExecClose"], blurb: "Organizational change, vendor management, reporting, conflict approaches, phase gates and every closing activity." },
    { key: "tools", name: "Tools, Charts and Documentation", section: "projectplus", domains: ["ppTools"], blurb: "Gantt, milestone, network and PERT charts, logs and registers, collaboration tools, and Pareto, control, burndown and velocity charts." },
    { key: "governance", name: "IT Basics and Governance", section: "projectplus", domains: ["ppGovernance"], blurb: "ESG, physical, operational and digital security, PII and PHI, cloud models, enterprise systems and operational change control." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 710",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the CompTIA Project+ PK0-005 exam objectives. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA sets the passing score at 710 on a scale of 100 to 900, a scaled score that is not a fixed percent; aim for 80 percent here.",
  },
};
