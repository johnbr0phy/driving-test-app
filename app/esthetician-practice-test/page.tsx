import "@/lib/banks/esthetician";
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

const title = "Free Esthetician Practice Test 2026 - NIC Esthetics Theory Exam";
const metaDescription =
  "Esthetician state board practice, free to start: 200 original questions on the NIC Esthetics theory outline, four 50-question practice tests, every answer explained.";
const description =
  "Practice for the NIC National Esthetics Theory Examination, the written state board exam for estheticians in states that use NIC exams, free to start: 200 original questions written from the NIC content outline. Four 50-question practice tests weighted like the real exam, and five training sets covering infection control and chemistry; anatomy, skin and hair; skin disorders and consultation; facials and body treatments; and equipment, makeup and hair removal.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "esthetician practice test, esthetics practice test, esthetician state board exam, nic esthetics exam, esthetics theory exam, esthetician written exam, esthetician license test, skin care license exam",
  alternates: {
    canonical: `${siteUrl}/esthetician-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/esthetician-practice-test`,
    images: [{ url: shareImageUrl("esthetician"), width: 1200, height: 630, alt: "Tigertest esthetician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("esthetician")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NIC Esthetics theory exam?",
    a: "The National Esthetics Theory Examination is the written licensure exam for estheticians developed by the National-Interstate Council of State Boards of Cosmetology (NIC). State boards that use NIC exams require it, usually with a practical exam, before they issue an esthetician license. Some states use a different exam provider or their own exam, so check with your state board.",
  },
  {
    q: "How many questions are on the esthetician theory exam?",
    a: "The NIC Esthetics theory exam has 110 multiple-choice questions, of which 100 are scored, with 90 minutes allowed. Each question has four answer options and only one is correct.",
  },
  {
    q: "What score do you need to pass?",
    a: "Each state board sets its passing score; NIC publishes no national pass mark. Many boards use 75, for example South Carolina, which requires a passing score of 75% on the NIC theory and practical exams for esthetics. The practice tests here use 75% as a readiness line.",
  },
  {
    q: "What does the esthetician theory exam cover?",
    a: "The NIC content outline has two domains. Scientific Concepts (55%) covers microbiology, infection control and safety, anatomy and physiology, the skin and its glands, skin disorders and diseases, hair, and basic chemistry. Skin Care and Services (45%) covers consultation and skin analysis, facial procedures, electrical equipment, makeup, body treatments, lash and brow services, hair removal and advanced treatments.",
  },
  {
    q: "Are these the real NIC questions?",
    a: "No. Every question is original, written by Tigertest from the NIC content outline and US federal guidance from OSHA, the FDA and the National Cancer Institute. It is not affiliated with NIC or any state board, and no NIC sample question was used. Training hours, fees, scope of practice and the practical exam vary by state, so check your own state board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Esthetician Practice Test",
      description,
      url: `${siteUrl}/esthetician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("esthetician"),
      featureList: [
        "200 esthetician practice questions",
        "4 practice tests of 50 questions weighted like the real exam",
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
        classFaqJsonLd("esthetician"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scientific Concepts", weight: "55%" },
  { name: "Skin Care and Services", weight: "45%" },
];

export default function EstheticianLandingPage() {
  return (
    <div data-theme="esthetician" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Esthetician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/esthetician/dashboard"
            shortName="Esthetician"
            subtitle="200 NIC Esthetics questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/esthetician-mobile.png", desktop: "/landing/esthetician-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="esthetician" />

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
                Five training sets: infection control and chemistry; anatomy, skin and hair; skin disorders and consultation; facials and body treatments; and equipment, makeup and hair removal. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions in the content outline&apos;s proportions, each with a 75% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the NIC Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NIC splits the esthetics theory exam into two domains. Each practice test keeps close to the same balance: 27 scientific concepts questions (infection control, anatomy, skin, disorders, hair and chemistry) and 23 skin care and services questions (consultation, facials, equipment, makeup, hair removal and body treatments) in every 50.
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
                src={getTigerAsset("esthetician", 3)}
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
            How to Pass the Esthetician Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give the science its due</h3>
              <p>
                Scientific concepts are more than half the exam (55%). Know the layers of the epidermis and dermis, the sweat and oil glands, the hair growth cycle, facial muscles and nerves, and the levels and methods of infection control.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Sort disorders into treat or refer</h3>
              <p>
                For each disorder, learn its name and whether it is contagious. Bacterial conjunctivitis, herpes simplex, impetigo and tinea mean no service; changing moles mean a referral. Learn the primary and secondary lesions and the ABCDE signs of melanoma.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Walk through a facial step by step</h3>
              <p>
                Consultation, draping, cleansing, analysis, steam, exfoliation, massage, extraction, mask, then treatment, moisturizer and sunscreen. Know why each step comes where it does, which skin types each product suits and when a service is contraindicated.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                The NIC exam gives 90 minutes for 110 questions. Time yourself on the practice tests and aim for 85% or better on every one before you book your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Esthetician Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="esthetician" />
        </div>
      </div>

      <ExamSampleQuestions examId="esthetician" />

      <ExamRelatedTests examId="esthetician" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Esthetics State Board?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across both NIC domains.</p>
          <ExamLandingCTA dashboardHref="/esthetician/dashboard" />
        </div>
      </div>
    </div>
  );
}
