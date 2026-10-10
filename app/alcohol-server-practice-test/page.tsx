import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Alcohol Server Certification Practice Test 2026 - Bartender & Seller Exam";
const description =
  "Free alcohol server and seller practice tests with 200 questions on standard drinks and BAC, recognizing intoxication, checking IDs and refusing minors, slowing and refusing service, and dram shop liability. Works as prep for any state or provider's responsible beverage service exam.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "alcohol server certification practice test, bartender license test, responsible beverage service practice test, TABC practice test, RBS practice test, alcohol seller server training questions, free alcohol server exam practice 2026",
  alternates: {
    canonical: `${siteUrl}/alcohol-server-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/alcohol-server-practice-test`,
    images: [{ url: "/og/alcohol", width: 1200, height: 630, alt: "TigerTest free alcohol server certification practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/alcohol"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Alcohol Server Certification Practice Tests",
      description,
      url: `${siteUrl}/alcohol-server-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 alcohol server and seller practice questions",
        "4 practice tests weighted like real certification exams",
        "Training sets for every topic area",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who needs an alcohol server or seller certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It varies by state. Some states require every bartender, server, and store clerk who sells alcohol to hold a permit or complete approved training; others make training voluntary but give establishments a liability or penalty benefit when staff are certified; and many employers and insurers require it regardless. Check your state's alcohol beverage control agency and your employer's policy.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the alcohol server exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nearly every state and provider exam covers the same five areas: how alcohol affects the body (standard drinks, absorption, BAC, and the roughly one drink per hour elimination rate), recognizing the behavioral signs of intoxication, checking IDs and preventing sales to minors, slowing and refusing service and arranging safe rides, and the laws and liability that apply to servers and establishments. This practice test is weighted the same way.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most state and provider exams require 70 to 80 percent, and many allow a retake if you miss. TigerTest marks a practice test as passed at 70 percent, so aim for 85 or better here to leave a margin on exam day.",
          },
        },
        {
          "@type": "Question",
          name: "How long is an alcohol server certificate valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically two to three years, after which you retake a course and exam. The exact period, whether your certificate transfers to another state, and whether online courses are accepted all vary by state.",
          },
        },
        {
          "@type": "Question",
          name: "Does passing the TigerTest practice test give me a certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. TigerTest is free practice to prepare you for any state or provider's responsible beverage service course and exam. To get a certificate or permit you must complete a course approved in your state and pass its exam. All four practice tests and all training sets here are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Alcohol & the Body", weight: "22%" },
  { name: "Recognizing Intoxication", weight: "20%" },
  { name: "Checking IDs & Minors", weight: "20%" },
  { name: "Intervention & Refusing Service", weight: "20%" },
  { name: "Laws & Liability", weight: "18%" },
];

export default function AlcoholServerLandingPage() {
  return (
    <div data-theme="alcohol" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="alcohol" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Alcohol Server Certification Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/alcohol-server/dashboard"
            shortName="Alcohol Server"
            subtitle="200 questions on alcohol and the body, spotting intoxication, checking IDs, refusing service and server liability. Prep for any state or provider exam. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/alcohol-mobile.png", desktop: "/landing/alcohol-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Topic</h3>
              <p className="text-gray-600">
                Four sets: alcohol and the body, recognizing intoxication and intervening, checking IDs and minors, and laws and liability. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests that mix every topic the way real server and seller exams do, with an explanation on every answer and the drink math worked out step by step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the Responsible Beverage Service Curriculum
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                State server permit exams and the national training providers all teach the same core: how alcohol works, what intoxication looks like, how to check an ID, how to slow and stop service, and what happens legally when it goes wrong. The practice tests here cover that shared material and label anything that differs by state as varying by state.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("alcohol", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The alcohol server practice test is brand new. If a question looks wrong or your state&apos;s exam covers something we missed, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the Alcohol Server Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know the standard drink cold</h3>
              <p>
                12 ounces of 5 percent beer, 5 ounces of 12 percent wine, and 1.5 ounces of 80-proof spirits each hold about 0.6 ounces of alcohol. The liver clears roughly one of those per hour, and nothing else, not coffee, food, or a cold shower, speeds it up. Half the body questions are variations on these two facts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the four cue categories</h3>
              <p>
                Lowered inhibitions, impaired judgment, slowed reactions, and loss of coordination, in roughly that order. Exams describe a guest&apos;s behavior and ask which category it fits or what you should do next. The answer is almost always to weigh several cues together with your drink count, never a single sign alone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Practice the ID check and the birthday math</h3>
              <p>
                Feel, look, ask, and give back. Compare permanent features, not hair. Check the birth date against today&apos;s date one day at a time, because the day before a 21st birthday is still under 21. When a question asks about expired, vertical, or digital IDs, the honest answer is usually that it varies by state and you follow house policy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Separate civil, criminal, and administrative</h3>
              <p>
                A lawsuit for damages is civil (dram shop). Charges against a server are criminal. A license suspension is administrative. Hours of sale, penalties, happy hour rules, and training requirements all vary by state, so if an answer choice claims a rule is the same everywhere, it is usually wrong unless it is the 21 drinking age or the 0.08 driving limit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Alcohol Server Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Who needs an alcohol server or seller certificate?</h3>
            <p className="text-gray-600">
              It varies by state. Some states require every bartender, server, and store clerk who sells alcohol to hold a permit or complete approved training; others make training voluntary but give establishments a liability or penalty benefit when staff are certified; and many employers and insurers require it regardless. Check your state&apos;s alcohol beverage control agency and your employer&apos;s policy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the alcohol server exam?</h3>
            <p className="text-gray-600">
              Nearly every state and provider exam covers the same five areas: how alcohol affects the body (standard drinks, absorption, BAC, and the roughly one drink per hour elimination rate), recognizing the behavioral signs of intoxication, checking IDs and preventing sales to minors, slowing and refusing service and arranging safe rides, and the laws and liability that apply to servers and establishments. This practice test is weighted the same way.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600">
              Most state and provider exams require 70 to 80 percent, and many allow a retake if you miss. TigerTest marks a practice test as passed at 70 percent, so aim for 85 or better here to leave a margin on exam day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How long is an alcohol server certificate valid?</h3>
            <p className="text-gray-600">
              Typically two to three years, after which you retake a course and exam. The exact period, whether your certificate transfers to another state, and whether online courses are accepted all vary by state.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does passing the TigerTest practice test give me a certificate?</h3>
            <p className="text-gray-600">
              No. TigerTest is free practice to prepare you for any state or provider&apos;s responsible beverage service course and exam. To get a certificate or permit you must complete a course approved in your state and pass its exam. All four practice tests and all training sets here are free, with no account required.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="alcohol" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Alcohol Server Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five topic areas.</p>
          <ExamLandingCTA dashboardHref="/alcohol-server/dashboard" />
        </div>
      </div>
    </div>
  );
}
