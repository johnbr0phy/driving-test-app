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

const title = "Home Inspector Exam Practice Test 2026 - Free NHIE Questions with Explanations";
const metaDescription =
  "Free National Home Inspector Examination practice: 200 original questions on the EBPHI content outline, four 50-question mock tests weighted like the real NHIE, every answer explained.";
const description =
  "Free practice for the National Home Inspector Examination (NHIE): 200 original questions written from the EBPHI content outline. Four 50-question mock tests weighted like the real 200-question exam, and five training sets covering site, exterior and roofing; structure, interiors, fireplaces and life safety; electrical and plumbing; heating, cooling and ventilation; and reporting and professional practice.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "home inspector exam practice test, national home inspector examination, nhie practice test, nhie practice questions, home inspection exam, home inspector license exam, ebphi exam, home inspector practice test 2026",
  alternates: {
    canonical: `${siteUrl}/home-inspector-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/home-inspector-exam-practice-test`,
    images: [{ url: shareImageUrl("nhie"), width: 1200, height: 630, alt: "Tigertest free home inspector exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nhie")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the National Home Inspector Examination?",
    a: "The National Home Inspector Examination (NHIE) is the competency exam for home inspectors written by the Examination Board of Professional Home Inspectors (EBPHI), an independent not-for-profit. EBPHI says it is used for home inspector regulation in 35 states and several Canadian provinces, and some professional associations also require it. It is delivered at PSI test centers in most states and in Canada, and through Pearson VUE in Florida, Nevada and Texas.",
  },
  {
    q: "How many questions are on the NHIE and how is it scored?",
    a: "The exam has 200 multiple-choice questions, 25 of which are unscored pretest items, and you have four hours. Scores are scaled from 200 to 800 and 500 is the passing score, set by expert standard setting rather than a fixed percentage. Each mock test here has 50 questions in the same proportions and uses a 70 percent readiness target.",
  },
  {
    q: "What does the home inspector exam cover?",
    a: "EBPHI's content outline has three domains: property and building inspection and site review (70%), analysis of findings and reporting (20%) and professional responsibilities (10%). The first domain covers the site, exterior, roof, structure, electrical, cooling, heating, insulation and ventilation, exhaust, plumbing and fuel, interiors, fireplaces and chimneys, and life safety equipment.",
  },
  {
    q: "Do I need a license to be a home inspector?",
    a: "It depends on where you work. Licensing rules, required training hours, insurance and whether the NHIE is required vary by state and province, and a few states give their own version of the exam through a contracted test provider. Check with your state's licensing board before you register.",
  },
  {
    q: "Are these the real NHIE questions?",
    a: "No. Every question is original, written by Tigertest from EBPHI's published content outline and the codes it lists as references, such as the International Residential Code and the National Electrical Code. Image-based questions are described in words. It is free practice, not affiliated with EBPHI, PSI or any state licensing board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Home Inspector Exam Practice Test",
      description,
      url: `${siteUrl}/home-inspector-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 National Home Inspector Examination practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
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
  { name: "Property and building inspection/site review", weight: "70%" },
  { name: "Analysis of findings and reporting", weight: "20%" },
  { name: "Professional responsibilities", weight: "10%" },
];

export default function HomeInspectorLandingPage() {
  return (
    <div data-theme="nhie" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Home Inspector Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/home-inspector/dashboard"
            shortName="Home Inspector"
            subtitle="200 original questions on the EBPHI outline for the National Home Inspector Examination: site and roof, structure, electrical, heating and cooling, plumbing, fireplaces and life safety, reporting, and agreements and ethics. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nhie-mobile.png", desktop: "/landing/nhie-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nhie" />

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
                Five training sets: site, exterior and roofing; structure, interiors, fireplaces and life safety; electrical and plumbing; heating, cooling and ventilation; and reporting and professional practice. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in the real exam&apos;s proportions, with a 70% target. No question appears in more than one test, and every answer comes with an explanation.
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
                Built on the EBPHI Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                EBPHI splits the National Home Inspector Examination across three domains. Each mock test here keeps the same balance: 35 inspection questions, 10 reporting questions and 5 professional practice questions in every 50.
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
                src={getTigerAsset("nhie", 1)}
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
            How to Pass the National Home Inspector Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Spend most of your time on the house itself</h3>
              <p>
                Seven in ten scored questions come from inspecting the property: roof, structure, electrical, heating and cooling, plumbing, fireplaces and life safety. Learn the common types, the usual defects and why each defect matters to the people living there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the handful of numbers inspectors use every day</h3>
              <p>
                Guard height and baluster spacing, stair rise and run, egress window size, hearth extensions, chimney height, TPR discharge, water pressure, dryer duct length and panel working space come up again and again. Write them on one page and drill them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like the report</h3>
              <p>
                Reporting is a fifth of the exam. For each finding, ask what it is, where it is, why it matters, whether it is an immediate hazard and who should evaluate it. Say what you could not see and why.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Protect the client and your objectivity</h3>
              <p>
                Professional practice questions turn on the pre-inspection agreement, conflicts of interest, insurance and the client&apos;s privacy. The right answer keeps you working for the client, in writing and within your expertise. Aim for 80% or better on every mock test before you sit the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Home Inspector Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="nhie" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Home Inspector Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the EBPHI outline.</p>
          <ExamLandingCTA dashboardHref="/home-inspector/dashboard" />
        </div>
      </div>
    </div>
  );
}
