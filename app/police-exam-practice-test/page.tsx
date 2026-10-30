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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Police Exam Practice Test 2026 - Officer Written Exam";
const metaDescription =
  "Free police officer written exam practice: 200 original questions on reading, grammar, report writing, math and judgment, four 50-question tests, every answer explained.";
const description =
  "Free practice for the police officer entrance written exam: 200 original questions on the skills every police written test checks, reading comprehension, grammar, spelling and vocabulary, incident report writing, basic math, situational judgment and reasoning. Four 50-question practice tests and five training sets, with an explanation for every answer.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "police exam practice test, police officer written exam, police entrance exam practice, law enforcement written test, police test questions, police written test 2026, free police practice test, police exam study guide",
  alternates: {
    canonical: `${siteUrl}/police-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/police-exam-practice-test`,
    images: [{ url: shareImageUrl("police"), width: 1200, height: 630, alt: "Tigertest free police exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("police")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Police Exam Practice Test",
      description,
      url: `${siteUrl}/police-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 police written exam practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by skill",
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
          name: "What is on a police officer written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most police entrance exams test the skills an officer uses every day: reading comprehension, grammar, spelling and vocabulary, writing clear incident reports, basic math, and judgment or reasoning, such as choosing the best action in a situation or applying a rule to facts. Some versions also include a memory or observation section. The exact test depends on the agency.",
          },
        },
        {
          "@type": "Question",
          name: "Which police exam does my department use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single national police exam. Departments use a test from a testing company, a state test such as California's PELLETB, a city or county civil service exam, or their own. The job posting or the recruiting office will name it. These practice questions cover the skills those tests share, so they help whichever one you take.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass the police exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each agency or civil service board sets its own passing score, and many rank candidates by score rather than simply passing them. 70 percent is a common cut-off, so the practice tests here use it, but aim well above it: a higher score can move you up the hiring list.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after the written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Passing the written exam is usually the first step. Most agencies then hold a physical ability test, an oral board interview, a background investigation, and psychological and medical exams before a conditional offer and the academy. The order and the standards vary by agency and state.",
          },
        },
        {
          "@type": "Question",
          name: "Are these real police exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest to practice the same skills, and no testing company's questions are copied. It is free practice, not an official test, and it does not replace your agency's own study guide.",
          },
        },
        classFaqJsonLd("police"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reading Comprehension", weight: "20%" },
  { name: "Grammar, Spelling & Vocabulary", weight: "20%" },
  { name: "Report Writing & Clarity", weight: "16%" },
  { name: "Math", weight: "16%" },
  { name: "Situational Judgment & Ethics", weight: "16%" },
  { name: "Reasoning & Problem Solving", weight: "12%" },
];

export default function PoliceExamLandingPage() {
  return (
    <div data-theme="police" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Police Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/police-exam/dashboard"
            shortName="Police Exam"
            subtitle="200 questions on reading, grammar, report writing, math and judgment, the skills every police written exam tests. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/police-mobile.png", desktop: "/landing/police-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="police" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Skill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: reading, grammar and spelling, report writing, math, and judgment and reasoning. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions mixing every section, scored against a 70 percent line. No question appears in more than one test, and every one comes with an explanation.
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
                Built on What Police Exams Share
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Police written tests differ by agency, but they all lean hardest on reading and writing, so those get the most questions here, followed by report writing, math and judgment. Criminal justice and academy prep instructors can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which skills the class misses most.
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
                src={getTigerAsset("police", 1)}
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
            How to Pass the Police Written Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer from the passage, not from what you know</h3>
              <p>
                Reading questions describe a procedure and ask what it says. The right answer is the one the passage states or supports, even when your own agency or a TV show does it differently. Read the question first, then find the sentence that answers it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the words reports get wrong</h3>
              <p>
                Spelling items use words officers write every day: separate, receive, lieutenant, harass, occurred, surveillance. Pair that with its and it&apos;s, their and there, and lie and lay, and you will pick up easy points.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Write reports like a witness, not a judge</h3>
              <p>
                The best report sentence names who did what, in time order, and describes what the officer saw instead of what the officer concluded: &quot;his speech was slurred&quot;, not &quot;he was drunk&quot;.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Put safety, honesty and policy first</h3>
              <p>
                In judgment questions the best answer protects life first, then follows the law and policy, and never covers up a mistake or a coworker&apos;s misconduct. Take a full practice test, fix your misses, and aim for 80 percent or better before test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Police Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on a police officer written exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Most police entrance exams test the skills an officer uses every day: reading comprehension, grammar, spelling and vocabulary, writing clear incident reports, basic math, and judgment or reasoning, such as choosing the best action in a situation or applying a rule to facts. Some versions also include a memory or observation section. The exact test depends on the agency.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which police exam does my department use?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              There is no single national police exam. Departments use a test from a testing company, a state test such as California&apos;s PELLETB, a city or county civil service exam, or their own. The job posting or the recruiting office will name it. These practice questions cover the skills those tests share, so they help whichever one you take.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the police exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each agency or civil service board sets its own passing score, and many rank candidates by score rather than simply passing them. 70 percent is a common cut-off, so the practice tests here use it, but aim well above it: a higher score can move you up the hiring list.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What happens after the written exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Passing the written exam is usually the first step. Most agencies then hold a physical ability test, an oral board interview, a background investigation, and psychological and medical exams before a conditional offer and the academy. The order and the standards vary by agency and state.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these real police exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest to practice the same skills, and no testing company&apos;s questions are copied. It is free practice, not an official test, and it does not replace your agency&apos;s own study guide.
            </p>
          </div>
          <ExamClassFaq examId="police" />
        </div>
      </div>

      <ExamRelatedTests examId="police" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Police Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every section of the written test.</p>
          <ExamLandingCTA dashboardHref="/police-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
