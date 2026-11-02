
import { CommunityGate } from "@/components/CommunityUpsell";
import { COMMUNITY_DMV_KEY } from "@/lib/communityStats";
import { getTigerAsset } from "@/lib/tigerAssets";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Link from "next/link";
import { TEST_CATALOG } from "@/lib/testCatalog";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { states } from "@/data/states";
import { HomeHero, HomeCTA } from "@/components/HomeHero";
import { T } from "@/components/T";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { landingUpdatedAt } from "@/lib/landingDates";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/siteSchema";

const siteUrl = SITE_URL;

const pageUrl = `${siteUrl}/dmv-practice-test`;
const title = "Free DMV Practice Test 2026 - All 50 States";
const description =
  "Free DMV practice tests for all 50 states and DC: 200+ questions per state from the driver's manual, with instant feedback and an explanation on every answer.";

// The DMV landing lived at / until the homepage became the Tigertest hub.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${title} | Tigertest`, description, url: pageUrl, siteName: "Tigertest", type: "website", images: [shareImageUrl("dmv")] },
  twitter: { card: "summary_large_image", title: `${title} | Tigertest`, description, images: [shareImageUrl("dmv")] },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
// `k` is the i18n key prefix (landing.<k>Q / landing.<k>A); keep i18n/en.ts in step.
const faqs = [
  {
    k: "faq5",
    q: "What is the best free DMV practice test website?",
    a: "Tigertest (tigertest.io) is a free DMV practice test website covering all 50 US states and Washington, DC. Each state has 200 practice questions, 40 of them written from that state's driver's manual, with instant feedback, an explanation for every answer and practice tests that simulate the real DMV exam. It's free to start with no credit card required.",
  },
  {
    k: "faq1",
    q: "How many questions are on the DMV written test?",
    a: "It depends on your state: from 18 questions in Pennsylvania to 50 in states like Florida and Michigan, and most states ask 25 to 40. Tigertest offers 200 practice questions per state so you're fully prepared for every possible question topic.",
  },
  {
    k: "faq2",
    q: "Can I use Tigertest for free?",
    a: "Yes. Tigertest is free to start in all 50 states, with no credit card or account required. Free users get Training Sets 1 and 2 and Practice Tests 1 and 2. Premium ($9.99 one-time, not a subscription) unlocks Training Sets 3 and 4, Practice Tests 3 and 4 and full question analytics.",
  },
  {
    k: "faq3",
    q: "What score do I need to pass the DMV test?",
    a: "Most states require a score of 80% or higher to pass. Some states like New York require only 70%, while Idaho requires 85% and Maryland 88% (22 of 25). Tigertest tracks your progress and shows your pass probability as you practice.",
  },
  {
    k: "faq4",
    q: "How should I study for the DMV permit test?",
    a: "Start with Tigertest's training mode to learn questions with instant feedback. Once you feel confident, take practice tests to simulate the real exam. Most users pass after completing all 4 training sets and scoring 80%+ on practice tests.",
  },
  {
    k: "faq6",
    q: "Is Tigertest better than DMV practice tests from other sites?",
    a: "Tigertest gives you 200 questions for your state: 160 on the rules of the road every state shares and 40 written from your state's official driver's manual, in English or Spanish. Training mode explains every answer, and the progress tracker shows exactly which questions you keep getting wrong so you can focus your study time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "en-US",
      dateModified: landingUpdatedAt("dmv"),
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebApplication",
      name: "Tigertest - Free DMV Practice Tests",
      description:
        "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
      url: pageUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "200 state-specific questions per state",
        "All 50 US states covered",
        "Training mode with instant feedback and explanations",
        "Practice tests simulating the real DMV exam",
        "Detailed analytics and progress tracking",
        "Tracks your weakest questions",
        "Free to start — no credit card required",
        "One-time premium upgrade, no subscription",
        "Works on mobile and desktop",
        "Spanish language support",
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
        classFaqJsonLd("dmv"),
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

export default function DmvLandingPage() {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            <T k="landing.heroTitle">Free DMV Practice Tests for All 50 States</T>
          </h1>
          <HomeHero />
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          <T k="landing.howItWorks">How It Works</T>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                <T k="landing.trainingMode">Training Mode</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                <T k="landing.trainingModeDesc">Learn the questions on your phone while you&apos;re in bed, on the couch, or waiting around. Instant feedback after each answer helps you memorize faster.</T>
              </p>
            </div>
          </div>

          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                <T k="landing.practiceTests">Practice Tests</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                <T k="landing.practiceTestsDesc">When you&apos;re ready, take a full 50-question test. Sit down, focus, and simulate the real exam — just like you&apos;ll do at the DMV.</T>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Short on time? Urgency / Premium hook, once Common Mistakes has enough answers */}
      <CommunityGate examId={COMMUNITY_DMV_KEY}>
      <div className="bg-brand-light py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-3">
            <T k="landing.urgencyEyebrow">Short on time?</T>
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            <T k="landing.urgencyTitle">We know which questions everyone fails. Start there.</T>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            <T k="landing.urgencyDesc">Tigertest Premium shows you the questions real test-takers get wrong most — so if your test is in a few days, you&apos;re practicing what actually matters, not random filler.</T>
          </p>
          <Link
            href="/signup"
            className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors"
          >
            <T k="landing.urgencyCTA">See the hardest questions →</T>
          </Link>
        </div>
      </div>
      </CommunityGate>

      {/* Testimonial */}
      <div className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic mb-4">
            &quot;<T k="landing.testimonial1">felt confident after just studying the previous day</T>&quot;
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">JayjayX12</p>
        </div>
      </div>

      {/* State specific */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              <T k="landing.stateSpecificTitle">Questions Written for Your State, Not Generic Filler</T>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              <T k="landing.stateSpecificDesc">Every state has different driving laws. Tigertest uses questions specific to your state&apos;s DMV handbook — the same material that&apos;s on your actual test.</T>
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              <T k="landing.allStatesCovered">All 50 states covered. 200 questions each.</T>
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={getTigerAsset("dmv", 1)}
              alt="Tigertest mascot"
              width={180}
              height={180}
              className="w-32 md:w-44"
            />
          </div>
        </div>
      </div>

      {/* Choose Your State - SEO state grid */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
            <T k="landing.chooseYourState">Choose Your State</T>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            <T k="landing.chooseYourStateDesc">Select your state below to start practicing with questions based on your state&apos;s official driver&apos;s manual and DMV requirements.</T>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularStates.map(
              (state) =>
                state && (
                  <Link
                    key={state.slug}
                    href={`/${state.slug}-dmv-practice-test`}
                    className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-50 text-sm">
                      {state.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{state.writtenTestQuestions}Q</span>
                  </Link>
                )
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/practice-tests-by-state"
              className="text-brand-dark hover:text-brand-darker font-medium hover:underline"
            >
              <T k="landing.viewAllStates">View all 50 states</T> &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic mb-4">
            &quot;<T k="landing.testimonial2">it really helped me prepare, and I passed my exam today</T>&quot;
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Big-Burrito-8765</p>
        </div>
      </div>

      {/* Reddit proof section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
          <T k="landing.builtForPeople">Built for People Who Just Need to Pass</T>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 flex items-center justify-center gap-2">
          <T k="landing.fromReddit">From r/driving and r/DMV on</T>
          <Image
            src="/reddit.png"
            alt="Reddit"
            width={72}
            height={24}
            className="h-[55px] w-auto inline-block dark:hidden"
          />
          <Image
            src="/reddit-dark.png"
            alt="Reddit"
            width={72}
            height={24}
            className="h-[55px] w-auto hidden dark:inline-block"
          />
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <p className="text-gray-800 dark:text-gray-100 mb-3">&quot;<T k="landing.testimonial3">Used this to help me study. Passed today! Thank you :)</T>&quot;</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">u/Naive_Usual1910</p>
          </a>

          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <p className="text-gray-800 dark:text-gray-100 mb-3">&quot;<T k="landing.testimonial4">passed within seven minutes</T>&quot;</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">vivacious-vi</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <p className="text-gray-800 dark:text-gray-100 mb-3">&quot;<T k="landing.testimonial5">it was very helpful... I passed the written test this morning</T>&quot;</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">ideapad101</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <p className="text-gray-800 dark:text-gray-100 mb-3">&quot;The interface is smooth and easy to navigate, unlike other free practice tests. I passed with only two mistakes!&quot;</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Yzabelle</p>
          </div>

          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <p className="text-gray-800 dark:text-gray-100 mb-3">&quot;<T k="landing.testimonial7">i passed in 3 minutes</T>&quot;</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">u/Curdled_Cave</p>
          </a>

          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <p className="text-gray-800 dark:text-gray-100 mb-3">&quot;<T k="landing.testimonial1">felt confident after just studying the previous day</T>&quot;</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">JayjayX12</p>
          </div>
        </div>
      </div>

      {/* How to Study for Your DMV Test - SEO content section */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            <T k="landing.howToPassTitle">How to Pass Your DMV Permit Test on the First Try</T>
          </h2>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                <T k="landing.howToPass1Title">1. Study Your State&apos;s Driver&apos;s Manual</T>
              </h3>
              <p>
                <T k="landing.howToPass1Desc">Every state publishes an official driver&apos;s handbook covering traffic laws, road signs, and safe driving practices. This manual is the source material for all questions on the written knowledge test. Tigertest&apos;s 200 practice questions per state are based directly on this material.</T>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                <T k="landing.howToPass2Title">2. Use Training Mode to Learn the Material</T>
              </h3>
              <p>
                <T k="landing.howToPass2Desc">Start with Tigertest&apos;s training mode, which gives you instant feedback after each question. When you get a question wrong, it goes into a review queue so you see it again until you master it. Most users complete all 4 training sets in 2-3 study sessions.</T>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                <T k="landing.howToPass3Title">3. Take Practice Tests to Build Confidence</T>
              </h3>
              <p>
                <T k="landing.howToPass3Desc">Once you&apos;ve completed the training sets, take the 4 practice tests to simulate the real exam. Each test has 50 questions with the same format and time pressure you&apos;ll face at the DMV. Aim for 80% or higher on every practice test before scheduling your real exam.</T>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                <T k="landing.howToPass4Title">4. Know What to Expect on Test Day</T>
              </h3>
              <p>
                <T k="landing.howToPass4Desc">Most states administer the written knowledge test on a computer at a DMV office. The number of questions varies by state, from 18 questions in Pennsylvania to 50 in Florida, Michigan and New Jersey. Passing scores range from 70% to 85% depending on your state. Bring valid identification and any required documents.</T>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          <T k="landing.faqTitle">Frequently Asked Questions</T>
        </h2>

        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.k}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                <T k={`landing.${f.k}Q`}>{f.q}</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                <T k={`landing.${f.k}A`}>{f.a}</T>
              </p>
            </div>
          ))}
          <ExamClassFaq examId="dmv" />
        </div>
      </div>

      {/* Other practice tests. Short on purpose: the homepage stays about the DMV test. */}
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">
                <T k="landing.otherTestsTitle">Studying for something else?</T>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                <T k="landing.otherTestsSub">Tigertest also has free practice tests for other exams.</T>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TEST_CATALOG.filter((test) => test.id !== "dmv").map((test) => (
                <Link
                  key={test.id}
                  href={test.href}
                  className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-brand hover:text-brand transition-colors"
                >
                  {test.shortName}
                </Link>
              ))}
              <Link href="/tests" className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover transition-colors">
                <T k="landing.otherTestsAll">All tests</T>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            <T k="landing.readyToPass">Ready to Pass Your Permit Test?</T>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            <T k="landing.freeToStartLong">Free to start. No account required. 200 questions for your state.</T>
          </p>
          <HomeCTA />
        </div>
      </div>
    </div>
  );
}
