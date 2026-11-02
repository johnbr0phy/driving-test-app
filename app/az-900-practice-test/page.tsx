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

const siteUrl = SITE_URL;

const title = "Free AZ-900 Practice Test 2026: Azure Fundamentals";
const metaDescription =
  "Free AZ-900 Azure Fundamentals practice tests: 150 original questions on cloud concepts, Azure architecture and services, and management and governance, all explained.";
const description =
  "Free Microsoft Azure Fundamentals (AZ-900) practice tests with 150 original questions weighted to the Microsoft Learn study guide: cloud models, shared responsibility and IaaS, PaaS and SaaS; regions, availability zones, compute, networking, storage, Microsoft Entra ID and Zero Trust; and cost management, Azure Policy, resource locks, Microsoft Purview, Azure Arc, ARM templates and Azure Monitor.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AZ-900 practice test, Azure Fundamentals practice exam, AZ-900 questions, Microsoft Azure Fundamentals exam prep 2026, free AZ-900 practice test, Azure certification practice questions, AZ-900 sample questions",
  alternates: {
    canonical: `${siteUrl}/az-900-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/az-900-practice-test`,
    images: [{ url: shareImageUrl("az900"), width: 1200, height: 630, alt: "Tigertest free AZ-900 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("az900")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the AZ-900 exam?",
    a: "Microsoft does not publish a fixed count, but candidates usually see 40 to 60 questions in 45 minutes. The score is scaled from 1 to 1000 and 700 is passing. Question types include multiple choice, multiple response, sets of yes/no statements, and matching or drag-and-drop items.",
  },
  {
    q: "What is on the AZ-900 exam?",
    a: "Three skill areas from the Microsoft Learn study guide (skills measured as of July 20, 2026): Describe cloud concepts, 25 to 30 percent; Describe Azure architecture and services, 35 to 40 percent; and Describe Azure management and governance, 30 to 35 percent. It tests what each service and feature is for, not how to configure it.",
  },
  {
    q: "Do I need hands-on Azure experience to pass AZ-900?",
    a: "No. AZ-900 is a beginner exam for anyone who needs to understand cloud concepts and Azure at a foundational level, technical or not. Trying the Azure portal with a free account helps the names stick, but the exam asks you to describe services, not build them.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 50 questions in 45 minutes with flagging and review, mixing single-answer items with choose-two items, yes/no statement sets and matching, like the real exam. Scores here are percent correct; the real exam reports a scaled score from 1 to 1000, with 700 to pass.",
  },
  {
    q: "Is the Tigertest AZ-900 practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AZ-900 Azure Fundamentals Practice Tests",
      description,
      url: `${siteUrl}/az-900-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "150 original AZ-900 practice questions",
        "2 full 50-question practice tests in 45 minutes",
        "8 drills, one per study guide topic",
        "Yes/no statement sets, matching and choose-two items",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("az900"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Azure Architecture & Services", weight: "35-40%" },
  { name: "Azure Management & Governance", weight: "30-35%" },
  { name: "Cloud Concepts", weight: "25-30%" },
];

export default function Az900LandingPage() {
  return (
    <div data-theme="az900" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AZ-900 Azure Fundamentals Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/azure-fundamentals/dashboard"
            shortName="AZ-900"
            subtitle="150 original questions weighted to the AZ-900 study guide. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/az900-mobile.png", desktop: "/landing/az900-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="az900" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills that follow the study guide: cloud computing, IaaS, PaaS and SaaS, core architecture, compute and networking, storage, identity and security, cost and governance, and management and monitoring. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 45 minutes, written in the real exam&apos;s style: a company needs something and you pick the Azure service or feature that fits, judge a set of yes/no statements, or match tools to tasks. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the AZ-900 Study Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured for AZ-900, last updated July 20, 2026. Every practice test here follows its weighting, and the questions use current product names, such as Microsoft Entra ID, Microsoft Defender for Cloud and Microsoft Purview, so nothing you learn is a retired name.
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
                src={getTigerAsset("az900", 1)}
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
            How to Pass the AZ-900 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who does what in IaaS, PaaS and SaaS</h3>
              <p>
                Microsoft always owns the physical datacenter, network and hosts. You always own your data, devices, and accounts and identities. The operating system is yours in IaaS and Microsoft&apos;s in PaaS and SaaS. Questions on the shared responsibility model and the service types turn on that line.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the hierarchy and the scopes</h3>
              <p>
                Resources sit in resource groups, resource groups in subscriptions, and subscriptions in management groups. Azure Policy, RBAC role assignments and resource locks set at one level are inherited below it. Regions, region pairs, availability zones and sovereign regions answer where things run.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match the tool to the job</h3>
              <p>
                Pricing calculator before you deploy, Cost Management after. Azure Policy for what resources may look like, RBAC for what people may do, locks against deletion, Purview for data. Advisor recommends, Service Health reports Azure incidents, Azure Monitor collects metrics and logs, and Azure Arc reaches servers outside Azure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the statement sets and drill your weak area</h3>
              <p>
                Yes/no statement sets test each fact on its own, so a half-remembered answer shows up fast. Tigertest tracks your accuracy by topic. The exam is scored from 1 to 1000 with 700 to pass, which is not a fixed percent, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AZ-900 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="az900" />
        </div>
      </div>

      <ExamRelatedTests examId="az900" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass AZ-900?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 150 questions across all three skill areas.</p>
          <ExamLandingCTA dashboardHref="/azure-fundamentals/dashboard" />
        </div>
      </div>
    </div>
  );
}
