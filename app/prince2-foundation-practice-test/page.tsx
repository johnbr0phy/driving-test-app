import "@/lib/v2/banks/prince2";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free PRINCE2 7 Foundation Practice Test 2026 - 60 Questions";
const metaDescription =
  "Free PRINCE2 7 Foundation practice exam: 200 original questions on the PRINCE2 7 Foundation syllabus, with two full 60-question mock exams in 60 minutes and an explanation on every answer.";
const description =
  "Free PRINCE2 7 Foundation practice tests with 200 original questions written to the PRINCE2 7 Foundation syllabus: key concepts, the seven principles and tailoring, people, the seven practices and the seven processes. Two full mock exams of 60 questions in 60 minutes with the 60 percent pass line, plus seven drills, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the PRINCE2 7 Foundation exam?",
    a: "60 multiple-choice questions in 60 minutes, each worth one mark. It is closed book, there is no negative marking, and you need 36 correct answers (60 percent) to pass. Candidates taking the exam in a language that is not their native or working language may be given 25 percent extra time.",
  },
  {
    q: "What does the PRINCE2 7 Foundation exam cover?",
    a: "Key concepts of projects and PRINCE2 (3 percent), the seven principles and tailoring (8 percent), people (14 percent), the seven practices (60 percent: business case, organizing, plans, quality, risk, issues and progress) and the seven processes (15 percent). The questions test recall and understanding, not applying the method to a scenario; that is the Practitioner exam.",
  },
  {
    q: "Is PRINCE2 7 still the current edition?",
    a: "Yes. PRINCE2 7 was launched in September 2023 and is the edition PeopleCert examines in 2026. It puts more weight on people management and added sustainability as a seventh aspect of project performance, plus digital and data management. No newer edition had been announced when this test was checked in November 2026.",
  },
  {
    q: "Is this practice test the same format as the real PRINCE2 7 Foundation exam?",
    a: "Each practice test is 60 single-answer questions in 60 minutes, weighted to the syllabus exam specification, with the 60 percent pass line shown on your results. It uses the standard, missing word, list (pick the two true statements) and negative question styles the syllabus describes. The questions are original and written from the syllabus terms, not taken from the official sample paper. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.",
  },
  {
    q: "Is the Tigertest PRINCE2 7 Foundation practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the final drill and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PRINCE2 Foundation practice test, PRINCE2 7 Foundation practice exam, PRINCE2 mock exam, free PRINCE2 questions, PRINCE2 exam prep, PRINCE2 Foundation 2026, PRINCE2 principles questions, PRINCE2 practices, PeopleCert PRINCE2 exam",
  alternates: {
    canonical: `${siteUrl}/prince2-foundation-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/prince2-foundation-practice-test`,
    images: [{ url: shareImageUrl("prince2"), width: 1200, height: 630, alt: "Tigertest free PRINCE2 7 Foundation practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("prince2")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PRINCE2 7 Foundation Practice Test",
      description,
      url: `${siteUrl}/prince2-foundation-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("prince2"),
      featureList: [
        "200 original PRINCE2 7 Foundation practice questions with explanations",
        "2 full mock exams of 60 questions in 60 minutes, with the 60 percent pass line",
        "7 drills covering every learning outcome of the PRINCE2 7 Foundation syllabus",
        "Weighted like the real exam, with the seven practices carrying 60 percent of the marks",
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
        classFaqJsonLd("prince2"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "The seven practices", weight: "36 of 60" },
  { name: "The seven processes", weight: "9 of 60" },
  { name: "People", weight: "8 of 60" },
  { name: "Principles and tailoring", weight: "5 of 60" },
  { name: "Key concepts of projects and PRINCE2", weight: "2 of 60" },
];

export default function Prince2LandingPage() {
  return (
    <div data-theme="prince2" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PRINCE2 7 Foundation Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/prince2-foundation/dashboard"
            shortName="PRINCE2"
            subtitle="200 PRINCE2 Foundation questions and two full 60-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/prince2-mobile.png", desktop: "/landing/prince2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="prince2" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Syllabus Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills cover the whole syllabus: principles and tailoring, people, business case and organizing, plans and quality, risk and issues, progress, and the processes. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 60-question tests in 60 minutes, the real exam&apos;s length and pace, scored against the 60 percent pass line. Practice Test 2 is held out of the drills, so it shows whether you are ready to book.
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
                The PRINCE2 7 Foundation syllabus sets the weight of each learning outcome. Every Tigertest practice test follows the same split, so the seven practices get the most questions, spread across business case, organizing, plans, quality, risk, issues and progress.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("prince2", 3)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Study guide */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          How to Pass PRINCE2 7 Foundation
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the terms that sit close together</h3>
            <p>
              Many questions test whether you can tell near neighbours apart: an output from an outcome from a benefit, risk appetite from risk tolerance, the risk owner from the risk action owner, a concern from a problem, a change budget from a risk budget. The wrong options are often the real definition of something else.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Spend most of your time on the practices</h3>
            <p>
              The seven practices carry 60 percent of the marks. For each one, know its purpose, the management products that support it, its key terms and the steps of its technique, such as identify, assess, plan, implement and communicate for risk, or capture, assess, recommend, decide and implement for issues.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who does what</h3>
            <p>
              Roles come up across the whole exam. Be sure of the executive, senior user, senior supplier, project manager, team manager, project assurance and project support, which level sets which tolerances, and which report goes from whom to whom: checkpoint, highlight, exception and end stage.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full mock exam under time</h3>
            <p>
              A minute a question is enough for most people, but practise at the real pace anyway. Take Practice Test 2 last, and book the exam once you are scoring comfortably above 60 percent.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            PRINCE2 7 Foundation Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="prince2" />
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

      <SampleQuestionsV2 examId="prince2" />

      <ExamRelatedTests examId="prince2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass PRINCE2 7 Foundation?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/prince2-foundation/dashboard" />
        </div>
      </div>
    </div>
  );
}
