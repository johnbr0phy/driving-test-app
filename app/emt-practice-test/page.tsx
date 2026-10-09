import { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free EMT Practice Test 2026 - NREMT Cognitive Exam Prep";
const description =
  "Free NREMT EMT practice tests with 200 questions weighted to the 2025 test plan: scene size-up and safety, primary assessment, secondary assessment, patient treatment and transport, and operations. Scenario questions with vitals and explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "EMT practice test, NREMT practice test, EMT exam questions, NREMT cognitive exam prep, EMT basic practice exam 2026, free NREMT practice questions, EMT test",
  alternates: {
    canonical: `${siteUrl}/emt-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/emt-practice-test`,
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
      name: "TigerTest - Free EMT Practice Tests",
      description,
      url: `${siteUrl}/emt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 EMT practice questions",
        "4 practice tests weighted to the 2025 NREMT test plan",
        "Training sets for every domain",
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
          name: "How many questions are on the NREMT EMT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam is computer adaptive: between 70 and 120 questions in 2 hours, including 10 unscored pilot items. It ends as soon as the computer is 95 percent confident you are above or below the passing standard, so a short exam can be a pass or a fail.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the 2025 NREMT EMT test plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Five domains: Scene Size-up and Safety 15 to 19 percent, Primary Assessment 39 to 43 percent, Secondary Assessment 5 to 9 percent, Patient Treatment and Transport 20 to 24 percent, and Operations 10 to 14 percent. Pediatric, geriatric and obstetric patients appear throughout rather than as a separate section.",
          },
        },
        {
          "@type": "Question",
          name: "Does the real exam have multiple-response questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The 2025 exam added items where you pick two or three correct answers from five or six, along with single-answer questions. Every question here is single-answer, so use these to learn the content and expect a few multiple-response items on exam day.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no percentage. The adaptive exam measures whether you are consistently above the entry-level standard. Aiming for 70 percent or better on every practice test here, across every domain, is a realistic target.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest EMT practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scene Size-up & Safety", weight: "15-19%" },
  { name: "Primary Assessment", weight: "39-43%" },
  { name: "Secondary Assessment", weight: "5-9%" },
  { name: "Patient Treatment & Transport", weight: "20-24%" },
  { name: "Operations", weight: "10-14%" },
];

export default function EmtLandingPage() {
  return (
    <div data-theme="emt" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free EMT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/emt/dashboard"
            shortName="EMT"
            subtitle="200 questions weighted to the 2025 NREMT EMT test plan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/emt-mobile.png", desktop: "/landing/emt-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Four sets covering the five NREMT domains: scene size-up and safety, primary assessment, secondary assessment with operations, and patient treatment and transport. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the real exam and written in its style: a patient with an age, a history and a set of vitals, and the one thing you should do next.
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
                Built on the 2025 NREMT Test Plan
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The National Registry replaced its topic-based outline in April 2025 with five domains organized by the phases of a call. Every practice test here follows that weighting, and clinical content follows the National EMS Education Standards and current AHA guidelines.
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
            The EMT practice test is brand new. If a question looks wrong or your protocols differ, tell us.
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
            How to Pass the NREMT EMT Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Think in the order of the call</h3>
              <p>
                The 2025 exam is organized by what you do first: size up the scene, find and fix life threats in the primary assessment, then dig deeper. When two answers look right, the one that comes earlier in that order, or the one that addresses airway, breathing and circulation, is usually it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                Vital sign ranges by age, 30:2 and 15:2, 100 to 120 compressions a minute, 10 seconds of suction, 1 breath every 6 seconds, 0.3 and 0.15 mg of epinephrine, 162 to 324 mg of aspirin, 2 inches of compression depth. The exam tests these inside scenarios, and the explanations here spell them out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Stay inside the EMT scope</h3>
              <p>
                The right answer is something an EMT can do: oxygen, ventilation, bleeding control, splinting, a short list of medications, and transport. If an option is an ALS skill or a diagnosis, it is a distractor. When in doubt, request ALS and transport.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain</h3>
              <p>
                TigerTest tracks your accuracy by domain. The real exam is adaptive and ends when it is confident about you, so there is no room to be weak in a domain. Retake each set until you clear 70 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          NREMT EMT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the NREMT EMT exam?</h3>
            <p className="text-gray-600">
              The exam is computer adaptive: between 70 and 120 questions in 2 hours, including 10 unscored pilot items. It ends as soon as the computer is 95 percent confident you are above or below the passing standard, so a short exam can be a pass or a fail.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the 2025 NREMT EMT test plan?</h3>
            <p className="text-gray-600">
              Five domains: Scene Size-up and Safety 15 to 19 percent, Primary Assessment 39 to 43 percent, Secondary Assessment 5 to 9 percent, Patient Treatment and Transport 20 to 24 percent, and Operations 10 to 14 percent. Pediatric, geriatric and obstetric patients appear throughout rather than as a separate section.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does the real exam have multiple-response questions?</h3>
            <p className="text-gray-600">
              Yes. The 2025 exam added items where you pick two or three correct answers from five or six, along with single-answer questions. Every question here is single-answer, so use these to learn the content and expect a few multiple-response items on exam day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600">
              There is no percentage. The adaptive exam measures whether you are consistently above the entry-level standard. Aiming for 70 percent or better on every practice test here, across every domain, is a realistic target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest EMT practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the NREMT?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/emt/dashboard" />
        </div>
      </div>
    </div>
  );
}
