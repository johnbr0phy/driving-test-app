import "@/lib/banks/bowhunter";
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

const title = "Free Bowhunter Education Practice Test 2026 - Bowhunter Ed Exam Prep";
const metaDescription =
  "Bowhunter education practice test, free to start: 200 original questions on bows, arrows, broadheads and crossbows, tree stand safety, shooting and distance judging, shot placement, blood trailing and bowhunting ethics, every answer explained.";
const description =
  "Practice for your state's bowhunter education course test, free to start: 200 original questions written from the IHEA-USA bowhunter education standards and the course content approved by the National Bowhunter Education Foundation (NBEF). Four 50-question practice tests and four training sets covering bows, arrows and crossbows; archery safety and tree stands; shooting skills and shot placement; and game recovery, ethics and conservation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "bowhunter education practice test, bowhunter ed test, bowhunter education exam, bow hunter safety course test, bowhunter education test answers, ibep bowhunter test, nbef bowhunter course, archery hunting course test, crossbow safety course test",
  alternates: {
    canonical: `${siteUrl}/bowhunter-education-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/bowhunter-education-practice-test`,
    images: [{ url: shareImageUrl("bowhunter"), width: 1200, height: 630, alt: "Tigertest bowhunter education practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("bowhunter")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is bowhunter education?",
    a: "Bowhunter education is a course that teaches safe, responsible and law-abiding bowhunting. The National Bowhunter Education Foundation (NBEF) runs the International Bowhunter Education Program, which follows the IHEA-USA bowhunter education standards and is offered in all 50 states and every Canadian province. It goes deeper than a general hunter education course on bows, arrows, broadheads, tree stands, shot placement and game recovery.",
  },
  {
    q: "Do I need a bowhunter education course to hunt with a bow?",
    a: "It depends on where you hunt. Some states and provinces require a bowhunter education course before you can bowhunt or get a bowhunting license. Rules change, so check your state wildlife agency's regulations before the season.",
  },
  {
    q: "How many questions are on the bowhunter education test, and what score do I need?",
    a: "There is no single national exam. Each state runs its own course, online or with an instructor, and sets its own final test and passing score. Tigertest's practice tests have 50 questions each and use 80% as a readiness line.",
  },
  {
    q: "Does this cover crossbows?",
    a: "Yes. The bank includes crossbow questions on draw weight and power stroke, arrows and nocks, cocking aids, uncocking, sights, shooting form and using a crossbow from a tree stand. Whether crossbows are legal during archery season varies by state.",
  },
  {
    q: "Are these the real course test questions?",
    a: "No. Every question is original, written by Tigertest from the IHEA-USA bowhunter education standards and the NBEF-approved course content. Tigertest is not affiliated with NBEF, IHEA-USA or any state wildlife agency, and no course quiz or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Bowhunter Education Practice Test",
      description,
      url: `${siteUrl}/bowhunter-education-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("bowhunter"),
      featureList: [
        "200 bowhunter education practice questions",
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
        classFaqJsonLd("bowhunter"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Bows & Accessories", weight: "10%" },
  { name: "Arrows, Points & Broadheads", weight: "12%" },
  { name: "Crossbows", weight: "8%" },
  { name: "Archery & Field Safety", weight: "10%" },
  { name: "Tree Stands & Fall Arrest", weight: "12%" },
  { name: "Shooting Skills & Distance", weight: "10%" },
  { name: "Hunting Methods, Scents & Calls", weight: "6%" },
  { name: "Shot Placement & Angles", weight: "10%" },
  { name: "Game Recovery & Field Care", weight: "8%" },
  { name: "Ethics, Laws & Respect", weight: "8%" },
  { name: "Bowhunting & Conservation", weight: "6%" },
];

export default function BowhunterLandingPage() {
  return (
    <div data-theme="bowhunter" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Bowhunter Education Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/bowhunter-education/dashboard"
            shortName="Bowhunter Education"
            subtitle="200 bowhunter education questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/bowhunter-mobile.png", desktop: "/landing/bowhunter-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="bowhunter" />

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
                Four training sets: bows, arrows and crossbows; archery safety and tree stands; shooting skills and shot placement; and game recovery, ethics and conservation. Questions you miss come back until you have mastered them.
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
                Built on the IHEA-USA Bowhunter Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The IHEA-USA standards set what every bowhunter education course teaches, in five areas: the overview, equipment and accessories, safety, shooting skills and techniques, and responsibilities and game recovery. No weights are published, so Tigertest splits each 50-question test across eleven topics: 5 bows, 6 arrows and broadheads, 4 crossbows, 5 safety, 6 tree stands, 5 shooting, 3 methods, 5 shot placement, 4 recovery, 4 ethics and 3 conservation.
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
                src={getTigerAsset("bowhunter", 3)}
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
            How to Pass Your Bowhunter Education Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your gear and how it is matched</h3>
              <p>
                Bow types, draw length and draw weight, arrow spine and length, fletching, points and the three kinds of broadheads. Most equipment questions come down to matching arrows to the bow, the archer and the game.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn tree stand safety step by step</h3>
              <p>
                Falls from stands are the main bowhunting danger. Know the parts of a fall-arrest system, when to attach it, where the tree strap goes, how to use a haul line and what to do if you fall.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study shot angles and vital areas</h3>
              <p>
                An arrow kills by cutting, not shock, so placement is everything. Learn which angles to take and which to pass up, where to aim, and how far you can shoot well.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know what to do after the shot</h3>
              <p>
                How long to wait for each kind of hit, what blood and hair tell you, how to search when the trail goes cold and how to approach downed game. Then take the 50-question tests and aim for 80% or better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Bowhunter Education Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="bowhunter" />
        </div>
      </div>

      <ExamSampleQuestions examId="bowhunter" />

      <ExamRelatedTests examId="bowhunter" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Bowhunter Education Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on bowhunting gear, tree stands, shot placement and recovery.</p>
          <ExamLandingCTA dashboardHref="/bowhunter-education/dashboard" />
        </div>
      </div>
    </div>
  );
}
