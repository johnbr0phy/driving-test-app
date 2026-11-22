import "@/lib/banks/pals";
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

const title = "Free PALS Practice Test 2026 - 2025 Guidelines Questions";
const metaDescription =
  "Free-to-start PALS practice test: 200 original questions on the 2025 pediatric guidelines and PALS algorithms, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Pediatric Advanced Life Support (PALS) provider course exam: 200 original questions written from the 2025 American Heart Association and American Academy of Pediatrics Guidelines for CPR and Emergency Cardiovascular Care and the 2025 pediatric algorithms. Four 50-question practice tests and five training sets covering pediatric BLS and high-quality CPR, the systematic approach, respiratory emergencies, shock, the pediatric cardiac arrest algorithm, bradycardia and tachycardia, and post-cardiac arrest care.";

const faqs = [
  {
    q: "What is the PALS exam?",
    a: "PALS (Pediatric Advanced Life Support) is the American Heart Association course for health care professionals who manage respiratory emergencies, shock and cardiopulmonary arrest in infants and children. The written exam checks the cognitive side: the systematic approach, respiratory and shock management, the pediatric cardiac arrest, bradycardia and tachycardia algorithms, weight-based drug doses and energies, and post-cardiac arrest care. Skills and case simulations are tested separately in the course.",
  },
  {
    q: "What score do you need to pass the PALS exam?",
    a: "The AHA's PALS course FAQ lists completion of the open-resource written exam with a minimum score of 84%. On a 50-question practice test here that is 42 correct. Students must also score at least 70% on the mandatory precourse self-assessment before class.",
  },
  {
    q: "How is the PALS course delivered?",
    a: "The 2025 PALS course comes in three formats with the same learning objectives and the same two-year completion card: instructor-led training (traditional or with video prework), HeartCode PALS blended learning with a hands-on skills session, and RQI for employed health care professionals. Ask your training center about its exam format and retest rules.",
  },
  {
    q: "What changed in PALS with the 2025 guidelines?",
    a: "The 2025 AHA and AAP pediatric guidelines were published in October 2025. Changes that reach PALS include a single Chain of Survival for adults and children, no more 2-finger infant compressions, back blows first for choking children, pauses in compressions under 10 seconds, epinephrine as early as possible in nonshockable arrest, diastolic pressure targets during CPR with an arterial line, post-arrest blood pressure above the 10th percentile, and new guidance on neuroprognostication. These practice questions follow the 2025 material.",
  },
  {
    q: "Are these the real PALS exam questions?",
    a: "No. Every question is original, written by Tigertest from the published 2025 Guidelines highlights, pediatric algorithms and course documents, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the American Heart Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pals practice test, pals test, pals exam questions, pediatric advanced life support practice test, pals pretest, pals 2025 guidelines, pals 2026",
  alternates: {
    canonical: `${siteUrl}/pals-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pals-practice-test`,
    images: [{ url: shareImageUrl("pals"), width: 1200, height: 630, alt: "Tigertest free PALS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pals")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PALS Practice Test",
      description,
      url: `${siteUrl}/pals-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pals"),
      featureList: [
        "200 PALS practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by PALS topic",
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
        classFaqJsonLd("pals"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Pediatric BLS & High-Quality CPR", weight: "16%" },
  { name: "Systematic Approach & Assessment", weight: "8%" },
  { name: "Respiratory Emergencies", weight: "16%" },
  { name: "Shock Recognition & Management", weight: "18%" },
  { name: "Cardiac Arrest: VF/pVT, Asystole & PEA", weight: "20%" },
  { name: "Bradycardia & Tachycardia With a Pulse", weight: "14%" },
  { name: "Post-Cardiac Arrest Care", weight: "8%" },
];

export default function PalsLandingPage() {
  return (
    <div data-theme="pals" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PALS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pals/dashboard"
            shortName="PALS"
            subtitle="200 PALS questions on the 2025 pediatric guidelines and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/pals-mobile.png", desktop: "/landing/pals-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pals" />

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
                Five training sets follow the PALS course: high-quality CPR and the systematic approach; respiratory emergencies; shock; cardiac arrest; and arrhythmias and post-arrest care. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions across every topic. Aim for 84%, the course exam&apos;s minimum, which is 42 of 50. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the 2025 Pediatric Algorithms
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AHA does not publish topic weights for the PALS exam, so each practice test spreads its 50 questions across what the course teaches, with the most on cardiac arrest and on shock. Nursing and paramedic instructors can set Tigertest as PALS review at{" "}
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
                src={getTigerAsset("pals", 3)}
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
            How to Study for the PALS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Do every dose by weight</h3>
              <p>
                Pediatric doses scale with the child: epinephrine 0.01 mg/kg, amiodarone 5 mg/kg, adenosine 0.1 then 0.2 mg/kg, atropine 0.02 mg/kg, shocks of 2 then 4 J/kg, and fluid boluses in mL/kg. Practice the arithmetic and the maximum doses until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Name the problem before you treat it</h3>
              <p>
                Use the systematic approach: evaluate, identify, intervene. Sort respiratory problems into upper or lower airway obstruction, lung tissue disease or disordered control of breathing, and shock into hypovolemic, distributive, cardiogenic or obstructive, compensated or hypotensive.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the arrest and rhythm algorithms</h3>
              <p>
                Learn the shockable and nonshockable pathways, when epinephrine and antiarrhythmics come in, the reversible causes, and how bradycardia and tachycardia with a pulse branch on cardiopulmonary compromise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 84% or better on every practice test before your course. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PALS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pals" />
        </div>
      </div>

      <ExamSampleQuestions examId="pals" />

      <ExamRelatedTests examId="pals" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your PALS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every PALS topic.</p>
          <ExamLandingCTA dashboardHref="/pals/dashboard" />
        </div>
      </div>
    </div>
  );
}
