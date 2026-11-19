import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Azure AI Fundamentals (AI-901), which replaced AI-900 when Microsoft
// retired AI-900 on June 30, 2026. Fundamentals exams run 45 minutes and most
// Microsoft exams have 40 to 60 questions (Microsoft Learn, exam duration page);
// scored 1 to 1000 with 700 to pass. Weighted to the AI-901 study guide, skills
// measured as of April 15, 2026: Identify AI concepts and capabilities 40-45%,
// Implement AI solutions by using Microsoft Foundry 55-60% (21/29 of 50 per
// test). One drill per study-guide sub-area, with the generative apps and
// agents area split in two, so the dashboard has 8 drills and 2 tests. Product
// names as of 2026 (Microsoft Foundry, Foundry Tools, Foundry Agent Service,
// Azure Content Understanding in Foundry Tools, gpt-image models).
const minutes = (n: number) => n * 60;

export const AI901: ExamV2Config = {
  id: "ai901",
  slug: "/ai-901",
  landingPath: "/ai-901-practice-test",
  name: "AI-901 Azure AI Fundamentals Practice Test",
  shortName: "AI-901",
  fullName: "Microsoft Azure AI Fundamentals (AI-901) exam",
  tagline: "50 questions in 45 minutes with yes/no statement sets, matching and choose-two items, like the real AI-901.",
  icon: "sparkles",
  theme: { brand: "258 55% 36%", brandDark: "258 55% 26%", brandLight: "258 55% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ai901",
      name: "Azure AI Fundamentals AI-901",
      shortName: "AI-901",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions: "50 questions across the two AI-901 skill areas in 45 minutes. Some items are sets of yes/no statements or matching; multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["ai901Rai", "ai901Models", "ai901Workloads", "ai901GenApps", "ai901Agents", "ai901TextSpeech", "ai901Vision", "ai901Extract"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ai901Rai: "Responsible AI Principles",
    ai901Models: "AI Models, Deployments and Parameters",
    ai901Workloads: "AI Workloads",
    ai901GenApps: "Prompts, Models and the Foundry SDK",
    ai901Agents: "Agents in Foundry",
    ai901TextSpeech: "Text and Speech Solutions",
    ai901Vision: "Vision and Image Generation",
    ai901Extract: "Information Extraction with Content Understanding",
  },
  drills: [
    { key: "rai", name: "Responsible AI", section: "ai901", domains: ["ai901Rai"], blurb: "Fairness, reliability and safety, privacy and security, inclusiveness, transparency and accountability, with the practices that support each." },
    { key: "models", name: "Models and Deployments", section: "ai901", domains: ["ai901Models"], blurb: "How generative models work, tokens and context windows, choosing a model by capability, deployment types such as Global Standard and Batch, and temperature and top_p." },
    { key: "workloads", name: "AI Workloads", section: "ai901", domains: ["ai901Workloads"], blurb: "Generative and agentic AI, text analysis techniques, speech recognition and synthesis, computer vision and image generation, and information extraction." },
    { key: "genApps", name: "Prompts and the Foundry SDK", section: "ai901", domains: ["ai901GenApps"], blurb: "System and user prompts, few-shot and grounding, deploying a model and using the playground, and a lightweight chat client with the Foundry SDK." },
    { key: "agents", name: "Foundry Agents", section: "ai901", domains: ["ai901Agents"], blurb: "Prompt and hosted agents, instructions and tools, testing in the playground, tracing and publishing, and a client app that talks to an agent." },
    { key: "textSpeech", name: "Text and Speech", section: "ai901", domains: ["ai901TextSpeech"], blurb: "Azure Language features in an app, spoken prompts and Voice Live, and Azure Speech in Foundry Tools for transcription and voices." },
    { key: "vision", name: "Vision and Images", section: "ai901", domains: ["ai901Vision"], blurb: "Sending images to a multimodal model, detail levels and limits, and generating and editing images with gpt-image models." },
    { key: "extract", name: "Content Understanding", section: "ai901", domains: ["ai901Extract"], blurb: "Analyzers, field extraction with extract, classify and generate, confidence and grounding, and documents, images, audio and video." },
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
      "Goal hit. Book your AI-901 exam.",
    ],
    sourceLine: "Weighted to the Microsoft Learn AI-901 study guide (skills measured as of April 15, 2026). Product names as of 2026. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
