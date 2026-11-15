import "@/lib/banks/mblex";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
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

const title = "Free MBLEx Practice Test 2026 - Massage & Bodywork Licensing Exam";
const metaDescription =
  "MBLEx practice, free to start: 200 original questions on the FSMTB content outline, four 50-question practice tests weighted like the real exam, every answer explained.";
const description =
  "Practice for the FSMTB Massage & Bodywork Licensing Examination (MBLEx), the FSMTB's entry-level massage therapy licensing exam, free to start: 200 original questions written from the FSMTB MBLEx Content Outline. Four 50-question practice tests weighted like the real exam, and four training sets covering anatomy, physiology and kinesiology; pathology, contraindications and the benefits and effects of massage; client assessment and treatment planning; and ethics, laws and professional practice.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "mblex practice test, mblex practice exam, massage and bodywork licensing examination, massage therapy license exam practice, fsmtb mblex, mblex questions, massage therapist exam practice, lmt exam practice test",
  alternates: {
    canonical: `${siteUrl}/mblex-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/mblex-practice-test`,
    images: [{ url: shareImageUrl("mblex"), width: 1200, height: 630, alt: "Tigertest MBLEx practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mblex")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the MBLEx?",
    a: "The Massage & Bodywork Licensing Examination (MBLEx) is the entry-level licensing exam of the Federation of State Massage Therapy Boards (FSMTB). Most US states and territories regulate massage therapy, and state boards and agencies set the licensing exam they require, so check that yours accepts the MBLEx. Passing it is not a license: you then apply to your state board or agency and meet its own requirements, which vary widely between states.",
  },
  {
    q: "How many questions are on the MBLEx and how long do you get?",
    a: "The MBLEx is 100 multiple-choice questions in 110 minutes, inside a two-hour appointment at a Pearson VUE test center. It is a fixed-length computer-adaptive test: you answer the questions in the order they appear, and every one must be answered within the time or the exam is failed. There are no scheduled breaks.",
  },
  {
    q: "What score do you need to pass the MBLEx?",
    a: "FSMTB reports results only as pass or fail. The passing standard is criterion-referenced and set by the FSMTB Board of Directors, and no percent is published. If you fail, you get a diagnostic report by content area. The practice tests here use 70 percent as a readiness line.",
  },
  {
    q: "What does the MBLEx cover?",
    a: "FSMTB's content outline has seven areas: Anatomy & Physiology (11%), Kinesiology (12%), Pathology, Contraindications, Areas of Caution, Special Populations (14%), Benefits and Effects of Soft Tissue Manipulation (15%), Client Assessment, Reassessment & Treatment Planning (17%), Ethics, Boundaries, Laws, Regulations (16%), and Guidelines for Professional Practice (15%). The weights are approximate.",
  },
  {
    q: "Are these the real MBLEx questions?",
    a: "No. Every question is original, written by Tigertest from the FSMTB content outline and standard anatomy, kinesiology and infection-control references. It is not affiliated with FSMTB, and no FSMTB study guide or MBLEx Check items were used. State laws on scope of practice and licensing vary, so check your own state board's rules.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - MBLEx Practice Test",
      description,
      url: `${siteUrl}/mblex-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("mblex"),
      featureList: [
        "200 MBLEx practice questions",
        "4 practice tests of 50 questions weighted like the real exam",
        "4 training sets by topic",
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
        classFaqJsonLd("mblex"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Anatomy & Physiology", weight: "11%" },
  { name: "Kinesiology", weight: "12%" },
  { name: "Pathology, Contraindications, Areas of Caution, Special Populations", weight: "14%" },
  { name: "Benefits and Effects of Soft Tissue Manipulation", weight: "15%" },
  { name: "Client Assessment, Reassessment & Treatment Planning", weight: "17%" },
  { name: "Ethics, Boundaries, Laws, Regulations", weight: "16%" },
  { name: "Guidelines for Professional Practice", weight: "15%" },
];

export default function MblexLandingPage() {
  return (
    <div data-theme="mblex" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free MBLEx Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/mblex/dashboard"
            shortName="MBLEx"
            subtitle="200 original questions on the FSMTB MBLEx content outline: anatomy and kinesiology, pathology and contraindications, the effects of massage, client assessment, ethics and laws, and professional practice. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/mblex-mobile.png", desktop: "/landing/mblex-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mblex" />

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
                Four training sets: anatomy, physiology and kinesiology; pathology and the effects of massage; client assessment and treatment planning; and ethics, laws and professional practice. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions in the content outline&apos;s proportions, each with a 70% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the FSMTB Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FSMTB weights the MBLEx across seven content areas. Each practice test keeps the same balance: 6 anatomy and physiology, 6 kinesiology, 7 pathology, 7 benefits and effects, 9 client assessment, 8 ethics and laws, and 7 professional practice questions in every 50.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("mblex", 1)}
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
            How to Pass the MBLEx
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Do not skip the ethics and assessment areas</h3>
              <p>
                Client assessment and treatment planning (17%) and ethics, boundaries, laws and regulations (16%) are the two largest areas. Know SOAP notes, postural and gait findings, informed consent, transference, dual relationships and the limits of scope of practice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn contraindications by reason</h3>
              <p>
                Instead of memorizing lists, ask what could go wrong: a clot that could travel, an infection that could spread, a client who cannot feel heat, bones that could break. Then decide between rescheduling, avoiding the area and changing the pressure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know muscles by attachment and action</h3>
              <p>
                For the major muscles, learn where they attach and what they do, then reason out synergists and antagonists. Add the proprioceptors, the contraction types and active, passive and resisted range of motion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                The MBLEx gives 110 minutes for 100 questions, answered in order with no going back. Time yourself on the practice tests and aim for 80% or better on every one before you book your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          MBLEx Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mblex" />
        </div>
      </div>

      <ExamSampleQuestions examId="mblex" />

      <ExamRelatedTests examId="mblex" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the MBLEx?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all seven MBLEx content areas.</p>
          <ExamLandingCTA dashboardHref="/mblex/dashboard" />
        </div>
      </div>
    </div>
  );
}
