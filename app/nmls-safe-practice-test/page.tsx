import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "NMLS Practice Test 2026 - Free SAFE MLO Questions with Explanations";
const metaDescription =
  "Free NMLS SAFE MLO practice: 200 original questions on the national test with Uniform State Content, four 50-question mock tests weighted like the real exam with its 75% pass line, every answer explained.";
const description =
  "Free practice for the NMLS SAFE Mortgage Loan Originator Test, National Test with Uniform State Content: 200 original questions written from the NMLS content outline. Four 50-question mock tests weighted like the real 120-question exam, with its 75 percent passing score, and five training sets covering TILA, RESPA and TRID, other federal laws and state licensing, mortgage programs and products, origination and closing calculations, and ethics, fraud and fair lending.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nmls practice test, safe mlo test, nmls exam practice questions, mortgage loan originator test, uniform state test, nmls national test, mlo license exam, nmls practice test 2026",
  alternates: {
    canonical: `${siteUrl}/nmls-safe-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nmls-safe-practice-test`,
    images: [{ url: shareImageUrl("nmls"), width: 1200, height: 630, alt: "Tigertest free NMLS SAFE MLO practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nmls")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NMLS SAFE MLO test?",
    a: "It is the SAFE Mortgage Loan Originator Test, the National Test with Uniform State Content that every state uses to license mortgage loan originators under the federal SAFE Act. It is run through the Nationwide Multistate Licensing System (NMLS) and delivered by Prometric at test centers or online with remote proctoring. One passing result meets the test requirement of every state.",
  },
  {
    q: "How many questions are on the NMLS test and what is the passing score?",
    a: "The test has 120 multiple-choice questions, of which 115 are scored and 5 are unscored pretest items, and you have 190 minutes. You need 75% or better to pass, a standard set by the SAFE Act. Each mock test here has 50 questions in the same proportions as the real test and uses the same 75 percent pass line.",
  },
  {
    q: "What does the NMLS test cover?",
    a: "The NMLS content outline has five areas: federal mortgage-related laws (24%), Uniform State Content (11%), general mortgage knowledge (20%), mortgage loan origination activities (27%) and ethics (18%). Federal law means Regulation Z with TRID, RESPA, ECOA, HMDA, FCRA, the Bank Secrecy Act and privacy rules; the state content is the SAFE Act and the model state law on licensing and conduct.",
  },
  {
    q: "What happens if I do not pass the NMLS test?",
    a: "Under the SAFE Act you may retake the test after waiting at least 30 days, and you get three attempts in a row on that schedule. After a third failure in a row you must wait at least six months. Most candidates also need 20 hours of NMLS-approved pre-licensing education before they can be licensed.",
  },
  {
    q: "Are these the real NMLS test questions?",
    a: "No. Every question is original, written by Tigertest from the published NMLS content outline and the current federal rules, such as TRID timing and the 2026 limits on mortgage trigger leads. It is free practice, not affiliated with NMLS, CSBS or any state regulator, and it does not replace your approved pre-licensing education.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NMLS SAFE MLO Practice Test",
      description,
      url: `${siteUrl}/nmls-safe-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 NMLS SAFE MLO practice questions",
        "4 mock tests of 50 questions weighted like the real test, 75% to pass",
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
  { name: "Federal mortgage-related laws", weight: "24%" },
  { name: "Uniform State Content", weight: "11%" },
  { name: "General mortgage knowledge", weight: "20%" },
  { name: "Mortgage loan origination activities", weight: "27%" },
  { name: "Ethics", weight: "18%" },
];

export default function NmlsLandingPage() {
  return (
    <div data-theme="nmls" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NMLS SAFE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nmls/dashboard"
            shortName="NMLS SAFE"
            subtitle="200 original questions on the NMLS outline: TILA and TRID, RESPA, ECOA, the SAFE Act and state licensing, loan programs, qualifying and closing math, and ethics. Four 50-question mock tests with the 75% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nmls-mobile.png", desktop: "/landing/nmls-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nmls" />

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
                Five training sets: TILA, RESPA and TRID; other federal laws and state licensing; mortgage programs and products; origination, closing and calculations; and ethics, fraud and fair lending. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions in the real test&apos;s proportions, each needing 75% to pass. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the NMLS Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NMLS splits the 120 questions across five content areas. Each mock test here keeps the same balance: 12 federal law, 6 Uniform State Content, 10 general knowledge, 13 origination and 9 ethics questions in every 50.
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
                src={getTigerAsset("nmls", 1)}
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
            How to Pass the NMLS SAFE Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build a TRID timeline</h3>
              <p>
                Write the clock out once: Loan Estimate within three business days of the six-item application, no fees but a credit report fee before intent to proceed, Closing Disclosure received three business days before consummation, and only three changes that restart that wait.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn which law each rule comes from</h3>
              <p>
                Many questions turn on the source: kickbacks and escrow are RESPA, rescission and advertising are Regulation Z, adverse action timing is ECOA, the opt-out is GLBA. Sort each fact you learn under its law and the right choice is easier to spot.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the math by hand</h3>
              <p>
                Expect LTV and CLTV, front and back ratios, points, per diem interest, monthly interest and ARM adjustments with caps. Use the lower of price or appraised value for LTV, and check the cap before you accept the fully indexed rate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer ethics questions as a compliance officer would</h3>
              <p>
                When a borrower or agent asks you to leave something out, share data or nudge an appraiser, the answer is the one that keeps the file accurate and the borrower informed. Aim for 85% or better on every mock test before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NMLS SAFE Test Frequently Asked Questions
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

      <ExamRelatedTests examId="nmls" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NMLS SAFE Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the NMLS outline.</p>
          <ExamLandingCTA dashboardHref="/nmls/dashboard" />
        </div>
      </div>
    </div>
  );
}
