import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Claude Certified Architect Practice Test 2026 - Free CCA-F Questions";
const metaDescription =
  "Free Claude Certified Architect: Foundations practice: 200 original scenario questions on agents, Claude Code, prompts, tools and MCP, and context, four 50-question tests, every answer explained.";
const description =
  "Free practice for the Claude Certified Architect: Foundations exam: 200 original scenario questions written from Anthropic's public documentation across the five domains study guides report. Four 50-question practice tests, four training sets and an explanation for every answer. Not affiliated with or endorsed by Anthropic.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "claude certified architect practice test, cca-f practice questions, claude certified architect foundations exam, anthropic certification practice test, claude architect exam 2026, mcp certification questions",
  alternates: {
    canonical: `${siteUrl}/claude-certified-architect-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/claude-certified-architect-practice-test`,
    images: [{ url: shareImageUrl("ccaf"), width: 1200, height: 630, alt: "Tigertest free Claude Certified Architect practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccaf")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Claude Certified Architect: Foundations exam?",
    a: "It is Anthropic's technical certification for solution architects who design and build agent systems with Claude. Anthropic says it covers Claude Code, the Claude Agent SDK, the Claude API and Model Context Protocol, and that every exam is proctored and identity-verified.",
  },
  {
    q: "How many questions are on the exam and what is the passing score?",
    a: "Study guides report 60 scenario questions in 120 minutes, with a scaled score of 720 out of 1,000 to pass. We could not read Anthropic's own exam guide, so check these with Anthropic. Each practice test here has 50 questions and a 70% practice target, which is a guide to readiness and not a conversion of the real score.",
  },
  {
    q: "What does the exam cover?",
    a: "Guides report five domains: Agentic Architecture and Orchestration 27%, Claude Code Configuration and Workflows 20%, Prompt Engineering and Structured Output 20%, Tool Design and MCP Integration 18%, and Context Management and Reliability 15%. Each practice test here keeps about the same balance.",
  },
  {
    q: "Who can take it and what does it cost?",
    a: "Guides disagree. Some describe access through the Claude Partner Network and quote different fees, so Anthropic Academy is the place to confirm eligibility, price and how to book. These practice questions are free to start and open to anyone, whether or not you can sit the exam yet.",
  },
  {
    q: "Are these real exam questions?",
    a: "No. Every question is original, written by Tigertest from Anthropic's public documentation and the Model Context Protocol documentation. It is free practice, not affiliated with or endorsed by Anthropic, and it does not use real exam content. Claude and its tools change quickly, so check the current docs if something here looks out of date.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Claude Certified Architect Practice Test",
      description,
      url: `${siteUrl}/claude-certified-architect-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Claude Certified Architect practice questions",
        "4 practice tests of 50 questions across all five domains",
        "4 training sets, one for each test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Agentic Architecture & Orchestration", weight: "27%" },
  { name: "Claude Code Configuration & Workflows", weight: "20%" },
  { name: "Prompt Engineering & Structured Output", weight: "20%" },
  { name: "Tool Design & MCP Integration", weight: "18%" },
  { name: "Context Management & Reliability", weight: "15%" },
];

export default function ClaudeArchitectLandingPage() {
  return (
    <div data-theme="ccaf" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Claude Certified Architect Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/claude-certified-architect/dashboard"
            shortName="Claude CCA-F"
            subtitle="200 original scenario questions on agent design, Claude Code, prompts and structured output, tools and MCP, and context management. Four 50-question tests with every answer explained. Tuned for mobile. Not affiliated with Anthropic."
            shots={{ mobile: "/landing/ccaf-mobile.png", desktop: "/landing/ccaf-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccaf" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Set by Set</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one for each practice test, so you learn the questions before you are scored on them. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Scored Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, shorter than the 60 guides report, covering all five domains with a 70% practice target. No question appears in more than one test, and every answer is explained.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Weighted to the Reported Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Study guides report these five domain weights, though we could not check them against Anthropic&apos;s own exam guide. Every practice test keeps about the same balance: 14 agentic architecture, 10 Claude Code, 10 prompt engineering, 9 tools and MCP, and 7 context management questions in every 50.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ccaf", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Prepare for the Claude Architect Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build a small agent first</h3>
              <p>
                Write the loop yourself once: send a request, run the tool Claude asks for, return the result and stop on the right stop reason. Scenario questions are much easier when you have watched an agent choose the wrong tool or run too long.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Choose the simplest design that works</h3>
              <p>
                Many questions offer several designs that could work. Anthropic&apos;s own guidance is to start simple, so do not reach for many agents when one prompt chain will do, and keep a person in the loop for risky or irreversible actions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Configure Claude Code for a real repo</h3>
              <p>
                Set up a CLAUDE.md, project settings, a hook, a subagent and a non-interactive run in CI. Knowing where each setting lives and who shares it answers most of the configuration questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Treat tools and context as design work</h3>
              <p>
                Clear tool descriptions, useful error messages and small results decide how well an agent behaves. Practice spotting what to keep, cache, summarize or fetch later, since long runs usually fail by losing or drowning in context.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Claude Certified Architect Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="ccaf" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the Claude Architect Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five reported domains.</p>
          <ExamLandingCTA dashboardHref="/claude-certified-architect/dashboard" />
        </div>
      </div>
    </div>
  );
}
