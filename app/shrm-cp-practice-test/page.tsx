import "@/lib/banks/shrmcp";
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

const title = "SHRM-CP Practice Test 2026 - Free SHRM Certified Professional Exam Questions";
const metaDescription =
  "Free SHRM-CP practice: 200 original questions on the 2026 SHRM BASK, situational judgment scenarios and HR knowledge items, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the SHRM Certified Professional (SHRM-CP) exam: 200 original questions written from the 2026 SHRM Body of Applied Skills and Knowledge (BASK) and the SHRM Certification Handbook. Four 50-question mock tests weighted like the real exam across the Leadership, Interpersonal and Business behavioral competency clusters and the People, Organization and Workplace HR knowledge domains, with situational judgment scenarios, six training sets and US federal employment law as in force in 2026.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "shrm-cp practice test, shrm cp exam questions, shrm certification practice exam, shrm certified professional practice test, shrm-cp situational judgment questions, shrm bask practice, shrm-cp exam prep 2026, free shrm-cp practice questions",
  alternates: {
    canonical: `${siteUrl}/shrm-cp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/shrm-cp-practice-test`,
    images: [{ url: shareImageUrl("shrmcp"), width: 1200, height: 630, alt: "Tigertest free SHRM-CP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("shrmcp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SHRM-CP exam?",
    a: "The SHRM Certified Professional (SHRM-CP) is SHRM's certification for people who do HR work at the operational level: implementing policies, supporting day-to-day HR functions and serving as an HR point of contact. SHRM does not require an HR title, a degree or prior HR experience to apply, though it recommends a basic working knowledge of HR. The exam is taken on a computer at a Prometric test center during SHRM's testing windows.",
  },
  {
    q: "How many questions are on the SHRM-CP and how is it scored?",
    a: "The SHRM-CP has 134 multiple-choice questions: 80 knowledge items and 54 situational judgment items, of which 24 are unscored field-test items mixed in with the rest. It runs in two sections of up to 110 minutes each. SHRM reports a scaled score from 120 to 200, and every candidate who passes receives 200; it does not publish a percentage. Each mock test here has 50 questions, and 70% is Tigertest's readiness line, not a SHRM figure.",
  },
  {
    q: "What does the SHRM-CP exam cover?",
    a: "The exam follows the SHRM Body of Applied Skills and Knowledge (BASK). About half the items cover the behavioral competency clusters: Leadership (19%), Business (17.5%) and Interpersonal (13.5%). The other half cover the HR knowledge domains: People (19%), Organization (18%) and Workplace (13%). By item type, situational judgment is 40%, foundational knowledge of the competencies 10% and HR-specific knowledge 50%.",
  },
  {
    q: "What are situational judgment items?",
    a: "Situational judgment items describe a realistic work scenario and ask for the best of several possible actions. More than one option may work in real life, but only the most effective course of action earns credit. The Leadership, Interpersonal and Business sets here use short original scenarios of this kind alongside knowledge items on the BASK's key concepts.",
  },
  {
    q: "Are these the real SHRM-CP exam questions?",
    a: "No. Every question is original, written by Tigertest from the published SHRM BASK, the SHRM Certification Handbook and current US federal employment law. None comes from SHRM's sample questions or any prep course. It is practice that is free to start and is not affiliated with SHRM.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SHRM-CP Practice Test",
      description,
      url: `${siteUrl}/shrm-cp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("shrmcp"),
      featureList: [
        "200 SHRM-CP practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "6 training sets by competency cluster and knowledge domain",
        "Situational judgment scenarios",
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
        classFaqJsonLd("shrmcp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Leadership (behavioral competencies)", weight: "19%" },
  { name: "Business (behavioral competencies)", weight: "17.5%" },
  { name: "Interpersonal (behavioral competencies)", weight: "13.5%" },
  { name: "People (HR knowledge)", weight: "19%" },
  { name: "Organization (HR knowledge)", weight: "18%" },
  { name: "Workplace (HR knowledge)", weight: "13%" },
];

export default function ShrmCpLandingPage() {
  return (
    <div data-theme="shrmcp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SHRM-CP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/shrm-cp/dashboard"
            shortName="SHRM-CP"
            subtitle="200 SHRM-CP questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/shrmcp-mobile.png", desktop: "/landing/shrmcp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="shrmcp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Cluster and Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets: leadership, ethics and inclusion; relationships and communication; business, consulting and analytics; people; organization; and workplace. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions in the real exam&apos;s proportions, half behavioral competencies and half HR knowledge, scored against a 70% readiness line. No question appears in more than one test, and every scenario explains why the best action beats the others.
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
                Built on the SHRM BASK
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                SHRM splits the exam about evenly between three behavioral competency clusters and three HR knowledge domains. Each mock test here keeps the same balance: 9 leadership, 9 business, 7 interpersonal, 10 people, 9 organization and 6 workplace questions in every 50.
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
                src={getTigerAsset("shrmcp", 3)}
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
            How to Prepare for the SHRM-CP Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the SHRM BASK first</h3>
              <p>
                The BASK lists every competency, sub-competency and key concept the exam draws on, from leadership and motivation theories to the federal employment laws. Use its proficiency indicators for all HR professionals as your checklist.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice choosing the best action, not just a good one</h3>
              <p>
                Situational judgment items often offer several workable steps. Ask which one fits the timing, stays within your role, follows policy and law, and solves the actual problem rather than a symptom.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the law&apos;s coverage numbers</h3>
              <p>
                Workplace questions turn on who a law covers and what it requires: 15 employees for Title VII and the ADA, 20 for the ADEA, 50 for the FMLA, an I-9 for every new hire and 60 days of WARN notice for covered layoffs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Work the HR metrics by hand</h3>
              <p>
                Expect ROI, compa-ratio, correlation, the median against the mean and the four-fifths rule. Write each formula once and work every calculation in the training sets until it is automatic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SHRM-CP Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="shrmcp" />
        </div>
      </div>

      <ExamSampleQuestions examId="shrmcp" />

      <ExamRelatedTests examId="shrmcp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your SHRM-CP Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every SHRM-CP cluster and domain.</p>
          <ExamLandingCTA dashboardHref="/shrm-cp/dashboard" />
        </div>
      </div>
    </div>
  );
}
