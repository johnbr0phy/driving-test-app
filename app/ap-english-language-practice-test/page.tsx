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

const siteUrl = SITE_URL;

const title = "Free AP English Language Practice Test 2027 - AP Lang Multiple Choice";
const metaDescription =
  "Free AP Lang practice tests: 45 reading and writing multiple-choice questions in 60 minutes, 202 original questions on original passages and drafts, with explanations.";
const description =
  "Free AP English Language and Composition practice tests built like Section I of the AP English Language Exam: 45 multiple-choice questions with four choices in 60 minutes, in two reading sets on nonfiction passages and three writing sets on student drafts. 202 original questions, each with an explanation, on 22 original passages and drafts, covering all eight skill categories, plus eight drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP English Language and Composition Exam?",
    a: "The AP English Language Exam is fully digital and lasts 3 hours 15 minutes. Section I has 45 multiple-choice questions in 60 minutes and is 45% of the score: 23 to 25 reading questions and 20 to 22 writing questions. Section II has three essays, synthesis, rhetorical analysis and argument, in 2 hours 15 minutes including a 15-minute reading period, and is 55% of the score.",
  },
  {
    q: "What is the difference between reading and writing questions on AP Lang?",
    a: "Reading questions come in two sets on nonfiction passages and ask about the writer's purpose, claims, reasoning and style. Writing questions come in three sets on drafts with numbered sentences and ask you to read like a writer: which revision states the claim best, which evidence belongs, where a sentence fits, which transition or wording works. Every question has four answer choices, and no points are taken off for wrong answers.",
  },
  {
    q: "Which skills does the AP English Language multiple-choice section test?",
    a: "Four big ideas, each tested in reading and in writing: rhetorical situation, claims and evidence, reasoning and organization, and style. In reading, rhetorical situation and style are each 11% to 14% of the section and claims and evidence and reasoning and organization are each 13% to 16%. Each of the four writing categories is 11% to 14%. Every Tigertest practice test follows those weights.",
  },
  {
    q: "How is the AP English Language Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice section and the three essays into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP Lang practice test include the essays?",
    a: "No. Tigertest models the 45-question multiple-choice section only. The synthesis, rhetorical analysis and argument essays are scored by readers, so practice them with your teacher. The passages, drafts and questions here are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP English Language practice test, AP Lang practice test, free AP Lang practice test, AP English Language multiple choice, AP Lang multiple choice practice, AP Lang MCQ, AP English Language exam 2027, AP Lang rhetorical analysis, AP Lang review",
  alternates: {
    canonical: `${siteUrl}/ap-english-language-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-english-language-practice-test`,
    images: [{ url: shareImageUrl("aplang"), width: 1200, height: 630, alt: "Tigertest free AP English Language practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aplang")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP English Language Practice Test",
      description,
      url: `${siteUrl}/ap-english-language-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "202 original AP English Language practice questions with explanations",
        "2 full multiple-choice sections: 45 questions in 60 minutes, four choices each",
        "Reading sets on nonfiction passages and writing sets on student drafts",
        "All eight skill categories, weighted like the real exam",
        "8 drills, one for each skill category in reading and in writing",
        "Score by skill category after every practice test",
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
        classFaqJsonLd("aplang"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Rhetorical situation: reading", weight: "11-14%" },
  { name: "Claims and evidence: reading", weight: "13-16%" },
  { name: "Reasoning and organization: reading", weight: "13-16%" },
  { name: "Style: reading", weight: "11-14%" },
  { name: "Rhetorical situation: writing", weight: "11-14%" },
  { name: "Claims and evidence: writing", weight: "11-14%" },
  { name: "Reasoning and organization: writing", weight: "11-14%" },
  { name: "Style: writing", weight: "11-14%" },
];

export default function ApEnglishLanguageLandingPage() {
  return (
    <div data-theme="aplang" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP English Language Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-english-language/dashboard"
            shortName="AP English Language"
            subtitle="202 original reading and writing multiple-choice questions on original passages and drafts. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aplang-mobile.png", desktop: "/landing/aplang-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aplang" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Skill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills: rhetorical situation, claims and evidence, reasoning and organization, and style, once for reading passages and once for revising drafts. Questions you miss come back until you have mastered them, so a weak skill gets the practice it needs.
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
                Two full multiple-choice sections: 45 questions in 60 minutes, on the real clock, with the passage or draft beside each set and a score by skill at the end. Practice Test 2 is held out of the drills, so it measures readiness. The essays are not included.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are the College Board&apos;s weights for the eight skill categories of the multiple-choice section. Every Tigertest practice test has 24 reading questions in two sets of 12 and 21 writing questions in sets of 8, 8 and 5, the same order as the real exam. The passages and drafts are original practice texts; each label describes the kind of writer, not a real person.
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
                src={getTigerAsset("aplang", 1)}
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
            How to Raise Your AP Lang Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Find the writer&apos;s purpose first</h3>
              <p>
                Before the questions, ask who is writing, to whom, and why now. Most reading questions about a paragraph, an example or a word choice come back to that purpose: the right answer explains how the choice serves the argument.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer from the passage, not from opinion</h3>
              <p>
                Eliminate choices that are true in general but not supported by the text, and choices that overstate it. Watch for concessions: when a writer grants a point, the answer usually names the limit, not a reversal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Revise for the writer&apos;s goal</h3>
              <p>
                Writing questions state a goal: support a claim, connect two sentences, reach an audience. Pick the choice that does that job, read the sentences on both sides of the change, and keep &quot;(as it is now)&quot; in play when the draft already works.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to about a minute a question</h3>
              <p>
                With 45 questions in 60 minutes, read each passage once with its purpose in mind, answer its set, and flag the hard ones to come back to. Wrong answers cost nothing, so never leave a question blank. Tigertest shows your score by skill, so drill your weakest one before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP English Language Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aplang" />
        </div>
      </div>

      <ExamRelatedTests examId="aplang" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Lang?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 202 questions across all eight skill categories.</p>
          <ExamLandingCTA dashboardHref="/ap-english-language/dashboard" />
        </div>
      </div>
    </div>
  );
}
