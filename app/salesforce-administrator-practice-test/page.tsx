import "@/lib/banks/sfadmin";
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

const title = "Salesforce Admin Practice Test 2026 - Free Platform Administrator Questions";
const metaDescription =
  "Free Salesforce Certified Platform Administrator practice: 200 original questions on the 2026 exam guide, Agentforce included, three 60-question tests with the 68% pass line, every answer explained.";
const description =
  "Free practice for the Salesforce Certified Platform Administrator exam (formerly Salesforce Certified Administrator): 200 original questions written to the eight sections of the exam guide refreshed for 2026. Three 60-question practice tests weighted like the real exam, with its 68 percent pass line, and six training sets covering configuration and security, Object Manager and Lightning App Builder, sales and service apps, productivity and Agentforce, data and analytics, and Flow automation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "salesforce admin practice test, salesforce platform administrator exam, salesforce certified administrator practice questions, adm 201 practice test, salesforce admin certification 2026, salesforce admin exam agentforce",
  alternates: {
    canonical: `${siteUrl}/salesforce-administrator-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/salesforce-administrator-practice-test`,
    images: [{ url: shareImageUrl("sfadmin"), width: 1200, height: 630, alt: "Tigertest free Salesforce Platform Administrator practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sfadmin")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Salesforce Certified Platform Administrator exam?",
    a: "It is Salesforce's core admin certification, called Salesforce Certified Administrator until it was renamed. It checks that you can configure an org: users and security, objects and Lightning pages, sales and service features, reports and dashboards, Flow automation and, since the refresh for 2026, the basics of setting up Agentforce agents. You register through Trailhead and take it at a test center or online with a proctor.",
  },
  {
    q: "How many questions are on the Platform Administrator exam and what is the passing score?",
    a: "Guides quoting the current exam guide give 60 scored multiple-choice and multiple-select questions, plus up to 5 unscored ones, in 105 minutes, with a 68% passing score for the English exam. Each practice test here has 60 questions in the exam guide's proportions and uses the same 68 percent line. Check the official exam guide on Trailhead before you book, as Salesforce updates it.",
  },
  {
    q: "What does the 2026 Platform Administrator exam cover?",
    a: "The refreshed exam guide has eight sections: Configuration and Setup 15%, Object Manager and Lightning App Builder 15%, Sales and Marketing Applications 10%, Service and Support Applications 10%, Productivity and Collaboration 10%, Data and Analytics Management 17%, Automation 15% and Agentforce 8%. Data and analytics is now the largest section, and Agentforce is new.",
  },
  {
    q: "How are choose-two questions handled here?",
    a: "The real exam has some questions that ask you to choose two or three answers. Every question here has one correct answer out of four, written to test the same features, so your practice score is a guide to readiness rather than a prediction of your exam result.",
  },
  {
    q: "Are these real Salesforce exam questions?",
    a: "No. Every question is original, written by Tigertest from the published exam sections and current product behaviour, including Flow, Dynamic Forms and Agentforce subagents. It is free practice, not affiliated with or endorsed by Salesforce, and it does not replace hands-on practice in a free Developer Edition org or the Trailhead modules.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Salesforce Platform Administrator Practice Test",
      description,
      url: `${siteUrl}/salesforce-administrator-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sfadmin"),
      featureList: [
        "200 Salesforce Platform Administrator practice questions",
        "3 practice tests of 60 questions weighted like the real exam, 68% to pass",
        "6 training sets by exam section",
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
  { name: "Configuration and Setup", weight: "15%" },
  { name: "Object Manager and Lightning App Builder", weight: "15%" },
  { name: "Sales and Marketing Applications", weight: "10%" },
  { name: "Service and Support Applications", weight: "10%" },
  { name: "Productivity and Collaboration", weight: "10%" },
  { name: "Data and Analytics Management", weight: "17%" },
  { name: "Automation", weight: "15%" },
  { name: "Agentforce", weight: "8%" },
];

export default function SalesforceAdminLandingPage() {
  return (
    <div data-theme="sfadmin" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Salesforce Admin Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/salesforce-admin/dashboard"
            shortName="Salesforce Admin"
            subtitle="200 original questions on the 2026 Platform Administrator exam guide: security and sharing, Object Manager, sales and service apps, reports and dashboards, Flow and Agentforce. Three 60-question tests with the 68% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sfadmin-mobile.png", desktop: "/landing/sfadmin-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sfadmin" />

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
                Six training sets: configuration and setup; Object Manager and Lightning App Builder; sales and service apps; productivity and Agentforce; data and analytics; and automation. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Three tests of 60 questions, the real exam&apos;s scored length, in the exam guide&apos;s proportions and needing 68% to pass. No question appears in more than one test, and every answer is explained. Choose-two items are written as single answer.
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
                Built on the 2026 Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Salesforce splits the exam across eight sections. Each practice test here keeps the same balance: 9 configuration, 9 Object Manager, 6 sales, 6 service, 6 productivity, 10 data and analytics, 9 automation and 5 Agentforce questions in every 60.
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
                src={getTigerAsset("sfadmin", 1)}
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
            How to Pass the Salesforce Admin Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn record access in layers</h3>
              <p>
                Write the stack out once: org-wide defaults set the floor, then the role hierarchy, sharing rules, teams and manual sharing open access up, while profiles and permission sets decide what users can do with objects and fields. Most security questions turn on which layer is doing the work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Pick the simplest tool that meets the need</h3>
              <p>
                Many questions offer several features that could work. A validation rule beats a flow for blocking bad data, a before-save flow beats an after-save one for updating the same record, and a permission set beats a new profile for one user&apos;s extra access.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Build it in a free org</h3>
              <p>
                Sign up for a free Developer Edition org and click through each topic: convert a lead, build a record-triggered flow with a scheduled path, make a dynamic dashboard, and set up a simple agent with one subagent. Seeing the screens makes the scenarios easy to picture.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Give data and Agentforce real time</h3>
              <p>
                Data and analytics is the largest section, so know the import tools, report formats, report types and dashboards well. Agentforce is smaller but new: know subagents, instructions, actions, Prompt Builder, the agent user&apos;s permissions and how to test. Aim for 85% or better on every practice test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Salesforce Platform Administrator Frequently Asked Questions
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

      <ExamSampleQuestions examId="sfadmin" />

      <ExamRelatedTests examId="sfadmin" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Platform Administrator Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all eight sections of the exam guide.</p>
          <ExamLandingCTA dashboardHref="/salesforce-admin/dashboard" />
        </div>
      </div>
    </div>
  );
}
