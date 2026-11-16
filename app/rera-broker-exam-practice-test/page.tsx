import "@/lib/banks/aerera";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "RERA Broker Exam Practice Test 2026 - Free Dubai Real Estate Broker Questions and Answers";
const metaDescription =
  "Free practice for the Dubai RERA real estate broker exam: 200 original questions on the broker register, brokerage agreements, off-plan sales and escrow, landlord and tenant law, jointly owned property and the Dubai Land Department's rules. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Dubai RERA broker exam taken after the Dubai Real Estate Institute's certified broker training: 200 original questions on Bylaw No. (85) of 2006 and the broker register, broker duties and ethics, brokerage agreements and remuneration, the Interim Property Register and escrow accounts, off-plan marketing, RERA's smart contracts and Trakheesi, landlord and tenant law, jointly owned property and real estate maths. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rera exam, rera broker exam, rera practice test, dubai broker exam, drei exam, dld broker exam, rera exam questions and answers, dubai real estate broker exam, rera certification exam, real estate broker exam dubai 2026",
  alternates: {
    canonical: `${siteUrl}/rera-broker-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rera-broker-exam-practice-test`,
    images: [{ url: shareImageUrl("aerera"), width: 1200, height: 630, alt: "Tigertest free RERA broker exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aerera")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Dubai RERA broker exam?",
    a: "In Dubai, nobody may work as a real estate broker unless licensed by the competent entities and entered in the Real Estate Brokers Register kept under Bylaw No. (85) of 2006. A broker applying for registration must show certificates from accredited real estate training courses and a certificate that he passed the real estate brokerage test prepared by the Dubai Land Department. The Real Estate Regulatory Agency (RERA) regulates brokers, and the Dubai Real Estate Institute (DREI) runs the training.",
  },
  {
    q: "How many questions are on the RERA broker exam and what is the pass mark?",
    a: "The Dubai Land Department and DREI do not publish the question count, time, topic weights or pass mark on any page we could read. Guides disagree, so we do not quote a figure as official. Each mock test here has 50 questions and uses 70% as Tigertest's target, not an official figure. Confirm the current format and any exemptions with the Dubai Land Department or your training provider.",
  },
  {
    q: "What topics does the RERA broker exam cover?",
    a: "The Land Department's own practice guide shows the exam as domains such as laws and legislation and real estate mathematics. The training sets here follow the laws a Dubai broker works under: land registration, the broker register and broker duties, brokerage agreements and smart contracts A, B and F, off-plan sales, the Interim Property Register and escrow accounts, RERA's systems and permits, landlord and tenant law, jointly owned property, and area, price and payment sums.",
  },
  {
    q: "Which laws are the questions based on?",
    a: "The questions are written from the Dubai Land Department's published legislation and RERA's Real Estate Brokerage Practice Guide (second edition, November 2024): Bylaw No. (85) of 2006, Law No. (7) of 2006, Law No. (8) of 2007, Law No. (26) of 2007 as amended in 2008, Law No. (13) of 2008 as amended by Law No. (19) of 2020, Decree No. (26) of 2013, Law No. (6) of 2019 on jointly owned property and Law No. (4) of 2019 on RERA. Fees, fines and commission percentages are left out because they change.",
  },
  {
    q: "Are these the real RERA exam questions?",
    a: "No. Every question is original, written by Tigertest from the laws and the practice guide above, and none comes from the official exam or its samples. It is free practice, not affiliated with the Dubai Land Department, RERA, DREI or any training provider, and it does not replace the certified broker training.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RERA Broker Exam Practice Test",
      description,
      url: `${siteUrl}/rera-broker-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aerera", "AED"),
      featureList: [
        "200 Dubai real estate broker practice questions",
        "4 mock tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Land registration and the Land Department", weight: "5 per test" },
  { name: "The broker register and registration", weight: "6 per test" },
  { name: "Broker duties and professional ethics", weight: "6 per test" },
  { name: "Brokerage agreements and remuneration", weight: "7 per test" },
  { name: "Off-plan sales, escrow and marketing", weight: "7 per test" },
  { name: "RERA systems and practice rules", weight: "4 per test" },
  { name: "Real estate maths", weight: "3 per test" },
  { name: "Landlord and tenant law", weight: "7 per test" },
  { name: "Jointly owned property", weight: "5 per test" },
];

export default function ReraBrokerLandingPage() {
  return (
    <div data-theme="aerera" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RERA Broker Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rera-broker-exam/dashboard"
            shortName="RERA Broker"
            subtitle="200 original questions for Dubai real estate brokers: the broker register, duties and agreements, off-plan sales and escrow, landlord and tenant law, jointly owned property and the sums brokers use. Four 50-question mock tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/aerera-mobile.png", desktop: "/landing/aerera-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aerera" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Topic by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: land law and the broker register, broker duties and agreements, off-plan sales with RERA rules and maths, and leasing with jointly owned property. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix every topic, with a 70% target. No question appears in more than one test, and every answer comes with a short explanation that names the law it comes from.
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
                Built on Dubai Land Department Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Land Department does not publish topic weights, so each 50-question test spreads the laws and rules a Dubai broker works under as below. The questions follow Bylaw No. (85) of 2006, the property laws it sits beside and RERA&apos;s 2024 practice guide.
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
                src={getTigerAsset("aerera", 1)}
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
            How to Pass the RERA Broker Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who does what</h3>
              <p>
                The Land Department registers property rights and keeps the broker register. RERA regulates brokers, escrow accounts, advertising content and the management of jointly owned property. The Rent Disputes Settlement Centre hears landlord and tenant claims. Many wrong options swap one of these bodies for another.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the time limits once</h3>
              <p>
                Seven working days to refer an application, 14 days to re-apply, 30 days before expiry to renew, 15 days for a grievance, 90 days before a lease ends to give notice, and 30 days of notice to a defaulting buyer. A written list that you test yourself on works better than rereading.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the duty, not the temptation</h3>
              <p>
                A broker discloses substantial matters to both parties, keeps a private register and copies of every deal, holds client money as a trustee, never poses as a party without authority and loses his fee if he takes a benefit from the other side.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 80% or better on every mock test before your exam, and confirm the current format with the Dubai Land Department or your training provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RERA Broker Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="aerera" />

      <ExamRelatedTests examId="aerera" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Broker Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic Dubai brokers work with.</p>
          <ExamLandingCTA dashboardHref="/rera-broker-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
