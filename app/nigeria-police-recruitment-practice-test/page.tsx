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
import "@/lib/banks/ngpolice";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Nigeria Police Recruitment Test 2026 - Free CBT Practice";
const metaDescription =
  "Free Nigeria Police constable recruitment aptitude test practice: 200 original questions on English, mathematics, reasoning, the 1999 Constitution and policing, four 50-question mock CBTs and every answer explained.";
const description =
  "Free practice for the Nigeria Police Force constable recruitment aptitude test (CBT): 200 original questions on English grammar and vocabulary, comprehension, mathematics, logical reasoning, the 1999 Constitution, fundamental rights and the Nigeria Police Force. Four 50-question mock tests and five training sets, for General Duty and Specialist applicants.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nigeria police recruitment test, police cbt practice, police aptitude test questions, npf recruitment past questions, police constable exam nigeria, psc police recruitment, npfapplication psc gov ng, police recruitment english and maths, police recruitment 2026",
  alternates: {
    canonical: `${siteUrl}/nigeria-police-recruitment-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nigeria-police-recruitment-practice-test`,
    images: [{ url: shareImageUrl("ngpolice"), width: 1200, height: 630, alt: "Tigertest free Nigeria Police recruitment practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ngpolice")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Nigeria Police recruitment aptitude test?",
    a: "The Police Service Commission recruits constables into the Nigeria Police Force, and applicants who pass the physical and credentials screening sit a written aptitude test. It is a computer-based test (in 2024 the PSC had JAMB run it). Guides describe it as English, mathematics, general knowledge and current affairs about Nigeria and policing. Tigertest covers English, mathematics, logical reasoning, the 1999 Constitution, fundamental rights and the Nigeria Police Force.",
  },
  {
    q: "How many questions are on the police CBT and what is the pass mark?",
    a: "The Police Service Commission does not publish a question count, a time limit or a pass mark, and the format can change from one exercise to the next. Guides report anything from about 60 questions in 30 to 45 minutes to about 100 questions in an hour. Tigertest's mock tests are 50 questions with a 70% target, so work at a steady pace and aim well above it, because places are limited and the test is competitive.",
  },
  {
    q: "Who can apply to join the Nigeria Police as a constable?",
    a: "In the 2025/2026 exercise, General Duty applicants had to be Nigerian by birth, aged 18 to 25, with five credits including English Language and Mathematics, and meet minimum height (and, for men, chest) measurements. Specialist applicants could be up to 28 with four credits and trade experience. Every applicant needed a National Identification Number. Check the current advertisement on the Police Service Commission portal, because each exercise sets its own rules and dates.",
  },
  {
    q: "What happens after the aptitude test?",
    a: "The stages in the 2025/2026 exercise were the online application, physical and medical examinations and credentials screening, the aptitude test, then background checks before successful candidates are named and sent for training at a police training school. Recruitment is free: the PSC warns that anyone asking for money to help you is a fraudster.",
  },
  {
    q: "Are these the real police recruitment questions?",
    a: "No. Every question is original, written by Tigertest from the 1999 Constitution, the Police Act 2020 and standard English and mathematics, so it practises the same skills without copying any past paper. Current affairs are left out because they go out of date within months, so read the news too. Tigertest is not affiliated with the Police Service Commission, the Nigeria Police Force or JAMB, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nigeria Police Recruitment Practice Test",
      description,
      url: `${siteUrl}/nigeria-police-recruitment-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 English, mathematics, reasoning and civics questions",
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
        classFaqJsonLd("ngpolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "English: Grammar & Usage", weight: "16%" },
  { name: "Mathematics: Number & Algebra", weight: "16%" },
  { name: "English: Vocabulary & Comprehension", weight: "14%" },
  { name: "The 1999 Constitution & Government", weight: "14%" },
  { name: "Mathematics: Word Problems & Data", weight: "12%" },
  { name: "Logical & Verbal Reasoning", weight: "10%" },
  { name: "The Nigeria Police Force & Policing", weight: "10%" },
  { name: "Fundamental Rights & the Law", weight: "8%" },
];

export default function NigeriaPoliceRecruitmentLandingPage() {
  return (
    <div data-theme="ngpolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nigeria Police Recruitment Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nigeria-police-recruitment/dashboard"
            shortName="Police test"
            subtitle="200 original questions for the constable aptitude test: English, mathematics, reasoning, the 1999 Constitution, your rights and the Nigeria Police Force. Four 50-question mock CBTs. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ngpolice-mobile.png", desktop: "/landing/ngpolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ngpolice" />

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
                Five training sets cover English grammar, vocabulary and comprehension, mathematics, the Constitution and your rights, and policing and reasoning. Questions you miss come back until you have mastered them.
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
                Four 50-question CBT-style tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built for the Constable Aptitude Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Police Service Commission does not publish a syllabus or a topic split, so the weighting is Tigertest&apos;s own: guides list English and mathematics first, and they carry most of the marks here, with reasoning and general knowledge about Nigeria and policing. The general knowledge comes from the 1999 Constitution, the fundamental rights in Chapter IV and the Police Act 2020. Current affairs are not included, because they date within months.
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
                src={getTigerAsset("ngpolice", 1)}
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
            How to Pass the Police Aptitude Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Win the marks in English and mathematics</h3>
              <p>
                Guides list these two subjects first, and they carry most of the marks in Tigertest&apos;s mock tests. Revise concord, tenses, prepositions and spelling, and practise fractions, percentages, ratio, simple interest and word problems without a calculator until you are quick and accurate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the Constitution and your rights</h3>
              <p>
                Learn how the Nigeria Police Force is set up under the 1999 Constitution: who appoints the Inspector-General and the state Commissioners, what the Police Service Commission and the Nigeria Police Council do, and the rights of an arrested person in Chapter IV. A future officer is expected to know them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Follow the news for current affairs</h3>
              <p>
                Guides say the test also asks about current affairs. Tigertest leaves these out because they change, so read a national newspaper for the few weeks before your test date.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise against the clock</h3>
              <p>
                Aim for 40 or more in every mock test, at under a minute a question. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests before your invitation date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nigeria Police Recruitment Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ngpolice" />
        </div>
      </div>

      <ExamSampleQuestions examId="ngpolice" />

      <ExamRelatedTests examId="ngpolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Join the Nigeria Police?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on English, mathematics, reasoning and the law.</p>
          <ExamLandingCTA dashboardHref="/nigeria-police-recruitment/dashboard" />
        </div>
      </div>
    </div>
  );
}
