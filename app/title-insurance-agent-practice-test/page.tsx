import "@/lib/banks/titleagent";
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

const title = "Free Title Insurance Agent Practice Test 2026 - Title Agent Exam Questions";
const metaDescription =
  "Free title insurance agent practice test: 200 original questions on title policies, search, liens, closing and RESPA, four 50-question practice tests, every answer explained.";
const description =
  "Practice, free to start, for the title insurance agent license exam that state insurance departments give: 200 original questions on the general knowledge state title agent outlines share. Four 50-question practice tests and four training sets covering title insurance principles and real property, legal descriptions, search and clearing title, the 2021 ALTA commitment, owner's and loan policies, and escrow, closing and federal rules such as RESPA and TRID.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "title insurance agent practice test, title agent exam, title insurance license exam, title producer exam practice, title agent exam questions, title insurance exam prep, alta policy practice questions, title escrow exam",
  alternates: {
    canonical: `${siteUrl}/title-insurance-agent-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/title-insurance-agent-practice-test`,
    images: [{ url: shareImageUrl("titleagent"), width: 1200, height: 630, alt: "Tigertest free title insurance agent practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("titleagent")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "What is the title insurance agent exam?",
    a: "It is the licensing exam a state insurance department requires before you can sell, issue or countersign title insurance policies as an agent (some states say title producer). There is no national exam: each state sets its own, usually through a testing company such as PSI, Pearson VUE or Prometric, and most have a general title insurance part and a part on that state's laws. Licensing steps, fees and appointment rules vary by state.",
  },
  {
    q: "How many questions are on the title agent exam?",
    a: "It depends on the state. Alabama's exam has 150 questions in 180 minutes and needs 105 correct. Ohio's PSI Series 11-37 exam has 100 questions in 2 hours. Pennsylvania's PSI Series 16-10 exam has 60 scored items in 80 minutes, plus a few unscored experimental items. Check your own state's candidate handbook.",
  },
  {
    q: "What topics does the title agent exam cover?",
    a: "The state outlines share the same core: real property and how title passes, legal descriptions and recording, the title commitment, owner's and loan policies and their exclusions and endorsements, title search, liens and clearing title, escrow and settlement, and federal rules such as RESPA, TRID and Gramm-Leach-Bliley. Each state then adds its own licensing, rate and trust account laws, which this practice does not cover.",
  },
  {
    q: "What score do you need to pass?",
    a: "Each state sets its own passing score. Alabama requires 105 of 150 correct (70%), and Ohio's candidate handbook gives a minimum passing score of 70%. The 70 percent line on these practice tests matches those, but check your state's handbook for the official rule.",
  },
  {
    q: "Are these the real title agent exam questions?",
    a: "No. Every question is original, written by Tigertest from the Alabama, Ohio and Pennsylvania title agent outlines, the 2021 ALTA policy forms and federal law, so it tests the same knowledge without copying any exam. Tigertest is not affiliated with any state insurance department, testing company or the American Land Title Association.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Title Insurance Agent Practice Test",
      description,
      url: `${siteUrl}/title-insurance-agent-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("titleagent"),
      featureList: [
        "200 title insurance agent practice questions",
        "4 practice tests of 50 questions across every topic",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const topics = [
  { name: "Commitments, Policies & Endorsements", weight: "20%" },
  { name: "Title Search, Liens & Clearing Title", weight: "18%" },
  { name: "Real Property & Transfer of Title", weight: "16%" },
  { name: "Escrow, Settlement & Closing", weight: "14%" },
  { name: "Insurance & Agency Principles", weight: "12%" },
  { name: "Legal Descriptions & Recording", weight: "10%" },
  { name: "Federal Rules & Ethics", weight: "10%" },
];

export default function TitleAgentLandingPage() {
  return (
    <div data-theme="titleagent" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Title Insurance Agent Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/title-insurance-agent/dashboard"
            shortName="Title Agent"
            subtitle="200 original questions on the general part of state title agent exams: title policies, search and liens, real property, escrow and closing, RESPA and TRID. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/titleagent-mobile.png", desktop: "/landing/titleagent-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="titleagent" />

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
                Four training sets: insurance basics and real property; search, surveys and clearing title; commitments and policy forms; and escrow, closing and federal rules. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions that mix every topic, the way state exams do. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on State Title Agent Outlines
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                There is no national title agent exam, so these tests follow the general topics the Alabama, Ohio and Pennsylvania outlines share, with the 2021 ALTA commitment, owner&apos;s and loan policies at the center. Each 50-question test has 10 questions on policy forms, 9 on search and clearing title, 8 on real property and 7 on escrow and closing. Your state&apos;s own licensing and trust account laws are not included, so study those from your state&apos;s handbook.
              </p>
              <div className="space-y-3">
                {topics.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("titleagent", 3)}
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
            How to Pass the Title Agent Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the policy forms</h3>
              <p>
                The owner&apos;s and loan policies are the heart of the exam. Learn the covered risks, the printed exclusions, what goes in Schedule A and Schedule B, and the conditions on claims, payment and subrogation. Know how the commitment&apos;s requirements differ from its exceptions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know how title passes and fails</h3>
              <p>
                Deeds, estates, co-ownership, probate, foreclosure and recording are where defects come from. Learn which liens attach by law, how each is cleared, and why a search runs the grantee index back and the grantor index forward.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the federal closing rules</h3>
              <p>
                RESPA Section 8 kickbacks, Section 9, affiliated business disclosures, TRID timing and how title premiums show on the Loan Estimate come up on every outline. So do escrow duties, good funds and wire fraud.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Add your state&apos;s law, then retest</h3>
              <p>
                Tigertest covers the general part. Study your state&apos;s title insurance act and rules from its handbook, aim for 70% or better on every practice test here, and drill the questions you missed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Title Agent Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="titleagent" />

      <ExamRelatedTests examId="titleagent" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Title Agent Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every general topic of the title agent exam.</p>
          <ExamLandingCTA dashboardHref="/title-insurance-agent/dashboard" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Tigertest is not affiliated with any state insurance department, PSI, Pearson VUE, Prometric or the American Land Title Association. ALTA is a trademark of its owner.
          </p>
        </div>
      </div>
    </div>
  );
}
