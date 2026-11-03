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

const title = "Series 63 Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free Series 63 practice: 200 original questions on NASAA's test specifications, three full-length 60-question mock tests with the real 43-of-60 pass line, every answer explained.";
const description =
  "Free practice for the NASAA Series 63 Uniform Securities Agent State Law Exam: 200 original questions written from NASAA's test specifications and the Uniform Securities Act. Three full-length 60-question mock tests weighted exactly like the real exam, with its 43-of-60 pass line, and five training sets covering investment advisers and their representatives, broker-dealers and agents, securities, issuers and remedies, communication with customers, and ethical practices.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "series 63 practice test, series 63 exam practice, series 63 practice questions, uniform securities agent state law exam, nasaa series 63, series 63 mock exam, uniform securities act questions, series 63 2026",
  alternates: {
    canonical: `${siteUrl}/series-63-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/series-63-practice-test`,
    images: [{ url: shareImageUrl("series63"), width: 1200, height: 630, alt: "Tigertest free Series 63 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("series63")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Series 63 exam?",
    a: "The Series 63 is the Uniform Securities Agent State Law Examination, written by NASAA (the North American Securities Administrators Association) and administered by FINRA. Most states require it before an agent of a broker-dealer can register to sell securities there. It tests state securities law under the Uniform Securities Act, plus the federal and FINRA rules on agents, ethics and customer communications that NASAA lists in its outline.",
  },
  {
    q: "How many questions are on the Series 63 and what is the passing score?",
    a: "The exam has 65 multiple-choice questions, of which 60 are scored and 5 are unscored pretest questions, and you have 75 minutes. You pass by answering at least 43 of the 60 scored questions correctly, about 72 percent. Each mock test here has 60 questions in the same proportions as the real exam and uses the same 43-of-60 pass line.",
  },
  {
    q: "What does the Series 63 cover?",
    a: "NASAA's test specifications, effective June 12, 2023, split the 60 scored questions into eight subjects: ethical practices and obligations (15 questions), communication with customers and prospects (12), regulation of broker-dealer agents (8), regulation of broker-dealers (7), remedies and administrative provisions (7), regulation of securities and issuers (5), investment advisers (3) and investment adviser representatives (3). It tests the Uniform Securities Act of 1956 as amended by NASAA, not the 2002 Act.",
  },
  {
    q: "Do I need the Series 7 or SIE before the Series 63?",
    a: "The Series 63 has no prerequisite or corequisite, so you can take it before or after your other exams. Most agents take it alongside the SIE and the Series 7 or Series 6, because a state usually needs both a FINRA qualification and the Series 63 before it registers an agent. Check your state's own registration requirements.",
  },
  {
    q: "Are these the real Series 63 questions?",
    a: "No. NASAA's questions are confidential and copyrighted. Every question here is original, written by Tigertest from NASAA's published test specifications and the laws and rules it lists, such as the Uniform Securities Act, NASAA's statements of policy, Regulation Best Interest and FINRA's rules. Tigertest is not affiliated with NASAA or FINRA, and this free practice does not replace your firm's training or a full prep course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Series 63 Practice Test",
      description,
      url: `${siteUrl}/series-63-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Series 63 practice questions",
        "3 full-length mock tests of 60 questions weighted like the real exam, 43 to pass",
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
  { name: "Ethical practices and obligations", weight: "25%" },
  { name: "Communication with customers and prospects", weight: "20%" },
  { name: "Regulation of broker-dealer agents", weight: "13%" },
  { name: "Regulation of broker-dealers", weight: "12%" },
  { name: "Remedies and administrative provisions", weight: "11%" },
  { name: "Regulation of securities and issuers", weight: "9%" },
  { name: "Investment advisers", weight: "5%" },
  { name: "Investment adviser representatives", weight: "5%" },
];

export default function Series63LandingPage() {
  return (
    <div data-theme="series63" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Series 63 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/series-63/dashboard"
            shortName="Series 63"
            subtitle="200 original questions on NASAA's outline: the Uniform Securities Act, agent and broker-dealer registration, ethics, customer communications, remedies and the Administrator's powers. Three full-length 60-question mock tests with the real 43-of-60 pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/series63-mobile.png", desktop: "/landing/series63-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="series63" />

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
                Five training sets: investment advisers and IARs, broker-dealers and agents, securities, issuers and remedies, communication with customers, and ethical practices. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Three mock tests of 60 questions, the length of the real scored exam, in NASAA&apos;s exact proportions and each needing 43 correct to pass. No question appears in more than one test, and every answer is explained.
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
                Built on NASAA&apos;s Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NASAA splits the 60 scored questions across eight subjects. Each mock test here uses exactly the same counts, so ethics and customer communications together make up 27 of every 60 questions.
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
                src={getTigerAsset("series63", 1)}
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
            How to Pass the Series 63
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the definitions first</h3>
              <p>
                Many questions turn on who is a broker-dealer, an agent, an investment adviser or an IAR, and who is excluded. Learn each definition with its exclusions (issuers, banks, clerical staff, out-of-state firms dealing only with institutions) before anything else.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Separate exempt securities from exempt transactions</h3>
              <p>
                An exempt security, such as a municipal bond, never needs registration. An exempt transaction, such as an unsolicited trade or a sale to an insurance company, excuses only that sale. Neither one excuses the agent from registering, and the antifraud rules apply to both.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know what the Administrator can and cannot do</h3>
              <p>
                The Administrator can deny, suspend, revoke or cancel registrations, issue cease and desist orders and subpoenas, and investigate inside or outside the state, but needs a court for an injunction. Learn the grounds for each order and the time limits that go with them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read ethics questions as the regulator</h3>
              <p>
                Ethics and communications make up almost half the exam. Ask whether the agent put the customer first, had written authority, disclosed what mattered and kept the business on the firm&apos;s books. Aim for 80% or better on every mock test before you sit the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Series 63 Frequently Asked Questions
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

      <ExamRelatedTests examId="series63" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Series 63?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every subject of NASAA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/series-63/dashboard" />
        </div>
      </div>
    </div>
  );
}
