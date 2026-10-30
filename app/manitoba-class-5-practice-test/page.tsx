import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Manitoba Class 5 Practice Test 2026 - MPI Knowledge Test";
const metaDescription =
  "Free Manitoba Class 5 knowledge test practice: 200 questions from the MPI Driver's Handbook on signs, right-of-way, GDL rules, winter driving and impaired driving. All explained.";
const description =
  "Free Manitoba Class 5 learner knowledge test practice with 200 questions from the MPI Driver's Handbook: signs, signals and pavement markings, right-of-way and turns, sharing the road, Graduated Driver Licensing rules, speed and parking, poor conditions and emergencies, and impaired and distracted driving. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Manitoba Class 5 practice test, MPI practice test, Manitoba knowledge test, Manitoba learner test, Class 5L practice test, MPI driver's handbook quiz, Manitoba driving test 2026, free Manitoba permit practice test",
  alternates: {
    canonical: `${siteUrl}/manitoba-class-5-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/manitoba-class-5-practice-test`,
    images: [{ url: "/og/camb", width: 1200, height: 630, alt: "Tigertest free Manitoba Class 5 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/camb"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Manitoba Class 5 Practice Tests",
      description,
      url: `${siteUrl}/manitoba-class-5-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Manitoba Class 5 knowledge test practice questions",
        "4 practice tests across all seven handbook topics",
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
          name: "What score do I need to pass the Manitoba Class 5 knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Manitoba Public Insurance does not publish a pass mark. Driving schools and prep sites report it as 24 or 25 correct out of 30, so the practice tests here use an 80 percent pass line as a study target. Aim to clear it comfortably on all four tests before you book.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the Manitoba knowledge test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The test is usually reported as 30 multiple-choice questions. MPI gives you 30 minutes, the test is taken on a computer, it is not open book, and phones and electronic devices are not allowed in the test area. It costs 12 dollars, is available in English, French and 28 other languages with audio, and you book it with an Autopac agent or online.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the Manitoba Class 5 knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Traffic laws, safe driving practices and road signs, all from the MPI Driver's Handbook. That means sign shapes and colours, traffic signals and pavement markings, right-of-way and turning rules, pedestrians, cyclists, school buses and emergency vehicles, Graduated Driver Licensing restrictions, parking distances, winter and night driving, emergencies, and the penalties for impaired and distracted driving.",
          },
        },
        {
          "@type": "Question",
          name: "Who can take the test and what happens after I pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be at least 16, or 15 and a half if you are in a high school driver education course that is in progress, and you need a parent or guardian's consent if you are under 18. Passing the test and the vision and medical standards gets you a Class 5L learner licence. You then drive with a supervising driver who has held a full licence for at least three years for at least nine months before the road test. If you fail, you wait seven days to try again.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real MPI test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. MPI does not release its test questions. Every question here is written from the October 2026 MPI Driver's Handbook and tests the same rules, with an explanation of the right answer on each one. It is a study tool, not an official test, so read the handbook too.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Signs, Signals & Markings", weight: "20%" },
  { name: "Right-of-Way, Turns & Passing", weight: "18%" },
  { name: "Sharing the Road", weight: "16%" },
  { name: "Licensing & GDL", weight: "12%" },
  { name: "Speed, Parking & Equipment", weight: "12%" },
  { name: "Poor Conditions & Emergencies", weight: "12%" },
  { name: "Impaired & Distracted Driving", weight: "10%" },
];

export default function ManitobaClass5LandingPage() {
  return (
    <div data-theme="camb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Manitoba Class 5 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/manitoba-class-5/dashboard"
            shortName="MB Class 5"
            subtitle="200 questions from the MPI Driver's Handbook on signs, right-of-way, sharing the road, GDL rules, parking, winter driving and impaired driving. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/camb-mobile.png", desktop: "/landing/camb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="camb" />

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
                Four 50-question tests covering every chapter of the MPI Driver&apos;s Handbook, with an 80 percent practice pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the MPI Driver&apos;s Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                MPI says the Class 5 knowledge test checks traffic laws, safe driving practices and road signs, and points you to the Driver&apos;s Handbook to prepare. It does not publish a topic split, so the practice tests follow the handbook&apos;s own chapters. Signs and right-of-way take the biggest share, and every test also covers Manitoba&apos;s GDL rules, school buses, winter driving and the suspensions for impaired and distracted driving.
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
                src={getTigerAsset("camb", 1)}
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
            How to Pass the Manitoba Knowledge Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour</h3>
              <p>
                The shape tells you the job before you can read the words: octagon for stop, a downward triangle for yield, a diamond for a warning, a fluorescent yellow-green pentagon for a school area, a crossbuck for a railway crossing and a triangle with its tips cut off for a slow-moving vehicle. Add the signals, including the flashing green left arrow and the transit priority signal, and the yellow and white pavement lines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your GDL stage rules cold</h3>
              <p>
                As a Class 5L learner you need a supervising driver who has held a full licence for three years and has less than .05 blood alcohol, sitting as the only front seat passenger. You may not tow, you may carry rear passengers only up to the working seatbelts, and you cannot have any alcohol or drugs in your system. The Learner Stage lasts at least nine months and the Intermediate Stage at least 15.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Memorize the Manitoba numbers</h3>
              <p>
                90 km/h rural and 50 km/h urban unless posted, a four-second following distance (six on gravel), at least five metres back from a school bus with its red lights flashing, at least one metre when passing a cyclist, 40 or 60 km/h past a stopped emergency vehicle or tow truck, and no parking within 3 metres of a crosswalk or hydrant, 9 metres of a stop sign, 15 metres of a pedestrian corridor or 30 metres of a railway crossing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed and retrain that test&apos;s set, then take the four tests back to back before you book your knowledge test with an Autopac agent. Students who master all four sets and clear 80 percent on every test have covered the whole handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Manitoba Class 5 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the Manitoba Class 5 knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Manitoba Public Insurance does not publish a pass mark. Driving schools and prep sites report it as 24 or 25 correct out of 30, so the practice tests here use an 80 percent pass line as a study target. Aim to clear it comfortably on all four tests before you book.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Manitoba knowledge test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The test is usually reported as 30 multiple-choice questions. MPI gives you 30 minutes, the test is taken on a computer, it is not open book, and phones and electronic devices are not allowed in the test area. It costs 12 dollars, is available in English, French and 28 other languages with audio, and you book it with an Autopac agent or online.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the Manitoba Class 5 knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Traffic laws, safe driving practices and road signs, all from the MPI Driver&apos;s Handbook. That means sign shapes and colours, traffic signals and pavement markings, right-of-way and turning rules, pedestrians, cyclists, school buses and emergency vehicles, Graduated Driver Licensing restrictions, parking distances, winter and night driving, emergencies, and the penalties for impaired and distracted driving.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can take the test and what happens after I pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be at least 16, or 15 and a half if you are in a high school driver education course that is in progress, and you need a parent or guardian&apos;s consent if you are under 18. Passing the test and the vision and medical standards gets you a Class 5L learner licence. You then drive with a supervising driver who has held a full licence for at least three years for at least nine months before the road test. If you fail, you wait seven days to try again.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real MPI test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. MPI does not release its test questions. Every question here is written from the October 2026 MPI Driver&apos;s Handbook and tests the same rules, with an explanation of the right answer on each one. It is a study tool, not an official test, so read the handbook too.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="camb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Manitoba Knowledge Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions from every chapter of the MPI Driver&apos;s Handbook.</p>
          <ExamLandingCTA dashboardHref="/manitoba-class-5/dashboard" />
        </div>
      </div>
    </div>
  );
}
