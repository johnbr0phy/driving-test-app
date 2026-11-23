import "@/lib/banks/carsrefrig";
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
const path = "/red-seal-refrigeration-air-conditioning-mechanic-practice-test";

const title = "Free Red Seal Refrigeration Practice Test 2026 - 313A Exam Prep";
const metaDescription =
  "Red Seal Refrigeration and Air Conditioning Mechanic practice: 200 original questions on refrigerants, brazing, evacuation, charging, controls and troubleshooting. Start free.";
const description =
  "Practice for the Red Seal Refrigeration and Air Conditioning Mechanic interprovincial exam (313A in Ontario): 200 original questions across the six Major Work Activities of the Red Seal Occupational Standard, from safety, brazing, leak testing, evacuation and refrigerants to installation, controls, commissioning, maintenance and troubleshooting. Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal refrigeration practice test, 313A practice exam, refrigeration and air conditioning mechanic exam questions, Red Seal RACM exam, refrigeration mechanic certificate of qualification, Red Seal refrigeration 2026, HVACR exam practice Canada",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("carsrefrig"), width: 1200, height: 630, alt: "Tigertest Red Seal Refrigeration and Air Conditioning Mechanic practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("carsrefrig")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Red Seal Refrigeration and Air Conditioning Mechanic Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("carsrefrig", "CAD"),
      featureList: [
        "200 Red Seal Refrigeration and Air Conditioning Mechanic practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Tests weighted like the Red Seal exam breakdown by Major Work Activity",
        "5 training sets by topic",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the Red Seal Refrigeration and Air Conditioning Mechanic exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives four hours to write it. A calculator is provided if you need one, and the formulas used on the exam are given to you at the sitting.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal Refrigeration and Air Conditioning Mechanic exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Red Seal's exam breakdown spreads the 125 questions over six Major Work Activities: maintenance and service 31, installation 26, commissioning 22, routine trade activities such as brazing, leak testing, evacuation and refrigerant handling 20, planning installation and retrofits 16, and common occupational skills 10. The practice tests here keep those proportions in 50 questions.",
          },
        },
        {
          "@type": "Question",
          name: "Which standard is the exam based on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Red Seal published a new Occupational Standard for the trade in 2024 and says new exams based on it are under development, while current exams were built on the previous standard. The exam breakdown on red-seal.ca already uses the new task numbering, and the two standards cover the same core work. Check with your apprenticeship authority which version you will write.",
          },
        },
        {
          "@type": "Question",
          name: "Is 313A the same as the Red Seal exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "313A is the Ontario trade code for Refrigeration and Air Conditioning Systems Mechanic. Ontario candidates who pass the interprovincial exam earn the Red Seal endorsement, the same exam written across Canada. Eligibility, booking, fees and retake rules are set by each province or territory, so check with yours before you apply.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Red Seal exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the Occupational Standard, the Federal Halocarbon Regulations and Environment and Climate Change Canada's code of practice, so it covers the same tasks without copying the exam. Tigertest is not affiliated with the Red Seal Program. Refrigerant handling certificates and rules also vary by province, so follow your provincial rules and the equipment maker's instructions.",
          },
        },
        classFaqJsonLd("carsrefrig"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Common Occupational Skills", weight: "8%" },
  { name: "B. Routine Trade Activities", weight: "16%" },
  { name: "C. Plans Installation", weight: "12%" },
  { name: "D. Performs Installation", weight: "20%" },
  { name: "E. Performs Commissioning", weight: "18%" },
  { name: "F. Maintenance and Service", weight: "26%" },
];

export default function RedSealRefrigerationLandingPage() {
  return (
    <div data-theme="carsrefrig" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Refrigeration Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-refrigeration/dashboard"
            shortName="Red Seal Refrigeration"
            subtitle="200 Refrigeration and Air Conditioning Mechanic questions with the real 70% pass mark. Free to start, no account needed."
            shots={{ mobile: "/landing/carsrefrig-mobile.png", desktop: "/landing/carsrefrig-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="carsrefrig" />
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets by topic, from Safety, Tools &amp; Trade Practices to Control Systems. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the Red Seal exam breakdown, with the same 70% pass mark and an explanation of the right answer on every question.
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
                Built on the Red Seal Exam Breakdown
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Red Seal publishes how many of the 125 questions come from each of the six Major Work Activities in the Occupational Standard for Refrigeration and Air Conditioning Mechanic, and the practice tests here keep that split in 50 questions. Maintenance and service carries the most weight, about a quarter of the exam, with installation and commissioning close behind. Instructors running a refrigeration apprenticeship class can assign Tigertest at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which work activities the class misses most.
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
                src={getTigerAsset("carsrefrig", 3)}
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
            How to Pass the Red Seal Refrigeration Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the system, not one gauge</h3>
              <p>
                Most troubleshooting questions give two or three readings. Learn what superheat, subcooling, suction and head pressure each do with an undercharge, an overcharge, a restriction, low airflow and a dirty condenser, so you can match a pattern instead of guessing from one number.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the procedures step by step</h3>
              <p>
                Brazing with a nitrogen purge, pressure testing with a regulated nitrogen cylinder, deep evacuation with a micron gauge and decay test, weighing in the charge and charging blends as liquid all come up as &quot;what comes first&quot; questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn controls and the refrigerant rules</h3>
              <p>
                Thermostat terminals, pressure controls, defrost, sensors and building automation are a large share of installation and service. Pair them with the federal halocarbon rules on releases, leak tests and recovery, and the ASHRAE 34 safety classes for A1, A2L and A3 refrigerants.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% line. After each test, drill the questions you missed and retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Refrigeration Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal Refrigeration and Air Conditioning Mechanic exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives four hours to write it. A calculator is provided if you need one, and the formulas used on the exam are given to you at the sitting.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal Refrigeration and Air Conditioning Mechanic exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Red Seal&apos;s exam breakdown spreads the 125 questions over six Major Work Activities: maintenance and service 31, installation 26, commissioning 22, routine trade activities such as brazing, leak testing, evacuation and refrigerant handling 20, planning installation and retrofits 16, and common occupational skills 10. The practice tests here keep those proportions in 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which standard is the exam based on?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Red Seal published a new Occupational Standard for the trade in 2024 and says new exams based on it are under development, while current exams were built on the previous standard. The exam breakdown on red-seal.ca already uses the new task numbering, and the two standards cover the same core work. Check with your apprenticeship authority which version you will write.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is 313A the same as the Red Seal exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              313A is the Ontario trade code for Refrigeration and Air Conditioning Systems Mechanic. Ontario candidates who pass the interprovincial exam earn the Red Seal endorsement, the same exam written across Canada. Eligibility, booking, fees and retake rules are set by each province or territory, so check with yours before you apply.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Red Seal exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the Occupational Standard, the Federal Halocarbon Regulations and Environment and Climate Change Canada&apos;s code of practice, so it covers the same tasks without copying the exam. Tigertest is not affiliated with the Red Seal Program. Refrigerant handling certificates and rules also vary by province, so follow your provincial rules and the equipment maker&apos;s instructions.
            </p>
          </div>
          <ExamClassFaq examId="carsrefrig" />
        </div>
      </div>

      <ExamSampleQuestions examId="carsrefrig" />

      <ExamRelatedTests examId="carsrefrig" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all six Major Work Activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-refrigeration/dashboard" />
        </div>
      </div>
    </div>
  );
}
