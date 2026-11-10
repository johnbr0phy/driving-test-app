import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import "@/lib/banks/punjabpolice";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Punjab Police Constable Test 2026 - Free Practice MCQs";
const metaDescription =
  "Free Punjab Police constable written test practice: 200 original MCQs on English, maths, reasoning, Punjab, the Police Order 2002, the PPC and CrPC and computers, with four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the Punjab Police (Pakistan) Constable and Lady Constable written test: 200 original questions on English grammar and vocabulary, mathematics, reasoning, Punjab's geography and landmarks, the Police Order 2002 and the Punjab Police Code of Conduct, criminal law under the PPC and CrPC, and basic computer skills. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "punjab police constable test, punjab police written test, punjab police test mcqs, punjab police constable past papers, lady constable test punjab, punjab police recruitment 2026, police order 2002 mcqs, ppc crpc mcqs, punjab police test preparation",
  alternates: {
    canonical: `${siteUrl}/punjab-police-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/punjab-police-constable-practice-test`,
    images: [{ url: shareImageUrl("punjabpolice"), width: 1200, height: 630, alt: "Tigertest free Punjab Police constable practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("punjabpolice")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How are constables recruited into the Punjab Police?",
    a: "Punjab Police advertises Constable and Lady Constable posts (BPS-7) district by district. In its 2025 and 2026 advertisements, applicants in settled areas had to be 18 to 22, hold a Matric certificate with at least 50% marks, have a domicile of the district and meet minimum height and, for men, chest measurements, with wider limits in the de-excluded areas of Dera Ghazi Khan and Rajanpur. Candidates are measured, run 1.6 km (7 minutes for men, 10 for women), then take a written examination and an interview. Check the current advertisement on punjabpolice.gov.pk, because each one sets its own dates and rules.",
  },
  {
    q: "How many questions are on the Punjab Police written test and what is the pass mark?",
    a: "Punjab Police does not publish the number of questions, the time, the subjects or a pass mark in its advertisements, and the format can change from one recruitment to the next, so check the notice for your district before the test. Tigertest's mock tests are 50 questions with a 70% target, so work at a steady pace and aim well above it, because places are limited.",
  },
  {
    q: "What does the Tigertest practice cover?",
    a: "English grammar, vocabulary and spelling, mathematics, reasoning, Punjab's rivers, districts and landmarks, the Police Order 2002 and the Punjab Police Code of Conduct, criminal law basics under the Pakistan Penal Code and the Code of Criminal Procedure, and basic computer skills. Urdu, Islamic studies, Pakistan Studies and current affairs are not included, so revise those from your school books and the news.",
  },
  {
    q: "What happens after the written test?",
    a: "Punjab Police says candidates who pass the written examination are eligible for the interview. The height and chest measurements and the race come first. Applicants also give a sworn statement about any criminal case against them, and a false statement or a hidden criminal record makes a candidate ineligible at any stage, so keep your documents honest and complete.",
  },
  {
    q: "Are these the real Punjab Police test questions?",
    a: "No. Every question is original, written by Tigertest from the Police Order 2002, the Punjab Police Code of Conduct, the Pakistan Penal Code, the Code of Criminal Procedure and standard English and mathematics, so it practises the same skills without copying any past paper. Tigertest is not affiliated with the Punjab Police or the Government of Punjab, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Punjab Police Constable Practice Test",
      description,
      url: `${siteUrl}/punjab-police-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
      featureList: [
        "200 English, maths, reasoning, Punjab, police law and computer questions",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
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
        classFaqJsonLd("punjabpolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "English: Grammar & Usage", weight: "14%" },
  { name: "Mathematics", weight: "14%" },
  { name: "Punjab: Geography & Landmarks", weight: "14%" },
  { name: "Police Order 2002 & Policing", weight: "14%" },
  { name: "English: Vocabulary & Spelling", weight: "12%" },
  { name: "Criminal Law: PPC & CrPC", weight: "12%" },
  { name: "Reasoning", weight: "10%" },
  { name: "Basic Computer Skills", weight: "10%" },
];

export default function PunjabPoliceConstableLandingPage() {
  return (
    <div data-theme="punjabpolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Punjab Police Constable Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/punjab-police-constable/dashboard"
            shortName="Police test"
            subtitle="200 original MCQs for the Constable and Lady Constable written test: English, maths, reasoning, Punjab, the Police Order 2002, the PPC and CrPC, and computers. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/punjabpolice-mobile.png", desktop: "/landing/punjabpolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="punjabpolice" />

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
                Five training sets cover English, maths and reasoning, the Police Order 2002, criminal law under the PPC and CrPC, and Punjab and computers. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built for the Constable Written Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Punjab Police does not publish a syllabus or a topic split, so the weighting is Tigertest&apos;s own: English, maths and reasoning carry half the marks, and the rest is the general knowledge a future constable needs, about Punjab, the Police Order 2002, the Punjab Police Code of Conduct, the Pakistan Penal Code and the Code of Criminal Procedure, plus basic computer skills. Urdu, Islamic studies, Pakistan Studies and current affairs are not included.
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
                src={getTigerAsset("punjabpolice", 1)}
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
            How to Pass the Punjab Police Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get fit before the race</h3>
              <p>
                The written test comes after the measurements and the 1.6 km race, so a candidate who fails the race never sits it. Start running early, and check your height, chest and documents against the advertisement for your district.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the duties of a police officer</h3>
              <p>
                Learn what the Police Order 2002 asks of every officer: courtesy to the public, protecting life and property, telling a person of the arrested man&apos;s choice about his arrest, and taking charge of unclaimed property. Add the basics of the PPC and CrPC: the FIR, the 24-hour rule, dacoity and theft.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Revise what Tigertest leaves out</h3>
              <p>
                Tigertest covers English, maths, reasoning, Punjab, police law and computers, but not Urdu, Islamiat, Pakistan Studies or current affairs. If your district&apos;s paper may include them, revise them from your Matric books and a daily newspaper in the weeks before your test date.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise against the clock</h3>
              <p>
                Aim for 40 or more in every mock test, at under a minute a question. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests before your written test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Punjab Police Constable Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="punjabpolice" />
        </div>
      </div>

      <ExamSampleQuestions examId="punjabpolice" />

      <ExamRelatedTests examId="punjabpolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Join the Punjab Police?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on English, maths, reasoning, Punjab and police law.</p>
          <ExamLandingCTA dashboardHref="/punjab-police-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
