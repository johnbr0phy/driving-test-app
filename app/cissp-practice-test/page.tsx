import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CISSP Practice Test 2026";
const metaDescription =
  "Free CISSP practice tests: 224 original manager-level questions across all eight ISC2 domains, two 100-question mocks with no going back, all explained.";
const description =
  "Free ISC2 CISSP practice tests with 224 original questions weighted to the April 2024 exam outline: security and risk management, asset security, architecture and engineering, network security, identity and access management, assessment and testing, security operations and software development security.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CISSP practice test, CISSP practice exam, CISSP practice questions, free CISSP test 2026, ISC2 CISSP exam prep, CISSP CAT practice, CISSP domains quiz",
  alternates: {
    canonical: `${siteUrl}/cissp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cissp-practice-test`,
    images: [{ url: shareImageUrl("cissp"), width: 1200, height: 630, alt: "Tigertest free CISSP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cissp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the CISSP exam?",
    a: "The CISSP exam is computerized adaptive (CAT) in every language: 100 to 150 questions in 3 hours. It stops once it is confident you are above or below the passing standard, so the number of questions varies from person to person. You answer in order and cannot go back. The score is scaled from 0 to 1000 and 700 passes.",
  },
  {
    q: "What are the eight CISSP domains and their weights?",
    a: "On the outline effective April 15, 2024: Security and Risk Management 16 percent, Asset Security 10 percent, Security Architecture and Engineering 13 percent, Communication and Network Security 13 percent, Identity and Access Management 13 percent, Security Assessment and Testing 12 percent, Security Operations 13 percent, and Software Development Security 10 percent.",
  },
  {
    q: "What does it mean to think like a manager on the CISSP?",
    a: "Many questions ask for the BEST, FIRST or MOST important action. The answer is usually the one a security manager would choose: protect people first, follow governance and senior management's risk decisions, assess before acting, and prefer policy and process over a quick technical fix.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Close, but not adaptive. Each practice test is a linear 100-question mock, the CAT minimum, in 120 minutes, which is the real pace of 150 questions in 3 hours. Like the real exam you answer in order with no going back, and ordering and matching items stand in for drag and drop. These are original practice questions, not real exam questions, and scores here are percent correct rather than ISC2's scaled score.",
  },
  {
    q: "Is the Tigertest CISSP practice test free?",
    a: "Yes. Both practice tests and all eight domain drills are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CISSP Practice Tests",
      description,
      url: `${siteUrl}/cissp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "224 original CISSP practice questions",
        "2 full 100-question practice tests in 120 minutes, no going back",
        "8 drills, one per CISSP domain",
        "Ordering and matching items like drag and drop",
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
        classFaqJsonLd("cissp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Security and Risk Management", weight: "16%" },
  { name: "Asset Security", weight: "10%" },
  { name: "Security Architecture and Engineering", weight: "13%" },
  { name: "Communication and Network Security", weight: "13%" },
  { name: "Identity and Access Management", weight: "13%" },
  { name: "Security Assessment and Testing", weight: "12%" },
  { name: "Security Operations", weight: "13%" },
  { name: "Software Development Security", weight: "10%" },
];

export default function CisspLandingPage() {
  return (
    <div data-theme="cissp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CISSP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cissp/dashboard"
            shortName="CISSP"
            subtitle="224 manager-level questions weighted to the eight ISC2 domains. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cissp-mobile.png", desktop: "/landing/cissp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cissp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Domain Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill per CISSP domain, from risk management and asset security through network security, identity, testing, operations and secure software. Questions you miss come back until you have mastered them.
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
                Two 100-question tests in 2 hours, answered in order with no going back, like the real adaptive exam. Questions ask for the best or first action a security manager would take. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the 2024 CISSP Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISC2 publishes the weight of each of the eight domains in the CISSP exam outline effective April 15, 2024. Every practice test here follows those weights, and every question is original and explained.
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
                src={getTigerAsset("cissp", 1)}
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
            How to Pass the CISSP Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think like a manager</h3>
              <p>
                Most questions ask for the BEST, FIRST or MOST important step. People come first, then the business. Senior management owns risk decisions, owners classify data, and you assess and plan before you buy a tool or rebuild a server.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the pairs that look alike</h3>
              <p>
                Due care and due diligence. Bell-LaPadula for confidentiality, Biba for integrity. RTO and RPO. Policy, standard, procedure and guideline. False acceptance and false rejection. SOC 2 Type I and Type II. Clear, purge and destroy. Many wrong answers on the CISSP are the other half of a pair.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the processes in order</h3>
              <p>
                The exam expects you to know where a step falls: the RMF from categorize to monitor, business continuity from charter and BIA to testing, incident management from detection to lessons learned, and the SDLC from requirements to disposal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain</h3>
              <p>
                Tigertest tracks your accuracy by domain. The real exam is scored on a 0 to 1000 scale with 700 to pass, which is not a fixed percent. Retake the drill you missed most until you clear 80 percent, then take Practice Test 2 cold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CISSP Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cissp" />
        </div>
      </div>

      <ExamRelatedTests examId="cissp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CISSP?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 224 questions across all eight domains.</p>
          <ExamLandingCTA dashboardHref="/cissp/dashboard" />
        </div>
      </div>
    </div>
  );
}
