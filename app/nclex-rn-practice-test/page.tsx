import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free NCLEX-RN Practice Test 2026 - NGN Questions with Rationales";
const description =
  "Free NCLEX-RN practice questions built on the 2026 NCSBN test plan: prioritization, delegation, pharmacology, labs and select all that apply items with a rationale on every answer. Two 85-question practice tests plus drills for all eight Client Needs areas.";

const faqs = [
  {
    q: "How many questions are on the NCLEX-RN?",
    a: "Between 85 and 150, in up to five hours. The exam is computerized adaptive: it stops as soon as it is 95% certain you are above or below the passing standard, so finishing at 85 questions says nothing on its own about passing or failing. Fifteen of the questions are unscored pretest items you cannot tell apart from the rest.",
  },
  {
    q: "What percentage do I need to pass the NCLEX?",
    a: "There is no percentage pass mark. The real NCLEX is adaptive: it assesses ability against a passing standard and reports pass or fail. TigerTest reports percent correct on fixed practice items. Practice percentages do not predict your NCLEX result or tell you when to schedule the exam. Use them to track practice progress and choose topics to review.",
  },
  {
    q: "What is on the 2026 NCLEX-RN test plan?",
    a: "Eight Client Needs categories: Management of Care (15 to 21%), Safety and Infection Prevention and Control (10 to 16%), Health Promotion and Maintenance (6 to 12%), Psychosocial Integrity (6 to 12%), Basic Care and Comfort (6 to 12%), Pharmacological and Parenteral Therapies (13 to 19%), Reduction of Risk Potential (9 to 15%) and Physiological Adaptation (11 to 17%). The 2026 plan took effect April 1, 2026 and kept the same weights as 2023.",
  },
  {
    q: "Does TigerTest have Next Generation NCLEX questions?",
    a: "Yes. The bank includes select all that apply, matrix, bowtie, drop-down, highlight, ordering and numeric items, plus case studies with charts. TigerTest scores each item all or nothing. It does not reproduce the real exam's partial-credit scoring or adaptive ability assessment.",
  },
  {
    q: "Is the TigerTest NCLEX practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "NCLEX-RN practice test, NCLEX practice questions, free NCLEX questions, NCLEX SATA practice, NGN practice questions, NCLEX prioritization questions, NCLEX pharmacology practice, NCLEX 2026",
  alternates: {
    canonical: `${siteUrl}/nclex-rn-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/nclex-rn-practice-test`,
    images: [{ url: "/og/nclex", width: 1200, height: 630, alt: "TigerTest free NCLEX-RN practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/nclex"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free NCLEX-RN Practice Test",
      description,
      url: `${siteUrl}/nclex-rn-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original NCLEX-RN practice questions with rationales",
        "Two 85-question practice tests answered in order, no going back",
        "Select all that apply, matrix, bowtie and chart-based items",
        "Weighted by the NCSBN 2026 Client Needs categories",
        "Mastery drills for all eight Client Needs areas",
        "Progress syncs between phone and computer",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Management of Care", weight: "15-21%" },
  { name: "Safety and Infection Prevention and Control", weight: "10-16%" },
  { name: "Health Promotion and Maintenance", weight: "6-12%" },
  { name: "Psychosocial Integrity", weight: "6-12%" },
  { name: "Basic Care and Comfort", weight: "6-12%" },
  { name: "Pharmacological and Parenteral Therapies", weight: "13-19%" },
  { name: "Reduction of Risk Potential", weight: "9-15%" },
  { name: "Physiological Adaptation", weight: "11-17%" },
];

export default function NclexLandingPage() {
  return (
    <div data-theme="nclex" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="nclex" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCLEX-RN Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nclex"
            shortName="NCLEX-RN"
            subtitle="200 clinical judgment questions with rationales, including select all that apply. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nclex-mobile.png", desktop: "/landing/nclex-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nclex" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Client Needs Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, one per Client Needs category, from Management of Care to Physiological Adaptation. Check each answer and read the rationale on the spot; every miss comes back until you have mastered it.
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
                85 questions at the real test&apos;s minimum length, answered in order with no going back, like the NCLEX. Practice Test 2 questions do not appear in the drills, so you can check your practice performance on a separate set of questions. Finish with a score by Client Needs category and a plan for what to drill next.
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
                Built on the 2026 NCLEX-RN Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test follows the NCSBN Client Needs weights, so Management of Care and pharmacology carry the most questions, just as they do on test day.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("nclex", 1)}
                alt="TigerTest mascot"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make TigerTest Better</h2>
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
            How to Practice for the NCLEX-RN
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the priority rules</h3>
              <p>
                Airway, breathing, circulation. Acute before chronic, unstable before stable, actual before potential, physical before psychosocial. Most &quot;which client first&quot; and &quot;what first&quot; questions fall to one of these, so say the rule out loud before you pick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who can do what</h3>
              <p>
                RNs assess, teach, evaluate and handle the unstable client. LPNs give most medications and care for stable clients with expected outcomes. Assistive personnel do routine care such as vital signs on stable clients, hygiene and ambulation. Delegation questions test that line.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Treat every SATA option as true or false</h3>
              <p>
                Select all that apply items are scored on each option. Read every choice against the stem as its own true or false question, and do not hunt for a set number of answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read the rationales, then drill your weakest area</h3>
              <p>
                TigerTest shows practice scores by Client Needs category. Review the rationales in the area you miss most, then use Practice Test 2 to check your progress on a separate set of questions. These scores do not predict your result on the real adaptive exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCLEX-RN Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="nclex" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your NCLEX Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all eight Client Needs areas.</p>
          <ExamLandingCTA dashboardHref="/nclex" />
        </div>
      </div>
    </div>
  );
}
