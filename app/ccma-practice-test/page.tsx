import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CCMA Practice Test 2026 - NHA Clinical Medical Assistant Exam Prep";
const description =
  "Free CCMA practice tests with 200 questions weighted to the NHA CCMA test plan: vitals and intake, general patient care, infection control, lab and point-of-care testing, phlebotomy, EKG, care coordination, administrative assisting, communication, and medical law and ethics. Instant feedback with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CCMA practice test, NHA CCMA practice exam, clinical medical assistant exam questions, medical assistant certification practice test, CCMA exam prep 2026, free CCMA practice questions, medical assistant test",
  alternates: {
    canonical: `${siteUrl}/ccma-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/ccma-practice-test`,
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
      name: "TigerTest - Free CCMA Practice Tests",
      description,
      url: `${siteUrl}/ccma-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CCMA practice questions",
        "4 practice tests weighted to the NHA CCMA test plan",
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
          name: "How many questions are on the CCMA exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The NHA CCMA exam has 180 multiple-choice questions, 150 scored and 30 unscored pretest items, with 3 hours to finish. It is scored on a scale of 200 to 500 and 390 is passing. About 75 percent correct is a safe target.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the CCMA exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Seven domains: Clinical Patient Care 56 percent (intake and vitals, general care, infection control and safety, point-of-care testing and lab, phlebotomy, EKG), Foundational Knowledge 10 percent, Patient Care Coordination and Education 8 percent, Administrative Assisting 8 percent, Communication and Customer Service 8 percent, Anatomy and Physiology 5 percent, and Medical Law and Ethics 5 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover the CMA (AAMA) or RMA exam too?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mostly. The CMA from AAMA and the RMA from AMT test the same clinical, administrative and general knowledge, with more weight on administrative work. This bank follows the NHA CCMA test plan, which is the most clinical of the three.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest CCMA practice test free?",
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
  { name: "Clinical Patient Care", weight: "56%" },
  { name: "Foundational Knowledge & Basic Science", weight: "10%" },
  { name: "Patient Care Coordination & Education", weight: "8%" },
  { name: "Administrative Assisting", weight: "8%" },
  { name: "Communication & Customer Service", weight: "8%" },
  { name: "Anatomy & Physiology", weight: "5%" },
  { name: "Medical Law & Ethics", weight: "5%" },
];

export default function CcmaLandingPage() {
  return (
    <div data-theme="ccma" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CCMA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccma/dashboard"
            shortName="CCMA"
            subtitle="200 questions weighted to the NHA CCMA test plan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ccma-mobile.png", desktop: "/landing/ccma-desktop.png" }}
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
                Four sets covering all seven NHA domains: foundations and anatomy, intake and patient
                care, infection control with lab, phlebotomy and EKG, and coordination, admin,
                communication and law. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the real exam and written in its style: a patient
                in the exam room, a situation, and the one thing the medical assistant should do next.
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
                Built on the NHA CCMA Test Plan
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The National Healthcareer Association publishes the weighting of its seven domains, and
                clinical patient care is more than half. Every practice test here follows that
                weighting, with the clinical half split across its six subareas.
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
                src={getTigerAsset("ccma", 1)}
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
            The CCMA practice test is brand new. If a question looks wrong or your program
            teaches it differently, tell us.
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
            How to Pass the CCMA Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Put your hours into clinical care</h3>
              <p>
                Clinical patient care is 56 percent of the exam. Vital signs, injections, positioning,
                sterile technique, office emergencies, infection control, specimen collection, order of
                draw and EKG lead placement are where the points are. The two clinical sets drill all of it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                Normal vital sign ranges, blood pressure categories, injection angles and gauges, autoclave
                settings, fasting times, glucose and A1c cutoffs, EKG paper speed. The exam tests these as
                plain recall and inside scenarios, and every calculation here shows its working.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think scope and safety</h3>
              <p>
                The right answer almost always keeps the patient safe, protects privacy, and stays within
                the medical assistant&apos;s scope: you do not diagnose, interpret results for the patient,
                authorize refills or give medical advice. When in doubt, the answer is to notify the provider.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain</h3>
              <p>
                TigerTest tracks your accuracy by domain. After each practice test, go back to the set
                you missed most and retake until you clear 70 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CCMA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the CCMA exam?</h3>
            <p className="text-gray-600">
              The NHA CCMA exam has 180 multiple-choice questions, 150 scored and 30 unscored pretest
              items, with 3 hours to finish. It is scored on a scale of 200 to 500 and 390 is passing.
              About 75 percent correct is a safe target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the CCMA exam?</h3>
            <p className="text-gray-600">
              Seven domains: Clinical Patient Care 56 percent (intake and vitals, general care, infection
              control and safety, point-of-care testing and lab, phlebotomy, EKG), Foundational Knowledge
              10 percent, Patient Care Coordination and Education 8 percent, Administrative Assisting 8
              percent, Communication and Customer Service 8 percent, Anatomy and Physiology 5 percent,
              and Medical Law and Ethics 5 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover the CMA (AAMA) or RMA exam too?</h3>
            <p className="text-gray-600">
              Mostly. The CMA from AAMA and the RMA from AMT test the same clinical, administrative and
              general knowledge, with more weight on administrative work. This bank follows the NHA CCMA
              test plan, which is the most clinical of the three.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest CCMA practice test free?</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your CCMA Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every domain.</p>
          <ExamLandingCTA dashboardHref="/ccma/dashboard" />
        </div>
      </div>
    </div>
  );
}
