import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/cans";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Nova Scotia Learner's Practice Test 2026 - Free Class 7 Test";
const metaDescription =
  "Free Nova Scotia Class 7 learner's practice test: 200 original questions on road signs and rules of the road from the NS Driver's Handbook, 20 + 20 like the real test.";
const description =
  "Free Nova Scotia learner's licence practice tests with 200 original questions from the Nova Scotia Driver's Handbook: regulatory, warning and work zone signs, traffic lights and pavement markings, graduated licensing and demerit points, right-of-way, speed and passing, parking and sharing the road, and night, weather and emergencies. Five 40-question tests split 20 signs and 20 rules, with explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Nova Scotia learner's practice test, Nova Scotia class 7 test, NS learners test, Nova Scotia knowledge test, Nova Scotia driver's handbook test, Nova Scotia road sign test, Access Nova Scotia learner's test, NS practice driving test 2026",
  alternates: {
    canonical: `${siteUrl}/nova-scotia-learners-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nova-scotia-learners-practice-test`,
    images: [{ url: shareImageUrl("cans"), width: 1200, height: 630, alt: "Tigertest free Nova Scotia learner's practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cans")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nova Scotia Learner's Practice Tests",
      description,
      url: `${siteUrl}/nova-scotia-learners-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 original Nova Scotia learner's practice questions",
        "5 practice tests of 40 questions: 20 signs, 20 rules of the road",
        "5 training sets, one per practice test",
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
          name: "What score do I need to pass the Nova Scotia learner's test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Class 7 knowledge test has two parts, a rules of the road test and a road sign test, each with 20 multiple-choice questions. You need at least 16 correct on each part, which is 80 percent. The practice tests here use the same 80 percent pass line, so aim for 16 of 20 on the signs half and on the rules half.",
          },
        },
        {
          "@type": "Question",
          name: "How long is the test and can I take it online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each part must be finished within 30 minutes. You can take the test online in English or French on a desktop or laptop with a webcam (phones and tablets are not allowed), or in person at a Registry of Motor Vehicles office or Access Nova Scotia centre. You must work alone with no notes. Online you can retry with no wait after paying again; in person you wait until the next day.",
          },
        },
        {
          "@type": "Question",
          name: "What else do I need to get my learner's licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be at least 16, and if you are 16 or 17 a parent or guardian must give written consent. You also need to pass a vision test, show identification with your legal name and date of birth, pay the licence fee and have your photo taken. If you test online, you finish these steps at a Registry of Motor Vehicles office or Access Nova Scotia centre after you pass.",
          },
        },
        {
          "@type": "Question",
          name: "What are the rules for a Class 7 learner in Nova Scotia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You may drive only with a supervising driver in the front seat who holds a regular licence and is not in the graduated licensing program, and you may carry no other passengers. Your blood-alcohol level must be zero, and 4 demerit points bring a six-month suspension. The licence is valid for 2 years, and you can take the road test after 12 months, or 9 months with an approved driver education course.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Nova Scotia knowledge test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The Registry of Motor Vehicles does not publish its question bank. Every question here is original, written from the Nova Scotia Driver's Handbook and the province's current learner rules, including the Traffic Safety Act changes in force since October 19, 2026. Signs are described in words, so study the sign pictures in the handbook too. It is a study tool, not a licence.",
          },
        }
      ],
    },
  ],
};

const contentAreas = [
  { name: "Regulatory Signs", weight: "6 of 40" },
  { name: "Warning Signs", weight: "6 of 40" },
  { name: "Lights & Pavement Markings", weight: "5 of 40" },
  { name: "Work Zone & Guide Signs", weight: "3 of 40" },
  { name: "Speed, Passing & Lanes", weight: "5 of 40" },
  { name: "Licensing, GDL & Demerits", weight: "4 of 40" },
  { name: "Intersections & Right-of-Way", weight: "4 of 40" },
  { name: "Parking & Sharing the Road", weight: "4 of 40" },
  { name: "Night, Weather & Emergencies", weight: "3 of 40" },
];

export default function NovaScotiaLearnersLandingPage() {
  return (
    <div data-theme="cans" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nova Scotia Learner&apos;s Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nova-scotia-learners/dashboard"
            shortName="NS Class 7"
            subtitle="200 original questions on Nova Scotia road signs, traffic lights, right-of-way, graduated licensing, demerit points and safe driving, from the Nova Scotia Driver's Handbook. Five tests split 20 signs and 20 rules, like the real one. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cans-mobile.png", desktop: "/landing/cans-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cans" />

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
                Five training sets, one per practice test: Set 1 holds exactly the 40 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Five 40-question tests, each 20 sign questions and 20 rules of the road questions like the real two-part test, with an 80 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the Nova Scotia Driver&apos;s Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real test is two parts of 20: a road sign test and a rules of the road test. Every practice test here is the same 20 and 20. The signs half covers regulatory, warning and work zone signs plus lights and pavement markings; the rules half follows the handbook&apos;s chapters on licensing, right-of-way, driving, sharing the road and adverse conditions. The rules are Nova Scotia&apos;s own: the three-stage graduated licence, the 80 km/h default limit, school zone speeds, slow down and move over, and the one-metre gap for cyclists.
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
                src={getTigerAsset("cans", 1)}
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
            How to Pass the Nova Scotia Learner&apos;s Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat the signs test as its own exam</h3>
              <p>
                Half the test is road signs, and you need 16 of 20 on that half alone. Learn the families by shape and colour first: the octagon stop sign, the downward yield triangle, the five-sided fluorescent yellow-green school zone sign, white rectangular regulatory signs, yellow diamond warning signs, orange work zone signs and green guide signs. Then work through the pictures in chapter 3 of the handbook, including the flashing arrow boards in work zones.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The rules half loves numbers: 80 km/h unless posted, 50 km/h in urban areas, the posted school area limit whenever children are present, 60 km/h past a stopped emergency vehicle, 150 metres behind a fire truck, low beams within 150 metres of oncoming traffic and 60 metres when following, one metre when passing a cyclist, and the two-second rule. Write them in one table and quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the graduated licence rules cold</h3>
              <p>
                Expect questions on your own licence: a supervising driver in the front seat and no other passengers, zero alcohol, 4 demerit points for a learner suspension, 12 months (or 9 with driver education) before the road test, then the newly licensed stage with its midnight to 5 a.m. curfew and one front-seat passenger, and 2 more years as a novice driver with zero alcohol after that.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, then take its practice test and check both halves: you need 16 of 20 on the signs and 16 of 20 on the rules, not just 80 percent overall. Drill the questions you missed, retrain that set, and take all five tests before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nova Scotia Learner&apos;s Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the Nova Scotia learner&apos;s test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Class 7 knowledge test has two parts, a rules of the road test and a road sign test, each with 20 multiple-choice questions. You need at least 16 correct on each part, which is 80 percent. The practice tests here use the same 80 percent pass line, so aim for 16 of 20 on the signs half and on the rules half.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the test and can I take it online?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each part must be finished within 30 minutes. You can take the test online in English or French on a desktop or laptop with a webcam (phones and tablets are not allowed), or in person at a Registry of Motor Vehicles office or Access Nova Scotia centre. You must work alone with no notes. Online you can retry with no wait after paying again; in person you wait until the next day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What else do I need to get my learner&apos;s licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be at least 16, and if you are 16 or 17 a parent or guardian must give written consent. You also need to pass a vision test, show identification with your legal name and date of birth, pay the licence fee and have your photo taken. If you test online, you finish these steps at a Registry of Motor Vehicles office or Access Nova Scotia centre after you pass.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the rules for a Class 7 learner in Nova Scotia?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You may drive only with a supervising driver in the front seat who holds a regular licence and is not in the graduated licensing program, and you may carry no other passengers. Your blood-alcohol level must be zero, and 4 demerit points bring a six-month suspension. The licence is valid for 2 years, and you can take the road test after 12 months, or 9 months with an approved driver education course.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Nova Scotia knowledge test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The Registry of Motor Vehicles does not publish its question bank. Every question here is original, written from the Nova Scotia Driver&apos;s Handbook and the province&apos;s current learner rules, including the Traffic Safety Act changes in force since October 19, 2026. Signs are described in words, so study the sign pictures in the handbook too. It is a study tool, not a licence.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="cans" />

      <ExamRelatedTests examId="cans" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Learner&apos;s?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Nova Scotia signs and rules of the road.</p>
          <ExamLandingCTA dashboardHref="/nova-scotia-learners/dashboard" />
        </div>
      </div>
    </div>
  );
}
