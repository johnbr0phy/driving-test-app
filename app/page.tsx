import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { states } from "@/data/states";
import { HomeHero, HomeCTA } from "@/components/HomeHero";
import { T } from "@/components/T";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free DMV Practice Tests",
      description:
        "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "200 questions per state",
        "All 50 US states covered",
        "Training mode with instant feedback",
        "Practice tests simulating real exams",
        "Detailed analytics and progress tracking",
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
          name: "How many questions are on the DMV written test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states have between 20-50 questions on the DMV written test. TigerTest offers 200 practice questions per state so you're fully prepared for every possible question topic.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use TigerTest for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can take practice tests and train with questions for free across all 50 states.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass the DMV test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states require a score of 80% or higher to pass. Some states like New York require only 70%, while states like Idaho and Maryland require 85%. TigerTest tracks your progress and shows your pass probability as you practice.",
          },
        },
        {
          "@type": "Question",
          name: "How should I study for the DMV permit test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with TigerTest's training mode to learn questions with instant feedback. Once you feel confident, take practice tests to simulate the real exam. Most users pass after completing all 4 training sets and scoring 80%+ on practice tests.",
          },
        },
      ],
    },
  ],
};

// Popular states for the grid
const popularStateSlugs = [
  "california", "texas", "florida", "new-york", "pennsylvania",
  "illinois", "ohio", "georgia", "north-carolina", "michigan",
  "new-jersey", "virginia",
];

const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter(Boolean);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            <T k="landing.heroTitle">Free DMV Practice Tests for All 50 States</T>
          </h1>
          <HomeHero />
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          <T k="landing.howItWorks">How It Works</T>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <T k="landing.trainingMode">Training Mode</T>
              </h3>
              <p className="text-gray-600">
                <T k="landing.trainingModeDesc">Learn the questions on your phone while you&apos;re in bed, on the couch, or waiting around. Instant feedback after each answer helps you memorize faster.</T>
              </p>
            </div>
          </div>

          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <T k="landing.practiceTests">Practice Tests</T>
              </h3>
              <p className="text-gray-600">
                <T k="landing.practiceTestsDesc">When you&apos;re ready, take a full 50-question test. Sit down, focus, and simulate the real exam — just like you&apos;ll do at the DMV.</T>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
            &quot;<T k="landing.testimonial1">felt confident after just studying the previous day</T>&quot;
          </p>
          <p className="text-gray-500 text-sm">JayjayX12</p>
        </div>
      </div>

      {/* State specific */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <T k="landing.stateSpecificTitle">Questions Written for Your State, Not Generic Filler</T>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              <T k="landing.stateSpecificDesc">Every state has different driving laws. TigerTest uses questions specific to your state&apos;s DMV handbook — the same material that&apos;s on your actual test.</T>
            </p>
            <p className="text-gray-500">
              <T k="landing.allStatesCovered">All 50 states covered. 200 questions each.</T>
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/tiger_face_01.png"
              alt="TigerTest mascot"
              width={180}
              height={180}
              className="w-32 md:w-44"
            />
          </div>
        </div>
      </div>

      {/* Choose Your State - SEO state grid */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            <T k="landing.chooseYourState">Choose Your State</T>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            <T k="landing.chooseYourStateDesc">Select your state below to start practicing with questions based on your state&apos;s official driver&apos;s manual and DMV requirements.</T>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularStates.map(
              (state) =>
                state && (
                  <Link
                    key={state.slug}
                    href={`/${state.slug}-dmv-practice-test`}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm">
                      {state.name}
                    </span>
                    <span className="text-xs text-gray-400">{state.writtenTestQuestions}Q</span>
                  </Link>
                )
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/practice-tests-by-state"
              className="text-brand hover:text-brand-dark font-medium hover:underline"
            >
              <T k="landing.viewAllStates">View all 50 states</T> &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
            &quot;<T k="landing.testimonial2">it really helped me prepare, and I passed my exam today</T>&quot;
          </p>
          <p className="text-gray-500 text-sm">Big-Burrito-8765</p>
        </div>
      </div>

      {/* Reddit proof section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          <T k="landing.builtForPeople">Built for People Who Just Need to Pass</T>
        </h2>
        <p className="text-gray-600 text-center mb-12 flex items-center justify-center gap-2">
          <T k="landing.fromReddit">From r/driving and r/DMV on</T>
          <Image
            src="/reddit.png"
            alt="Reddit"
            width={72}
            height={24}
            className="h-[55px] w-auto inline-block"
          />
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
          >
            <p className="text-gray-800 mb-3">&quot;<T k="landing.testimonial3">Used this to help me study. Passed today! Thank you :)</T>&quot;</p>
            <p className="text-gray-500 text-sm">u/Naive_Usual1910</p>
          </a>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;<T k="landing.testimonial4">passed within seven minutes</T>&quot;</p>
            <p className="text-gray-500 text-sm">vivacious-vi</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;<T k="landing.testimonial5">it was very helpful... I passed the written test this morning</T>&quot;</p>
            <p className="text-gray-500 text-sm">ideapad101</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;The interface is smooth and easy to navigate, unlike other free practice tests. I passed with only two mistakes!&quot;</p>
            <p className="text-gray-500 text-sm">Yzabelle</p>
          </div>

          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
          >
            <p className="text-gray-800 mb-3">&quot;<T k="landing.testimonial7">i passed in 3 minutes</T>&quot;</p>
            <p className="text-gray-500 text-sm">u/Curdled_Cave</p>
          </a>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;<T k="landing.testimonial1">felt confident after just studying the previous day</T>&quot;</p>
            <p className="text-gray-500 text-sm">JayjayX12</p>
          </div>
        </div>
      </div>

      {/* How to Study for Your DMV Test - SEO content section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            <T k="landing.howToPassTitle">How to Pass Your DMV Permit Test on the First Try</T>
          </h2>

          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <T k="landing.howToPass1Title">1. Study Your State&apos;s Driver&apos;s Manual</T>
              </h3>
              <p>
                <T k="landing.howToPass1Desc">Every state publishes an official driver&apos;s handbook covering traffic laws, road signs, and safe driving practices. This manual is the source material for all questions on the written knowledge test. TigerTest&apos;s 200 practice questions per state are based directly on this material.</T>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <T k="landing.howToPass2Title">2. Use Training Mode to Learn the Material</T>
              </h3>
              <p>
                <T k="landing.howToPass2Desc">Start with TigerTest&apos;s training mode, which gives you instant feedback after each question. When you get a question wrong, it goes into a review queue so you see it again until you master it. Most users complete all 4 training sets in 2-3 study sessions.</T>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <T k="landing.howToPass3Title">3. Take Practice Tests to Build Confidence</T>
              </h3>
              <p>
                <T k="landing.howToPass3Desc">Once you&apos;ve completed the training sets, take the 4 practice tests to simulate the real exam. Each test has 50 questions with the same format and time pressure you&apos;ll face at the DMV. Aim for 80% or higher on every practice test before scheduling your real exam.</T>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <T k="landing.howToPass4Title">4. Know What to Expect on Test Day</T>
              </h3>
              <p>
                <T k="landing.howToPass4Desc">Most states administer the written knowledge test on a computer at a DMV office. The number of questions varies by state — from 20 questions in New York and Alaska to 50 questions in California, Florida, and Michigan. Passing scores range from 70% to 85% depending on your state. Bring valid identification and any required documents.</T>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          <T k="landing.faqTitle">Frequently Asked Questions</T>
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              <T k="landing.faq1Q">How many questions are on the DMV written test?</T>
            </h3>
            <p className="text-gray-600">
              <T k="landing.faq1A">Most states have between 20-50 questions on the DMV written test. TigerTest offers 200 practice questions per state so you&apos;re fully prepared for every possible question topic.</T>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              <T k="landing.faq2Q">Can I use TigerTest for free?</T>
            </h3>
            <p className="text-gray-600">
              <T k="landing.faq2A">Yes! You can take practice tests and train with questions for free across all 50 states.</T>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              <T k="landing.faq3Q">What score do I need to pass the DMV test?</T>
            </h3>
            <p className="text-gray-600">
              <T k="landing.faq3A">Most states require a score of 80% or higher to pass. Some states like New York require only 70%, while states like Idaho and Maryland require 85%. TigerTest tracks your progress and shows your pass probability as you practice.</T>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              <T k="landing.faq4Q">How should I study for the DMV permit test?</T>
            </h3>
            <p className="text-gray-600">
              <T k="landing.faq4A">Start with TigerTest&apos;s training mode to learn questions with instant feedback. Once you feel confident, take practice tests to simulate the real exam. Most users pass after completing all 4 training sets and scoring 80%+ on practice tests.</T>
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <T k="landing.readyToPass">Ready to Pass Your Permit Test?</T>
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            <T k="landing.freeToStartLong">Free to start. No account required. 200 questions for your state.</T>
          </p>
          <HomeCTA />
        </div>
      </div>
    </div>
  );
}
