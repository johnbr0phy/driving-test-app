import "@/lib/banks/cbspd";
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

const title = "Free CSPDT Practice Test 2026 - CBSPD Sterile Processing Technician Questions";
const metaDescription =
  "Free-to-start CBSPD CSPDT practice test: 200 original questions on the 2026 CBSPD technician exam outline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Certification Board for Sterile Processing and Distribution (CBSPD) Certified Sterile Processing and Distribution Technician (CSPDT) exam: 200 original questions written from the eight-area technician exam outline in CBSPD's 2026 candidate bulletin and from CDC, OSHA and FDA guidance. Four 50-question practice tests weighted like the real exam, and five training sets covering roles and life science, decontamination and disinfection, preparation and handling, sterilization, and storage, patient care equipment and ethics.";

const faqs = [
  {
    q: "What is the CBSPD CSPDT exam?",
    a: "It is the certification exam for the Certified Sterile Processing and Distribution Technician credential from the Certification Board for Sterile Processing and Distribution (CBSPD). It is written for technicians with about one year of experience and covers safety and regulations, microbiology, decontamination, instrument preparation and packaging, sterilization, sterile storage and distribution, patient care equipment and ethics.",
  },
  {
    q: "How many questions are on the CSPDT exam?",
    a: "CBSPD's 2026 candidate bulletin gives the technician exam 150 multiple-choice questions: 125 scored and 25 unscored pretest questions. Candidates have 3 hours, and the exam is taken on a computer at PSI test centers, offered four times a year in a one-week window.",
  },
  {
    q: "What score do you need to pass the CSPDT?",
    a: "The passing scaled score is 70. That is a scaled score, not 70 percent correct, because each form of the exam has its own raw-to-scale conversion. Candidates testing in the U.S. get an official pass or fail at the end of the exam; passing candidates get no numeric score, and failing candidates get their score with a report by content area. The 70 percent line on these practice tests is a readiness target.",
  },
  {
    q: "How is the CSPDT different from the HSPA CRCST?",
    a: "They are separate certifications from separate boards. The CSPDT comes from CBSPD and follows CBSPD's own eight-area outline, led by decontamination and disinfection at 19 percent and sterilization at 18 percent, and it is valid for five years with 100 recertification points. The CRCST comes from the Healthcare Sterile Processing Association (HSPA), with its own outline and yearly continuing education. Tigertest has a separate practice test for each.",
  },
  {
    q: "Are these the real CSPDT exam questions?",
    a: "No. Every question is original, written by Tigertest from CBSPD's published exam outline and from public guidance such as CDC's Guideline for Disinfection and Sterilization in Healthcare Facilities and OSHA's standards. Always follow the manufacturer's instructions for use for each device and product. Tigertest is not affiliated with the Certification Board for Sterile Processing and Distribution.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cspdt practice test, cbspd practice test, cbspd exam, certified sterile processing and distribution technician, cspdt exam questions 2026, cbspd technician exam, sterile processing certification practice test, central service technician exam",
  alternates: {
    canonical: `${siteUrl}/cbspd-cspdt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cbspd-cspdt-practice-test`,
    images: [{ url: shareImageUrl("cbspd"), width: 1200, height: 630, alt: "Tigertest free CSPDT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cbspd")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CSPDT (CBSPD) Practice Test",
      description,
      url: `${siteUrl}/cbspd-cspdt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cbspd"),
      featureList: [
        "200 CSPDT (CBSPD) practice questions",
        "4 practice tests of 50 questions weighted like the CBSPD technician exam outline",
        "5 training sets by outline area",
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
        classFaqJsonLd("cbspd"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Decontamination and Disinfection", weight: "19%" },
  { name: "Sterilization", weight: "18%" },
  { name: "Preparation and Handling", weight: "16%" },
  { name: "Roles and Responsibilities", weight: "13%" },
  { name: "Sterile Storage, Inventory Management and Distribution", weight: "11%" },
  { name: "Life Science", weight: "9%" },
  { name: "Ethics", weight: "8%" },
  { name: "Patient Care Equipment", weight: "6%" },
];

export default function CbspdCspdtLandingPage() {
  return (
    <div data-theme="cbspd" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CBSPD CSPDT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cspdt/dashboard"
            shortName="CSPDT"
            subtitle="200 original questions on the 2026 CBSPD technician exam outline: safety and regulations, decontamination, instrument preparation and packaging, sterilization, sterile storage and ethics. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cbspd-mobile.png", desktop: "/landing/cbspd-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cbspd" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Outline Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the CBSPD technician outline: roles and life science; decontamination and disinfection; preparation and handling; sterilization; and sterile storage, patient care equipment and ethics. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the eight content areas of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CBSPD Technician Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CBSPD&apos;s 2026 candidate bulletin gives the weight of each of the eight content areas, and every practice test here keeps that balance, scaled to 50 questions: 9 each on decontamination and sterilization, 8 on preparation and handling, 7 on roles and responsibilities, 6 on storage and distribution, 4 each on life science and ethics, and 3 on patient care equipment. Sterile processing program instructors can set Tigertest as CSPDT review at{" "}
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
                src={getTigerAsset("cbspd", 1)}
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
            How to Pass the CSPDT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own decontamination and sterilization</h3>
              <p>
                Decontamination and disinfection (19%) and sterilization (18%) are over a third of the exam. Know detergent types, washer and ultrasonic checks, high-level disinfectant testing and PPE, then the parameters of each sterilization method and how mechanical, chemical and biological monitors are read and recorded.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your instruments and packaging</h3>
              <p>
                Preparation and handling is 16%. Learn instrument parts and names, how to inspect and test them, how trays are configured, and which packaging and indicators suit each sterilization method.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip the rules and the people side</h3>
              <p>
                Roles and responsibilities, life science and ethics add up to 30% of this outline. Know OSHA&apos;s bloodborne pathogens and ethylene oxide rules, Safety Data Sheets, IFU symbols, CJD handling, basic microbiology and medical terms, and what professional conduct looks like when a record or a step is skipped.
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
          CSPDT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cbspd" />
        </div>
      </div>

      <ExamSampleQuestions examId="cbspd" />

      <ExamRelatedTests examId="cbspd" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CSPDT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the CBSPD technician exam outline.</p>
          <ExamLandingCTA dashboardHref="/cspdt/dashboard" />
        </div>
      </div>
    </div>
  );
}
