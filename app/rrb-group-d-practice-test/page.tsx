import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free RRB Group D Mock Test 2026 - CBT Practice";
const metaDescription =
  "Free RRB Group D CBT mock tests: 232 original questions on Mathematics, Reasoning, General Science and General Awareness, with two full 100-question tests in 90 minutes and an explanation on every answer.";
const description =
  "Free RRB Group D (Level 1) practice tests with 232 original questions on the CBT syllabus: Mathematics, General Intelligence and Reasoning, General Science (physics, chemistry and biology to class 10) and General Awareness. Each full mock test has 100 questions in 90 minutes, split 25, 30, 25 and 20 like the real paper, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the RRB Group D CBT exam pattern?",
    a: "The Group D Computer Based Test has 100 multiple-choice questions in 90 minutes: 25 on Mathematics, 30 on General Intelligence and Reasoning, 25 on General Science and 20 on General Awareness and Current Affairs, one mark each. Eligible PwBD candidates who use a scribe get 120 minutes. Those who do well enough are called to the Physical Efficiency Test, then document verification and a medical examination.",
  },
  {
    q: "Is there negative marking in the RRB Group D exam?",
    a: "Yes. One third of a mark is deducted for each wrong answer, and an unanswered question costs nothing. A blind guess among four options breaks even on average (a 1 in 4 chance of +1 against a 3 in 4 chance of -1/3), so it neither helps nor hurts; once you can rule out even one option, a guess gains marks on average. Tigertest scores percent correct without the deduction, so keep count of the questions you guessed.",
  },
  {
    q: "What are the qualifying marks for the RRB Group D CBT?",
    a: "The minimum qualifying percentages are 40 percent for UR and EWS and 30 percent for OBC (non-creamy layer), SC and ST, with a small relaxation for PwBD candidates where seats would otherwise go unfilled. Reaching the minimum is not enough on its own: candidates are called to the Physical Efficiency Test on normalised marks against zone-wise and category-wise cut-offs, which are usually well above it.",
  },
  {
    q: "Are these the real RRB Group D previous year questions?",
    a: "No. Every question is original, written to the CBT syllabus in the RRB notification, and none is copied from previous papers. General Science is pitched at the class 10 CBSE level the notice names, and General Awareness questions cover static facts such as history, geography, the Constitution and sports, not current affairs, so read the news of the past year separately before your exam.",
  },
  {
    q: "Is the Tigertest RRB Group D mock test free?",
    a: "Yes. Both full mock tests and all eight subject drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RRB Group D mock test, RRB Group D practice test, RRB Group D CBT mock test free, RRB Group D 2026, railway Group D exam questions, RRB Group D general science questions, RRB Group D maths and reasoning practice, railway Level 1 exam mock test",
  alternates: {
    canonical: `${siteUrl}/rrb-group-d-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rrb-group-d-practice-test`,
    images: [{ url: shareImageUrl("rrbgroupd"), width: 1200, height: 630, alt: "Tigertest free RRB Group D mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rrbgroupd")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RRB Group D Mock Test",
      description,
      url: `${siteUrl}/rrb-group-d-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original RRB Group D CBT practice questions with explanations",
        "2 full 100-question mock tests in 90 minutes, split 25, 30, 25 and 20 like the real paper",
        "8 drills: arithmetic, numbers and geometry, verbal and logical reasoning, physics, chemistry, biology and general awareness",
        "Static General Awareness facts only, no current affairs",
        "Negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("rrbgroupd"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", weight: "25 questions" },
  { name: "General Intelligence and Reasoning", weight: "30 questions" },
  { name: "General Science", weight: "25 questions" },
  { name: "General Awareness and Current Affairs", weight: "20 questions" },
];

export default function RrbGroupDLandingPage() {
  return (
    <div data-theme="rrbgroupd" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RRB Group D Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rrb-group-d/dashboard"
            shortName="RRB Group D"
            subtitle="232 original CBT questions on Maths, Reasoning, General Science and General Awareness. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rrbgroupd-mobile.png", desktop: "/landing/rrbgroupd-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rrbgroupd" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole CBT syllabus: arithmetic, numbers and geometry, verbal reasoning, logical reasoning, physics, chemistry, biology and general awareness. Questions you miss come back until you have mastered them.
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
                Two 100-question mock tests in 90 minutes, the real Group D CBT length and timing, grouped by subject. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Group D CBT Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Railway Recruitment Boards set one CBT for every Level 1 post, from Track Maintainer to Assistant (Points). Every mock test here follows its four-subject split. In the real exam each wrong answer costs 1/3 mark, so practise leaving a question blank when you cannot rule anything out.
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
                src={getTigerAsset("rrbgroupd", 1)}
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
            How to Prepare for the RRB Group D CBT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make Reasoning and Science your scoring sections</h3>
              <p>
                Reasoning carries 30 questions and General Science 25, more than half the paper together. Series, coding-decoding, blood relations, directions and syllogisms repeat in every shift, and the science is class 10 CBSE: learn the NCERT physics, chemistry and biology chapters until the facts and formulas are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the arithmetic shortcuts</h3>
              <p>
                Most maths questions are arithmetic: percentages, profit and loss, interest, ratio, averages, time and work, and trains. Know conversions such as km/h to m/s (multiply by 5/18) and the angles and areas of common shapes, so that each question takes under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Build General Awareness in two layers</h3>
              <p>
                Start with static facts: Indian history, rivers and states, the Constitution, sports trophies, dances and the railways. Then read the news of the past year for current affairs, which this practice bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Manage the negative marking</h3>
              <p>
                With 1/3 mark off for each wrong answer, accuracy matters more than attempting everything. Take a full 90-minute mock, count how many of your guesses were wrong, and drill the subject where you lose the most marks. Keep up your running practice for the PET as well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RRB Group D Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rrbgroupd" />
        </div>
      </div>

      <ExamRelatedTests examId="rrbgroupd" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the RRB Group D CBT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all four subjects.</p>
          <ExamLandingCTA dashboardHref="/rrb-group-d/dashboard" />
        </div>
      </div>
    </div>
  );
}
