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

const title = "Free ITIL 4 Foundation Practice Test 2026 - 40 Questions";
const metaDescription =
  "Free ITIL 4 Foundation practice exam: 160 original questions on the ITIL 4 Foundation syllabus, with two full 40-question mock exams in 60 minutes and an explanation on every answer.";
const description =
  "Free ITIL 4 Foundation practice tests with 160 original questions written to the ITIL 4 Foundation candidate syllabus: key concepts, the seven guiding principles, the four dimensions, the service value system and value chain, and the ITIL practices. Two full mock exams of 40 questions in 60 minutes with the 65 percent pass line, plus six drills, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the ITIL 4 Foundation exam?",
    a: "40 multiple-choice questions in 60 minutes, each with one correct answer. It is closed book, and you need 26 correct answers (65 percent) to pass. There is no negative marking, so answer every question.",
  },
  {
    q: "Has ITIL Version 5 replaced ITIL 4 Foundation?",
    a: "Not yet. PeopleCert released ITIL (Version 5) in early 2026, and the two run in parallel for a period: PeopleCert's ITIL FAQ says its current plan is to retire all ITIL 4 modules on 31 December 2027. Until then the ITIL 4 Foundation exam is still on sale, and ITIL 4 qualifications count as prerequisites for the higher Version 5 certifications. Both Foundation exams are closed-book multiple choice. Version 5 keeps the 34 ITIL practices and is built around end-to-end guidance for digital products and services, designed with AI in mind. This practice test covers ITIL 4. If your course or employer has moved you to Version 5, check which exam you are booked on.",
  },
  {
    q: "What topics does the ITIL 4 Foundation exam cover?",
    a: "Key concepts of service management such as value, outcomes, utility and warranty; the seven guiding principles; the four dimensions of service management; the service value system and the six value chain activities; the purpose of 15 ITIL practices; and seven practices in detail: continual improvement, change enablement, incident management, problem management, service request management, the service desk and service level management. The practices in detail carry the most marks.",
  },
  {
    q: "Is this practice test the same format as the real ITIL 4 Foundation exam?",
    a: "Yes. Each practice test is 40 single-answer questions in 60 minutes, weighted to the syllabus learning outcomes, with the 65 percent pass line shown on your results. The questions are original and written from the syllabus terms, not taken from the official sample papers. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.",
  },
  {
    q: "Is the Tigertest ITIL 4 Foundation practice test free?",
    a: "Yes. Both practice tests and all six drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ITIL 4 Foundation practice test, ITIL 4 Foundation practice exam, ITIL 4 Foundation mock exam, free ITIL questions, ITIL 4 exam prep, ITIL Foundation 2026, ITIL guiding principles questions, ITIL service value chain, PeopleCert ITIL exam",
  alternates: {
    canonical: `${siteUrl}/itil-4-foundation-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/itil-4-foundation-practice-test`,
    images: [{ url: shareImageUrl("itil"), width: 1200, height: 630, alt: "Tigertest free ITIL 4 Foundation practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("itil")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ITIL 4 Foundation Practice Test",
      description,
      url: `${siteUrl}/itil-4-foundation-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "160 original ITIL 4 Foundation practice questions with explanations",
        "2 full mock exams of 40 questions in 60 minutes, with the 65 percent pass line",
        "6 drills covering every learning outcome of the ITIL 4 Foundation syllabus",
        "Weighted like the real exam, with the practices in detail carrying the most marks",
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
        classFaqJsonLd("itil"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Seven practices in detail", weight: "17 of 40" },
  { name: "Purpose of 15 practices and key terms", weight: "7 of 40" },
  { name: "Guiding principles", weight: "6 of 40" },
  { name: "Key concepts of service management", weight: "5 of 40" },
  { name: "Four dimensions, value system and value chain", weight: "5 of 40" },
];

export default function ItilLandingPage() {
  return (
    <div data-theme="itil" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ITIL 4 Foundation Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/itil-4-foundation/dashboard"
            shortName="ITIL 4"
            subtitle="160 original questions and two full 40-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/itil-mobile.png", desktop: "/landing/itil-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="itil" />

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
                Six drills cover the whole syllabus: key concepts, guiding principles, the four dimensions and value chain, practice purposes, improvement and change, and incidents, problems and requests. Questions you miss come back until you have mastered them.
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
                Two 40-question tests in 60 minutes, exactly the real exam&apos;s length and pace, scored against the 65 percent pass line. Practice Test 2 is held out of the drills, so it shows whether you are ready to book.
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
                The ITIL 4 Foundation syllabus sets how many of the 40 marks come from each learning outcome. Every Tigertest practice test follows the same split, so the seven practices you need to know in detail get the most questions.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("itil", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ITIL 4 and Version 5 */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-8">
          ITIL 4 or ITIL Version 5?
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            PeopleCert released ITIL (Version 5) in early 2026. The ITIL 4 Foundation exam is still on sale beside it: PeopleCert says the two run in parallel for a period and that its current plan is to retire all ITIL 4 modules on 31 December 2027. ITIL 4 qualifications count as prerequisites for the higher Version 5 certifications. This practice test covers ITIL 4 only.
          </p>
          <p>
            Version 5 keeps the 34 ITIL practices and is reorganized around end-to-end lifecycle guidance for digital products and services, with AI built in from the start. Training providers report that it replaces the six value chain activities with a longer product and service lifecycle, so check the syllabus if you are booked on Version 5. If you are not sure which exam you are booked on, check your exam voucher or ask your training provider.
          </p>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass ITIL 4 Foundation
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the definitions word for word</h3>
              <p>
                Many questions test whether you can tell close definitions apart: an output from an outcome, utility from warranty, an incident from a problem from a known error, an IT asset from a configuration item. Learn the exact wording of each, because the wrong options are often a real ITIL definition of something else.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Spend the most time on the seven practices</h3>
              <p>
                Continual improvement, change enablement, incident, problem and service request management, the service desk and service level management carry 17 of the 40 marks. Know the steps of the continual improvement model, the three types of change, the phases of problem management and what makes a good SLA.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match each guiding principle to a scenario</h3>
              <p>
                Guiding principle questions often describe a team&apos;s situation and ask which principle applies. Practise spotting the clue: reusing what exists is start where you are, removing steps is keep it simple and practical, making work visible is collaborate and promote visibility.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full mock exam under time</h3>
              <p>
                Sixty minutes for 40 questions is enough for most people, but practise at the real pace anyway. Take Practice Test 2 last, and book the exam once you are scoring comfortably above 65 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ITIL 4 Foundation Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="itil" />
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-24 text-center">
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

      <ExamRelatedTests examId="itil" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass ITIL 4 Foundation?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 160 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/itil-4-foundation/dashboard" />
        </div>
      </div>
    </div>
  );
}
