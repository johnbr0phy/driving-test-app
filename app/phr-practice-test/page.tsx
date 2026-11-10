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

const siteUrl = SITE_URL;

const title = "PHR Practice Test 2026 - Free HRCI PHR Exam Questions with Explanations";
const metaDescription =
  "Free PHR practice: 200 original questions on HRCI's seven functional areas, four 50-question mock tests weighted like the real exam, every answer explained with current federal employment law.";
const description =
  "Free practice for the HRCI Professional in Human Resources (PHR) exam: 200 original questions written from the PHR Exam Content Outline that took effect in 2024. Four 50-question mock tests weighted like the real exam across business management, workforce planning and talent acquisition, learning and development, total rewards, employee engagement, employee and labor relations, and HR information management, with five training sets and US federal employment law as in force in 2026.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "phr practice test, phr exam questions, hrci phr practice exam, professional in human resources practice test, phr certification practice, phr exam prep 2026, free phr practice questions",
  alternates: {
    canonical: `${siteUrl}/phr-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/phr-practice-test`,
    images: [{ url: shareImageUrl("phr"), width: 1200, height: 630, alt: "Tigertest free PHR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phr")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the PHR exam?",
    a: "The Professional in Human Resources (PHR) is HRCI's certification for HR professionals who implement programs and handle day-to-day HR operations, grounded in US laws and regulations. It is a computer-based exam taken at a Pearson VUE testing center or online through OnVUE remote proctoring. To be eligible you need one year of professional-level HR experience with a master's degree, two years with a bachelor's degree, or four years of experience.",
  },
  {
    q: "How many questions are on the PHR exam and what score do I need?",
    a: "The PHR has 115 questions in 2 hours, plus 30 minutes for check-in, the tutorial and a survey. 90 questions are scored and 25 are unscored pretest questions mixed in with them. HRCI reports a scaled score and the passing score is 500 on every form; it does not publish a percentage. Each mock test here has 50 questions, and 70% is Tigertest's readiness line, not an HRCI figure.",
  },
  {
    q: "What does the PHR exam cover?",
    a: "The PHR Exam Content Outline, in effect since 2024, has seven functional areas: Business Management (14%), Workforce Planning and Talent Acquisition (14%), Learning and Development (10%), Total Rewards (15%), Employee Engagement (17%), Employee and Labor Relations (20%) and HR Information Management (10%). Federal employment law runs through several of them: Title VII, the ADA, ADEA, FMLA, FLSA, NLRA, OSHA, ERISA, COBRA and IRCA.",
  },
  {
    q: "Do I need to know the latest employment law changes?",
    a: "Yes. HRCI says candidates are responsible for the HR laws and regulations in effect on the day of their exam. This bank uses federal law as of November 2026, including the Pregnant Workers Fairness Act, the PUMP Act, recent Supreme Court decisions such as Groff v. DeJoy, Muldrow and Ames, and the 2025 revocation of Executive Order 11246. It leaves out dollar thresholds that change by rule or each year.",
  },
  {
    q: "Are these the real PHR exam questions?",
    a: "No. Every question is original, written by Tigertest from HRCI's published content outline and current federal law. The real exam also uses multiple-response, fill-in-the-blank, drag-and-drop and scenario items; here every item is single-answer multiple choice. It is free practice and is not affiliated with HRCI.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PHR Practice Test",
      description,
      url: `${siteUrl}/phr-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 PHR practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "5 training sets by functional area",
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
        classFaqJsonLd("phr"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Business Management", weight: "14%" },
  { name: "Workforce Planning and Talent Acquisition", weight: "14%" },
  { name: "Learning and Development", weight: "10%" },
  { name: "Total Rewards", weight: "15%" },
  { name: "Employee Engagement", weight: "17%" },
  { name: "Employee and Labor Relations", weight: "20%" },
  { name: "HR Information Management", weight: "10%" },
];

export default function PhrLandingPage() {
  return (
    <div data-theme="phr" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PHR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/phr/dashboard"
            shortName="PHR"
            subtitle="200 original questions on all seven PHR functional areas: business management, talent acquisition, learning, total rewards, engagement, employee and labor relations, and HR information management. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phr-mobile.png", desktop: "/landing/phr-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phr" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Functional Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: business management and HR information; talent acquisition and learning; total rewards; employee engagement; and employee and labor relations. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in the real exam&apos;s proportions, scored against a 70% readiness line. No question appears in more than one test, and every metric, from turnover to compa-ratio, is worked through in the explanation.
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
                Built on the PHR Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                HRCI weights the 90 scored questions across seven functional areas. Each mock test here keeps the same balance: 7 business management, 7 talent acquisition, 5 learning and development, 7 total rewards, 9 employee engagement, 10 employee and labor relations and 5 HR information questions in every 50.
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
                src={getTigerAsset("phr", 1)}
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
            How to Prepare for the PHR Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn each law&apos;s coverage and clock</h3>
              <p>
                Many questions turn on who a law covers and how fast you must act: 15 employees for Title VII, the ADA and GINA, 20 for the ADEA and COBRA, 50 for the FMLA, 100 for WARN and the EEO-1. Then the clocks: three business days for Section 2 of the I-9, 60 days to elect COBRA, 8 hours to report a fatality to OSHA.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Spend the most time on employee relations and engagement</h3>
              <p>
                Employee and Labor Relations (20%) and Employee Engagement (17%) are over a third of the exam. Know harassment and investigation steps, union campaign rules, progressive discipline, PIPs, layoffs and the rating errors managers make.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the HR metrics by hand</h3>
              <p>
                Expect turnover, yield ratios, absence rate, ROI, compa-ratio, range penetration, the four-fifths rule and the FLSA regular rate with a bonus. Write each formula once and work every calculation in the training sets until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer as the HR professional who implements</h3>
              <p>
                The PHR tests operational judgment: the best answer usually follows policy and law, documents the facts, treats people consistently and escalates when needed. Aim for 85% or better on every mock test before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PHR Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="phr" />
        </div>
      </div>

      <ExamRelatedTests examId="phr" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PHR Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every PHR functional area.</p>
          <ExamLandingCTA dashboardHref="/phr/dashboard" />
        </div>
      </div>
    </div>
  );
}
