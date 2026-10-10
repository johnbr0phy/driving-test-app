import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Real Estate Practice Test 2026 - National Salesperson Exam Prep";
const description =
  "Free real estate practice tests with 200 questions weighted to the national salesperson exam outline used by Pearson VUE and PSI: property, ownership and title, contracts and agency, practice and fair housing, disclosures, financing and real estate math with worked solutions.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "real estate practice test, real estate exam prep, national real estate exam practice questions, real estate salesperson exam 2026, PSI real estate practice test, Pearson VUE real estate exam, real estate math practice, free real estate practice exam",
  alternates: {
    canonical: `${siteUrl}/real-estate-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/real-estate-practice-test`,
    images: [{ url: "/og/realestate", width: 1200, height: 630, alt: "TigerTest free Real Estate practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/realestate"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Real Estate Practice Tests",
      description,
      url: `${siteUrl}/real-estate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 real estate practice questions",
        "4 practice tests weighted to the national salesperson outline",
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
          name: "How many questions are on the real estate exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The national portion is 80 scored questions on Pearson VUE (plus 5 unscored pretest items) and a similar count on PSI. Your state portion adds 30 to 50 more. Most states give about 2 to 4 hours for both and pass the national portion at 70 to 75 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover my state's exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It covers the national portion, which is the same in every Pearson VUE or PSI state. The state portion (license law, agency rules, state contract forms) is separate, and no question here states one state's rule as universal.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a lot of math on the real estate exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "About 7 of the 80 national questions are pure calculations, and math also appears inside valuation, financing and contract questions. Memorize 43,560 square feet per acre and 5,280 feet per mile; the exam provides a calculator and tells you whether to use 360 or 365 days.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as the broker exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The broker exam uses a similar outline with more weight on brokerage operations and practice and a 75 percent pass line. Salesperson candidates should use this bank; broker candidates will find most of the content applies but should expect deeper management questions.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest real estate practice test free?",
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
  { name: "Contracts & Agency", weight: "20%" },
  { name: "Property Characteristics, Descriptions & Use", weight: "14%" },
  { name: "Property Value & Appraisal", weight: "14%" },
  { name: "Real Estate Practice", weight: "12%" },
  { name: "Ownership, Transfer & Title", weight: "11%" },
  { name: "Disclosures & Environmental Issues", weight: "11%" },
  { name: "Financing & Settlement", weight: "9%" },
  { name: "Real Estate Math", weight: "9%" },
];

export default function RealestateLandingPage() {
  return (
    <div data-theme="realestate" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="realestate" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Real Estate Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/real-estate/dashboard"
            shortName="Real Estate"
            subtitle="200 questions weighted to the national salesperson exam outline. Worked math on every calculation. No account needed."
            shots={{ mobile: "/landing/realestate-mobile.png", desktop: "/landing/realestate-desktop.png" }}
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
                Four sets covering all eight outline areas: property, ownership and title; contracts and agency; practice, disclosures and financing; and valuation with real estate math. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the national exam and written in its style: a seller, a buyer, an agent and a question about who owes what to whom, plus the math with every step shown.
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
                Built on the National Exam Outline
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Pearson VUE and PSI publish the content outline for the national portion of the salesperson exam, and the two match closely. Every practice test here follows that weighting. The state law portion is separate and not covered.
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
                src={getTigerAsset("realestate", 1)}
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
            The real estate practice test is brand new. If a question looks wrong or your state teaches it differently, tell us.
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
            How to Pass the Real Estate Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the vocabulary as pairs</h3>
              <p>
                Mortgagor and mortgagee, grantor and grantee, lessor and lessee, optionor and optionee, vendor and vendee. Half the exam is knowing which party is which and what each one owes. Fee simple, life estate, joint tenancy and tenancy in common come up every time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do the math on paper</h3>
              <p>
                Acres from square feet (43,560), commission splits, net to the seller, cap rates, mill rates, prorations, points and LTV. The exam gives you a calculator and tells you the day count. Every math question here shows the arithmetic in its explanation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think agency and fair housing first</h3>
              <p>
                When a scenario asks what the licensee should do, the answer is the one that keeps the fiduciary duties to the client, discloses material facts to everyone, and never steers, blockbusts or redlines. Nothing you learn here is a single state&apos;s rule.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Then study your state portion separately</h3>
              <p>
                This bank covers the national portion only. Your state exam adds license law, commission rules, agency disclosure forms and state-specific contract rules. Clear 75 percent here with room to spare, then study your state&apos;s candidate handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Real Estate Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the real estate exam?</h3>
            <p className="text-gray-600">
              The national portion is 80 scored questions on Pearson VUE (plus 5 unscored pretest items) and a similar count on PSI. Your state portion adds 30 to 50 more. Most states give about 2 to 4 hours for both and pass the national portion at 70 to 75 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover my state&apos;s exam?</h3>
            <p className="text-gray-600">
              It covers the national portion, which is the same in every Pearson VUE or PSI state. The state portion (license law, agency rules, state contract forms) is separate, and no question here states one state&apos;s rule as universal.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is there a lot of math on the real estate exam?</h3>
            <p className="text-gray-600">
              About 7 of the 80 national questions are pure calculations, and math also appears inside valuation, financing and contract questions. Memorize 43,560 square feet per acre and 5,280 feet per mile; the exam provides a calculator and tells you whether to use 360 or 365 days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this the same as the broker exam?</h3>
            <p className="text-gray-600">
              No. The broker exam uses a similar outline with more weight on brokerage operations and practice and a 75 percent pass line. Salesperson candidates should use this bank; broker candidates will find most of the content applies but should expect deeper management questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest real estate practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="realestate" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Real Estate Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every outline area.</p>
          <ExamLandingCTA dashboardHref="/real-estate/dashboard" />
        </div>
      </div>
    </div>
  );
}
