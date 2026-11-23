import "@/lib/v2/banks/cism";
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

const title = "Free CISM Practice Test 2026";
const metaDescription =
  "Free ISACA CISM practice tests: 198 original manager-level questions on security governance, risk management, the security program and incident management, all explained.";
const description =
  "Free ISACA CISM (Certified Information Security Manager) practice tests with 198 original questions weighted to the CISM exam content outline in force from November 2026: enterprise governance, accountability and roles, legal and contractual requirements, security strategy, enterprise architecture and frameworks, risk assessment and analysis, risk treatment, ownership, KRIs and exceptions, policies, standards and classification, control design, selection and testing, awareness training, supplier and fourth-party risk, program metrics, incident response plans, BIA, RTO and RPO, continuity and recovery, containment, evidence handling, notification and post-incident review.";

const faqs = [
  {
    q: "How many questions are on the CISM exam?",
    a: "The CISM exam has 150 multiple-choice questions in 4 hours, according to ISACA's exam candidate guide. Every question has four options and one best answer, and there is no penalty for wrong answers. You take it at a PSI test center or with remote proctoring, in English, Chinese, Spanish, Japanese, French or German.",
  },
  {
    q: "What is the passing score for CISM?",
    a: "ISACA reports scores on a scale of 200 to 800, and you need 450 or higher to pass. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the CISM exam?",
    a: "Four domains in ISACA's exam content outline, in force for exams from November 3, 2026: Information Security Governance 18 percent, Information Security Risk Management 20 percent, Information Security Program 33 percent and Incident Management 29 percent. The update puts more weight on strategy and program development and adds enterprise and information security architecture.",
  },
  {
    q: "What experience do I need for CISM?",
    a: "ISACA requires five or more years of information security management work across at least three of the four CISM domains, within the ten years before you apply. You can take the exam first and apply within five years of passing. To keep CISM you report at least 120 CPE hours every three years, with at least 20 each year.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 75 multiple-choice questions in 2 hours, half the real exam at the same pace of about 1.6 minutes a question, with flagging and review. Questions ask for the BEST, MOST or FIRST action from a security manager's view, like the real exam. The questions are original, not ISACA's.",
  },
  {
    q: "Is the Tigertest CISM practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the enterprise governance, security strategy, risk assessment and risk response drills are free; the program development, program management, incident readiness and incident operations drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CISM practice test, CISM practice exam, ISACA CISM questions, free CISM questions, CISM exam prep 2026, Certified Information Security Manager practice test",
  alternates: {
    canonical: `${siteUrl}/cism-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cism-practice-test`,
    images: [{ url: shareImageUrl("cism"), width: 1200, height: 630, alt: "Tigertest free CISM practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cism")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CISM Practice Tests",
      description,
      url: `${siteUrl}/cism-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cism"),
      featureList: [
        "198 original CISM practice questions",
        "2 practice tests of 75 questions in 2 hours",
        "8 drills covering all four CISM domains",
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
        classFaqJsonLd("cism"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Information Security Governance", weight: "18%" },
  { name: "Information Security Risk Management", weight: "20%" },
  { name: "Information Security Program", weight: "33%" },
  { name: "Incident Management", weight: "29%" },
];

export default function CismLandingPage() {
  return (
    <div data-theme="cism" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CISM Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cism/dashboard"
            shortName="CISM"
            subtitle="198 manager-level questions weighted to the CISM job practice, from governance to incident response. Free to start, no account needed."
            shots={{ mobile: "/landing/cism-mobile.png", desktop: "/landing/cism-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cism" />

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
                Enterprise governance, security strategy, risk assessment, risk response, program development, program management, incident readiness and incident operations. Questions you miss come back until you have mastered them.
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
                Two tests of 75 questions in 2 hours with flagging and review, half the real exam at its pace. Questions mix all four domains in the weights ISACA publishes. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the CISM Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISACA publishes the CISM job practice with four domains and their weights, updated for exams from November 3, 2026. Every practice test follows it, from accountability, strategy and business cases to risk treatment, control testing, supplier risk, recovery objectives and containment.
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
                src={getTigerAsset("cism", 3)}
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
            How to Pass CISM
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think like a manager, not a technician</h3>
              <p>
                CISM asks what a security manager should do BEST or FIRST for the enterprise. The right answer usually serves business goals at an acceptable risk and keeps decisions with the people who own them, not the most technical fix.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who owns what</h3>
              <p>
                Many questions turn on roles: the board is accountable, risk owners accept risk, control owners run controls, data owners classify data and legal counsel judges notification duties. Learn where the security manager advises and where it decides.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Give the program and incident domains the most time</h3>
              <p>
                The information security program (33 percent) and incident management (29 percent) are over 60 percent of the exam. Know the policy hierarchy, control types, supplier assurance, the BIA, RTO, RPO and recovery sites, and the order of containment, eradication and recovery.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold at the real pace of about 1.6 minutes a question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CISM Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cism" />
        </div>
      </div>

      <SampleQuestionsV2 examId="cism" />

      <ExamRelatedTests examId="cism" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CISM?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 198 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/cism/dashboard" />
        </div>
      </div>
    </div>
  );
}
