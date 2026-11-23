import "@/lib/banks/atvsafety";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free ATV & Snowmobile Safety Course Practice Test 2026";
const metaDescription =
  "ATV and snowmobile safety course practice test, free to start: 200 original questions on ATV controls and fit, protective gear, hills and obstacles, passengers and roads, snowmobile riding, ice, trail emergencies and trailering, every answer explained.";
const description =
  "Practice for your state's ATV, OHV or snowmobile safety course test, free to start: 200 original questions written from state course outlines, CPSC's ATV guidance and the New York State Parks snowmobile course. Four 50-question practice tests and four training sets covering the ATV and its gear, hills and safe riding, the snowmobile and its riding skills, and ice, emergencies and trail rules.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "atv safety course practice test, atv safety test, atv safety course test answers, snowmobile safety course test, snowmobile safety test, ohv safety course test, youth atv safety course, off-highway vehicle safety test, snowmobile safety certificate test",
  alternates: {
    canonical: `${siteUrl}/atv-snowmobile-safety-course-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/atv-snowmobile-safety-course-practice-test`,
    images: [{ url: shareImageUrl("atvsafety"), width: 1200, height: 630, alt: "Tigertest ATV and snowmobile safety course practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("atvsafety")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is an ATV or snowmobile safety course?",
    a: "It is a state course, usually run by the natural resources or parks agency, that teaches safe and legal riding: the machine and its controls, protective gear, riding skills on hills, snow and ice, laws, trail ethics, loading and towing, and what to do in an emergency. Many states teach it online, in a classroom or in a hands-on class with volunteer instructors.",
  },
  {
    q: "Do I need a safety certificate to ride an ATV or snowmobile?",
    a: "It depends on your state and your age. Many states require young riders to pass a course before riding on public land or trails, and some require it of adults born after a set date. Minnesota, for example, requires an ATV safety certificate for anyone born after July 1, 1987, and Pennsylvania requires one for riders 8 to 15 riding off their family's land. Check your own state's rules.",
  },
  {
    q: "How many questions are on the test, and what score do I need?",
    a: "There is no single national exam. Each state runs its own course and sets its own final test and passing score; New York's snowmobile course, for example, asks for 75% on its final exam. Tigertest's practice tests have 50 questions each and use 80% as a readiness line.",
  },
  {
    q: "Why are ATV and snowmobile questions in one practice test?",
    a: "States teach both courses to the same outline (the machine, controls, safety features, riding, laws, towing, ethics, hazards and the environment), and many riders take both. The ATV topics make up 28 of each 50-question test and the snowmobile topics 22. If you only need one course, train on its two training sets: sets 1 and 2 are ATV, sets 3 and 4 are snowmobile.",
  },
  {
    q: "Are these the real course test questions?",
    a: "No. Every question is original, written by Tigertest from state course outlines, CPSC's ATV pages, the ATV Safety Institute's riding guide and the New York State Parks snowmobile course text. Tigertest is not affiliated with any state agency, CPSC or the ATV Safety Institute, and no course quiz or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - ATV & Snowmobile Safety Course Practice Test",
      description,
      url: `${siteUrl}/atv-snowmobile-safety-course-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("atvsafety"),
      featureList: [
        "200 ATV and snowmobile safety practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations",
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
        classFaqJsonLd("atvsafety"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "ATV Types, Controls & Fit", weight: "8%" },
  { name: "Protective Gear & Pre-Ride Checks", weight: "8%" },
  { name: "Starting, Posture, Turning & Braking", weight: "10%" },
  { name: "Hills, Obstacles & Terrain", weight: "12%" },
  { name: "Passengers, Roads & Riding Safely", weight: "10%" },
  { name: "Trail Ethics, Laws & Towing", weight: "8%" },
  { name: "Snowmobile Parts & Maintenance", weight: "8%" },
  { name: "Snowmobile Clothing & Preparation", weight: "8%" },
  { name: "Snowmobile Riding & Sharing the Trail", weight: "12%" },
  { name: "Ice, Night & Trail Emergencies", weight: "8%" },
  { name: "Trail Signs, Ethics & Trailering", weight: "8%" },
];

export default function AtvSafetyLandingPage() {
  return (
    <div data-theme="atvsafety" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ATV & Snowmobile Safety Course Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/atv-snowmobile-safety/dashboard"
            shortName="ATV & Snowmobile Safety"
            subtitle="200 ATV and snowmobile safety questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/atvsafety-mobile.png", desktop: "/landing/atvsafety-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="atvsafety" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: the ATV, its gear and basic riding; ATV hills, safety and trail ethics; the snowmobile and its riding skills; and ice, emergencies and trail rules. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions with an 80% readiness line. Your state sets the real pass mark. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on State Safety Course Outlines
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                State course outlines, such as Minnesota&apos;s for ATVs and snowmobiles, list the same topics: the machine and its controls, safety features, operating procedures, laws, loading and towing, a code of ethics, hazards and the environment. No weights are published, so Tigertest splits each 50-question test across eleven topics, 28 ATV and 22 snowmobile: 4 machine, 4 gear, 5 riding, 6 hills and terrain, 5 safe riding, 4 ethics and towing, then 4 snowmobile parts, 4 preparation, 6 riding and trail sharing, 4 ice and emergencies and 4 signs and trailering.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("atvsafety", 3)}
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
            How to Pass Your ATV or Snowmobile Safety Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the machine before you ride it</h3>
              <p>
                Controls, the engine stop switch, the youth ATV age categories and the fit checks for a young rider. For snowmobiles, learn the kill switch, brake, wear bars, drive belt and sliders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn where your weight goes</h3>
              <p>
                ATVs and snowmobiles are steered with your body. Know where to lean when climbing, descending, crossing a slope or turning, and what to do if you lose momentum on a hill.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study the safety rules that save lives</h3>
              <p>
                No passengers on a single-rider ATV, stay off paved roads, cross roads correctly, never ride impaired, and never trust ice you have not checked. Know frostbite, hypothermia and what to do if you get lost.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know trail manners, signs and towing</h3>
              <p>
                Ride Right, yield to groomers and horses, read trail signs, load and secure a trailer, and tow a disabled machine safely. Then take the 50-question tests and aim for 80% or better. Ages and certificate rules vary by state, so check yours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ATV & Snowmobile Safety Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="atvsafety" />
        </div>
      </div>

      <ExamSampleQuestions examId="atvsafety" />

      <ExamRelatedTests examId="atvsafety" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your ATV or Snowmobile Safety Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on riding skills, hills, ice, trail rules and towing.</p>
          <ExamLandingCTA dashboardHref="/atv-snowmobile-safety/dashboard" />
        </div>
      </div>
    </div>
  );
}
