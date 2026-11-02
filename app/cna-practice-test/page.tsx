import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import { examLandingAlternates } from "@/lib/examSeo";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Free CNA Practice Test 2026 - Nurse Aide Exam Prep";
const metaDescription =
  "Free CNA practice tests: 200 questions on the NNAAP written exam outline, from daily living and basic nursing skills to client rights. Every answer explained.";
const description =
  "Free CNA practice tests with 200 questions weighted to the NNAAP written exam outline: activities of daily living, basic nursing skills, restorative care, psychosocial needs, communication, client rights and the role of the nurse aide. Instant feedback with explanations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CNA practice test, nurse aide practice test, CNA written exam questions, NNAAP practice test, certified nursing assistant exam prep, CNA test 2026, free CNA practice questions",
  alternates: {
    canonical: `${siteUrl}/cna-practice-test`,
    languages: examLandingAlternates("cna"),
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cna-practice-test`,
    images: [{ url: shareImageUrl("cna"), width: 1200, height: 630, alt: "Tigertest free CNA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cna")],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the CNA written exam?",
    a: "On the NNAAP exam used by most states, the written test has 70 multiple-choice questions, 60 scored and 10 unscored, with about 90 minutes to finish. Most states pass at roughly 70 percent, and you must also pass a separate skills evaluation. States that use Prometric or Headmaster have a similar format.",
  },
  {
    q: "What topics does the CNA exam cover?",
    a: "Physical care skills are 61 percent (basic nursing skills 39, activities of daily living 14, restorative skills 8), psychosocial care skills 13 percent, and the role of the nurse aide 26 percent (communication, client rights, legal and ethical behavior, and being a member of the health care team).",
  },
  {
    q: "Does this cover the skills test?",
    a: "No. This prepares you for the written knowledge test. The skills evaluation is a hands-on demonstration of five randomly selected skills, always including handwashing, scored by an evaluator in person.",
  },
  {
    q: "Is the Tigertest CNA practice test free?",
    a: "Yes. All four practice tests and all four training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CNA Practice Tests",
      description,
      url: `${siteUrl}/cna-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CNA practice questions",
        "4 practice tests weighted to the NNAAP outline",
        "4 training sets, one per practice test",
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
        classFaqJsonLd("cna"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basic Nursing Skills", weight: "39%" },
  { name: "Activities of Daily Living", weight: "14%" },
  { name: "Emotional & Mental Health Needs", weight: "11%" },
  { name: "Communication", weight: "8%" },
  { name: "Member of the Health Care Team", weight: "8%" },
  { name: "Restorative Skills", weight: "8%" },
  { name: "Client Rights", weight: "7%" },
  { name: "Legal & Ethical Behavior", weight: "3%" },
  { name: "Spiritual & Cultural Needs", weight: "2%" },
];

export default function CnaLandingPage() {
  return (
    <div data-theme="cna" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CNA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cna/dashboard"
            shortName="CNA"
            subtitle="200 questions weighted to the NNAAP written exam outline. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cna-mobile.png", desktop: "/landing/cna-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cna" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one for each practice test: Set 1 holds exactly the 50 questions of Test
                1, and so on. Master the set, then take its test. Questions you miss come back until you
                have mastered them.
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
                Four 50-question tests weighted like the real exam, written in its style: a resident
                situation and the one thing the nurse aide should do. Basic nursing skills is nearly
                40 percent of every test.
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
                Built on the NNAAP Written Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The National Nurse Aide Assessment Program publishes the weighting of its written
                exam, and most states use it. Every practice test here follows that weighting.
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
                src={getTigerAsset("cna", 1)}
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
            How to Pass the CNA Written Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your state&apos;s format</h3>
              <p>
                Most states use the NNAAP exam from Pearson VUE: 70 multiple-choice questions, 60 scored,
                about 90 minutes, roughly 70 percent to pass, plus a separate skills evaluation. Some
                states use Prometric or Headmaster with a similar outline. Check your state registry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think like the exam</h3>
              <p>
                Almost every question is a situation followed by &quot;the nurse aide should&quot;. The
                right answer is nearly always the one that keeps the resident safe, respects their
                rights and dignity, stays within your scope, and reports to the nurse.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the numbers and the order of things</h3>
              <p>
                Normal vital sign ranges, 20 seconds of handwashing, repositioning every 2 hours,
                restraints checked every 15 minutes and released every 2 hours, bath water at 105 to 115
                degrees, dressing the weak side first. The training sets drill every one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                Tigertest tracks your accuracy by content area. After each practice test, drill the
                questions you missed from the results, retrain that test&apos;s set, and retake until you clear
                70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CNA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cna" />
        </div>
      </div>

      <ExamRelatedTests examId="cna" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your CNA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every content area.</p>
          <ExamLandingCTA dashboardHref="/cna/dashboard" />
        </div>
      </div>
    </div>
  );
}
