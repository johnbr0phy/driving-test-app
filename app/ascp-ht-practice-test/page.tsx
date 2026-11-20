import "@/lib/banks/ascpht";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const title = "Free HT(ASCP) Practice Test 2026 - ASCP Histotechnician Questions";
const metaDescription =
  "Free-to-start HT(ASCP) practice test: 200 original histotechnician questions on the ASCP BOC content guideline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the ASCP Board of Certification Histotechnician HT(ASCP) exam: 200 original questions written from the BOC's published HT and HTL examination content guideline. Four 50-question practice tests weighted like the real exam's five content areas, and five training sets covering fixation, processing, embedding and microtomy, staining, and laboratory operations.";

const faqs = [
  {
    q: "What is the HT(ASCP) exam?",
    a: "It is the histotechnician certification exam of the American Society for Clinical Pathology Board of Certification (ASCP BOC). Passing it earns the HT(ASCP) credential, or HT(ASCPi) for the international version. Histotechnicians prepare tissue for diagnosis: fixation, processing, embedding, cutting and staining. The HTL(ASCP) is the separate scientist-level exam.",
  },
  {
    q: "How many questions are on the HT(ASCP) exam?",
    a: "The BOC content guideline says the exam has 100 multiple-choice questions with one best answer, given in 2 hours 30 minutes. It is computer adaptive, so the questions each candidate sees depend on earlier answers. Tigertest models it as four fixed 50-question practice tests.",
  },
  {
    q: "What score do you need to pass the HT(ASCP) exam?",
    a: "The ASCP BOC reports a scaled score rather than a percent correct, on a scale from 100 to 999 with 400 to pass. The 70 percent line on these practice tests is a readiness target, not the official standard.",
  },
  {
    q: "What is on the HT(ASCP) exam?",
    a: "Staining is the largest content area at 30 to 40 percent. Fixation and embedding and microtomy are 15 to 25 percent each, processing is 10 to 20 percent, and laboratory operations, including safety, lab math and regulations, is 10 to 15 percent. Some topics, such as immunohistochemistry staining theory and management, are on the HTL exam only. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real HT(ASCP) exam questions?",
    a: "No. Every question is original, written by Tigertest from the ASCP BOC content guideline and from public rules such as the OSHA formaldehyde standard and the CLIA laboratory rules. It covers the same knowledge without copying the exam. Tigertest is not affiliated with the American Society for Clinical Pathology.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ht ascp practice test, ascp ht exam, histotechnician practice test, histotechnician exam, ascp boc ht, ht(ascp) 2026, histology technician exam questions, histotechnician certification",
  alternates: {
    canonical: `${siteUrl}/ascp-ht-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ascp-ht-practice-test`,
    images: [{ url: shareImageUrl("ascpht"), width: 1200, height: 630, alt: "Tigertest free HT(ASCP) practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ascpht")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HT(ASCP) Practice Test",
      description,
      url: `${siteUrl}/ascp-ht-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ascpht"),
      featureList: [
        "200 HT(ASCP) practice questions",
        "4 practice tests of 50 questions weighted like the ASCP BOC content guideline",
        "5 training sets by content area",
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
        classFaqJsonLd("ascpht"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Staining", weight: "30-40%" },
  { name: "Fixation", weight: "15-25%" },
  { name: "Embedding/Microtomy", weight: "15-25%" },
  { name: "Processing", weight: "10-20%" },
  { name: "Laboratory Operations", weight: "10-15%" },
];

export default function AscpHtLandingPage() {
  return (
    <div data-theme="ascpht" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HT(ASCP) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ascp-ht/dashboard"
            shortName="HT"
            subtitle="200 ASCP histotechnician questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ascpht-mobile.png", desktop: "/landing/ascpht-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ascpht" />

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
                Five training sets follow the ASCP BOC content guideline: fixation; processing and decalcification; embedding and microtomy; H&amp;E, carbohydrate and connective tissue stains; and special stains with laboratory operations. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four fixed practice tests of 50 questions, each weighted like the content areas of the real exam. The real exam is computer adaptive; these are not. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the ASCP BOC Content Guideline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The BOC publishes a percentage range for each content area of its 100-question exam, and every practice test here stays inside those ranges, scaled to 50 questions: 17 on staining, 10 each on fixation and on embedding and microtomy, 7 on processing, and 6 on laboratory operations. Histotechnology program instructors can set Tigertest as board review at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("ascpht", 3)}
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
            How to Pass the HT(ASCP) Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put staining first</h3>
              <p>
                Staining is up to 40% of the exam. For each stain on the BOC list, know what it shows, its key reagents and the expected colors: PAS and diastase, Alcian blue at each pH, mucicarmine, trichrome, Verhoeff-van Gieson, reticulin, Congo red, Prussian blue, GMS, acid-fast and Gram stains.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know fixatives and their artifacts</h3>
              <p>
                Learn what each fixative on the BOC list is for and what it does to tissue: neutral buffered formalin, Bouin, Carnoy, Zamboni, glutaraldehyde, alcohols and Michel medium, plus formalin pigment and how fixation time, volume and temperature change results.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Troubleshoot like you are at the bench</h3>
              <p>
                Many questions describe a problem: soft blocks, chatter, ribbons that will not form, smeared frozen sections, a milky mount. Work out which step caused it. Practice the lab math too: percent solutions, dilutions and molarity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HT(ASCP) Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ascpht" />
        </div>
      </div>

      <ExamSampleQuestions examId="ascpht" />

      <ExamRelatedTests examId="ascpht" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the HT(ASCP) Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every HT content area of the ASCP BOC guideline.</p>
          <ExamLandingCTA dashboardHref="/ascp-ht/dashboard" />
        </div>
      </div>
    </div>
  );
}
