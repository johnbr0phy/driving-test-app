import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Google Cloud Professional Cloud Architect. Certification page
// (cloud.google.com/learn/certification/cloud-architect, checked 2026-11-13):
// 2 hours, 50 to 60 multiple choice and multiple select questions, 200 USD,
// English and Japanese, online or at a test center, valid 2 years; each exam
// includes 2 case studies whose questions are 20 to 30% of the exam. Exam
// guide (professional_cloud_architect_exam_guide_english.pdf, the version that
// names Gemini Enterprise Agent Platform and the v6.1 case studies Altostrat
// Media, Cymbal Retail, EHR Healthcare and KnightMotives Automotive):
// Section 1 Designing and planning ~25%, 2 Managing and provisioning ~17.5%,
// 3 Security and compliance ~17.5%, 4 Analyzing and optimizing processes ~15%,
// 5 Managing implementation ~12.5%, 6 Solution and operations excellence
// ~12.5%. Google publishes no passing score. Each practice test is 60 items
// in 120 minutes (the real maximum at the real pace): 15/10/11/9/8/7 by
// section (sections 1 and 2 split into two drills each, so 8 drills and a
// 10-step dashboard), 8 "Choose two" items, and two of Tigertest's own
// fictional case studies with 7 questions each (14 of 60, 23%). Google's case
// studies are never copied.
const minutes = (n: number) => n * 60;

export const GCPPCA: ExamV2Config = {
  id: "gcppca",
  slug: "/google-cloud-professional-cloud-architect",
  landingPath: "/google-cloud-professional-cloud-architect-practice-test",
  name: "Google Cloud Professional Cloud Architect Practice Test",
  shortName: "Google PCA",
  fullName: "Google Cloud Professional Cloud Architect exam",
  tagline: "60 scenario questions in 2 hours with case studies and choose-two items, weighted to the current exam guide.",
  icon: "cloud",
  theme: { brand: "279 45% 26%", brandDark: "279 45% 19%", brandLight: "279 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pca",
      name: "Professional Cloud Architect",
      shortName: "PCA",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(120) }],
      directions: "60 questions across the six exam guide sections in 2 hours. Two case studies open beside their questions. Multiple select items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: ["pcaRequirements", "pcaDesign", "pcaProvision", "pcaAI", "pcaSecurity", "pcaProcess", "pcaImplement", "pcaOps"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pcaRequirements: "Business and Technical Requirements",
    pcaDesign: "Network, Storage, Compute and Migration",
    pcaProvision: "Provisioning Infrastructure",
    pcaAI: "AI and ML with Agent Platform",
    pcaSecurity: "Security and Compliance",
    pcaProcess: "Technical and Business Processes",
    pcaImplement: "Managing Implementation",
    pcaOps: "Solution and Operations Excellence",
  },
  drills: [
    { key: "requirements", name: "Business and Technical Requirements", section: "pca", domains: ["pcaRequirements"], blurb: "Functional and non-functional needs, RTO and RPO, trade-offs, cost, KPIs, availability and backup." },
    { key: "design", name: "Network, Storage and Compute Design", section: "pca", domains: ["pcaDesign"], blurb: "Shared VPC, hybrid links, load balancers, storage and database choice, GKE, Cloud Run and migration plans." },
    { key: "provision", name: "Provisioning Infrastructure", section: "pca", domains: ["pcaProvision"], blurb: "Cloud NAT and DNS, storage lifecycle and retention, Spot vs standard, autoscaling, patching and serverless networking." },
    { key: "ai", name: "AI and ML with Agent Platform", section: "pca", domains: ["pcaAI"], blurb: "Agent Platform Pipelines, AI Hypercomputer, TPUs and GPUs, Google AI APIs, Model Garden and Gemini Enterprise." },
    { key: "security", name: "Security and Compliance", section: "pca", domains: ["pcaSecurity"], blurb: "IAM, the resource hierarchy, organization policy, VPC Service Controls, Cloud KMS, IAP and compliance." },
    { key: "process", name: "Technical and Business Processes", section: "pca", domains: ["pcaProcess"], blurb: "CI/CD, disaster recovery, postmortems, change and stakeholder management, CapEx and OpEx." },
    { key: "implement", name: "Managing Implementation", section: "pca", domains: ["pcaImplement"], blurb: "Apigee, Terraform and Infrastructure Manager, gcloud, bq, emulators, client libraries and migration tools." },
    { key: "ops", name: "Solution and Operations Excellence", section: "pca", domains: ["pcaOps"], blurb: "SLOs and error budgets, alerting, observability, release management, chaos engineering and load testing." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Around the likely passing line",
    75: "Passing with a little room",
    80: "A safe margin",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Eight drills, two practice tests. Start with Business and Technical Requirements.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Professional Cloud Architect exam.",
    ],
    sourceLine: "Weighted to the Google Cloud Professional Cloud Architect exam guide. Case studies are Tigertest's own. Product names as of 2026. Not affiliated with Google.",
    scoreNote: "Percent correct. Google reports only pass or fail and does not publish a passing score; aim for 80 percent here.",
  },
};
