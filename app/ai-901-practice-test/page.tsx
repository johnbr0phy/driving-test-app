import "@/lib/v2/banks/ai901";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free AI-901 Practice Test 2026: Azure AI Fundamentals";
const metaDescription =
  "Free AI-901 practice tests: 198 original questions on responsible AI, models, prompts, agents, speech, vision and Content Understanding in Microsoft Foundry, all explained.";
const description =
  "Free Microsoft Azure AI Fundamentals (AI-901) practice tests with 198 original questions weighted to the Microsoft Learn study guide: responsible AI principles, how generative models work, deployment types and parameters, and AI workloads; prompts, model deployments and the Foundry SDK, Foundry agents, Azure Language and Azure Speech in Foundry Tools, vision and image generation, and Azure Content Understanding. AI-901 replaced AI-900 on June 30, 2026.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AI-901 practice test, AI-901 practice exam, AI-901 questions, AI-900 practice test, Azure AI Fundamentals practice test, Microsoft Azure AI Fundamentals exam prep 2026, free AI-901 practice test, Microsoft Foundry practice questions",
  alternates: {
    canonical: `${siteUrl}/ai-901-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ai-901-practice-test`,
    images: [{ url: shareImageUrl("ai901"), width: 1200, height: 630, alt: "Tigertest free AI-901 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ai901")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Is AI-901 the same as AI-900?",
    a: "No. Microsoft retired AI-900 on June 30, 2026 and replaced it with AI-901. To earn the Microsoft Certified: Azure AI Fundamentals certification you now pass AI-901. The new exam is more hands on: Microsoft expects some Python and Azure knowledge, and more than half the exam is about building small apps and agents in Microsoft Foundry.",
  },
  {
    q: "How many questions are on the AI-901 exam?",
    a: "Microsoft does not publish a count for AI-901. It says most of its exams have 40 to 60 questions, and fundamentals exams run 45 minutes. The score is scaled from 1 to 1000 and 700 is passing.",
  },
  {
    q: "What is on the AI-901 exam?",
    a: "Two skill areas from the Microsoft Learn study guide (skills measured as of April 15, 2026): Identify AI concepts and capabilities, 40 to 45 percent, covering responsible AI, models and their configuration, and AI workloads; and Implement AI solutions by using Microsoft Foundry, 55 to 60 percent, covering generative AI apps and agents, text and speech, computer vision and image generation, and information extraction with Content Understanding.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 50 questions in 45 minutes with flagging and review, mixing single-answer items with choose-two items, yes/no statement sets and matching. Scores here are percent correct; the real exam reports a scaled score from 1 to 1000, with 700 to pass. Hands-on labs are not modelled.",
  },
  {
    q: "Is the Tigertest AI-901 practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AI-901 Azure AI Fundamentals Practice Tests",
      description,
      url: `${siteUrl}/ai-901-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ai901"),
      featureList: [
        "198 original AI-901 practice questions",
        "2 full 50-question practice tests in 45 minutes",
        "8 drills that follow the study guide",
        "Yes/no statement sets, matching and choose-two items",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("ai901"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Implement AI Solutions with Microsoft Foundry", weight: "55-60%" },
  { name: "Identify AI Concepts and Capabilities", weight: "40-45%" },
];

export default function Ai901LandingPage() {
  return (
    <div data-theme="ai901" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AI-901 Azure AI Fundamentals Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ai-901/dashboard"
            shortName="AI-901"
            subtitle="198 questions weighted to the AI-901 study guide. Free to start, no account needed."
            shots={{ mobile: "/landing/ai901-mobile.png", desktop: "/landing/ai901-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ai901" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills that follow the study guide: responsible AI, models and deployments, AI workloads, prompts and the Foundry SDK, Foundry agents, text and speech, vision and images, and Content Understanding. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 50-question tests in 45 minutes, written in the real exam&apos;s style: a team needs an AI feature and you pick the Foundry tool, setting or line of code that fits, judge a set of yes/no statements, or match tasks to services. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the AI-901 Study Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured for AI-901, last updated April 15, 2026. AI-901 replaced AI-900 on June 30, 2026, so older AI-900 notes miss half the exam. Every practice test here follows the new weighting and uses current product names, such as Microsoft Foundry, Foundry Agent Service, Azure Speech and Azure Language in Foundry Tools, Azure Content Understanding and the gpt-image models.
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
                src={getTigerAsset("ai901", 3)}
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
            How to Pass the AI-901 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the six responsible AI principles by example</h3>
              <p>
                Fairness, reliability and safety, privacy and security, inclusiveness, transparency and accountability. Questions describe a situation, such as a loan model treating age groups differently or a reviewer signing off on releases, and ask which principle it is. Practice naming the principle from the scenario.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know which Foundry tool does which job</h3>
              <p>
                Azure Language handles text analysis such as sentiment, entities and PII. Azure Speech handles speech to text, text to speech and translation. Content Understanding extracts fields from documents, images, audio and video. A multimodal model reads images in a prompt, and a gpt-image model creates new ones. Many questions are answered by picking the right tool.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Build one small app and one agent yourself</h3>
              <p>
                More than half the exam is about doing the work in Microsoft Foundry. Deploy a model, chat with it in the playground, then call it from Python with AIProjectClient and responses.create. Create a prompt agent with instructions and a tool, test it in the playground and talk to it from a short client app.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the statement sets and drill your weak area</h3>
              <p>
                Yes/no statement sets test each fact on its own, so a half-remembered answer shows up fast. Tigertest tracks your accuracy by skill area. The exam is scored from 1 to 1000 with 700 to pass, which is not a fixed percent, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AI-901 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ai901" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ai901" />

      <ExamRelatedTests examId="ai901" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass AI-901?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 198 questions across both skill areas.</p>
          <ExamLandingCTA dashboardHref="/ai-901/dashboard" />
        </div>
      </div>
    </div>
  );
}
