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

const siteUrl = SITE_URL;

const title = "Firefighter I Practice Test 2026 - Free NFPA 1010 Exam Prep";
const metaDescription =
  "Free Firefighter I practice test: 200 original questions on the NFPA 1010 Firefighter I job performance requirements, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Firefighter I written certification exam: 200 original questions written from the NFPA 1010 Firefighter I job performance requirements. Four mock tests of 50 questions with a 70 percent pass line, and four training sets covering safety and incident command, fire behavior and building construction, PPE and SCBA, extinguishers, ropes and forcible entry, ground ladders, search, rescue and ventilation, water supply, hose and fire streams, and fire control, overhaul and utilities.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "firefighter i practice test, firefighter 1 practice test, firefighter i exam, firefighter 1 certification test, nfpa 1010 firefighter i, nfpa 1001 practice test, firefighter written exam questions, fire academy test prep, firefighter i study guide 2026",
  alternates: {
    canonical: `${siteUrl}/firefighter-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/firefighter-practice-test`,
    images: [{ url: shareImageUrl("ffi"), width: 1200, height: 630, alt: "Tigertest free Firefighter I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ffi")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Firefighter I Practice Test",
      description,
      url: `${siteUrl}/firefighter-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Firefighter I practice questions",
        "4 mock tests of 50 questions with a 70% pass line",
        "4 training sets, one per mock test",
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
          name: "What is the Firefighter I exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the written certification test for Firefighter I, the entry level of firefighter certification under NFPA 1010, the professional qualifications standard that replaced NFPA 1001 in 2024. A state fire training agency or an accredited certifying body gives it, usually after a fire academy course, along with a practical skills test.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the Firefighter I written test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the certifying agency. Many states give about 100 multiple-choice questions and require 70 percent, but the count, time limit and pass mark are set by each agency, so check with yours. Every mock test here has 50 questions and uses a 70 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the Firefighter I exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The job performance requirements for Firefighter I: safety, communications and incident command, fire behavior and building construction, PPE and SCBA, portable extinguishers, ropes and knots, forcible entry, ground ladders, search and rescue, ventilation, water supply, hose and fire streams, fire control, overhaul and utility control. Most programs also certify hazardous materials awareness and operations alongside it.",
          },
        },
        {
          "@type": "Question",
          name: "Do I also need a skills test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Firefighter I certification has a written exam and a practical skills exam, where you perform tasks such as donning SCBA, raising ladders, tying knots and advancing a hoseline. This site prepares you for the written part; your academy prepares you for the skills.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Firefighter I exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the NFPA 1010 Firefighter I job performance requirements and widely taught fire service practice, so it tests the same knowledge without copying any certifying agency's test bank or textbook. It is free study practice, not an official exam.",
          },
        },
        classFaqJsonLd("ffi"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Safety, Communications & Command", weight: "14%" },
  { name: "Fire Behavior & Building Construction", weight: "14%" },
  { name: "PPE & SCBA", weight: "14%" },
  { name: "Extinguishers, Ropes & Forcible Entry", weight: "12%" },
  { name: "Ground Ladders", weight: "10%" },
  { name: "Search, Rescue & Ventilation", weight: "12%" },
  { name: "Water Supply, Hose & Fire Streams", weight: "16%" },
  { name: "Fire Control, Overhaul & Utilities", weight: "8%" },
];

export default function FirefighterLandingPage() {
  return (
    <div data-theme="ffi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Firefighter I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/firefighter/dashboard"
            shortName="Firefighter I"
            subtitle="200 original questions on the NFPA 1010 Firefighter I job performance requirements: safety, fire behavior, SCBA, ladders, ventilation, hose and fire attack. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ffi-mobile.png", desktop: "/landing/ffi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ffi" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train for Each Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, each holding exactly one mock test&apos;s 50 questions across all eight topic areas. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, each needing 70 percent to pass. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Firefighter I Standard
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Certifying agencies do not publish one national blueprint, so each mock test here follows the NFPA 1010 Firefighter I job performance requirements, weighted toward the skills crews use most: water supply and hose, PPE and SCBA, safety and fire behavior. Fire academy instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("ffi", 1)}
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
            How to Pass the Firefighter I Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers cold</h3>
              <p>
                Written exams love figures: water expands about 1,700 times as steam, a gallon weighs 8.34 pounds, smooth-bore handlines run at 50 psi and fog nozzles at 100, ladders climb at about 75 degrees and stay 10 feet from power lines, and the SCBA low-air alarm sounds with about a third of the air left.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know why, not just what</h3>
              <p>
                Many questions test the reason behind a rule: why ventilation is coordinated with fire attack, why lightweight trusses fail early, why a dry-barrel hydrant is opened fully. If you can explain the reason, you can answer the question however it is worded.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Tie the book to the drill ground</h3>
              <p>
                Say each skill out loud as you practice it at the academy: the parts of the ladder as you raise it, the name of each knot as you tie it, the SCBA checks as you don it. The written test asks about the same steps your skills evaluator watches.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80 percent or better on every mock test before your certification exam. After each test, drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Firefighter I Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Firefighter I exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the written certification test for Firefighter I, the entry level of firefighter certification under NFPA 1010, the professional qualifications standard that replaced NFPA 1001 in 2024. A state fire training agency or an accredited certifying body gives it, usually after a fire academy course, along with a practical skills test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Firefighter I written test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It depends on the certifying agency. Many states give about 100 multiple-choice questions and require 70 percent, but the count, time limit and pass mark are set by each agency, so check with yours. Every mock test here has 50 questions and uses a 70 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does the Firefighter I exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The job performance requirements for Firefighter I: safety, communications and incident command, fire behavior and building construction, PPE and SCBA, portable extinguishers, ropes and knots, forcible entry, ground ladders, search and rescue, ventilation, water supply, hose and fire streams, fire control, overhaul and utility control. Most programs also certify hazardous materials awareness and operations alongside it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I also need a skills test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Firefighter I certification has a written exam and a practical skills exam, where you perform tasks such as donning SCBA, raising ladders, tying knots and advancing a hoseline. This site prepares you for the written part; your academy prepares you for the skills.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Firefighter I exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the NFPA 1010 Firefighter I job performance requirements and widely taught fire service practice, so it tests the same knowledge without copying any certifying agency&apos;s test bank or textbook. It is free study practice, not an official exam.
            </p>
          </div>
          <ExamClassFaq examId="ffi" />
        </div>
      </div>

      <ExamRelatedTests examId="ffi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Firefighter I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every Firefighter I topic.</p>
          <ExamLandingCTA dashboardHref="/firefighter/dashboard" />
        </div>
      </div>
    </div>
  );
}
