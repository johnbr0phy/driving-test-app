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

const siteUrl = SITE_URL;

const title = "NCE Practice Test 2026 - Free National Counselor Exam Questions";
const metaDescription =
  "Free NCE practice test: 200 original questions on the NBCC content outline, four 50-question mock exams weighted like the 160 scored items, and four training sets with every answer explained.";
const description =
  "Free practice for the National Counselor Examination (NCE): 200 original questions written from the NBCC content outline. Four 50-question mock exams weighted like the 160 scored questions, and four training sets covering professional practice and ethics, intake, assessment and diagnosis, areas of clinical focus, treatment planning, counseling skills and interventions, and core counseling attributes.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nce practice test, national counselor exam practice, nce exam questions, nbcc nce practice test, nce mock exam, nce exam 2026, lpc exam practice, counselor licensure exam, ncc exam practice, free nce practice test",
  alternates: {
    canonical: `${siteUrl}/nce-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nce-practice-test`,
    images: [{ url: shareImageUrl("nce"), width: 1200, height: 630, alt: "Tigertest free NCE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nce")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NCE Practice Test",
      description,
      url: `${siteUrl}/nce-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 NCE practice questions",
        "4 mock exams of 50 questions weighted like the NBCC content outline",
        "4 training sets by content domain",
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
          name: "What is the NCE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The National Counselor Examination (NCE) is the National Board for Certified Counselors' exam for entry-level professional counselors. Many states use it for counselor licensure (such as the LPC or LMHC), and it is one of two exam options for the National Certified Counselor (NCC) credential. It covers the knowledge and skills needed to practice safely, aligned with the eight CACREP core areas.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the NCE and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The NCE has 200 multiple-choice questions in 3 hours and 45 minutes, with one scheduled 15-minute break after question 100. 160 questions are scored and 40 are unscored field-test items mixed in. Each scored question is worth one point. You can take it at a Pearson VUE test center or online through OnVUE.",
          },
        },
        {
          "@type": "Question",
          name: "What score do you need to pass the NCE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no fixed percentage. NBCC sets the passing point for each form of the exam with a modified Angoff method, in which subject matter experts judge how many correct answers a minimally qualified counselor needs. The 70 percent line on these practice tests is a readiness target, not the official cut score.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the NCE in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The current content outline has six domains: Professional Practice and Ethics 12 percent, Intake, Assessment, and Diagnosis 12 percent, Areas of Clinical Focus 29 percent, Treatment Planning 9 percent, Counseling Skills and Interventions 30 percent, and Core Counseling Attributes 8 percent. Each 50-question practice test here keeps that balance. From July 1, 2027 NBCC plans a new version with 170 questions of three options each and six new domains, so check which version your test date falls under.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real NCE questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from NBCC's published content outline, the ACA Code of Ethics and the DSM-5-TR, so it practices the same knowledge without copying the exam. Tigertest is not affiliated with NBCC, CCE or Pearson VUE, and this is free practice, not an official NBCC product.",
          },
        },
        classFaqJsonLd("nce"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Professional Practice & Ethics", weight: "12%" },
  { name: "Intake, Assessment & Diagnosis", weight: "12%" },
  { name: "Areas of Clinical Focus", weight: "29%" },
  { name: "Treatment Planning", weight: "9%" },
  { name: "Counseling Skills & Interventions", weight: "30%" },
  { name: "Core Counseling Attributes", weight: "8%" },
];

export default function NceLandingPage() {
  return (
    <div data-theme="nce" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nce/dashboard"
            shortName="NCE"
            subtitle="200 original questions on the NBCC content outline: ethics, assessment and diagnosis, clinical concerns, treatment planning, counseling skills and theory, and core attributes. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nce-mobile.png", desktop: "/landing/nce-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nce" />

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
                Four training sets follow the outline: ethics, assessment and diagnosis; areas of clinical focus; counseling skills and interventions; and treatment planning with core attributes. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions, each weighted like the 160 scored questions on the real NCE, a quarter of its length. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NBCC Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NBCC publishes how many of the 160 scored questions come from each of six work-behavior domains, and every mock exam here keeps that balance, scaled to 50 questions. Counseling skills and interventions and areas of clinical focus together make up more than half the exam. The questions also cover the eight CACREP core areas behind the outline, from human development and career theory to group work, testing and research. Counselor educators can set Tigertest as practice at{" "}
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                These practice tests follow the current NCE. NBCC plans a new version from July 1, 2027, with 170 questions, three answer choices each and six new domains.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("nce", 1)}
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
            How to Pass the NCE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the theories by their techniques</h3>
              <p>
                Many questions describe a technique and ask for the approach: the miracle question, the empty chair, disputing irrational beliefs, externalizing, a genogram, joining. Learn each theory&apos;s signature moves and key figures, including the family systems approaches.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the DSM-5-TR time frames</h3>
              <p>
                Diagnosis questions often turn on duration: two weeks for a major depressive episode, one week for mania, four days for hypomania, six months for generalized anxiety, one month separating acute stress disorder from PTSD, twelve months for prolonged grief in adults.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put safety and the ACA Code first</h3>
              <p>
                When a question asks what to do first, the answer is usually to assess risk, protect the client, get informed consent, consult or refer, and stay within your competence. Know the ACA Code&apos;s specific rules on former clients, bartering, gifts, groups and distance counseling.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 70% or better on every mock exam before your test date. After each test, drill the questions you missed and retrain the weakest domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the NCE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The National Counselor Examination (NCE) is the National Board for Certified Counselors&apos; exam for entry-level professional counselors. Many states use it for counselor licensure (such as the LPC or LMHC), and it is one of two exam options for the National Certified Counselor (NCC) credential. It covers the knowledge and skills needed to practice safely, aligned with the eight CACREP core areas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the NCE and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The NCE has 200 multiple-choice questions in 3 hours and 45 minutes, with one scheduled 15-minute break after question 100. 160 questions are scored and 40 are unscored field-test items mixed in. Each scored question is worth one point. You can take it at a Pearson VUE test center or online through OnVUE.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do you need to pass the NCE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              There is no fixed percentage. NBCC sets the passing point for each form of the exam with a modified Angoff method, in which subject matter experts judge how many correct answers a minimally qualified counselor needs. The 70 percent line on these practice tests is a readiness target, not the official cut score.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the NCE in 2026?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The current content outline has six domains: Professional Practice and Ethics 12 percent, Intake, Assessment, and Diagnosis 12 percent, Areas of Clinical Focus 29 percent, Treatment Planning 9 percent, Counseling Skills and Interventions 30 percent, and Core Counseling Attributes 8 percent. Each 50-question practice test here keeps that balance. From July 1, 2027 NBCC plans a new version with 170 questions of three options each and six new domains, so check which version your test date falls under.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real NCE questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from NBCC&apos;s published content outline, the ACA Code of Ethics and the DSM-5-TR, so it practices the same knowledge without copying the exam. Tigertest is not affiliated with NBCC, CCE or Pearson VUE, and this is free practice, not an official NBCC product.
            </p>
          </div>
          <ExamClassFaq examId="nce" />
        </div>
      </div>

      <ExamRelatedTests examId="nce" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NCE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every domain of the NCE content outline.</p>
          <ExamLandingCTA dashboardHref="/nce/dashboard" />
        </div>
      </div>
    </div>
  );
}
