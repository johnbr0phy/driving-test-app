import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "PCOC Practice Test 2026 - Free Canadian Boating Licence Test";
const metaDescription =
  "Free Pleasure Craft Operator Card practice test: 200 original questions on Canadian safety equipment, rules of the road, buoys and emergencies. Four 50-question tests, 75% to pass.";
const description =
  "Free practice for the Transport Canada Pleasure Craft Operator Card (PCOC) test, often called the Canadian boating licence: 200 original questions written from the Safe Boating Guide and the Small Vessel and Collision Regulations. Four practice tests of 50 questions with the 75 percent pass mark, and five training sets on regulations and trip planning, minimum safety equipment, rules of the road, buoys and navigation aids, and emergencies and cold water.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pcoc practice test, pleasure craft operator card practice test, canadian boating licence test, boating licence canada practice test, pcoc test questions, canada boating exam, boat licence ontario practice test, pcoc 2026",
  alternates: {
    canonical: `${siteUrl}/pcoc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pcoc-practice-test`,
    images: [{ url: shareImageUrl("pcoc"), width: 1200, height: 630, alt: "Tigertest free PCOC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pcoc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Pleasure Craft Operator Card?",
    a: "The Pleasure Craft Operator Card (PCOC) is the most common proof of competency for operating a recreational boat with a motor in Canada, whatever its size or engine, electric trolling motors included. You get it by passing a test with a course provider accredited by Transport Canada, and it is valid for life. People often call it a boating licence, but it is a separate document from the pleasure craft licence that a boat with 10 hp or more needs.",
  },
  {
    q: "How many questions are on the PCOC test and what is the pass mark?",
    a: "The current test has 50 multiple-choice questions and you need 75 percent, 38 correct answers, to pass. It replaced the older 36-question test, which some websites still describe. Online tests usually allow about 75 minutes. Each practice test here has 50 questions and uses the same 75 percent pass mark.",
  },
  {
    q: "What does the PCOC test cover?",
    a: "It covers the Transport Canada boating safety course: proof of competency, licensing and age and horsepower limits, the minimum safety equipment for your boat, planning a trip and fuelling, the Collision Regulations with sound and light signals, the Canadian buoy system including cardinal and control buoys, and what to do in an emergency, including cold water survival. Transport Canada's Safe Boating Guide is the free official summary.",
  },
  {
    q: "Can young people get a PCOC, and are there limits for them?",
    a: "Young people can earn the card, but operators under 16 have power limits. Without direct supervision by someone 16 or older in the boat, those under 12 may operate up to 10 hp (7.5 kW) and those aged 12 to 15 up to 40 hp (30 kW). No one under 16 may operate a personal watercraft. These limits do not apply in Nunavut or the Northwest Territories.",
  },
  {
    q: "Are these the real PCOC test questions?",
    a: "No. Every question is original, written by Tigertest from Transport Canada's Safe Boating Guide and the federal regulations, so it tests the same knowledge without copying any course provider's test. It is free study practice, not an accredited test, and passing it does not give you a Pleasure Craft Operator Card.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PCOC Practice Test",
      description,
      url: `${siteUrl}/pcoc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Pleasure Craft Operator Card practice questions",
        "4 practice tests of 50 questions with the 75% pass mark",
        "5 training sets by course topic",
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
  { name: "Regulations & Licensing", weight: "14%" },
  { name: "Minimum Safety Equipment", weight: "20%" },
  { name: "Before You Go", weight: "16%" },
  { name: "Rules of the Road", weight: "20%" },
  { name: "Buoys & Navigation Aids", weight: "14%" },
  { name: "Emergencies & Cold Water", weight: "16%" },
];

export default function PcocLandingPage() {
  return (
    <div data-theme="pcoc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PCOC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/boating-canada/dashboard"
            shortName="PCOC"
            subtitle="200 original questions for the Pleasure Craft Operator Card: safety equipment, rules of the road, Canadian buoys and emergencies. Four 50-question tests with the 75% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pcoc-mobile.png", desktop: "/landing/pcoc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pcoc" />

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
                Five training sets follow the boating safety course: regulations and trip planning, minimum safety equipment, rules of the road, buoys and navigation aids, and emergencies. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, the length of the current test, each needing 38 correct (75%) to pass. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Boating Safety Course
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Transport Canada does not publish how many test questions come from each topic, so each practice test here follows the weight of the course itself: safety equipment and the rules of the road get the most questions, followed by trip planning, emergencies, regulations and buoys. Every figure is a federal one; provincial and local rules, such as alcohol on board, are left out.
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
                src={getTigerAsset("pcoc", 1)}
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
            How to Pass the PCOC Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the equipment list for your boat size</h3>
              <p>
                Many questions are about the minimum safety equipment. For a power boat up to 6 m, know the numbers: a lifejacket or PFD for each person, a 15 m buoyant heaving line, a paddle or an anchor with 15 m of line, a bailer or pump, a sound-signalling device, a watertight flashlight or three flares, and a reboarding device if the climb is over 0.5 m.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master red, right, returning, then the cardinals</h3>
              <p>
                Going upstream, red buoys are on your right and green on your left. Then learn the yellow and black cardinal buoys by their cones, and the white control buoys by their orange shapes: a diamond with a cross means keep out, a plain diamond means danger, a circle means a restriction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who gives way</h3>
              <p>
                Head-on, both turn to starboard. Crossing, the boat with the other on its right gives way. The overtaking boat always keeps clear. Learn the sound signals too: one short blast for starboard, two for port, three for astern and five for danger.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 42 or more out of 50 on every practice test before you take the accredited test. After each test, drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PCOC Test Frequently Asked Questions
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

      <ExamRelatedTests examId="pcoc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Boating Card?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every topic of the boating safety course.</p>
          <ExamLandingCTA dashboardHref="/boating-canada/dashboard" />
        </div>
      </div>
    </div>
  );
}
