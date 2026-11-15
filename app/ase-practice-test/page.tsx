import "@/lib/banks/ase";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "ASE Practice Test 2026 - A1 to A8 Automobile Certification Tests";
const metaDescription =
  "ASE practice for the A1 to A8 Automobile tests: 320 original questions written from ASE's 2026 task lists, one training set per A-test and four mixed 50-question practice tests, every answer explained. Start for free.";
const description =
  "Practice for the ASE Automobile and Light Truck certification tests A1 to A8, the eight tests needed for ASE Master Automobile Technician status: 320 original questions written from the task lists in the 2026 Official ASE Study Guide. One training set for each test (engine repair, automatic transmission, manual drive train and axles, suspension and steering, brakes, electrical and electronic systems, heating and air conditioning, engine performance) and four mixed 50-question practice tests. Start for free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ase practice test, ase certification practice test, ase a1 practice test, ase a5 brakes practice test, ase a6 electrical practice test, ase a8 engine performance practice test, ase master technician test, automotive service excellence practice questions, auto mechanic certification test",
  alternates: {
    canonical: `${siteUrl}/ase-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ase-practice-test`,
    images: [{ url: shareImageUrl("ase"), width: 1200, height: 630, alt: "Tigertest ASE A1 to A8 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ase")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What are the ASE A1 to A8 tests?",
    a: "They are the eight Automobile and Light Truck certification tests from the National Institute for Automotive Service Excellence (ASE): A1 Engine Repair, A2 Automatic Transmission/Transaxle, A3 Manual Drive Train and Axles, A4 Suspension and Steering, A5 Brakes, A6 Electrical/Electronic Systems, A7 Heating and Air Conditioning, and A8 Engine Performance. Each is a separate test and a separate certification. Passing all eight, with the required work experience, earns Master Automobile Technician status.",
  },
  {
    q: "How many questions are on each ASE test?",
    a: "ASE's 2026 study guide lists 45 scored questions in 75 minutes for A1, A2 and A5; 40 in 60 minutes for A3 and A4; 50 in 90 minutes for A6; and 50 in 75 minutes for A7 and A8. Every certification test also carries 10 unscored research questions, so A1 has 55 questions in all. ASE does not publish a passing score, so the practice tests here use 70 percent as a readiness line.",
  },
  {
    q: "How is this practice organized?",
    a: "There is one training set for each A-test, 40 questions each, written to that test's official task list and split across its content areas in ASE's proportions, so you can train only the test you are booked for. The four practice tests mix all eight areas, 50 questions each, weighted by how many scored questions each test has.",
  },
  {
    q: "Do I need work experience to be ASE certified?",
    a: "Yes. Passing a test is only part of certification: ASE also requires documented, relevant work experience, two years for the A-series tests, and up to half of it can come from appropriate vocational training. Certifications are valid for five years, then you take the shorter recertification test.",
  },
  {
    q: "Are these the real ASE test questions?",
    a: "No. Every question is original, written by Tigertest from the task lists in the Official ASE Study Guide and from primary rules such as FMVSS 116, 126 and 138 and the EPA's Section 609 servicing requirements. The real tests use a Technician A and Technician B format for some items; these are single-answer questions. Tigertest is not affiliated with ASE.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - ASE A1 to A8 Practice Test",
      description,
      url: `${siteUrl}/ase-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ase"),
      featureList: [
        "320 ASE A1 to A8 practice questions",
        "8 training sets, one per A-test",
        "4 mixed practice tests of 50 questions",
        "Instant feedback with explanations",
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
        classFaqJsonLd("ase"),
      ],
    },
  ],
};

const tests = [
  { name: "A1 Engine Repair", weight: "45 questions" },
  { name: "A2 Automatic Transmission/Transaxle", weight: "45 questions" },
  { name: "A3 Manual Drive Train and Axles", weight: "40 questions" },
  { name: "A4 Suspension and Steering", weight: "40 questions" },
  { name: "A5 Brakes", weight: "45 questions" },
  { name: "A6 Electrical/Electronic Systems", weight: "50 questions" },
  { name: "A7 Heating and Air Conditioning", weight: "50 questions" },
  { name: "A8 Engine Performance", weight: "50 questions" },
];

export default function AseLandingPage() {
  return (
    <div data-theme="ase" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            ASE Practice Test 2026: A1 to A8
          </h1>
          <ExamLandingHero
            dashboardHref="/ase/dashboard"
            shortName="ASE"
            subtitle="320 original questions on the ASE Automobile tests: engine repair, automatic and manual drivetrains, suspension and steering, brakes, electrical, heating and A/C, and engine performance. One training set per A-test and four mixed practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ase-mobile.png", desktop: "/landing/ase-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ase" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One A-Test at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight training sets, one for each test from A1 to A8, each covering that test&apos;s content areas in ASE&apos;s proportions. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions drawn from all eight A-tests, with a 70% readiness line. No question appears in more than one test, and every Ohm&apos;s law and pressure reading is worked through in the explanation.
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
                Built on the ASE Task Lists
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each A-test is its own exam with its own task list. These are the scored questions ASE lists for each one; every practice test takes 5 to 7 questions from each test in the same proportions.
              </p>
              <div className="space-y-3">
                {tests.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ase", 1)}
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
            How to Pass the ASE Tests
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Study the task list for the test you booked</h3>
              <p>
                Every ASE question ties to a task on that test&apos;s list, and not every task appears on every form. Work through the training set for your test and note the tasks you have not done in the shop.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think in diagnosis, not part names</h3>
              <p>
                Most questions give a symptom and a test result and ask for the likely cause or the next step. Learn what each test isolates: compression versus leak-down, pressure with the valve closed, voltage drop under load.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your electrical math</h3>
              <p>
                Ohm&apos;s law, series and parallel resistance, power in watts and voltage drop appear in A6 and across A1, A7 and A8. Be quick with them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Each certification test includes 10 unscored research questions you cannot tell apart from the rest, so give every question your best answer. Aim for 80% or better on the practice tests before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ASE Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ase" />
        </div>
      </div>

      <ExamSampleQuestions examId="ase" />

      <ExamRelatedTests examId="ase" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your ASE Tests?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 320 questions across all eight Automobile tests, A1 to A8.</p>
          <ExamLandingCTA dashboardHref="/ase/dashboard" />
        </div>
      </div>
    </div>
  );
}
