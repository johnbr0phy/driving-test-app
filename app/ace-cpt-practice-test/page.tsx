import "@/lib/banks/acecpt";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "ACE CPT Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free ACE Personal Trainer practice: 200 original questions on ACE's exam content outline, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the ACE Certified Personal Trainer exam: 200 original questions written from ACE's exam content outline and the ACSM, federal and ACOG guidelines it names. Four 50-question mock tests weighted like the real exam and five training sets covering client onboarding and assessments, program design, exercise technique and progression, adherence and behavior change, and risk management and professional conduct.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ace cpt practice test, ace personal trainer practice test, ace personal trainer exam questions, american council on exercise exam, ace cpt exam, ace ift model questions, ace personal trainer 2026",
  alternates: {
    canonical: `${siteUrl}/ace-cpt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ace-cpt-practice-test`,
    images: [{ url: shareImageUrl("acecpt"), width: 1200, height: 630, alt: "Tigertest free ACE CPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("acecpt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ACE Certified Personal Trainer exam?",
    a: "It is the NCCA-accredited certification exam of the American Council on Exercise (ACE). It checks that an entry-level personal trainer can screen and assess clients, design and teach safe exercise programs, progress them over time, and manage risk and professional conduct.",
  },
  {
    q: "How many questions are on the ACE CPT exam and what score do I need?",
    a: "ACE's accredited exam has 150 multiple-choice questions with 3 hours to finish, taken in person or online with a live proctor. ACE reports a scaled score and you need 500 or greater to pass. Each mock test here has 50 questions in the same domain proportions, with a practice pass line of 35 of 50.",
  },
  {
    q: "What does the ACE Personal Trainer exam cover?",
    a: "ACE's exam content outline, from its 2022 role delineation study, has four domains: Program Design and Implementation (31%), Program Modification and Progression (27%), Client Onboarding and Assessments (23%) and Risk Management, Professional Conduct, and Ethical Business Practices (19%).",
  },
  {
    q: "What do I need before I can sit the ACE CPT exam?",
    a: "ACE asks candidates to be at least 18, to have a high school diploma or equivalent, and to hold a current CPR/AED certificate with a live skills check before scheduling. Bring a current government-issued photo ID with a signature on exam day.",
  },
  {
    q: "Are these the real ACE exam questions?",
    a: "No. ACE's exam questions are confidential. Every question here is original, written by Tigertest from ACE's published exam content outline and public guidelines such as the Physical Activity Guidelines for Americans. Tigertest is not affiliated with ACE, and this practice does not replace ACE's study program.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ACE CPT Practice Test",
      description,
      url: `${siteUrl}/ace-cpt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("acecpt"),
      featureList: [
        "200 ACE Personal Trainer practice questions",
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
  { name: "Program design and implementation", weight: "31%" },
  { name: "Program modification and progression", weight: "27%" },
  { name: "Client onboarding and assessments", weight: "23%" },
  { name: "Risk management, conduct and ethics", weight: "19%" },
];

export default function AceCptLandingPage() {
  return (
    <div data-theme="acecpt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ACE CPT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ace-cpt/dashboard"
            shortName="ACE CPT"
            subtitle="200 questions on ACE's exam content outline and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/acecpt-mobile.png", desktop: "/landing/acecpt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="acecpt" />

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
                Five training sets: onboarding and assessments, program design, exercise technique and progression, adherence and behavior change, and risk management and professional conduct. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in ACE&apos;s domain proportions, a third of the length of the real exam. No question appears in more than one test, and every answer is explained.
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
                Built on ACE&apos;s Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ACE weights its four domains by how often trainers do each task. Each mock test here follows the same weights, so program design makes up 16 of every 50 questions.
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
                src={getTigerAsset("acecpt", 3)}
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
            How to Study for the ACE CPT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the ACE IFT model</h3>
              <p>
                Know the three cardiorespiratory phases and how VT1 and VT2 set their intensity, and the three muscular phases from functional training to load and speed. Many program questions turn on which phase fits the client.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise screening and assessment</h3>
              <p>
                Work through health history, risk factors, medications and the posture and movement screens. Know what each finding means for the program and when it calls for medical clearance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think in progressions and regressions</h3>
              <p>
                Scenario questions ask what to change next. Practise adjusting base of support, load, tempo and range, and spotting signs of overtraining or a reason to stop.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know your scope of practice</h3>
              <p>
                Trainers screen, coach and design exercise; they do not diagnose, treat or prescribe diets. Review every explanation you get wrong, not only the answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ACE CPT Frequently Asked Questions
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

      <ExamSampleQuestions examId="acecpt" />

      <ExamRelatedTests examId="acecpt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start the ACE CPT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of ACE&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/ace-cpt/dashboard" />
        </div>
      </div>
    </div>
  );
}
