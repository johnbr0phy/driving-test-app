import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "RBT Practice Test 2026 - Free RBT Exam Questions (3rd Ed.)";
const metaDescription =
  "Free RBT practice test: 200 original questions on the BACB RBT Test Content Outline (3rd ed.), four 50-question mock exams and four training sets, every answer explained.";
const description =
  "Free practice for the BACB Registered Behavior Technician (RBT) exam: 200 original questions written from the RBT Test Content Outline (3rd edition), in effect since January 2026. Four 50-question mock exams weighted like the real 75 scored questions, and four training sets covering data collection and graphing, behavior assessment, behavior acquisition, behavior reduction, documentation and reporting, and ethics.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rbt practice test, rbt exam practice, registered behavior technician practice test, rbt exam questions, rbt mock exam, rbt 3rd edition test content outline, rbt exam 2026, aba technician exam, bacb rbt exam",
  alternates: {
    canonical: `${siteUrl}/rbt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rbt-practice-test`,
    images: [{ url: shareImageUrl("rbt"), width: 1200, height: 630, alt: "Tigertest free RBT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rbt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RBT Practice Test",
      description,
      url: `${siteUrl}/rbt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 RBT practice questions",
        "4 mock exams of 50 questions weighted like the RBT Test Content Outline (3rd ed.)",
        "4 training sets by content domain",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the RBT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Registered Behavior Technician exam is the BACB certification exam for entry-level behavior technicians who deliver applied behavior analysis (ABA) services under supervision. You take it at a Pearson VUE test center after completing the 40-hour training, the initial competency assessment and the BACB application.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the RBT exam and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam has 85 multiple-choice questions in 90 minutes: 75 are scored and 10 are unscored. Each question has four options and one correct answer. The result is pass or fail against a passing score set by a panel of experts (the modified Angoff method), and the BACB does not publish it as a percentage, so the 80 percent line on these practice tests is a readiness target, not the official pass mark.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the RBT exam in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Since January 1, 2026 the exam follows the RBT Test Content Outline (3rd edition): Data Collection and Graphing 13 scored questions, Behavior Assessment 8, Behavior Acquisition 19, Behavior Reduction 14, Documentation and Reporting 10, and Ethics 11. Each 50-question practice test here keeps that balance.",
          },
        },
        {
          "@type": "Question",
          name: "What changed with the RBT 3rd edition outline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The 3rd edition replaced the RBT Task List (2nd edition). Skill Acquisition became Behavior Acquisition with a smaller share, Measurement became Data Collection and Graphing with new tasks on summarizing data and reading trends, and Professional Conduct became Ethics, with specific tasks on supervision, confidentiality, public statements, multiple relationships and gifts.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real RBT exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the BACB's published RBT Test Content Outline and ethics code, so it tests the same skills without copying the exam. It is free practice, not an official BACB product, and it does not replace your training, competency assessment or supervisor.",
          },
        },
        classFaqJsonLd("rbt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Data Collection & Graphing", weight: "17%" },
  { name: "Behavior Assessment", weight: "11%" },
  { name: "Behavior Acquisition", weight: "25%" },
  { name: "Behavior Reduction", weight: "19%" },
  { name: "Documentation & Reporting", weight: "13%" },
  { name: "Ethics", weight: "15%" },
];

export default function RbtLandingPage() {
  return (
    <div data-theme="rbt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RBT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rbt/dashboard"
            shortName="RBT"
            subtitle="200 original questions on the RBT Test Content Outline (3rd ed.): measurement, assessment, teaching, behavior reduction, documentation and ethics. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rbt-mobile.png", desktop: "/landing/rbt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rbt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the outline: data collection and assessment; behavior acquisition; behavior reduction; and documentation, reporting and ethics. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions, each weighted like the 75 scored questions on the real exam. Aim for 80% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the RBT Test Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The BACB publishes how many of the 75 scored questions come from each domain, and every mock exam here keeps that balance, scaled to 50 questions. Behavior acquisition is the biggest domain, followed by behavior reduction and data collection. Supervisors and trainers running the 40-hour course can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("rbt", 1)}
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
            How to Pass the RBT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your measurement types cold</h3>
              <p>
                Frequency, rate, duration, latency and interresponse time are continuous; partial interval, whole interval and momentary time sampling are not. Know which one overestimates, which underestimates, and which fits a behavior you want to increase or decrease.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Name the function, then the procedure</h3>
              <p>
                Most behavior reduction questions turn on function: attention, escape, tangible or automatic. Match extinction and replacement behaviors to that function, and remember the extinction burst before things improve.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Stay inside the RBT role</h3>
              <p>
                Ethics, documentation and reporting together are almost a third of the exam. The right answer is usually to follow the written plan, report objectively and promptly, and ask your supervisor, never to design or change a plan yourself.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 80% or better on every mock exam before you book. After each test, drill the questions you missed and retrain the weakest domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RBT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the RBT exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Registered Behavior Technician exam is the BACB certification exam for entry-level behavior technicians who deliver applied behavior analysis (ABA) services under supervision. You take it at a Pearson VUE test center after completing the 40-hour training, the initial competency assessment and the BACB application.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the RBT exam and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam has 85 multiple-choice questions in 90 minutes: 75 are scored and 10 are unscored. Each question has four options and one correct answer. The result is pass or fail against a passing score set by a panel of experts (the modified Angoff method), and the BACB does not publish it as a percentage, so the 80 percent line on these practice tests is a readiness target, not the official pass mark.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the RBT exam in 2026?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Since January 1, 2026 the exam follows the RBT Test Content Outline (3rd edition): Data Collection and Graphing 13 scored questions, Behavior Assessment 8, Behavior Acquisition 19, Behavior Reduction 14, Documentation and Reporting 10, and Ethics 11. Each 50-question practice test here keeps that balance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What changed with the RBT 3rd edition outline?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The 3rd edition replaced the RBT Task List (2nd edition). Skill Acquisition became Behavior Acquisition with a smaller share, Measurement became Data Collection and Graphing with new tasks on summarizing data and reading trends, and Professional Conduct became Ethics, with specific tasks on supervision, confidentiality, public statements, multiple relationships and gifts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real RBT exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the BACB&apos;s published RBT Test Content Outline and ethics code, so it tests the same skills without copying the exam. It is free practice, not an official BACB product, and it does not replace your training, competency assessment or supervisor.
            </p>
          </div>
          <ExamClassFaq examId="rbt" />
        </div>
      </div>

      <ExamRelatedTests examId="rbt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RBT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every domain of the RBT outline.</p>
          <ExamLandingCTA dashboardHref="/rbt/dashboard" />
        </div>
      </div>
    </div>
  );
}
