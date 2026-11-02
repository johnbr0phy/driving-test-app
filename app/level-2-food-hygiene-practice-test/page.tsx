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

const siteUrl = SITE_URL;

const title = "Level 2 Food Hygiene Practice Test 2026 - Free UK Mock Tests";
const metaDescription =
  "Free Level 2 Food Safety and Hygiene for Catering practice: 200 original questions on temperatures, the 14 allergens, HACCP, cleaning and personal hygiene, every answer explained.";
const description =
  "Free practice for the UK Level 2 Award in Food Safety and Hygiene for Catering: 200 original questions on food safety law and HACCP, hazards and food poisoning, personal hygiene, temperature control, deliveries and storage, cleaning and pests, and the 14 allergens including Natasha's Law. Four 50-question mock tests with a 70 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "level 2 food hygiene practice test, level 2 food safety and hygiene for catering, food hygiene certificate questions, food safety level 2 mock test UK, food hygiene quiz UK, 14 allergens quiz, Natasha's Law, HACCP test questions",
  alternates: {
    canonical: `${siteUrl}/level-2-food-hygiene-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/level-2-food-hygiene-practice-test`,
    images: [{ url: shareImageUrl("ukfood"), width: 1200, height: 630, alt: "Tigertest free Level 2 food hygiene practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukfood")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Level 2 Food Hygiene Practice Test",
      description,
      url: `${siteUrl}/level-2-food-hygiene-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 Level 2 food safety and hygiene practice questions",
        "4 mock tests of 50 questions with a 70% pass line",
        "4 training sets, one per mock test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Level 2 food hygiene certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the usual name for the Level 2 Award in Food Safety (or Food Safety and Hygiene) for Catering, a short regulated qualification for anyone who prepares, cooks or serves food. Several awarding bodies offer it, and the course usually takes about a day. The law does not demand a certificate, but it does require food handlers to be supervised and trained in food hygiene to suit their work, and most employers use the Level 2 to show that.",
          },
        },
        {
          "@type": "Question",
          name: "How is the Level 2 food hygiene course assessed, and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most regulated versions end with a multiple-choice exam of 20 to 30 questions, taken online or on paper in under an hour. Pass marks are set by each awarding body and usually sit between 60 and 70 percent, for example 20 out of 30. The mock tests here are longer, 50 questions each, and use a 70 percent pass line so you go in with room to spare.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does Level 2 food hygiene cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your legal responsibilities, keeping yourself clean and hygienic, keeping work areas clean and free of pests, and keeping food safe. In practice that means food safety law and HACCP, bacteria and food poisoning, cross-contamination, hand washing and fitness to work, cooking, chilling and hot-holding temperatures, deliveries and stock rotation, cleaning and disinfection, and the 14 allergens.",
          },
        },
        {
          "@type": "Question",
          name: "Are the food hygiene rules different in Scotland?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mostly they are the same, with a few differences. Scottish law requires reheated food to reach 82 degrees Celsius, where 75 degrees is the usual guidance elsewhere. Food Standards Scotland runs the Food Hygiene Information Scheme, with Pass or Improvement Required instead of 0 to 5, and Scottish caterers use CookSafe where English and Welsh ones use Safer Food, Better Business. Displaying the 0 to 5 rating is compulsory in Wales and Northern Ireland but voluntary in England.",
          },
        },
        {
          "@type": "Question",
          name: "Is this an official course or certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from Food Standards Agency guidance and the food hygiene law that the Level 2 qualifications are built on, so it tests the same knowledge without copying any awarding body's exam. It is free revision for the course and the exam, not a certificate, and it does not replace the training your employer must give you.",
          },
        },
        classFaqJsonLd("ukfood"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Law, Responsibilities & HACCP", weight: "14%" },
  { name: "Hazards & Food Poisoning", weight: "18%" },
  { name: "Personal Hygiene", weight: "16%" },
  { name: "Temperature Control", weight: "20%" },
  { name: "Deliveries, Storage & Stock", weight: "8%" },
  { name: "Cleaning, Premises & Pests", weight: "16%" },
  { name: "Allergens", weight: "8%" },
];

export default function Level2FoodHygieneLandingPage() {
  return (
    <div data-theme="ukfood" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Level 2 Food Hygiene Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uk-food-hygiene/dashboard"
            shortName="Food Hygiene"
            subtitle="200 questions on temperatures, the 14 allergens, hand washing, cleaning, pests and HACCP, written to UK law and FSA guidance. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukfood-mobile.png", desktop: "/landing/ukfood-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukfood" />

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
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests covering every part of the course, with a 70 percent pass line, a little above most awarding bodies&apos; marks, and an explanation of the right answer on every question.
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
                Built on the Level 2 Food Safety in Catering Unit
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every awarding body&apos;s Level 2 catering qualification covers the same four outcomes: your legal responsibilities, keeping yourself clean, keeping the work area clean and keeping food safe. None publishes how many questions each topic gets, so the mock tests here give the most weight to temperature control and hazards, where most of the numbers to learn sit. Colleges, councils and trainers who run the course can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
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
                src={getTigerAsset("ukfood", 1)}
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
            How to Pass Level 2 Food Hygiene
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the temperatures by heart</h3>
              <p>
                Most marks hang on a few numbers: chilled food at 8°C or below by law, with fridges set at 5°C or below; hot holding at 63°C or above; freezers at -18°C; cooking to 75°C at the core for 30 seconds; reheating to 75°C, or 82°C in Scotland; cooling within 90 minutes; and the danger zone of 5°C to 63°C. Add the one-off 2 hours for hot food and 4 hours for cold food out of temperature control.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the bacteria by their foods</h3>
              <p>
                Pair each one with where it turns up: Campylobacter and Salmonella with raw poultry and eggs, Bacillus cereus with cooked rice, Clostridium perfringens with big pots of stew, Staphylococcus aureus with skin and noses, Listeria with chilled ready-to-eat food, and E. coli O157 with raw beef. Norovirus is a virus that spreads from person to person.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Say the 14 allergens out loud</h3>
              <p>
                Celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, tree nuts, peanuts, sesame, soya and sulphites. Know that prepacked for direct sale food needs a full ingredients label under Natasha&apos;s Law, and that cooking never removes an allergen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four mock tests before your exam. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Level 2 Food Hygiene Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Level 2 food hygiene certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the usual name for the Level 2 Award in Food Safety (or Food Safety and Hygiene) for Catering, a short regulated qualification for anyone who prepares, cooks or serves food. Several awarding bodies offer it, and the course usually takes about a day. The law does not demand a certificate, but it does require food handlers to be supervised and trained in food hygiene to suit their work, and most employers use the Level 2 to show that.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the Level 2 food hygiene course assessed, and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Most regulated versions end with a multiple-choice exam of 20 to 30 questions, taken online or on paper in under an hour. Pass marks are set by each awarding body and usually sit between 60 and 70 percent, for example 20 out of 30. The mock tests here are longer, 50 questions each, and use a 70 percent pass line so you go in with room to spare.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does Level 2 food hygiene cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your legal responsibilities, keeping yourself clean and hygienic, keeping work areas clean and free of pests, and keeping food safe. In practice that means food safety law and HACCP, bacteria and food poisoning, cross-contamination, hand washing and fitness to work, cooking, chilling and hot-holding temperatures, deliveries and stock rotation, cleaning and disinfection, and the 14 allergens.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are the food hygiene rules different in Scotland?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mostly they are the same, with a few differences. Scottish law requires reheated food to reach 82 degrees Celsius, where 75 degrees is the usual guidance elsewhere. Food Standards Scotland runs the Food Hygiene Information Scheme, with Pass or Improvement Required instead of 0 to 5, and Scottish caterers use CookSafe where English and Welsh ones use Safer Food, Better Business. Displaying the 0 to 5 rating is compulsory in Wales and Northern Ireland but voluntary in England.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this an official course or certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from Food Standards Agency guidance and the food hygiene law that the Level 2 qualifications are built on, so it tests the same knowledge without copying any awarding body&apos;s exam. It is free revision for the course and the exam, not a certificate, and it does not replace the training your employer must give you.
            </p>
          </div>
          <ExamClassFaq examId="ukfood" />
        </div>
      </div>

      <ExamRelatedTests examId="ukfood" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Level 2 Food Hygiene?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the course.</p>
          <ExamLandingCTA dashboardHref="/uk-food-hygiene/dashboard" />
        </div>
      </div>
    </div>
  );
}
