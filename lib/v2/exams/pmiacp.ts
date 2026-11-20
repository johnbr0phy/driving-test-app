import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// PMI Agile Certified Practitioner (PMI-ACP), on the PMI-ACP Examination
// Content Outline dated November 2024 (pages revised March 2026, the version in
// force in November 2026): 120 items (100 scored, 20 unscored pretest) in 3
// hours, multiple choice, multiple response, drag-and-drop and exhibit items,
// one 10-minute break after item 60 with no return to the first section.
// Domains: Mindset 28%, Leadership 25%, Product 19%, Delivery 28%. Practice
// tests model one half of the real exam at its pace: 60 items in 90 minutes,
// per test 17/15/11/17 by domain, split into 7 drills (Mindset tasks 1-3 and
// 4-7, Leadership tasks 1 and 6 and tasks 2-5, Product, Delivery tasks 1, 2
// and 6 and tasks 3, 4, 5 and 7; 9/8/8/7/11/8/9 per test). Drag and drop is
// modelled as matrix items; exhibits as short tables or numbers in the stem.
// PMI publishes no pass mark, so the goal line is a readiness line.
// Sources: tools/next100/pmiacp/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "acpMindsetTeam", "acpMindsetFlow", "acpLeadTeams", "acpLeadVision",
  "acpProduct", "acpDeliveryValue", "acpDeliveryFlow",
];

export const PMIACP: ExamV2Config = {
  id: "pmiacp",
  slug: "/pmi-acp",
  landingPath: "/pmi-acp-practice-test",
  name: "PMI-ACP Practice Test",
  shortName: "PMI-ACP",
  fullName: "PMI Agile Certified Practitioner (PMI-ACP) exam",
  tagline: "60 questions in 90 minutes, half the real PMI-ACP at its pace: mindset, leadership, product and delivery.",
  icon: "target",
  theme: { brand: "95 90% 18%", brandDark: "95 90% 12%", brandLight: "95 60% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "acp",
      name: "PMI-ACP practice exam",
      shortName: "PMI-ACP",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(90) }],
      directions: "60 questions in 90 minutes, the real exam's pace and one half of its length. Questions mix the agile mindset, leadership, product and delivery. Some ask you to choose two or to match items in a grid. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    acpMindsetTeam: "Mindset: Experiments, Agile Mindset and Teams",
    acpMindsetFlow: "Mindset: Transparency, Safety, Feedback and Change",
    acpLeadTeams: "Leadership: Empowering Teams and Conflict",
    acpLeadVision: "Leadership: Problems, Knowledge and Vision",
    acpProduct: "Product",
    acpDeliveryValue: "Delivery: Feedback, Metrics and Customers",
    acpDeliveryFlow: "Delivery: Risk, Waste, Improvement and Flow",
  },
  drills: [
    { key: "mindset", name: "Agile Mindset and Teams", section: "acp", domains: ["acpMindsetTeam"], blurb: "Experimenting early, manifesto values and principles, complexity, choosing a model, working agreements and team coordination." },
    { key: "transparency", name: "Transparency and Change", section: "acp", domains: ["acpMindsetFlow"], blurb: "Information radiators, psychological safety, shorter feedback loops and embracing change." },
    { key: "empower", name: "Empowering Teams", section: "acp", domains: ["acpLeadTeams"], blurb: "Trust, coaching, training and mentoring, emotional intelligence and managing conflict." },
    { key: "vision", name: "Problems, Knowledge and Vision", section: "acp", domains: ["acpLeadVision"], blurb: "Root cause analysis, communities of practice, promoting agile values and a shared vision." },
    { key: "product", name: "Product and Backlog", section: "acp", domains: ["acpProduct"], blurb: "Refining and sizing the backlog, increments, visualizing work and defining value." },
    { key: "feedback", name: "Feedback, Metrics and Customers", section: "acp", domains: ["acpDeliveryValue"], blurb: "Early feedback, velocity, flow metrics, burn charts, earned value and acceptance criteria." },
    { key: "flow", name: "Risk, Waste and Flow", section: "acp", domains: ["acpDeliveryFlow"], blurb: "Spikes, risk-adjusted backlogs, value streams, continuous improvement and WIP limits." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 85],
  goalNotes: {
    65: "Below the readiness line",
    70: "The readiness line",
    75: "A margin over the readiness line",
    80: "A wider margin",
    85: "Well above the readiness line",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your PMI-ACP exam.",
    ],
    sourceLine: "Original practice questions on the PMI-ACP Examination Content Outline (November 2024, revised March 2026). Not affiliated with or endorsed by PMI.",
    scoreNote: "Percent correct. PMI does not publish a pass mark for the PMI-ACP: the real exam has 120 items, 100 of them scored. Treat 70 percent here as a readiness line and aim higher.",
  },
};
