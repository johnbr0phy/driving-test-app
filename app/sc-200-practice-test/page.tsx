import "@/lib/v2/banks/sc200";
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

const title = "Free Microsoft SC-200 Practice Test 2026";
const metaDescription =
  "Free SC-200 practice tests: 212 original questions on Defender XDR, Microsoft Sentinel, KQL hunting, detections and incident response, all explained.";
const description =
  "Free Microsoft SC-200 (Security Operations Analyst) practice tests with 212 original questions weighted to the skills measured as of October 21, 2026: automation in Defender XDR and Microsoft Sentinel, Sentinel roles, retention and data ingestion, custom detections and analytics rules, responding to incidents in Defender XDR and Defender for Endpoint, investigating Microsoft 365 activity, and threat hunting with KQL.";

const faqs = [
  {
    q: "How many questions are on the SC-200 exam?",
    a: "Microsoft does not publish a fixed number. You get 100 minutes, and Microsoft says most of its certification exams have between 40 and 60 questions. Question types can include multiple choice, build lists, drag and drop, hot areas, case studies and, on some role-based exams, labs.",
  },
  {
    q: "What is the passing score for SC-200?",
    a: "You need a score of 700 or greater on a scale of 1 to 1,000. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the SC-200 exam?",
    a: "Three skill areas, in the skills measured as of October 21, 2026: Manage a security operations environment 40 to 45 percent, Respond to security incidents 35 to 40 percent, and Perform threat hunting 20 to 25 percent. That covers Defender XDR, Defender for Endpoint, Microsoft Sentinel, Microsoft Entra ID, Microsoft Purview, Security Copilot and KQL.",
  },
  {
    q: "Do I need to know KQL for SC-200?",
    a: "Yes. The threat hunting area asks you to pick the right Advanced Hunting table, read and write Kusto Query Language queries and build detections from them. Know where, project, extend, summarize with count, dcount and arg_max, bin, join kinds and the difference between has and contains.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 50 questions in 100 minutes with free navigation and flagging. Most are multiple choice, with choose-two, matching, ordering and typed-number items and KQL queries to read. Labs and case studies are not included, and the questions are original, not Microsoft's.",
  },
  {
    q: "Is the Tigertest SC-200 practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SC-200 practice test, Microsoft SC-200 practice exam, free SC-200 questions, Security Operations Analyst practice test, SC-200 exam prep 2026, Microsoft Sentinel practice questions, Defender XDR practice test, KQL practice questions",
  alternates: {
    canonical: `${siteUrl}/sc-200-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sc-200-practice-test`,
    images: [{ url: shareImageUrl("sc200"), width: 1200, height: 630, alt: "Tigertest free Microsoft SC-200 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sc200")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Microsoft SC-200 Practice Tests",
      description,
      url: `${siteUrl}/sc-200-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sc200"),
      featureList: [
        "212 original SC-200 practice questions",
        "2 full 50-question practice tests in 100 minutes",
        "9 drills, one per skills measured area",
        "KQL queries, choose-two, matching and ordering items",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("sc200"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Manage a security operations environment", weight: "40-45%" },
  { name: "Respond to security incidents", weight: "35-40%" },
  { name: "Perform threat hunting", weight: "20-25%" },
];

export default function Sc200LandingPage() {
  return (
    <div data-theme="sc200" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Microsoft SC-200 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sc-200/dashboard"
            shortName="SC-200"
            subtitle="212 original questions weighted to the SC-200 skills measured, with KQL queries to read, matching and ordering items. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/sc200-mobile.png", desktop: "/landing/sc200-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sc200" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Nine Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill per skills measured area: automation, the Sentinel platform, data ingestion, detections, Defender XDR response, endpoint response, Microsoft 365 activity, KQL hunting in Defender and hunting on the Sentinel platform. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 100 minutes with flagging and review, at the pace of the real exam. Read KQL queries, match tables and roles to tasks and put rule steps in order. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the SC-200 Skills Measured
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured and their weights in the SC-200 study guide. Every practice test follows the version as of October 21, 2026, including the Sentinel data lake, KQL jobs and summary rules, automatic attack disruption and investigating incidents with Security Copilot.
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
                src={getTigerAsset("sc200", 3)}
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
            How to Pass SC-200
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get fluent in KQL</h3>
              <p>
                Threat hunting is a fifth of the exam and KQL shows up in detections too. Know which Advanced Hunting table holds process, network, file, registry, logon, email and identity events, and practice reading what a query returns before you run it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know where each setting lives</h3>
              <p>
                Many questions ask where to configure something: an incident email notification rule, an alert tuning rule, an automation rule, a custom detection or a data collection rule. Learn which Sentinel and Defender roles allow each task and how the Analytics, Data lake and XDR tiers store data.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice responding, not just detecting</h3>
              <p>
                Responding to incidents is over a third of the exam. Know when to isolate a device and when to contain it, what an investigation package holds, which live response commands are advanced, and how Defender for Identity, Cloud Apps, Office 365 and Entra ID Protection alerts are remediated.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by area. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Before the real exam, try Microsoft&apos;s exam sandbox so the question types and any labs are familiar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SC-200 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sc200" />
        </div>
      </div>

      <SampleQuestionsV2 examId="sc200" />

      <ExamRelatedTests examId="sc200" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass SC-200?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 212 questions across all three skill areas.</p>
          <ExamLandingCTA dashboardHref="/sc-200/dashboard" />
        </div>
      </div>
    </div>
  );
}
