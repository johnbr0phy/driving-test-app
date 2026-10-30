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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Paramedic Practice Test 2026 - NREMT Exam Prep";
const metaDescription =
  "Free NREMT Paramedic practice tests: 200 ALS scenario questions on the 2024 test plan, from airway and cardiology to trauma, medical, operations and clinical judgment.";
const description =
  "Free NREMT Paramedic practice tests with 200 questions weighted to the 2024 test plan: airway, respiration and ventilation, cardiology and resuscitation, trauma, medical, obstetrics and gynecology, EMS operations and clinical judgment. ALS scenario questions with vitals, rhythms described in words, drug math and explanations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "paramedic practice test, NREMT paramedic practice test, paramedic exam questions, NREMT paramedic cognitive exam prep, paramedic practice exam 2026, free NREMT paramedic practice questions, paramedic test, NRP exam",
  alternates: {
    canonical: `${siteUrl}/paramedic-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/paramedic-practice-test`,
    images: [{ url: shareImageUrl("paramedic"), width: 1200, height: 630, alt: "Tigertest free Paramedic practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("paramedic")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Paramedic Practice Tests",
      description,
      url: `${siteUrl}/paramedic-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 paramedic practice questions",
        "2 full 80-question practice tests in 2 hours 30 minutes, answered in order like the NREMT",
        "6 drills, one per NREMT Paramedic domain",
        "Build-list, options-box, select-all and drug-math items alongside single answer",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the NREMT Paramedic exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam is computer adaptive: between 110 and 150 questions in 3.5 hours, including 20 unscored pilot items. It ends as soon as the computer is 95 percent confident you are above or below the passing standard, so a short exam can be a pass or a fail. Since July 1, 2024 there is no separate psychomotor exam.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the NREMT Paramedic test plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Six domains: Airway, Respiration and Ventilation 8 to 12 percent, Cardiology and Resuscitation 10 to 14 percent, Trauma 6 to 10 percent, Medical, Obstetrics and Gynecology 24 to 28 percent, EMS Operations 8 to 12 percent, and Clinical Judgment 34 to 38 percent. Pediatric patients appear throughout rather than as a separate section.",
          },
        },
        {
          "@type": "Question",
          name: "Does the real exam have multiple-response and build-list questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The 2024 exam mixes single-answer questions with multiple response (choose two or three), build list (put steps in order), drag and drop and options box (classify each row in a table), graphical items such as ECG strips, and scenario sets. Every item is all or nothing. The practice tests and drills here include multiple response, build list, options box and drug-math items; rhythms are described in words rather than shown as strips.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no percentage. The adaptive exam is pass or fail, measuring whether you are consistently above the entry-level standard. Scores here are percent correct; aiming for 75 percent or better on both practice tests, across every domain, is a realistic target.",
          },
        },
        {
          "@type": "Question",
          name: "Is the Tigertest Paramedic practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Both practice tests and all six drills are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
        classFaqJsonLd("paramedic"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Airway, Respiration & Ventilation", weight: "8-12%" },
  { name: "Cardiology & Resuscitation", weight: "10-14%" },
  { name: "Trauma", weight: "6-10%" },
  { name: "Medical, Obstetrics & Gynecology", weight: "24-28%" },
  { name: "EMS Operations", weight: "8-12%" },
  { name: "Clinical Judgment", weight: "34-38%" },
];

export default function ParamedicLandingPage() {
  return (
    <div data-theme="paramedic" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Paramedic Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/paramedic/dashboard"
            shortName="Paramedic"
            subtitle="200 ALS questions weighted to the 2024 NREMT Paramedic test plan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/paramedic-mobile.png", desktop: "/landing/paramedic-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="paramedic" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills, one per NREMT Paramedic domain: airway, cardiology and resuscitation, trauma, medical, obstetrics and gynecology, EMS operations, and clinical judgment. Questions you miss come back until you have mastered them.
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
                Two 80-question tests in 2 hours 30 minutes, answered in order with no going back, like the adaptive NREMT. Practice Test 2 is held out of the drills, so it measures readiness, not memory. Expect build-list, options-box, select-all and drug-math items alongside single answer.
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
                Built on the 2024 NREMT Paramedic Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The National Registry replaced the two-part paramedic exam on July 1, 2024 with one adaptive exam that folds the old psychomotor skills into a Clinical Judgment domain. Every practice test here follows that weighting, and clinical content follows the National EMS Education Standards and current AHA guidelines, with doses stated as the common national ones and local protocol deferred to where it varies.
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
                src={getTigerAsset("paramedic", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For programs */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teaching a Paramedic Program?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Paramedic programs can assign Tigertest as a class for free: post one link, students join with just their name, and you see who practiced, their test scores and the domains your cohort misses most before the National Registry does.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the NREMT Paramedic Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat every scenario as a clinical judgment item</h3>
              <p>
                More than a third of the exam is Clinical Judgment: recognize the cues in the vitals and history, analyze them, settle on a working impression, pick the intervention that comes first, act, and reassess. When two answers look right, the one that addresses the immediate life threat, or the one that comes earlier in that cycle, is usually it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the ALS numbers cold</h3>
              <p>
                Epinephrine 1 mg every 3 to 5 minutes, amiodarone 300 then 150 mg, adenosine 6 then 12 mg, magnesium for torsades and eclampsia, 1 mm of ST elevation in two contiguous leads, an end-tidal CO2 of 35 to 45 mmHg, CPAP at 5 to 10 cmH2O, the RSI sequence, weight-based pediatric doses and drip math. The exam tests these inside scenarios, and the explanations here spell them out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read rhythms by their features</h3>
              <p>
                The real exam shows ECG strips; here every rhythm is described by rate, regularity, P waves, PR interval and QRS width so you learn the criteria rather than the picture. Practice naming the rhythm from those features, then the treatment: stable or unstable, and the drug, pacing or cardioversion that follows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain</h3>
              <p>
                Tigertest tracks your accuracy by domain. The real exam is adaptive and ends when it is confident about you, so there is no room to be weak in a domain. Retake each drill until you clear 75 percent with room to spare, and sit Practice Test 2 only when the drills are green.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NREMT Paramedic Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the NREMT Paramedic exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam is computer adaptive: between 110 and 150 questions in 3.5 hours, including 20 unscored pilot items. It ends as soon as the computer is 95 percent confident you are above or below the passing standard, so a short exam can be a pass or a fail. Since July 1, 2024 there is no separate psychomotor exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the NREMT Paramedic test plan?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Six domains: Airway, Respiration and Ventilation 8 to 12 percent, Cardiology and Resuscitation 10 to 14 percent, Trauma 6 to 10 percent, Medical, Obstetrics and Gynecology 24 to 28 percent, EMS Operations 8 to 12 percent, and Clinical Judgment 34 to 38 percent. Pediatric patients appear throughout rather than as a separate section.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does the real exam have multiple-response and build-list questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The 2024 exam mixes single-answer questions with multiple response (choose two or three), build list (put steps in order), drag and drop and options box (classify each row in a table), graphical items such as ECG strips, and scenario sets. Every item is all or nothing. The practice tests and drills here include multiple response, build list, options box and drug-math items; rhythms are described in words rather than shown as strips.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              There is no percentage. The adaptive exam is pass or fail, measuring whether you are consistently above the entry-level standard. Scores here are percent correct; aiming for 75 percent or better on both practice tests, across every domain, is a realistic target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the Tigertest Paramedic practice test free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Both practice tests and all six drills are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
          <ExamClassFaq examId="paramedic" />
        </div>
      </div>

      <ExamRelatedTests examId="paramedic" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NREMT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/paramedic/dashboard" />
        </div>
      </div>
    </div>
  );
}
