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

const title = "Life in the UK Test 2026 - Free Practice Tests, 24 Questions";
const metaDescription =
  "Free Life in the UK test practice: 200 original questions from the official handbook, eight 24-question mock tests with the real 18-of-24 pass mark, every answer explained.";
const description =
  "Free practice for the Life in the UK test taken for settlement and British citizenship: 200 original questions written from the official handbook, Life in the United Kingdom: A Guide for New Residents. Eight mock tests of 24 questions, like the real test, with the real pass mark of 18 out of 24, and four training sets covering British values, the nations of the UK, British history, modern society and culture, and government and the law.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "life in the uk test, life in the uk practice test, life in the uk mock test, british citizenship test practice, uk citizenship test questions, indefinite leave to remain test, life in the uk handbook questions, life in the uk test 2026",
  alternates: {
    canonical: `${siteUrl}/life-in-the-uk-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/life-in-the-uk-test`,
    images: [{ url: shareImageUrl("uklitu"), width: 1200, height: 630, alt: "Tigertest free Life in the UK practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uklitu")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Life in the UK Practice Test",
      description,
      url: `${siteUrl}/life-in-the-uk-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 Life in the UK practice questions",
        "8 mock tests of 24 questions with the real 18 of 24 pass mark",
        "4 training sets by handbook chapter",
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
          name: "What is the Life in the UK test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is a computer-based test of British traditions, customs, history and government that most people must pass to apply for settlement (indefinite leave to remain) or British citizenship. You take it at one of the approved test centres in the UK, booked online at least 3 days ahead.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are there and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There are 24 multiple-choice questions and you have 45 minutes. You need 18 correct answers, which is 75 percent, to pass. Every mock test here has 24 questions and uses the same pass mark.",
          },
        },
        {
          "@type": "Question",
          name: "What should I study for the Life in the UK test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions come only from the official handbook, Life in the United Kingdom: A Guide for New Residents (third edition). Its testable chapters are the values and principles of the UK, what the UK is, a long and illustrious history, a modern thriving society, and the UK government, the law and your role. History is the longest chapter, so it gets the most questions here.",
          },
        },
        {
          "@type": "Question",
          name: "Has the Life in the UK test changed for 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not yet. The government has signalled that it wants to update the test, and its 2025 earned settlement proposals keep passing it as a requirement for settlement, but as of October 2026 no new handbook or format has been published: GOV.UK still points to the official Guide for New Residents, 24 questions in 45 minutes, with a 75 percent pass mark. Where the handbook is out of date, for example on the monarch or the name of the Welsh Parliament, the explanations here give the current fact as well.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Life in the UK test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the official handbook, so it tests the same knowledge without copying the real test. It is free revision, not an official test, and it does not book or replace your Life in the UK test.",
          },
        },
        classFaqJsonLd("uklitu"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Values & Principles of the UK", weight: "8%" },
  { name: "What Is the UK", weight: "4%" },
  { name: "History to 1688", weight: "17%" },
  { name: "History from 1689", weight: "21%" },
  { name: "A Modern, Thriving Society", weight: "25%" },
  { name: "Government, Law & Your Role", weight: "25%" },
];

export default function LifeInTheUkLandingPage() {
  return (
    <div data-theme="uklitu" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Life in the UK Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/life-in-the-uk/dashboard"
            shortName="Life in the UK"
            subtitle="200 questions from the official handbook: British values, history, culture, government and the law. Eight 24-question mock tests with the real pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/uklitu-mobile.png", desktop: "/landing/uklitu-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uklitu" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Chapter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the handbook: values, the UK and early history; history from 1689; modern society; and government and the law. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight mock tests of 24 questions, the length of the real test, each needing 18 correct to pass. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Official Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Home Office does not publish how many questions come from each chapter, so each mock test here follows the handbook&apos;s own balance: history, its longest chapter, gets the most questions, followed by modern society and government. ESOL and citizenship teachers can set Tigertest as practice at{" "}
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
                src={getTigerAsset("uklitu", 1)}
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
            How to Pass the Life in the UK Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build a timeline of British history</h3>
              <p>
                History is the biggest chapter. Pin the key dates to one line: the Romans from AD 43 to 410, the Norman Conquest in 1066, Magna Carta in 1215, Bosworth in 1485, the Armada in 1588, the Civil War and 1649, the Glorious Revolution in 1688, the Act of Union in 1707, Ireland in 1801, votes for women in 1918 and 1928, and the NHS in 1948.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the four nations side by side</h3>
              <p>
                For England, Scotland, Wales and Northern Ireland, know the capital, the patron saint and their day, where the parliament or assembly sits, and the main differences in courts and juries. Many questions simply swap one nation for another.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who did what</h3>
              <p>
                The test asks about people: writers, composers, painters, inventors, sports stars and politicians. Pair each name with one thing, such as Elgar and the Pomp and Circumstance Marches, Fleming and penicillin, Wilberforce and the slave trade.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by chapter. Aim for 20 or more out of 24 on every mock test before you book. After each test, drill the questions you missed and retrain the weakest chapter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Life in the UK Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Life in the UK test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is a computer-based test of British traditions, customs, history and government that most people must pass to apply for settlement (indefinite leave to remain) or British citizenship. You take it at one of the approved test centres in the UK, booked online at least 3 days ahead.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are there and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              There are 24 multiple-choice questions and you have 45 minutes. You need 18 correct answers, which is 75 percent, to pass. Every mock test here has 24 questions and uses the same pass mark.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What should I study for the Life in the UK test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions come only from the official handbook, Life in the United Kingdom: A Guide for New Residents (third edition). Its testable chapters are the values and principles of the UK, what the UK is, a long and illustrious history, a modern thriving society, and the UK government, the law and your role. History is the longest chapter, so it gets the most questions here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Has the Life in the UK test changed for 2026?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Not yet. The government has signalled that it wants to update the test, and its 2025 earned settlement proposals keep passing it as a requirement for settlement, but as of October 2026 no new handbook or format has been published: GOV.UK still points to the official Guide for New Residents, 24 questions in 45 minutes, with a 75 percent pass mark. Where the handbook is out of date, for example on the monarch or the name of the Welsh Parliament, the explanations here give the current fact as well.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Life in the UK test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the official handbook, so it tests the same knowledge without copying the real test. It is free revision, not an official test, and it does not book or replace your Life in the UK test.
            </p>
          </div>
          <ExamClassFaq examId="uklitu" />
        </div>
      </div>

      <ExamRelatedTests examId="uklitu" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Life in the UK Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every chapter of the handbook.</p>
          <ExamLandingCTA dashboardHref="/life-in-the-uk/dashboard" />
        </div>
      </div>
    </div>
  );
}
