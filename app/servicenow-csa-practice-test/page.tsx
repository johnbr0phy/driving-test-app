import "@/lib/v2/banks/servicenowcsa";
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

const title = "Free ServiceNow CSA Practice Test";
const metaDescription =
  "200 original ServiceNow CSA questions. Six domain drills and two 60-question tests, with single-answer and multiple-select practice. Free to start.";
const description =
  "Free ServiceNow Certified System Administrator (CSA) practice with 200 original questions on the six domains of the January 2026 blueprint: platform navigation, instance configuration, collaboration, self service and automation, database and platform security, and data migration and integration. Six domain drills and two 60-question practice tests in 90 minutes.";

const faqs = [
  { q: "What is the current CSA exam format?", a: "The ServiceNow blueprint updated January 2026 specifies 60 questions in 90 minutes. It includes single-answer questions and multiple-select questions that state how many answers to choose. Multiple-select questions receive no partial credit." },
  { q: "What does this CSA practice cover?", a: "Selected concepts across all six domains: platform navigation, instance configuration, collaboration, self service and automation, database and platform security, and migration and integration. Each test has 4, 6, 12, 12, 18 and 8 questions respectively, rounding the official 7/10/20/20/30/13% weights. The 80 drill questions are separate from both tests. This is not exhaustive feature coverage or a hands-on assessment." },
  { q: "What percentage is needed to pass the real CSA?", a: "ServiceNow does not publish its exam cut score and warns against assuming it is always 70%. Tigertest reports percentage correct and uses an editorial 80% study goal. That target does not represent or predict the official passing standard." },
  { q: "Which ServiceNow release does this follow?", a: "The owner blueprint is dated January 2026 and does not specify an exam release codename. We checked primary product documentation in November 2026; most current pages resolve to Brazil. Product-document release labels are not a claim about the exam release. Follow ServiceNow University for your scheduled exam requirements." },
  { q: "How should I prepare alongside these questions?", a: "Use the official blueprint, authorized learning and hands-on platform administration. The questions focus on interpreting requirements, choosing suitable features and checking results. They do not simulate administering a live instance or establish exam readiness." },
  { q: "Is this CSA practice free?", a: "It is free to start with no account required. Practice Test 1 and the first five drills are free. The Data Migration and Integration drill and Practice Test 2 require Tigertest Premium, one payment with no subscription. ServiceNow does not endorse or sponsor Tigertest." },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ServiceNow CSA practice test, Certified System Administrator, ServiceNow administrator certification",
  alternates: {
    canonical: `${siteUrl}/servicenow-csa-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/servicenow-csa-practice-test`,
    images: [{ url: shareImageUrl("servicenowcsa"), width: 1200, height: 630, alt: title }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("servicenowcsa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - CSA Practice",
      description,
      url: `${siteUrl}/servicenow-csa-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("servicenowcsa"),
      featureList: [
        "200 original administration questions",
        "Six domain drills",
        "Two 60-question tests",
        "Single-answer and multiple-select questions",
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
        classFaqJsonLd("servicenowcsa"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Platform Overview and Navigation", weight: "7%", detail: "Navigation, views, preferences and instance context." },
  { name: "Instance Configuration", weight: "10%", detail: "Applications, plugins and configuration decisions." },
  { name: "Configuring Applications for Collaboration", weight: "20%", detail: "Lists, forms, filters, visualizations and notifications." },
  { name: "Self Service and Automation", weight: "20%", detail: "Knowledge, catalog, Workflow Studio and Virtual Agent." },
  { name: "Database Management and Platform Security", weight: "30%", detail: "Tables, references, imports, access controls and CMDB relationships." },
  { name: "Data Migration and Integration", weight: "13%", detail: "Client and server behavior, configuration migration and validation." },
];

export default function CSALandingPage() {
  return (
    <div data-theme="servicenowcsa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ServiceNow CSA Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/servicenow-csa/dashboard"
            shortName="CSA"
            subtitle="200 original administration questions, six drills and two practice tests. Selected conceptual and applied practice; hands-on administration is not assessed. Free to start, no account needed."
            shots={{ mobile: "/landing/servicenowcsa-mobile.png", desktop: "/landing/servicenowcsa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="servicenowcsa" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Six Domain Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Read each scenario, choose an answer and use the explanation to check the distinction. Missed questions return for more practice. The 80 drill questions are separate from both test banks.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each test has 60 questions and a 90-minute timer. Multiple-select questions state the required number of choices and receive no partial credit. Flag questions and review them before finishing. The tests use separate questions; the second is held out for a fresh check of these concepts.
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
                The Six CSA Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each test follows the official domain weights with rounding to whole questions. Practice focuses on selected administration concepts and scenarios. Exhaustive feature coverage and hands-on platform assessment are not included.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="text-brand-dark font-semibold">{area.weight}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("servicenowcsa", 3)}
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
            Spotted an unclear scenario or explanation, or have a topic you&apos;d like covered? Use question feedback or send us a message. We read every one and use it to improve every test.
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
            Study the Decision Behind the Answer
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Identify the constraint</h3>
              <p>
                Find the actual requirement: a user-interface behavior, a record validation, a migration dependency or an authorization rule. Several features may be useful; choose the ones that meet the stated requirement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Follow the evidence</h3>
              <p>
                Separate form presentation from record access, configuration from observed behavior, and a completed change from a verified outcome. Use the conditions and data provided in the question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Explain the alternatives</h3>
              <p>
                For each missed question, identify the circumstance in which another option would be appropriate. This builds understanding of scope and timing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Add hands-on preparation</h3>
              <p>
                Use authorized platform practice and the current ServiceNow blueprint alongside these questions. A high percentage here does not assess hands-on administration or predict a certification result.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ServiceNow CSA Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="servicenowcsa" />
        </div>
      </div>

      <SampleQuestionsV2 examId="servicenowcsa" />

      <ExamRelatedTests examId="servicenowcsa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start CSA Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. Begin with Platform Overview and Navigation, then work through the six domains.</p>
          <ExamLandingCTA dashboardHref="/servicenow-csa/dashboard" />
        </div>
      </div>
    </div>
  );
}
