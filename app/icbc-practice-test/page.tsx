import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/cabc";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "ICBC Practice Test 2026 - Free BC Knowledge Test";
const metaDescription =
  "Free ICBC practice test for your Class 7L: 200 questions from Learn to Drive Smart on signs, right-of-way, speed and B.C. licence rules, all explained.";
const description =
  "Free ICBC practice tests with 200 questions from Learn to Drive Smart for the British Columbia Class 7L knowledge test: signs, signals and road markings, intersections and right-of-way, lanes and parking, see-think-do, sharing the road, impairment and distraction, emergencies and the Graduated Licensing Program. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ICBC practice test, ICBC knowledge test, BC learners test, Class 7L knowledge test, BC driving test practice, Learn to Drive Smart test, free ICBC practice questions 2026, BC L test",
  alternates: {
    canonical: `${siteUrl}/icbc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/icbc-practice-test`,
    images: [{ url: shareImageUrl("cabc"), width: 1200, height: 630, alt: "Tigertest free ICBC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cabc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ICBC Practice Tests",
      description,
      url: `${siteUrl}/icbc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 ICBC knowledge test practice questions",
        "4 practice tests of 50 questions, 40 to pass",
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
          name: "How many questions are on the ICBC knowledge test and what do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The passenger vehicle knowledge test for a Class 7L learner's licence has 50 multiple-choice questions, and you need 40 correct, which is 80 percent. You have up to 45 minutes. The test ends as soon as you reach 40 right or go past the number you are allowed to miss, and you may skip each question once.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the ICBC knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every question comes from ICBC's free guide, Learn to Drive Smart: signs, signals and road markings, right-of-way at intersections, lanes, passing and parking, see-think-do driving, sharing the road with pedestrians, cyclists, buses and trains, impairment and distraction, emergencies and bad weather, and the Graduated Licensing Program rules. ICBC says many questions test understanding, not just memorized facts.",
          },
        },
        {
          "@type": "Question",
          name: "How old do I need to be, and where do I take the test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can get your learner's licence on or after your 16th birthday. Since June 2026 you can take the knowledge test online at home on a computer with a webcam, or at an ICBC driver licensing office. Either way you then visit an office for your photo and a vision screening, with two pieces of ID. The test is offered in 12 languages, including French, Punjabi, Mandarin, Cantonese, Farsi and Vietnamese.",
          },
        },
        {
          "@type": "Question",
          name: "What are the rules once I have my L?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A learner must drive with a qualified supervisor in the front passenger seat (22 or older since October 19, 2026, with their own Class 5 licence), display the L sign on the back of the vehicle, have zero alcohol and drugs in their blood, use no electronic devices, even hands-free, and not drive between midnight and 5 a.m. You may carry one passenger besides the supervisor, or more if they are all immediate family.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official ICBC practice test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest is an independent study tool, not ICBC. The questions are written from Learn to Drive Smart and ICBC's current licensing pages, including the Graduated Licensing Program changes that took effect on October 19, 2026, but they are not the real test questions. ICBC also offers its own free practice test, and Learn to Drive Smart is the source to trust if anything differs.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Signs, Signals & Road Markings", weight: "20%" },
  { name: "Intersections & Right-of-Way", weight: "14%" },
  { name: "Lanes, Passing & Parking", weight: "12%" },
  { name: "See-Think-Do & Speed", weight: "14%" },
  { name: "Sharing the Road", weight: "14%" },
  { name: "Impairment & Distraction", weight: "8%" },
  { name: "Emergencies & Conditions", weight: "10%" },
  { name: "Your Licence, GLP & Vehicle", weight: "8%" },
];

export default function IcbcLandingPage() {
  return (
    <div data-theme="cabc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ICBC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/icbc/dashboard"
            shortName="ICBC"
            subtitle="200 questions from Learn to Drive Smart for your B.C. Class 7L knowledge test: signs, right-of-way, lanes and parking, sharing the road, impairment, emergencies and GLP rules. 50 per test, 40 to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cabc-mobile.png", desktop: "/landing/cabc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cabc" />

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
                Four 50-question tests with the real 40-of-50 pass mark, and an explanation of the right answer and the common wrong pick on every item.
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
                Built on Learn to Drive Smart
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ICBC says every knowledge test question comes from Learn to Drive Smart, and it offers a separate road signs practice test for the signs questions. The practice tests here follow the guide chapter by chapter, with signs and signals the biggest share and B.C. rules you will not find in other provinces&apos; handbooks, like the flashing green pedestrian light, the single solid yellow line and the GLP rules that changed on October 19, 2026.
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
                src={getTigerAsset("cabc", 1)}
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
            How to Pass the ICBC Knowledge Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour</h3>
              <p>
                Chapter 3 of Learn to Drive Smart is the one to know cold. Yellow diamonds warn, orange diamonds mean construction, fluorescent yellow-green means a school zone, white rectangles are laws, green signs give directions and blue signs show services. Then learn the lights: in B.C. a flashing green is a pedestrian-controlled signal, and a flashing green arrow with a red light lets only left turns go.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Memorize the numbers</h3>
              <p>
                Defaults of 50 km/h in town, 80 km/h outside and 20 km/h in a lane; school zones 30 km/h from 8 a.m. to 5 p.m. on school days and playgrounds 30 km/h dawn to dusk every day; two, three and four seconds of following distance; and no parking within 5 metres of a hydrant, 6 metres of a crosswalk or stop sign, or 15 metres of a railway crossing. Slow to 70 km/h, or 40 km/h, past stopped vehicles with flashing lights.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Work through right-of-way scenes</h3>
              <p>
                Many questions describe a situation rather than ask a fact: who goes first at a four-way stop, what to do when the light turns yellow while you wait to turn left, which lane to use in a roundabout, or when to stop for a school bus. Picture each one and say the rule out loud. ICBC warns that some answers are partly right but not complete, so read every option.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master all four training sets, clear 40 of 50 on all four practice tests, and drill the questions you missed. Then take ICBC&apos;s own free practice test once more before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ICBC Knowledge Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the ICBC knowledge test and what do I need to pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The passenger vehicle knowledge test for a Class 7L learner&apos;s licence has 50 multiple-choice questions, and you need 40 correct, which is 80 percent. You have up to 45 minutes. The test ends as soon as you reach 40 right or go past the number you are allowed to miss, and you may skip each question once.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the ICBC knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every question comes from ICBC&apos;s free guide, Learn to Drive Smart: signs, signals and road markings, right-of-way at intersections, lanes, passing and parking, see-think-do driving, sharing the road with pedestrians, cyclists, buses and trains, impairment and distraction, emergencies and bad weather, and the Graduated Licensing Program rules. ICBC says many questions test understanding, not just memorized facts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How old do I need to be, and where do I take the test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can get your learner&apos;s licence on or after your 16th birthday. Since June 2026 you can take the knowledge test online at home on a computer with a webcam, or at an ICBC driver licensing office. Either way you then visit an office for your photo and a vision screening, with two pieces of ID. The test is offered in 12 languages, including French, Punjabi, Mandarin, Cantonese, Farsi and Vietnamese.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the rules once I have my L?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A learner must drive with a qualified supervisor in the front passenger seat (22 or older since October 19, 2026, with their own Class 5 licence), display the L sign on the back of the vehicle, have zero alcohol and drugs in their blood, use no electronic devices, even hands-free, and not drive between midnight and 5 a.m. You may carry one passenger besides the supervisor, or more if they are all immediate family.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official ICBC practice test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest is an independent study tool, not ICBC. The questions are written from Learn to Drive Smart and ICBC&apos;s current licensing pages, including the Graduated Licensing Program changes that took effect on October 19, 2026, but they are not the real test questions. ICBC also offers its own free practice test, and Learn to Drive Smart is the source to trust if anything differs.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="cabc" />

      <ExamRelatedTests examId="cabc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your L?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions from Learn to Drive Smart.</p>
          <ExamLandingCTA dashboardHref="/icbc/dashboard" />
        </div>
      </div>
    </div>
  );
}
