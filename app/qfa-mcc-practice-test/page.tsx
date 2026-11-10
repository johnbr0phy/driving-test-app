import "@/lib/banks/ieqfa";
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

const title = "QFA Regulation Practice Test 2026 - Free MCC Exam Questions (Ireland)";
const metaDescription =
  "Free practice for the QFA regulation exam and Ireland's Minimum Competency Code: 200 original questions on the Central Bank, Fitness and Probity, the Consumer Protection Code 2025, anti-money laundering, ethics and core products, every answer explained.";
const description =
  "Free practice for the regulation module of the Qualified Financial Adviser (QFA) qualification and other Minimum Competency Code exams in Ireland: 200 original questions on the Central Bank of Ireland and the regulatory framework, the Minimum Competency Code, Fitness and Probity and the Individual Accountability Framework, the Consumer Protection Code 2025, contract and consumer insurance law, the FSPO, compensation schemes and data protection, anti-money laundering, ethics, and core life, protection, pension, savings and credit products. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "qfa regulation practice test, qfa exam questions, minimum competency code exam, mcc exam ireland, qfa regulation module, consumer protection code 2025 questions, lia qfa practice, fitness and probity questions, central bank of ireland regulation exam, qfa practice test 2026",
  alternates: {
    canonical: `${siteUrl}/qfa-mcc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/qfa-mcc-practice-test`,
    images: [{ url: shareImageUrl("ieqfa"), width: 1200, height: 630, alt: "Tigertest free QFA regulation practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ieqfa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the QFA regulation exam?",
    a: "The Qualified Financial Adviser (QFA) designation is a professional qualification recognised by the Central Bank of Ireland under its Minimum Competency Code, which sets the minimum standards for anyone who advises consumers on, or arranges, retail financial products in Ireland. The LIA's QFA programme has six modules: Regulation, Life Assurance, Investment, Loans, Pensions and the Financial Advice capstone. The Regulation module covers the regulatory framework, consumer protection, contracts, complaints handling, ethics and whistleblowing.",
  },
  {
    q: "How many questions are on the QFA Regulation exam and how long is it?",
    a: "The LIA says most QFA modules, Regulation included, are a 2-hour online multiple-choice exam of 100 questions, held with remote invigilation, with sittings in January, May and September. The Financial Advice capstone is different: a 2.5-hour exam of three case study questions. The LIA's pages do not state a pass mark, so the 70% pass line here is Tigertest's readiness target, not an official figure.",
  },
  {
    q: "Which rules does this practice test cover?",
    a: "Irish rules as they stand in November 2026: the Minimum Competency Code 2017 as consolidated in June 2026, Fitness and Probity and the Individual Accountability Framework, the Consumer Protection Code 2025 that took effect on 24 March 2026, the Consumer Insurance Contracts Act 2019, the Criminal Justice (Money Laundering and Terrorist Financing) Act 2010 as amended, the GDPR, and the Financial Services and Pensions Ombudsman. A fifth of each test covers core product concepts: life cover and protection, general and health insurance, pensions, savings, investments and credit.",
  },
  {
    q: "How are these mock tests different from the real exam?",
    a: "Each mock test has 50 questions, half the length of the real 100-question exam, so you can finish one in about an hour at the real pace. The topic weights are Tigertest's, because the exam providers do not publish them. Five training sets let you practise one area at a time, and questions you miss come back until you have mastered them.",
  },
  {
    q: "Are these the real QFA exam questions?",
    a: "No. Every question is original, written by Tigertest from the Central Bank's Minimum Competency Code, the Consumer Protection Code 2025 and the other laws listed above. It is free practice, not affiliated with the LIA, the IOB, the Insurance Institute, the QFA Board or the Central Bank of Ireland, and it does not replace your course materials or an approved programme.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free QFA Regulation Practice Test",
      description,
      url: `${siteUrl}/qfa-mcc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ieqfa", "EUR"),
      featureList: [
        "200 QFA regulation and MCC practice questions",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
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
  { name: "Regulators & the Regulatory Framework", weight: "6 of 50" },
  { name: "Minimum Competency, Fitness & Probity", weight: "6 of 50" },
  { name: "Consumer Protection Code 2025", weight: "8 of 50" },
  { name: "Contract Law & Consumer Insurance Contracts", weight: "5 of 50" },
  { name: "Complaints, Compensation & Data Protection", weight: "5 of 50" },
  { name: "Anti-Money Laundering & Sanctions", weight: "4 of 50" },
  { name: "Ethics & Professional Conduct", weight: "6 of 50" },
  { name: "Life, Protection & General Insurance", weight: "5 of 50" },
  { name: "Pensions, Savings, Investments & Credit", weight: "5 of 50" },
];

export default function IeQfaLandingPage() {
  return (
    <div data-theme="ieqfa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free QFA Regulation Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/qfa-mcc/dashboard"
            shortName="QFA Regulation"
            subtitle="200 original questions for the QFA regulation exam and Ireland's Minimum Competency Code: the Central Bank, Fitness and Probity, the Consumer Protection Code 2025, complaints, anti-money laundering, ethics and core products. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ieqfa-mobile.png", desktop: "/landing/ieqfa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ieqfa" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Area at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: regulators and competence, the Consumer Protection Code and contract law, complaints, data and anti-money laundering, ethics, and core products. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions that mix every topic, half the length of the real 100-question exam. No question appears in more than one test, and every answer is explained with the rule behind it.
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
                Built on the Minimum Competency Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The topics follow the regulation and best practice competencies the Central Bank sets for every recognised qualification, with a share for core product concepts. The exam providers publish no topic weights, so the split below is Tigertest&apos;s.
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
                src={getTigerAsset("ieqfa", 1)}
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
            How to Pass the QFA Regulation Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the 2025 Code, not the 2012 one</h3>
              <p>
                The Consumer Protection Code 2025 took effect on 24 March 2026. It adds securing customers&apos; interests to the Standards for Business and new chapters on vulnerability, digitalisation and unregulated activities. Older notes may still describe the 2012 Code.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the time limits</h3>
              <p>
                Complaints: acknowledge in 5 working days, update every 20, aim to resolve in 40, decide within 5 of finishing. Errors: fixed within 6 months. Records: 6 years. CPD: 15 hours a year with one hour of ethics. New entrants: four years at most. Questions on numbers are the easiest marks to bank.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who does what</h3>
              <p>
                The Central Bank authorises, supervises and sanctions; the FSPO decides individual complaints; the CCPC informs consumers; the Pensions Authority oversees occupational schemes; the Data Protection Commission enforces the GDPR; suspicious transactions go to FIU Ireland and the Revenue Commissioners.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read ethics questions as the regulator would</h3>
              <p>
                The right answer secures the customer&apos;s interests: know the customer before recommending, disclose conflicts and commission, never put pay ahead of suitability, and correct mistakes openly. Aim for 80% or better on every mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          QFA Regulation Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="ieqfa" />

      <ExamRelatedTests examId="ieqfa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the QFA Regulation Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on Irish financial regulation, ethics and core products.</p>
          <ExamLandingCTA dashboardHref="/qfa-mcc/dashboard" />
        </div>
      </div>
    </div>
  );
}
