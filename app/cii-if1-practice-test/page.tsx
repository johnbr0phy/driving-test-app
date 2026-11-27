import "@/lib/banks/ukif1";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free CII IF1 Practice Test 2026";
const metaDescription =
  "Revise for CII IF1 with 200 original insurance questions. Practise insurance law, risk, claims, regulation and consumer protection in four 50-question tests.";
const description =
  "Revise for CII IF1 with 200 original insurance questions. Practise insurance law, risk, claims, regulation and consumer protection in four 50-question tests.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CII IF1 practice test, IF1 mock exam, CII insurance legal and regulatory, Cert CII revision, certificate in insurance questions",
  alternates: {
    canonical: `${siteUrl}/cii-if1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cii-if1-practice-test`,
    images: [{ url: shareImageUrl("ukif1"), width: 1200, height: 630, alt: "Tigertest CII IF1 practice questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukif1")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest CII IF1 Practice Test",
      description,
      url: `${siteUrl}/cii-if1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukif1", "GBP"),
      featureList: ["200 original IF1 questions", "Four 50-question practice tests", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does IF1 stand for?",
          acceptedAnswer: { "@type": "Answer", text: "IF1 is the unit code for Insurance, Legal and Regulatory in the CII Certificate in Insurance. Its syllabus covers risk, the UK insurance market, contracts and claims, regulation and professional ethics." },
        },
        {
          "@type": "Question",
          name: "How long is the IF1 exam?",
          acceptedAnswer: { "@type": "Answer", text: "The CII allows two hours for 100 multiple-choice questions. Each Tigertest practice test has 50 questions, with a similar mix of topics." },
        },
        {
          "@type": "Question",
          name: "What is the IF1 pass mark?",
          acceptedAnswer: { "@type": "Answer", text: "The CII gives a standard pass mark of 70%. You reach that percentage with 35 correct answers on a 50-question practice test." },
        },
        {
          "@type": "Question",
          name: "Which IF1 syllabus do these questions follow?",
          acceptedAnswer: { "@type": "Answer", text: "The practice bank follows the syllabus for exams taken from 1 January to 31 December 2026. The CII publishes a separate edition for 2027." },
        },
        {
          "@type": "Question",
          name: "How can I review what I missed?",
          acceptedAnswer: { "@type": "Answer", text: "Open your results to read the explanation for each answer. In training, missed questions return for another attempt." },
        },
        classFaqJsonLd("ukif1"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Risk and Risk Management", weight: "10%" },
  { name: "Features of Insurance", weight: "8%" },
  { name: "Insurance Market", weight: "14%" },
  { name: "Contract and Agency", weight: "10%" },
  { name: "Insurable Interest", weight: "6%" },
  { name: "Good Faith and Disclosure", weight: "10%" },
  { name: "Proximate Cause", weight: "2%" },
  { name: "Indemnity", weight: "6%" },
  { name: "Contribution and Subrogation", weight: "4%" },
  { name: "Regulation of Insurance Business", weight: "16%" },
  { name: "Consumer Protection", weight: "6%" },
  { name: "Handling Complaints", weight: "4%" },
  { name: "Professional Ethics", weight: "4%" },
];

export default function Ukif1LandingPage() {
  return (
    <div data-theme="ukif1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CII IF1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cii-if1/dashboard"
            shortName="CII IF1"
            subtitle="Practise insurance principles, contract law and consumer protection with 200 IF1 questions. Free to start, no account needed."
            shots={{ mobile: "/landing/ukif1-mobile.png", desktop: "/landing/ukif1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukif1" />

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
                Start with risk and insurance, then work through contracts, claims and the regulation of insurance business. Each answer has an explanation.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Answer 50 questions drawn from across the syllabus. A score of 35 correct meets the 70% practice target.
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
                What Each IF1 Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are the topic weights on a 50-question practice test. They follow the CII 2026 syllabus, with the two risk outcomes grouped and the weights rounded to whole questions.
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
                src={getTigerAsset("ukif1", 1)}
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
            How to Revise for CII IF1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Name the risk</h3>
              <p>
                For a loss scenario, identify the event that causes the damage and any circumstances that make a loss more likely or more severe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Identify the parties</h3>
              <p>
                Before answering an agency question, name the agent, the principal and the act in question. In a claims question, identify the insured and any third party.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Trace the loss</h3>
              <p>
                Write down how the events led to the damage. When the question turns to payment, check which interests, policies and parties it names.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Follow a complaint</h3>
              <p>
                Keep track of who is handling the complaint and what the customer wants. Read the explanation to see where responsibility lies at that stage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CII IF1 Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does IF1 stand for?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              IF1 is the unit code for Insurance, Legal and Regulatory in the CII Certificate in Insurance. Its syllabus covers risk, the UK insurance market, contracts and claims, regulation and professional ethics.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the IF1 exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The CII allows two hours for 100 multiple-choice questions. Each Tigertest practice test has 50 questions, with a similar mix of topics.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the IF1 pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The CII gives a standard pass mark of 70%. You reach that percentage with 35 correct answers on a 50-question practice test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which IF1 syllabus do these questions follow?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The practice bank follows the syllabus for exams taken from 1 January to 31 December 2026. The CII publishes a separate edition for 2027.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How can I review what I missed?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Open your results to read the explanation for each answer. In training, missed questions return for another attempt.
            </p>
          </div>
          <ExamClassFaq examId="ukif1" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukif1" />

      <ExamRelatedTests examId="ukif1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First IF1 Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Risk and Insurance or open a 50-question practice test.</p>
          <ExamLandingCTA dashboardHref="/cii-if1/dashboard" />
        </div>
      </div>
    </div>
  );
}
