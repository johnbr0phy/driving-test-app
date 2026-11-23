import "@/lib/v2/banks/faaifr";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Instrument Rating Practice Test 2026 - FAA IFR Written Exam (IRA)";
const metaDescription =
  "Free FAA instrument rating written test practice: 200 original three-choice questions on IFR regulations, weather, instruments, navigation, holding, approaches and human factors, with explanations.";
const description =
  "Free practice for the FAA Instrument Rating Airplane (IRA) knowledge test, with 200 original three-choice questions written from the Instrument Rating Airplane ACS, the Instrument Flying and Instrument Procedures Handbooks, the AIM and 14 CFR. Two full 60-question tests in 2 hours plus eight drills by knowledge area, with chart, approach plate and weather data given in words instead of a testing supplement and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the FAA instrument rating written test?",
    a: "The Instrument Rating Airplane (IRA) knowledge test has 60 multiple-choice questions, each with three answer choices. You have 2 hours to finish, and you need 70 percent to pass. You must be at least 15 years old and have an endorsement from an authorized instructor or a home-study course before you take it.",
  },
  {
    q: "What is on the instrument rating knowledge test?",
    a: "The questions come from the knowledge elements of the Instrument Rating Airplane Airman Certification Standards (FAA-S-ACS-8C): IFR regulations and currency, weather and weather products, flight instruments and aircraft systems, navigation systems and en route charts, ATC clearances, departures, holding and lost communications, instrument approaches, and human factors and risk management. Many questions refer to a testing supplement of en route charts and approach plates.",
  },
  {
    q: "How long is the instrument written test result good for?",
    a: "A passed knowledge test is valid for 24 calendar months. You must take the instrument rating practical test within that time. Your test report lists ACS codes for the topics you missed, and your instructor must review them with you before the checkride.",
  },
  {
    q: "Is this the same as the real FAA instrument rating test?",
    a: "It is built like it: 60 three-choice questions in 2 hours across the same knowledge areas, scored against the 70 percent pass mark. The questions are original and written from FAA handbooks and regulations, not copied from the FAA test or its sample questions. The real test uses a testing supplement; here any chart value, approach minimum or weather report you need is written into the question.",
  },
  {
    q: "Is the Tigertest instrument rating practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the regulations, weather theory, weather reports and instruments drills are free; Practice Test 2 and the navigation, ATC and holding, approaches and human factors drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "instrument rating written test, FAA instrument knowledge test, IRA practice test, IFR written exam practice, instrument rating practice test free, instrument ground school questions, ACS instrument rating",
  alternates: {
    canonical: `${siteUrl}/instrument-rating-written-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/instrument-rating-written-test`,
    images: [{ url: shareImageUrl("faaifr"), width: 1200, height: 630, alt: "Tigertest free instrument rating written test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("faaifr")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Instrument Rating Written Test Practice",
      description,
      url: `${siteUrl}/instrument-rating-written-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("faaifr"),
      featureList: [
        "200 original instrument rating practice questions with explanations",
        "2 full 60-question practice tests in 2 hours, three choices per question",
        "8 drills covering every knowledge area of the Instrument Rating ACS",
        "Chart, approach and weather data written into each question, no testing supplement needed",
        "Alternate, fuel, holding, climb gradient and descent rate problems",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("faaifr"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "IFR regulations and qualifications", weight: "8 per test" },
  { name: "Flight instruments and systems", weight: "8 per test" },
  { name: "Navigation and en route charts", weight: "8 per test" },
  { name: "ATC clearances, departures and holding", weight: "8 per test" },
  { name: "Instrument approaches", weight: "8 per test" },
  { name: "Weather theory for IFR", weight: "7 per test" },
  { name: "Weather reports and forecasts", weight: "7 per test" },
  { name: "Human factors and decision-making", weight: "6 per test" },
];

export default function InstrumentRatingLandingPage() {
  return (
    <div data-theme="faaifr" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Instrument Rating Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/instrument-rating/dashboard"
            shortName="Instrument Rating"
            subtitle="200 three-choice questions for the FAA IRA knowledge test. Free to start, no account needed."
            shots={{ mobile: "/landing/faaifr-mobile.png", desktop: "/landing/faaifr-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="faaifr" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Knowledge Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the knowledge areas of the Instrument Rating ACS: IFR regulations, weather theory, weather reports, instruments and systems, navigation, ATC and holding, approaches, and human factors. Questions you miss come back until you have mastered them.
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
                Two 60-question tests in 2 hours, the FAA&apos;s time limit, with three choices per question like the real test. Chart values, approach minimums and weather reports are written into each question. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Instrument Rating ACS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The FAA writes the IRA test from the knowledge elements of the Instrument Rating Airplane Airman Certification Standards (FAA-S-ACS-8C) but does not publish how many questions come from each area. Every practice test here spreads its 60 questions across the areas like this.
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
                src={getTigerAsset("faaifr", 3)}
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
            How to Pass the Instrument Rating Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get your endorsement first</h3>
              <p>
                You need a logbook endorsement from an authorized instructor, or a certificate from a home-study ground school, before you can sit the test at an FAA testing center. Bring photo ID, and expect to have 2 hours for 60 questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the IFR numbers cold</h3>
              <p>
                Currency, the 1-2-3 alternate rule, standard alternate minimums, IFR fuel, VOR check limits, holding speeds and leg times, and the lost communication rules of 91.185 are pure recall. Put them on one page and quiz yourself until you never hesitate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read approach plates and en route charts</h3>
              <p>
                Much of the real test is read from a supplement of en route charts and approach plates: MEAs and MOCAs, changeover points, minimums, visual descent points and missed approach instructions. Practice with real charts beside you so the symbols are familiar.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill the weather products</h3>
              <p>
                Decode METARs, TAFs and winds aloft by hand, and know what each SIGMET, convective SIGMET and AIRMET covers and how long it is valid. Tigertest tracks your accuracy by knowledge area, so retake the drill you miss most until you are well over 70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Instrument Rating Written Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="faaifr" />
        </div>
      </div>

      <SampleQuestionsV2 examId="faaifr" />

      <ExamRelatedTests examId="faaifr" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Instrument Written?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every knowledge area.</p>
          <ExamLandingCTA dashboardHref="/instrument-rating/dashboard" />
        </div>
      </div>
    </div>
  );
}
