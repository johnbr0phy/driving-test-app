import "@/lib/v2/banks/naplex";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free NAPLEX Practice Test 2026 - Pharmacist Licensure Exam Questions";
const metaDescription =
  "NAPLEX practice test: 236 original pharmacist licensure questions on NABP's 2025 content outline, with typed calculations, select all that apply, ordered questions and explanations.";
const description =
  "NAPLEX practice tests with 236 original questions weighted like NABP's NAPLEX Content Outline effective May 1, 2025: foundational knowledge, the medication use process, person-centered assessment and treatment planning, professional practice, and pharmacy management and leadership. Each practice test is 100 questions at the real pace, in order with no going back, with multiple choice, select all that apply, typed numeric calculations and ordered response questions, an on-screen calculator and an explanation on every answer.";

const faqs = [
  {
    q: "What is on the NAPLEX?",
    a: "The NAPLEX content outline in force since May 1, 2025 has five domains, weighted as a share of the 200 scored questions: Foundational Knowledge for Pharmacy Practice 25% (pharmacology, pharmacokinetics, pharmaceutics, compounding, calculations, drug development, biostatistics and drug information), Medication Use Process 25% (interpreting prescriptions and orders, therapeutic substitution, immunization, and handling, storage and disposal), Person-Centered Assessment and Treatment Planning 40% (histories, reconciliation, drug therapy problems, monitoring, patient education, OTC products and devices), Professional Practice 5% and Pharmacy Management and Leadership 5%.",
  },
  {
    q: "How long is the NAPLEX and how many questions does it have?",
    a: "The NAPLEX is a 6-hour computerized exam of 225 questions in a fixed form. 200 are scored and 25 are unscored pretest questions spread through the exam. There are two optional 10-minute breaks. Questions must be answered in order: you cannot skip a question or change an answer after moving on.",
  },
  {
    q: "What question types are on the NAPLEX?",
    a: "NABP uses multiple choice, multiple response (select all that apply), constructed response (you type a number, rounded as the question says), ordered response (put every option in the right order) and hot spot (click a region of an image). Most questions are scenario-based with a patient profile or medical record. An on-screen scientific calculator is provided. Tigertest models every type except hot spot.",
  },
  {
    q: "What score do you need to pass the NAPLEX?",
    a: "NABP's scale runs from 0 to 150, and a scaled score of 75 or higher passes. Results are now reported only as pass or fail; a failing report shows relative performance in the five content areas. A scaled 75 is not the same as 75% correct, so Tigertest shows your practice percent correct and does not convert it to a NAPLEX score. Unanswered questions count as incorrect.",
  },
  {
    q: "How is this practice test different from the real NAPLEX?",
    a: "Each practice test is 100 questions in 2 hours 40 minutes, the real pace of about 1.6 minutes a question, weighted across the five domains like the outline: 25 foundational knowledge, 25 medication use process, 40 assessment and treatment planning, 5 professional practice and 5 management. Like the real exam it runs in order with no going back. Questions stand alone rather than sharing long patient records, and there are no hot spot items. Every question is original; none comes from NABP sample items, the Pre-NAPLEX or a review book.",
  },
  {
    q: "Is the Tigertest NAPLEX practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the first drills are free; the later drills and practice tests are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NAPLEX practice test, NAPLEX practice questions, NAPLEX practice exam, NAPLEX calculations practice, pharmacist licensure exam practice, NABP NAPLEX, pharmacy board exam practice",
  alternates: {
    canonical: `${siteUrl}/naplex-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/naplex-practice-test`,
    images: [{ url: shareImageUrl("naplex"), width: 1200, height: 630, alt: "Tigertest NAPLEX practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("naplex")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - NAPLEX Practice Test",
      description,
      url: `${siteUrl}/naplex-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("naplex"),
      featureList: [
        "236 original NAPLEX practice questions with explanations",
        "2 practice tests of 100 questions at the real pace, in order with no going back",
        "Weighted like NABP's NAPLEX Content Outline effective May 1, 2025",
        "Typed numeric calculations, select all that apply and ordered response questions",
        "8 drills by content area",
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
        classFaqJsonLd("naplex"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Foundational Knowledge for Pharmacy Practice", weight: "25%" },
  { name: "Medication Use Process", weight: "25%" },
  { name: "Person-Centered Assessment and Treatment Planning", weight: "40%" },
  { name: "Professional Practice", weight: "5%" },
  { name: "Pharmacy Management and Leadership", weight: "5%" },
];

export default function NaplexLandingPage() {
  return (
    <div data-theme="naplex" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NAPLEX Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/naplex/dashboard"
            shortName="NAPLEX"
            subtitle="236 pharmacist licensure questions with typed calculations. Free to start, no account needed."
            shots={{ mobile: "/landing/naplex-mobile.png", desktop: "/landing/naplex-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="naplex" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills: pharmaceutical science, calculations, prescriptions and orders, immunization and handling, appropriate therapy, assessment and monitoring, counseling with OTC products and devices, and practice and management. Each question you miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two practice tests of 100 questions in 2 hours 40 minutes, the real NAPLEX pace, answered in order with no going back and the calculator on. You see your percent correct and how you did in each content area. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the NAPLEX Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Questions follow NABP&apos;s five content domains in force since May 1, 2025, at the outline&apos;s weights. Drugs are named by generic name, practice is US practice, and state pharmacy law is left to the MPJE.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("naplex", 3)}
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
            How to Prepare for the NAPLEX
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Spend most of your time on patient care</h3>
              <p>
                Person-centered assessment and treatment planning is 40% of the scored questions. Practice spotting the drug therapy problem in a patient case: an interaction, a dose that does not fit the kidney function, a missing therapy, a drug that causes the symptom.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make calculations automatic</h3>
              <p>
                Constructed response questions need an exact typed answer with the rounding the question asks for. Drill creatinine clearance, infusion rates, concentrations, alligations and pharmacokinetic parameters until you can set each one up without thinking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Answer once and move on</h3>
              <p>
                You cannot go back on the NAPLEX, so commit to each answer. Practice under the same rule, and keep to about 1.6 minutes a question so the long patient cases do not eat your time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Test yourself, then drill your weakest area</h3>
              <p>
                Take a timed practice test, use the breakdown by content area to find what costs you the most, and drill it until you have mastered it. Save Practice Test 2 for when you think you are ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NAPLEX Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="naplex" />
        </div>
      </div>

      <SampleQuestionsV2 examId="naplex" />

      <ExamRelatedTests examId="naplex" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Take On the NAPLEX?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 236 questions across all five content domains.</p>
          <ExamLandingCTA dashboardHref="/naplex/dashboard" />
        </div>
      </div>
    </div>
  );
}
