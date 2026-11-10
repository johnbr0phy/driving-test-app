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

const siteUrl = SITE_URL;
const path = "/real-estate-broker-board-exam-reviewer-practice-test";

const title = "Real Estate Broker Board Exam Reviewer 2026 - Free PRC Practice Test";
const metaDescription =
  "Free reviewer for the PRC Real Estate Brokers Licensure Examination: 200 original questions on property ownership, R.A. 9646, ethics, P.D. 957, condominiums, sale, mortgage and lease, registration, brokerage, finance, zoning, ecology and appraisal, with four 50-item mock exams and every answer explained.";
const description =
  "Free practice for the Real Estate Brokers Licensure Examination given by the Professional Regulation Commission through the Professional Regulatory Board of Real Estate Service: 200 original questions across the three subjects, General/Fundamentals of Real Estate Service, Special and Technical Knowledge, and Professional Practice, on Philippine law and practice. Four 50-item mock exams weighted 25/25/50 like the real exam, and seven training sets by topic.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "real estate broker board exam reviewer, real estate broker licensure exam, reble reviewer, prc real estate broker exam, real estate broker exam philippines, ra 9646 reviewer, real estate broker practice test, real estate broker board exam questions, resa reviewer, real estate broker reviewer 2026",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("phrebroker"), width: 1200, height: 630, alt: "Tigertest free real estate broker board exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phrebroker")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Real Estate Brokers Licensure Examination?",
    a: "The exam is given in one day by the Professional Regulation Commission through the Professional Regulatory Board of Real Estate Service. It has three subjects: General/Fundamentals of Real Estate Service (property ownership, the Code of Ethics, R.A. 9646 and real estate laws and taxation), Special and Technical Knowledge (subdivision development, condominiums and other holdings, sale, mortgage and lease, and documentation and registration), and Professional Practice (brokerage practice, finance and economics, urban and land use, planning and zoning, ecology and basic appraisal).",
  },
  {
    q: "How is the broker board exam weighted and how do you pass?",
    a: "In the Board's recent exam programs, General/Fundamentals and Special and Technical Knowledge each weigh 25% and run two hours, and Professional Practice weighs 50% and runs four hours. The Board's 2011 table of specifications set 100, 100 and 200 items. Under Section 15 of R.A. 9646 you pass with an average of at least 75% in all subjects and no rating below 50% in any subject.",
  },
  {
    q: "How are these mock exams different from the real one?",
    a: "Each mock exam here has 50 items: 13 from General/Fundamentals, 12 from Special and Technical Knowledge and 25 from Professional Practice, the same 25/25/50 weights, with a 75% pass line. Only the 75% average is scored; the 50% floor in each subject is not modelled. Use the seven training sets to study one topic area at a time.",
  },
  {
    q: "Which laws does this reviewer cover?",
    a: "R.A. 9646 (the Real Estate Service Act), the Civil Code on property, sales, agency, mortgage and lease, the Family Code on conjugal property, P.D. 957, B.P. 220, R.A. 7279 as amended, the Condominium Act (R.A. 4726), the Maceda Law (R.A. 6552), P.D. 1529 and the Torrens system, CARP, the Local Government Code on real property tax, R.A. 12001 on real property valuation, the Water Code and the main environmental laws. Tax rates, fees and peso limits are left out because they change.",
  },
  {
    q: "Are these the real board exam questions?",
    a: "No. Every question is original, written by Tigertest from the PRC exam program, R.A. 9646 and the other laws it lists. It is free practice, not affiliated with the Professional Regulation Commission, the Professional Regulatory Board of Real Estate Service or any review center.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Real Estate Broker Board Exam Reviewer",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 real estate broker board exam practice questions",
        "4 mock exams of 50 items weighted 25/25/50",
        "7 training sets by topic",
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
        classFaqJsonLd("phrebroker"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General/Fundamentals of Real Estate Service (25%)", weight: "13 per test" },
  { name: "Special and Technical Knowledge (25%)", weight: "12 per test" },
  { name: "Professional Practice (50%)", weight: "25 per test" },
];

export default function PhrebrokerLandingPage() {
  return (
    <div data-theme="phrebroker" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Real Estate Broker Board Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/real-estate-broker-exam-philippines/dashboard"
            shortName="REB Exam"
            subtitle="200 original questions for the PRC Real Estate Brokers Licensure Examination: property ownership, R.A. 9646 and ethics, subdivisions and condominiums, sale, mortgage and lease, titles and registration, brokerage, finance, zoning, ecology and appraisal. Four 50-item mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phrebroker-mobile.png", desktop: "/landing/phrebroker-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phrebroker" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven training sets that follow the exam program: ownership and real estate laws, R.A. 9646 and ethics, subdivisions and condominiums, sale, mortgage, lease and registration, brokerage and finance, land use and zoning, and ecology and appraisal. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Exams Weighted Like the Real One</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 items with the 25/25/50 subject weights and a 75% pass line. No question appears in more than one mock exam, and every answer is explained with the law or principle behind it.
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
                Built on the PRC Exam Program
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real exam is one day: General/Fundamentals for two hours, Special and Technical Knowledge for two hours, then Professional Practice for four hours. Each mock exam here keeps the subjects&apos; weights and spreads the items evenly over each subject&apos;s topics, as the Board&apos;s table of specifications does. The 50% floor per subject is not modelled.
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
                src={getTigerAsset("phrebroker", 1)}
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
            How to Pass the Real Estate Broker Board Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give Professional Practice half your time</h3>
              <p>
                Professional Practice is half the rating and the longest part of the day. Brokerage practice, finance, land use, zoning, ecology and appraisal each matter, so do not leave the non-legal topics for the last week.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know R.A. 9646 section by section</h3>
              <p>
                Salesperson accreditation and supervision, the broker&apos;s co-signature, who may pay a salesperson&apos;s commission, the exemptions, the bond, the one-broker-per-twenty rule and the grounds for suspension come up again and again.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the buyer protection laws side by side</h3>
              <p>
                P.D. 957, the Maceda Law and the Condominium Act protect buyers in different ways: licenses to sell and non-forfeiture, grace periods and cash surrender values, and common areas and the 60/40 rule. Practise the Maceda computations until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not neglect a single subject</h3>
              <p>
                You need a 75% average, but a rating below 50% in any one subject fails you even with a high average. Check current tax rates, fees and loan figures with the BIR, your LGU and the lenders before the exam, since this reviewer leaves them out.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Real Estate Broker Board Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="phrebroker" />
        </div>
      </div>

      <ExamRelatedTests examId="phrebroker" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Broker Board Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all three subjects.</p>
          <ExamLandingCTA dashboardHref="/real-estate-broker-exam-philippines/dashboard" />
        </div>
      </div>
    </div>
  );
}
