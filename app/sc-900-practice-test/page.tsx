import "@/lib/v2/banks/sc900";
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

const title = "Free SC-900 Practice Test 2026: Security, Compliance, Identity";
const metaDescription =
  "Free SC-900 practice tests: 201 original questions on security, compliance and identity concepts, Microsoft Entra, Defender, Sentinel and Purview, all explained.";
const description =
  "Free Microsoft Security, Compliance, and Identity Fundamentals (SC-900) practice tests with 201 original questions weighted to the Microsoft Learn study guide: shared responsibility, Zero Trust, encryption and identity concepts; Microsoft Entra ID, Conditional Access, PIM and ID Protection; Azure network security, Defender for Cloud, Microsoft Sentinel and Defender XDR; and the Service Trust Portal, Compliance Manager, sensitivity labels, DLP, retention, insider risk, eDiscovery and audit in Microsoft Purview.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SC-900 practice test, SC-900 practice exam, SC-900 questions, Microsoft Security Compliance and Identity Fundamentals exam prep 2026, free SC-900 practice test, Microsoft security certification practice questions, SC-900 sample questions",
  alternates: {
    canonical: `${siteUrl}/sc-900-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sc-900-practice-test`,
    images: [{ url: shareImageUrl("sc900"), width: 1200, height: 630, alt: "Tigertest free SC-900 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sc900")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the SC-900 exam?",
    a: "Microsoft does not publish a fixed count, but guides report 40 to 60 questions in the 45-minute exam. The score is scaled from 1 to 1000 and 700 is passing. The exam is proctored and can include interactive question types, such as sets of yes/no statements and matching.",
  },
  {
    q: "What is on the SC-900 exam?",
    a: "Four skill areas from the Microsoft Learn study guide (skills measured as of October 21, 2026): Describe the concepts of security, compliance, and identity, 10 to 15 percent; Describe the capabilities of Microsoft Entra, 25 to 30 percent; Describe the capabilities of Microsoft security solutions, 35 to 40 percent; and Describe the capabilities of Microsoft compliance solutions, 20 to 25 percent.",
  },
  {
    q: "Do I need security experience to pass SC-900?",
    a: "No. SC-900 is a beginner exam for business stakeholders, new or existing IT professionals and students. Microsoft suggests being familiar with Azure and Microsoft 365. The exam asks what each Microsoft security, compliance and identity solution is for, not how to configure it.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 50 questions in 45 minutes with flagging and review, mixing single-answer items with choose-two items, yes/no statement sets and matching, like the real exam. Scores here are percent correct; the real exam reports a scaled score from 1 to 1000, with 700 to pass.",
  },
  {
    q: "Is the Tigertest SC-900 practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SC-900 Security, Compliance, and Identity Fundamentals Practice Tests",
      description,
      url: `${siteUrl}/sc-900-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sc900"),
      featureList: [
        "201 original SC-900 practice questions",
        "2 full 50-question practice tests in 45 minutes",
        "8 drills that follow the study guide",
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
        classFaqJsonLd("sc900"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Microsoft Security Solutions", weight: "35-40%" },
  { name: "Microsoft Entra", weight: "25-30%" },
  { name: "Microsoft Compliance Solutions", weight: "20-25%" },
  { name: "Security, Compliance & Identity Concepts", weight: "10-15%" },
];

export default function Sc900LandingPage() {
  return (
    <div data-theme="sc900" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SC-900 Security, Compliance, and Identity Fundamentals Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sc-900/dashboard"
            shortName="SC-900"
            subtitle="201 original questions weighted to the SC-900 study guide. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/sc900-mobile.png", desktop: "/landing/sc900-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sc900" />

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
                Eight drills that follow the study guide: core concepts, Entra ID and sign-in, access and governance, Azure infrastructure security, Defender for Cloud and Sentinel, Defender XDR, compliance management and information protection. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 45 minutes, written in the real exam&apos;s style: a company needs something and you pick the Microsoft solution that fits, judge a set of yes/no statements, or match tools to tasks. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the SC-900 Study Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured for SC-900, last updated October 21, 2026. Every practice test here follows its weighting, and the questions use current product names, such as Microsoft Entra ID, Microsoft Defender XDR, Microsoft Sentinel in the Defender portal and the Microsoft Purview portal, so nothing you learn is a retired name.
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
                src={getTigerAsset("sc900", 3)}
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
            How to Pass the SC-900 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know which family a product belongs to</h3>
              <p>
                Microsoft Entra is identity: ID, Conditional Access, PIM, ID Governance and ID Protection. Microsoft Defender is threat protection: Defender XDR for email, endpoints, identities and cloud apps, and Defender for Cloud for Azure and multicloud workloads. Microsoft Purview is compliance and data: labels, DLP, retention, insider risk, eDiscovery and audit. Many questions are answered by the family alone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the pairs that sound alike</h3>
              <p>
                Content explorer shows where sensitive items are; Activity explorer shows what was done to them. Sensitivity labels protect; retention labels keep or delete. Sign-in risk is one suspicious sign-in; user risk is a compromised account. Microsoft Entra roles manage the directory; Azure RBAC manages Azure resources. Secure score in Defender for Cloud is not the compliance score in Compliance Manager.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the Zero Trust and shared responsibility basics</h3>
              <p>
                Zero Trust is verify explicitly, use least privileged access and assume breach. In every service type the customer keeps its data, devices, and accounts and identities, while Microsoft keeps the physical datacenter. Defense in depth puts layers around the data at the center.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the statement sets and drill your weak area</h3>
              <p>
                Yes/no statement sets test each fact on its own, so a half-remembered answer shows up fast. Tigertest tracks your accuracy by skill area. The exam is scored from 1 to 1000 with 700 to pass, which is not a fixed percent, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SC-900 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sc900" />
        </div>
      </div>

      <SampleQuestionsV2 examId="sc900" />

      <ExamRelatedTests examId="sc900" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass SC-900?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 201 questions across all four skill areas.</p>
          <ExamLandingCTA dashboardHref="/sc-900/dashboard" />
        </div>
      </div>
    </div>
  );
}
