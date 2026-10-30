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

const title = "Red Seal Electrician Practice Test 2026 (309A) - Free Exam Prep";
const metaDescription =
  "Free Red Seal Construction Electrician practice test: 200 original questions on services, grounding, wiring, motors, controls and fire alarm, weighted like the real exam.";
const description =
  "Free practice for the interprovincial Red Seal Construction Electrician exam (309A in Ontario): 200 original questions across the five major work activities of the Red Seal Occupational Standard, covering safety and tools, services, protection, grounding and bonding, transformers, wiring methods, heating and emergency lighting, motors, drives and controls, fire alarm and communication systems. Four 50-question tests weighted like the real exam, with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal electrician practice test, 309A practice exam, construction electrician Red Seal exam, Red Seal exam questions electrician, Canadian Electrical Code practice questions, electrician certificate of qualification exam, free Red Seal practice test",
  alternates: {
    canonical: `${siteUrl}/red-seal-electrician-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/red-seal-electrician-practice-test`,
    images: [{ url: "/og/caelec", width: 1200, height: 630, alt: "Tigertest free Red Seal Construction Electrician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/caelec"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Construction Electrician Practice Test",
      description,
      url: `${siteUrl}/red-seal-electrician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Red Seal Construction Electrician practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Weighted by the Red Seal exam breakdown for the five major work activities",
        "Instant feedback with explanations",
        "Class mode for apprenticeship instructors",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the Red Seal Construction Electrician exam, and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The interprovincial Red Seal exam for Construction Electrician has 100 multiple-choice questions, each with four options and one correct answer. You have four hours and need 70 percent to pass. The exam centre supplies a calculator and any code book reference the exam needs; personal calculators and phones are not allowed. Ontario calls the trade Construction and Maintenance Electrician (309A), and its certificate of qualification exam is the Red Seal exam.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the Red Seal electrician exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions come from the Red Seal Occupational Standard for Construction Electrician, split into five major work activities. On the current exam breakdown, common occupational skills such as safety, tools and commissioning have 11 questions, generating, distribution and service systems 28, wiring systems 30, motors and control systems 21, and signalling and communication systems 10. The practice tests here use the same five areas in nearly the same proportions.",
          },
        },
        {
          "@type": "Question",
          name: "Which edition of the Canadian Electrical Code does the exam use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Since June 2025, candidates writing the Construction Electrician interprovincial exam are given the 2024 Canadian Electrical Code, Part I (CSA C22.1). CSA publishes a new edition every three years and each province and territory adopts it with its own amendments, so local rules can differ. The questions here follow the national code and say where a rule varies by province.",
          },
        },
        {
          "@type": "Question",
          name: "Who can write the Red Seal Construction Electrician exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apprentices write it once they finish their apprenticeship's on-the-job hours and in-school technical training, which usually takes four to five years, with the hours set by each province. Experienced electricians without an apprenticeship can apply as trade qualifiers by proving their hours in the trade. The exam is run by each province's or territory's apprenticeship authority, which sets the fees, the hours required and the rules for retakes.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official Red Seal question bank?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exams are confidential, and every question here is written by Tigertest from the occupational standard, the Canadian Electrical Code and standard electrical theory, so it tests the same knowledge without copying any exam. The official Red Seal website also has a free self-assessment and sample questions. Use both, and study the code book itself, since the real exam expects you to find rules in it quickly.",
          },
        },
        classFaqJsonLd("caelec"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Common Occupational Skills", weight: "12%" },
  { name: "Generating, Distribution & Service Systems", weight: "28%" },
  { name: "Wiring Systems", weight: "30%" },
  { name: "Motors & Control Systems", weight: "20%" },
  { name: "Signalling & Communication Systems", weight: "10%" },
];

export default function RedSealElectricianLandingPage() {
  return (
    <div data-theme="caelec" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Electrician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-electrician/dashboard"
            shortName="Red Seal Electrician"
            subtitle="200 questions for the Construction Electrician (309A) interprovincial exam: services, grounding, transformers, wiring, motors, drives and fire alarm, weighted like the real test with its 70% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caelec-mobile.png", desktop: "/landing/caelec-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caelec" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master a set, take its test, then move on. Questions you miss come back until you have them, and the Ohm&apos;s law and load calculation items show the working in the explanation.
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
                Four 50-question tests, each split across the five major work activities in the same proportions as the Red Seal exam breakdown, with the real 70% pass mark and an explanation of the right answer on every question.
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
                Red Seal publishes how many of the exam&apos;s 100 questions come from each major work activity of the occupational standard, and the practice tests here follow that split. Wiring systems and distribution and service systems together are more than half the exam, so that is where most study time should go. Apprenticeship instructors can set Tigertest as practice for a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which work activities the group misses most before the final in-school block.
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
                src={getTigerAsset("caelec", 1)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Spotted a question that could be clearer, or a code rule your province handles differently? Tell us. We read every message and use it to improve the bank.
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
            How to Pass the Red Seal Electrician Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your way around the code book</h3>
              <p>
                Many questions turn on the Canadian Electrical Code: service and feeder calculations, conductor ampacity and correction factors, conduit fill, voltage drop, bonding and motor circuits. Tab the sections you use most, learn which tables answer which questions, and practise finding a rule in under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Drill the math until it is automatic</h3>
              <p>
                Ohm&apos;s law and the power formula, series and parallel circuits, three-phase power with the square root of 3, transformer ratios, synchronous speed (120 × frequency ÷ poles), the 125% motor conductor rule and the 80% continuous load rule come up again and again. Write out each step on scrap paper, as you will in the exam room.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip the smaller areas</h3>
              <p>
                Signalling and communication is only a tenth of the exam, but fire alarm standards, Class A and Class B circuits, alarm and supervisory signals, and twisted-pair and fibre rules are easy marks once learned. The same goes for emergency lighting, electric heating and cathodic protection inside the wiring systems area.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by work activity. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% pass mark. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Electrician Exam FAQ
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Red Seal Construction Electrician exam, and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The interprovincial Red Seal exam for Construction Electrician has 100 multiple-choice questions, each with four options and one correct answer. You have four hours and need 70 percent to pass. The exam centre supplies a calculator and any code book reference the exam needs; personal calculators and phones are not allowed. Ontario calls the trade Construction and Maintenance Electrician (309A), and its certificate of qualification exam is the Red Seal exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does the Red Seal electrician exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions come from the Red Seal Occupational Standard for Construction Electrician, split into five major work activities. On the current exam breakdown, common occupational skills such as safety, tools and commissioning have 11 questions, generating, distribution and service systems 28, wiring systems 30, motors and control systems 21, and signalling and communication systems 10. The practice tests here use the same five areas in nearly the same proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which edition of the Canadian Electrical Code does the exam use?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Since June 2025, candidates writing the Construction Electrician interprovincial exam are given the 2024 Canadian Electrical Code, Part I (CSA C22.1). CSA publishes a new edition every three years and each province and territory adopts it with its own amendments, so local rules can differ. The questions here follow the national code and say where a rule varies by province.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can write the Red Seal Construction Electrician exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apprentices write it once they finish their apprenticeship&apos;s on-the-job hours and in-school technical training, which usually takes four to five years, with the hours set by each province. Experienced electricians without an apprenticeship can apply as trade qualifiers by proving their hours in the trade. The exam is run by each province&apos;s or territory&apos;s apprenticeship authority, which sets the fees, the hours required and the rules for retakes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official Red Seal question bank?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exams are confidential, and every question here is written by Tigertest from the occupational standard, the Canadian Electrical Code and standard electrical theory, so it tests the same knowledge without copying any exam. The official Red Seal website also has a free self-assessment and sample questions. Use both, and study the code book itself, since the real exam expects you to find rules in it quickly.
            </p>
          </div>
          <ExamClassFaq examId="caelec" />
        </div>
      </div>

      <ExamRelatedTests examId="caelec" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all five major work activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-electrician/dashboard" />
        </div>
      </div>
    </div>
  );
}
