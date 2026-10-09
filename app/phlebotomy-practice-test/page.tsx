import { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Phlebotomy Practice Test 2026 - NHA CPT Exam Prep";
const description =
  "Free phlebotomy practice tests with 200 questions weighted to the NHA CPT test plan: routine blood collections, safety and compliance, patient preparation, processing and special collections. Order of draw, technique and complications with explanations. Also covers ASCP PBT and AMT RPT.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "phlebotomy practice test, NHA CPT practice test, phlebotomy exam questions, order of draw quiz, certified phlebotomy technician exam prep, ASCP PBT practice test, phlebotomy test 2026, free phlebotomy practice questions",
  alternates: {
    canonical: `${siteUrl}/phlebotomy-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/phlebotomy-practice-test`,
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
      name: "TigerTest - Free Phlebotomy Practice Tests",
      description,
      url: `${siteUrl}/phlebotomy-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 phlebotomy practice questions",
        "4 practice tests weighted to the NHA CPT test plan",
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
          name: "How many questions are on the NHA phlebotomy exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The NHA CPT exam has 120 multiple-choice questions, 100 scored and 20 unscored pretest items, with 2 hours to finish. It is scored on a scale of 200 to 500 and 390 is passing. About 70 percent correct is a safe target.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the phlebotomy exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Five domains: Routine Blood Collections 28 percent, Safety and Compliance 26 percent, Patient Preparation 20 percent, Processing 14 percent and Special Collections 12 percent. Order of draw, tube additives, venipuncture technique, complications, OSHA and HIPAA, specimen handling and blood cultures come up most.",
          },
        },
        {
          "@type": "Question",
          name: "Does this work for the ASCP PBT or AMT RPT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The three certifications test the same CLSI-based phlebotomy practice, so the content carries over. Only the weighting differs, and this bank follows the NHA CPT test plan.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest phlebotomy practice test free?",
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
  { name: "Routine Blood Collections", weight: "28%" },
  { name: "Safety & Compliance", weight: "26%" },
  { name: "Patient Preparation", weight: "20%" },
  { name: "Processing", weight: "14%" },
  { name: "Special Collections", weight: "12%" },
];

export default function PhlebotomyLandingPage() {
  return (
    <div data-theme="phleb" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Phlebotomy Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/phlebotomy/dashboard"
            shortName="Phlebotomy"
            subtitle="200 questions weighted to the NHA CPT test plan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phleb-mobile.png", desktop: "/landing/phleb-desktop.png" }}
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
                Four sets that follow the NHA test plan: routine collections, safety and compliance,
                patient preparation, and processing with special collections. Questions you miss come
                back until you have mastered them.
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
                Four 50-question tests weighted like the real exam and written in its style: a patient,
                a draw, a problem, and the one thing the phlebotomist should do next.
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
                Built on the NHA CPT Test Plan
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The National Healthcareer Association publishes the weighting of its five domains.
                Every practice test here follows that weighting, and the technique questions follow
                the CLSI standards every certifying body uses.
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
            The phlebotomy practice test is brand new. If a question looks wrong or your program
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
            How to Pass the Phlebotomy Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Own the order of draw</h3>
              <p>
                Blood cultures, light blue, red, gold, green, lavender, gray. Know the additive, the
                inversion count and the common tests for each tube, and why the order matters: additive
                carryover changes results. The capillary order is different, and the exam asks about it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                21 gauge for routine draws, 15 to 30 degree insertion, tourniquet no more than one
                minute, lancet no deeper than 2.0 millimeters, 8 to 12 hour fasts, two identifiers,
                two attempts. The exam tests these as plain recall and inside scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think safety and scope</h3>
              <p>
                Safety and compliance is a quarter of the exam. The right answer almost always keeps
                the patient and you safe, protects privacy, and stays within scope: you do not interpret
                results, you do not force a draw, and you always report a needlestick.
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
          Phlebotomy Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the NHA phlebotomy exam?</h3>
            <p className="text-gray-600">
              The NHA CPT exam has 120 multiple-choice questions, 100 scored and 20 unscored pretest
              items, with 2 hours to finish. It is scored on a scale of 200 to 500 and 390 is passing.
              About 70 percent correct is a safe target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the phlebotomy exam?</h3>
            <p className="text-gray-600">
              Five domains: Routine Blood Collections 28 percent, Safety and Compliance 26 percent,
              Patient Preparation 20 percent, Processing 14 percent and Special Collections 12 percent.
              Order of draw, tube additives, venipuncture technique, complications, OSHA and HIPAA,
              specimen handling and blood cultures come up most.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this work for the ASCP PBT or AMT RPT exam?</h3>
            <p className="text-gray-600">
              Yes. The three certifications test the same CLSI-based phlebotomy practice, so the content
              carries over. Only the weighting differs, and this bank follows the NHA CPT test plan.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest phlebotomy practice test free?</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Phlebotomy Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every domain.</p>
          <ExamLandingCTA dashboardHref="/phlebotomy/dashboard" />
        </div>
      </div>
    </div>
  );
}
