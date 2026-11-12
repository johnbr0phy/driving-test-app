import "@/lib/banks/ukbregs";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const title = "Building Regulations Practice Test 2026 - Free Approved Documents Quiz";
const metaDescription =
  "Free Building Regulations practice for England: 200 original questions on Approved Documents A to T, from structure and fire safety to ventilation, drainage and Part L.";
const description =
  "Free practice on the Building Regulations 2010 and the Approved Documents for England: 200 original questions on structure, fire safety, site and moisture, sound, ventilation, sanitation, drainage, combustion appliances, stairs and access, energy and services. Four 50-question practice tests with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "building regulations practice test, approved documents quiz, building regs questions and answers, part b fire safety questions, part l quiz, building control test, site manager building regulations",
  alternates: {
    canonical: `${siteUrl}/building-regulations-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/building-regulations-practice-test`,
    images: [{ url: shareImageUrl("ukbregs"), width: 1200, height: 630, alt: "Tigertest free Building Regulations practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukbregs")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Building Regulations Practice",
      description,
      url: `${siteUrl}/building-regulations-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukbregs", "GBP"),
      featureList: ["200 Approved Document practice questions", "4 practice tests of 50 questions", "5 training sets by topic", "Instant feedback with explanations", "Auto-save progress"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is there an official Building Regulations exam?",
          acceptedAnswer: { "@type": "Answer", text: "No single one. Building control bodies, colleges and employers test knowledge of the Building Regulations in their own courses and assessments. This test checks that you know the technical requirements and the Approved Document figures used on site in England." },
        },
        {
          "@type": "Question",
          name: "Which Approved Documents does it cover?",
          acceptedAnswer: { "@type": "Answer", text: "Parts A (structure), B (fire), C and D (site, moisture, cavity fill), E (sound), F (ventilation), G (sanitation and water efficiency), H (drainage), J (combustion appliances), K (falling and glazing), L (energy), M (access), O (overheating), P (electrical safety), Q (security), R (broadband), S (EV charging) and T (toilets), plus regulation 7 on materials and workmanship." },
        },
        {
          "@type": "Question",
          name: "Is it up to date with the 2026 changes?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. It includes the Approved Document B amendments in force from 30 September 2026 (more than one common stair for flats with a top storey of 18 m or more, evacuation lifts) and notes the Future Homes Standard, which changes Parts L and F from 24 March 2027." },
        },
        {
          "@type": "Question",
          name: "Does it cover Wales or Scotland?",
          acceptedAnswer: { "@type": "Answer", text: "No. Wales has its own Approved Documents and Scotland uses the Building Standards technical handbooks. The figures here are for England." },
        },
        {
          "@type": "Question",
          name: "Are these real exam questions?",
          acceptedAnswer: { "@type": "Answer", text: "No. Every question is written by Tigertest from the Approved Documents and the Building Regulations 2010, without copying any course test or commercial question bank." },
        },
        classFaqJsonLd("ukbregs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Regulations, Materials & Workmanship", weight: "4%" },
  { name: "Structure (Part A)", weight: "10%" },
  { name: "Fire Safety (Part B)", weight: "18%" },
  { name: "Site, Moisture & Toxic Substances (C, D)", weight: "6%" },
  { name: "Resistance to Sound (Part E)", weight: "6%" },
  { name: "Ventilation (Part F)", weight: "8%" },
  { name: "Sanitation & Water Efficiency (Part G)", weight: "6%" },
  { name: "Drainage & Waste Disposal (Part H)", weight: "8%" },
  { name: "Combustion Appliances (Part J)", weight: "8%" },
  { name: "Stairs, Access, Overheating & Toilets (K, M, O, T)", weight: "12%" },
  { name: "Conservation of Fuel & Power (Part L)", weight: "8%" },
  { name: "Electrical, Security, Broadband & EV (P, Q, R, S)", weight: "6%" },
];

export default function UkbregsLandingPage() {
  return (
    <div data-theme="ukbregs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Building Regulations Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/building-regulations/dashboard"
            shortName="Building Regs"
            subtitle="200 questions on the Approved Documents A to T for England: foundations, fire escape, sound, ventilation, drainage, stairs, access and Part L. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukbregs-mobile.png", desktop: "/landing/ukbregs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukbregs" />

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
                Five training sets, from Structure, Site & Moisture to Safety, Access & Services. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests across every Approved Document, with a 70% readiness line and an explanation of the right answer on every question.
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
                Built on the Approved Documents A to T
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question comes from the current Approved Documents and Schedule 1 of the Building Regulations 2010. Fire safety, structure and stairs and access carry the most questions because they are where site mistakes cost most. Every question is original.
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
                src={getTigerAsset("ukbregs", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Teaching construction, site management or building control? Set Tigertest as practice at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which Approved Documents your group misses most. It is free for you and your learners.
        </p>
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
            How to Learn the Building Regulations
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn what each Part is for</h3>
              <p>
                Start with the 18 Parts and what each one controls: A structure, B fire, C site and moisture, E sound, F ventilation, G water and sanitation, H drainage, J heat producing appliances, K falls and glazing, L energy, M access and so on. Most questions name a situation and ask which rule applies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the figures used on site</h3>
              <p>
                Learn the numbers that come up every day: stair rise and going limits, guarding heights, escape window sizes, fall on drains, hearth sizes and the U-value limits in Part L.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Watch for the 2026 changes</h3>
              <p>
                Approved Document B changed on 30 September 2026 for tall residential buildings, and Parts L and F change with the Future Homes Standard from 24 March 2027. Check the edition a project was approved under.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by Approved Document. Aim for 85 percent on every practice test, then retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Building Regulations Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is there an official Building Regulations exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No single one. Building control bodies, colleges and employers test knowledge of the Building Regulations in their own courses and assessments. This test checks that you know the technical requirements and the Approved Document figures used on site in England.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which Approved Documents does it cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Parts A (structure), B (fire), C and D (site, moisture, cavity fill), E (sound), F (ventilation), G (sanitation and water efficiency), H (drainage), J (combustion appliances), K (falling and glazing), L (energy), M (access), O (overheating), P (electrical safety), Q (security), R (broadband), S (EV charging) and T (toilets), plus regulation 7 on materials and workmanship.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is it up to date with the 2026 changes?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. It includes the Approved Document B amendments in force from 30 September 2026 (more than one common stair for flats with a top storey of 18 m or more, evacuation lifts) and notes the Future Homes Standard, which changes Parts L and F from 24 March 2027.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does it cover Wales or Scotland?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Wales has its own Approved Documents and Scotland uses the Building Standards technical handbooks. The figures here are for England.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these real exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from the Approved Documents and the Building Regulations 2010, without copying any course test or commercial question bank.
            </p>
          </div>
          <ExamClassFaq examId="ukbregs" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukbregs" />

      <ExamRelatedTests examId="ukbregs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Test Your Building Regs?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across Parts A to T.</p>
          <ExamLandingCTA dashboardHref="/building-regulations/dashboard" />
        </div>
      </div>
    </div>
  );
}
