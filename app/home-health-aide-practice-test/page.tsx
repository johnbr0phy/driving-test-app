import "@/lib/banks/hha";
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

const title = "Home Health Aide Practice Test 2026 - Free HHA Written Test Prep";
const metaDescription =
  "Free home health aide practice test: 200 original HHA questions on the subjects the federal rule lists, from patient rights and reporting to personal care, transfers, infection control, home safety and nutrition.";
const description =
  "Free practice for the written part of a home health aide (HHA) competency evaluation: 200 original questions on the subjects 42 CFR 484.80 requires, the aide's role and patient rights, observing and reporting, vital signs, personal care, mobility and skin, infection control, home safety and emergencies, nutrition and household tasks, and psychosocial care. Four 50-question practice tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "home health aide practice test, hha practice test, home health aide test, home health aide exam questions, hha written test, home health aide competency test, home health aide certification practice, free hha test, home health aide practice test 2026",
  alternates: {
    canonical: `${siteUrl}/home-health-aide-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/home-health-aide-practice-test`,
    images: [{ url: shareImageUrl("hha"), width: 1200, height: 630, alt: "Tigertest free home health aide practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hha")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the home health aide competency evaluation?",
    a: "Under the federal rule for Medicare home health agencies, 42 CFR 484.80, an aide may care for patients only after passing a competency evaluation run by a registered nurse. It must cover every subject the rule lists. Communication, vital signs, personal hygiene, transfers and range of motion are checked by watching the aide with a patient or a stand-in, and the other subjects may be tested in writing, orally or by observation.",
  },
  {
    q: "How many questions are on the HHA written test and what is the passing score?",
    a: "It depends on who gives it. States and agencies set their own tests. In the District of Columbia, for example, the written exam has 70 to 75 multiple-choice questions (the vendor's pages give both numbers) plus a skills evaluation, and no passing percentage is published. North Carolina recommends 80 percent for agency knowledge tests. Each practice test here has 50 questions, and 80 percent is a readiness line.",
  },
  {
    q: "What topics does the home health aide test cover?",
    a: "The federal rule lists communication, observing and reporting, temperature, pulse and respiration, infection control, body function changes to report, a clean and safe home, emergencies, the needs of the people served, personal hygiene and grooming, transfers and walking, range of motion and positioning, nutrition and fluids, and skin changes. DC's written outline weights the aide's role 25%, physical care 50%, psychosocial care 13% and household tasks 12%.",
  },
  {
    q: "How much training does a home health aide need?",
    a: "The federal minimum is 75 hours of classroom and supervised practical training, with at least 16 classroom hours before 16 hours of supervised practice. Aides then need at least 12 hours of in-service training every 12 months. Many states require more, so check your state's rules.",
  },
  {
    q: "Are these the real home health aide test questions?",
    a: "No. Every question is original, written by Tigertest from 42 CFR 484.80, the home health patient rights, care planning and infection control rules, the DC Board of Nursing content outline and skills listing, and CDC guidance. It is practice, not an official test, and it does not register you for or replace your state's or agency's evaluation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Home Health Aide Practice Test",
      description,
      url: `${siteUrl}/home-health-aide-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hha"),
      featureList: [
        "200 home health aide practice questions",
        "4 practice tests of 50 questions",
        "4 training sets across every federal HHA subject",
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
        classFaqJsonLd("hha"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Personal Care, Mobility & Skin", weight: "30%" },
  { name: "Role, Rights & Reporting", weight: "24%" },
  { name: "Infection Control & Home Safety", weight: "24%" },
  { name: "Nutrition & Household Tasks", weight: "12%" },
  { name: "Psychosocial Care & Communication", weight: "10%" },
];

export default function HhaLandingPage() {
  return (
    <div data-theme="hha" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Home Health Aide Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hha/dashboard"
            shortName="HHA"
            subtitle="200 original questions on the subjects the federal rule lists for home health aides: patient rights, reporting and vital signs, personal care, transfers and range of motion, infection control, home safety, nutrition and psychosocial care. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/hha-mobile.png", desktop: "/landing/hha-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hha" />

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
                Four training sets: role, rights and reporting; personal care and mobility; infection control and safety; and home care and psychosocial needs. Missed questions come back until you master them.
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
                Four practice tests weighted like a state written outline, with an 80% readiness line. No question appears in more than one test, and every answer is explained.
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
                Weighted Like a State Written Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the DC Board of Nursing&apos;s written outline for home health aides (role 25%, physical care 50%, psychosocial care 13%, household tasks 12%) across the subjects the federal rule lists. HHA instructors can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which areas the class misses most.
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
                src={getTigerAsset("hha", 3)}
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
            How to Pass the Home Health Aide Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put physical care first</h3>
              <p>
                Physical care is half of the written outline. Know the steps of bed baths, perineal and catheter care, mouth and denture care, dressing a weak arm, bedpans, transfers with a gait belt, positioning and range of motion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your role and its limits</h3>
              <p>
                The nurse or therapist writes your care instructions. You help with medications the patient takes on her own, report changes in condition, respect the right to refuse care, and report signs of abuse or neglect at once.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn infection control and home safety cold</h3>
              <p>
                Practice when to use soap and water instead of sanitizer, how gloves come off, standard precautions, oxygen and fire safety, fall hazards, and safe food temperatures until the answers are quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80 percent or better on every practice test before your evaluation, and retrain your weakest set after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Home Health Aide Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hha" />
        </div>
      </div>

      <ExamSampleQuestions examId="hha" />

      <ExamRelatedTests examId="hha" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Home Health Aide Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every subject of the home health aide test.</p>
          <ExamLandingCTA dashboardHref="/hha/dashboard" />
        </div>
      </div>
    </div>
  );
}
