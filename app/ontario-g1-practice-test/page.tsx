import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/caon";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Ontario G1 Practice Test 2026 - Free Knowledge Test";
const metaDescription =
  "Free Ontario G1 practice test: 200 questions from the Official MTO Driver's Handbook on signs, rules of the road, demerits and G1 conditions, all explained.";
const description =
  "Free Ontario G1 practice tests with 200 questions from the Official MTO Driver's Handbook: traffic signs, lights and pavement markings, intersections and right-of-way, sharing the road, graduated licensing, demerit points and alcohol rules, safe driving and parking, and night, weather and emergencies. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Ontario G1 practice test, G1 test, G1 knowledge test, G1 practice test 2026, MTO practice test, DriveTest G1, Ontario driver's licence test, Ontario road signs test, free G1 practice questions",
  alternates: {
    canonical: `${siteUrl}/ontario-g1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ontario-g1-practice-test`,
    images: [{ url: shareImageUrl("caon"), width: 1200, height: 630, alt: "Tigertest free Ontario G1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caon")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ontario G1 Practice Tests",
      description,
      url: `${siteUrl}/ontario-g1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Ontario G1 practice questions",
        "4 practice tests on signs and rules of the road",
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
          name: "What score do I need to pass the G1 knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DriveTest requires a total score of at least 80 percent. The test has a road signs section and a rules of the road section, and if you retake it within a year you only redo the sections that did not meet the standard. The practice tests here use the same 80 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the G1 test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DriveTest does not publish an official count; the test is usually reported as 40 multiple-choice questions, 20 on signs and 20 on rules of the road. It is not timed, and most people finish in 20 to 30 minutes. It is offered in 32 languages, on paper at every DriveTest Centre and on computer at some.",
          },
        },
        {
          "@type": "Question",
          name: "What do I need to bring to the G1 test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be at least 16. Bring original identification showing your legal name and full date of birth, payment for the fee (cash, debit or credit) and your glasses or contacts if you need them to drive, since you also take a vision test. Since May 11, 2026 you also declare that Ontario is your primary residence and that you are in Canada legally. The application fee covers the knowledge test, your first road test and a five-year licence.",
          },
        },
        {
          "@type": "Question",
          name: "What can I do with a G1 licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You may drive only with an accompanying driver who has a full G licence, at least four years of experience and a blood-alcohol level under .05, sitting in the front seat. Your own blood-alcohol level must be zero, everyone needs a working seatbelt, and you may not drive between midnight and 5 a.m. or on 400-series highways with limits over 80 km/h unless your accompanying driver is a driving instructor. After 12 months, or 8 with an approved driver education course, you can take the G2 road test.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real G1 test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The Ministry of Transportation does not publish its question bank. Every question here is written from the Official MTO Driver's Handbook and covers the topics the handbook says the knowledge test may ask about: signs and lights, right-of-way, school buses and emergency vehicles, speed limits, freeways, passing, collision reporting, demerit points and suspensions. Signs are described in words, so study the pictures in the handbook too. It is a study tool, not a licence.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Traffic Signs", weight: "28%" },
  { name: "Lights, Signals & Markings", weight: "16%" },
  { name: "Licensing, Demerits & Alcohol", weight: "14%" },
  { name: "Sharing the Road", weight: "12%" },
  { name: "Safe Driving & Parking", weight: "12%" },
  { name: "Intersections & Right-of-Way", weight: "10%" },
  { name: "Night, Weather & Emergencies", weight: "8%" },
];

export default function OntarioG1LandingPage() {
  return (
    <div data-theme="caon" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ontario G1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ontario-g1/dashboard"
            shortName="G1"
            subtitle="200 questions on Ontario road signs, traffic lights, right-of-way, graduated licensing, demerit points and safe driving, all from the Official MTO Driver's Handbook. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caon-mobile.png", desktop: "/landing/caon-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caon" />

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
                Four 50-question tests mixing signs and rules of the road, with the same 80 percent pass line as the real G1 and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the Official MTO Driver&apos;s Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real G1 test has a road signs section and a rules of the road section. Here signs, lights and pavement markings make up 44 percent of every practice test, and the rules of the road the rest, split the way the handbook lists the topics the knowledge test may ask about. Every rule is Ontario&apos;s own: G1 and G2 conditions, demerit points, school buses, pedestrian crossovers and the unposted 50 and 80 km/h limits.
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
                src={getTigerAsset("caon", 1)}
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
            How to Pass the G1 Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour first</h3>
              <p>
                A whole section of the real test is signs. Learn the families before the details: regulatory signs are white rectangles, a red circle with a line means not allowed and a green circle means allowed; warning signs are yellow diamonds; temporary condition signs for work zones are orange; direction signs are green. Then the special shapes: the red octagon stop sign, the downward yield triangle, the X-shaped railway crossbuck and the five-sided school zone sign. Look at the pictures in the handbook as you go.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The rules section loves numbers: 20 metres behind a stopped school bus, 150 metres for low beams and behind a fire truck, 60 metres when following, 30 metres around a pedestrian crossover, 3 metres from a hydrant, 9 and 15 metres from an intersection, a two-second following distance and the 50 and 80 km/h defaults. Write them in one table and quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your own licence rules cold</h3>
              <p>
                Expect questions on the G1 and G2 conditions, zero blood alcohol for novices and anyone 21 or under, the accompanying driver&apos;s four years and .05, novice demerit points (warning at 2, 60-day suspension at 9) and the 90-day roadside suspension over .08. These are the rules you will live under for the next 20 months, so they are worth knowing anyway.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, then take its practice test and aim well above 80 percent, since the real test needs that total. After each test, drill the questions you missed and retrain that test&apos;s set, then take all four tests back to back before you go to DriveTest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          G1 Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the G1 knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              DriveTest requires a total score of at least 80 percent. The test has a road signs section and a rules of the road section, and if you retake it within a year you only redo the sections that did not meet the standard. The practice tests here use the same 80 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the G1 test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              DriveTest does not publish an official count; the test is usually reported as 40 multiple-choice questions, 20 on signs and 20 on rules of the road. It is not timed, and most people finish in 20 to 30 minutes. It is offered in 32 languages, on paper at every DriveTest Centre and on computer at some.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What do I need to bring to the G1 test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be at least 16. Bring original identification showing your legal name and full date of birth, payment for the fee (cash, debit or credit) and your glasses or contacts if you need them to drive, since you also take a vision test. Since May 11, 2026 you also declare that Ontario is your primary residence and that you are in Canada legally. The application fee covers the knowledge test, your first road test and a five-year licence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What can I do with a G1 licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You may drive only with an accompanying driver who has a full G licence, at least four years of experience and a blood-alcohol level under .05, sitting in the front seat. Your own blood-alcohol level must be zero, everyone needs a working seatbelt, and you may not drive between midnight and 5 a.m. or on 400-series highways with limits over 80 km/h unless your accompanying driver is a driving instructor. After 12 months, or 8 with an approved driver education course, you can take the G2 road test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real G1 test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The Ministry of Transportation does not publish its question bank. Every question here is written from the Official MTO Driver&apos;s Handbook and covers the topics the handbook says the knowledge test may ask about: signs and lights, right-of-way, school buses and emergency vehicles, speed limits, freeways, passing, collision reporting, demerit points and suspensions. Signs are described in words, so study the pictures in the handbook too. It is a study tool, not a licence.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="caon" />

      <ExamRelatedTests examId="caon" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your G1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Ontario signs and rules of the road.</p>
          <ExamLandingCTA dashboardHref="/ontario-g1/dashboard" />
        </div>
      </div>
    </div>
  );
}
