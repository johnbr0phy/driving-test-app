import "@/lib/v2/banks/gcppde";
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

const title = "Free Google Cloud Professional Data Engineer Practice Test 2026";
const metaDescription =
  "Free Google Cloud Professional Data Engineer practice tests: 200 original scenario questions weighted to the five sections of the current exam guide, with 2026 product names.";
const description =
  "Free Google Cloud Professional Data Engineer (PDE) practice tests with 200 original scenario questions weighted to the current exam guide: designing data processing systems, ingesting and processing data, storing data, preparing and using data for analysis, and maintaining and automating data workloads.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Google Cloud Professional Data Engineer practice test, GCP Professional Data Engineer practice exam, PDE practice questions, GCP data engineer exam prep 2026, BigQuery Dataflow practice questions, Google Cloud certification practice test",
  alternates: {
    canonical: `${siteUrl}/google-cloud-professional-data-engineer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/google-cloud-professional-data-engineer-practice-test`,
    images: [{ url: shareImageUrl("gcppde"), width: 1200, height: 630, alt: "Tigertest free Google Cloud Professional Data Engineer practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcppde")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Google Cloud Professional Data Engineer exam?",
    a: "40 to 50 multiple choice and multiple select questions in 2 hours. The exam costs 200 USD, is offered in English and Japanese, online-proctored or onsite-proctored, and the certification is valid for two years. Google reports pass or fail and does not publish a passing score.",
  },
  {
    q: "What is on the Professional Data Engineer exam?",
    a: "The exam guide has five sections: designing data processing systems (about 22 percent), ingesting and processing the data (about 25 percent), storing the data (about 20 percent), preparing and using data for analysis (about 15 percent) and maintaining and automating data workloads (about 18 percent). It covers BigQuery, Dataflow and Apache Beam, Pub/Sub, Spark, BigLake, Bigtable, Spanner, AlloyDB, data governance, BigQuery ML, embeddings and retrieval-augmented generation.",
  },
  {
    q: "Does the exam use the new 2026 product names?",
    a: "The exam guide still says Dataproc, Cloud Composer and Dataplex. In 2026 Google renamed them Managed Service for Apache Spark, Managed Service for Apache Airflow and Knowledge Catalog, and Vertex AI became Agent Platform. Tigertest uses the new names and gives the old one in the explanation, so you recognise both.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 50 questions in 2 hours with flagging and review, mixing single-answer items with choose-two items and weighted to the five sections of the guide. There are no case studies, as on the real exam. These are original practice questions, not real exam questions. Scores here are percent correct; aim for 80 percent.",
  },
  {
    q: "Is the Tigertest Professional Data Engineer practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the security, reliability and migration, batch pipeline and streaming drills are free. Practice Test 2 and the storage, warehouse, analysis and operations drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Google Cloud Professional Data Engineer Practice Tests",
      description,
      url: `${siteUrl}/google-cloud-professional-data-engineer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("gcppde"),
      featureList: [
        "200 original Professional Data Engineer practice questions",
        "2 full 50-question practice tests in 2 hours",
        "8 drills across the five exam guide sections",
        "Choose-two multiple select items",
        "2026 product names, with the names the guide uses",
        "Instant feedback with explanations",
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
        classFaqJsonLd("gcppde"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Designing data processing systems", weight: "22%" },
  { name: "Ingesting and processing the data", weight: "25%" },
  { name: "Storing the data", weight: "20%" },
  { name: "Preparing and using data for analysis", weight: "15%" },
  { name: "Maintaining and automating data workloads", weight: "18%" },
];

export default function GcppdeLandingPage() {
  return (
    <div data-theme="gcppde" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Google Cloud Professional Data Engineer Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/google-cloud-professional-data-engineer/dashboard"
            shortName="Google PDE"
            subtitle="200 scenario questions on BigQuery, Dataflow, Pub/Sub and more, weighted to the exam guide. Free to start, no account needed."
            shots={{ mobile: "/landing/gcppde-mobile.png", desktop: "/landing/gcppde-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcppde" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Focused Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill for each part of the exam guide: security and compliance, reliability and migration, batch pipelines, streaming, storage, warehouse and lake design, analysis and ML, and operations. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full-Length Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 50-question tests in 2 hours, the most the real exam asks. Practice Test 2 is held out of the drills, so it is all new questions when you take it.
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
                Built on the Current Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Google publishes the section weighting for the Professional Data Engineer exam. Every practice test here follows it and uses current product names, such as Managed Service for Apache Spark, Managed Service for Apache Airflow and Knowledge Catalog.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("gcppde", 3)}
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
            How to Pass the Professional Data Engineer Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Choose storage by access pattern</h3>
              <p>
                Many questions come down to the right store: BigQuery for analytic scans, Bigtable for high-volume key lookups, Spanner for global transactions, Cloud SQL or AlloyDB for regional relational apps, Memorystore for hot caches. Learn what each is built for and what it is not.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know streaming concepts cold</h3>
              <p>
                Ingesting and processing data is a quarter of the exam. Be sure of windows, watermarks, late data and triggers in Dataflow, Pub/Sub delivery and ordering, dead-letter topics, and when to drain or update a streaming job.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Pick the simplest managed answer</h3>
              <p>
                When several designs work, the best answer usually meets the requirement with the least to run: a BigQuery subscription instead of a pipeline, a scheduled query instead of an Airflow environment, an ephemeral cluster instead of a persistent one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak section</h3>
              <p>
                Tigertest tracks your accuracy by section. Google does not publish a passing score, so retake the drill you missed most until you clear 80 percent with room to spare, then take Practice Test 2 cold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Professional Data Engineer Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcppde" />
        </div>
      </div>

      <SampleQuestionsV2 examId="gcppde" />

      <ExamRelatedTests examId="gcppde" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Professional Data Engineer?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five sections.</p>
          <ExamLandingCTA dashboardHref="/google-cloud-professional-data-engineer/dashboard" />
        </div>
      </div>
    </div>
  );
}
