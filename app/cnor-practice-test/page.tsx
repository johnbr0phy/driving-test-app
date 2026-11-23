import "@/lib/banks/cnor";
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

const title = "Free CNOR Practice Test 2026 - CCI Perioperative Nurse Exam Questions";
const metaDescription =
  "Free-to-start CNOR practice test: 200 original questions on the CCI Certified Perioperative Nurse subject areas, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Competency & Credentialing Institute (CCI) Certified Perioperative Nurse (CNOR) exam: 200 original questions written from CCI's published subject areas and task and knowledge statements. Four 50-question practice tests weighted like the real exam, and five training sets covering assessment and plan of care, patient care and safety, personnel, communication and records, infection prevention and control, and emergencies and professional accountability.";

const faqs = [
  {
    q: "What is the CNOR exam?",
    a: "The CNOR is the Competency & Credentialing Institute's (CCI) certification for perioperative registered nurses. To apply you need a current, unrestricted RN license, current work in perioperative nursing (clinical practice, education, administration or research) and at least 2 years and 2,400 hours as a perioperative RN, with at least 1,200 of those hours in the intraoperative setting. Holders of the CFPN, CST, TS-C or a military equivalent need 18 months and 2,400 hours.",
  },
  {
    q: "How many questions are on the CNOR exam?",
    a: "The CNOR has 200 multiple-choice questions: 185 are scored and 15 are unscored pretest questions. You have 3 hours and 45 minutes. It is given at PSI test centers, Monday through Saturday year-round, or online as a remote proctored exam.",
  },
  {
    q: "What score do you need to pass the CNOR?",
    a: "CCI converts the number of questions you answer correctly to a scaled score from 200 to 800, and 620 passes. A scaled score is not the percentage of questions answered correctly, so the 70 percent line on these practice tests is a readiness target, not CCI's rule.",
  },
  {
    q: "What does the CNOR cover?",
    a: "CCI's current outline has eight subject areas: patient care and safety 25%, infection prevention and control of environment, instrumentation and supplies 16%, pre/postoperative patient assessment and diagnosis 15%, communication and documentation 11%, emergency situations 10%, management of personnel, services and materials 9%, plan of care and expected outcomes 8%, and professional accountabilities 6%. These practice tests keep that balance across 50 questions. CCI plans new six-area exam content in 2027.",
  },
  {
    q: "How long is the CNOR credential valid?",
    a: "The CNOR is valid for 5 years, and you recertify through CCI before it ends. Check the current CNOR handbook for the recertification options and deadlines.",
  },
  {
    q: "Are these the real CNOR exam questions?",
    a: "No. Every question is original, written by Tigertest from CCI's published subject areas and task statements and from public sources such as the CDC surgical site infection and sterilization guidelines, OSHA's bloodborne pathogens standard and published reviews on malignant hyperthermia and anaphylaxis. AORN guidelines are not quoted. Tigertest is not affiliated with the Competency & Credentialing Institute.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cnor practice test, cnor exam questions, cci cnor practice test, certified perioperative nurse practice test, perioperative nursing exam, or nurse certification practice test, cnor 2026",
  alternates: {
    canonical: `${siteUrl}/cnor-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cnor-practice-test`,
    images: [{ url: shareImageUrl("cnor"), width: 1200, height: 630, alt: "Tigertest free CNOR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cnor")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CNOR (CCI) Practice Test",
      description,
      url: `${siteUrl}/cnor-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cnor"),
      featureList: [
        "200 CNOR (CCI) practice questions",
        "4 practice tests of 50 questions weighted like the CCI CNOR subject areas",
        "5 training sets by CCI subject area",
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
        classFaqJsonLd("cnor"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Care and Safety", weight: "25%" },
  { name: "Infection Prevention and Control", weight: "16%" },
  { name: "Pre/Postoperative Assessment and Diagnosis", weight: "15%" },
  { name: "Communication and Documentation", weight: "11%" },
  { name: "Emergency Situations", weight: "10%" },
  { name: "Management of Personnel, Services and Materials", weight: "9%" },
  { name: "Plan of Care and Expected Outcomes", weight: "8%" },
  { name: "Professional Accountabilities", weight: "6%" },
];

export default function CnorLandingPage() {
  return (
    <div data-theme="cnor" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CNOR (CCI) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cnor/dashboard"
            shortName="CNOR"
            subtitle="200 CCI CNOR questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cnor-mobile.png", desktop: "/landing/cnor-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cnor" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover every CCI subject area: assessment and plan of care; patient care and safety; personnel, communication and records; infection prevention and control; and emergencies and professional accountability. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 185 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CCI CNOR Subject Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CCI publishes the share of the exam each subject area takes, and every practice test here keeps that balance, scaled to 50 questions. Patient care and safety is the largest area, at 25%. Perioperative educators and CNOR review instructors can set Tigertest as review at{" "}
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
                src={getTigerAsset("cnor", 3)}
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
            How to Prepare for the CNOR Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with patient care and safety</h3>
              <p>
                A quarter of the scored questions are about the patient on the table: the fire triangle, electrosurgery and dispersive pads, positioning and nerve injury, counts, Universal Protocol, specimens, implants and medication labeling. Know what you check, when you check it and what you do when something is off.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn infection control from the nurse&apos;s side</h3>
              <p>
                Spaulding classes, what chemical and biological indicators prove, event-related sterility, immediate-use limits, OR air and attire, and the surgical scrub come up in many forms. Learn the reason behind each rule, not just the number.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill the emergencies</h3>
              <p>
                Malignant hyperthermia, anaphylaxis, local anesthetic toxicity, hemorrhage, fire and evacuation each have a first step and a few must-know facts, such as the dantrolene dose and which drugs trigger MH. Rehearse them until the order is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the paperwork and the people</h3>
              <p>
                Handoffs, read-back, HIPAA, implant records, delegation, industry representatives, scope of practice and quality improvement make up a real share of the exam. Then drill the questions you missed and review your facility&apos;s own policies too.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CNOR Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cnor" />
        </div>
      </div>

      <ExamSampleQuestions examId="cnor" />

      <ExamRelatedTests examId="cnor" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the CNOR Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every subject area of the CCI CNOR exam.</p>
          <ExamLandingCTA dashboardHref="/cnor/dashboard" />
        </div>
      </div>
    </div>
  );
}
