import "@/lib/v2/banks/dp900";
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

const title = "Free Microsoft DP-900 Practice Test 2026";
const metaDescription =
  "Free DP-900 practice tests: 200 original questions on data formats, SQL, Azure SQL, Blob storage, Cosmos DB, Microsoft Fabric, Databricks and Power BI, all explained.";
const description =
  "Free Microsoft DP-900 (Azure Data Fundamentals) practice tests with 200 original questions weighted to the skills measured as of July 21, 2026: structured, semi-structured and unstructured data, file formats, transactional and analytical workloads, data roles, normalization and SQL, Azure SQL Database, Azure SQL Managed Instance, Azure Database for MySQL and PostgreSQL, Blob storage, Azure Files, Table storage, Azure Cosmos DB, Microsoft Fabric, Azure Databricks, real-time analytics and Power BI.";

const faqs = [
  {
    q: "How many questions are on the DP-900 exam?",
    a: "Microsoft does not publish a question count for DP-900. You get 45 minutes, and the exam can include interactive question types as well as multiple choice. Try Microsoft's exam sandbox to see the question formats before you book.",
  },
  {
    q: "What is the passing score for DP-900?",
    a: "You need a score of 700 or greater on a scale of 1 to 1,000. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the DP-900 exam?",
    a: "Four skill areas, in the skills measured as of July 21, 2026: Describe core data concepts 25 to 30 percent, Identify considerations for relational data on Azure 20 to 25 percent, Describe considerations for working with non-relational data on Azure 15 to 20 percent, and Describe an analytics workload 25 to 30 percent, which covers Azure Databricks, Microsoft Fabric, real-time analytics and Power BI.",
  },
  {
    q: "Is DP-900 still available, or has it been retired?",
    a: "DP-900 is still offered. Its study guide was updated with skills measured as of July 21, 2026, and the certification page showed no retirement notice when we checked in November 2026. The newer content names Microsoft Fabric and Azure Databricks, so older notes that only cover Azure Synapse Analytics are out of date.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 50 questions in 45 minutes with free navigation and flagging. Most are multiple choice, with choose-two, yes or no statement sets, matching and ordering items. The questions are original, not Microsoft's.",
  },
  {
    q: "Is the Tigertest DP-900 practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the data formats, workloads, relational concepts and Azure SQL drills are free; the Azure Storage, Cosmos DB, analytics and Power BI drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "DP-900 practice test, Microsoft DP-900 practice exam, free DP-900 questions, Azure Data Fundamentals practice test, DP-900 exam prep 2026, Azure Data Fundamentals practice questions, DP-900 exam questions",
  alternates: {
    canonical: `${siteUrl}/dp-900-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/dp-900-practice-test`,
    images: [{ url: shareImageUrl("dp900"), width: 1200, height: 630, alt: "Tigertest free Microsoft DP-900 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dp900")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Microsoft DP-900 Practice Tests",
      description,
      url: `${siteUrl}/dp-900-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("dp900"),
      featureList: [
        "200 original DP-900 practice questions",
        "2 full 50-question practice tests in 45 minutes",
        "8 drills covering every skills measured area",
        "Choose-two, yes or no statement, matching and ordering items",
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
        classFaqJsonLd("dp900"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Describe core data concepts", weight: "25-30%" },
  { name: "Identify considerations for relational data on Azure", weight: "20-25%" },
  { name: "Describe considerations for working with non-relational data on Azure", weight: "15-20%" },
  { name: "Describe an analytics workload", weight: "25-30%" },
];

export default function Dp900LandingPage() {
  return (
    <div data-theme="dp900" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Microsoft DP-900 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/dp-900/dashboard"
            shortName="DP-900"
            subtitle="200 questions weighted to the DP-900 skills measured, from file formats to Microsoft Fabric. Free to start, no account needed."
            shots={{ mobile: "/landing/dp900-mobile.png", desktop: "/landing/dp900-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dp900" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Data formats and stores; workloads and roles; relational concepts and SQL; Azure SQL and open-source databases; Azure Storage; Azure Cosmos DB; analytics and real time; and Power BI. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 45 minutes with flagging and review, at the pace of the real exam. Pick the right Azure data service, classify data, judge yes or no statements and match Cosmos DB APIs to data models. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the DP-900 Skills Measured
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured and their weights in the DP-900 study guide. Every practice test follows the version as of July 21, 2026, with current product names: Microsoft Fabric lakehouses and warehouses, OneLake, Azure Databricks, Fabric Real-Time Intelligence and the cold blob tier.
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
                src={getTigerAsset("dp900", 3)}
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
            How to Pass DP-900
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the vocabulary first</h3>
              <p>
                DP-900 is a fundamentals exam, so many questions test whether you know a term: structured or semi-structured, OLTP or analytical, ACID, normalization, DDL or DML, fact and dimension tables, batch or streaming. Make sure you can explain each one in a sentence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Match each need to a service</h3>
              <p>
                Expect scenarios that ask which service fits: SQL Server on a VM, Managed Instance or Azure SQL Database; Blob storage, Azure Files or Table storage; which Cosmos DB API; a Fabric Lakehouse or Warehouse; Event Hubs or Stream Analytics. Keep a short table of each service and the job it does best.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Give analytics the time it deserves</h3>
              <p>
                Core data concepts and analytics are each up to 30 percent of the exam. Know the parts of Microsoft Fabric, what Azure Databricks is for, the medallion layers, and which Power BI visual answers which question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by area. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Before the real exam, try Microsoft&apos;s exam sandbox so the question types are familiar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          DP-900 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="dp900" />
        </div>
      </div>

      <SampleQuestionsV2 examId="dp900" />

      <ExamRelatedTests examId="dp900" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass DP-900?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four skill areas.</p>
          <ExamLandingCTA dashboardHref="/dp-900/dashboard" />
        </div>
      </div>
    </div>
  );
}
