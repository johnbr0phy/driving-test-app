import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free PSM I Practice Test 2026 - Scrum Guide Questions";
const metaDescription =
  "Free PSM I practice exam: 200 original questions on the 2020 Scrum Guide, with two full 80-question tests in 60 minutes, multiple answer and true/false items, and explanations.";
const description =
  "Free Professional Scrum Master I (PSM I) practice tests with 200 original questions written from the 2020 Scrum Guide: Scrum theory and values, the Scrum Team and its accountabilities, events and timeboxes, artifacts and commitments, product value and the Scrum Master's service. Each test has 80 questions in 60 minutes, the real assessment's pace, mixing multiple choice, multiple answer and true/false items, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the PSM I assessment?",
    a: "80 questions in 60 minutes, taken online in English. The question types are multiple choice, multiple answer and true/false. You need 85 percent to pass, which is 68 correct answers out of 80.",
  },
  {
    q: "What is the PSM I based on?",
    a: "The Scrum Guide, the free document by Ken Schwaber and Jeff Sutherland that defines Scrum. The current edition is from November 2020. It covers Scrum theory and values, the Scrum Team's three accountabilities, the five events, the three artifacts and their commitments: the Product Goal, the Sprint Goal and the Definition of Done.",
  },
  {
    q: "Does the PSM I certification expire?",
    a: "No. Scrum.org says its PSM I certification does not expire and needs no renewal fee. There is also no required course: you can prepare on your own and buy an attempt directly from Scrum.org.",
  },
  {
    q: "Is this practice test the same format as the real PSM I?",
    a: "It is built like it. Each practice test is 80 questions in 60 minutes, mixing single answer, multiple answer and true/false items, and every multiple answer item tells you how many to choose. The questions are original and written from the Scrum Guide; they are not taken from Scrum.org or its Open Assessments.",
  },
  {
    q: "Is the Tigertest PSM I practice test free?",
    a: "Yes. Both practice tests and all six drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PSM I practice test, PSM 1 practice exam, free PSM I questions, Professional Scrum Master practice test, Scrum Master practice exam, Scrum Guide 2020 quiz, PSM I exam prep, scrum.org assessment practice",
  alternates: {
    canonical: `${siteUrl}/psm-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/psm-1-practice-test`,
    images: [{ url: shareImageUrl("psm"), width: 1200, height: 630, alt: "Tigertest free PSM I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("psm")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PSM I Practice Test",
      description,
      url: `${siteUrl}/psm-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original PSM I practice questions with explanations",
        "2 full 80-question practice tests in 60 minutes",
        "6 drills covering every part of the 2020 Scrum Guide",
        "Multiple choice, multiple answer and true/false items",
        "Scored against the real 85 percent pass mark",
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
        classFaqJsonLd("psm"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scrum events and timeboxes", count: "18" },
  { name: "The Scrum Team and accountabilities", count: "14" },
  { name: "Artifacts and commitments", count: "14" },
  { name: "Scrum theory, pillars and values", count: "12" },
  { name: "Scrum Master service and facilitation", count: "12" },
  { name: "Product value, backlog and stakeholders", count: "10" },
];

export default function PsmLandingPage() {
  return (
    <div data-theme="psm" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PSM I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/psm-1/dashboard"
            shortName="PSM I"
            subtitle="200 original questions on the 2020 Scrum Guide. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/psm-mobile.png", desktop: "/landing/psm-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="psm" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills follow the Scrum Guide: theory and values, the Scrum Team, events and timeboxes, artifacts and commitments, product value and stakeholders, and serving as Scrum Master. Questions you miss come back until you have mastered them.
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
                Two full 80-question tests in 60 minutes, the real assessment&apos;s pace, with flagging and review. Practice Test 2 is held out of the drills, so it measures readiness against the 85 percent pass mark.
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
                Built on the 2020 Scrum Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Scrum.org does not publish a topic weighting for PSM I, so every practice test covers the whole Scrum Guide, with the most questions on the events, the accountabilities and the artifacts. Questions per 80-question test:
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("psm", 1)}
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
            How to Pass the PSM I
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the Scrum Guide more than once</h3>
              <p>
                The whole assessment rests on one short document. Read it slowly, then again, and note the exact wording: who is accountable for what, which events have which timeboxes, and which commitment belongs to which artifact.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer from the Guide, not from your workplace</h3>
              <p>
                Many teams use practices the Guide never mentions, such as story points, velocity targets or a Definition of Ready. When a question asks what Scrum says, pick the answer the Guide supports, even if your own team does it differently.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the traps</h3>
              <p>
                The Daily Scrum belongs to the Developers, only the Product Owner can cancel a Sprint, the Sprint Review is not a release gate, work that is not Done goes back to the Product Backlog, and teams on one product share one Product Owner, Product Backlog and Definition of Done.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                80 questions in 60 minutes is 45 seconds each, and 85 percent leaves room for only 12 misses. Take a full practice test under time, drill the topics you miss most, and aim for 90 percent before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PSM I Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="psm" />
        </div>
      </div>

      <ExamRelatedTests examId="psm" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PSM I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole Scrum Guide.</p>
          <ExamLandingCTA dashboardHref="/psm-1/dashboard" />
        </div>
      </div>
    </div>
  );
}
