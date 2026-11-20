import "@/lib/banks/contractorlaw";
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

const title = "Free Contractor Business and Law Practice Test 2026";
const metaDescription =
  "Free contractor Business and Law practice test: 200 original questions on estimating, contracts, payroll tax, labor law, OSHA, bonds, insurance and liens, every answer explained.";
const description =
  "Practice for the contractor Business and Law (business and project management) exam that many state contractor boards require: 200 original questions written from federal tax, labor and safety law and standard construction business practice. Four 50-question mock tests with a 70 percent pass line and five training sets covering business organization and finance, estimating and project management, contracts, insurance and bonds, tax and labor law, and jobsite safety and environment.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "contractor business and law practice test, business and law exam, contractor business and law exam, nascla business and law, contractor license exam practice, business and project management exam, contractor exam questions, general contractor business law test 2026",
  alternates: {
    canonical: `${siteUrl}/contractor-business-and-law-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/contractor-business-and-law-practice-test`,
    images: [{ url: shareImageUrl("contractorlaw"), width: 1200, height: 630, alt: "Tigertest free contractor Business and Law practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("contractorlaw")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the contractor Business and Law exam?",
    a: "It is the business and law part of the licensing exam that many state contractor boards require, often alongside a separate trade exam. It covers how a construction company is run: licensing rules, estimating and bidding, business organization and financial management, tax and labor law, contracts, project management and liens, risk management, and safety and environmental rules. Each state writes and runs its own version, so the topics and rules vary by state.",
  },
  {
    q: "How many questions are on the exam and what is the passing score?",
    a: "It depends on the state. For example, the Georgia Business and Law exam is 50 questions in 120 minutes with 70 percent to pass, and the Hawaii exam is 80 questions in 180 minutes with 75 percent to pass. Each mock test here has 50 questions and uses a 70 percent pass line. Check your state's candidate bulletin for its own format.",
  },
  {
    q: "Is the Business and Law exam open book?",
    a: "In some states. Georgia's bulletin allows the Georgia edition of the NASCLA Contractors Guide to Business, Law and Project Management in the test center, while Hawaii's exam is closed book. Many states base the exam on a state edition of that guide, so get the edition your bulletin names.",
  },
  {
    q: "Does this cover my state's licensing and lien law?",
    a: "No. State licensing rules, lien deadlines and other state law differ everywhere, so these questions stick to federal law, such as IRS payroll tax rules, the FLSA, the I-9 rules and OSHA's construction and recordkeeping standards, plus the business and contract practices every state tests. Study your state's own licensing law and lien statute from its board's materials as well.",
  },
  {
    q: "Are these the real Business and Law exam questions?",
    a: "No. Every question is original, written by Tigertest from federal tax, labor and safety law and standard construction business practice. They cover the topics the Business and Law exams test, but this is practice, not an official exam. Tigertest is not affiliated with NASCLA, PSI or any state contractor board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Contractor Business and Law Practice Test",
      description,
      url: `${siteUrl}/contractor-business-and-law-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("contractorlaw"),
      featureList: [
        "200 contractor Business and Law practice questions",
        "4 mock tests of 50 questions with a 70 percent pass line",
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
        classFaqJsonLd("contractorlaw"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Business Organization", weight: "8%" },
  { name: "Financial Management", weight: "14%" },
  { name: "Estimating & Bidding", weight: "14%" },
  { name: "Project Management & Liens", weight: "10%" },
  { name: "Contracts", weight: "12%" },
  { name: "Risk Management, Insurance & Bonds", weight: "8%" },
  { name: "Tax Laws", weight: "12%" },
  { name: "Labor Laws", weight: "12%" },
  { name: "Safety & Environment", weight: "10%" },
];

export default function ContractorBusinessLawLandingPage() {
  return (
    <div data-theme="contractorlaw" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Contractor Business and Law Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/contractor-business-law/dashboard"
            shortName="Business and Law"
            subtitle="200 contractor business and law questions. Four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/contractorlaw-mobile.png", desktop: "/landing/contractorlaw-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="contractorlaw" />

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
                Five training sets follow the exam outline: business organization and finance; estimating and project management; contracts, insurance and bonds; tax and labor laws; and jobsite safety and environment. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, each spread across every topic and needing 70 percent to pass. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Business and Law Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                State Business and Law exams share the same subject areas, as in the Georgia and Hawaii candidate bulletins: estimating and bidding, financial management, tax and labor laws, contracts, project management and liens, risk management and safety. Each mock test here follows that spread, without the state licensing law part. Contractor licensing schools and instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("contractorlaw", 3)}
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
            How to Pass the Business and Law Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get your state&apos;s bulletin and reference book</h3>
              <p>
                Your state&apos;s candidate bulletin lists the topics, the number of questions in each, the time, the pass mark and the reference allowed. Many states use their own edition of the NASCLA Contractors Guide to Business, Law and Project Management, and on an open-book exam knowing where things are in it saves time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Drill the math by hand</h3>
              <p>
                Estimating and finance questions are mostly arithmetic: concrete in cubic yards, waste factors, labor burden, markup against margin, overhead rates, retainage, depreciation, break-even, current ratio and percentage of completion. Bring a simple calculator if the bulletin allows one and work each type until it is quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the payroll and safety deadlines</h3>
              <p>
                Many questions turn on a date or a time limit: Form 941 every quarter, W-2s by January 31, Form I-9 within three business days, OSHA fatality reports within 8 hours, the 300A posted from February 1 to April 30. Make a list of them and review it often.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80 percent or more on every mock test before you sit the exam. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Business and Law Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="contractorlaw" />
        </div>
      </div>

      <ExamSampleQuestions examId="contractorlaw" />

      <ExamRelatedTests examId="contractorlaw" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Business and Law Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every Business and Law topic.</p>
          <ExamLandingCTA dashboardHref="/contractor-business-law/dashboard" />
        </div>
      </div>
    </div>
  );
}
