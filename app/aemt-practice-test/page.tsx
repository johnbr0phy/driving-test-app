import "@/lib/v2/banks/aemt";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free AEMT Practice Test 2026 - NREMT Advanced EMT Exam Prep";
const metaDescription =
  "Free NREMT Advanced EMT practice tests: 200 questions on the AEMT exam specifications, with clinical judgment scenarios, supraglottic airways, IV and IO access and AEMT medications.";
const description =
  "Free NREMT AEMT practice tests with 200 questions weighted to the Advanced EMT examination specifications: airway, respiration and ventilation; cardiology and resuscitation; trauma; medical, obstetrics and gynecology; EMS operations; and clinical judgment scenarios that follow a call from dispatch to handoff.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AEMT practice test, Advanced EMT practice test, NREMT AEMT exam, AEMT exam questions, AEMT test prep 2026, free AEMT practice questions, advanced emergency medical technician exam",
  alternates: {
    canonical: `${siteUrl}/aemt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aemt-practice-test`,
    images: [{ url: shareImageUrl("aemt"), width: 1200, height: 630, alt: "Tigertest free AEMT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aemt")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "How many questions are on the NREMT AEMT exam?",
    a: "The AEMT certification exam is a fixed-length linear test of 135 questions in 3 hours at a Pearson VUE center, and 35 of those questions are unscored pilot items. You answer each question before moving on and cannot go back to it. Since July 1, 2024 it is one exam, with no separate psychomotor exam.",
  },
  {
    q: "What is on the NREMT AEMT exam?",
    a: "Six domains: Airway, Respiration and Ventilation 9 to 13 percent, Cardiology and Resuscitation 11 to 15 percent, Trauma 7 to 11 percent, Medical, Obstetrics and Gynecology 25 to 29 percent, EMS Operations 6 to 10 percent, and Clinical Judgment 31 to 35 percent. Pediatric patients appear throughout rather than as a separate section.",
  },
  {
    q: "What kinds of questions does the AEMT exam use?",
    a: "Multiple choice with four options, multiple response (two or three of five or six), build list (put steps in order), drag and drop, options box (classify each row in a table), graphical items such as capnography strips, and scenario-based items that follow one call. Every item is all or nothing. The practice tests and drills here include multiple response, build list, options box and a few calculations alongside single answer, and Clinical Judgment items come in scenarios.",
  },
  {
    q: "What score do I need to pass the AEMT exam?",
    a: "The National Registry reports a score on a scale from 100 to 1500, and 950 is the passing point; it is not a percentage. Scores here are percent correct on practice items, so use them to find weak domains rather than as a prediction. You have six attempts, at least 15 days apart, with remedial education required after three.",
  },
  {
    q: "Is the Tigertest AEMT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the airway, cardiology and trauma drills are free; the medical, operations and clinical judgment drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AEMT Practice Tests",
      description,
      url: `${siteUrl}/aemt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aemt"),
      featureList: [
        "200 Advanced EMT practice questions",
        "2 full 75-question practice tests in 1 hour 40 minutes, answered in order like the NREMT",
        "6 drills, one per NREMT AEMT domain",
        "Clinical judgment scenarios that follow a call from dispatch to handoff",
        "Build-list, options-box and select-two or select-three items alongside single answer",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("aemt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Airway, Respiration & Ventilation", weight: "9-13%" },
  { name: "Cardiology & Resuscitation", weight: "11-15%" },
  { name: "Trauma", weight: "7-11%" },
  { name: "Medical, Obstetrics & Gynecology", weight: "25-29%" },
  { name: "EMS Operations", weight: "6-10%" },
  { name: "Clinical Judgment", weight: "31-35%" },
];

export default function AemtLandingPage() {
  return (
    <div data-theme="aemt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AEMT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aemt/dashboard"
            shortName="AEMT"
            subtitle="200 Advanced EMT questions weighted to the NREMT AEMT exam specifications. Free to start, no account needed."
            shots={{ mobile: "/landing/aemt-mobile.png", desktop: "/landing/aemt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aemt" />

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
                Six drills, one per NREMT AEMT domain: airway, cardiology and resuscitation, trauma, medical, obstetrics and gynecology, EMS operations, and clinical judgment. Questions you miss come back until you have mastered them.
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
                Two 75-question tests in 1 hour 40 minutes, the real exam&apos;s pace, answered in order with no going back. Each has four clinical judgment scenarios that follow one call. Practice Test 2 is held out of the drills, so it shows what you know rather than what you remember.
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
                Built on the NREMT AEMT Examination Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since July 1, 2024 the National Registry gives the AEMT exam as one test that folds the old psychomotor skills into a Clinical Judgment domain. Every practice test here follows that weighting. Skills and drugs stay inside the AEMT column of the National EMS Scope of Practice Model, and clinical figures follow the NASEMSO National Model EMS Clinical Guidelines, with local protocol deferred to where it varies.
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
                src={getTigerAsset("aemt", 3)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teaching an AEMT Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            AEMT programs can assign Tigertest as a class for free: post one link, students join with just their name, and you see who practiced, their test scores and the domains your cohort misses most.
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
            How to Study for the NREMT AEMT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work the scenarios step by step</h3>
              <p>
                About a third of the exam is Clinical Judgment: recognize the cues in the history and vitals, analyze them, settle on what is going on, choose and carry out the intervention, then reassess. Scenarios run from en route to scene to post scene, so the right answer often depends on what changed since the last question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your scope</h3>
              <p>
                AEMTs place supraglottic airways, read waveform capnography, start IV and IO lines and give a short list of drugs such as dextrose, glucagon, naloxone, epinephrine for anaphylaxis, aspirin, nitroglycerin and nebulized bronchodilators. Intubation, manual defibrillation, pacing and most cardiac drugs belong to paramedics, and the exam expects you to know the line.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the numbers</h3>
              <p>
                Dextrose volumes, weight-based doses, drip rates, the Rule of 10 for burn fluids and mean arterial pressure come up inside scenarios. The explanations here show each step so you can check your working.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain</h3>
              <p>
                Tigertest tracks your accuracy by domain. Medical, obstetrics and gynecology and Clinical Judgment together make up more than half the exam, so spend time there, and take Practice Test 2 once the drills are going well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NREMT AEMT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aemt" />
        </div>
      </div>

      <SampleQuestionsV2 examId="aemt" />

      <ExamRelatedTests examId="aemt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Practice for the NREMT AEMT Exam</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/aemt/dashboard" />
        </div>
      </div>
    </div>
  );
}
