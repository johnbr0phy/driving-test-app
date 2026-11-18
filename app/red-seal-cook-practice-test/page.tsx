import "@/lib/banks/carscook";
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
const path = "/red-seal-cook-practice-test";

const title = "Free Red Seal Cook Practice Test 2026 - 415A Exam Prep";
const metaDescription =
  "Free Red Seal Cook practice: 200 original questions on food safety, stocks, sauces, produce, meats, fish, pastry and more, weighted like the real exam. 70% to pass.";
const description =
  "Free practice for the Red Seal Cook interprovincial exam (415A in Ontario): 200 original questions across all 13 Major Work Activities of the Red Seal Occupational Standard for Cook, from hygiene, sanitation and safety to stocks, sauces, meats, fish and seafood, and baked goods and desserts. Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal cook practice test, 415A practice exam, Red Seal cook exam questions, interprovincial cook exam, cook certificate of qualification, Red Seal cook 2026, culinary exam practice Canada",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("carscook"), width: 1200, height: 630, alt: "Tigertest free Red Seal Cook practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("carscook")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Cook Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("carscook", "CAD"),
      featureList: [
        "200 Red Seal Cook practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Tests weighted like the Red Seal exam breakdown by Major Work Activity",
        "5 training sets by topic",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the Red Seal Cook exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The exam has 150 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives up to four hours to write it. Passing earns the Red Seal endorsement, which is recognized in every province and territory.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal Cook exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions follow the Red Seal Occupational Standard for Cook, grouped into 13 Major Work Activities. The biggest are meats, game, poultry and variety meats (16 questions), fish and seafood (15), hygiene, sanitation and safety (13) and sauces (13). Produce and stocks, broths and soups have 12 each, common occupational skills and grains, pulses and nuts 11 each, dairy and eggs, pastas and dumplings, and baked goods 10 each, salads and sandwiches 9 and specialty preparation 8. The practice tests here keep those proportions in 50 questions.",
          },
        },
        {
          "@type": "Question",
          name: "Is 415A the same as the Red Seal Cook exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "415A is the Ontario trade code for Cook. Ontario apprentices write the same interprovincial Red Seal exam as everyone else. The trade is called Professional Cook 3 in British Columbia and Cook - Level 2 in Quebec, and the written exam content is the same across Canada.",
          },
        },
        {
          "@type": "Question",
          name: "Who can write the Red Seal Cook exam and how do I book it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apprentices write it when they finish their technical training and work hours, and experienced cooks without an apprenticeship can apply as trade qualifiers. Hours, fees, booking and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Red Seal exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the Occupational Standard and Health Canada food safety guidance, so it covers the same tasks without copying the exam. Food premises rules such as cooling times and sanitizer strengths vary by province, so follow your local public health rules and your kitchen's procedures.",
          },
        },
        classFaqJsonLd("carscook"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Hygiene, Sanitation & Safety", weight: "10%" },
  { name: "B. Common Occupational Skills", weight: "8%" },
  { name: "C. Produce", weight: "8%" },
  { name: "D. Stocks, Broths & Soups", weight: "8%" },
  { name: "E. Sauces", weight: "8%" },
  { name: "F. Cheese, Dairy & Eggs", weight: "6%" },
  { name: "G. Pastas, Noodles & Dumplings", weight: "6%" },
  { name: "H. Grains, Pulses, Nuts & Alt. Proteins", weight: "8%" },
  { name: "I. Meats, Poultry & Variety Meats", weight: "10%" },
  { name: "J. Fish & Seafood", weight: "10%" },
  { name: "K. Salads & Sandwiches", weight: "6%" },
  { name: "L. Specialty Preparation", weight: "6%" },
  { name: "M. Baked Goods & Desserts", weight: "6%" },
];

export default function RedSealCookLandingPage() {
  return (
    <div data-theme="carscook" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Cook Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-cook/dashboard"
            shortName="Red Seal Cook"
            subtitle="200 questions across all 13 Major Work Activities, from food safety and mother sauces to butchery, fish and pastry, with the real 70% pass mark. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/carscook-mobile.png", desktop: "/landing/carscook-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="carscook" />

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
                Five training sets by topic, from Hygiene, Safety &amp; Kitchen Skills to Salads, Charcuterie &amp; Baking. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the Red Seal exam breakdown, with the same 70% pass mark and an explanation of the right answer on every question.
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
                Built on the Red Seal Exam Breakdown
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Red Seal publishes how many of the 150 questions come from each of the 13 Major Work Activities in the Occupational Standard for Cook, and the practice tests here keep that split in 50 questions. Proteins carry the most weight: meats and poultry plus fish and seafood are about a fifth of the exam. Instructors running a culinary apprenticeship or pre-apprenticeship class can assign Tigertest at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which work activities the class misses most.
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
                src={getTigerAsset("carscook", 3)}
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
            How to Pass the Red Seal Cook Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the food safety numbers cold</h3>
              <p>
                The danger zone (4°C to 60°C), refrigerator and freezer settings, and Health Canada&apos;s safe internal temperatures (71°C for ground meat, 74°C for poultry pieces and leftovers, 82°C for whole birds, 70°C for fish) turn up across the whole exam, not just the safety section.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the classical foundations</h3>
              <p>
                Learn each mother sauce by its liquid and thickener, then its derivatives: béchamel to mornay, velouté to suprême, espagnole to demi-glace, hollandaise to béarnaise. Do the same for stocks, roux, liaisons, forcemeats and pastry doughs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match the cut to the cooking method</h3>
              <p>
                Tough, hard-working cuts need slow moist heat to turn collagen into gelatin, while tender cuts suit dry heat. Learn the same logic for poultry, variety meats, lean and oily fish, and shellfish, and practise the costing math: food cost percentage, yield and recipe conversion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by work activity. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% line. After each test, drill the questions you missed and retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Cook Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal Cook exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The exam has 150 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives up to four hours to write it. Passing earns the Red Seal endorsement, which is recognized in every province and territory.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal Cook exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions follow the Red Seal Occupational Standard for Cook, grouped into 13 Major Work Activities. The biggest are meats, game, poultry and variety meats (16 questions), fish and seafood (15), hygiene, sanitation and safety (13) and sauces (13). Produce and stocks, broths and soups have 12 each, common occupational skills and grains, pulses and nuts 11 each, dairy and eggs, pastas and dumplings, and baked goods 10 each, salads and sandwiches 9 and specialty preparation 8. The practice tests here keep those proportions in 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is 415A the same as the Red Seal Cook exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              415A is the Ontario trade code for Cook. Ontario apprentices write the same interprovincial Red Seal exam as everyone else. The trade is called Professional Cook 3 in British Columbia and Cook - Level 2 in Quebec, and the written exam content is the same across Canada.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can write the Red Seal Cook exam and how do I book it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apprentices write it when they finish their technical training and work hours, and experienced cooks without an apprenticeship can apply as trade qualifiers. Hours, fees, booking and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Red Seal exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the Occupational Standard and Health Canada food safety guidance, so it covers the same tasks without copying the exam. Food premises rules such as cooling times and sanitizer strengths vary by province, so follow your local public health rules and your kitchen&apos;s procedures.
            </p>
          </div>
          <ExamClassFaq examId="carscook" />
        </div>
      </div>

      <ExamSampleQuestions examId="carscook" />

      <ExamRelatedTests examId="carscook" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all 13 Major Work Activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-cook/dashboard" />
        </div>
      </div>
    </div>
  );
}
