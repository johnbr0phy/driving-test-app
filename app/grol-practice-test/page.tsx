import "@/lib/banks/grol";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free FCC GROL Practice Test 2026 - Elements 1 and 3";
const metaDescription =
  "Free-to-start FCC GROL practice test: 200 original Element 1 and Element 3 questions, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the FCC General Radiotelephone Operator License (GROL): 200 original questions written from 47 CFR Parts 13, 80 and 87 and the topics of the FCC Element 1 and Element 3 question pools. Four 50-question practice tests mix 10 Element 1 and 40 Element 3 questions, and five training sets cover marine radio law, distress and GMDSS procedures, electrical principles and math, components, digital logic, receivers, transmitters, antennas and power sources, aircraft radio, installation and maintenance, marine and satellite communications, and radar.";

const faqs = [
  {
    q: "What is the FCC GROL and who needs it?",
    a: "The General Radiotelephone Operator License (license class PG) is the FCC commercial license needed to adjust, maintain or internally repair FCC-licensed radiotelephone transmitters in the aviation, maritime and international fixed public services. It is also required to operate a compulsorily equipped ship radiotelephone above 1500 watts peak envelope power, and voluntary ship and aircraft stations above 1000 watts. Avionics and marine electronics technicians are the people who most often hold it.",
  },
  {
    q: "What exams do I pass for the GROL?",
    a: "Two written elements. Element 1 covers basic radio law and operating practice: 24 questions, and you need at least 18 correct. Element 3 covers general radiotelephone electronics: 100 questions, and you need at least 75 correct. The questions come from FCC pools approved on June 25, 2009. Both pass at 75%, so these practice tests use a 75% pass line.",
  },
  {
    q: "Where do I take the GROL exams and how do I get the license?",
    a: "The written elements are given by Commercial Operator License Examination Managers (COLEMs), which are listed on the FCC's website and set their own fees and schedules. When you pass, you get a Proof of Passing Certificate for each element. You then file FCC Form 605 in the FCC's Universal Licensing System with those certificates; many COLEMs can file it for you. The GROL is issued for your lifetime.",
  },
  {
    q: "How are these practice tests built?",
    a: "Each of the four practice tests has 50 questions: 10 on Element 1 and 40 on Element 3, about the same mix as the real 24 and 100 questions. Element 3 topics are weighted by the FCC pool's subelements, from electrical principles and math to receivers, transmitters, aircraft, marine and radar. Five training sets let you work on Element 1 on its own and Element 3 in four parts, and every question has an explanation.",
  },
  {
    q: "Are these the real FCC pool questions?",
    a: "No. Every question is original, written by Tigertest from 47 CFR Parts 13, 80 and 87, the FAA Aeronautical Information Manual and standard electronics. The FCC pools were used only to see which topics each element covers, and every question was checked so it does not copy a pool question. Read the official pools on the FCC website as well. Tigertest is not affiliated with the FCC or any COLEM.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "grol practice test, fcc grol, general radiotelephone operator license, fcc element 1, fcc element 3, element 3 practice test, fcc commercial license, avionics license, marine radio operator permit, colem",
  alternates: {
    canonical: `${siteUrl}/grol-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/grol-practice-test`,
    images: [{ url: shareImageUrl("grol"), width: 1200, height: 630, alt: "Tigertest free FCC GROL practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("grol")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free FCC GROL Practice Test",
      description,
      url: `${siteUrl}/grol-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("grol"),
      featureList: [
        "200 FCC GROL Element 1 and Element 3 practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by topic",
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
        classFaqJsonLd("grol"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Element 1: radio law & operating", weight: "10 of 50" },
  { name: "Principles, math & components", weight: "13 of 50" },
  { name: "Digital, receivers & transmitters", weight: "11 of 50" },
  { name: "Antennas, aircraft & maintenance", weight: "9 of 50" },
  { name: "Marine, satellite & radar", weight: "7 of 50" },
];

export default function GrolLandingPage() {
  return (
    <div data-theme="grol" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free FCC GROL Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/grol/dashboard"
            shortName="FCC GROL"
            subtitle="200 Element 1 and Element 3 questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/grol-mobile.png", desktop: "/landing/grol-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="grol" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: Element 1 radio law and operating practice on its own, then Element 3 in four parts, from principles, math and components to receivers, transmitters, antennas, aircraft, marine and radar. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each with 10 Element 1 and 40 Element 3 questions, about the real mix. Aim for 75% or better, the pass mark of both elements (18 of 24 and 75 of 100). No question appears in more than one test, and every one comes with an explanation.
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
                Built on the FCC rules and the Element 3 topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Element 1 tests the marine radio rules in 47 CFR Part 80 and the operator rules in Part 13. Element 3 covers the electronics an operator needs to adjust and repair transmitters and receivers, weighted here like the FCC pool&apos;s subelements, plus the aviation rules in Part 87.
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
                src={getTigerAsset("grol", 3)}
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
            How to Prepare for the GROL
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn Element 1 first</h3>
              <p>
                Element 1 is only 24 questions, and the same rules come up again and again: channels 16, 13, 70, 6 and 22A, 2182 and 2187.5 kHz, MAYDAY, PAN PAN and SECURITE, log retention, GMDSS sea areas, EPIRBs, SARTs and NAVTEX. Train it until you pass every time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the math by hand</h3>
              <p>
                Ohm&apos;s law, power, series and parallel parts, reactance, resonance, decibels, time constants, wavelength and radar timing turn up throughout Element 3. Work each problem on paper, then check the explanation for the step you missed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Follow the signal through the radio</h3>
              <p>
                Learn what each stage does in a superheterodyne receiver and in AM, SSB and FM transmitters, then how antennas, feed lines, power supplies, aircraft navigation aids and marine radar fit around them.
              </p>
            </div>
            <div>
              
<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 75% or better on every practice test, the pass mark of both elements. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          GROL Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="grol" />
        </div>
      </div>

      <ExamSampleQuestions examId="grol" />

      <ExamRelatedTests examId="grol" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your GROL?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across FCC Elements 1 and 3.</p>
          <ExamLandingCTA dashboardHref="/grol/dashboard" />
        </div>
      </div>
    </div>
  );
}
