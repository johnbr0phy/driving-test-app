import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/auqld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "QLD Learner Licence Practice Test 2026 - Free";
const metaDescription =
  "Free Queensland learner licence practice: 200 questions on giving way, road rules, signs and licence conditions for the written test and PrepL, all explained.";
const description =
  "Free practice tests for the Queensland written road rules test and PrepL: 200 questions on giving way, learner and provisional licence rules, demerit points, signs, road markings and traffic lights, lanes, turning and parking, and speed, alcohol and safe driving. Every question is based on Queensland Transport and Main Roads rules and has an explanation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "QLD learner licence practice test, Queensland road rules test, QLD learners test, PrepL practice test, Queensland learner licence test 2026, free QLD road rules quiz, Your Keys to Driving in Queensland practice questions",
  alternates: {
    canonical: `${siteUrl}/qld-learner-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/qld-learner-licence-practice-test`,
    images: [{ url: shareImageUrl("auqld"), width: 1200, height: 630, alt: "Tigertest free QLD learner licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("auqld")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free QLD Learner Licence Practice Tests",
      description,
      url: `${siteUrl}/qld-learner-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 Queensland road rules practice questions",
        "4 practice tests covering giving way, licence rules, signs and safe driving",
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
          name: "How many questions are on the Queensland learner licence test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both PrepL and the written road rules test have 30 multiple-choice questions. The written test is split into two sections, and you must get at least 9 of the 10 giving way questions and at least 18 of the 20 road rules and licence questions right. PrepL needs 27 of 30, which is 90 percent. The practice tests here use the same 90 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between PrepL and the written road rules test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PrepL is TMR's online course and assessment. It takes about 4 to 6 hours, you can enrol from 15 years and 11 months, you have 12 months to finish, and its 30-question final test can be retried after 24 hours without a new fee. The written road rules test is taken in person at a transport and motoring customer service centre, once a day, with a fee for each attempt. TMR plans to make PrepL the standard path, but for now you can choose either.",
          },
        },
        {
          "@type": "Question",
          name: "What do I need to get my Queensland learner licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be at least 16, pass PrepL or the written road rules test, prove your identity and be medically fit to drive. The test fee is 29.70 dollars, plus the licence fee. A pass on the written test stays valid for 5 years, and the learner licence itself is issued for 3 years.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after I get my learner licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You drive with a supervisor who has held an open licence for at least a year, display black on yellow L plates at the front and rear, and keep a zero alcohol limit. If you are under 25 you log 100 hours of supervised driving, 10 of them at night. After 6 months you can sit the hazard perception test, and after holding the learner licence for a year, and from age 17, you can take the practical driving test for your P1 licence.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test cover the hazard perception test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The hazard perception test is a separate online test of video clips that learners take later, before the practical driving test, and it is not modelled here. These questions cover the written road rules test and PrepL: giving way, licence rules and demerit points, signs and markings, lanes and parking, and speed, alcohol and safe driving. It is a study tool, not an official TMR test.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Giving Way", weight: "24%" },
  { name: "Licence Rules & Demerit Points", weight: "20%" },
  { name: "Signs, Lines & Traffic Lights", weight: "20%" },
  { name: "Lanes, Turning & Parking", weight: "18%" },
  { name: "Speed, Alcohol & Safe Driving", weight: "18%" },
];

export default function QldLearnerLicenceLandingPage() {
  return (
    <div data-theme="auqld" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free QLD Learner Licence Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/qld-learner-licence/dashboard"
            shortName="QLD Learner"
            subtitle="200 questions on Queensland road rules for PrepL and the written road rules test: giving way, L and P plate rules, demerit points, signs, lanes, speed limits and alcohol limits. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/auqld-mobile.png", desktop: "/landing/auqld-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auqld" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests on Queensland road rules, with the same 90 percent pass line as PrepL and an explanation of the rule behind every answer.
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
                Built on Queensland&apos;s Road Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The written road rules test has its own giving way section, and you can only drop one of those ten questions, so giving way is the biggest single topic here. The rest covers what the road rules and licence section asks: learner and P plate rules, demerit points, signs and markings, lanes and parking, and speed, alcohol and phone rules. Every question uses Queensland&apos;s own rules, from TMR and the Queensland Road Rules.
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
                src={getTigerAsset("auqld", 1)}
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
            How to Pass the Queensland Road Rules Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get giving way perfect</h3>
              <p>
                Nine of ten is the bar, so learn the rules, not the hunches. At a crossroad with no signs, give way to the right. At a T-intersection, the road that ends gives way. At a roundabout, give way to everyone already on it, wherever they are. Turning right, give way to oncoming traffic. A U-turning driver gives way to everyone, and a stop sign is not stronger than a give way sign.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the licence numbers as a ladder</h3>
              <p>
                Learner at 16, with 100 logged hours (10 at night) if you are under 25. Hazard perception after 6 months, the practical test after a year and from 17. P1 for a year, then P2, then open. Zero alcohol until your open licence, 4 demerit points in a year as the limit on L and P plates, and no phone use at all for learners and P1 drivers under 25.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the distances and limits</h3>
              <p>
                50km/h in built-up areas and 100km/h outside them unless signed, 40km/h in most school zones, a 2-second gap in good conditions and 4 in the wet, 1m when passing a bicycle rider at 60km/h or less and 1.5m above that, high beam off within 200m, and no stopping within 20m of an intersection with traffic lights or 10m of one without. These are exactly the numbers the test asks about.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master all four training sets, then take the four practice tests until you clear 90 percent on each, with no more than one giving way miss. After each test, drill the questions you got wrong and retrain that test&apos;s set before you book the real test or start PrepL.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          QLD Learner Licence Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Queensland learner licence test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Both PrepL and the written road rules test have 30 multiple-choice questions. The written test is split into two sections, and you must get at least 9 of the 10 giving way questions and at least 18 of the 20 road rules and licence questions right. PrepL needs 27 of 30, which is 90 percent. The practice tests here use the same 90 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the difference between PrepL and the written road rules test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              PrepL is TMR&apos;s online course and assessment. It takes about 4 to 6 hours, you can enrol from 15 years and 11 months, you have 12 months to finish, and its 30-question final test can be retried after 24 hours without a new fee. The written road rules test is taken in person at a transport and motoring customer service centre, once a day, with a fee for each attempt. TMR plans to make PrepL the standard path, but for now you can choose either.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What do I need to get my Queensland learner licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be at least 16, pass PrepL or the written road rules test, prove your identity and be medically fit to drive. The test fee is 29.70 dollars, plus the licence fee. A pass on the written test stays valid for 5 years, and the learner licence itself is issued for 3 years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What happens after I get my learner licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You drive with a supervisor who has held an open licence for at least a year, display black on yellow L plates at the front and rear, and keep a zero alcohol limit. If you are under 25 you log 100 hours of supervised driving, 10 of them at night. After 6 months you can sit the hazard perception test, and after holding the learner licence for a year, and from age 17, you can take the practical driving test for your P1 licence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test cover the hazard perception test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The hazard perception test is a separate online test of video clips that learners take later, before the practical driving test, and it is not modelled here. These questions cover the written road rules test and PrepL: giving way, licence rules and demerit points, signs and markings, lanes and parking, and speed, alcohol and safe driving. It is a study tool, not an official TMR test.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="auqld" />

      <ExamRelatedTests examId="auqld" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your L Plates?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Queensland road rules.</p>
          <ExamLandingCTA dashboardHref="/qld-learner-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
