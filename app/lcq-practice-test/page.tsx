import "@/lib/banks/nzlcq";
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

const title = "LCQ Practice Test 2026 - Free Licence Controller Qualification Questions (NZ)";
const metaDescription =
  "Free LCQ practice for New Zealand duty managers: 200 original questions on the Sale and Supply of Alcohol Act 2012 and host responsibility (unit standards 4646 and 16705), four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Licence Controller Qualification (LCQ), the New Zealand qualification a duty manager needs before applying for a manager's certificate: 200 original questions on the Sale and Supply of Alcohol Act 2012 (licensing bodies, licence types and conditions, manager's certificates, minors, ID and offences) and on host responsibility (alcohol and the body, assessing intoxication, intervention and refusal, and a safe drinking environment). Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "lcq practice test, lcq test answers practice, licence controller qualification, lcq nz, duty manager test nz, unit standard 4646, unit standard 16705, sale and supply of alcohol act quiz, manager's certificate nz, host responsibility nz, lcq practice test 2026",
  alternates: {
    canonical: `${siteUrl}/lcq-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/lcq-practice-test`,
    images: [{ url: shareImageUrl("nzlcq"), width: 1200, height: 630, alt: "Tigertest free LCQ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzlcq")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Licence Controller Qualification (LCQ)?",
    a: "The LCQ is the New Zealand qualification for people who manage the sale of alcohol on licensed premises. It is awarded on two NZQA Level 4 unit standards: 4646, knowledge of the Sale and Supply of Alcohol Act 2012 and its implications for licensed premises (2 credits), and 16705, knowledge of host responsibility requirements as a duty manager (3 credits). You need it to apply for or renew a manager's certificate.",
  },
  {
    q: "How is the LCQ assessed, and what score do I need?",
    a: "Each unit standard is graded Achieved or Not Achieved against its performance criteria, and the approved course provider (ServiceIQ online, polytechnics and hospitality associations) sets and marks its own assessment. No national question count or pass mark is published. The mock tests here are Tigertest's own: 50 questions with an 80% readiness line, so aim to clear it on every test before you are assessed.",
  },
  {
    q: "What happens after I get the LCQ?",
    a: "The LCQ is one step towards a manager's certificate. You apply to your district licensing committee, which sends your application to the police and the licensing inspector to report on your suitability, and the inspector usually interviews you. Councils say you must be at least 20 and have recent experience in licensed premises. A first certificate runs for one year and renewals for three years.",
  },
  {
    q: "What do these practice questions cover?",
    a: "Each mock test has 28 questions on the Act (unit standard 4646: the object of the Act, ARLA and district licensing committees, local alcohol policies, licence types, trading hours and conditions, manager's certificates, minors, evidence of age, offences and enforcement) and 22 on host responsibility (unit standard 16705: alcohol and the body, assessing intoxication, intervention and refusal, host responsibility policies, overcrowding, evacuation and trespass).",
  },
  {
    q: "Are these the real LCQ assessment questions?",
    a: "No. Every question is original, written by Tigertest from the two unit standards, the Sale and Supply of Alcohol Act 2012, Ministry of Justice guidance and the host responsibility resources on alcohol.org.nz, as in force in November 2026. It is free practice, not affiliated with NZQA, ServiceIQ, any course provider or the Alcohol Regulatory and Licensing Authority, and it does not replace an approved LCQ course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LCQ Practice Test",
      description,
      url: `${siteUrl}/lcq-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzlcq", "NZD"),
      featureList: [
        "200 LCQ practice questions",
        "4 mock tests of 50 questions across both unit standards",
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
  { name: "The Act, licensing bodies and LAPs", weight: "6 per test" },
  { name: "Licence types, hours and conditions", weight: "8 per test" },
  { name: "Manager's certificates and duty managers", weight: "6 per test" },
  { name: "Minors, ID, offences and enforcement", weight: "8 per test" },
  { name: "Alcohol and the body", weight: "7 per test" },
  { name: "Intoxication and intervention", weight: "8 per test" },
  { name: "Safe drinking environment", weight: "7 per test" },
];

export default function LcqLandingPage() {
  return (
    <div data-theme="nzlcq" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LCQ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/lcq/dashboard"
            shortName="LCQ"
            subtitle="200 original questions for New Zealand's Licence Controller Qualification: the Sale and Supply of Alcohol Act 2012, licences and manager's certificates, minors and ID, assessing intoxication, refusing service and a safe drinking environment. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nzlcq-mobile.png", desktop: "/landing/nzlcq-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzlcq" />

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
                Four training sets: the Act and licences, managers, minors and offences, alcohol and intoxication, and a safe drinking environment. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions that cover both unit standards, with an 80% readiness line set by Tigertest. No question appears in more than one test, and every answer is explained with the rule behind it.
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
                Built on Unit Standards 4646 and 16705
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The LCQ has no published question count or pass mark: each unit standard is graded Achieved or Not Achieved by the course provider. Every mock test here follows the unit standards&apos; performance criteria, with 28 questions on the Act and 22 on host responsibility.
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
                src={getTigerAsset("nzlcq", 1)}
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
            How to Pass the LCQ
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn who does what</h3>
              <p>
                District licensing committees decide applications, ARLA hears appeals and enforcement cases, and the police, the council&apos;s licensing inspector and the Medical Officer of Health report on applications. Many questions turn on knowing which body acts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the numbers that matter</h3>
              <p>
                Purchase age 18, manager&apos;s certificate from 20, default hours of 8am to 4am for on-licences and 7am to 11pm for off-licences, 48 hours to give notice of a new manager, two working days for a temporary manager to apply, and 10 grams of alcohol in a standard drink.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Use the legal test for intoxication</h3>
              <p>
                A person is intoxicated when two or more of appearance, behaviour, coordination and speech are affected. Step in at the influenced stage with slower service, food, water and lower-alcohol drinks, and refuse calmly once the signs are there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Think like the duty manager</h3>
              <p>
                The right answer keeps people safe and the premises lawful: check ID, never serve or keep an intoxicated person, back staff who refuse, record incidents, keep exits clear and help patrons get home. Finish each training set, then aim for 80% on every mock test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LCQ Frequently Asked Questions
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

      <ExamSampleQuestions examId="nzlcq" />

      <ExamRelatedTests examId="nzlcq" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your LCQ?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across both LCQ unit standards.</p>
          <ExamLandingCTA dashboardHref="/lcq/dashboard" />
        </div>
      </div>
    </div>
  );
}
