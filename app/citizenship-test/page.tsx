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

const siteUrl = SITE_URL;

const title = "Free US Citizenship Test Practice - 2025 Civics Test";
const metaDescription =
  "Free practice for the 2025 USCIS civics test: 200 multiple-choice items with explanations. Review the official questions before your citizenship interview.";
const description =
  "Free multiple-choice study for the 2025 USCIS civics test. Use 200 adapted items with explanations. Review the official questions and your local answers before the oral interview.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "citizenship test practice, civics test practice, USCIS civics test 2025, naturalization test questions, 128 civics questions, US citizenship test questions and answers, N-400 civics test",
  alternates: {
    canonical: `${siteUrl}/citizenship-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/citizenship-test`,
    images: [{ url: shareImageUrl("civics"), width: 1200, height: 630, alt: "Tigertest free Citizenship practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("civics")],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the US citizenship civics test?",
    a: "On the 2025 test the officer asks up to 20 questions from the official list of 128, and you must answer 12 correctly. The test stops as soon as you reach 12 correct or 9 incorrect. Applications filed before October 20, 2025 take the 2008 version: 10 questions from 100, 6 to pass.",
  },
  {
    q: "Is the civics test multiple choice?",
    a: "No. The USCIS civics test is oral. Tigertest uses adapted multiple-choice study items. Practice saying the required answers without the options. Review the official list and prepare your own current and local answers.",
  },
  {
    q: "What is the 65/20 exception?",
    a: "Qualifying applicants age 65 or older with at least 20 years as lawful permanent residents study the 20 starred questions from their applicable 2008 or 2025 list. Check the filing-time eligibility rules with USCIS. You are asked 10 and need 6 correct, and may use your chosen language. Tigertest does not provide a dedicated 65/20 mode.",
  },
  {
    q: "Do the answers change?",
    a: "Some answers depend on who holds office at your interview. Check the President, Vice President, Speaker, Chief Justice, your senator, your U.S. representative, and your governor. Also learn your state capital. Tigertest uses D.C. or territory examples for the four local questions; prepare your own answers using USCIS resources.",
  },
  {
    q: "Is the Tigertest citizenship practice test free?",
    a: "Yes. All four practice tests and all four training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free US Citizenship Civics Test Practice",
      description,
      url: `${siteUrl}/citizenship-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Practice based on USCIS 2025 civics topics",
        "200 multiple-choice practice items",
        "4 practice tests and 4 training sets, one per test",
        "Explanations with accepted-answer examples",
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
        classFaqJsonLd("civics"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "System of Government", weight: "47 of 128" },
  { name: "Recent American History", weight: "19 of 128" },
  { name: "Colonial Period & Independence", weight: "17 of 128" },
  { name: "Principles of American Government", weight: "15 of 128" },
  { name: "Rights & Responsibilities", weight: "10 of 128" },
  { name: "1800s", weight: "10 of 128" },
  { name: "Symbols & Holidays", weight: "10 of 128" },
];

export default function CitizenshipLandingPage() {
  return (
    <div data-theme="civics" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free US Citizenship Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/citizenship/dashboard"
            shortName="citizenship"
            subtitle="200 adapted study items for the 2025 civics test. Review your local answers and practice speaking before the interview. No account needed."
            shots={{ mobile: "/landing/civics-mobile.png", desktop: "/landing/civics-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="civics" />

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
                1, and so on. Master the set, then take its test. Read the explanations, then review the
                official list and prepare your own local answers.
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
                Four 50-question tests drawn from every section in the list&apos;s own proportions.
                The pass line is 60 percent, the same as the real test&apos;s 12 of 20.
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
                Built on the Official 2025 USCIS List
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                USCIS publishes the 128 questions and their acceptable answers. Every practice item here
                comes from that list, and the tests draw from each section in these proportions.
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
                src={getTigerAsset("civics", 1)}
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
            How to Pass the Civics Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know which version you take</h3>
              <p>
                Applications filed on or after October 20, 2025 get the 2025 test: up to 20 questions
                from the list of 128, 12 correct to pass, and the officer stops at 12 right or 9 wrong.
                Applications filed before that date get the 2008 test: 10 questions from a list of 100,
                6 correct to pass.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the answers, not just the questions</h3>
              <p>
                The real test is oral, so you must produce the answer yourself. Use the training sets
                until you can say the answer before you see the options, and read the explanations for
                the other acceptable answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Start with government and history</h3>
              <p>
                System of Government is 47 of the 128 questions and history is another 46. Together
                they are nearly three quarters of what the officer can ask.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Check for updated answers before your interview</h3>
              <p>
                Check the President, Vice President, Speaker, and Chief Justice before your interview.
                Also prepare your own current senator, U.S. representative, governor, and state capital answers.
                The local questions in this practice bank use D.C. or territory examples.
                Use uscis.gov/citizenship/testupdates and the official question list to prepare your own answers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Citizenship Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="civics" />
        </div>
      </div>

      <ExamRelatedTests examId="civics" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Naturalization Interview?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 adapted study items for the 2025 civics test.</p>
          <ExamLandingCTA dashboardHref="/citizenship/dashboard" />
        </div>
      </div>
    </div>
  );
}
