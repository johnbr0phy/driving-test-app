import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Free NCLEX-PN Practice Test 2026 - LPN/LVN Questions";
const metaDescription =
  "Free NCLEX-PN practice questions on the 2026 NCSBN test plan, written for the LPN/LVN scope with NGN case studies: two 85-question tests plus drills for all eight Client Needs areas.";
const description =
  "Free NCLEX-PN practice questions built on the 2026 NCSBN test plan and written for the practical nurse's scope: coordinated care, assigning tasks to assistive personnel, when to notify the RN, pharmacology, data collection and select all that apply items with a rationale on every answer. Two 85-question practice tests plus drills for all eight Client Needs areas.";

const faqs = [
  {
    q: "How many questions are on the NCLEX-PN?",
    a: "Between 85 and 150, in up to five hours. The exam is computerized adaptive: it stops as soon as it is 95% certain you are above or below the passing standard, so finishing at 85 questions says nothing on its own about passing or failing. Fifteen of the questions are unscored pretest items you cannot tell apart from the rest.",
  },
  {
    q: "What percentage do I need to pass the NCLEX-PN?",
    a: "There is no percentage pass mark. The real NCLEX-PN is adaptive: it assesses ability against a passing standard and reports pass or fail. Tigertest reports percent correct on fixed practice items. Practice percentages do not predict your NCLEX-PN result or tell you when to schedule the exam. Use them to track practice progress and choose topics to review.",
  },
  {
    q: "What is on the 2026 NCLEX-PN test plan?",
    a: "Eight Client Needs categories: Coordinated Care (18 to 24%), Safety and Infection Prevention and Control (10 to 16%), Health Promotion and Maintenance (6 to 12%), Psychosocial Integrity (9 to 15%), Basic Care and Comfort (7 to 13%), Pharmacological Therapies (10 to 16%), Reduction of Risk Potential (9 to 15%) and Physiological Adaptation (7 to 13%). The 2026 plan took effect April 1, 2026 and runs through March 31, 2029.",
  },
  {
    q: "How is the NCLEX-PN different from the NCLEX-RN?",
    a: "The PN exam tests the practical nurse's scope. The PN collects data rather than performing the initial comprehensive assessment, reinforces teaching rather than creating the teaching plan, contributes to the plan of care, assigns tasks to assistive personnel and reports changes to the RN or provider. Coordinated Care replaces the RN plan's Management of Care and carries the largest share of questions. Every Tigertest item is written for that scope, with state-specific limits such as IV medications stated as varying by state and facility policy.",
  },
  {
    q: "Is the Tigertest NCLEX-PN practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NCLEX-PN practice test, NCLEX-PN practice questions, free NCLEX-PN questions, LPN practice test, LVN practice test, NCLEX-PN SATA practice, NGN practice questions, NCLEX-PN pharmacology practice, NCLEX-PN 2026",
  alternates: {
    canonical: `${siteUrl}/nclex-pn-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nclex-pn-practice-test`,
    images: [{ url: shareImageUrl("nclexpn"), width: 1200, height: 630, alt: "Tigertest free NCLEX-PN practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nclexpn")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NCLEX-PN Practice Test",
      description,
      url: `${siteUrl}/nclex-pn-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original NCLEX-PN practice questions with rationales, written for the LPN/LVN scope",
        "Two 85-question practice tests answered in order, no going back",
        "Select all that apply, matrix, bowtie and case study items",
        "Weighted by the NCSBN 2026 NCLEX-PN Client Needs categories",
        "Mastery drills for all eight Client Needs areas",
        "Progress syncs between phone and computer",
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
        classFaqJsonLd("nclexpn"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Coordinated Care", weight: "18-24%" },
  { name: "Safety and Infection Prevention and Control", weight: "10-16%" },
  { name: "Health Promotion and Maintenance", weight: "6-12%" },
  { name: "Psychosocial Integrity", weight: "9-15%" },
  { name: "Basic Care and Comfort", weight: "7-13%" },
  { name: "Pharmacological Therapies", weight: "10-16%" },
  { name: "Reduction of Risk Potential", weight: "9-15%" },
  { name: "Physiological Adaptation", weight: "7-13%" },
];

export default function NclexPnLandingPage() {
  return (
    <div data-theme="nclexpn" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCLEX-PN Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nclex-pn/dashboard"
            shortName="NCLEX-PN"
            subtitle="200 practical nursing questions with rationales, written for the LPN/LVN scope, including select all that apply. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nclexpn-mobile.png", desktop: "/landing/nclexpn-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nclexpn" />

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
                Eight drills, one per Client Needs category, from Coordinated Care to Physiological Adaptation. Check each answer and read the rationale on the spot; every miss comes back until you have mastered it.
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
                85 questions at the real test&apos;s minimum length, answered in order with no going back, like the NCLEX-PN. Practice Test 2 questions do not appear in the drills, so you can check your practice performance on a separate set of questions. Finish with a score by Client Needs category and a plan for what to drill next.
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
                Built on the 2026 NCLEX-PN Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test follows the NCSBN Client Needs weights, so Coordinated Care, safety and pharmacology carry the most questions, just as they do on test day. Every item is written for what a practical nurse does: collecting data, reinforcing teaching, assigning tasks and reporting to the RN.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("nclexpn", 1)}
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
            How to Practice for the NCLEX-PN
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer as the practical nurse</h3>
              <p>
                The PN collects data, reinforces teaching the RN has already given, contributes to the plan of care and reports changes. When an option has the PN performing the initial assessment, writing the teaching plan or managing an unstable client alone, it is usually the wrong one. The right answer is often to gather the data and notify the RN.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the priority rules</h3>
              <p>
                Airway, breathing, circulation. Acute before chronic, unstable before stable, actual before potential, physical before psychosocial. Most &quot;which client first&quot; and &quot;what first&quot; questions fall to one of these, so say the rule out loud before you pick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who can do what</h3>
              <p>
                The RN assesses, teaches, evaluates and handles the unstable client. The PN gives most medications and cares for stable clients with expected outcomes, and assigns routine tasks such as vital signs on stable clients, hygiene and ambulation to assistive personnel. Coordinated Care questions test that line in both directions: what you take from the RN and what you hand to AP.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Treat every SATA option as true or false, then drill your weakest area</h3>
              <p>
                Read every select all that apply option against the stem as its own true or false question, and do not hunt for a set number of answers. Tigertest shows practice scores by Client Needs category: review the rationales in the area you miss most, then use Practice Test 2 to check your progress on a separate set of questions. These scores do not predict your result on the real adaptive exam. Practical nursing programs can assign Tigertest as a class and see what the class misses most, free, at <Link href="/teach" className="text-brand-dark underline">/teach</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCLEX-PN Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nclexpn" />
        </div>
      </div>

      <ExamRelatedTests examId="nclexpn" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your NCLEX-PN Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all eight Client Needs areas, written for the LPN/LVN.</p>
          <ExamLandingCTA dashboardHref="/nclex-pn/dashboard" />
        </div>
      </div>
    </div>
  );
}
