import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AWS Certified AI Practitioner (AIF-C01), exam guide version 1.2 (published
// October 29, 2026; AWS says guide updates reach the exam about a month
// later). 65 questions (50 scored, 15 unscored) in 90 minutes, multiple choice
// (one of four) and multiple response (two or more of five or more), scaled 100
// to 1000 with 700 to pass, compensatory scoring. Weighted to the guide's
// domains: Fundamentals of AI and ML 20%, Fundamentals of GenAI 24%,
// Applications of Foundation Models 28%, Guidelines for Responsible AI 14%,
// Security, Compliance, and Governance for AI Solutions 14% (13/16/18/9/9 of 65
// per test). Domains 1 to 3 split by task statement into two drills each, so
// the dashboard has 8 drills and 2 tests: 1.1-1.2 basics 8, 1.3 lifecycle 5;
// 2.1 concepts 8, 2.2-2.3 capabilities and AWS services 8; 3.1-3.2 design and
// prompting 10, 3.3-3.4 tuning and evaluation 8; responsible AI 9; security 9.
// Service names as of November 2026 (SageMaker AI, Bedrock AgentCore, Strands
// Agents, Kiro, Amazon Quick, Amazon Nova).
const minutes = (n: number) => n * 60;

export const AWSAIF: ExamV2Config = {
  id: "awsaif",
  slug: "/aws-ai-practitioner",
  landingPath: "/aws-ai-practitioner-practice-test",
  name: "AWS AI Practitioner Practice Test",
  shortName: "AWS AI Practitioner",
  fullName: "AWS Certified AI Practitioner (AIF-C01) exam",
  tagline: "65 questions in 90 minutes with choose-two items, like the real AIF-C01.",
  icon: "sparkles",
  theme: { brand: "284 75% 18%", brandDark: "284 75% 12%", brandLight: "284 75% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "aif",
      name: "AI Practitioner AIF-C01",
      shortName: "AIF-C01",
      modules: [{ module: 1, questionCount: 65, timeLimit: minutes(90) }],
      directions: "65 questions across the five AIF-C01 domains in 90 minutes. Multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(65),
      domains: ["aifBasics", "aifLifecycle", "aifGenai", "aifGenaiAws", "aifDesign", "aifTuneEval", "aifResponsible", "aifSecurity"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    aifBasics: "AI and ML Concepts and Use Cases",
    aifLifecycle: "AI/ML Development Lifecycle",
    aifGenai: "Generative AI Concepts",
    aifGenaiAws: "GenAI Capabilities and AWS Services",
    aifDesign: "FM App Design and Prompting",
    aifTuneEval: "FM Training and Evaluation",
    aifResponsible: "Responsible AI",
    aifSecurity: "Security, Compliance and Governance",
  },
  drills: [
    { key: "basics", name: "AI and ML Basics", section: "aif", domains: ["aifBasics"], blurb: "AI, ML and deep learning terms, learning types, data and inference types, when AI fits, and Transcribe, Polly, Comprehend, Lex and Textract." },
    { key: "lifecycle", name: "ML Lifecycle", section: "aif", domains: ["aifLifecycle"], blurb: "Pipeline stages, model sources, managed or self-hosted models, MLOps, and model and business metrics." },
    { key: "genai", name: "GenAI Concepts", section: "aif", domains: ["aifGenai"], blurb: "Tokens, chunking, embeddings and vectors, transformers and diffusion models, token pricing, context engineering, MCP and agent patterns." },
    { key: "genaiAws", name: "GenAI on AWS", section: "aif", domains: ["aifGenaiAws"], blurb: "Hallucinations and other limits, choosing a model, Bedrock, SageMaker AI, AgentCore and Strands Agents, and Provisioned Throughput." },
    { key: "design", name: "FM Apps and Prompting", section: "aif", domains: ["aifDesign"], blurb: "Temperature and other parameters, RAG and Knowledge Bases, vector stores, customization costs, prompt techniques and prompt attacks." },
    { key: "tuneEval", name: "Fine-Tuning and Evaluation", section: "aif", domains: ["aifTuneEval"], blurb: "Pre-training, continued pre-training, instruction tuning, RLHF, ROUGE, BLEU, BERTScore, LLM-as-a-judge and business metrics." },
    { key: "responsible", name: "Responsible AI", section: "aif", domains: ["aifResponsible"], blurb: "Fairness and robustness, Bedrock Guardrails policies, bias and variance, legal risks, Model Cards and explainability." },
    { key: "security", name: "Security and Governance", section: "aif", domains: ["aifSecurity"], blurb: "IAM, KMS, PrivateLink and Macie, AgentCore Identity and Policy, CloudTrail, Config and Artifact, and the Security Scoping Matrix." },
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
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your AI Practitioner exam.",
    ],
    sourceLine: "Weighted to the AWS AIF-C01 exam guide (version 1.2, October 2026). Service names as of November 2026. Not affiliated with Amazon Web Services.",
    scoreNote: "Percent correct. AWS reports a scaled score from 100 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
