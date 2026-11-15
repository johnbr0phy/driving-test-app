import "@/lib/banks/hspacis";
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

const title = "Free CIS Practice Test 2026 - HSPA Certified Instrument Specialist Questions";
const metaDescription =
  "Free-to-start CIS practice test: 200 original questions on the HSPA Certified Instrument Specialist outline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Healthcare Sterile Processing Association (HSPA) Certified Instrument Specialist (CIS) exam: 200 original questions written from HSPA's published exam content outline, FDA's device classification rules and reprocessing guidance, and CDC's sterilization recommendations. Four 50-question practice tests weighted like the real exam's six sections, and five training sets covering decontamination and instrument grades, specialty instruments and implants, inspection, testing and repair, quality and information systems, and packaging and sterilization.";

const faqs = [
  {
    q: "What is the HSPA CIS exam?",
    a: "It is the certification exam for the Certified Instrument Specialist credential from the Healthcare Sterile Processing Association (HSPA). It covers the identification, cleaning, inspection, testing, assembly, packaging and tracking of surgical instruments, along with implants, loaned instrumentation and water quality. CIS is a secondary certification: candidates must hold a current CRCST and document 200 hours of hands-on sterile processing experience, separate from the hours used for the CRCST.",
  },
  {
    q: "How many questions are on the CIS exam?",
    a: "HSPA's certification handbook gives the CIS exam 150 multiple-choice questions: 125 scored and 25 unscored pretest questions mixed in so they cannot be told apart. It is taken on a computer at a Prometric test center, there is no paper version, and candidates have 3 hours. Questions can be marked for review and changed later in the exam.",
  },
  {
    q: "What score do you need to pass the CIS exam?",
    a: "HSPA does not publish a percentage. Pass or fail is decided by the number of scored questions answered correctly, against a passing point set by the Angoff procedure with the Beuk compromise and approved by the Certification Council. The 70 percent line on these practice tests is a readiness target, not HSPA's standard.",
  },
  {
    q: "What is on the CIS exam?",
    a: "HSPA's content outline, revised October 2024, has six sections. Instrumentation identification is the largest at 32 percent, covering surgical and floor grade instruments, specialty instruments and terminology, materials and finishes, implants and marking methods. Inspection, testing, integrity and assembly and quality and information systems are 20 percent each, decontamination processes is 12 percent, preparation and packaging is 10 percent, and disinfection and sterilization processes is 6 percent. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real CIS exam questions?",
    a: "No. Every question is original, written by Tigertest from HSPA's published content outline and from public sources such as FDA's device classification rules and reprocessing guidance and CDC's sterilization recommendations. Instruments are described in words, not pictures. Always follow the manufacturer's instructions for use for each instrument and product. Tigertest is not affiliated with the Healthcare Sterile Processing Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cis practice test, cis exam, hspa cis practice test, certified instrument specialist practice exam, surgical instrument certification, cis exam questions 2026, instrument specialist exam, sterile processing instrument test",
  alternates: {
    canonical: `${siteUrl}/cis-instrument-specialist-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cis-instrument-specialist-practice-test`,
    images: [{ url: shareImageUrl("hspacis"), width: 1200, height: 630, alt: "Tigertest free CIS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hspacis")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CIS (HSPA) Practice Test",
      description,
      url: `${siteUrl}/cis-instrument-specialist-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hspacis"),
      featureList: [
        "200 CIS (HSPA) practice questions",
        "4 practice tests of 50 questions weighted like the HSPA CIS content outline",
        "5 training sets by outline section",
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
        classFaqJsonLd("hspacis"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Instrumentation Identification", weight: "32%" },
  { name: "Instrumentation Inspection, Testing, Integrity and Assembly", weight: "20%" },
  { name: "Quality and Information Systems", weight: "20%" },
  { name: "Decontamination Processes", weight: "12%" },
  { name: "Preparation and Packaging", weight: "10%" },
  { name: "Disinfection and Sterilization Processes", weight: "6%" },
];

export default function HspaCisLandingPage() {
  return (
    <div data-theme="hspacis" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CIS Instrument Specialist Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cis/dashboard"
            shortName="CIS"
            subtitle="200 original questions on the HSPA CIS exam content outline: instrument identification, materials, inspection and testing, implants, packaging, loaners, tracking and water quality. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/hspacis-mobile.png", desktop: "/landing/hspacis-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hspacis" />

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
                Five training sets follow the HSPA CIS outline: decontamination and instrument grades; specialty instruments and implants; inspection, testing and repair; quality and information systems; and packaging and sterilization. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the six sections of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the HSPA CIS Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                HSPA publishes the weight of each of the six sections, and every practice test here keeps that balance, scaled to 50 questions: 16 on instrumentation identification, 10 each on inspection and testing and on quality and information systems, 6 on decontamination, 5 on packaging and 3 on disinfection and sterilization. Sterile processing program instructors can set Tigertest as CIS review at{" "}
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
                src={getTigerAsset("hspacis", 1)}
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
            How to Pass the CIS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the instruments by name and use</h3>
              <p>
                Instrumentation identification is 32% of the exam. Learn the instruments of each specialty, from rongeurs, osteotomes and reamers to lid specula, bulldog clamps and cervical dilators, the surgical terms that name procedures, and how grade, metal and finish change how an instrument is used and cared for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Inspect and test like a specialist</h3>
              <p>
                Inspection, testing and assembly are 20%. Know what magnification, a borescope, an insulation tester and test media show, how to tell staining from rust, when an instrument goes for repair, and how preventive maintenance keeps sets in service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip quality and systems</h3>
              <p>
                Quality and information systems are another 20%. Know UDI and tracking systems, count sheet upkeep, the loaner process from receipt to pickup, water categories and what poor water does to steel, and the audits and teamwork that cut immediate-use sterilization.
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
          CIS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hspacis" />
        </div>
      </div>

      <ExamSampleQuestions examId="hspacis" />

      <ExamRelatedTests examId="hspacis" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CIS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of the HSPA CIS content outline.</p>
          <ExamLandingCTA dashboardHref="/cis/dashboard" />
        </div>
      </div>
    </div>
  );
}
