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

const title = "CCS Practice Test 2026 - Free AHIMA Certified Coding Specialist Questions";
const metaDescription =
  "Free CCS practice test: 200 original questions on the AHIMA Certified Coding Specialist exam outline, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Free practice for the AHIMA Certified Coding Specialist (CCS) exam: 200 original questions written from the CCS Exam Content Outline. Four 50-question practice tests weighted like the real five domains: coding knowledge and skills (inpatient ICD-10-CM, ICD-10-PCS, outpatient and ED coding, MS-DRGs and edits), coding documentation, provider queries, regulatory compliance, and information technologies.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ccs practice test, ccs exam practice, ahima ccs practice test, certified coding specialist practice test, ccs exam questions, ccs mock exam, ahima ccs exam 2026, inpatient coding exam, hospital coding certification, ccs coding exam",
  alternates: {
    canonical: `${siteUrl}/ccs-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccs-practice-test`,
    images: [{ url: shareImageUrl("ccs"), width: 1200, height: 630, alt: "Tigertest free CCS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccs")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CCS exam?",
    a: "The Certified Coding Specialist (CCS) is AHIMA's mastery-level coding credential for hospital and facility coders. It shows you can code inpatient, outpatient and emergency department records with ICD-10-CM, ICD-10-PCS and CPT, apply the official guidelines, and handle documentation, queries, compliance and coding software. AHIMA recommends, but does not require, experience such as two years of coding, a CCA plus one year, or a CCS-P, RHIT or RHIA credential.",
  },
  {
    q: "How many questions are on the CCS exam and how long is it?",
    a: "The exam has 107 questions in 4 hours at a Pearson VUE test center: 97 are scored and 10 are unscored pretest items placed at random. You can move between questions and flag them for review before you submit. The passing score is a scaled 300, so the 70 percent line on these practice tests is a readiness target, not the official pass mark.",
  },
  {
    q: "What is on the CCS exam?",
    a: "The CCS Exam Content Outline (effective May 1, 2024) has five domains: Coding Knowledge and Skills 39 to 41 percent, Coding Documentation 18 to 22 percent, Provider Queries 9 to 11 percent, Regulatory Compliance 18 to 22 percent, and Information Technologies 9 to 11 percent. It also lists medical scenarios split evenly across inpatient, outpatient and emergency department cases. Each 50-question practice test here keeps the domain balance; the medical scenarios are not modelled.",
  },
  {
    q: "Which code books do I need for the CCS exam?",
    a: "For exams from May 1, 2026 AHIMA requires three 2026 code books from its approved list: one ICD-10-CM book, one ICD-10-PCS book and the AMA CPT Professional Edition. Check the ISBNs on AHIMA's list before test day, because candidates without approved books cannot test and forfeit their fees. These practice questions test the guidelines and concepts you apply with the books open, not look-ups.",
  },
  {
    q: "Are these the real CCS exam questions?",
    a: "No. Every question is original, written by Tigertest from AHIMA's published CCS Exam Content Outline, the public ICD-10-CM and ICD-10-PCS Official Guidelines and CMS rules, so it tests the same skills without copying the exam. It is free practice, not an official AHIMA product, and Tigertest is not affiliated with AHIMA.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CCS Practice Test",
      description,
      url: `${siteUrl}/ccs-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CCS practice questions",
        "4 practice tests of 50 questions weighted like the AHIMA CCS Exam Content Outline",
        "4 training sets, one per practice test",
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
        classFaqJsonLd("ccs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Coding Knowledge & Skills", weight: "39-41%" },
  { name: "Coding Documentation", weight: "18-22%" },
  { name: "Provider Queries", weight: "9-11%" },
  { name: "Regulatory Compliance", weight: "18-22%" },
  { name: "Information Technologies", weight: "9-11%" },
];

export default function CcsLandingPage() {
  return (
    <div data-theme="ccs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccs/dashboard"
            shortName="CCS"
            subtitle="200 original questions on the AHIMA Certified Coding Specialist outline: inpatient principal diagnosis and POA, ICD-10-PCS root operations, outpatient and ED coding, MS-DRGs and edits, documentation, compliant queries, HACs and HIPAA. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ccs-mobile.png", desktop: "/landing/ccs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccs" />

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
                Each training set holds one practice test&apos;s 50 questions, covering all five domains. Questions you miss come back until you have mastered them, then you take that test for a score.
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
                Four practice tests of 50 multiple-choice questions, each weighted like the five domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CCS Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AHIMA publishes a weight range for each of the five domains, and every practice test here sits inside it: 20 coding knowledge questions (inpatient diagnoses, ICD-10-PCS, outpatient and ED coding, MS-DRGs and edits), 10 on documentation, 5 on queries, 10 on compliance and 5 on information technologies. AHIMA&apos;s outline also lists medical scenarios, a third each inpatient, outpatient and emergency department; those case-based items are not modelled here. Instructors running a coding or HIM program can set Tigertest as practice at{" "}
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
                src={getTigerAsset("ccs", 1)}
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
            The CCS practice test is new. Spot a question that could be clearer, or a topic you&apos;d like covered? We read every message and use it to improve every test.
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
            How to Pass the CCS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master principal diagnosis and POA</h3>
              <p>
                Inpatient questions turn on Section II of the guidelines and the POA rules: admissions from observation or outpatient surgery, plans not carried out, chemotherapy encounters, sepsis that develops after admission, and ulcers that progress during the stay. Know the rule before you open the book.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the PCS root operations cold</h3>
              <p>
                Most PCS errors are the wrong root operation or approach: extirpation versus excision, fragmentation, bypass from and to, detachment levels, conversions from laparoscopic to open. Decide the objective of the procedure first and the tables follow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a documentation reviewer</h3>
              <p>
                About 30 percent of the exam is documentation and queries. Know what other clinicians may document, when a conflict needs the attending, and what makes a query compliant: indicators from the record, no leading, no mention of payment or quality scores.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Tie codes to payment and quality</h3>
              <p>
                MCCs and CCs, CC exclusions, HACs and POA, PSIs, NCCI and MUEs all depend on accurate codes. The right answer is always the one the documentation supports. Aim for 70% or better on every practice test before you book, and drill the questions you missed after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ccs" />
        </div>
      </div>

      <ExamRelatedTests examId="ccs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CCS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every domain of the CCS outline.</p>
          <ExamLandingCTA dashboardHref="/ccs/dashboard" />
        </div>
      </div>
    </div>
  );
}
