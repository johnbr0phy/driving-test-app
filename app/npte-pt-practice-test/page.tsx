import "@/lib/banks/nptept";
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

const title = "NPTE-PT Practice Test 2026 - Free PT Board Exam Questions";
const metaDescription =
  "Free NPTE-PT practice test: 200 original physical therapist board questions on the FSBPT content outline, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the National Physical Therapy Examination for Physical Therapists (NPTE-PT): 200 original questions written from the FSBPT NPTE-PT Test Content Outline. Four 50-question mock exams weighted like the 180 scored questions, and five training sets covering cardiovascular and pulmonary, musculoskeletal, neuromuscular, the other body systems and system interactions, and equipment, modalities, safety, professional responsibilities and research.";

const faqs = [
  {
    q: "What is the NPTE-PT?",
    a: "The NPTE-PT is the National Physical Therapy Examination for Physical Therapists, developed by the Federation of State Boards of Physical Therapy (FSBPT). Every US jurisdiction uses it to decide whether a graduate of an accredited physical therapist program has the entry-level knowledge to practice safely. Each state also sets its own licensing rules, such as a jurisprudence exam.",
  },
  {
    q: "How many questions are on the NPTE-PT?",
    a: "The exam has 225 multiple-choice questions in five sections of 45, with 5 hours of testing time and a total appointment of 5 hours 30 minutes including a scheduled 15-minute break after the second section. 45 of the questions are unscored pretest items. It is given by computer at Prometric centers on fixed dates four times a year, in January, April, July and October.",
  },
  {
    q: "What score do you need to pass the NPTE-PT?",
    a: "FSBPT reports scaled scores from 200 to 800, and the passing standard in every jurisdiction is a scaled score of 600. The number of correct answers needed changes slightly from form to form, so the 70 percent line on these practice tests is a readiness target, not the official standard. There is no penalty for a wrong answer, so answer every question.",
  },
  {
    q: "What is on the NPTE-PT?",
    a: "Under the content outline in effect since January 2024, the 180 scored questions cover body systems (musculoskeletal 44 to 54, neuromuscular and nervous 39 to 48, cardiovascular and pulmonary 22 to 27, integumentary 8 to 11, system interactions 8 to 10, and smaller counts for lymphatic, metabolic and endocrine, gastrointestinal and genitourinary), each split into examination, evaluation and diagnosis, and interventions. The rest cover equipment and devices 5 to 6, therapeutic modalities 4 to 6, safety and protection 5 to 7, professional responsibilities 4 to 5 and research 3 to 5. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "Are these the real NPTE-PT questions?",
    a: "No. Every question is original, written by Tigertest from FSBPT's published content outline, so it covers the same knowledge without copying the exam. The real exam includes some questions with a graphic or video and up to 40 that share a clinical scenario; here those are written as stand-alone text questions. Tigertest is not affiliated with FSBPT, and this practice does not replace your DPT program's board review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "npte practice test, npte-pt practice exam, pt board exam practice, physical therapist exam questions, npte pt 2026, fsbpt npte, physical therapy licensure exam practice, npte review questions",
  alternates: {
    canonical: `${siteUrl}/npte-pt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/npte-pt-practice-test`,
    images: [{ url: shareImageUrl("nptept"), width: 1200, height: 630, alt: "Tigertest free NPTE-PT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nptept")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NPTE-PT Practice Test",
      description,
      url: `${siteUrl}/npte-pt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nptept"),
      featureList: [
        "200 NPTE-PT practice questions",
        "4 mock exams of 50 questions weighted like the FSBPT content outline",
        "5 training sets by content area",
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
        classFaqJsonLd("nptept"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Musculoskeletal", weight: "44-54 of 180" },
  { name: "Neuromuscular & Nervous", weight: "39-48 of 180" },
  { name: "Cardiovascular & Pulmonary", weight: "22-27 of 180" },
  { name: "Other Systems & Interactions", weight: "29-45 of 180" },
  { name: "Equipment, Modalities, Safety, Professional & Research", weight: "21-29 of 180" },
];

export default function NptePtLandingPage() {
  return (
    <div data-theme="nptept" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NPTE-PT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/npte-pt/dashboard"
            shortName="NPTE-PT"
            subtitle="200 PT board questions and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/nptept-mobile.png", desktop: "/landing/nptept-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nptept" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the content outline: cardiovascular and pulmonary; musculoskeletal; neuromuscular and nervous; the other body systems and system interactions; and equipment, modalities, safety, professional practice and research. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 180 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the FSBPT Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FSBPT publishes a range of scored questions for each body system and topic, and every mock exam here keeps the midpoint of each range, scaled to 50 questions. Musculoskeletal and neuromuscular content make up about half the exam. Questions are written at the physical therapist&apos;s level: choosing tests and measures, interpreting findings, telling one diagnosis from another, judging prognosis and when to refer, and setting the plan of care. DPT program faculty can set Tigertest as board review at{" "}
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
                src={getTigerAsset("nptept", 3)}
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
            How to Pass the NPTE-PT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with musculoskeletal and neuro</h3>
              <p>
                Together they are about half the scored questions. Know the special tests and what a positive result means, spinal cord injury levels and outcomes, stroke syndromes, and the post-operative protocols that set what a patient may do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice differential diagnosis and red flags</h3>
              <p>
                Many questions give a short case and ask what is most likely or what to do next. Learn the findings that separate look-alike conditions and the signs that call for referral, such as cauda equina syndrome, DVT, a cardiac event or a visceral source of pain.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn modalities and devices by their contraindications</h3>
              <p>
                For ultrasound, electrical stimulation, diathermy, cold, traction and compression, know the parameters and when not to use them. Know prosthetic gait deviations, wheelchair features and orthoses by the problem they solve.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 70% or better on every mock exam before your test date. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NPTE-PT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nptept" />
        </div>
      </div>

      <ExamSampleQuestions examId="nptept" />

      <ExamRelatedTests examId="nptept" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NPTE-PT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the FSBPT content outline.</p>
          <ExamLandingCTA dashboardHref="/npte-pt/dashboard" />
        </div>
      </div>
    </div>
  );
}
