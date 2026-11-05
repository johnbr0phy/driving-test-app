import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "NZ Firearms Licence Practice Test 2026 - Free Theory Test Questions";
const metaDescription =
  "Free practice for the New Zealand firearms licence theory test: 200 original questions on the Firearms Safety Code, the seven rules, states of readiness, storage, transport and the Arms Act 2026, in six 30-question tests.";
const description =
  "Free practice for the theory test that first-time firearms licence applicants in New Zealand sit on the Firearms Safety Course: 200 original questions on the seven basic rules of firearm safety, the LOAD, ACTION, INSTANT and UNLOAD states, target identification and firing zones, safe handling in the field, secure storage and transport, alcohol, ammunition faults, and licence holder obligations under the Arms Act 2026. Six real-length tests of 30 questions and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz firearms licence test, firearms licence theory test nz, firearms safety code test, nz gun licence test, firearms safety course nz, seven rules of firearm safety, nz firearms licence practice test 2026, firearms theory test questions nz",
  alternates: {
    canonical: `${siteUrl}/nz-firearms-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-firearms-licence-practice-test`,
    images: [{ url: shareImageUrl("nzfirearms"), width: 1200, height: 630, alt: "Tigertest free NZ firearms licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzfirearms")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the New Zealand firearms licence theory test?",
    a: "It is the written part of the Firearms Safety Course that you must pass before your vetting interview if you are applying for a firearms licence for the first time, or your licence expired more than a year ago. The course is run by Firearms Safety and Education New Zealand, the regulator that replaced Te Tari Pūreke (the Police Firearms Safety Authority) under the Arms Act 2026. You sit the theory test first, then a practical session where you show safe handling of a deactivated firearm.",
  },
  {
    q: "How many questions are on the firearms theory test and what score do you need?",
    a: "The theory test is 30 multiple-choice questions in 30 minutes, offered in English, Simplified Chinese and te reo Māori, and you may bring a reader, writer or interpreter. The regulator does not publish a pass mark. Candidates report needing about 27 of 30, so Tigertest uses 90% as its target. If you fail the first attempt you get a second one after the practical session.",
  },
  {
    q: "What should I study for the firearms theory test?",
    a: "The regulator says everything you need is in the Firearms Safety Code: the seven basic rules of firearm safety, the LOAD, ACTION, INSTANT and UNLOAD states, target identification, firing zones, safe handling, storage and transport, and licence holder obligations. The code is being updated for the Arms Act 2026, which came into force on 23 September 2026, so these questions use the new Act's terms, such as restricted firearms for what were called prohibited firearms.",
  },
  {
    q: "How are these practice tests different from the real test?",
    a: "Each of the six practice tests has 30 questions like the real one, drawn across the whole code, and no question appears in more than one test. Five training sets cover the same topics with instant feedback until you master them. The practical session, where you show safe handling, states of readiness and fence crossing with a deactivated firearm, can only be learned hands-on.",
  },
  {
    q: "Are these the real firearms licence test questions?",
    a: "No. Every question is original, written by Tigertest from the Firearms Safety Code, the regulator's current guidance on storage and the Arms Act 2026. It is free practice for safe firearms knowledge, not affiliated with Firearms Safety and Education New Zealand or New Zealand Police, and it does not replace the Firearms Safety Course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Firearms Licence Practice Test",
      description,
      url: `${siteUrl}/nz-firearms-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NZD" },
      featureList: [
        "200 firearms safety practice questions",
        "6 real-length tests of 30 questions",
        "5 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Rules 1 to 3: loaded, muzzle and chamber", weight: "5 per test" },
  { name: "Rule 4: identify your target", weight: "4 per test" },
  { name: "Rule 5: check your firing zone", weight: "4 per test" },
  { name: "States of readiness", weight: "4 per test" },
  { name: "Safe handling in the field", weight: "4 per test" },
  { name: "Rules 6 and 7: storage, transport and alcohol", weight: "3 per test" },
  { name: "Licence holder obligations and the law", weight: "3 per test" },
  { name: "Firearms, ammunition and malfunctions", weight: "3 per test" },
];

export default function NzFirearmsLandingPage() {
  return (
    <div data-theme="nzfirearms" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Firearms Licence Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-firearms-licence/dashboard"
            shortName="firearms licence test"
            subtitle="200 original questions on the Firearms Safety Code: the seven rules, states of readiness, target identification, firing zones, safe handling, storage and transport, and the Arms Act 2026. Six 30-question tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nzfirearms-mobile.png", desktop: "/landing/nzfirearms-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzfirearms" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: the first three rules with the states of readiness, target identification and firing zones, safe handling in the field, storage, transport, alcohol and the law, and firearms and ammunition. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six tests of 30 questions, like the real theory test, each drawn across the whole Firearms Safety Code with a 27 of 30 target. No question appears in more than one test, and every answer explains the rule behind it.
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
                Built on the Firearms Safety Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real theory test is 30 multiple-choice questions in 30 minutes on the Firearms Safety Code, safe practice and the law. The regulator publishes no topic weights, so each test here follows the code&apos;s own sections:
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
                src={getTigerAsset("nzfirearms", 1)}
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
            How to Pass the Firearms Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the seven rules by heart, in order</h3>
              <p>
                Treat every firearm as loaded, point it in a safe direction, chamber a cartridge only when ready to fire, identify your target beyond all doubt, check your firing zone, store and transport firearms and ammunition safely, and avoid alcohol or drugs. Many questions are a rule applied to a hunting scene.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the four states of readiness</h3>
              <p>
                LOAD has cartridges in the magazine only, ACTION a round chambered with the safety on, INSTANT the safety off once you have decided to fire, and UNLOAD everything empty and checked twice. Know when each one applies: reaching the hunting area, sighting game, crossing a fence, entering a hut, going back to the vehicle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think &quot;if in doubt, don&apos;t shoot&quot;</h3>
              <p>
                Never fire at sound, shape, colour or movement alone, never at the skyline, and never when you have lost sight of a companion. Background, target, sights is the order for checking your firing zone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Study the code more than once</h3>
              <p>
                The regulator says everything on the theory test is in the Firearms Safety Code and advises studying it thoroughly, not reading it once. Finish every training set, then aim for 27 or more on each practice test before your course.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Firearms Licence Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="nzfirearms" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearms Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole Firearms Safety Code.</p>
          <ExamLandingCTA dashboardHref="/nz-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
