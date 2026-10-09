import { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CNA Practice Test 2026 - Nurse Aide Written Exam Prep";
const description =
  "Free CNA practice tests with 200 questions weighted to the NNAAP written exam outline: activities of daily living, basic nursing skills, restorative care, psychosocial needs, communication, client rights and the role of the nurse aide. Instant feedback with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CNA practice test, nurse aide practice test, CNA written exam questions, NNAAP practice test, certified nursing assistant exam prep, CNA test 2026, free CNA practice questions",
  alternates: {
    canonical: `${siteUrl}/cna-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/cna-practice-test`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free CNA Practice Tests",
      description,
      url: `${siteUrl}/cna-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CNA practice questions",
        "4 practice tests weighted to the NNAAP outline",
        "Training sets for every content area",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the CNA written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On the NNAAP exam used by most states, the written test has 70 multiple-choice questions, 60 scored and 10 unscored, with about 90 minutes to finish. Most states pass at roughly 70 percent, and you must also pass a separate skills evaluation. States that use Prometric or Headmaster have a similar format.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the CNA exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Physical care skills are 61 percent (basic nursing skills 39, activities of daily living 14, restorative skills 8), psychosocial care skills 13 percent, and the role of the nurse aide 26 percent (communication, client rights, legal and ethical behavior, and being a member of the health care team).",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover the skills test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. This prepares you for the written knowledge test. The skills evaluation is a hands-on demonstration of five randomly selected skills, always including handwashing, scored by an evaluator in person.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest CNA practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all four training sets are free, with no account required.",
          },
        },
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
    <div data-theme="cna" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
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

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Content Area</h3>
              <p className="text-gray-600">
                Four sets that follow the NNAAP outline: daily living and restorative care, basic
                nursing skills, psychosocial care, and the role of the nurse aide. Questions you miss
                come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests weighted like the real exam, written in its style: a resident
                situation and the one thing the nurse aide should do. Basic nursing skills is nearly
                40 percent of every test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the NNAAP Written Exam Outline
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The National Nurse Aide Assessment Program publishes the weighting of its written
                exam, and most states use it. Every practice test here follows that weighting.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/tiger_face_01.png"
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The CNA practice test is brand new. If a question looks wrong or your state&apos;s exam
            differs, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the CNA Written Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know your state&apos;s format</h3>
              <p>
                Most states use the NNAAP exam from Pearson VUE: 70 multiple-choice questions, 60 scored,
                about 90 minutes, roughly 70 percent to pass, plus a separate skills evaluation. Some
                states use Prometric or Headmaster with a similar outline. Check your state registry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Think like the exam</h3>
              <p>
                Almost every question is a situation followed by &quot;the nurse aide should&quot;. The
                right answer is nearly always the one that keeps the resident safe, respects their
                rights and dignity, stays within your scope, and reports to the nurse.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Learn the numbers and the order of things</h3>
              <p>
                Normal vital sign ranges, 20 seconds of handwashing, repositioning every 2 hours,
                restraints checked every 15 minutes and released every 2 hours, bath water at 105 to 115
                degrees, dressing the weak side first. The basic nursing set drills them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by content area. After each practice test, go back to the
                set you missed most and retake until you clear 70 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CNA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the CNA written exam?</h3>
            <p className="text-gray-600">
              On the NNAAP exam used by most states, 70 multiple-choice questions, 60 scored and 10
              unscored, with about 90 minutes to finish. Most states pass at roughly 70 percent, and you
              must also pass a separate skills evaluation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What topics does the CNA exam cover?</h3>
            <p className="text-gray-600">
              Physical care skills are 61 percent (basic nursing skills 39, activities of daily living
              14, restorative skills 8), psychosocial care skills 13 percent, and the role of the nurse
              aide 26 percent (communication, client rights, legal and ethical behavior, and being a
              member of the health care team).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover the skills test?</h3>
            <p className="text-gray-600">
              No. This prepares you for the written knowledge test. The skills evaluation is a hands-on
              demonstration of five randomly selected skills, always including handwashing, scored by
              an evaluator in person.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest CNA practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all four training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your CNA Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every content area.</p>
          <ExamLandingCTA dashboardHref="/cna/dashboard" />
        </div>
      </div>
    </div>
  );
}
