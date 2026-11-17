import "@/lib/banks/ncpt";
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
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "NCPT Practice Test 2026 - Free NCCT Phlebotomy Technician Questions";
const metaDescription =
  "Free-to-start NCPT (NCCT) practice test: 200 original questions on the NCCT NCPT detailed test plan, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the National Center for Competency Testing (NCCT) National Certified Phlebotomy Technician (NCPT) exam: 200 original questions written from NCCT's published detailed test plan. Four 50-question practice tests weighted like the real exam's content categories, and four training sets covering infection control and equipment, patient preparation and blood collection, processing and complications, and law and ethics.";

const faqs = [
  {
    q: "What is the NCPT exam?",
    a: "It is the certification exam for the National Certified Phlebotomy Technician credential from the National Center for Competency Testing (NCCT). It covers infection control and safety, equipment selection, patient and site preparation, specimen collection, collection complications, and law and ethics. Candidates qualify through an NCCT-authorized phlebotomy program, formal military training, or a year of verified full-time work as a phlebotomy technician within the past five years, and most pathways also need a signed critical skills form.",
  },
  {
    q: "How many questions are on the NCPT exam?",
    a: "NCCT's detailed test plan, effective January 2025, lists 100 scored questions and 25 unscored pretest questions, with three hours to finish. About 92% are four-option multiple choice and 8% are alternative items such as drag and drop, multi-select and hotspot. The exam is on a computer, at a test site or by remote testing, and is offered in English only.",
  },
  {
    q: "What score do you need to pass the NCPT exam?",
    a: "NCCT reports scores from 200 to 720, and the pass point is a scaled 575, set by a panel of subject matter experts. It is not a fixed percentage, so the 70 percent line on these practice tests is a readiness target. After a failed attempt you wait 30 days for a second or third try, 90 days after a third failure, and 180 days with an appeal after that.",
  },
  {
    q: "What is on the NCPT exam?",
    a: "The test plan has five content categories: Infection Control and Safety 15 questions, Preparing for Specimen Collection 25 (Equipment Selection 12, Patient and Site Preparation 13), Specimen Collection 30, Collection Complications and Troubleshooting 15, and Law and Ethics 15. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real NCPT exam questions?",
    a: "No. Every question is original, written by Tigertest from NCCT's published test plan and the standards it names, such as the CLSI order of draw, OSHA's Bloodborne Pathogens standard, HIPAA and CLIA, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the National Center for Competency Testing.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ncpt practice test, ncpt exam, ncct phlebotomy practice test, national certified phlebotomy technician practice exam, ncct phlebotomy exam questions, ncpt certification 2026, ncct practice test, phlebotomy practice test",
  alternates: {
    canonical: `${siteUrl}/ncpt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ncpt-practice-test`,
    images: [{ url: shareImageUrl("ncpt"), width: 1200, height: 630, alt: "Tigertest free NCPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ncpt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NCPT (NCCT) Practice Test",
      description,
      url: `${siteUrl}/ncpt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ncpt"),
      featureList: [
        "200 NCPT (NCCT) practice questions",
        "4 practice tests of 50 questions weighted like the NCCT NCPT test plan",
        "4 training sets by content category",
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
        classFaqJsonLd("ncpt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Specimen Collection", weight: "30 items" },
  { name: "Infection Control and Safety", weight: "15 items" },
  { name: "Collection Complications and Troubleshooting", weight: "15 items" },
  { name: "Law and Ethics", weight: "15 items" },
  { name: "Patient and Site Preparation", weight: "13 items" },
  { name: "Equipment Selection", weight: "12 items" },
];

export default function NcptLandingPage() {
  return (
    <div data-theme="ncpt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCPT (NCCT) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ncpt/dashboard"
            shortName="NCPT"
            subtitle="200 original questions on the NCCT NCPT test plan: infection control, equipment, patient preparation, venipuncture and capillary collection, processing, complications, and law and ethics. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/ncpt-mobile.png", desktop: "/landing/ncpt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ncpt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets cover every content category of the NCCT test plan: infection control and equipment; patient preparation and blood collection; processing and complications; and law and ethics. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each weighted like the 100 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NCCT NCPT Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NCCT publishes how many of the 100 scored questions come from each content category, and every practice test here keeps that balance, scaled to 50 questions. Specimen collection is the largest area, at 30 of the 100. Phlebotomy program instructors can set Tigertest as NCPT review at{" "}
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
                src={getTigerAsset("ncpt", 3)}
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
            How to Pass the NCPT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master specimen collection</h3>
              <p>
                Specimen collection is 30 of the 100 scored questions. Know the CLSI order of draw, which tests go in which tube, needle angle and anchoring, blood cultures, capillary punctures, point-of-care tests, non-blood specimens and how specimens are labeled, handled and processed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn your equipment and site choices</h3>
              <p>
                Preparing for collection is 25 items. Know tube additives, needle gauges, antiseptics, latex alternatives, patient identification, tourniquet use, and which veins and capillary sites to choose or avoid.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill safety, complications and the law</h3>
              <p>
                Infection control, complications and law and ethics are 15 items each. Learn OSHA&apos;s bloodborne pathogens rules, isolation precautions, how to handle a hematoma, fainting or a missed vein, causes of hemolysis, consent, HIPAA, CLIA and chain of custody.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCPT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ncpt" />
        </div>
      </div>

      <ExamSampleQuestions examId="ncpt" />

      <ExamRelatedTests examId="ncpt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NCPT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content category of the NCCT NCPT test plan.</p>
          <ExamLandingCTA dashboardHref="/ncpt/dashboard" />
        </div>
      </div>
    </div>
  );
}
