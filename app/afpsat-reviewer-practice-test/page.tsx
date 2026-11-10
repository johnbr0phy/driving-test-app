import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/afpsat";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "AFPSAT Reviewer 2026 - Free AFP Service Aptitude Test Practice";
const metaDescription =
  "Free AFPSAT reviewer: 200 original questions on verbal, numerical, logical and abstract reasoning and general information, four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the AFP Service Aptitude Test (AFPSAT), the written entrance test for the Philippine Army, Navy and Air Force: 200 original questions on vocabulary, grammar, reading, numerical ability, logical, abstract and spatial reasoning, the 1987 Constitution on national defense and the AFP. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "afpsat reviewer, afpsat practice test, afp service aptitude test, afpsat exam questions, afpsat reviewer 2026, philippine army exam reviewer, philippine navy exam, philippine air force exam, candidate soldier course exam, officer candidate course exam, afp aptitude test",
  alternates: {
    canonical: `${siteUrl}/afpsat-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/afpsat-reviewer-practice-test`,
    images: [{ url: shareImageUrl("afpsat"), width: 1200, height: 630, alt: "Tigertest free AFPSAT reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("afpsat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the AFPSAT?",
    a: "The AFP Service Aptitude Test (AFPSAT) is the written aptitude test the Armed Forces of the Philippines uses as the first filter for people who want to join the Philippine Army, the Philippine Navy (including the Marines) or the Philippine Air Force, as officers or enlisted personnel. It is the subject of AFP circulars (2013, 2015 and 2020) and is given by the services' testing and recruitment offices in batches across the regions. Passing it is one step: each service then has its own physical, medical and background screening, and the Army also gives its own qualifying exams to some applicants.",
  },
  {
    q: "What is on the AFPSAT?",
    a: "The AFP does not publish a syllabus, but reviewers describe the same areas: verbal ability (vocabulary, analogies, grammar and reading), numerical ability (arithmetic, algebra and word problems), logical and abstract reasoning (series, patterns and figures), spatial and mechanical reasoning, and general information about the Philippines, the Constitution and the AFP. Tigertest covers all of them, with the abstract and spatial items written in words because the real figure items cannot be shown as text.",
  },
  {
    q: "How many items are on the AFPSAT and what is the passing score?",
    a: "The AFP does not publish the number of items, the time limit or a passing score, and guides say each service sets its own cut-off for officer and enlisted applicants. Some reviewers quote about 150 items, but that is not an official figure. Tigertest's mock tests are 50 questions with a 70% target, so work at a steady pace and aim well above it, because places are limited.",
  },
  {
    q: "How do I register for the AFPSAT?",
    a: "Contact the recruitment office of the service you want to join (guides say applicants can also register on the AFP's AFPSAT portal), and that service's testing office gives you a schedule. Bring the original documents the announcement lists, such as your diploma or certificate, transcript of records or Form 137, PSA birth certificate and a valid government ID. Age, height, civil status and education rules differ between services and between officer and enlisted programs, so check the current announcement from the Army, Navy or Air Force recruitment office.",
  },
  {
    q: "Are these the real AFPSAT questions?",
    a: "No. Every question is original, written by Tigertest from the 1987 Constitution, the defense laws and standard English, mathematics and reasoning, so it practises the same skills without copying any test paper. Current events are left out because they date quickly. Tigertest is not affiliated with the Armed Forces of the Philippines, the Department of National Defense or any of the services, and it does not register you or replace the test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AFPSAT Reviewer",
      description,
      url: `${siteUrl}/afpsat-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("afpsat", "PHP"),
      featureList: [
        "200 verbal, numerical, reasoning and general information questions",
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
  { name: "Verbal: Vocabulary & Analogies", weight: "14%" },
  { name: "Logical Reasoning", weight: "14%" },
  { name: "Verbal: Grammar & Correct Usage", weight: "12%" },
  { name: "Numerical: Arithmetic & Algebra", weight: "12%" },
  { name: "Numerical: Word Problems", weight: "12%" },
  { name: "The Constitution & National Defense", weight: "12%" },
  { name: "Verbal: Reading Comprehension", weight: "8%" },
  { name: "Abstract & Spatial Reasoning", weight: "8%" },
  { name: "The AFP, History & Geography", weight: "8%" },
];

export default function AfpsatLandingPage() {
  return (
    <div data-theme="afpsat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AFPSAT Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/afpsat/dashboard"
            shortName="AFPSAT"
            subtitle="200 original questions for the AFP Service Aptitude Test: vocabulary, grammar, reading, numerical ability, logical and abstract reasoning, the Constitution and the AFP. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/afpsat-mobile.png", desktop: "/landing/afpsat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="afpsat" />

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
                Five training sets cover vocabulary and grammar, reading and logical reasoning, numerical ability, abstract and spatial reasoning, and general information. Questions you miss come back until you have mastered them.
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
                Four 50-question mock tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built for the AFP Service Aptitude Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AFP does not publish a syllabus or a subtest split, so the weighting is Tigertest&apos;s own, following the areas reviewers describe: verbal and numerical ability carry most of the marks, then logical, abstract and spatial reasoning and general information. The real abstract reasoning part uses figures; here the same reasoning is written as number and letter series, codes and spatial problems in words. General information comes from the 1987 Constitution on national defense, the Reservist Act and the history and structure of the AFP. Current events are not included.
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
                src={getTigerAsset("afpsat", 1)}
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
            How to Pass the AFPSAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build speed in numerical ability</h3>
              <p>
                Fractions, percents, ratio, rates and work problems come up again and again in reviewers. Practise them without a calculator until you can set up each problem in one line, then check your answer against the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read widely and learn word families</h3>
              <p>
                Vocabulary and analogy items reward a wide reading habit. Learn roots and prefixes, review subject-verb agreement and tenses, and practise finding the main idea of a short passage in under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Train your eye for patterns</h3>
              <p>
                Abstract reasoning asks what comes next. Look for a rule in the differences, in doubling, or in steps forward and back through the alphabet, and test it on every term before you answer. Practise picture series too, because the real test uses figures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know the Constitution and the AFP</h3>
              <p>
                Learn what the 1987 Constitution says about the armed forces: civilian supremacy, the President as Commander-in-Chief, the oath, the ban on partisan politics, and who declares a state of war. Learn the AFP&apos;s major services, core values and the key dates in Philippine military history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AFPSAT Frequently Asked Questions
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

      <ExamSampleQuestions examId="afpsat" />

      <ExamRelatedTests examId="afpsat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Serve?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on verbal, numerical and reasoning skills and the AFP.</p>
          <ExamLandingCTA dashboardHref="/afpsat/dashboard" />
        </div>
      </div>
    </div>
  );
}
