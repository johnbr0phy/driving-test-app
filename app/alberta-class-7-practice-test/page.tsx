import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Alberta Class 7 Practice Test 2026 - Free Learner Test";
const metaDescription =
  "Free Alberta Class 7 practice test: 200 questions from the Alberta Driver's Guide on signs, right-of-way, demerits and GDL rules, every answer explained.";
const description =
  "Free Alberta Class 7 learner's licence practice tests with 200 questions from the Alberta Driver's Guide (cars and light trucks, Spring 2026): licensing and GDL rules, traffic signals and pavement markings, signs and speed limits, intersections and right-of-way, driving basics and parking, emergencies, sharing the road, and impaired driving and demerits. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Alberta Class 7 practice test, Alberta learners test, Alberta learner's licence practice test, Alberta knowledge test 2026, Class 7 knowledge test practice questions, Alberta driver's guide test, free Alberta learners practice test",
  alternates: {
    canonical: `${siteUrl}/alberta-class-7-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/alberta-class-7-practice-test`,
    images: [{ url: "/og/caab", width: 1200, height: 630, alt: "Tigertest free Alberta Class 7 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/caab"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Alberta Class 7 Practice Tests",
      description,
      url: `${siteUrl}/alberta-class-7-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Alberta Class 7 practice questions",
        "4 practice tests across every chapter of the Driver's Guide",
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
          name: "How many questions are on the Alberta Class 7 knowledge test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Class 7 knowledge test has 30 multiple-choice questions, and you need 25 correct (83 percent) to pass. You take it on a computer at an Alberta registry agent office. The practice tests here have 50 questions each and use the same 83 percent pass line, so you need 42 of 50.",
          },
        },
        {
          "@type": "Question",
          name: "What do I need to take the Class 7 learner's test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be at least 14, bring acceptable identification, pass a vision test, and have a parent or guardian sign a consent form if you are under 18. There is a fee each time you take the knowledge test, and you can take it only once a day. When you pass, take your test permit to a registry agent so your licence is updated.",
          },
        },
        {
          "@type": "Question",
          name: "What are the rules once I have my Class 7 learner's licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must drive with a fully licensed (non-GDL) driver aged 18 or older seated next to you, you may not drive between midnight and 5 a.m., you may not carry more passengers than there are seat belts, and you must have zero alcohol and zero drugs in your system. Eight demerit points within two years brings a suspension. You must hold the learner's licence for at least one year, and be 16, before taking the Class 5 road test.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the Alberta Class 7 knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Questions are taken from the Alberta Driver's Guide and cover safe driving practices, driving laws and road signs: the GDL program, traffic signals and pavement markings, signs and default speed limits, right-of-way at intersections and roundabouts, parking and highway driving, emergencies and winter driving, sharing the road with school buses, cyclists and trucks, and impaired driving and demerit points. Alberta does not publish topic weights, so the practice tests here follow the chapters of the 2026 guide.",
          },
        },
        {
          "@type": "Question",
          name: "Can I take the Class 7 test in a language other than English?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The computer test is offered in 25 languages, including French, Punjabi, Arabic, Simplified and Traditional Chinese, Spanish, Tagalog, Urdu, Ukrainian and Vietnamese, and audio and oral versions are available. The practice questions here are in English. Tigertest is a free study tool and is not affiliated with the Government of Alberta.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licensing & GDL", weight: "10%" },
  { name: "Signals & Pavement Markings", weight: "12%" },
  { name: "Traffic Signs & Speed Limits", weight: "14%" },
  { name: "Intersections, Turns & Right-of-Way", weight: "18%" },
  { name: "Driving Basics, Parking & Highways", weight: "16%" },
  { name: "Emergencies & Challenging Conditions", weight: "12%" },
  { name: "Sharing the Road", weight: "10%" },
  { name: "Impaired Driving, Demerits & the Law", weight: "8%" },
];

export default function AlbertaClass7LandingPage() {
  return (
    <div data-theme="caab" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Alberta Class 7 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/alberta-class-7/dashboard"
            shortName="Class 7"
            subtitle="200 questions from the 2026 Alberta Driver's Guide on signs, signals, right-of-way, roundabouts, parking, winter driving, school buses, GDL rules, demerits and impaired driving. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caab-mobile.png", desktop: "/landing/caab-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caab" />

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
                Four 50-question tests covering every chapter of the Driver&apos;s Guide, with the real test&apos;s 83 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the Alberta Driver&apos;s Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question comes from the Spring 2026 Driver&apos;s Guide for cars and light trucks, the book the real test is written from. Alberta does not publish how the 30 questions are split, so the practice tests follow the guide&apos;s chapters, with the most questions on right-of-way, signs and the everyday driving rules learners get wrong most often.
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
                src={getTigerAsset("caab", 1)}
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
            How to Pass the Alberta Class 7 Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers as a list</h3>
              <p>
                The test loves distances and limits: 50 km/h in town, 80 km/h on rural roads, 100 km/h on provincial highways, 30 km/h in school and playground zones, 60 km/h past stopped emergency vehicles and tow trucks, 5 metres from a hydrant, stop sign or crosswalk, 50 cm from the curb, about 20 metres back from a stopped school bus, low beams within 150 metres when following and 300 metres when meeting a car. Write them on one card and drill it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who goes first</h3>
              <p>
                Right-of-way is the biggest topic. At an intersection with no signs, yield to the vehicle on your right, even at a T intersection. At a four-way stop, the first to stop goes first, and the vehicle on the right wins a tie. In a roundabout, yield to traffic already circulating, and in a two-lane circle, the right lane yields to the left.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Memorize the GDL and demerit rules</h3>
              <p>
                As a learner you need a fully licensed supervisor aged 18 or older beside you, no driving from midnight to 5 a.m., no more passengers than seat belts and zero alcohol and drugs. GDL drivers are suspended at 8 demerit points, full drivers at 15. Expect questions on the IRS impaired driving programs too.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, take its practice test, and retrain the questions you missed. When you clear 83 percent on all four tests, book your knowledge test at a registry agent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Alberta Class 7 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Alberta Class 7 knowledge test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Class 7 knowledge test has 30 multiple-choice questions, and you need 25 correct (83 percent) to pass. You take it on a computer at an Alberta registry agent office. The practice tests here have 50 questions each and use the same 83 percent pass line, so you need 42 of 50.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What do I need to take the Class 7 learner&apos;s test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be at least 14, bring acceptable identification, pass a vision test, and have a parent or guardian sign a consent form if you are under 18. There is a fee each time you take the knowledge test, and you can take it only once a day. When you pass, take your test permit to a registry agent so your licence is updated.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the rules once I have my Class 7 learner&apos;s licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must drive with a fully licensed (non-GDL) driver aged 18 or older seated next to you, you may not drive between midnight and 5 a.m., you may not carry more passengers than there are seat belts, and you must have zero alcohol and zero drugs in your system. Eight demerit points within two years brings a suspension. You must hold the learner&apos;s licence for at least one year, and be 16, before taking the Class 5 road test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the Alberta Class 7 knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Questions are taken from the Alberta Driver&apos;s Guide and cover safe driving practices, driving laws and road signs: the GDL program, traffic signals and pavement markings, signs and default speed limits, right-of-way at intersections and roundabouts, parking and highway driving, emergencies and winter driving, sharing the road with school buses, cyclists and trucks, and impaired driving and demerit points. Alberta does not publish topic weights, so the practice tests here follow the chapters of the 2026 guide.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I take the Class 7 test in a language other than English?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The computer test is offered in 25 languages, including French, Punjabi, Arabic, Simplified and Traditional Chinese, Spanish, Tagalog, Urdu, Ukrainian and Vietnamese, and audio and oral versions are available. The practice questions here are in English. Tigertest is a free study tool and is not affiliated with the Government of Alberta.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="caab" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Alberta Class 7 Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions from every chapter of the Driver&apos;s Guide.</p>
          <ExamLandingCTA dashboardHref="/alberta-class-7/dashboard" />
        </div>
      </div>
    </div>
  );
}
