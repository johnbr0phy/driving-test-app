import "@/lib/banks/rpt";
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

const title = "RPT Practice Test 2026 - Free AMT Registered Phlebotomy Technician Questions";
const metaDescription =
  "Free-to-start RPT (AMT) practice test: 200 original phlebotomy questions on the AMT RPT exam specifications, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the American Medical Technologists Registered Phlebotomy Technician (RPT) certification exam: 200 original questions written from AMT's published competencies and examination specifications. Four 50-question practice tests weighted like the real exam's eight work areas, and four training sets covering patient identification and venipuncture, capillary collection and specimen processing, workflow, communication and clerical duties, and safety, legal considerations and anatomy.";

const faqs = [
  {
    q: "What is the RPT (AMT) exam?",
    a: "It is the certification exam for the Registered Phlebotomy Technician credential from American Medical Technologists (AMT), a national certifying body for allied health professionals. Passing it earns the RPT (AMT) credential. Many candidates take it at the end of a phlebotomy program, and schools often schedule the exam for their students.",
  },
  {
    q: "How many questions are on the RPT exam?",
    a: "AMT's examination specifications list 200 questions across eight work areas. AMT's candidate handbook gives the phlebotomy technician exam 2.5 hours. Questions are four-option multiple choice with a single best answer, taken on a computer, and some may be unscored pretest items.",
  },
  {
    q: "What score do you need to pass the RPT exam?",
    a: "AMT reports a scaled score from 0 to 100, and the minimum passing score is 70. AMT notes that 70 is not a percentage of questions answered correctly, so the 70 percent line on these practice tests is a readiness target, not the official standard. A candidate who fails retakes the whole exam and may test up to four times in all.",
  },
  {
    q: "What is on the RPT exam?",
    a: "Obtaining blood samples is the largest work area at 34 percent: patient identification and preparation, site selection, venipuncture, the order of draw, capillary and heel punctures, labeling and post care. Specimen collection and processing and safety standards are 15 percent each, time management and legal and ethical considerations 10 percent each, communications and clerical duties 5.5 percent each, and terminology, anatomy and physiology 5 percent. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real RPT exam questions?",
    a: "No. Every question is original, written by Tigertest from AMT's published competencies and examination specifications and from standards on AMT's reference list such as the WHO guidelines on drawing blood. It covers the same knowledge without copying the exam. Tigertest is not affiliated with American Medical Technologists.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rpt practice test, rpt exam, amt rpt practice test, registered phlebotomy technician practice exam, amt phlebotomy exam questions, rpt certification 2026, american medical technologists phlebotomy, phlebotomy certification practice test",
  alternates: {
    canonical: `${siteUrl}/rpt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rpt-practice-test`,
    images: [{ url: shareImageUrl("rpt"), width: 1200, height: 630, alt: "Tigertest free RPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rpt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RPT (AMT) Practice Test",
      description,
      url: `${siteUrl}/rpt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("rpt"),
      featureList: [
        "200 RPT (AMT) practice questions",
        "4 practice tests of 50 questions weighted like the AMT exam specifications",
        "4 training sets by work area",
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
        classFaqJsonLd("rpt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Obtaining Blood Samples", weight: "34%" },
  { name: "Specimen Collection and Processing", weight: "15%" },
  { name: "Safety Standards and Procedures", weight: "15%" },
  { name: "Time Management and Assignment Organization", weight: "10%" },
  { name: "Legal, Ethical, and Professional Considerations", weight: "10%" },
  { name: "Professional Communications", weight: "5.5%" },
  { name: "Clerical Skills and Duties", weight: "5.5%" },
  { name: "Terminology, Anatomy, and Physiology", weight: "5%" },
];

export default function RptLandingPage() {
  return (
    <div data-theme="rpt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RPT (AMT) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rpt/dashboard"
            shortName="RPT"
            subtitle="200 original phlebotomy questions on the AMT RPT exam specifications: patient identification, venipuncture, order of draw, capillary punctures, specimen handling, safety and law. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/rpt-mobile.png", desktop: "/landing/rpt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rpt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Work Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the AMT specifications: patient identification and venipuncture; capillary collection and specimen processing; workflow, communication and clerical duties; and safety, legal considerations and anatomy. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 200 questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the AMT Examination Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AMT publishes how many of the 200 questions come from each work area, and every practice test here keeps that balance, scaled to 50 questions: 17 on obtaining blood samples, 8 on specimen processing, 7 on safety, 5 each on time management and legal topics, 3 each on communications and clerical duties and 2 on terminology and anatomy. Phlebotomy program instructors can set Tigertest as RPT review at{" "}
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
                src={getTigerAsset("rpt", 3)}
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
            How to Pass the RPT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the draw itself</h3>
              <p>
                Obtaining blood samples is a third of the exam. Know patient identification, site selection, the CLSI order of draw, what each tube additive does, capillary and heel puncture sites, and how to label transfusion specimens.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn specimen handling</h3>
              <p>
                Specimen collection and processing is 15% of the exam. Review blood cultures, specimens that need ice, warmth or protection from light, urine and swab collections, which department gets which test, and point-of-care quality control.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know safety and the law</h3>
              <p>
                Safety is another 15% and legal topics 10%. Study OSHA&apos;s bloodborne pathogens and hazard communication rules, isolation precautions, complications such as hematomas and arterial punctures, consent, and torts such as assault and battery.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RPT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rpt" />
        </div>
      </div>

      <ExamSampleQuestions examId="rpt" />

      <ExamRelatedTests examId="rpt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RPT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every work area of the AMT RPT specifications.</p>
          <ExamLandingCTA dashboardHref="/rpt/dashboard" />
        </div>
      </div>
    </div>
  );
}
