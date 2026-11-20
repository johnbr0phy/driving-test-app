import "@/lib/banks/zafirearm";
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
const path = "/south-africa-firearm-competency-practice-test";

const title = "Free South Africa Firearm Competency Practice Test 2026";
const metaDescription =
  "200 original South Africa Firearms Control Act knowledge questions on licensing, safe custody and legal duties. Unit Standard 117705 study. Free to start.";
const description =
  "Independent legal knowledge practice associated with SAQA Unit Standard 117705: 200 original questions written from the Firearms Control Act 60 of 2000 with its enacted amendments and the Firearms Control Regulations. Four 50-question practice tests and four training sets covering legal foundations, licensing, safe custody, and duties and accountability.";

const faqs = [
  { q: "What does this firearm competency practice cover?", a: "This is independent legal knowledge practice associated with SAQA Unit Standard 117705. It covers statutory responsibilities, licensing, safe custody, ammunition possession, reporting and accountability under the Firearms Control Act and relevant regulations. It does not teach tactical use or replace practical handling assessment." },
  { q: "Are the 50 questions and 70% score official requirements?", a: "No. The four 50-question tests, topic distribution and 70% study target are editorial practice choices. They are not a verified universal provider assessment format or passing requirement. Confirm assessment arrangements with your accredited provider." },
  { q: "Does completing this give me competency or a firearm licence?", a: "No. Prescribed knowledge and practical training, SAPS competency certification and the appropriate licence are separate requirements. Tigertest is not an accredited firearm training provider, and this practice awards no unit-standard credits or licensing rights." },
  { q: "Is Unit Standard 117705 still available?", a: "The SAQA record has passed its registration end date but currently lists June 30, 2028 as the last enrolment date and June 30, 2031 as the last achievement date. PFTC still lists it as Category 1 legal knowledge. Check current provider and SAQA notices before enrolling. Proposed legislative changes are not treated as enacted law in this practice." },
  { q: "Is this practice free?", a: "It is free to start without an account. The first three training sets and practice tests are free; the final set and test require Premium. An account lets you save progress across devices." },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "south africa firearm competency practice test, firearms control act, 117705, firearm licence knowledge, gun competency legal knowledge",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("zafirearm"), width: 1200, height: 630, alt: "Tigertest free South Africa firearm competency practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("zafirearm")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free South Africa Firearm Competency Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("zafirearm"),
      featureList: [
        "200 Firearms Control Act knowledge questions",
        "4 practice tests of 50 questions across every topic",
        "4 training sets by topic",
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
        classFaqJsonLd("zafirearm"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Legal foundations", weight: "10 of 50" },
  { name: "Licensing", weight: "15 of 50" },
  { name: "Safe custody", weight: "12 of 50" },
  { name: "Duties and accountability", weight: "13 of 50" },
];

export default function ZaFirearmLandingPage() {
  return (
    <div data-theme="zafirearm" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free South Africa Firearm Competency Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/zafirearm/dashboard"
            shortName="SA Firearm Competency"
            subtitle="200 SA firearm competency legal questions and four practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/zafirearm-mobile.png", desktop: "/landing/zafirearm-desktop.png" }}
          />
          <p className="mt-10 rounded-xl border border-brand-border-light bg-white dark:bg-gray-900 p-5 text-left text-gray-700 dark:text-gray-200">
            <strong>Legal knowledge study only.</strong> This is not accredited training or a practical firearm assessment. The 50-question format and 70% target are study choices, not official provider requirements. Completing practice does not grant competency certification or permission to possess a firearm.
          </p>
        </div>
      </div>

      <ExamFacts examId="zafirearm" />

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
                Start with Legal Foundations, then study Licensing, Safe Custody, and Duties and Accountability. Read the explanation after every answer. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use the four fixed practice tests to review every topic, aiming for the 70% study target. Then continue with an accredited provider for the prescribed knowledge and practical assessments.
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
                Written from the Firearms Control Act
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Questions use the Act with enacted amendments and relevant regulations, including the amended storage rules. The topic counts are our study distribution, not an official assessment blueprint. Provider assessment, practical skills, business qualifications and tactical training are outside this bank.
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
                src={getTigerAsset("zafirearm", 1)}
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
            We just launched this practice bank. Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
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
            How to Study Firearms Control Act Knowledge
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Keep the stages distinct</h3>
              <p>Keep training results, SAPS competency certification and firearm licensing distinct. Each is a separate requirement.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn each notification duty</h3>
              <p>Read the exact trigger and deadline for each notification duty, such as reporting a lost or stolen firearm.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check conditions and exceptions</h3>
              <p>Check the conditions and exceptions before applying a storage or ammunition rule.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Study the current law with your course</h3>
              <p>Study the current Act and regulations alongside your accredited course materials, and drill the questions you missed after each practice test.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SA Firearm Competency Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="zafirearm" />
        </div>
      </div>

      <ExamSampleQuestions examId="zafirearm" count={4} />

      <ExamRelatedTests examId="zafirearm" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Study Firearms Control Act Knowledge?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on licensing, safe custody and legal duties.</p>
          <ExamLandingCTA dashboardHref="/zafirearm/dashboard" />
        </div>
      </div>
    </div>
  );
}
