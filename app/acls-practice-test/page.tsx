import "@/lib/banks/acls";
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

const title = "Free ACLS Practice Test 2026 - 2025 Guidelines Questions";
const metaDescription =
  "Free-to-start ACLS practice test: 200 original questions on the 2025 AHA Guidelines and ACLS algorithms, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Advanced Cardiovascular Life Support (ACLS) provider course exam: 200 original questions written from the 2025 American Heart Association Guidelines for CPR and Emergency Cardiovascular Care and the 2025 ACLS algorithms. Four 50-question practice tests and five training sets covering systems of care and high-quality CPR, the adult cardiac arrest algorithm, bradycardia and tachycardia, post-cardiac arrest care and special circumstances, and acute coronary syndromes and stroke.";

const faqs = [
  {
    q: "What is the ACLS exam?",
    a: "ACLS (Advanced Cardiovascular Life Support) is the American Heart Association course for health care professionals who lead or join resuscitation teams. The written exam comes at the end of the course and checks the cognitive side: the adult cardiac arrest, bradycardia, tachycardia and post-cardiac arrest care algorithms, drugs and doses, high-quality CPR, and acute coronary syndromes and stroke. Skills, including a megacode, are tested separately in the course.",
  },
  {
    q: "What score do you need to pass the ACLS exam?",
    a: "The AHA's 2025 ACLS course orientation says students must pass the exam with a minimum score of 84%. On a 50-question practice test here that is 42 correct. Before class, every student must also pass the precourse self-assessment with at least 70%.",
  },
  {
    q: "How is the ACLS exam given?",
    a: "In the instructor-led course the exam is taken at the end of the course, usually online, and it must be proctored. In the HeartCode blended course the cognitive assessment is built into the online part, so there is no separate exam at the hands-on session. Ask your training center about its format and retest rules.",
  },
  {
    q: "What changed in ACLS with the 2025 guidelines?",
    a: "The 2025 AHA Guidelines were published in October 2025. Changes that reach ACLS include a single Chain of Survival with 6 links, IV access before IO in cardiac arrest, epinephrine after initial shocks fail in a shockable rhythm, a 200 J starting energy for cardioverting atrial fibrillation and flutter, a mean arterial pressure of at least 65 mm Hg after ROSC, temperature control for at least 36 hours, and tenecteplase in the stroke content. These practice questions follow the 2025 material.",
  },
  {
    q: "Are these the real ACLS exam questions?",
    a: "No. Every question is original, written by Tigertest from the AHA's published 2025 Guidelines highlights, algorithms and course documents, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the American Heart Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "acls practice test, acls test, acls exam questions, advanced cardiovascular life support practice test, acls pretest, acls 2025 guidelines, acls 2026",
  alternates: {
    canonical: `${siteUrl}/acls-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/acls-practice-test`,
    images: [{ url: shareImageUrl("acls"), width: 1200, height: 630, alt: "Tigertest free ACLS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("acls")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ACLS Practice Test",
      description,
      url: `${siteUrl}/acls-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("acls"),
      featureList: [
        "200 ACLS practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by ACLS algorithm",
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
        classFaqJsonLd("acls"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Systems of Care, Teams & Ethics", weight: "8%" },
  { name: "High-Quality CPR, Airway & BLS", weight: "16%" },
  { name: "Cardiac Arrest: VF/pVT, Asystole & PEA", weight: "20%" },
  { name: "Bradycardia & Tachycardia With a Pulse", weight: "18%" },
  { name: "Post-Cardiac Arrest Care", weight: "14%" },
  { name: "Special Circumstances", weight: "10%" },
  { name: "Acute Coronary Syndromes & Stroke", weight: "14%" },
];

export default function AclsLandingPage() {
  return (
    <div data-theme="acls" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ACLS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/acls/dashboard"
            shortName="ACLS"
            subtitle="200 ACLS questions on the 2025 guidelines and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/acls-mobile.png", desktop: "/landing/acls-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="acls" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Algorithm</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the ACLS algorithms: systems of care and high-quality CPR; cardiac arrest; bradycardia and tachycardia; post-arrest care and special situations; and acute coronary syndromes and stroke. Questions you miss come back until you have mastered them.
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
                Built on the 2025 ACLS Algorithms
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AHA does not publish topic weights for the ACLS exam, so each practice test spreads its 50 questions across the algorithms the course teaches, with the most on cardiac arrest and on bradycardia and tachycardia. Nursing and paramedic instructors can set Tigertest as ACLS review at{" "}
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
                src={getTigerAsset("acls", 3)}
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
            How to Study for the ACLS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the cardiac arrest algorithm cold</h3>
              <p>
                Learn when to shock and when not to, the 2-minute CPR cycle, epinephrine timing in shockable and nonshockable rhythms, the amiodarone and lidocaine doses, and the H&apos;s and T&apos;s.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Sort rhythms with a pulse by stable and unstable</h3>
              <p>
                For bradycardia and tachycardia the first question is whether the rhythm is causing compromise. Learn atropine, pacing and infusion doses, then vagal maneuvers, adenosine and synchronized cardioversion energies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the numbers after ROSC</h3>
              <p>
                Post-cardiac arrest care runs on targets: SpO2 90% to 98%, PCO2 35 to 45 mm Hg, MAP at least 65 mm Hg, temperature control for at least 36 hours, and prognosis no earlier than 72 hours.
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
          ACLS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="acls" />
        </div>
      </div>

      <ExamSampleQuestions examId="acls" />

      <ExamRelatedTests examId="acls" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your ACLS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every ACLS algorithm.</p>
          <ExamLandingCTA dashboardHref="/acls/dashboard" />
        </div>
      </div>
    </div>
  );
}
