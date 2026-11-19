import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Power Platform Fundamentals (PL-900). Fundamentals exams run 45
// minutes; Microsoft publishes no question count for PL-900 and scores 1 to
// 1000 with 700 to pass (Microsoft Learn study guide and certification page).
// Weighted to the study guide, skills measured as of July 24, 2026: business
// value 5-10%, environment (Dataverse, administration) 20-25%, Power Apps
// 20-25%, Power Automate 20-25%, Copilot Studio agents 20-25% (4/11/11/12/12
// of 50 per test). The English exam updates on December 18, 2026
// (lib/examFreshness.json). Product names as of 2026 (Copilot Studio, Plans,
// code apps, the vibe experience, agent flows, Microsoft Agent 365).
const minutes = (n: number) => n * 60;

export const PL900: ExamV2Config = {
  id: "pl900",
  slug: "/pl-900",
  landingPath: "/pl-900-practice-test",
  name: "PL-900 Power Platform Fundamentals Practice Test",
  shortName: "PL-900",
  fullName: "Microsoft Power Platform Fundamentals (PL-900) exam",
  tagline: "50 questions in 45 minutes with yes/no statement sets, matching and choose-two items, like the real PL-900.",
  icon: "cpu",
  theme: { brand: "314 100% 30%", brandDark: "314 100% 22%", brandLight: "314 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pl900",
      name: "Power Platform Fundamentals PL-900",
      shortName: "PL-900",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions: "50 questions across the five PL-900 skill areas in 45 minutes. Some items are sets of yes/no statements or matching; multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["pl900Value", "pl900Dataverse", "pl900Admin", "pl900Apps", "pl900FlowsUse", "pl900FlowsBuild", "pl900AgentBuild", "pl900AgentManage"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pl900Value: "Business Value of Power Platform",
    pl900Dataverse: "Microsoft Dataverse",
    pl900Admin: "Administration and Governance",
    pl900Apps: "Power Apps Capabilities",
    pl900FlowsUse: "Power Automate Use Cases",
    pl900FlowsBuild: "Building Flows",
    pl900AgentBuild: "Building Agents in Copilot Studio",
    pl900AgentManage: "Managing Agents",
  },
  drills: [
    { key: "value", name: "Business Value", section: "pl900", domains: ["pl900Value"], blurb: "What Power Apps, Power Automate, Dataverse, connectors, Power Pages, Copilot features and Copilot Studio each bring to a business." },
    { key: "dataverse", name: "Dataverse", section: "pl900", domains: ["pl900Dataverse"], blurb: "Table types and ownership, columns and relationships, forms and views, business rules and Power Fx, and creating tables with Copilot." },
    { key: "admin", name: "Admin and Governance", section: "pl900", domains: ["pl900Admin"], blurb: "Environment types, security roles and privileges, data policies, managed environments, privacy and accessibility, monitoring and pipelines." },
    { key: "apps", name: "Power Apps", section: "pl900", domains: ["pl900Apps"], blurb: "Canvas, model-driven and code apps, Plans, building apps with Copilot and the vibe experience." },
    { key: "flowsUse", name: "Flow Use Cases", section: "pl900", domains: ["pl900FlowsUse"], blurb: "Cloud and desktop flows, approvals, Teams, Outlook, SharePoint and Forms scenarios, and invoice processing." },
    { key: "flowsBuild", name: "Building Flows", section: "pl900", domains: ["pl900FlowsBuild"], blurb: "Connector triggers and actions, and creating and editing cloud and desktop flows with Copilot." },
    { key: "agentBuild", name: "Building Agents", section: "pl900", domains: ["pl900AgentBuild"], blurb: "Agent use cases, topics and nodes, knowledge sources, tools such as MCP servers and agent flows, and publishing to channels." },
    { key: "agentManage", name: "Managing Agents", section: "pl900", domains: ["pl900AgentManage"], blurb: "Microsoft Agent 365, the Copilot Studio Monitor page and agent evaluations." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Close to the passing line",
    75: "Passing with a little room",
    80: "A safe margin over 700",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "45 min",
  copy: {
    heroSubs: [
      "Drill each skill area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your PL-900 exam.",
    ],
    sourceLine: "Weighted to the Microsoft Learn PL-900 study guide (skills measured as of July 24, 2026). Product names as of 2026. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
