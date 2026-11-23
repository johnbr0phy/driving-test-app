import "@/lib/banks/series24";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Series 24 Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free Series 24 practice: 200 original questions on FINRA's General Securities Principal outline, four 50-question mock tests in the real mix, every answer explained.";
const description =
  "Free practice for the FINRA Series 24 General Securities Principal exam: 200 original questions written from FINRA's content outline and the rules it lists. Four mock tests of 50 questions in the real exam's five-function mix, and five training sets covering registration and supervisory systems, conduct, complaints and net capital, customer accounts and sales practices, trading, settlement and reporting, and investment banking and research.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "series 24 practice test, series 24 exam practice, series 24 practice questions, general securities principal exam, finra series 24, series 24 mock exam, principal license exam, series 24 2026",
  alternates: {
    canonical: `${siteUrl}/series-24-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/series-24-practice-test`,
    images: [{ url: shareImageUrl("series24"), width: 1200, height: 630, alt: "Tigertest free Series 24 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("series24")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Series 24 exam?",
    a: "The Series 24 is FINRA's General Securities Principal Qualification Examination. A General Securities Principal supervises a broker-dealer's securities business: its people, sales practices, communications, trading, underwriting and research. The registration does not cover options or municipal securities, which have their own principal exams.",
  },
  {
    q: "How many questions are on the Series 24 and what is the passing score?",
    a: "The exam has 150 scored multiple-choice questions plus 10 unscored pretest questions, 160 in all, and you have 3 hours and 45 minutes. The passing score is 70, on an equated scale. There is no penalty for guessing, and the test center provides a basic calculator. Each mock test here has 50 questions, a third of the scored length, in the same mix across FINRA's five functions, with a pass line of 35 of 50.",
  },
  {
    q: "What does the Series 24 cover?",
    a: "FINRA's content outline splits the 150 scored questions into five job functions: registration of the broker-dealer and its people (9 questions), general broker-dealer activities such as supervision, compensation, complaints, records and net capital (45), retail and institutional customer activities (32), trading and market making (32), and investment banking and research (32).",
  },
  {
    q: "What do I need before taking the Series 24?",
    a: "You must be sponsored by a FINRA member firm. To register as a General Securities Principal you also need the Securities Industry Essentials (SIE) exam and a representative-level corequisite, most often the Series 7; the Series 57, 79, 82 or 86 and 87 also qualify.",
  },
  {
    q: "Are these the real Series 24 questions?",
    a: "No. FINRA's questions are confidential. Every question here is original, written by Tigertest from FINRA's published content outline and the rules it lists, such as FINRA Rules 3110, 4530, 2241 and 5310, Regulation SHO, Regulation M and the SEC's net capital and customer protection rules. Tigertest is not affiliated with FINRA, and this practice does not replace your firm's training or a full prep course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Series 24 Practice Test",
      description,
      url: `${siteUrl}/series-24-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("series24"),
      featureList: [
        "200 Series 24 practice questions",
        "4 mock tests of 50 questions in the real exam's mix",
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
  { name: "Supervision of general broker-dealer activities", weight: "45 of 150" },
  { name: "Retail and institutional customer activities", weight: "32 of 150" },
  { name: "Trading and market making", weight: "32 of 150" },
  { name: "Investment banking and research", weight: "32 of 150" },
  { name: "Registration of the firm and its personnel", weight: "9 of 150" },
];

export default function Series24LandingPage() {
  return (
    <div data-theme="series24" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Series 24 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/series-24/dashboard"
            shortName="Series 24"
            subtitle="200 questions on FINRA's principal outline and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/series24-mobile.png", desktop: "/landing/series24-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="series24" />

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
                Five training sets: registration and supervisory systems; conduct, complaints and net capital; customer accounts and sales practices; trading, settlement and reporting; and investment banking and research. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests in the Real Mix</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, a third of the real exam&apos;s 150 scored questions, split across FINRA&apos;s five functions in the same proportions. No question appears in more than one test, and every answer is explained.
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
                Built on FINRA&apos;s Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FINRA splits the 150 scored questions across five job functions. Each 50-question mock test here keeps the same proportions: 3 on registration, 15 on general broker-dealer supervision, 11 each on customer activities and trading, and 10 on investment banking and research.
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
                src={getTigerAsset("series24", 3)}
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
            How to Study for the Series 24
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think like a supervisor</h3>
              <p>
                Most questions ask what a principal must review, approve, escalate or report. For each rule, learn who has the duty, what triggers it and the deadline, such as the 30 calendar days of Rule 4530 or the annual inspection of an office of supervisory jurisdiction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Give general supervision the most time</h3>
              <p>
                Function 2 is 45 of the 150 scored questions: written supervisory procedures, Rules 3110, 3120 and 3130, outside activities, gifts and compensation, complaints, records and the net capital and customer protection rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn trading and offering rules by their numbers</h3>
              <p>
                Regulation SHO close-out days, Regulation M restricted periods, trade reporting deadlines, research quiet periods and Rule 5110 filing times are easy points once memorized and easy to confuse if not.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep up with rule changes</h3>
              <p>
                FINRA updates the exam as rules change. In 2026 the gift limit rose to $300, and Rule 3290 replaces the outside activity and private securities transaction rules on October 25, 2027. Check FINRA&apos;s notices before your test date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Series 24 Frequently Asked Questions
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

      <ExamSampleQuestions examId="series24" />

      <ExamRelatedTests examId="series24" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start the Series 24?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every function of FINRA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/series-24/dashboard" />
        </div>
      </div>
    </div>
  );
}
