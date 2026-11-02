import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "NASM CPT Practice Test 2026 - Free NASM Exam Questions";
const metaDescription =
  "Free NASM CPT practice test: 200 original questions on the CPT7 exam blueprint, four 50-question mock tests with a 70% pass line, and every answer explained.";
const description =
  "Free practice for the NASM Certified Personal Trainer (NASM-CPT) exam: 200 original questions written to NASM's CPT7 exam blueprint, covering basic and applied sciences and nutrition, client relations and behavioral coaching, assessment, program design with the OPT model, exercise technique and training instruction, and professional responsibility. Four mock tests of 50 questions with a 70 percent pass line, and four training sets that hold each test's questions.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nasm practice test, nasm cpt practice test, nasm cpt exam questions, nasm practice exam, nasm personal trainer exam, nasm cpt 7 practice test, opt model questions, overhead squat assessment questions, personal trainer certification practice test",
  alternates: {
    canonical: `${siteUrl}/nasm-cpt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nasm-cpt-practice-test`,
    images: [{ url: shareImageUrl("nasm"), width: 1200, height: 630, alt: "Tigertest free NASM CPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nasm")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NASM CPT Practice Test",
      description,
      url: `${siteUrl}/nasm-cpt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 NASM CPT practice questions",
        "4 mock tests of 50 questions with a 70% pass line",
        "4 training sets, one per mock test",
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
          name: "What is the NASM-CPT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the National Academy of Sports Medicine's Certified Personal Trainer exam, an NCCA-accredited, proctored computer test you take at a test center or online. To sit it you need a high school diploma or equivalent and current CPR and AED certification. The credential is renewed every two years with continuing education.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the NASM-CPT exam and what score do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam has 120 multiple-choice questions in 2 hours. 100 are scored and 20 are unscored research questions you cannot tell apart, and you need a scaled score of 70 to pass. Each mock test here has 50 questions and uses a 70 percent pass line, 35 of 50.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the NASM-CPT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Six domains from NASM's CPT7 exam blueprint: Basic and Applied Sciences and Nutritional Concepts (15 percent), Client Relations and Behavioral Coaching (15 percent), Assessment (16 percent), Program Design (20 percent), Exercise Technique and Training Instruction (24 percent) and Professional Development and Responsibility (10 percent). Expect the OPT model, overhead squat compensations, the Corrective Exercise Continuum and acute variables throughout.",
          },
        },
        {
          "@type": "Question",
          name: "How should I use these practice tests?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Work through the four training sets first. Each one holds exactly the 50 questions of one mock test, and missed questions come back until you master them. Then take the matching mock test to check what stuck. Aim for 40 or more out of 50 on every test before you book the real exam.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real NASM-CPT exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from NASM's published exam blueprint and the topics of the NASM personal training textbook, so it tests the same knowledge without copying the real exam. Tigertest is not affiliated with or endorsed by NASM, and this is free practice, not an official practice exam.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basic & Applied Sciences and Nutrition", weight: "15%" },
  { name: "Client Relations & Behavioral Coaching", weight: "15%" },
  { name: "Assessment", weight: "16%" },
  { name: "Program Design", weight: "20%" },
  { name: "Exercise Technique & Training Instruction", weight: "24%" },
  { name: "Professional Development & Responsibility", weight: "10%" },
];

export default function NasmCptLandingPage() {
  return (
    <div data-theme="nasm" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NASM CPT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nasm-cpt/dashboard"
            shortName="NASM CPT"
            subtitle="200 original questions on the NASM CPT7 exam blueprint: the OPT model, assessments, program design, exercise technique and coaching. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nasm-mobile.png", desktop: "/landing/nasm-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nasm" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Each Test&apos;s Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per mock test, each mixing all six exam domains in blueprint proportion. Instant feedback, and questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, each weighted like the real exam and scored against a 70 percent pass line. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CPT7 Exam Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the six domain weights NASM publishes for the CPT exam, so exercise technique and program design get the most questions, just as they do on test day.
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
                src={getTigerAsset("nasm", 1)}
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
            How to Pass the NASM-CPT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own the OPT model</h3>
              <p>
                Know the five phases (Stabilization Endurance, Strength Endurance, Muscular Development, Maximal Strength, Power) and each one&apos;s reps, sets, intensity, rest and flexibility type. Many program design and technique questions are this table in disguise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the overhead squat compensations</h3>
              <p>
                For feet turning out, knees moving in, excessive forward lean, low back arching and arms falling forward, know which muscles are overactive, which are underactive, and how the Corrective Exercise Continuum fixes each: inhibit, lengthen, activate, integrate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip coaching and scope</h3>
              <p>
                Client relations and professional responsibility are a quarter of the exam. Know the stages of change, SMART goals, motivational interviewing, and exactly where a trainer&apos;s scope of practice ends.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. After each mock test, drill the questions you missed and retrain your weakest domain before you schedule the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NASM CPT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the NASM-CPT exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the National Academy of Sports Medicine&apos;s Certified Personal Trainer exam, an NCCA-accredited, proctored computer test you take at a test center or online. To sit it you need a high school diploma or equivalent and current CPR and AED certification. The credential is renewed every two years with continuing education.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the NASM-CPT exam and what score do I need?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam has 120 multiple-choice questions in 2 hours. 100 are scored and 20 are unscored research questions you cannot tell apart, and you need a scaled score of 70 to pass. Each mock test here has 50 questions and uses a 70 percent pass line, 35 of 50.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the NASM-CPT exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Six domains from NASM&apos;s CPT7 exam blueprint: Basic and Applied Sciences and Nutritional Concepts (15 percent), Client Relations and Behavioral Coaching (15 percent), Assessment (16 percent), Program Design (20 percent), Exercise Technique and Training Instruction (24 percent) and Professional Development and Responsibility (10 percent). Expect the OPT model, overhead squat compensations, the Corrective Exercise Continuum and acute variables throughout.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How should I use these practice tests?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work through the four training sets first. Each one holds exactly the 50 questions of one mock test, and missed questions come back until you master them. Then take the matching mock test to check what stuck. Aim for 40 or more out of 50 on every test before you book the real exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real NASM-CPT exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from NASM&apos;s published exam blueprint and the topics of the NASM personal training textbook, so it tests the same knowledge without copying the real exam. Tigertest is not affiliated with or endorsed by NASM, and this is free practice, not an official practice exam.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="nasm" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NASM-CPT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six exam domains.</p>
          <ExamLandingCTA dashboardHref="/nasm-cpt/dashboard" />
        </div>
      </div>
    </div>
  );
}
