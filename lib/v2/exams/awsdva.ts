import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AWS Certified Developer - Associate (DVA-C03). Registration opened October
// 27, 2026; the last day for DVA-C02 is November 30, 2026, and DVA-C03 is the
// exam from December 1, 2026. 65 questions (50 scored, 15 unscored) in 130
// minutes, multiple choice (one of four) and multiple response (two or more of
// five or more), scaled 100 to 1000 with 720 to pass, compensatory scoring.
// Weighted to the guide's domains: Development with AWS Services 30%, Security
// 26%, Testing and Deployment 22%, Troubleshooting and Optimization 22%
// (20/17/14/14 of 65 per test). Split by task statement into ten drills:
// 1.1 code 9, 1.2 Lambda 6, 1.3 data stores 5; 2.1 auth 7, 2.2 encryption 6,
// 2.3 AI security 4; 3.1-3.2 build and test 6, 3.3 deploy 8; 4.1-4.2
// troubleshooting and observability 8, 4.3 optimization 6. Service names as of
// November 2026 (Bedrock AgentCore, Kiro).
const minutes = (n: number) => n * 60;

export const AWSDVA: ExamV2Config = {
  id: "awsdva",
  slug: "/aws-developer-associate",
  landingPath: "/aws-developer-associate-practice-test",
  name: "AWS Developer Associate Practice Test",
  shortName: "AWS Developer Associate",
  fullName: "AWS Certified Developer - Associate (DVA-C03) exam",
  tagline: "65 questions in 130 minutes with choose-two items, like the real DVA-C03.",
  icon: "cloud",
  theme: { brand: "26 70% 14%", brandDark: "26 70% 8%", brandLight: "26 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "dva",
      name: "Developer Associate DVA-C03",
      shortName: "DVA-C03",
      modules: [{ module: 1, questionCount: 65, timeLimit: minutes(130) }],
      directions: "65 questions across the four DVA-C03 domains in 130 minutes. Multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(65),
      domains: ["dvaCode", "dvaLambda", "dvaData", "dvaAuth", "dvaEncrypt", "dvaAiSec", "dvaBuild", "dvaDeploy", "dvaObserve", "dvaOptimize"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    dvaCode: "Developing Code for AWS",
    dvaLambda: "Developing for AWS Lambda",
    dvaData: "Data Stores",
    dvaAuth: "Authentication and Authorization",
    dvaEncrypt: "Encryption and Sensitive Data",
    dvaAiSec: "Securing AI Services",
    dvaBuild: "Artifacts and Testing",
    dvaDeploy: "CI/CD Deployment",
    dvaObserve: "Troubleshooting and Observability",
    dvaOptimize: "Optimization",
  },
  drills: [
    { key: "code", name: "Code for AWS", section: "dva", domains: ["dvaCode"], blurb: "Decoupling, sync and async patterns, retries with backoff, API validation and mapping, SDK paging, streams, events, Kiro and the Bedrock Converse API." },
    { key: "lambda", name: "Lambda", section: "dva", domains: ["dvaLambda"], blurb: "VPC access, handlers, layers, extensions and environment variables, destinations and dead-letter queues, event source mappings." },
    { key: "data", name: "Data Stores", section: "dva", domains: ["dvaData"], blurb: "DynamoDB keys, capacity units, consistency, Query and Scan, indexes and conditional writes, TTL, S3 Lifecycle and caching patterns." },
    { key: "auth", name: "Auth and Access", section: "dva", domains: ["dvaAuth"], blurb: "Roles and temporary credentials, federation, Cognito tokens, SigV4, presigned URLs, policy evaluation and authorizers." },
    { key: "encrypt", name: "Encryption and Secrets", section: "dva", domains: ["dvaEncrypt"], blurb: "Envelope encryption and data keys, SSE options, ACM and Private CA, Secrets Manager and Parameter Store, masking sensitive logs." },
    { key: "aiSec", name: "AI Service Security", section: "dva", domains: ["dvaAiSec"], blurb: "Model access with IAM and SCPs, Bedrock data privacy, Guardrails filters, AgentCore Policy and isolation, human approval, logs." },
    { key: "build", name: "Artifacts and Testing", section: "dva", domains: ["dvaBuild"], blurb: "ECR tags and lifecycle policies, AppConfig, SAM local testing, CDK assertions, mock integrations, aliases and test events." },
    { key: "deploy", name: "CI/CD Deployment", section: "dva", domains: ["dvaDeploy"], blurb: "CodeDeploy configurations and hooks, CodePipeline, CloudFormation and SAM, ECS and EKS rollouts, blue/green and rollback." },
    { key: "observe", name: "Troubleshooting", section: "dva", domains: ["dvaObserve"], blurb: "Logs Insights, X-Ray traces and annotations, embedded metrics and metric filters, alarms, health checks and probes." },
    { key: "optimize", name: "Optimization", section: "dva", domains: ["dvaOptimize"], blurb: "Provisioned concurrency, SnapStart, RDS Proxy, memory tuning, SNS fan-out, SQS batching and caching with CloudFront, DAX and ElastiCache." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Close to the passing line",
    75: "Passing with a little room",
    80: "A safe margin over 720",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "2 hr 10 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the AWS DVA-C03 exam guide (in use from December 1, 2026). Service names as of November 2026. Not affiliated with Amazon Web Services.",
    scoreNote: "Percent correct. AWS reports a scaled score from 100 to 1000 with 720 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
