import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free WA Learner's Practice Test 2026 - Road Rules Theory Test";
const metaDescription =
  "Free WA learner's permit practice tests: 200 questions from the Drive Safe handbook on give way, roundabouts, signs, speed limits, BAC, P plates and demerits. All explained.";
const description =
  "Free practice tests for the Western Australia learner's permit Computerised Theory Test, with 200 questions from the Drive Safe handbook: licences, P plates and demerit points, alcohol, fatigue and seat belts, speed and following distance, signs, signals and road markings, intersections and roundabouts, lanes and freeways, sharing the road, and parking and emergencies. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "WA learners practice test, WA learner's permit test, Western Australia theory test, WA road rules test 2026, Drive Safe handbook test, WA computerised theory test, free WA learners test, Perth learner's permit",
  alternates: {
    canonical: `${siteUrl}/wa-learners-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/wa-learners-practice-test`,
    images: [{ url: "/og/auwa", width: 1200, height: 630, alt: "Tigertest free WA learner's practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/auwa"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free WA Learner's Practice Tests",
      description,
      url: `${siteUrl}/wa-learners-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 WA learner's theory test practice questions",
        "4 practice tests across all eight Drive Safe topics",
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
          name: "How many questions are on the WA learner's theory test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The car Computerised Theory Test has 30 multiple-choice questions on the road rules and safe driving, and you need at least 24 correct to pass, which is 80 percent. You cannot use your phone or the Drive Safe handbook during the test. A pass is valid for five years, and if you fail you resit and pay a resit fee.",
          },
        },
        {
          "@type": "Question",
          name: "How old do you have to be to get a learner's permit in WA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can get a car (C class) learner's permit at 16. You sit the theory test at a Driver and Vehicle Services centre or regional agent, and you can do it the same day you apply for the permit, along with an eyesight test. The permit is valid for three years. If you completed Keys4Life at school, you do not need to sit the theory test.",
          },
        },
        {
          "@type": "Question",
          name: "What comes after the theory test in WA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You learn to drive with a supervisor, displaying L plates front and rear and keeping to 100 km/h and a zero BAC. After six months on your permit and at age 16 and a half you can sit the Hazard Perception Test. Once you have logged at least 50 supervised hours, including 5 at night, and are 17, you can sit the practical driving assessment. Then you drive on red P plates for 6 months and green P plates for 18 months.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the WA learner's theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions come from Drive Safe, the Department of Transport's handbook for Western Australian road users. Expect give way rules at intersections and roundabouts, traffic signals, signs and road markings, speed limits and following distances, alcohol and BAC limits, seat belts and child restraints, overtaking, parking and stopping distances, sharing the road with cyclists and trucks, emergencies, and the learner, P plate and demerit point rules.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official WA test, and does it include the Hazard Perception Test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest is an independent study tool, not the Department of Transport's test, and every question is written from the 5 August 2026 edition of Drive Safe. It covers the road rules theory test only. The Hazard Perception Test, where you respond to video clips of traffic, is a separate test and is not modelled here. Practise until you clear 80 percent on all four tests.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Intersections & Roundabouts", weight: "16%" },
  { name: "Licences, P Plates & Demerits", weight: "14%" },
  { name: "Alcohol, Fatigue & Seat Belts", weight: "14%" },
  { name: "Signs, Signals & Markings", weight: "14%" },
  { name: "Speed, Space & Conditions", weight: "12%" },
  { name: "Lanes, Overtaking & Freeways", weight: "10%" },
  { name: "Sharing the Road", weight: "10%" },
  { name: "Parking, Crashes & Emergencies", weight: "10%" },
];

export default function WaLearnersLandingPage() {
  return (
    <div data-theme="auwa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free WA Learner&apos;s Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/wa-learners/dashboard"
            shortName="WA Learners"
            subtitle="200 questions from the Drive Safe handbook on give way, roundabouts, signs and signals, speed limits, BAC, seat belts, overtaking, parking, P plates and demerit points. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/auwa-mobile.png", desktop: "/landing/auwa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auwa" />

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
                Four 50-question tests across every part of Drive Safe, with the real test&apos;s 80 percent pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the Drive Safe Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Department of Transport writes the theory test from Drive Safe, its handbook for Western Australian road users, but does not publish how the 30 questions are split by topic. The practice tests here follow the handbook&apos;s own parts, with the most weight on give way, intersections and roundabouts, where most learners lose marks. Every rule is checked against the edition of 5 August 2026.
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
                src={getTigerAsset("auwa", 1)}
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
            How to Pass the WA Learner&apos;s Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get the give way rules automatic</h3>
              <p>
                At a STOP or GIVE WAY sign you give way to all traffic on the other road. At an uncontrolled four-way intersection you give way to the right, at a T-intersection the road that ends gives way, and turning right you give way to oncoming traffic. At a roundabout you give way to everyone already on it and drive clockwise. Flashing yellow or dark traffic lights mean treat it as a GIVE WAY sign.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers as a list</h3>
              <p>
                50 km/h in built-up areas and 110 km/h outside them, 100 km/h for learners and anyone towing, 40 km/h in school zones and past stopped emergency vehicles with flashing lights. A two-second gap, dip high beam within 200 metres, 1 metre past a cyclist up to 60 km/h and 1.5 metres above. No stopping within 10 metres of an intersection, 20 metres before a crossing or bus stop, 1 metre of a hydrant and 3 metres of a letter box.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your own licence rules</h3>
              <p>
                Zero BAC until you have held a licence for two years. L plates front and rear, 50 supervised hours with 5 at night, the Hazard Perception Test after six months. Red P plates for 6 months with no driving from midnight to 5 am and one passenger, then green P plates for 18 months. Learners and first-year drivers are disqualified at 4 demerit points, second-year drivers at 8.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. The real test allows only six wrong answers out of 30, so after each practice test, drill the questions you missed and retrain that test&apos;s set. When you clear 80 percent on all four tests, book your theory test at a Driver and Vehicle Services centre.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          WA Learner&apos;s Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the WA learner&apos;s theory test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The car Computerised Theory Test has 30 multiple-choice questions on the road rules and safe driving, and you need at least 24 correct to pass, which is 80 percent. You cannot use your phone or the Drive Safe handbook during the test. A pass is valid for five years, and if you fail you resit and pay a resit fee.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How old do you have to be to get a learner&apos;s permit in WA?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can get a car (C class) learner&apos;s permit at 16. You sit the theory test at a Driver and Vehicle Services centre or regional agent, and you can do it the same day you apply for the permit, along with an eyesight test. The permit is valid for three years. If you completed Keys4Life at school, you do not need to sit the theory test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What comes after the theory test in WA?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You learn to drive with a supervisor, displaying L plates front and rear and keeping to 100 km/h and a zero BAC. After six months on your permit and at age 16 and a half you can sit the Hazard Perception Test. Once you have logged at least 50 supervised hours, including 5 at night, and are 17, you can sit the practical driving assessment. Then you drive on red P plates for 6 months and green P plates for 18 months.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the WA learner&apos;s theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions come from Drive Safe, the Department of Transport&apos;s handbook for Western Australian road users. Expect give way rules at intersections and roundabouts, traffic signals, signs and road markings, speed limits and following distances, alcohol and BAC limits, seat belts and child restraints, overtaking, parking and stopping distances, sharing the road with cyclists and trucks, emergencies, and the learner, P plate and demerit point rules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official WA test, and does it include the Hazard Perception Test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest is an independent study tool, not the Department of Transport&apos;s test, and every question is written from the 5 August 2026 edition of Drive Safe. It covers the road rules theory test only. The Hazard Perception Test, where you respond to video clips of traffic, is a separate test and is not modelled here. Practise until you clear 80 percent on all four tests.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="auwa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your WA Learner&apos;s Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of Drive Safe.</p>
          <ExamLandingCTA dashboardHref="/wa-learners/dashboard" />
        </div>
      </div>
    </div>
  );
}
