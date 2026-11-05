import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ppsc";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "PPSC Test 2026 - Free General Ability MCQ Practice";
const metaDescription =
  "Free PPSC general ability practice: 200 original MCQs on English, basic mathematics, reasoning, Pakistan Studies, the 1973 Constitution, geography, Islamiat and computers, four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the general ability and general knowledge part of Punjab Public Service Commission (PPSC) written tests: 200 original MCQs on English grammar and vocabulary, basic mathematics, reasoning, Pakistan Studies, the 1973 Constitution, Pakistan and world geography, Islamic Studies and basic computer skills. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ppsc test preparation, ppsc mcqs, ppsc general ability test, ppsc one paper mcq, ppsc past papers style practice, punjab public service commission test, ppsc pakistan studies mcqs, ppsc english mcqs, ppsc screening test, ppsc 2026",
  alternates: {
    canonical: `${siteUrl}/ppsc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ppsc-practice-test`,
    images: [{ url: shareImageUrl("ppsc"), width: 1200, height: 630, alt: "Tigertest free PPSC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ppsc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the PPSC general ability test?",
    a: "The Punjab Public Service Commission recruits for posts in the Government of Punjab and publishes a syllabus with each advertisement. Many posts are filled through a one-paper MCQ test, and its general ability part usually covers general knowledge, Pakistan Studies, Islamic Studies (or Ethics for non-Muslim candidates), current affairs, geography, English, basic mathematics, everyday science and computers. Tigertest covers English, mathematics, reasoning, Pakistan Studies, the 1973 Constitution, geography, Islamic Studies and computers.",
  },
  {
    q: "How many questions are on a PPSC test and what is the pass mark?",
    a: "It depends on the post. Guides describe the common one-paper MCQ test as 100 questions in 90 minutes, sometimes split between general ability and questions on the post's own subject. The qualifying mark and whether wrong answers lose marks vary by post, so read the syllabus and instructions in your advertisement. Tigertest's mock tests are 50 questions with a 70% target, because selection is on merit, so scoring well above any qualifying mark is what counts.",
  },
  {
    q: "Does PPSC ask current affairs questions?",
    a: "Guides say most general ability papers include current affairs. Tigertest leaves them out because they go out of date within months, so read a national newspaper in the weeks before your test date. Everything here is static knowledge that does not change from one year to the next.",
  },
  {
    q: "What happens after the written test?",
    a: "Candidates who qualify in the written test are usually called for document checks and an interview, and the final merit list combines the stages the advertisement sets out. Each post has its own rules on qualifications, age and quota, so check the advertisement and the PPSC website before you apply.",
  },
  {
    q: "Are these real PPSC questions?",
    a: "No. Every question is original, written by Tigertest from the 1973 Constitution, standard Pakistan Studies and Islamic Studies content, and everyday English and mathematics, so it practises the same knowledge without copying any past paper. Tigertest is not affiliated with the Punjab Public Service Commission or the Government of Punjab, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PPSC Practice Test",
      description,
      url: `${siteUrl}/ppsc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
      featureList: [
        "200 English, mathematics, reasoning and general knowledge MCQs",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "English: Grammar & Usage", weight: "14%" },
  { name: "Basic Mathematics", weight: "14%" },
  { name: "Pakistan Studies: History to 1956", weight: "14%" },
  { name: "English: Vocabulary & Idioms", weight: "12%" },
  { name: "The 1973 Constitution", weight: "12%" },
  { name: "Pakistan & World Geography", weight: "12%" },
  { name: "Reasoning & Mental Ability", weight: "10%" },
  { name: "Islamic Studies", weight: "6%" },
  { name: "Basic Computer Skills", weight: "6%" },
];

export default function PpscLandingPage() {
  return (
    <div data-theme="ppsc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PPSC Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ppsc/dashboard"
            shortName="PPSC test"
            subtitle="200 original MCQs for the general ability part of Punjab Public Service Commission tests: English, mathematics, reasoning, Pakistan Studies, the 1973 Constitution, geography, Islamiat and computers. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ppsc-mobile.png", desktop: "/landing/ppsc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ppsc" />

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
                Five training sets cover English grammar and vocabulary, mathematics and reasoning, Pakistan Studies and Islamiat, the Constitution and computers, and geography. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question MCQ tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the rule or the fact behind it.
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
                Built for the General Ability Paper
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                PPSC sets a syllabus for each post and publishes no fixed topic split, so the weighting is Tigertest&apos;s own: English and mathematics carry the most marks, with reasoning and general knowledge from Pakistan Studies, the 1973 Constitution, geography, Islamic Studies and computers. Current affairs and everyday science are not included, and questions on your post&apos;s own subject are not covered.
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
                src={getTigerAsset("ppsc", 1)}
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
            How to Prepare for a PPSC Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read your post&apos;s syllabus first</h3>
              <p>
                Every PPSC advertisement links a syllabus that says how many marks go to general ability and how many to your subject, and whether wrong answers lose marks. Plan your time around that split.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make English and mathematics quick and sure</h3>
              <p>
                Revise subject-verb agreement, tenses, prepositions, idioms and one-word substitutes, and practise percentages, ratio, averages, simple interest and speed without a calculator until each takes under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Pakistan Studies dates and the Constitution</h3>
              <p>
                Know the milestones of the Pakistan Movement from 1906 to 1947, the early constitutions, and the main articles of the 1973 Constitution: fundamental rights, Parliament, the President and the bodies such as the Council of Common Interests and the public service commissions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise against the clock and read the news</h3>
              <p>
                Aim for 40 or more in every mock test at under a minute a question. Tigertest tracks your accuracy by topic, so drill the questions you missed, then add current affairs from a newspaper in the last weeks before your test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PPSC Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="ppsc" />

      <ExamRelatedTests examId="ppsc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your PPSC Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on English, mathematics, reasoning and general knowledge.</p>
          <ExamLandingCTA dashboardHref="/ppsc/dashboard" />
        </div>
      </div>
    </div>
  );
}
