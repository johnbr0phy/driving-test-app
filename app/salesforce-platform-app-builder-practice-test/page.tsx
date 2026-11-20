import "@/lib/v2/banks/sfappbuilder";
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

const title = "Free Salesforce Platform App Builder Practice Test 2026";
const metaDescription =
  "Free Salesforce Platform App Builder practice tests: 200 original questions on data models, security, formulas, Flow, Lightning pages and deployment, all explained.";
const description =
  "Free Salesforce Certified Platform App Builder practice tests with 200 original questions weighted to the Summer '26 exam guide: Salesforce Fundamentals, Data Modeling and Management, Business Logic and Process Automation, User Interface, and App Deployment.";

const faqs = [
  {
    q: "How many questions are on the Platform App Builder exam?",
    a: "The Salesforce Certified Platform App Builder exam has 60 scored multiple-choice and multiple-select questions, plus up to 5 unscored ones, in 105 minutes.",
  },
  {
    q: "What is the passing score for Platform App Builder?",
    a: "You need 73 percent on the current exam, which was refreshed in August 2026 to match the Summer '26 release. Older guides that say 63 or 68 percent describe earlier versions. Aim for 80 percent on these practice tests before you book.",
  },
  {
    q: "What is on the Platform App Builder exam?",
    a: "Five sections: Business Logic and Process Automation 32 percent, Data Modeling and Management 20 percent, Salesforce Fundamentals 18 percent, User Interface 17 percent, and App Deployment 13 percent. The 2026 refresh goes deeper into Flow, from choosing the right flow type to troubleshooting one, and covers Agentforce as an automation tool.",
  },
  {
    q: "How is App Builder different from the Administrator exam?",
    a: "The Platform Administrator exam is about running an org: users, sales and service apps, and day-to-day setup. App Builder is about designing and shipping custom apps: data models, business logic, Lightning pages and moving changes from sandboxes to production.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 60 questions in 105 minutes with free navigation and flagging, like the real exam, with choose-two questions mixed in. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.",
  },
  {
    q: "Is the Tigertest App Builder practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills (Lightning Pages, Actions and Mobile, and Sandboxes, Change Sets and Packages) and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Platform App Builder practice test, Salesforce App Builder practice exam, free App Builder questions, App Builder exam prep 2026, Salesforce Certified Platform App Builder, App Builder sample questions",
  alternates: {
    canonical: `${siteUrl}/salesforce-platform-app-builder-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/salesforce-platform-app-builder-practice-test`,
    images: [{ url: shareImageUrl("sfappbuilder"), width: 1200, height: 630, alt: "Tigertest free Salesforce Platform App Builder practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sfappbuilder")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Salesforce Platform App Builder Practice Tests",
      description,
      url: `${siteUrl}/salesforce-platform-app-builder-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sfappbuilder"),
      featureList: [
        "200 original Platform App Builder practice questions",
        "2 full 60-question practice tests in 105 minutes",
        "8 drills covering all five exam guide sections",
        "Choose-two, matching and ordering items",
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
        classFaqJsonLd("sfappbuilder"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Salesforce Fundamentals", weight: "18%" },
  { name: "Data Modeling and Management", weight: "20%" },
  { name: "Business Logic and Process Automation", weight: "32%" },
  { name: "User Interface", weight: "17%" },
  { name: "App Deployment", weight: "13%" },
];

export default function SalesforceAppBuilderLandingPage() {
  return (
    <div data-theme="sfappbuilder" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Salesforce Platform App Builder Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/salesforce-app-builder/dashboard"
            shortName="App Builder"
            subtitle="200 Platform App Builder questions weighted to the Summer '26 exam guide. Free to start, no account needed."
            shots={{ mobile: "/landing/sfappbuilder-mobile.png", desktop: "/landing/sfappbuilder-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sfappbuilder" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill per topic: declarative limits and reports; object, record and field access; relationships and field types; import, export and external data; formulas and validation; Flow and approvals; Lightning pages and mobile; and deployment. Questions you miss come back until you have mastered them.
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
                Two 60-question tests in 105 minutes with flagging and review, like the real exam, weighted to its five sections. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Salesforce publishes the section weighting for Platform App Builder. Every practice test follows it, with the largest share on Flow, formulas and validation, then data modeling, access and reports, Lightning pages and deployment.
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
                src={getTigerAsset("sfappbuilder", 3)}
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
            How to Pass Platform App Builder
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build in a free org</h3>
              <p>
                Sign up for a Developer Edition org or use a Trailhead Playground and build a small app yourself: two objects with a master-detail relationship, a roll-up summary, a validation rule, a record-triggered flow and a Lightning record page. The exam asks which tool fits a requirement, and building each one once makes the choice obvious.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Spend the most time on Flow</h3>
              <p>
                Business logic and process automation is 32 percent of the exam. Know when to use Fast Field Updates, Actions and Related Records, a scheduled path or a screen flow, how to troubleshoot a failing flow, and where formulas and validation rules are the simpler answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn what each relationship changes</h3>
              <p>
                Lookup or master-detail decides ownership, sharing, deletion, roll-ups and reporting. Practise reading a requirement and naming the relationship, the sharing setting and the field type it needs before you look at the options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by topic. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. On the real exam, read choose-two questions twice and flag the long scenarios to come back to.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Platform App Builder Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sfappbuilder" />
        </div>
      </div>

      <SampleQuestionsV2 examId="sfappbuilder" />

      <ExamRelatedTests examId="sfappbuilder" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Platform App Builder?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five sections.</p>
          <ExamLandingCTA dashboardHref="/salesforce-app-builder/dashboard" />
        </div>
      </div>
    </div>
  );
}
