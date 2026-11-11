import "@/lib/banks/cca";
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

const title = "CCA Practice Test 2026 - Free AHIMA Certified Coding Associate Questions";
const metaDescription =
  "Free CCA practice test: 200 original questions on the AHIMA Certified Coding Associate exam outline, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Free practice for the AHIMA Certified Coding Associate (CCA) exam: 200 original questions written from the CCA Exam Content Outline. Four 50-question practice tests weighted like the real six domains: clinical classification systems (ICD-10-CM, ICD-10-PCS, CPT and E/M), reimbursement methodologies, health records and data content, compliance, information technologies, and confidentiality and privacy.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cca practice test, cca exam practice, ahima cca practice test, certified coding associate practice test, cca exam questions, cca mock exam, ahima cca exam 2026, entry level medical coding exam, cca coding exam",
  alternates: {
    canonical: `${siteUrl}/cca-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cca-practice-test`,
    images: [{ url: shareImageUrl("cca"), width: 1200, height: 630, alt: "Tigertest free CCA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cca")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CCA Practice Test",
      description,
      url: `${siteUrl}/cca-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cca"),
      featureList: [
        "200 CCA practice questions",
        "4 practice tests of 50 questions weighted like the AHIMA CCA Exam Content Outline",
        "4 training sets by topic",
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
          name: "What is the CCA exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Certified Coding Associate (CCA) is AHIMA's entry-level medical coding credential. It shows you can assign ICD-10-CM, ICD-10-PCS and CPT codes and understand how coded data drives payment, compliance and privacy in hospitals and physician practices. You need a high school diploma to sit for it; AHIMA recommends six months of coding experience or a coding training program.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the CCA exam and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam has 105 multiple-choice questions in 2 hours at a Pearson VUE test center: 90 are scored and 15 are unscored pretest items mixed in at random. You cannot go back to an earlier question or flag one for review. The passing score is a scaled 300, so the 70 percent line on these practice tests is a readiness target, not the official pass mark.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the CCA exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The CCA Exam Content Outline has six domains: Clinical Classification Systems 30 to 34 percent, Reimbursement Methodologies 21 to 25 percent, Health Records and Data Content 13 to 17 percent, Compliance 12 to 16 percent, Information Technologies 6 to 10 percent, and Confidentiality and Privacy 6 to 10 percent. Each 50-question practice test here keeps that balance.",
          },
        },
        {
          "@type": "Question",
          name: "Which code books do I need for the CCA exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For exams from May 1, 2026 AHIMA requires three 2026 code books from its approved list: one ICD-10-CM book, one ICD-10-PCS book and the AMA CPT Professional Edition. Check the ISBNs on AHIMA's list before test day, because candidates without approved books are turned away. These practice questions test the guidelines and concepts you apply with the books open, not look-ups.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real CCA exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from AHIMA's published CCA Exam Content Outline and the public ICD-10-CM and ICD-10-PCS guidelines, so it tests the same skills without copying the exam. It is free practice, not an official AHIMA product.",
          },
        },
        classFaqJsonLd("cca"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Clinical Classification Systems", weight: "30-34%" },
  { name: "Reimbursement Methodologies", weight: "21-25%" },
  { name: "Health Records & Data Content", weight: "13-17%" },
  { name: "Compliance", weight: "12-16%" },
  { name: "Information Technologies", weight: "6-10%" },
  { name: "Confidentiality & Privacy", weight: "6-10%" },
];

export default function CcaLandingPage() {
  return (
    <div data-theme="cca" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cca/dashboard"
            shortName="CCA"
            subtitle="200 original questions on the AHIMA Certified Coding Associate outline: ICD-10-CM, ICD-10-PCS, CPT and E/M, DRGs and claims, health records, compliance and HIPAA. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cca-mobile.png", desktop: "/landing/cca-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cca" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets by topic, from ICD-10-CM &amp; ICD-10-PCS Coding to Compliance, IT &amp; Privacy. Questions you miss come back until you have mastered them, then you take a practice test for a score.
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
                Four practice tests of 50 questions, each weighted like the six domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CCA Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AHIMA publishes a weight range for each of the six domains, and every practice test here sits inside it. Code sets weigh most: ICD-10-CM, ICD-10-PCS, CPT and E/M make up about a third of the exam, then payment systems and claims. Instructors running a coding or HIM program can set Tigertest as practice at{" "}
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
                src={getTigerAsset("cca", 1)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            The CCA practice test is new. Spot a question that could be clearer, or a topic you&apos;d like covered? We read every message and use it to improve every test.
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
            How to Pass the CCA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the guidelines, not just the codes</h3>
              <p>
                Most coding questions turn on a rule: principal diagnosis selection, uncertain diagnoses inpatient versus outpatient, sequencing sepsis or an adverse effect, Excludes1 versus Excludes2. Read the ICD-10-CM and ICD-10-PCS Official Guidelines at the front of your books until the rules are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your PCS root operations</h3>
              <p>
                Inpatient procedure questions come down to the objective of the procedure: excision or resection, replacement or supplement, repair as the last choice. Learn the definitions and the approach values and the tables do the rest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Connect codes to payment and compliance</h3>
              <p>
                Over half the exam is outside code assignment: MS-DRGs and APCs, NCCI edits, medical necessity, compliant queries, the chargemaster, HIPAA and record content. The right answer is the one the documentation supports, never the one that pays more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice without going back</h3>
              <p>
                On the real exam you cannot return to a question, so commit and move on. Aim for 70% or better on every practice test before you book, and drill the questions you missed after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the CCA exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Certified Coding Associate (CCA) is AHIMA&apos;s entry-level medical coding credential. It shows you can assign ICD-10-CM, ICD-10-PCS and CPT codes and understand how coded data drives payment, compliance and privacy in hospitals and physician practices. You need a high school diploma to sit for it; AHIMA recommends six months of coding experience or a coding training program.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the CCA exam and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam has 105 multiple-choice questions in 2 hours at a Pearson VUE test center: 90 are scored and 15 are unscored pretest items mixed in at random. You cannot go back to an earlier question or flag one for review. The passing score is a scaled 300, so the 70 percent line on these practice tests is a readiness target, not the official pass mark.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the CCA exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The CCA Exam Content Outline has six domains: Clinical Classification Systems 30 to 34 percent, Reimbursement Methodologies 21 to 25 percent, Health Records and Data Content 13 to 17 percent, Compliance 12 to 16 percent, Information Technologies 6 to 10 percent, and Confidentiality and Privacy 6 to 10 percent. Each 50-question practice test here keeps that balance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which code books do I need for the CCA exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              For exams from May 1, 2026 AHIMA requires three 2026 code books from its approved list: one ICD-10-CM book, one ICD-10-PCS book and the AMA CPT Professional Edition. Check the ISBNs on AHIMA&apos;s list before test day, because candidates without approved books are turned away. These practice questions test the guidelines and concepts you apply with the books open, not look-ups.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real CCA exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from AHIMA&apos;s published CCA Exam Content Outline and the public ICD-10-CM and ICD-10-PCS guidelines, so it tests the same skills without copying the exam. It is free practice, not an official AHIMA product.
            </p>
          </div>
          <ExamClassFaq examId="cca" />
        </div>
      </div>

      <ExamSampleQuestions examId="cca" />

      <ExamRelatedTests examId="cca" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CCA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the CCA outline.</p>
          <ExamLandingCTA dashboardHref="/cca/dashboard" />
        </div>
      </div>
    </div>
  );
}
