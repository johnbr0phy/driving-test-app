import "@/lib/banks/ukplumb";
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

const title = "Plumbing Theory Practice Test 2026 - Free Level 2 & 3 Mock Exams";
const metaDescription =
  "Free UK plumbing theory practice for City & Guilds 6035 and the ST0303 apprenticeship: 200 original questions on water, heating, drainage and safety.";
const description =
  "Free practice for UK Level 2 and 3 plumbing and domestic heating theory: 200 original questions on health and safety, scientific principles, plumbing processes, cold and hot water systems, central heating, sanitation and drainage, rainwater, electrical principles and environmental technologies. Four 50-question practice tests with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "plumbing theory practice test, plumbing level 2 mock exam, city and guilds 6035 practice questions, plumbing apprenticeship knowledge test, st0303 epa practice, central heating questions, plumbing exam uk",
  alternates: {
    canonical: `${siteUrl}/plumbing-theory-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/plumbing-theory-practice-test`,
    images: [{ url: shareImageUrl("ukplumb"), width: 1200, height: 630, alt: "Tigertest free plumbing theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukplumb")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Plumbing Theory Practice",
      description,
      url: `${siteUrl}/plumbing-theory-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukplumb", "GBP"),
      featureList: ["200 plumbing and heating theory questions", "4 practice tests of 50 questions", "5 training sets by topic", "Instant feedback with explanations", "Auto-save progress"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does the plumbing theory test cover?",
          acceptedAnswer: { "@type": "Answer", text: "Health and safety, scientific principles, pipework and jointing, cold and hot water systems, central heating and controls, sanitation and above-ground drainage, rainwater, electrical basics for plumbers and an awareness of heat pumps and solar thermal. Those are the units of the City & Guilds 6035 Level 2 Diploma and the core knowledge of the Level 3 apprenticeship." },
        },
        {
          "@type": "Question",
          name: "How many questions are on the real tests and what is the pass mark?",
          acceptedAnswer: { "@type": "Answer", text: "Each City & Guilds 6035-02 unit test is an online multiple-choice test, mostly 40 questions in 75 minutes, passing at about 60%. The ST0303 apprenticeship knowledge test paper 1 is 60 questions in 120 minutes: 36 to pass, 50 for a distinction." },
        },
        {
          "@type": "Question",
          name: "Is this the gas or unvented exam?",
          acceptedAnswer: { "@type": "Answer", text: "No. Gas (ACS CCN1), unvented hot water storage and the Water Regulations each have their own practice test on Tigertest. This one covers general plumbing and heating theory and touches those only lightly." },
        },
        {
          "@type": "Question",
          name: "Which rules are the questions based on?",
          acceptedAnswer: { "@type": "Answer", text: "England: Approved Documents H, G and L, HSE guidance on legionella, ladders and asbestos, and RIDDOR. Wales, Scotland and Northern Ireland have their own building regulations, so check local figures there." },
        },
        {
          "@type": "Question",
          name: "Are these the real City & Guilds questions?",
          acceptedAnswer: { "@type": "Answer", text: "No. Every question here is written by Tigertest from the published units and the rules they cover, without copying past papers, sample tests or commercial question banks." },
        },
        classFaqJsonLd("ukplumb"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Health & Safety", weight: "12%" },
  { name: "Scientific Principles", weight: "10%" },
  { name: "Common Plumbing Processes", weight: "12%" },
  { name: "Cold Water Systems", weight: "12%" },
  { name: "Domestic Hot Water Systems", weight: "12%" },
  { name: "Central Heating Systems", weight: "16%" },
  { name: "Sanitation & Drainage", weight: "10%" },
  { name: "Rainwater Systems", weight: "4%" },
  { name: "Electrical Principles", weight: "6%" },
  { name: "Environmental Technologies", weight: "6%" },
];

export default function UkplumbLandingPage() {
  return (
    <div data-theme="ukplumb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Plumbing Theory Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/plumbing-theory/dashboard"
            shortName="Plumbing Theory"
            subtitle="200 questions for City & Guilds 6035 and the Level 3 plumbing apprenticeship: cold and hot water, central heating, drainage, pipework, safety and science. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukplumb-mobile.png", desktop: "/landing/ukplumb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukplumb" />

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
                Five training sets, from Health, Safety & Science to Sanitation, Drainage & Rainwater. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests across every topic, with a 60% pass line like the real unit tests and an explanation of the right answer on every question.
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
                Built on the 6035 Units and the Apprenticeship Knowledge Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The practice tests are weighted like the City & Guilds 6035-02 unit tests, with central heating, hot and cold water and safety carrying the most questions. Every question is original and written for England&apos;s Approved Documents and HSE guidance.
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
                src={getTigerAsset("ukplumb", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Teaching plumbing at a college or training centre? Set Tigertest as practice between sessions at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which topics your learners miss most before their unit tests. It is free for you and your learners.
        </p>
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
            How to Pass Your Plumbing Theory Tests
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the systems, not just the parts</h3>
              <p>
                Most questions describe a system and ask what happens: why a cold feed is sized as it is, what a motorised valve does in an S plan, why a trap seal is lost. Draw each system from memory until you can label every part.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the key numbers</h3>
              <p>
                Learn the figures that come up again and again, such as stored hot water at 60°C, distribution at 50°C or above, trap seal depths, fall on drainage and the 1 m ladder rule, so you do not lose time on them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the science and sums</h3>
              <p>
                Expect questions on pressure and head, heat transfer, expansion, electrical units and simple heat loss sums. Write out the formula, put in the numbers and check the unit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80 percent on every practice test before the real one, then retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Plumbing Theory Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the plumbing theory test cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Health and safety, scientific principles, pipework and jointing, cold and hot water systems, central heating and controls, sanitation and above-ground drainage, rainwater, electrical basics for plumbers and an awareness of heat pumps and solar thermal. Those are the units of the City & Guilds 6035 Level 2 Diploma and the core knowledge of the Level 3 apprenticeship.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the real tests and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each City & Guilds 6035-02 unit test is an online multiple-choice test, mostly 40 questions in 75 minutes, passing at about 60%. The ST0303 apprenticeship knowledge test paper 1 is 60 questions in 120 minutes: 36 to pass, 50 for a distinction.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the gas or unvented exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Gas (ACS CCN1), unvented hot water storage and the Water Regulations each have their own practice test on Tigertest. This one covers general plumbing and heating theory and touches those only lightly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which rules are the questions based on?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              England: Approved Documents H, G and L, HSE guidance on legionella, ladders and asbestos, and RIDDOR. Wales, Scotland and Northern Ireland have their own building regulations, so check local figures there.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real City & Guilds questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question here is written by Tigertest from the published units and the rules they cover, without copying past papers, sample tests or commercial question banks.
            </p>
          </div>
          <ExamClassFaq examId="ukplumb" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukplumb" />

      <ExamRelatedTests examId="ukplumb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Plumbing Theory?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic.</p>
          <ExamLandingCTA dashboardHref="/plumbing-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
