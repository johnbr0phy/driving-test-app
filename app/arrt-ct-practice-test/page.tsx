import "@/lib/banks/arrtct";
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

const title = "ARRT CT Practice Test 2026 - Free Computed Tomography Registry Questions";
const metaDescription =
  "Free ARRT CT practice test: 200 original computed tomography questions on the 2026 ARRT CT content specifications, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the ARRT Computed Tomography (CT) certification exam: 200 original questions written from the ARRT CT Examination Content Specifications in effect from September 1, 2026. Four 50-question mock exams weighted like the real 165 scored questions, and five training sets covering patient care and contrast, radiation safety and dose, image formation, image evaluation and archiving, and procedures for the head, spine, musculoskeletal system, neck, chest, abdomen and pelvis.";

const faqs = [
  {
    q: "What is the ARRT CT exam?",
    a: "It is the computed tomography certification exam of the American Registry of Radiologic Technologists (ARRT). Many candidates qualify through ARRT's postprimary pathway, which needs a supporting credential such as radiography, plus structured education and documented clinical experience in CT. Passing it, along with ARRT's ethics requirements, earns the CT credential.",
  },
  {
    q: "How many questions are on the ARRT CT exam?",
    a: "ARRT's 2026 Postprimary Eligibility Pathway Handbook lists 195 questions: 165 scored and 30 unscored pilot questions, with 195 minutes of test time in a 215-minute appointment. Results are scaled scores from 1 to 99, and a scaled score of 75 passes. That is not the same as 75 percent correct, so the 75 percent line on these practice tests is a readiness target, not the official standard.",
  },
  {
    q: "What is on the ARRT CT exam?",
    a: "Under the content specifications in effect from September 1, 2026, the 165 scored questions are Patient Care 21, Safety 21, Image Production 52 (image formation 30, image evaluation and archiving 22) and Procedures 71 (head, spine and musculoskeletal 25, neck and chest 22, abdomen and pelvis 24). Each 50-question practice test here keeps that balance.",
  },
  {
    q: "What changed on the ARRT CT exam in September 2026?",
    a: "ARRT revised its CT documents with effect from September 1, 2026. The outline adds the time-out, power injection options, timing bolus and bolus tracking, adverse event reporting, cardiac studies such as TAVR planning, esophagram, urogram, renal stone, retrograde cystogram and CT colonography, and replaces pediatric with infant and young child. Biliary studies were removed. ARRT also approved an updated passing standard from the same date.",
  },
  {
    q: "Are these the real ARRT CT exam questions?",
    a: "No. Every question is original, written by Tigertest from ARRT's published content specifications, so it covers the same knowledge without copying the exam. Anatomy, scan settings, findings and artifacts are described in words, so image-based items are not modelled. Tigertest is not affiliated with ARRT, and this practice does not replace your CT program's registry review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "arrt ct practice test, ct registry practice exam, computed tomography practice test, arrt ct registry review questions, ct technologist exam questions, arrt ct exam 2026, ct boards practice, arrt ct content specifications",
  alternates: {
    canonical: `${siteUrl}/arrt-ct-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/arrt-ct-practice-test`,
    images: [{ url: shareImageUrl("arrtct"), width: 1200, height: 630, alt: "Tigertest free ARRT CT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("arrtct")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ARRT CT Practice Test",
      description,
      url: `${siteUrl}/arrt-ct-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("arrtct"),
      featureList: [
        "200 ARRT CT practice questions",
        "4 mock exams of 50 questions weighted like the ARRT CT content specifications",
        "5 training sets by content category",
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
        classFaqJsonLd("arrtct"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Care", weight: "12.7%" },
  { name: "Safety", weight: "12.7%" },
  { name: "Image Production", weight: "31.5%" },
  { name: "Procedures", weight: "43%" },
];

export default function ArrtCtLandingPage() {
  return (
    <div data-theme="arrtct" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ARRT CT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/arrt-ct/dashboard"
            shortName="ARRT CT"
            subtitle="200 computed tomography questions and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/arrtct-mobile.png", desktop: "/landing/arrtct-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="arrtct" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the CT content specifications: patient care and radiation safety; image formation; image evaluation and archiving; head, spine, neck and chest procedures; and abdomen and pelvis procedures. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 165 scored questions on the real exam. Aim for 75% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the ARRT CT Content Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ARRT publishes how many of the 165 scored questions come from each category, and every mock exam here keeps that balance, scaled to 50 questions. Procedures is the biggest category, followed by image production. The weights below are for exams from September 1, 2026. CT program instructors can set Tigertest as registry review at{" "}
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
                src={getTigerAsset("arrtct", 3)}
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
            How to Pass the ARRT CT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn cross-sectional anatomy</h3>
              <p>
                Procedures is over 40% of the exam. For each study know the landmarks, the vessels, how the anatomy looks in axial, coronal and sagittal planes, and which pathology the protocol is built to show.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your contrast timing</h3>
              <p>
                Learn the phases (arterial, pancreatic, portal venous, nephrographic, excretory), how timing bolus and bolus tracking work, flow rates and catheter sizes, and how to recognize and treat contrast reactions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the dose and image math</h3>
              <p>
                Pitch, beam width, CTDIvol and DLP, pixel size, window ranges and Hounsfield units all come up. Work each problem on paper, and know which settings raise or lower dose and noise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 75% or better on every mock exam before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ARRT CT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="arrtct" />
        </div>
      </div>

      <ExamSampleQuestions examId="arrtct" />

      <ExamRelatedTests examId="arrtct" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ARRT CT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every category of the ARRT CT content specifications.</p>
          <ExamLandingCTA dashboardHref="/arrt-ct/dashboard" />
        </div>
      </div>
    </div>
  );
}
