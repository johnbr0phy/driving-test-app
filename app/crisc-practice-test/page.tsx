import "@/lib/v2/banks/crisc";
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

const title = "Free CRISC Practice Test 2026";
const metaDescription =
  "Free ISACA CRISC practice tests: 204 original risk practitioner questions on IT risk governance, risk assessment, risk response and reporting, and technology and security, all explained.";
const description =
  "Free ISACA CRISC (Certified in Risk and Information Systems Control) practice tests with 204 original questions weighted to the CRISC exam content outline in force from November 2025: organizational governance, roles and accountability, culture and policies, continuity and asset ownership, enterprise risk management, the three lines, risk profile, appetite, tolerance and capacity, legal and contractual requirements, risk events, threat modeling, vulnerability management, risk scenarios, SLE and ALE, BIA, the risk register, inherent and residual risk, risk response options, risk and control ownership, vendor and fourth-party risk, exceptions and findings, control types, design and testing, KRIs, KCIs and KPIs, action plans, reporting, emerging risk, operations and change management, SDLC, data lifecycle, enterprise architecture, resilience, emerging technology, security concepts and privacy principles.";

const faqs = [
  {
    q: "How many questions are on the CRISC exam?",
    a: "The CRISC exam has 150 multiple-choice questions in 4 hours, according to ISACA's exam candidate guide. Every question has four options and one best answer, and there is no penalty for wrong answers. You take it at a PSI test center or with remote proctoring, in English, Spanish or Japanese.",
  },
  {
    q: "What is the passing score for CRISC?",
    a: "ISACA reports scores on a scale of 200 to 800, and you need 450 or higher to pass. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the CRISC exam?",
    a: "Four domains in ISACA's exam content outline, in force for exams from November 3, 2025: Governance 26 percent, IT Risk Assessment 22 percent, Risk Response and Reporting 32 percent and Technology and Security 20 percent. That update kept the four domains and moved two points of weight from Technology and Security to Risk Assessment.",
  },
  {
    q: "What experience do I need for CRISC?",
    a: "ISACA requires three or more years of CRISC work experience across at least two of the four domains, within the ten years before you apply, with no experience waivers. You can take the exam first and apply within five years of passing. To keep CRISC you report at least 120 CPE hours every three years, with at least 20 each year.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 75 multiple-choice questions in 2 hours, half the real exam at the same pace of about 1.6 minutes a question, with flagging and review. Questions ask for the BEST, MOST or FIRST action from a risk practitioner's view, like the real exam. The questions are original, not ISACA's.",
  },
  {
    q: "Is the Tigertest CRISC practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the organizational governance, risk governance, risk identification and risk analysis drills are free; the risk response, control design, monitoring and reporting, technology, and security and privacy drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CRISC practice test, CRISC practice exam, ISACA CRISC questions, free CRISC questions, CRISC exam prep 2026, Certified in Risk and Information Systems Control practice test",
  alternates: {
    canonical: `${siteUrl}/crisc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/crisc-practice-test`,
    images: [{ url: shareImageUrl("crisc"), width: 1200, height: 630, alt: "Tigertest free CRISC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("crisc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CRISC Practice Tests",
      description,
      url: `${siteUrl}/crisc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("crisc"),
      featureList: [
        "204 original CRISC practice questions",
        "2 practice tests of 75 questions in 2 hours",
        "9 drills covering all four CRISC domains",
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
        classFaqJsonLd("crisc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Governance", weight: "26%" },
  { name: "IT Risk Assessment", weight: "22%" },
  { name: "Risk Response and Reporting", weight: "32%" },
  { name: "Technology and Security", weight: "20%" },
];

export default function CriscLandingPage() {
  return (
    <div data-theme="crisc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CRISC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/crisc/dashboard"
            shortName="CRISC"
            subtitle="204 risk practitioner questions weighted to the CRISC job practice, from risk governance to control monitoring. Free to start, no account needed."
            shots={{ mobile: "/landing/crisc-mobile.png", desktop: "/landing/crisc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="crisc" />

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
                Organizational governance, risk governance, risk identification, risk analysis, risk response, control design, monitoring and reporting, technology, and security and privacy. Questions you miss come back until you have mastered them.
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
                Built on the CRISC Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISACA publishes the CRISC job practice with four domains and their weights, updated for exams from November 3, 2025. Every practice test follows it, from risk appetite, the three lines and risk scenarios to ALE, risk response, control testing, KRIs and KCIs, the SDLC and privacy principles.
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
                src={getTigerAsset("crisc", 3)}
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
            How to Pass CRISC
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think like a risk practitioner</h3>
              <p>
                CRISC asks what a risk practitioner should do BEST or FIRST. The practitioner identifies, analyzes and reports risk and advises; the business owner decides how a risk is treated and accepts what is left. Answers that take a decision away from the owner are usually wrong.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tie every risk to business objectives</h3>
              <p>
                Risk is judged by its effect on what the enterprise is trying to achieve and against the appetite and tolerance leadership set. Learn the difference between appetite, tolerance and capacity, and between inherent and residual risk.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Give risk response and reporting the most time</h3>
              <p>
                Risk Response and Reporting is 32 percent of the exam. Know the four responses, risk and control ownership, vendor and fourth-party risk, exceptions, control types and test methods, and what KRIs, KCIs and KPIs each measure.
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
          CRISC Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="crisc" />
        </div>
      </div>

      <SampleQuestionsV2 examId="crisc" />

      <ExamRelatedTests examId="crisc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CRISC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 204 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/crisc/dashboard" />
        </div>
      </div>
    </div>
  );
}
