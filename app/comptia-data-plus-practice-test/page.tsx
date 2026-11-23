import "@/lib/v2/banks/dataplus";
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

const title = "Free CompTIA Data+ Practice Test 2026";
const metaDescription =
  "Free CompTIA Data+ (DA0-002) practice tests: 225 original questions on data types, SQL queries, data cleaning, statistics, charts, reports and data governance, all explained.";
const description =
  "Free CompTIA Data+ (DA0-002) practice tests with 225 original questions weighted to the exam objectives: databases, fact and dimension tables, data types and sources, cloud storage, analysis tools and AI concepts, SQL joins, unions, grouping and nested queries, ETL and ELT, sampling, finding missing values, duplicates and outliers, imputation, scaling and regular expressions, statistics from the median to z-scores, charts, dashboards and report troubleshooting, and data governance, privacy and quality.";

const faqs = [
  {
    q: "How many questions are on the CompTIA Data+ exam?",
    a: "A maximum of 90 questions in 90 minutes, multiple choice and performance-based. The current exam code is DA0-002, launched on October 14, 2025, and CompTIA offers it in English and Japanese.",
  },
  {
    q: "What is the passing score for CompTIA Data+?",
    a: "You need 675 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Data+ DA0-002 exam?",
    a: "Five domains: Data Concepts and Environments 20 percent, Data Acquisition and Preparation 22 percent, Data Analysis 24 percent, Visualization and Reporting 20 percent, and Data Governance 14 percent. CompTIA recommends 18 to 24 months of experience as a data analyst or in a similar role.",
  },
  {
    q: "Is DA0-002 different from DA0-001?",
    a: "Yes. DA0-002 is the second version of Data+ and replaced DA0-001, which has now retired. The new objectives add AI concepts such as large language models and robotic process automation, cloud and storage infrastructure, coding environments such as notebooks and IDEs, and regular expressions. These practice tests follow DA0-002.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 90 questions in 90 minutes with free navigation and flagging, the most the real exam can have. Most are multiple choice; the performance-based tasks of the real exam are modelled as matching, ordering and typed-number questions. The questions are original, not CompTIA's.",
  },
  {
    q: "Is the Tigertest CompTIA Data+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the data concepts, infrastructure, acquisition and preparation drills are free; the communication, statistics, visuals, reports and governance drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CompTIA Data+ practice test, Data+ practice exam, DA0-002 practice test, free Data+ questions, data analyst certification practice test, Data+ exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/comptia-data-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-data-plus-practice-test`,
    images: [{ url: shareImageUrl("dataplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Data+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dataplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Data+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-data-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("dataplus"),
      featureList: [
        "225 original CompTIA Data+ practice questions",
        "2 full 90-question practice tests in 90 minutes",
        "9 drills covering every exam domain",
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
        classFaqJsonLd("dataplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Data Concepts and Environments", weight: "20%" },
  { name: "Data Acquisition and Preparation", weight: "22%" },
  { name: "Data Analysis", weight: "24%" },
  { name: "Visualization and Reporting", weight: "20%" },
  { name: "Data Governance", weight: "14%" },
];

export default function DataPlusLandingPage() {
  return (
    <div data-theme="dataplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Data+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-data-plus/dashboard"
            shortName="Data+"
            subtitle="225 questions weighted to the Data+ DA0-002 objectives, from SQL joins to data governance. Free to start, no account needed."
            shots={{ mobile: "/landing/dataplus-mobile.png", desktop: "/landing/dataplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dataplus" />

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
                Data concepts; infrastructure, tools and AI; acquisition and queries; exploration and cleansing; communication and troubleshooting; statistics; charts and visuals; reports and validation; and data governance. Questions you miss come back until you have mastered them.
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
                Two 90-question tests in 90 minutes with flagging and review, the full length and pace of the real exam. Questions mix every domain in the weights CompTIA publishes. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the Data+ Exam Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the DA0-002 exam objectives with five domains and their weights. Every practice test follows them, from fact tables and SQL joins to standard deviation, dashboard troubleshooting, masking and data quality testing.
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
                src={getTigerAsset("dataplus", 3)}
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
            How to Pass CompTIA Data+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Write the SQL yourself</h3>
              <p>
                Data+ expects you to read a query and know what it returns. Load a small sample data set into a free database or notebook and write joins, unions, GROUP BY with HAVING, and a nested query. Count the rows each join returns before you run it, then check.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work the statistics by hand</h3>
              <p>
                Mean, median, mode, range, sample standard deviation, z-scores and percent change are quick marks once practised. Work a few small sets on paper, and learn when the median or the interquartile range beats the mean because of outliers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match the chart and the report to the reader</h3>
              <p>
                Many questions give a goal or an audience and ask for the right chart, dashboard or delivery: a line chart for a trend, a histogram for a distribution, an executive summary for the board, a self-service portal for staff who explore on their own.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Data analysis is the biggest domain at 24 percent, so give statistics and troubleshooting extra time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CompTIA Data+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="dataplus" />
        </div>
      </div>

      <SampleQuestionsV2 examId="dataplus" />

      <ExamRelatedTests examId="dataplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CompTIA Data+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 225 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-data-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
