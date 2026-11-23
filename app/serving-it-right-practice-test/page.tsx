import "@/lib/banks/servingitright";
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

const title = "Serving It Right Practice Test 2026 - Free BC Responsible Beverage Service Questions";
const metaDescription =
  "Free Serving It Right practice test for British Columbia: 200 original questions on the Liquor Control and Licensing Act, minors and two-piece ID, standard drinks, signs of intoxication, refusing service and duty of care. Five 35-question mock exams, every answer explained.";
const description =
  "Practice for Serving It Right, British Columbia's mandatory responsible beverage service exam for licensees, managers and servers: 200 original multiple-choice questions written from the Liquor Control and Licensing Act and Regulation and HealthLinkBC. Five real-length 35-question mock exams and four training sets covering BC liquor law and licences; alcohol and recognizing intoxication; refusing service and duty of care; and minors and checking ID.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "serving it right practice test, serving it right test, serving it right exam, serving it right bc, bc bartender certification, bc server certification, responsible beverage service bc, serving it right answers, serving it right questions 2026",
  alternates: {
    canonical: `${siteUrl}/serving-it-right-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/serving-it-right-practice-test`,
    images: [{ url: shareImageUrl("servingitright"), width: 1200, height: 630, alt: "Tigertest free Serving It Right practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("servingitright")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Who needs Serving It Right in British Columbia?",
    a: "BC's Liquor Control and Licensing Act requires the prescribed training before anyone sells or serves liquor in a service area or liquor store, and the Regulation bars a licensee from letting anyone sell, serve or supervise liquor service without it. Responsible Service BC says licensees, managers, servers and retail liquor store workers need Serving It Right. A server moving from another province with a current certificate is exempt, though an employer can still ask for the BC course.",
  },
  {
    q: "What score do I need to pass the Serving It Right exam?",
    a: "The exam is 35 randomly generated multiple-choice questions and the pass mark is 80%, or 28 correct. It is untimed, you can log out and come back, and each exam purchase includes three attempts. The course is offered in English only. The mock exams here use the same 35 questions and 80% line.",
  },
  {
    q: "How long is a Serving It Right certificate valid?",
    a: "The Liquor Control and Licensing Regulation makes the certificate expire five years after you complete it, and the expiry date is printed on it. Certificates issued before September 15, 2015 without an expiry date expired on September 15, 2020. You print the certificate from your online account; none are mailed.",
  },
  {
    q: "What does the Serving It Right course cover?",
    a: "Responsible Service BC lists signs of intoxication, legal liability, reducing over-consumption, reducing impaired driving, reducing the risk of violence, preventing sales to minors, duty of care on and off premises, and creating and enforcing responsible beverage service policies.",
  },
  {
    q: "Are these real Serving It Right exam questions?",
    a: "No. Every question is original, written by Tigertest from BC's Liquor Control and Licensing Act and Regulation, the Age of Majority Act, HealthLinkBC and the Criminal Code. It is practice, not affiliated with Responsible Service BC or the Liquor and Cannabis Regulation Branch, and it does not replace the Serving It Right course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Serving It Right Practice Test",
      description,
      url: `${siteUrl}/serving-it-right-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("servingitright"),
      featureList: [
        "200 Serving It Right practice questions",
        "5 mock exams of 35 questions",
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
  { name: "BC liquor law and the program", weight: "17%" },
  { name: "Retail, delivery and events", weight: "9%" },
  { name: "Minors and checking ID", weight: "17%" },
  { name: "Alcohol and the body", weight: "14%" },
  { name: "Recognizing intoxication", weight: "14%" },
  { name: "Preventing and refusing service", weight: "17%" },
  { name: "Duty of care and liability", weight: "11%" },
];

export default function ServingItRightLandingPage() {
  return (
    <div data-theme="servingitright" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Serving It Right Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/serving-it-right/dashboard"
            shortName="Serving It Right"
            subtitle="200 Serving It Right questions and five 35-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/servingitright-mobile.png", desktop: "/landing/servingitright-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="servingitright" />

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
                Four training sets: BC liquor law and licences; alcohol and recognizing intoxication; refusing service and duty of care; and minors and checking ID. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five mock exams of 35 questions, the length of the real exam, with the same 80% pass line. No question appears in more than one mock exam, and every explanation names the section or source behind the answer.
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
                Built on BC Liquor Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                BC&apos;s Liquor Control and Licensing Act sets the offences, such as supplying a minor or serving someone showing signs of intoxication, and its Regulation sets the rules on ID, hours, staff and sales. No topic weights are published for the Serving It Right exam, so each mock exam spreads its 35 questions as below.
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
                src={getTigerAsset("servingitright", 3)}
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
            How to Pass Your Serving It Right Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn BC&apos;s numbers</h3>
              <p>
                Minors are under 19, bars and restaurants serve from 9 a.m. to 4 a.m. at the outside, patrons are cleared within half an hour after service ends, and a person asked to leave cannot come back for 24 hours. These figures come straight from the Act and Regulation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what valid ID looks like</h3>
              <p>
                BC&apos;s prescribed ID is two pieces: a passport, photo driver&apos;s licence or government photo ID card with the date of birth, plus a second piece with the name and a signature or photo. Asking for and examining it is what protects you if a minor slips through.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Judge by signs, not drink counts</h3>
              <p>
                The law bars serving anyone showing signs of intoxication, so learn the signs: slurred speech, clumsiness, memory lapses, aggression, or going unusually quiet. Know the signs of alcohol poisoning that mean calling 9-1-1.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know where your duty of care ends</h3>
              <p>
                Your duty of care reaches guests on their way home: offer a safe ride, and call police with the car details if an intoxicated guest drives off. Aim for 80% or better on every mock exam here before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Serving It Right Frequently Asked Questions
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

      <ExamSampleQuestions examId="servingitright" />

      <ExamRelatedTests examId="servingitright" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Serving It Right Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on BC liquor law, minors, intoxication and duty of care.</p>
          <ExamLandingCTA dashboardHref="/serving-it-right/dashboard" />
        </div>
      </div>
    </div>
  );
}
