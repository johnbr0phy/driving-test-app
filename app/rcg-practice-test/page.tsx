import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "RCG Practice Test 2026 - Free RSG and SITHGAM022 Questions";
const metaDescription =
  "Free RCG and RSG practice test for SITHGAM022 Provide responsible gambling services: 200 original questions on gambling harm, odds, self-exclusion and support, every answer explained.";
const description =
  "Free practice for the responsible gambling course (RCG or RSG), national unit SITHGAM022 Provide responsible gambling services: 200 original questions on gambling laws and codes of practice, the signs of gambling harm, odds and gambling myths, a safer gaming environment, self-exclusion, helping customers and support services, and recording incidents and complaints. Four 50-question mock tests with an 80 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RCG practice test, RSG practice test, SITHGAM022 questions, responsible conduct of gambling quiz, responsible service of gambling test, RCG course answers, gaming licence Australia practice",
  alternates: {
    canonical: `${siteUrl}/rcg-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rcg-practice-test`,
    images: [{ url: "/og/aurcg", width: 1200, height: 630, alt: "Tigertest free RCG practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/aurcg"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RCG Practice Test",
      description,
      url: `${siteUrl}/rcg-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 RCG and RSG practice questions",
        "4 mock tests of 50 questions with an 80 percent readiness line",
        "4 training sets, one per mock test",
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
          name: "What is the RCG or RSG course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the responsible gambling training that staff need before working with gaming machines, Keno, TAB wagering or table games in Australian hotels, clubs and casinos. The national unit behind most of these courses is SITHGAM022 Provide responsible gambling services. NSW calls it the Responsible Conduct of Gambling (RCG), while Victoria, Queensland and others call it the Responsible Service of Gambling (RSG), and each state or territory adds its own rules.",
          },
        },
        {
          "@type": "Question",
          name: "What is the pass mark for the RCG assessment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single national pass mark. SITHGAM022 is competency based, so your trainer assesses you with questions, a scenario or role play and an observation, and each state sets its own requirements. The mock tests here use an 80 percent line as a readiness check, so 40 of 50 means you know the material well.",
          },
        },
        {
          "@type": "Question",
          name: "What does SITHGAM022 cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Two elements: implementing responsible gambling practices, and giving customers information and help about gambling harm. That means the laws and codes of practice, the signs of gambling harm, how gaming machines and odds really work, the harm minimisation features of a gaming area such as clocks, signage and ATM placement, self-exclusion, support services such as the Gambling Help line on 1800 858 858, and recording incidents and complaints.",
          },
        },
        {
          "@type": "Question",
          name: "Are the rules the same in every state?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The national unit is the same everywhere, but each state and territory sets its own gambling laws, course approvals, refresher periods, self-exclusion programs and venue rules. These questions stick to what applies nationally and say varies by state for the rest, so check your state regulator's requirements too.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the official assessment questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from the SITHGAM022 unit and its assessment requirements, national services such as BetStop and Gambling Help, and published research on gambling harm. They test the same knowledge without copying any training provider's or regulator's assessment.",
          },
        },
        classFaqJsonLd("aurcg"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Laws, Codes & Compliance", weight: "16%" },
  { name: "Gambling Harm & Warning Signs", weight: "18%" },
  { name: "Odds, Chance & Gambling Myths", weight: "14%" },
  { name: "Safer Gambling Environment", weight: "16%" },
  { name: "Self-Exclusion & Exclusion", weight: "14%" },
  { name: "Helping Customers & Support Services", weight: "14%" },
  { name: "Incidents, Complaints & Records", weight: "8%" },
];

export default function RcgPracticeTestLandingPage() {
  return (
    <div data-theme="aurcg" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RCG Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rcg/dashboard"
            shortName="RCG"
            subtitle="200 questions for SITHGAM022 Provide responsible gambling services, the national unit behind the RCG and RSG: gambling harm, odds, self-exclusion and helping customers. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aurcg-mobile.png", desktop: "/landing/aurcg-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aurcg" />

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
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests covering both elements of SITHGAM022, with an 80 percent readiness line and an explanation of the right answer on every question.
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
                Built on SITHGAM022
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The unit has two elements, implementing responsible gambling practices and helping customers with information about gambling harm, and it publishes no weights. The mock tests split its knowledge evidence into seven areas and lean on the ones assessors ask most about: the signs of harm, the laws and codes you work under, and the features of a safer gaming area. State rules that differ are marked as varying by state.
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
                src={getTigerAsset("aurcg", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For trainers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Running an RCG or RSG Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Trainers and venue managers can set Tigertest as practice for free: post one link, learners join with just their name, and you see who practised, their mock test scores and the topics your group misses most before assessment day.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass Your RCG Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the signs of harm</h3>
              <p>
                The unit lists them: borrowing to gamble, unpaid bills, chasing losses, gambling to escape worries, feeling remorse, spending more than you can afford, changes in sleep or eating, an unhappy home life, crime to fund gambling and thoughts of self-harm. In the venue, watch for patterns such as repeat ATM trips, long sessions without breaks and distress at the machines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know how the machines really work</h3>
              <p>
                Every result comes from a random number generator, so no machine is ever due, hot or cold. Return to player is a long-run average across all play, not a promise to any one player, and near misses and small wins under the bet are still losses. Being able to explain this calmly is part of giving customers accurate information.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get the procedures right</h3>
              <p>
                Know what you do, and who you call, when a minor, an intoxicated customer, a self-excluded person, a request for credit, a dispute or a request for help comes up, and record each one factually. Keep the Gambling Help number, 1800 858 858, in your head, and handle everything discreetly and confidentially.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four mock tests, then check your own state&apos;s extra rules with your trainer. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RCG Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the RCG or RSG course?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the responsible gambling training that staff need before working with gaming machines, Keno, TAB wagering or table games in Australian hotels, clubs and casinos. The national unit behind most of these courses is SITHGAM022 Provide responsible gambling services. NSW calls it the Responsible Conduct of Gambling (RCG), while Victoria, Queensland and others call it the Responsible Service of Gambling (RSG), and each state or territory adds its own rules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the RCG assessment?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              There is no single national pass mark. SITHGAM022 is competency based, so your trainer assesses you with questions, a scenario or role play and an observation, and each state sets its own requirements. The mock tests here use an 80 percent line as a readiness check, so 40 of 50 means you know the material well.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does SITHGAM022 cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Two elements: implementing responsible gambling practices, and giving customers information and help about gambling harm. That means the laws and codes of practice, the signs of gambling harm, how gaming machines and odds really work, the harm minimisation features of a gaming area such as clocks, signage and ATM placement, self-exclusion, support services such as the Gambling Help line on 1800 858 858, and recording incidents and complaints.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are the rules the same in every state?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The national unit is the same everywhere, but each state and territory sets its own gambling laws, course approvals, refresher periods, self-exclusion programs and venue rules. These questions stick to what applies nationally and say varies by state for the rest, so check your state regulator&apos;s requirements too.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the official assessment questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from the SITHGAM022 unit and its assessment requirements, national services such as BetStop and Gambling Help, and published research on gambling harm. They test the same knowledge without copying any training provider&apos;s or regulator&apos;s assessment.
            </p>
          </div>
          <ExamClassFaq examId="aurcg" />
        </div>
      </div>

      <ExamRelatedTests examId="aurcg" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your RCG Assessment?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on responsible gambling services.</p>
          <ExamLandingCTA dashboardHref="/rcg/dashboard" />
        </div>
      </div>
    </div>
  );
}
