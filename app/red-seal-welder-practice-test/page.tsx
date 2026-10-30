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
const path = "/red-seal-welder-practice-test";

const title = "Red Seal Welder Practice Test 2026 - Free 456A Exam Prep";
const metaDescription =
  "Free Red Seal Welder practice: 200 original questions on safety, layout, fabrication, cutting and gouging, SMAW, GMAW, FCAW, GTAW and SAW. 70% to pass.";
const description =
  "Free practice for the Red Seal Welder interprovincial exam (456A in Ontario): 200 original questions across the four Major Work Activities of the 2023 Red Seal Occupational Standard: common occupational skills, layout and fabrication, cutting and gouging, and welding processes (SMAW, GMAW, FCAW, MCAW, GTAW and SAW). Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal welder practice test, 456A practice exam, Red Seal welding exam questions, interprovincial welder exam, welder certificate of qualification, Red Seal welder 2026, welding exam practice Canada",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: "/og/caweld", width: 1200, height: 630, alt: "Tigertest free Red Seal Welder practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/caweld"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Welder Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Red Seal Welder practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Tests weighted like the Red Seal exam breakdown by Major Work Activity",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the Red Seal Welder exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your certificate, which is recognized in every province and territory.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal Welder exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions follow the 2023 Red Seal Occupational Standard for Welder, grouped into four Major Work Activities: common occupational skills (20 questions), layout and fabrication of components (28), cutting and gouging (23), and welding processes (54). Welding processes break down into SMAW (18), FCAW, MCAW and GMAW (18), GTAW (13) and SAW (5). The practice tests here keep those proportions in 50 questions.",
          },
        },
        {
          "@type": "Question",
          name: "Is 456A the same as the Red Seal Welder exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "456A is the Ontario trade code for Welder. Ontario apprentices write the same interprovincial Red Seal exam as everyone else, and other provinces and territories use their own codes for the trade. The written exam content is the same across Canada, though some jurisdictions also require a practical test.",
          },
        },
        {
          "@type": "Question",
          name: "Who can write the Red Seal Welder exam and how do I book it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apprentices write it when they finish their technical training and work hours, and experienced welders without an apprenticeship can apply as trade qualifiers. Hours, fees, booking, practical tests and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Red Seal exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown and standard shop practice, so it covers the same tasks without copying the exam. CSA standards such as W47.1, W48 and W59 are covered at the level of concepts, and your company's welding procedures always take precedence.",
          },
        },
        classFaqJsonLd("caweld"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Common Occupational Skills", weight: "16%" },
  { name: "B. Layout & Drawings", weight: "10%" },
  { name: "B. Fabrication & Fit-Up", weight: "12%" },
  { name: "C. Cutting & Gouging", weight: "18%" },
  { name: "D. SMAW", weight: "16%" },
  { name: "D. GMAW, FCAW & MCAW", weight: "14%" },
  { name: "D. GTAW & SAW", weight: "14%" },
];

export default function RedSealWelderLandingPage() {
  return (
    <div data-theme="caweld" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Welder Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-welder/dashboard"
            shortName="Red Seal Welder"
            subtitle="200 questions across all four Major Work Activities, from rigging and weld symbols to oxy-fuel, plasma and carbon arc cutting and every welding process, with the real 70% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caweld-mobile.png", desktop: "/landing/caweld-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caweld" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Red Seal publishes how many of the 125 questions come from each Major Work Activity of the 2023 Occupational Standard, and the practice tests here keep that split in 50 questions. Welding processes alone are 44% of the exam, and cutting and gouging another 18%, so those sets are where most of your study time should go. Instructors running a pre-apprenticeship or apprenticeship welding class can assign Tigertest at{" "}
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
                src={getTigerAsset("caweld", 1)}
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
            How to Pass the Red Seal Welder Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know each process by its variables</h3>
              <p>
                For every process, learn the power source (constant current or constant voltage), the polarity, the shielding and what each setting changes. Wire feed speed sets current in GMAW, voltage sets bead width, AC cleans aluminum oxide in GTAW, and current sets penetration in SAW. Most process questions are one of those relationships.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tie every defect to its cause</h3>
              <p>
                Undercut, porosity, slag inclusions, lack of fusion, cracks and burnback each have a short list of causes. Learn them as cause and fix pairs, along with the cutting faults: drag lines, rounded top edges and high-speed and low-speed plasma dross.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the math and the symbols</h3>
              <p>
                Layout questions use circumference with the mean diameter, Pythagoras for braces, mitre cut angles, fillet throat (0.707 of the leg) and heat input. Learn the welding symbol by heart: arrow side below the line, size on the left, length and pitch on the right, flag for field welds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by work activity. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% line. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Welder Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal Welder exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your certificate, which is recognized in every province and territory.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal Welder exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions follow the 2023 Red Seal Occupational Standard for Welder, grouped into four Major Work Activities: common occupational skills (20 questions), layout and fabrication of components (28), cutting and gouging (23), and welding processes (54). Welding processes break down into SMAW (18), FCAW, MCAW and GMAW (18), GTAW (13) and SAW (5). The practice tests here keep those proportions in 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is 456A the same as the Red Seal Welder exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              456A is the Ontario trade code for Welder. Ontario apprentices write the same interprovincial Red Seal exam as everyone else, and other provinces and territories use their own codes for the trade. The written exam content is the same across Canada, though some jurisdictions also require a practical test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can write the Red Seal Welder exam and how do I book it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apprentices write it when they finish their technical training and work hours, and experienced welders without an apprenticeship can apply as trade qualifiers. Hours, fees, booking, practical tests and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Red Seal exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown and standard shop practice, so it covers the same tasks without copying the exam. CSA standards such as W47.1, W48 and W59 are covered at the level of concepts, and your company&apos;s welding procedures always take precedence.
            </p>
          </div>
          <ExamClassFaq examId="caweld" />
        </div>
      </div>

      <ExamRelatedTests examId="caweld" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four Major Work Activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-welder/dashboard" />
        </div>
      </div>
    </div>
  );
}
