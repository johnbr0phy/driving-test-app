import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AWS Certified Solutions Architect - Associate SAA-C03 (still the current
// version in October 2026; no successor announced). 65 items (50 scored) in
// 130 minutes, multiple choice and multiple response ("Choose two"), free
// navigation and review, scaled 100 to 1000 with 720 to pass. Weighted to the
// SAA-C03 exam guide: Design Secure Architectures 30%, Design Resilient
// Architectures 26%, Design High-Performing Architectures 24%, Design
// Cost-Optimized Architectures 20% (19/17/16/13 per test). The large domains
// are split by task statement into eight drills so the dashboard has 10 steps:
// secure 7/6/6 (1.1 access, 1.2 workloads, 1.3 data), resilient 9/8 (2.1
// loosely coupled, 2.2 HA and DR), high-performing 8/8 (3.1-3.2 storage and
// compute, 3.3-3.5 database, network and data ingestion), cost 13.
const minutes = (n: number) => n * 60;

export const AWSSAA: ExamV2Config = {
  id: "awssaa",
  slug: "/aws-solutions-architect",
  landingPath: "/aws-solutions-architect-associate-practice-test",
  name: "AWS Solutions Architect Associate Practice Test",
  shortName: "AWS SAA",
  fullName: "AWS Certified Solutions Architect - Associate (SAA-C03) exam",
  tagline: "65 scenario questions in 130 minutes with choose-two items, like the real SAA-C03.",
  icon: "cloud",
  theme: { brand: "235 30% 32%", brandDark: "235 30% 22%", brandLight: "235 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "saa",
      name: "Solutions Architect Associate SAA-C03",
      shortName: "SAA-C03",
      modules: [{ module: 1, questionCount: 65, timeLimit: minutes(130) }],
      directions: "65 scenario questions across the four SAA-C03 domains in 130 minutes. Multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(65),
      domains: ["saaAccess", "saaWorkloads", "saaData", "saaDecoupling", "saaAvailability", "saaStorageCompute", "saaDataNetwork", "saaCost"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    saaAccess: "Secure Access",
    saaWorkloads: "Secure Workloads",
    saaData: "Data Security",
    saaDecoupling: "Scalable and Loosely Coupled",
    saaAvailability: "High Availability and DR",
    saaStorageCompute: "Storage and Compute Performance",
    saaDataNetwork: "Database, Network and Data",
    saaCost: "Cost Optimization",
  },
  drills: [
    { key: "access", name: "Secure Access", section: "saa", domains: ["saaAccess"], blurb: "IAM roles and policies, Identity Center, Organizations SCPs and cross-account access." },
    { key: "workloads", name: "Secure Workloads", section: "saa", domains: ["saaWorkloads"], blurb: "VPC security, WAF and Shield, endpoints, secrets and threat detection." },
    { key: "data", name: "Data Security", section: "saa", domains: ["saaData"], blurb: "KMS and CloudHSM, S3 encryption, Object Lock and encrypting RDS and EBS." },
    { key: "decoupling", name: "Scalable and Loosely Coupled", section: "saa", domains: ["saaDecoupling"], blurb: "SQS, SNS, EventBridge, Step Functions, Lambda and Auto Scaling." },
    { key: "availability", name: "High Availability and DR", section: "saa", domains: ["saaAvailability"], blurb: "Multi-AZ, Aurora and DynamoDB global data, Route 53 failover and DR strategies." },
    { key: "storageCompute", name: "Storage and Compute", section: "saa", domains: ["saaStorageCompute"], blurb: "EBS volume types, EFS and FSx, S3 performance, instance families and Lambda." },
    { key: "dataNetwork", name: "Databases and Networking", section: "saa", domains: ["saaDataNetwork"], blurb: "Caching, purpose-built databases, CloudFront, Transit Gateway and data pipelines." },
    { key: "cost", name: "Cost Optimization", section: "saa", domains: ["saaCost"], blurb: "S3 storage classes, Savings Plans and Spot, data transfer and cost tools." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [72, 75, 80, 85, 90],
  goalNotes: {
    72: "Close to the passing line",
    75: "Passing with a little room",
    80: "A safe margin over 720",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "2 hr 10 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Solutions Architect exam.",
    ],
    sourceLine: "Weighted to the AWS Certified Solutions Architect - Associate (SAA-C03) exam guide. Service names and features as of 2026. Not affiliated with Amazon Web Services.",
    scoreNote: "Percent correct. AWS reports a scaled score from 100 to 1000 with 720 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
