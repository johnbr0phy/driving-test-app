import "@/lib/v2/banks/snowpro";
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

const title = "Free SnowPro Core Practice Test 2026 (COF-C03)";
const metaDescription =
  "Free Snowflake SnowPro Core practice tests: 200 original COF-C03 questions on architecture, Time Travel, roles and governance, loading, performance, streams and tasks, and data sharing, all explained.";
const description =
  "Free Snowflake SnowPro Core Certification (COF-C03) practice tests with 200 original questions weighted to the five domains on Snowflake's exam page: AI Data Cloud features and architecture, account management and data governance, data loading, unloading and connectivity, performance optimization, querying and transformation, and data collaboration.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SnowPro Core practice test, COF-C03 practice exam, COF-C03 questions, SnowPro Core Certification practice questions, Snowflake certification practice test 2026, free SnowPro Core practice test, Snowflake exam questions",
  alternates: {
    canonical: `${siteUrl}/snowpro-core-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/snowpro-core-practice-test`,
    images: [{ url: shareImageUrl("snowpro"), width: 1200, height: 630, alt: "Tigertest free SnowPro Core practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("snowpro")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the SnowPro Core exam?",
    a: "The COF-C03 exam has 100 questions in 115 minutes, multiple choice and multiple select. Snowflake says the exam may include unscored items that it is trying out; they are not marked, and extra time is allowed for them.",
  },
  {
    q: "What score do I need to pass SnowPro Core?",
    a: "Snowflake reports a scaled score from 0 to 1,000, and the passing score is 750. A scaled 750 is not a fixed percent of questions, so aim well above it in practice.",
  },
  {
    q: "What is on the COF-C03 exam?",
    a: "Five domains from Snowflake's exam page: Snowflake AI Data Cloud Features and Architecture, 31 percent; Account Management and Data Governance, 20 percent; Data Loading, Unloading, and Connectivity, 18 percent; Performance Optimization, Querying, and Transformation, 21 percent; and Data Collaboration, 10 percent. COF-C03 replaced the older six-domain COF-C02 exam.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 50 questions in 58 minutes, half a real exam at the same pace, with flagging and review, and it mixes multiple choice items with multiple select items that say how many to choose. Scores here are percent correct; the real exam reports a scaled score from 0 to 1,000, with 750 to pass.",
  },
  {
    q: "Is the Tigertest SnowPro Core practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and four drills (Architecture and Features, Objects and Time Travel, Roles and Access, and Governance and Monitoring) are free; Practice Test 2 and the Loading and Unloading, Performance, Querying and Transformation and Data Collaboration drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SnowPro Core Practice Tests",
      description,
      url: `${siteUrl}/snowpro-core-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("snowpro"),
      featureList: [
        "200 original COF-C03 practice questions",
        "2 practice tests of 50 questions in 58 minutes",
        "8 drills that follow the five exam domains",
        "Multiple choice and choose-two items",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("snowpro"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Snowflake AI Data Cloud Features & Architecture", weight: "31%" },
  { name: "Performance Optimization, Querying, and Transformation", weight: "21%" },
  { name: "Account Management and Data Governance", weight: "20%" },
  { name: "Data Loading, Unloading, and Connectivity", weight: "18%" },
  { name: "Data Collaboration", weight: "10%" },
];

export default function SnowProLandingPage() {
  return (
    <div data-theme="snowpro" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SnowPro Core Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/snowpro-core/dashboard"
            shortName="SnowPro Core"
            subtitle="200 questions weighted to the five COF-C03 domains. Free to start, no account needed."
            shots={{ mobile: "/landing/snowpro-mobile.png", desktop: "/landing/snowpro-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="snowpro" />

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
                Eight drills that follow the five exam domains: architecture and features, objects and Time Travel, roles and access, governance and monitoring, loading and unloading, performance, querying and transformation, and data collaboration. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 58 minutes, half a real exam at its pace: you pick the Snowflake feature, command, role or setting that fits a situation, or choose the two statements that are true. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the COF-C03 Exam Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Snowflake&apos;s SnowPro Core exam page lists five COF-C03 domains with their weights. COF-C03 replaced the six-domain COF-C02 exam and puts the Snowflake AI Data Cloud, including Cortex AI features, in its largest domain. Every practice test here follows that weighting and uses feature names as of November 2026.
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
                src={getTigerAsset("snowpro", 3)}
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
            How to Pass the SnowPro Core Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know what each edition adds</h3>
              <p>
                Multi-cluster warehouses, 90-day Time Travel, materialized views, search optimization, masking and row access policies start at Enterprise. Tri-Secret Secure, private connectivity and failover start at Business Critical. Many questions turn on which edition a feature needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers that keep coming up</h3>
              <p>
                Time Travel defaults to 1 day and Fail-safe is a fixed 7 days. COPY remembers loaded files for 64 days and a pipe for 14. Persisted results last 24 hours, up to 31 days with reuse, and warehouses bill per second after the first 60. Load files of about 100 to 250 MB compressed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Scale up for big queries, out for many users</h3>
              <p>
                A larger warehouse helps one heavy query, especially one that spills to storage. A multi-cluster warehouse helps when many users queue. Clustering, search optimization, query acceleration and materialized views each fix a different kind of slow query, so learn which is which.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice choose-two items and drill your weak domain</h3>
              <p>
                Multiple select questions need every correct choice to score, so a half-remembered answer shows up fast. Tigertest tracks your accuracy by domain. The exam is scored from 0 to 1,000 with 750 to pass, which is not a fixed percent, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SnowPro Core Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="snowpro" />
        </div>
      </div>

      <SampleQuestionsV2 examId="snowpro" />

      <ExamRelatedTests examId="snowpro" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the SnowPro Core Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/snowpro-core/dashboard" />
        </div>
      </div>
    </div>
  );
}
