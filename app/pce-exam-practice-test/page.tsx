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

const title = "PCE Exam Practice Test 2026 - Free PCEIA Questions (Malaysia)";
const metaDescription =
  "Free PCEIA practice for Malaysian insurance agents: 200 original questions on Part A basics, Part B general insurance and Part C life insurance, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Malaysia's Pre-Contract Examination for Insurance Agents (PCEIA), the exam the Asian Institute of Insurance sets before a life or general insurance agent can be contracted: 200 original questions on risk and the principles of insurance, contract and agency law, the Financial Services Act 2013 and other laws, medical and health insurance, motor, fire and other general insurance, and life products, nomination, underwriting, claims and the code of practice. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pce exam practice test, pceia practice questions, pre-contract examination for insurance agents, pce part a part c, pce part b general insurance, malaysia insurance agent exam, pce mock exam 2026, aii pceia, pce life insurance questions",
  alternates: {
    canonical: `${siteUrl}/pce-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pce-exam-practice-test`,
    images: [{ url: shareImageUrl("mypce"), width: 1200, height: 630, alt: "Tigertest free PCEIA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mypce")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the PCE exam?",
    a: "The Pre-Contract Examination for Insurance Agents (PCEIA, often called the PCE) is the exam a person must pass in Malaysia before an insurer can contract them as an insurance agent. It is run by the Asian Institute of Insurance (Aii), formerly the Malaysian Insurance Institute. Part A covers the basics of insurance and is compulsory for everyone, Part B covers general insurance and Part C covers life insurance.",
  },
  {
    q: "How many questions are on the PCEIA and what is the passing mark?",
    a: "A life agent sits Parts A and C, and a general agent sits Parts A and B: 100 multiple-choice questions, 50 from each part, in 2 hours. Part B or Part C on its own is 50 questions in 1 hour 30 minutes. The passing mark is 50%. The exam is a virtual computer-based exam in English, Bahasa Malaysia or Mandarin.",
  },
  {
    q: "Which parts of the PCEIA do I need?",
    a: "Part A is compulsory. Add Part C to become a life insurance agent or Part B to become a general insurance agent. Selling investment-linked policies needs a separate examination as well. Check with the insurer that will contract you and with Aii before you register.",
  },
  {
    q: "How are these mock tests different from the real PCEIA?",
    a: "A real sitting is Parts A and C or Parts A and B. Each mock test here has 50 questions that cover all three parts (20 Part A, 10 Part B and 20 Part C) with the 50% passing line, so you meet every topic. To practise one part on its own, use the training sets: two for Part A, one for Part B and two for Part C.",
  },
  {
    q: "Are these the real PCEIA questions?",
    a: "No. Every question is original, written by Tigertest from Malaysian law and practice: the Financial Services Act 2013 and its schedules on nomination, insurable interest and disclosure, the Islamic Financial Services Act 2013, the Contracts Act 1950, the Road Transport Act 1987, the PDPA 2010 and the AMLA. It is free practice, not affiliated with the Asian Institute of Insurance, Bank Negara Malaysia, LIAM or PIAM, and it does not replace the Aii e-learning and textbook.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PCEIA Practice Test",
      description,
      url: `${siteUrl}/pce-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
      featureList: [
        "200 PCEIA practice questions",
        "4 mock tests of 50 questions across Parts A, B and C",
        "5 training sets by part and topic",
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
  { name: "Part A: Basics of insurance (compulsory)", weight: "50 questions" },
  { name: "Part B: General insurance", weight: "50 questions" },
  { name: "Part C: Life insurance", weight: "50 questions" },
];

export default function MypceLandingPage() {
  return (
    <div data-theme="mypce" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PCE Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malaysia-pce/dashboard"
            shortName="PCEIA"
            subtitle="200 original questions for Malaysia's Pre-Contract Examination for Insurance Agents: risk and the principles of insurance, the FSA 2013 and agency law, motor and fire insurance, and life products, nomination, underwriting and claims. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mypce-mobile.png", desktop: "/landing/mypce-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mypce" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Part at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: two for Part A (risk and principles; law, regulation and health insurance), one for Part B general insurance and two for Part C life insurance. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions with the real 50% passing line, each covering all three parts. No question appears in more than one test, and every contribution and average calculation is worked through.
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
                Built on the Three PCEIA Parts
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                A real sitting is Part A with Part C (life) or Part B (general): 100 questions in 2 hours, 50% to pass. Each mock test here has 20 Part A, 10 Part B and 20 Part C questions in every 50. Aii publishes no weights by chapter, so the split within each part is Tigertest&apos;s.
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
                src={getTigerAsset("mypce", 1)}
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
            How to Pass the PCE Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the principles first</h3>
              <p>
                Utmost good faith, insurable interest, indemnity, subrogation, contribution and proximate cause run through every part. Learn which apply to life insurance and which apply only to indemnity policies, and practise the contribution and average sums.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the Malaysian law by name</h3>
              <p>
                The Financial Services Act 2013 for conventional insurance, the Islamic Financial Services Act 2013 for takaful, the Contracts Act 1950, the Road Transport Act 1987, the PDPA 2010 and the AMLA. Know who does what: Bank Negara, PIDM, the Ombudsman for Financial Services, LIAM and PIAM.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn nomination and trusts as a table</h3>
              <p>
                Who can nominate, when a nomination creates a statutory trust, how it differs for a Muslim policy owner, who acts as trustee for a minor, and what revokes a nomination. Part C asks about these rules more than any other topic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer as a fair agent would</h3>
              <p>
                Needs analysis before any product, no twisting or rebating, the client answers the proposal form, premiums receipted and paid over promptly, and exclusions explained before the client signs. Aim for 70% or better on every mock test before you register.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PCE Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="mypce" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PCE Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across Parts A, B and C.</p>
          <ExamLandingCTA dashboardHref="/malaysia-pce/dashboard" />
        </div>
      </div>
    </div>
  );
}
