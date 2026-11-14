import "@/lib/v2/banks/gcppca";
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

const title = "Free Google Cloud Professional Cloud Architect Practice Test 2026";
const metaDescription =
  "Free Google Cloud Professional Cloud Architect practice tests: 200 original scenario questions with case studies, weighted to the six sections of the current exam guide.";
const description =
  "Free Google Cloud Professional Cloud Architect (PCA) practice tests with 200 original scenario questions weighted to the current exam guide: designing and planning a cloud solution, managing and provisioning infrastructure, security and compliance, analyzing technical and business processes, managing implementation, and solution and operations excellence, with four original case studies.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Google Cloud Professional Cloud Architect practice test, GCP Professional Cloud Architect practice exam, PCA practice questions, Professional Cloud Architect case studies, GCP architect exam prep 2026, Google Cloud certification practice test",
  alternates: {
    canonical: `${siteUrl}/google-cloud-professional-cloud-architect-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/google-cloud-professional-cloud-architect-practice-test`,
    images: [{ url: shareImageUrl("gcppca"), width: 1200, height: 630, alt: "Tigertest free Google Cloud Professional Cloud Architect practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcppca")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Google Cloud Professional Cloud Architect exam?",
    a: "50 to 60 multiple choice and multiple select questions in 2 hours. The exam costs 200 USD, is offered in English and Japanese, online or at a test center, and the certification is valid for two years. Google reports pass or fail and does not publish a passing score.",
  },
  {
    q: "How do the case studies work on the Professional Cloud Architect exam?",
    a: "Each exam includes 2 case studies, and case study questions make up 20 to 30 percent of the exam. Each case describes a fictitious company, its solution concept, its existing environment and its business and technical requirements, and you can view it on a split screen while you answer. The exam guide lists four case studies that may be used: Altostrat Media, Cymbal Retail, EHR Healthcare and KnightMotives Automotive. Read those on Google's site; the case studies in Tigertest's practice tests are our own, written in the same style so you practise the skill without memorizing answers.",
  },
  {
    q: "What is on the Professional Cloud Architect exam?",
    a: "The exam guide has six sections: designing and planning a cloud solution architecture (about 25 percent), managing and provisioning a solution infrastructure (about 17.5 percent), designing for security and compliance (about 17.5 percent), analyzing and optimizing technical and business processes (about 15 percent), managing implementation (about 12.5 percent) and ensuring solution and operations excellence (about 12.5 percent). It expects familiarity with the Google Cloud Well-Architected Framework and now covers Gemini Enterprise Agent Platform, Model Garden and the AI Hypercomputer.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 60 questions in 2 hours with flagging and review, mixing single-answer items with choose-two items, weighted to the six sections of the guide, with two case studies of seven questions each. These are original practice questions, not real exam questions. Scores here are percent correct; aim for 80 percent before you book.",
  },
  {
    q: "Is the Tigertest Professional Cloud Architect practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Google Cloud Professional Cloud Architect Practice Tests",
      description,
      url: `${siteUrl}/google-cloud-professional-cloud-architect-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("gcppca"),
      featureList: [
        "200 original Professional Cloud Architect practice questions",
        "2 full 60-question practice tests in 2 hours",
        "4 original case studies in the exam's style",
        "8 drills across the six exam guide sections",
        "Choose-two multiple select items",
        "Instant feedback with explanations",
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
        classFaqJsonLd("gcppca"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Designing and planning a cloud solution architecture", weight: "25%" },
  { name: "Managing and provisioning a solution infrastructure", weight: "17.5%" },
  { name: "Designing for security and compliance", weight: "17.5%" },
  { name: "Analyzing and optimizing technical and business processes", weight: "15%" },
  { name: "Managing implementation", weight: "12.5%" },
  { name: "Ensuring solution and operations excellence", weight: "12.5%" },
];

export default function GcppcaLandingPage() {
  return (
    <div data-theme="gcppca" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Google Cloud Professional Cloud Architect Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/google-cloud-professional-cloud-architect/dashboard"
            shortName="Google PCA"
            subtitle="200 scenario questions and four original case studies, weighted to the current exam guide. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/gcppca-mobile.png", desktop: "/landing/gcppca-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcppca" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Focused Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill for each part of the exam guide: requirements, network and compute design, provisioning, AI with Agent Platform, security and compliance, processes, implementation, and operations. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests with Case Studies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 60-question tests in 2 hours, each with two case studies that open beside their questions, as on the real exam. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Current Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Google publishes the section weighting for the Professional Cloud Architect exam. Every practice test here follows it and uses current product names, such as Gemini Enterprise Agent Platform, Agent Platform Pipelines and Cloud Run functions.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("gcppca", 1)}
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
            How to Pass the Professional Cloud Architect Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read Google&apos;s case studies before exam day</h3>
              <p>
                The guide lists the four case studies the exam may use. Read each one and note its business and technical requirements and its executive statement. On the day, the right answer is the one that meets the stated requirements, not the most impressive design.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the trade-offs, not just the products</h3>
              <p>
                Most questions offer several workable designs. Pick the one that meets the requirement with the least cost and complexity: a regional instance group for a zone failure, not a second region; Spot VMs only for work that can restart; VPC Service Controls for data exfiltration, not firewall rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know security and the Well-Architected Framework well</h3>
              <p>
                Security and compliance is a sixth of the exam, and the Well-Architected Framework runs through all of it: least privilege, the resource hierarchy, organization policies, customer-managed keys, SLOs, error budgets and safe releases.
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
          Professional Cloud Architect Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcppca" />
        </div>
      </div>

      <SampleQuestionsV2 examId="gcppca" />

      <ExamRelatedTests examId="gcppca" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Professional Cloud Architect?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all six sections.</p>
          <ExamLandingCTA dashboardHref="/google-cloud-professional-cloud-architect/dashboard" />
        </div>
      </div>
    </div>
  );
}
