import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free US Citizenship Test Practice 2026 - All 128 Civics Questions";
const description =
  "Free practice for the USCIS naturalization civics test. All 128 official 2025 questions as multiple choice, with the acceptable answers explained. Government, history, symbols and holidays, with instant feedback.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "citizenship test practice, civics test practice, USCIS civics test 2025, naturalization test questions, 128 civics questions, US citizenship test questions and answers, N-400 civics test",
  alternates: {
    canonical: `${siteUrl}/citizenship-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/citizenship-test`,
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
      name: "TigerTest - Free US Citizenship Civics Test Practice",
      description,
      url: `${siteUrl}/citizenship-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "All 128 official USCIS 2025 civics questions",
        "200 multiple-choice practice items",
        "4 practice tests and 4 training sets by section",
        "Every acceptable answer explained",
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
          name: "How many questions are on the US citizenship civics test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On the 2025 civics test the USCIS officer asks up to 20 questions from the official list of 128, and you must answer 12 correctly. The test stops as soon as you reach 12 correct or 9 incorrect. It applies to naturalization applications filed on or after October 20, 2025; earlier applicants take the 2008 version with 100 questions, 10 asked and 6 to pass.",
          },
        },
        {
          "@type": "Question",
          name: "Is the civics test multiple choice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It is an oral test: the officer asks the question and you answer in your own words. Multiple-choice practice is still the fastest way to learn the 128 answers, and every explanation here lists the other acceptable answers so you can use any of them at the interview.",
          },
        },
        {
          "@type": "Question",
          name: "What is the 65/20 exception?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you are 65 or older and have been a permanent resident for 20 years or more, you study only the 20 questions marked with an asterisk on the official list, are asked 10 of them, and must answer 6 correctly. You may also take the test in the language of your choice.",
          },
        },
        {
          "@type": "Question",
          name: "Do the answers change?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Some do. Questions about the President, Vice President, Speaker of the House, Chief Justice, your governor and your senators depend on who holds office at your interview. Check uscis.gov/citizenship/testupdates before your interview.",
          },
        },
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
    <div data-theme="civics" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free US Citizenship Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/citizenship/dashboard"
            shortName="citizenship"
            subtitle="All 128 official USCIS civics questions as practice. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/civics-mobile.png", desktop: "/landing/civics-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Section</h3>
              <p className="text-gray-600">
                Four sets that follow the official list: principles and rights, system of government,
                American history, symbols and holidays. Questions you miss come back until you have
                mastered them, and every explanation lists all the acceptable answers.
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
                Four 50-question tests drawn from every section in the list&apos;s own proportions.
                The pass line is 60 percent, the same as the real test&apos;s 12 of 20.
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
                Built on the Official 2025 USCIS List
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                USCIS publishes the 128 questions and their acceptable answers. Every practice item here
                comes from that list, and the tests draw from each section in these proportions.
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
                src={getTigerAsset("civics", 1)}
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
            The citizenship practice test is brand new. If a question looks wrong or an answer has
            changed, tell us.
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
            How to Pass the Civics Test
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know which version you take</h3>
              <p>
                Applications filed on or after October 20, 2025 get the 2025 test: up to 20 questions
                from the list of 128, 12 correct to pass, and the officer stops at 12 right or 9 wrong.
                Applications filed before that date get the 2008 test: 10 questions from a list of 100,
                6 correct to pass.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the answers, not just the questions</h3>
              <p>
                The real test is oral, so you must produce the answer yourself. Use the training sets
                until you can say the answer before you see the options, and read the explanations for
                the other acceptable answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Start with government and history</h3>
              <p>
                System of Government is 47 of the 128 questions and history is another 46. Together
                they are nearly three quarters of what the officer can ask.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Check for updated answers before your interview</h3>
              <p>
                The names of the President, Vice President, Speaker, Chief Justice, your governor and
                your senators change with elections and appointments. Visit
                uscis.gov/citizenship/testupdates the week of your interview.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Citizenship Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the US citizenship civics test?</h3>
            <p className="text-gray-600">
              On the 2025 test the officer asks up to 20 questions from the official list of 128, and you
              must answer 12 correctly. The test stops as soon as you reach 12 correct or 9 incorrect.
              Applications filed before October 20, 2025 take the 2008 version: 10 questions from 100,
              6 to pass.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the civics test multiple choice?</h3>
            <p className="text-gray-600">
              No. It is an oral test: the officer asks and you answer in your own words. Multiple-choice
              practice is still the fastest way to learn the 128 answers, and every explanation here lists
              the other acceptable answers so you can use any of them at the interview.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is the 65/20 exception?</h3>
            <p className="text-gray-600">
              If you are 65 or older and have been a permanent resident for 20 years or more, you study
              only the 20 questions marked with an asterisk on the official list, are asked 10 of them, and
              must answer 6 correctly. You may also take the test in the language of your choice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest citizenship practice test free?</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready for Your Naturalization Interview?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. All 128 official questions.</p>
          <ExamLandingCTA dashboardHref="/citizenship/dashboard" />
        </div>
      </div>
    </div>
  );
}
