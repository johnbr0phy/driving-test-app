import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const statePractice = [
  {
    name: "California",
    href: "/real-estate/ca/dashboard",
    body: "150 source-checked questions weighted to the DRE salesperson outline, national topics checked against California law plus California-only rules.",
  },
  {
    name: "New Jersey",
    href: "/real-estate/nj/dashboard",
    body: "110 source-checked questions on the PSI New Jersey outline: 80 general and 30 New Jersey questions.",
  },
  {
    name: "Texas",
    href: "/real-estate/tx/dashboard",
    body: "120 source-checked questions on the Pearson VUE Texas outlines: 80 national and 40 Texas questions, including the 2026 buyer agreement rules.",
  },
  {
    name: "Florida",
    href: "/real-estate/fl/dashboard",
    body: "100 source-checked questions weighted to the DBPR sales associate outline: principles plus Chapter 475, FREC rules, brokerage relationships and Florida math.",
  },
  {
    name: "New York",
    href: "/real-estate/ny/dashboard",
    body: "75 source-checked questions weighted to the 77-hour course: national topics plus license law, agency disclosure, the Human Rights Law and the PCDA.",
  },
  // state variants batch 2 (generated)
  {
    name: "Pennsylvania",
    href: "/real-estate/pa/dashboard",
    body: "120 source-checked questions on the Pearson VUE outlines: 80 national and 40 Pennsylvania questions on licensing, agency and the Consumer Notice, escrow and seller disclosure.",
  },
  {
    name: "Illinois",
    href: "/real-estate/il/dashboard",
    body: "140 source-checked questions like the PSI broker exam: 100 national and 40 Illinois questions on the License Act, IDFPR rules and Illinois disclosure laws.",
  },
  {
    name: "Ohio",
    href: "/real-estate/oh/dashboard",
    body: "120 source-checked questions like the PSI exam: 80 national and 40 Ohio questions on license law, commission rules and Ohio agency law, including the 2025 written agency agreement rule.",
  },
  {
    name: "Georgia",
    href: "/real-estate/ga/dashboard",
    body: "150 source-checked questions shaped like the PSI exam: 99 national and 51 Georgia questions on license law, the brokerage relationships act, security deeds and Georgia closings.",
  },
  {
    name: "North Carolina",
    href: "/real-estate/nc/dashboard",
    body: "140 source-checked questions like the real broker exam: 80 national and 60 North Carolina questions on License Law and Commission rules, agency, trust accounts and disclosure.",
  },
  {
    name: "Michigan",
    href: "/real-estate/mi/dashboard",
    body: "115 source-checked questions like the PSI exam: 80 national and 35 Michigan questions on license law, agency, trust accounts, seller disclosure and Elliott-Larsen.",
  },
  {
    name: "Virginia",
    href: "/real-estate/va/dashboard",
    body: "120 source-checked questions like the PSI exam: 80 national and 40 Virginia questions on license law, Board regulations (rewritten April 2026), disclosures, agency and fair housing.",
  },
  {
    name: "Washington",
    href: "/real-estate/wa/dashboard",
    body: "130 source-checked questions like the PSI broker exam: 100 national and 30 Washington questions on RCW 18.85, the brokerage relationships act and DOL rules.",
  },
  {
    name: "Arizona",
    href: "/real-estate/az/dashboard",
    body: "140 source-checked questions on the Pearson VUE outlines: 80 national and 60 Arizona questions, from the Commissioner's Rules and agency to community property and trustee's sales.",
  },
  {
    name: "Tennessee",
    href: "/real-estate/tn/dashboard",
    body: "120 source-checked questions like the PSI affiliate broker exam: 80 national and 40 Tennessee questions on the Broker License Act and TREC rules.",
  },
  // end batch 2
];

const title = "Free Real Estate Practice Test 2026 - National Exam";
const metaDescription =
  "Free real estate practice tests: 200 questions on the national salesperson exam outline, from ownership and contracts to financing and real estate math.";
const description =
  "Free real estate practice tests with 200 questions weighted to the national salesperson exam outline used by Pearson VUE and PSI: property, ownership and title, contracts and agency, practice and fair housing, disclosures, financing and real estate math with worked solutions.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "real estate practice test, real estate exam prep, national real estate exam practice questions, real estate salesperson exam 2026, PSI real estate practice test, Pearson VUE real estate exam, real estate math practice, free real estate practice exam",
  alternates: {
    canonical: `${siteUrl}/real-estate-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/real-estate-practice-test`,
    images: [{ url: shareImageUrl("realestate"), width: 1200, height: 630, alt: "Tigertest free Real Estate practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("realestate")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Real Estate Practice Tests",
      description,
      url: `${siteUrl}/real-estate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 real estate practice questions",
        "4 practice tests weighted to the national salesperson outline",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
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
            text: "Fifteen states have their own practice with state law: Arizona, California, Florida, Georgia, Illinois, Michigan, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Tennessee, Texas, Virginia and Washington. Each is one full-length exam shaped like that state's, and progress is saved separately per state. For other states, the 200-question bank covers the national portion, which is the same in every Pearson VUE or PSI state; your state law portion is separate and not covered yet.",
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
          name: "Is the Tigertest real estate practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
        classFaqJsonLd("realestate"),
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
    <div data-theme="realestate" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
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

      <ExamFacts examId="realestate" />

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
                Four training sets for the national portion, one per practice test: each holds exactly the 50 questions of its test. Master Set 1, then take Test 1, and so on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the national exam and written in its style: a seller, a buyer, an agent and a question about who owes what to whom, plus the math with every step shown.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* State practice */}
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
          State Practice: 15 States
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
          Taking the exam in one of these states? Practice with questions checked against your state&apos;s law, including state-only rules. Progress is saved separately for each state.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statePractice.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="block bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-brand transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{s.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{s.body}</p>
              <span className="text-brand-dark font-semibold">Start {s.name} practice &rarr;</span>
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          Practice only. Not affiliated with any state regulator, PSI, Pearson VUE or Prometric, and a practice score does not predict your exam result.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the National Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Pearson VUE and PSI publish the content outline for the national portion of the salesperson exam, and the two match closely. Every practice test here follows that weighting. The state law portion is separate and not covered.
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
                src={getTigerAsset("realestate", 1)}
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
            How to Pass the Real Estate Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the vocabulary as pairs</h3>
              <p>
                Mortgagor and mortgagee, grantor and grantee, lessor and lessee, optionor and optionee, vendor and vendee. Half the exam is knowing which party is which and what each one owes. Fee simple, life estate, joint tenancy and tenancy in common come up every time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Do the math on paper</h3>
              <p>
                Acres from square feet (43,560), commission splits, net to the seller, cap rates, mill rates, prorations, points and LTV. The exam gives you a calculator and tells you the day count. Every math question here shows the arithmetic in its explanation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think agency and fair housing first</h3>
              <p>
                When a scenario asks what the licensee should do, the answer is the one that keeps the fiduciary duties to the client, discloses material facts to everyone, and never steers, blockbusts or redlines. Nothing you learn here is a single state&apos;s rule.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Then study your state portion separately</h3>
              <p>
                This bank covers the national portion only. Your state exam adds license law, commission rules, agency disclosure forms and state-specific contract rules. Clear 75 percent here with room to spare, then study your state&apos;s candidate handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Real Estate Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the real estate exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The national portion is 80 scored questions on Pearson VUE (plus 5 unscored pretest items) and a similar count on PSI. Your state portion adds 30 to 50 more. Most states give about 2 to 4 hours for both and pass the national portion at 70 to 75 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this cover my state&apos;s exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Fifteen states have their own practice with state law: Arizona, California, Florida, Georgia, Illinois, Michigan, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Tennessee, Texas, Virginia and Washington. Each is one full-length exam shaped like that state&apos;s, and progress is saved separately per state. For other states, the 200-question bank covers the national portion, which is the same in every Pearson VUE or PSI state; your state law portion is separate and not covered yet.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is there a lot of math on the real estate exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              About 7 of the 80 national questions are pure calculations, and math also appears inside valuation, financing and contract questions. Memorize 43,560 square feet per acre and 5,280 feet per mile; the exam provides a calculator and tells you whether to use 360 or 365 days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the same as the broker exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The broker exam uses a similar outline with more weight on brokerage operations and practice and a 75 percent pass line. Salesperson candidates should use this bank; broker candidates will find most of the content applies but should expect deeper management questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the Tigertest real estate practice test free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
          <ExamClassFaq examId="realestate" />
        </div>
      </div>

      <ExamRelatedTests examId="realestate" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Real Estate Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every outline area.</p>
          <ExamLandingCTA dashboardHref="/real-estate/dashboard" />
        </div>
      </div>
    </div>
  );
}
