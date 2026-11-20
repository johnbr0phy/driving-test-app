import "@/lib/v2/banks/sfpd1";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Salesforce Platform Developer Practice Test 2026 (PDI)";
const metaDescription =
  "Free Salesforce Platform Developer (formerly PD1) practice tests: 201 original questions on Apex, SOQL, triggers, Lightning Web Components, security, testing and deployment, all explained.";
const description =
  "Free Salesforce Certified Platform Developer practice tests (formerly Platform Developer I) with 201 original questions weighted to the exam's four sections: Developer Fundamentals, Process Automation and Logic, User Interface, and Testing, Debugging, and Deployment. Apex and SOQL are shown as you would read them in code.";

const faqs = [
  {
    q: "How many questions are on the Salesforce Platform Developer exam?",
    a: "Guides that quote Salesforce's exam guide give 60 scored multiple-choice and multiple-select questions, plus up to five unscored questions, in 105 minutes. Check the current exam guide on Trailhead before you book.",
  },
  {
    q: "What is the passing score for Platform Developer I?",
    a: "Guides quoting the exam guide put the passing score at 68 percent; older guides that say 65 percent or 110 minutes are out of date. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Salesforce Platform Developer exam?",
    a: "Four sections, as Salesforce's Trailhead cert prep lists them: Developer Fundamentals 27 percent, Process Automation and Logic 28 percent, User Interface 25 percent, and Testing, Debugging, and Deployment 20 percent.",
  },
  {
    q: "Is Platform Developer the same as Platform Developer I?",
    a: "Yes. Salesforce now calls the credential Salesforce Certified Platform Developer; its Trailhead page and prep trailmix still use the Platform Developer I name, often shortened to PDI. Platform Developer II is a separate, more advanced exam.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 60 questions in 105 minutes with flagging and review, like the real exam, including choose-two questions. Apex, SOQL and LWC code is shown in monospace so you practise reading it.",
  },
  {
    q: "Is the Tigertest Platform Developer practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills (Testing, and Debugging and Deployment) and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Salesforce Platform Developer practice test, Platform Developer I practice exam, PD1 practice test, PDI exam questions, Salesforce developer certification practice, Plat-Dev-201, Apex practice questions, free Salesforce developer exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/salesforce-platform-developer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/salesforce-platform-developer-practice-test`,
    images: [{ url: shareImageUrl("sfpd1"), width: 1200, height: 630, alt: "Tigertest free Salesforce Platform Developer practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sfpd1")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Salesforce Platform Developer Practice Tests",
      description,
      url: `${siteUrl}/salesforce-platform-developer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sfpd1"),
      featureList: [
        "201 original Salesforce Platform Developer practice questions",
        "2 full 60-question practice tests in 105 minutes",
        "9 drills covering all four exam sections",
        "Apex, SOQL and LWC code to read, plus choose-two items",
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
        classFaqJsonLd("sfpd1"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Developer Fundamentals", weight: "27%" },
  { name: "Process Automation and Logic", weight: "28%" },
  { name: "User Interface", weight: "25%" },
  { name: "Testing, Debugging, and Deployment", weight: "20%" },
];

export default function SalesforcePlatformDeveloperLandingPage() {
  return (
    <div data-theme="sfpd1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Salesforce Platform Developer Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/salesforce-platform-developer/dashboard"
            shortName="Platform Developer"
            subtitle="201 Salesforce Platform Developer questions with Apex, SOQL and LWC code. Free to start, no account needed."
            shots={{ mobile: "/landing/sfpd1-mobile.png", desktop: "/landing/sfpd1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sfpd1" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Nine Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill per topic: platform and limits; data model; Apex basics; SOQL, SOSL and DML; triggers and async Apex; Lightning Web Components; security and Visualforce; testing; and debugging and deployment. Questions you miss come back until you have mastered them.
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
                Two 60-question tests in 105 minutes with flagging and review, like the real exam. Read Apex and SOQL, pick the right trigger context, governor limit or decorator, and answer choose-two items. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Exam&apos;s Four Sections
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Salesforce&apos;s Trailhead cert prep gives the weight of each section. Every practice test follows it, from multitenancy, governor limits and the data model through Apex, SOQL and triggers to Lightning Web Components, security, testing and deployment.
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
                src={getTigerAsset("sfpd1", 3)}
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
            How to Pass Platform Developer
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Write the code in a free org</h3>
              <p>
                Get a Developer Edition org or a scratch org and build the pieces yourself: a bulkified trigger with a handler, a Queueable job, a Lightning web component that wires an Apex method, and a test class with @TestSetup and Test.startTest. Reading code is half the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the limits and the context rules</h3>
              <p>
                Many questions turn on one rule: 100 SOQL queries and 150 DML statements per transaction, Trigger.new editable only in before triggers, wired Apex must be cacheable, callouts from triggers must be asynchronous. Learn why each rule exists, not just the number.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn when code is the wrong answer</h3>
              <p>
                The exam rewards choosing a formula field, roll-up summary, validation rule or Fast Field Updates flow when they do the job. Practise saying what each declarative tool cannot do, so you know when Apex is really needed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by topic. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Salesforce updates the exam with its releases, so read the current exam guide on Trailhead before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Platform Developer Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sfpd1" />
        </div>
      </div>

      <SampleQuestionsV2 examId="sfpd1" />

      <ExamRelatedTests examId="sfpd1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Platform Developer?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 201 questions across all four sections.</p>
          <ExamLandingCTA dashboardHref="/salesforce-platform-developer/dashboard" />
        </div>
      </div>
    </div>
  );
}
