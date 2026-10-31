import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/caqc";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "SAAQ Practice Test 2026 - Free Quebec Knowledge Test";
const metaDescription =
  "Free SAAQ practice test in English: 200 questions on the Highway Safety Code, road signs, right of way and demerit points in Quebec, every answer explained.";
const description =
  "Free SAAQ practice tests with 200 questions for the Quebec Class 5 knowledge test: licences and demerit points, Highway Safety Code rules, road signs, traffic lights and pavement markings, intersections and right of way, sharing the road, alcohol, drugs, fatigue and distraction, and driving techniques. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SAAQ practice test, SAAQ knowledge test, Quebec driving test, Quebec Class 5 knowledge test, SAAQ test in English, Quebec learner's licence test, SAAQ practice questions 2026, free SAAQ test",
  alternates: {
    canonical: `${siteUrl}/saaq-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/saaq-practice-test`,
    images: [{ url: shareImageUrl("caqc"), width: 1200, height: 630, alt: "Tigertest free SAAQ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caqc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SAAQ Practice Tests",
      description,
      url: `${siteUrl}/saaq-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 SAAQ practice questions",
        "4 practice tests covering all three parts of the knowledge test",
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
          name: "What score do I need to pass the SAAQ knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The SAAQ knowledge test is split into three parts: the Highway Safety Code, road signs and traffic signals, and driving behaviours and techniques. You need 75 percent on each part, not just 75 percent overall, so a weak part fails you even if the others are strong. The practice tests here use the same 75 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "When can I take the SAAQ knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "First you take the driving course at a school recognized by the SAAQ and pass its Phase 1 exam to get your Class 5 learner's licence, which you can get from age 16 (with parental consent under 18). After holding the learner's licence for at least 10 months you book the knowledge test online through SAAQclic. If you fail, you must wait at least 28 days to try again. The road test comes after 12 months with the learner's licence.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the SAAQ knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiple-choice questions on the Highway Safety Code (speed limits, passing, parking, seat belts, licences and demerit points), on road signs, traffic lights and pavement markings, and on safe driving behaviour: right of way, sharing the road with pedestrians, cyclists and heavy vehicles, alcohol, drugs, fatigue, distraction and driving in winter. The SAAQ does not publish the number of questions. The practice tests here cover all three parts.",
          },
        },
        {
          "@type": "Question",
          name: "What are the rules for learner and probationary drivers in Quebec?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Learner drivers must be accompanied by someone who has held a Class 5 licence for at least two years, may not drive between midnight and 5 a.m., and lose the licence at 4 demerit points. Learner and probationary drivers, and every driver under 22, must follow the zero-alcohol rule. The probationary licence lasts two years, with the same 4-point limit and, for drivers 19 or under, a limit on young passengers between midnight and 5 a.m. in the first year.",
          },
        },
        {
          "@type": "Question",
          name: "Can I take the SAAQ test in English, and is this test official?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the SAAQ gives the knowledge test in English as well as French, and you can ask for Spanish, Mandarin or Arabic where available. This practice test is written in English. Tigertest is an independent study tool, not the SAAQ: the questions are original, written from the SAAQ driving course and Quebec's Highway Safety Code, and they are not the real test questions.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licences & Demerit Points", weight: "12%" },
  { name: "Highway Safety Code Rules", weight: "18%" },
  { name: "Road Signs", weight: "16%" },
  { name: "Traffic Lights & Pavement Markings", weight: "12%" },
  { name: "Intersections & Right of Way", weight: "12%" },
  { name: "Sharing the Road", weight: "12%" },
  { name: "Alcohol, Drugs, Fatigue & Distraction", weight: "10%" },
  { name: "Driving Techniques & Conditions", weight: "8%" },
];

export default function SaaqLandingPage() {
  return (
    <div data-theme="caqc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SAAQ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/saaq/dashboard"
            shortName="SAAQ"
            subtitle="200 questions for the Quebec Class 5 knowledge test: the Highway Safety Code, road signs, traffic lights, right of way, sharing the road and safe driving, in English. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caqc-mobile.png", desktop: "/landing/caqc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caqc" />

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
                Four 50-question tests covering all three parts of the SAAQ test, with the real 75 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on Quebec&apos;s Highway Safety Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The SAAQ test has three parts: the Highway Safety Code, road signs and traffic signals, and the behaviours and techniques of driving a passenger vehicle. Every practice test here covers all three, with Quebec&apos;s own rules: right turns on red except on the island of Montreal, winter tires from December 1 to March 15, the 4-point limit for new drivers and the zero-alcohol rule. The SAAQ does not publish its exact split, so these weights are ours.
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
                src={getTigerAsset("caqc", 1)}
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
            How to Pass the SAAQ Knowledge Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers as a list</h3>
              <p>
                50 km/h in town, 70 km/h on gravel, 100 km/h maximum and 60 km/h minimum on highways; 1 metre from a cyclist up to 50 km/h and 1.5 metres above it; 5 metres from a school bus with its red lights flashing; 3 metres from a fire hydrant; low beams within 150 metres. The Code part asks for exact figures, so write them on one page and review it daily.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Sort signs by shape and colour</h3>
              <p>
                Yellow diamonds warn, orange marks roadwork, fluorescent yellow-green marks school zones, a red circle with a bar forbids and a green circle requires. The stop sign reads &quot;Arrêt&quot;. Once you know the families, a sign you have never seen is easy to place.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the new-driver rules cold</h3>
              <p>
                The 4-point limit, the zero-alcohol rule, the midnight to 5 a.m. ban for learners and the demerit points for phones (5), seat belts (3) and school buses (9) come up again and again. They are also the rules that cost new drivers their licence, so they are worth learning well beyond the test.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your weakest part</h3>
              <p>
                Because you need 75 percent on each part, one weak area fails the whole test. Tigertest tracks your accuracy by topic: after each practice test, retrain the set for that test, drill the questions you missed, and aim to clear 75 percent with room to spare on all four tests before your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SAAQ Knowledge Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the SAAQ knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The SAAQ knowledge test is split into three parts: the Highway Safety Code, road signs and traffic signals, and driving behaviours and techniques. You need 75 percent on each part, not just 75 percent overall, so a weak part fails you even if the others are strong. The practice tests here use the same 75 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">When can I take the SAAQ knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              First you take the driving course at a school recognized by the SAAQ and pass its Phase 1 exam to get your Class 5 learner&apos;s licence, which you can get from age 16 (with parental consent under 18). After holding the learner&apos;s licence for at least 10 months you book the knowledge test online through SAAQclic. If you fail, you must wait at least 28 days to try again. The road test comes after 12 months with the learner&apos;s licence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the SAAQ knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Multiple-choice questions on the Highway Safety Code (speed limits, passing, parking, seat belts, licences and demerit points), on road signs, traffic lights and pavement markings, and on safe driving behaviour: right of way, sharing the road with pedestrians, cyclists and heavy vehicles, alcohol, drugs, fatigue, distraction and driving in winter. The SAAQ does not publish the number of questions. The practice tests here cover all three parts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the rules for learner and probationary drivers in Quebec?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learner drivers must be accompanied by someone who has held a Class 5 licence for at least two years, may not drive between midnight and 5 a.m., and lose the licence at 4 demerit points. Learner and probationary drivers, and every driver under 22, must follow the zero-alcohol rule. The probationary licence lasts two years, with the same 4-point limit and, for drivers 19 or under, a limit on young passengers between midnight and 5 a.m. in the first year.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I take the SAAQ test in English, and is this test official?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, the SAAQ gives the knowledge test in English as well as French, and you can ask for Spanish, Mandarin or Arabic where available. This practice test is written in English. Tigertest is an independent study tool, not the SAAQ: the questions are original, written from the SAAQ driving course and Quebec&apos;s Highway Safety Code, and they are not the real test questions.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="caqc" />

      <ExamRelatedTests examId="caqc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the SAAQ Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all three parts of the test.</p>
          <ExamLandingCTA dashboardHref="/saaq/dashboard" />
        </div>
      </div>
    </div>
  );
}
