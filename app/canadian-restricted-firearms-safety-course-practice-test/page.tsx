import "@/lib/banks/crfsc";
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
const path = "/canadian-restricted-firearms-safety-course-practice-test";

const title = "Free CRFSC Practice Test 2026 - Canadian Restricted Firearms Safety Course Questions";
const metaDescription =
  "Free-to-start CRFSC practice test: 200 original questions on handguns, actions, ammunition, firing, care and the federal rules for restricted firearms, every answer explained.";
const description =
  "Practice for the written test of the Canadian Restricted Firearms Safety Course (CRFSC), the course you pass with the CFSC for a restricted Possession and Acquisition Licence: 200 original questions written from the RCMP Canadian Firearms Program's topic list and the federal Firearms Act and regulations. Four 50-question practice tests and four training sets covering handgun parts and safety, ammunition and handgun actions, firing techniques and care, and the laws on storing, displaying and transporting restricted firearms.";

const faqs = [
  {
    q: "What is the CRFSC?",
    a: "The Canadian Restricted Firearms Safety Course is the RCMP Canadian Firearms Program's course for anyone who wants to acquire restricted firearms, such as most handguns. You must pass its written test and its practical test. To apply for a licence for restricted firearms, the RCMP says you need both the CFSC and the CRFSC.",
  },
  {
    q: "What does the CRFSC cover?",
    a: "The RCMP lists the topics as the evolution of firearms, major parts, types and actions; basic firearms safety practices; ammunition; operating handgun actions; firing techniques and procedures for handguns; care of restricted firearms; responsibilities of the firearms owner and user; and safe storage, display, transportation and handling of restricted firearms. The training sets here follow that order.",
  },
  {
    q: "What score do you need to pass the CRFSC?",
    a: "The RCMP does not publish a pass mark online. Course providers say the pass mark is 80% on each test, the written multiple-choice test and the practical test, so these practice tests use 80% as the target. Ask your instructor for the exact format of your course.",
  },
  {
    q: "Can I still buy a handgun after taking the CRFSC?",
    a: "Since the national handgun freeze came into force on October 21, 2022, most individuals cannot buy, sell or transfer handguns, with narrow exceptions such as some Olympic and Paralympic discipline shooters. The CRFSC is still the safety course for restricted firearms, licensed owners can keep and use registered handguns, and other restricted firearms are not covered by the freeze. Check the current rules with the Canadian Firearms Program before you buy.",
  },
  {
    q: "Are these the real CRFSC test questions?",
    a: "No. Every question is original, written by Tigertest from the RCMP's published topic list and the text of the Firearms Act, the Criminal Code and the storage and authorization regulations, so it covers the same knowledge without copying the course test. The practical handling test is not modelled. Tigertest is not affiliated with the RCMP.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "crfsc practice test, crfsc exam, canadian restricted firearms safety course test, rpal practice test, rpal test questions, restricted pal exam, crfsc questions 2026, handgun safety course canada",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("crfsc"), width: 1200, height: 630, alt: "Tigertest free CRFSC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("crfsc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CRFSC Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("crfsc"),
      featureList: [
        "200 CRFSC practice questions",
        "4 practice tests of 50 questions",
        "4 training sets in the RCMP topic order",
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
  { name: "Operating handgun actions", weight: "16%" },
  { name: "Firing techniques and range procedures", weight: "14%" },
  { name: "Responsibilities and the law", weight: "14%" },
  { name: "Parts, types and evolution of firearms", weight: "12%" },
  { name: "Basic firearms safety", weight: "12%" },
  { name: "Ammunition", weight: "12%" },
  { name: "Storage, display and transportation", weight: "12%" },
  { name: "Care of restricted firearms", weight: "8%" },
];

export default function CrfscLandingPage() {
  return (
    <div data-theme="crfsc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CRFSC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/canadian-restricted-firearms/dashboard"
            shortName="CRFSC"
            subtitle="200 original questions for the Canadian Restricted Firearms Safety Course: handgun parts and actions, ammunition, firing, care, and the rules for storing and transporting restricted firearms. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/crfsc-mobile.png", desktop: "/landing/crfsc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="crfsc" />

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
                Four training sets follow the RCMP course topics: handgun parts and safety; ammunition and handgun actions; firing techniques and care; and the laws on storing, displaying and transporting restricted firearms. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each covering every course topic. Aim for 80% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the RCMP Course Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The RCMP Canadian Firearms Program lists eight topics for the CRFSC but publishes no weights, so every practice test here spreads its 50 questions across all eight, with the most on operating handgun actions, firing and the law. The legal questions are written from the Firearms Act, the Criminal Code and the storage and authorization regulations as they stand in 2026.
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
                src={getTigerAsset("crfsc", 3)}
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
            How to Pass the CRFSC
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know revolvers and pistols inside out</h3>
              <p>
                Learn how single-action, double-action and striker-fired handguns work, how to open, load, unload and prove each one, and what a stovepipe, double feed or failure to extract looks like.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the restricted storage and transport rules</h3>
              <p>
                Restricted firearms have stricter rules than non-restricted ones: a locking device and a locked container for storage, a locked opaque case for transport, and attachment to a structure for display. Know where you may possess a restricted firearm and what an authorization to transport covers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the fundamentals of handgun shooting</h3>
              <p>
                Grip, stance, sight alignment and a smooth trigger press matter more with a handgun than a long gun. Know the range commands and why the muzzle never leaves the safe direction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or better on every practice test before your course. After each test, drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CRFSC Frequently Asked Questions
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

      <ExamSampleQuestions examId="crfsc" />

      <ExamRelatedTests examId="crfsc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CRFSC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic of the RCMP restricted course.</p>
          <ExamLandingCTA dashboardHref="/canadian-restricted-firearms/dashboard" />
        </div>
      </div>
    </div>
  );
}
