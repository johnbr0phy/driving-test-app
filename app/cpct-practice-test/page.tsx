import "@/lib/banks/cpcta";
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

const title = "CPCT/A Practice Test 2026 - Free NHA Patient Care Technician Questions";
const metaDescription =
  "Free-to-start CPCT/A (NHA) practice test: 200 original questions on the NHA CPCT/A test plan, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the National Healthcareer Association Certified Patient Care Technician/Assistant (CPCT/A) exam: 200 original questions written from NHA's published 2025 test plan. Four 50-question practice tests weighted like the real exam's five domains, and five training sets covering daily care and vital signs, mobility and end-of-life care, compliance and safety, infection control and phlebotomy, and EKG.";

const faqs = [
  {
    q: "What is the CPCT/A exam?",
    a: "It is the certification exam for the Certified Patient Care Technician/Assistant credential from the National Healthcareer Association (NHA). It covers hands-on patient care, vital signs, safety and compliance, infection control, phlebotomy and EKG. You can sit for it with a high school diploma or GED plus a patient care technician training program within the last five years, or with supervised work in the field: one year within the last three years, or two years within the last five.",
  },
  {
    q: "How many questions are on the CPCT/A exam?",
    a: "NHA's test plan lists 100 scored questions and 20 unscored pretest questions, with 2 hours to finish. You cannot tell which questions are pretest items. The exam is taken on a computer at your school, at a PSI test center or by live remote proctoring.",
  },
  {
    q: "What score do you need to pass the CPCT/A exam?",
    a: "NHA reports a scaled score from 200 to 500, and 390 or higher passes. The scale weights questions by difficulty, so 390 is not a fixed percentage, and the 70 percent line on these practice tests is a readiness target. NHA's Candidate Handbook explains retake rules.",
  },
  {
    q: "What is on the CPCT/A exam, and is it changing?",
    a: "NHA launches a new CPCT/A exam on January 13, 2027, built on a 2025 job analysis: Patient Care 43 questions, Compliance, Safety, and Professional Responsibility 19, Infection Control 16, Phlebotomy and Nonblood Specimen Collection 12, and EKG 10. Exams before that date use the 2018 plan (45, 20, 11, 14 and 10), and NHA says the topics change very little. These practice tests follow the 2025 plan.",
  },
  {
    q: "Are these the real CPCT/A exam questions?",
    a: "No. Every question is original, written by Tigertest from NHA's published test plan and the standards it names, such as CDC isolation precautions and OSHA rules, so it covers the same knowledge without copying the exam. EKG rhythms and strips are described in words. Tigertest is not affiliated with the National Healthcareer Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpct practice test, cpct/a practice test, nha cpct practice test, patient care technician practice test, pct exam practice, certified patient care technician exam, cpct exam questions, cpct/a 2026",
  alternates: {
    canonical: `${siteUrl}/cpct-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpct-practice-test`,
    images: [{ url: shareImageUrl("cpcta"), width: 1200, height: 630, alt: "Tigertest free CPCT/A practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpcta")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPCT/A (NHA) Practice Test",
      description,
      url: `${siteUrl}/cpct-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cpcta"),
      featureList: [
        "200 CPCT/A (NHA) practice questions",
        "4 practice tests of 50 questions weighted like the NHA CPCT/A test plan",
        "5 training sets by test plan domain",
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
        classFaqJsonLd("cpcta"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Care", weight: "43 items" },
  { name: "Compliance, Safety, and Professional Responsibility", weight: "19 items" },
  { name: "Infection Control", weight: "16 items" },
  { name: "Phlebotomy and Nonblood Specimen Collection", weight: "12 items" },
  { name: "EKG", weight: "10 items" },
];

export default function CpctaLandingPage() {
  return (
    <div data-theme="cpcta" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPCT/A (NHA) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpcta/dashboard"
            shortName="CPCT/A"
            subtitle="200 original questions on the NHA CPCT/A test plan: patient care and vital signs, safety and compliance, infection control, phlebotomy and EKG. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cpcta-mobile.png", desktop: "/landing/cpcta-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpcta" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover all five domains of the NHA test plan: daily care and vital signs; mobility, comfort and end-of-life care; compliance and safety; infection control and phlebotomy; and EKG. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 100 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NHA CPCT/A Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NHA publishes how many of the 100 scored questions come from each domain, and every practice test here keeps the 2025 plan&apos;s balance, scaled to 50 questions. Patient care is the largest domain by far. Patient care technician program instructors can set Tigertest as CPCT/A review at{" "}
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
                src={getTigerAsset("cpcta", 3)}
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
            How to Pass the CPCT/A Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own patient care</h3>
              <p>
                Patient care is 43 of the 100 scored questions. Know bathing and bed making, catheter, feeding tube and ostomy care, intake and output, positioning and skin care, transfers and walking aids, and how to take and report vital signs and pain.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know when to report and when to act</h3>
              <p>
                Compliance, safety and professional responsibility is 19 items. Learn your scope of practice, patient identification, consent, fall prevention, restraints, abuse reporting, HIPAA, the chain of command and emergency codes such as RACE and PASS.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill infection control, phlebotomy and EKG</h3>
              <p>
                Infection control is 16 items, phlebotomy 12 and EKG 10. Know the isolation precautions and PPE order, the order of draw and tube additives, specimen handling, lead placement, artifacts and paper speed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPCT/A Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cpcta" />
        </div>
      </div>

      <ExamSampleQuestions examId="cpcta" />

      <ExamRelatedTests examId="cpcta" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CPCT/A Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the NHA CPCT/A test plan.</p>
          <ExamLandingCTA dashboardHref="/cpcta/dashboard" />
        </div>
      </div>
    </div>
  );
}
