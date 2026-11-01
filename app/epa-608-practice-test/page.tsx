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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free EPA 608 Practice Test 2026 - Core & Universal";
const metaDescription =
  "Free EPA 608 practice tests: 200 questions across Core, Type I, Type II and Type III, with recovery levels, the 2024 HFC rules and the real 72% pass line.";
const description =
  "Free EPA Section 608 practice tests with 200 questions across Core, Type I, Type II and Type III. Ozone rules, recovery levels, evacuation, safety and the 2024 HFC rules, with instant feedback and the real 72% pass line.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "EPA 608 practice test, EPA 608 universal practice test, EPA 608 core exam, Type I Type II Type III practice test, refrigerant certification exam, HVAC EPA test questions, section 608 study guide",
  alternates: {
    canonical: `${siteUrl}/epa-608-practice-test`,
    languages: examLandingAlternates("epa608"),
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/epa-608-practice-test`,
    images: [{ url: shareImageUrl("epa608"), width: 1200, height: 630, alt: "Tigertest free EPA 608 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("epa608")],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the EPA 608 exam?",
    a: "Each section has 25 multiple-choice questions and you need 18 correct, 72 percent. Core is required for any certification. Core plus one type gives that type; Core plus all three gives Universal, 100 questions in total.",
  },
  {
    q: "What is the difference between Type I, II and III?",
    a: "Type I covers small appliances with 5 pounds or less of refrigerant, such as refrigerators and window units. Type II covers high-pressure appliances such as split systems and commercial refrigeration. Type III covers low-pressure appliances, mainly centrifugal chillers. Universal covers all three.",
  },
  {
    q: "Is the EPA 608 exam open book?",
    a: "Some providers offer Type I as an open-book online test, but Type II, Type III and Universal must be taken proctored and closed book. Check with your testing organization, since the rules depend on the provider.",
  },
  {
    q: "Is the Tigertest EPA 608 practice test free?",
    a: "Yes. All four training sets and all four mixed practice tests are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free EPA 608 Practice Tests",
      description,
      url: `${siteUrl}/epa-608-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 EPA 608 practice questions",
        "Training sets for Core, Type I, Type II and Type III",
        "4 mixed practice tests at the real 72% pass line",
        "Explanations that cite 40 CFR Part 82",
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
        classFaqJsonLd("epa608"),
      ],
    },
  ],
};

const sections = [
  { name: "Core", detail: "Ozone, regulations, recovery, safety, shipping · required for everyone", questions: 72 },
  { name: "Type I: Small Appliances", detail: "5 lb or less: refrigerators, window units, vending machines", questions: 40 },
  { name: "Type II: High-Pressure", detail: "Split systems, packaged units, commercial refrigeration", questions: 52 },
  { name: "Type III: Low-Pressure", detail: "Centrifugal chillers running in a vacuum", questions: 36 },
];

export default function Epa608LandingPage() {
  return (
    <div data-theme="epa608" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free EPA 608 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/epa-608/dashboard"
            shortName="EPA 608"
            subtitle="Core, Type I, II and III. 200 questions at the real 72% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/epa608-mobile.png", desktop: "/landing/epa608-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="epa608" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">One Set per Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Taking Type II only? Train Core and Type II. Each set is one section of the real exam,
                and questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests across all four sections at the real 72 percent pass line.
                Built for Universal candidates who want everything at once.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                The Four Sections of the EPA 608 Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every section is 25 questions, 18 to pass. Core is on every certification; the type
                sections add the equipment you will service.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <div>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">{s.detail}</span>
                    </div>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{s.questions} questions</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("epa608", 1)}
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
            How to Pass the EPA 608 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Decide which certification you need</h3>
              <p>
                Type I for small appliances, Type II for high-pressure systems like split ACs and
                commercial refrigeration, Type III for low-pressure chillers. Most HVAC technicians go
                straight for Universal, which is Core plus all three types.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers</h3>
              <p>
                Recovery levels by appliance size and type, 500 microns, 80 percent cylinder fill,
                the 30, 20 and 10 percent leak rates with 30 days to repair, 125 F cylinder limit,
                the 1992 and 1995 venting dates, the 2020 R-22 phase-out and the AIM Act HFC rules.
                The Core set drills them all.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know what appears on every section</h3>
              <p>
                Safety, shipping, refrigerant identification and the regulations show up in every
                section, not just Core. If you only study the type section, you will lose those points.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                Tigertest tracks your accuracy by section. After each mixed test, go back to the set you
                missed most and retake until you clear 72 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          EPA 608 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="epa608" />
        </div>
      </div>

      <ExamRelatedTests examId="epa608" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Go Universal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four sections.</p>
          <ExamLandingCTA dashboardHref="/epa-608/dashboard" />
        </div>
      </div>
    </div>
  );
}
