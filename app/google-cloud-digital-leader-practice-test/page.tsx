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

const title = "Free Google Cloud Digital Leader Practice Test 2026";
const metaDescription =
  "Free Google Cloud Digital Leader practice tests: 200 original questions on cloud, data, AI and agents, infrastructure, security and operations, weighted to the 2026 exam guide.";
const description =
  "Free Google Cloud Digital Leader practice tests with 200 original questions weighted to the exam guide launched in August 2026: digital transformation, data transformation, innovating with AI, modernizing infrastructure and applications, trust and security, and scaling with Google Cloud operations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Google Cloud Digital Leader practice test, Cloud Digital Leader practice exam, GCP Cloud Digital Leader questions, Cloud Digital Leader exam prep 2026, free Google Cloud certification practice test, Google Cloud foundational certification",
  alternates: {
    canonical: `${siteUrl}/google-cloud-digital-leader-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/google-cloud-digital-leader-practice-test`,
    images: [{ url: shareImageUrl("gcdl"), width: 1200, height: 630, alt: "Tigertest free Google Cloud Digital Leader practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcdl")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Google Cloud Digital Leader exam?",
    a: "50 to 60 multiple choice and multiple select questions in 90 minutes. The exam costs 99 USD, is given online or at a test center, and the certification is valid for three years. Google reports pass or fail and does not publish a passing score.",
  },
  {
    q: "What is on the Cloud Digital Leader exam in 2026?",
    a: "The exam guide launched on August 12, 2026 has six sections: Digital Transformation with Google Cloud, Exploring Data Transformation, Innovating with Google Cloud Artificial Intelligence, Modernize Infrastructure and Applications, and Trust and Security, about 18 percent each, plus Scaling with Google Cloud Operations at about 10 percent. It now covers agentic and generative AI, Gemini Enterprise Agent Platform, the AI Hypercomputer and Google's security products.",
  },
  {
    q: "Do I need technical experience for the Cloud Digital Leader?",
    a: "No. There are no prerequisites, and the exam is aimed at anyone who works with technical teams, including business, sales and project roles. It tests what Google Cloud products are for and the business value they bring, not how to configure them.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 60 questions in 90 minutes with flagging and review, mixing single-answer items with choose-two items, weighted to the six sections of the current guide. These are original practice questions, not real exam questions. Scores here are percent correct; aim for 80 percent before you book.",
  },
  {
    q: "Is the Tigertest Cloud Digital Leader practice test free?",
    a: "Yes. Both practice tests and all six drills are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Google Cloud Digital Leader Practice Tests",
      description,
      url: `${siteUrl}/google-cloud-digital-leader-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original Cloud Digital Leader practice questions",
        "2 full 60-question practice tests in 90 minutes",
        "6 drills, one per exam guide section",
        "Choose-two multiple select items",
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
        classFaqJsonLd("gcdl"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Digital Transformation with Google Cloud", weight: "18%" },
  { name: "Exploring Data Transformation", weight: "18%" },
  { name: "Innovating with Google Cloud AI", weight: "18%" },
  { name: "Modernize Infrastructure and Applications", weight: "18%" },
  { name: "Trust and Security with Google Cloud", weight: "18%" },
  { name: "Scaling with Google Cloud Operations", weight: "10%" },
];

export default function GcdlLandingPage() {
  return (
    <div data-theme="gcdl" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Google Cloud Digital Leader Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/google-cloud-digital-leader/dashboard"
            shortName="Google CDL"
            subtitle="200 questions weighted to the 2026 Cloud Digital Leader exam guide. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/gcdl-mobile.png", desktop: "/landing/gcdl-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcdl" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Six Focused Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill for each section of the exam guide: digital transformation, data, AI, infrastructure and applications, security, and operations. Questions you miss come back until you have mastered them.
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
                Two 60-question tests in 90 minutes, written in the real exam&apos;s style: a business need, and the Google Cloud product or idea that meets it, sometimes two of them. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Google publishes the section weighting for the Cloud Digital Leader exam, and the guide that launched in August 2026 rewrote the AI and security sections. Every practice test here follows the new weighting and uses current product names, such as Gemini Enterprise Agent Platform and Cloud Run functions.
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
                src={getTigerAsset("gcdl", 1)}
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
            How to Pass the Google Cloud Digital Leader Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think in business value</h3>
              <p>
                Most questions describe an organization&apos;s goal, such as moving faster, cutting cost, using its data or meeting a regulation, and ask which approach or product fits. You are not asked how to configure anything. Read for the goal first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the product pairs</h3>
              <p>
                BigQuery for analytics, Cloud SQL and AlloyDB for transactions, Spanner for global consistency, Bigtable for huge throughput, Firestore for apps. Compute Engine for VMs, GKE for Kubernetes, Cloud Run for serverless containers. Cloud VPN over the internet, Cloud Interconnect for private links. Standard, Nearline, Coldline and Archive by how often data is read.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Give AI and security extra time</h3>
              <p>
                The 2026 guide puts more weight on agentic and generative AI, choosing between pre-trained APIs and custom models, data quality and responsible AI, and on Google&apos;s security portfolio: Security Command Center, Google Security Operations, Google Threat Intelligence and Model Armor.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak section</h3>
              <p>
                Tigertest tracks your accuracy by section. Google does not publish a passing score, so retake the drill you missed most until you clear 80 percent with room to spare, then take Practice Test 2 cold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Google Cloud Digital Leader Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcdl" />
        </div>
      </div>

      <ExamRelatedTests examId="gcdl" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Cloud Digital Leader?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six sections.</p>
          <ExamLandingCTA dashboardHref="/google-cloud-digital-leader/dashboard" />
        </div>
      </div>
    </div>
  );
}
