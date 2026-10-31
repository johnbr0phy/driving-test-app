import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AWS Certified Cloud Practitioner CLF-C02: 65 items (50 scored) in 90
// minutes, multiple choice and multiple response ("Choose two"), free
// navigation and review, 700 of 1000 to pass. Weighted to the exam guide:
// Cloud Concepts 24%, Security and Compliance 30%, Cloud Technology and
// Services 34%, Billing, Pricing and Support 12% (16/19/22/8 per test).
const minutes = (n: number) => n * 60;

export const AWS: ExamV2Config = {
  id: "aws",
  slug: "/aws-cloud-practitioner",
  landingPath: "/aws-cloud-practitioner-practice-test",
  name: "AWS Cloud Practitioner Practice Test",
  shortName: "AWS CCP",
  fullName: "AWS Certified Cloud Practitioner (CLF-C02) exam",
  tagline: "65 questions in 90 minutes with choose-two and choose-three items, like the real CLF-C02.",
  icon: "cloud",
  theme: { brand: "20 90% 42%", brandDark: "20 90% 34%", brandLight: "20 90% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "aws",
      name: "Cloud Practitioner CLF-C02",
      shortName: "CLF-C02",
      modules: [{ module: 1, questionCount: 65, timeLimit: minutes(90) }],
      directions: "65 questions across the four CLF-C02 domains in 90 minutes. Multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(65),
      domains: ["cloudConcepts", "securityCompliance", "technologyServices", "billingPricing"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cloudConcepts: "Cloud Concepts",
    securityCompliance: "Security and Compliance",
    technologyServices: "Cloud Technology and Services",
    billingPricing: "Billing, Pricing and Support",
  },
  drills: [
    { key: "concepts", name: "Cloud Concepts", section: "aws", domains: ["cloudConcepts"], blurb: "Benefits of the cloud, the Well-Architected Framework and migration." },
    { key: "security", name: "Security and Compliance", section: "aws", domains: ["securityCompliance"], blurb: "Shared responsibility, IAM, security services and compliance." },
    { key: "technology", name: "Technology and Services", section: "aws", domains: ["technologyServices"], blurb: "Compute, storage, databases, networking and global infrastructure." },
    { key: "billing", name: "Billing and Pricing", section: "aws", domains: ["billingPricing"], blurb: "Pricing models, cost tools and support plans." },
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
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Cloud Practitioner exam.",
    ],
    sourceLine: "Weighted to the AWS Certified Cloud Practitioner (CLF-C02) exam guide. Service names and features as of 2026. Not affiliated with Amazon Web Services.",
    scoreNote: "Percent correct. AWS reports a scaled score from 100 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
