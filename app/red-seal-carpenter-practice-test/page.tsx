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

const title = "Red Seal Carpenter Practice Test 2026 - Free 403A Exam Prep";
const metaDescription =
  "Free Red Seal carpenter practice tests: 200 original questions on layout, formwork, framing, exterior and interior finish and renovations, every answer explained.";
const description =
  "Free practice for the Red Seal Carpenter interprovincial exam: 200 original questions weighted to the 2022 Red Seal Occupational Standard, covering common occupational skills, planning and layout, concrete formwork, floor, wall, deck and roof framing, exterior finish, interior finish and stairs, and renovations. Four 50-question practice tests with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal carpenter practice test, Red Seal carpenter exam, carpenter interprovincial exam, 403A practice questions, carpentry Red Seal exam prep, journeyperson carpenter exam Canada, Part 9 building code questions",
  alternates: {
    canonical: `${siteUrl}/red-seal-carpenter-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/red-seal-carpenter-practice-test`,
    images: [{ url: shareImageUrl("cacarp"), width: 1200, height: 630, alt: "Tigertest free Red Seal carpenter practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cacarp")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Carpenter Practice Test",
      description,
      url: `${siteUrl}/red-seal-carpenter-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Red Seal carpenter practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "5 training sets by major work activity",
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
          name: "What is the pass mark for the Red Seal carpenter exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The interprovincial Red Seal exam for carpenters has 100 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your provincial or territorial certificate, which is recognized across Canada.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal carpenter exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam follows the Red Seal Occupational Standard for carpenters, split into seven major work activities: common occupational skills 12 percent, planning and layout 14 percent, concrete work 16 percent, framing 20 percent, exterior finishing 14 percent, interior finishing 14 percent and renovations 10 percent. Formwork alone is about 12 of the 100 questions, more than any other single task.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the building code during the exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Provincial exam information for 2026 says candidates are given a copy of the 2020 National Building Code of Canada, Volume 2, which holds Part 9 for houses and small buildings, plus a reference booklet with acronyms, formulas and diagrams. Knowing where things are in Part 9 saves a lot of time, so practise looking up stair, guard, footing and framing rules before the exam.",
          },
        },
        {
          "@type": "Question",
          name: "Who can write the Red Seal carpenter exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apprentices write it near the end of their apprenticeship, usually around four years and 7,200 hours of combined work and training. Experienced carpenters who never apprenticed can challenge it once they prove enough trade hours, often about 10,800. Hours, fees, retake rules and where you book all vary by province and territory, so check with your apprenticeship authority.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official Red Seal question bank?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question here is written by Tigertest from the Red Seal Occupational Standard and Part 9 of the National Building Code, so it tests the same knowledge without copying the official sample questions. Code figures follow the national code; provinces such as Ontario, Quebec and British Columbia publish their own codes, and a few numbers can differ there.",
          },
        },
        classFaqJsonLd("cacarp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Common Occupational Skills", weight: "12%" },
  { name: "Planning & Layout", weight: "14%" },
  { name: "Concrete & Formwork", weight: "16%" },
  { name: "Framing: Floors, Decks, Walls & Roofs", weight: "20%" },
  { name: "Exterior Finish", weight: "14%" },
  { name: "Interior Finish & Stairs", weight: "14%" },
  { name: "Renovations", weight: "10%" },
];

export default function RedSealCarpenterLandingPage() {
  return (
    <div data-theme="cacarp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Carpenter Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-carpenter/dashboard"
            shortName="Red Seal Carpenter"
            subtitle="200 questions on layout, formwork, framing, exterior and interior finish, stairs and renovations, weighted like the real exam with its 70% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cacarp-mobile.png", desktop: "/landing/cacarp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cacarp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Work Activity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the major work activities of the trade: safety, tools and layout, concrete and formwork, framing, exterior finish, and interior finish with renovations. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests, each half the length of the real exam and split across the seven work activities in the same proportions, with the 70% pass mark and an explanation on every question.
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
                Built on the Red Seal Occupational Standard
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Red Seal publishes how the 100 exam questions are split across the seven major work activities of the 2022 carpenter standard, and the practice tests here follow that split. Framing is the biggest block, and formwork is the biggest single task, so give both plenty of time. Apprenticeship instructors and trade schools can assign Tigertest as a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which work activities the group misses most.
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
                src={getTigerAsset("cacarp", 1)}
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
            How to Pass the Red Seal Carpenter Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Study to the weightings</h3>
              <p>
                Framing is 20 questions and concrete work 16, with formwork alone about 12. Layout, exterior finish and interior finish are 14 each, common skills 12 and renovations 10. Spend your time in the same proportions, and use the self-assessment on the Red Seal site to find the tasks you rarely do on the job.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn your way around Part 9</h3>
              <p>
                You get the code in the exam room, so the skill is finding things fast: stair rise and run, headroom, guard heights, footing sizes, anchor bolts, joist bearing, notching limits, attic venting and cladding clearances. Tab or note the sections you look up most while you practise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the trade math</h3>
              <p>
                Expect scale conversions, board feet, concrete volumes in cubic metres, rafter lengths from rise and run, stair calculations and levelling with backsights and foresights. Write out each step, keep units consistent, and round only at the end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by work activity. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% pass mark. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Carpenter Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal carpenter exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The interprovincial Red Seal exam for carpenters has 100 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your provincial or territorial certificate, which is recognized across Canada.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal carpenter exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam follows the Red Seal Occupational Standard for carpenters, split into seven major work activities: common occupational skills 12 percent, planning and layout 14 percent, concrete work 16 percent, framing 20 percent, exterior finishing 14 percent, interior finishing 14 percent and renovations 10 percent. Formwork alone is about 12 of the 100 questions, more than any other single task.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I use the building code during the exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Provincial exam information for 2026 says candidates are given a copy of the 2020 National Building Code of Canada, Volume 2, which holds Part 9 for houses and small buildings, plus a reference booklet with acronyms, formulas and diagrams. Knowing where things are in Part 9 saves a lot of time, so practise looking up stair, guard, footing and framing rules before the exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can write the Red Seal carpenter exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apprentices write it near the end of their apprenticeship, usually around four years and 7,200 hours of combined work and training. Experienced carpenters who never apprenticed can challenge it once they prove enough trade hours, often about 10,800. Hours, fees, retake rules and where you book all vary by province and territory, so check with your apprenticeship authority.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official Red Seal question bank?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question here is written by Tigertest from the Red Seal Occupational Standard and Part 9 of the National Building Code, so it tests the same knowledge without copying the official sample questions. Code figures follow the national code; provinces such as Ontario, Quebec and British Columbia publish their own codes, and a few numbers can differ there.
            </p>
          </div>
          <ExamClassFaq examId="cacarp" />
        </div>
      </div>

      <ExamRelatedTests examId="cacarp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all seven major work activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-carpenter/dashboard" />
        </div>
      </div>
    </div>
  );
}
