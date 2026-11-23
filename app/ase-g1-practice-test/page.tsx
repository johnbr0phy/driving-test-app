import "@/lib/banks/aseg1";
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

const title = "Free ASE G1 Practice Test 2026 - Auto Maintenance and Light Repair";
const metaDescription =
  "ASE G1 practice for the Auto Maintenance and Light Repair test: 220 original questions written from ASE's 2026 G1 task list, five training sets and four 50-question practice tests at the official content mix, every answer explained. Start for free.";
const description =
  "Practice for the ASE G1 Auto Maintenance and Light Repair certification test: 220 original questions written from the task list in the 2026 Official ASE Study Guide for G1. Five training sets (engine systems; transmissions, drive train and axles; suspension and steering; brakes; electrical and HVAC) and four practice tests of 50 questions, each with the official content-area mix. Start for free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ase g1 practice test, ase g1 test, auto maintenance and light repair practice test, ase g1 certification, ase g1 practice questions, ase entry level certification, maintenance and light repair test, g1 ase study guide",
  alternates: {
    canonical: `${siteUrl}/ase-g1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ase-g1-practice-test`,
    images: [{ url: shareImageUrl("aseg1"), width: 1200, height: 630, alt: "Tigertest ASE G1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aseg1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ASE G1 test?",
    a: "G1 is the Auto Maintenance and Light Repair certification test from the National Institute for Automotive Service Excellence (ASE). It covers the maintenance and light repair work an entry-level technician does across seven content areas: engine systems, automatic transmission/transaxle, manual drive train and axles, suspension and steering, brakes, electrical, and heating, ventilation and air conditioning.",
  },
  {
    q: "How many questions are on the ASE G1 test?",
    a: "ASE's G1 test page lists 55 scored questions plus 10 unscored research questions, with 90 minutes to finish. The G1R recertification test is 28 questions in 45 minutes. ASE does not publish a passing score, so the practice tests here use 70 percent as a readiness line.",
  },
  {
    q: "How is this practice organized?",
    a: "The study guide's test specification weights the content areas as engine 9, automatic transmission 4, manual drive train 6, suspension and steering 13, brakes 11, electrical 8 and HVAC 4 of every 50 questions. Each Tigertest practice test has exactly that mix, and the five training sets follow the same areas.",
  },
  {
    q: "Can I take the ASE G1 test at home?",
    a: "Yes. ASE's Certification: Need to Know guide says the G1 initial certification test is eligible for remote testing through Prometric ProProctor, as well as at a test center. Questions can also be shown side by side in Spanish. Certification needs one year of documented work experience, up to half of which can come from vocational training, and lasts five years.",
  },
  {
    q: "Are these the real ASE G1 questions?",
    a: "No. Every question is original, written by Tigertest from the G1 task list and from primary rules such as the federal tire standards (FMVSS 110 and 139, tire identification and grading rules) and the EPA's air conditioning servicing rules. Like the real test, every question is multiple choice with one correct answer. Tigertest is not affiliated with ASE.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - ASE G1 Practice Test",
      description,
      url: `${siteUrl}/ase-g1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aseg1"),
      featureList: [
        "220 ASE G1 practice questions",
        "5 training sets by content area",
        "4 practice tests of 50 questions at the official mix",
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
        classFaqJsonLd("aseg1"),
      ],
    },
  ],
};

const areas = [
  { name: "Engine Systems", weight: "16%" },
  { name: "Automatic Transmission/Transaxle", weight: "7%" },
  { name: "Manual Drive Train and Axles", weight: "11%" },
  { name: "Suspension and Steering", weight: "24%" },
  { name: "Brakes", weight: "20%" },
  { name: "Electrical", weight: "15%" },
  { name: "Heating, Ventilation, and Air Conditioning", weight: "7%" },
];

export default function AseG1LandingPage() {
  return (
    <div data-theme="aseg1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ASE G1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ase-g1/dashboard"
            shortName="ASE G1"
            subtitle="220 G1 maintenance and light repair questions, five training sets and four practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/aseg1-mobile.png", desktop: "/landing/aseg1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aseg1" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets that follow the G1 task list, from oil and coolant service to tires, brakes and batteries. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests at the Real Mix</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions with G1&apos;s official content-area mix and a 70% readiness line. No question appears in more than one test, and every answer is explained.
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
                Built on the G1 Task List
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are the content areas in ASE&apos;s G1 test specification and their share of the test. Every practice test uses the same mix.
              </p>
              <div className="space-y-3">
                {areas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("aseg1", 3)}
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
            How to Prepare for the ASE G1 Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work through the whole task list</h3>
              <p>
                Every G1 question ties to a task on the list, and the test touches all seven areas. Train each set and note the tasks you have not done in the shop, such as a TPMS relearn or a drum brake rebuild.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Put the most time into suspension, steering and brakes</h3>
              <p>
                Together they are almost half the test. Know tire wear patterns, sidewall and placard information, alignment order, and drum and disc service from measurement to burnish.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your basic electrical checks</h3>
              <p>
                Battery testing and charging, voltage drop, current draw and Ohm&apos;s law come up in the electrical area. Be quick with how a meter is connected and what each reading means.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                The G1 test includes 10 unscored research questions you cannot tell apart from the rest, so give every question your best answer. Aim for 80% or better on the practice tests before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ASE G1 Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aseg1" />
        </div>
      </div>

      <ExamSampleQuestions examId="aseg1" />

      <ExamRelatedTests examId="aseg1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your ASE G1 Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 220 questions across all seven G1 content areas.</p>
          <ExamLandingCTA dashboardHref="/ase-g1/dashboard" />
        </div>
      </div>
    </div>
  );
}
