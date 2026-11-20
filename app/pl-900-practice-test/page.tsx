import "@/lib/v2/banks/pl900";
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

const title = "Free PL-900 Practice Test 2026: Power Platform Fundamentals";
const metaDescription =
  "Free PL-900 practice tests: 198 original questions on Dataverse, environments and governance, Power Apps, Power Automate and Copilot Studio agents, all explained.";
const description =
  "Free Microsoft Power Platform Fundamentals (PL-900) practice tests with 198 original questions weighted to the Microsoft Learn study guide (skills measured as of July 24, 2026): the business value of Power Platform; Microsoft Dataverse, environments, security, data policies, monitoring and pipelines; canvas, model-driven and code apps, Plans, building apps with Copilot and the vibe experience; cloud and desktop flows, approvals and building flows with Copilot; and building and managing agents in Microsoft Copilot Studio.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PL-900 practice test, PL-900 practice exam, PL-900 questions, Power Platform Fundamentals practice test, Microsoft Power Platform Fundamentals exam prep 2026, free PL-900 practice test, Power Apps practice questions, Copilot Studio practice questions",
  alternates: {
    canonical: `${siteUrl}/pl-900-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pl-900-practice-test`,
    images: [{ url: shareImageUrl("pl900"), width: 1200, height: 630, alt: "Tigertest free PL-900 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pl900")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What changed on the PL-900 exam in 2026?",
    a: "Microsoft updated the skills measured on July 24, 2026. Power BI and the separate Power Pages area were removed, the Power Apps and Power Automate areas now ask how to build with AI (Plans, Copilot, the vibe experience, code apps), and a new area on agents in Microsoft Copilot Studio is worth 20 to 25 percent. Microsoft has also announced that the English exam will be updated again on December 18, 2026, so check the study guide before you book.",
  },
  {
    q: "How many questions are on the PL-900 exam?",
    a: "Microsoft does not publish a question count for PL-900. You have 45 minutes, the score is scaled from 1 to 1000 and 700 is passing.",
  },
  {
    q: "What is on the PL-900 exam?",
    a: "Five skill areas from the Microsoft Learn study guide: describe the business value of Microsoft Power Platform (5 to 10 percent); manage the Power Platform environment, covering Dataverse and administration and governance (20 to 25 percent); demonstrate the capabilities of Power Apps (20 to 25 percent); demonstrate the capabilities of Power Automate (20 to 25 percent); and describe features and capabilities of agents in Microsoft Copilot Studio (20 to 25 percent).",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 50 questions in 45 minutes with flagging and review, mixing single-answer items with choose-two items, yes/no statement sets and matching. Scores here are percent correct; the real exam reports a scaled score from 1 to 1000, with 700 to pass. Hands-on labs are not modelled.",
  },
  {
    q: "Is the Tigertest PL-900 practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PL-900 Power Platform Fundamentals Practice Tests",
      description,
      url: `${siteUrl}/pl-900-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pl900"),
      featureList: [
        "198 original PL-900 practice questions",
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
        classFaqJsonLd("pl900"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Manage the Power Platform Environment", weight: "20-25%" },
  { name: "Demonstrate the Capabilities of Power Apps", weight: "20-25%" },
  { name: "Demonstrate the Capabilities of Power Automate", weight: "20-25%" },
  { name: "Agents in Microsoft Copilot Studio", weight: "20-25%" },
  { name: "Business Value of Power Platform", weight: "5-10%" },
];

export default function Pl900LandingPage() {

  return (
    <div data-theme="pl900" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PL-900 Power Platform Fundamentals Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pl-900/dashboard"
            shortName="PL-900"
            subtitle="198 questions weighted to the PL-900 study guide. Free to start, no account needed."
            shots={{ mobile: "/landing/pl900-mobile.png", desktop: "/landing/pl900-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pl900" />

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
                Eight drills that follow the study guide: business value, Dataverse, admin and governance, Power Apps, flow use cases, building flows, building agents and managing agents. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 45 minutes, written in the real exam&apos;s style: a team has a business need and you pick the Power Platform product, feature or setting that fits, judge a set of yes/no statements, or match needs to components. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the PL-900 Study Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured for PL-900, last updated July 24, 2026. Power BI is gone and Copilot Studio agents are now a fifth of the exam, so older notes miss a lot. Every practice test here follows the new weighting and uses current product names, such as Plans in Power Apps, code apps, the vibe experience, agent flows, MCP servers and Microsoft Agent 365. Microsoft has announced another update to the English exam on December 18, 2026.
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
                src={getTigerAsset("pl900", 3)}
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
            How to Pass the PL-900 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know which product does which job</h3>
              <p>
                Power Apps builds apps, Power Automate automates processes, Dataverse stores and secures the data, Power Pages builds external websites and Copilot Studio builds agents. Many questions describe a business need and ask which product, app type or flow type fits, so practice naming it from the scenario.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn Dataverse and environments well</h3>
              <p>
                Table types (standard, activity, virtual, elastic), ownership, one-to-many and many-to-many relationships, forms and views, business rules and Power Fx. Then environment types, security roles and access levels, data policy groups, managed environments and pipelines. This area alone is up to a quarter of the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Try the AI building tools yourself</h3>
              <p>
                Build tables and an app with Copilot, start a plan, create a cloud flow by describing it, and make a small agent in Copilot Studio with a topic, a knowledge source and a tool, then publish it to Teams. The exam now asks how these tools work, not only what they are called.
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
          PL-900 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pl900" />
        </div>
      </div>

      <SampleQuestionsV2 examId="pl900" />

      <ExamRelatedTests examId="pl900" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass PL-900?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 198 questions across all five skill areas.</p>
          <ExamLandingCTA dashboardHref="/pl-900/dashboard" />
        </div>
      </div>
    </div>
  );
}
