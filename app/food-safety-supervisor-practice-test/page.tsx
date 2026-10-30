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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Food Safety Supervisor Practice Test 2026 - Free Australian Quiz";
const metaDescription =
  "Free food safety supervisor practice for Australia: 200 original questions on Standard 3.2.2A, the 5°C and 60°C rules, cooling, the 2-hour/4-hour rule, allergens and eggs, every answer explained.";
const description =
  "Free practice for the Australian food safety supervisor course (SITXFSA005 and SITXFSA006): 200 original questions on food safety law and Standard 3.2.2A, hazards and foodborne illness, personal hygiene, temperature control, receiving, storage and display, cleaning, sanitising and pests, and allergens and safe egg handling. Four 50-question mock tests with an 80 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "food safety supervisor practice test, food safety supervisor quiz australia, SITXFSA005 questions, SITXFSA006 questions, standard 3.2.2A, food safety supervisor certificate NSW, FSS course test, 2-hour 4-hour rule quiz, food handler quiz australia",
  alternates: {
    canonical: `${siteUrl}/food-safety-supervisor-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/food-safety-supervisor-practice-test`,
    images: [{ url: shareImageUrl("aufss"), width: 1200, height: 630, alt: "Tigertest free food safety supervisor practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufss")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Food Safety Supervisor Practice Test",
      description,
      url: `${siteUrl}/food-safety-supervisor-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 food safety supervisor practice questions",
        "4 mock tests of 50 questions with an 80% readiness line",
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
          name: "What is a food safety supervisor in Australia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A food safety supervisor is a person in a food business who holds a food safety supervisor certificate from a registered training organisation or a body the regulator recognises, obtained within the past five years. They supervise food handling, coach staff and help prevent or correct food safety problems. Under Standard 3.2.2A of the Food Standards Code, caterers, food service and related retail businesses that handle unpackaged, ready-to-eat, potentially hazardous food must appoint one, and the supervisor must be reasonably available while that food is handled.",
          },
        },
        {
          "@type": "Question",
          name: "Which units of competency does the food safety supervisor course cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For hospitality and retail food service it is usually SITXFSA005 Use hygienic practices for food safety and SITXFSA006 Participate in safe food handling practices, together the food safety supervision skill set. Health, community and other sectors use their own units, and the accepted units vary by state. In NSW the course must also cover the Food Authority's key focus areas: allergen management, safe egg handling, cleaning and sanitising, and Food Act offences.",
          },
        },
        {
          "@type": "Question",
          name: "How is the course assessed, and is there a pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is competency based, so there is no national pass mark. Your training organisation sets written or online knowledge questions and practical tasks, such as probing food and cleaning and sanitising equipment, and you resubmit anything you get wrong until you are judged competent. The mock tests here use an 80 percent readiness line so you go into the assessment knowing the material well.",
          },
        },
        {
          "@type": "Question",
          name: "Which temperatures and times do food safety supervisors need to know?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Keep potentially hazardous food at 5 degrees Celsius or below, or 60 degrees or above. Cool cooked food from 60 to 21 degrees within 2 hours, then to 5 degrees within a further 4 hours. Reheat food that will be held hot rapidly to 60 degrees or above. Under the 2-hour/4-hour rule, ready-to-eat food out of temperature control for under 2 hours can be used or refrigerated, 2 to 4 hours must be used and not refrigerated, and over 4 hours must be thrown away. Thermometers must be accurate to within 1 degree.",
          },
        },
        {
          "@type": "Question",
          name: "Is this an official course or certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from the Food Standards Code, FSANZ guidance and the published units of competency, so it tests the same knowledge without copying any training organisation's assessment. It is free practice for the course, not a certificate, and it does not replace the training and certificate your state requires. Rules such as notifying the council of your supervisor and renewing the certificate vary by state.",
          },
        },
        classFaqJsonLd("aufss"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Food Safety Law & Supervision", weight: "14%" },
  { name: "Hazards & Foodborne Illness", weight: "16%" },
  { name: "Personal Hygiene & Health", weight: "16%" },
  { name: "Temperature Control", weight: "18%" },
  { name: "Receiving, Storage & Display", weight: "12%" },
  { name: "Cleaning, Sanitising & Pests", weight: "12%" },
  { name: "Allergens & Eggs", weight: "12%" },
];

export default function FoodSafetySupervisorLandingPage() {
  return (
    <div data-theme="aufss" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Food Safety Supervisor Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/food-safety-supervisor/dashboard"
            shortName="Food Safety Supervisor"
            subtitle="200 questions on Standard 3.2.2A, the 5°C and 60°C rules, cooling, the 2-hour/4-hour rule, hygiene, cleaning and allergens, written to the Food Standards Code. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aufss-mobile.png", desktop: "/landing/aufss-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufss" />

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
                Four 50-question mock tests covering both units and Standard 3.2.2A, with an 80 percent readiness line (the real course is competency based, with no pass mark) and an explanation of the right answer on every question.
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
                Built on SITXFSA005, SITXFSA006 and Standard 3.2.2A
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The two hospitality units cover hygiene, health reporting and hand washing (SITXFSA005) and the food safety program, storage, preparation, single-use items, cleaning and disposal (SITXFSA006). Standard 3.2.2A adds the supervisor, food handler training and record keeping, and NSW adds allergens, eggs, cleaning and Food Act offences. No one publishes question weights, so the mock tests give the most to temperature control, where most of the numbers sit. RTOs, TAFEs and trainers who run the course can set Tigertest as practice at{" "}
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
                src={getTigerAsset("aufss", 1)}
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
            How to Pass Your Food Safety Supervisor Course
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers by heart</h3>
              <p>
                5°C or below and 60°C or above, with the danger zone in between; cooling from 60°C to 21°C within 2 hours and to 5°C within a further 4 hours; reheating rapidly to 60°C; 75°C at the core as the usual cooking guide; a thermometer accurate to within 1°C; supervisor certificates within 5 years; and records kept for at least 3 months.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get the 2-hour/4-hour rule exactly right</h3>
              <p>
                Count the total time ready-to-eat food has spent between 5°C and 60°C. Under 2 hours: use it or put it back in the fridge. Between 2 and 4 hours: use it, but do not refrigerate it. Over 4 hours: throw it out. Chilling never resets the clock.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know which business needs which tool</h3>
              <p>
                Category one businesses, which cook or prepare high-risk food and serve it, need a certified supervisor, trained food handlers and records. Category two businesses, which only slice, weigh, repack or hold ready-to-eat food made elsewhere, need the supervisor and trained handlers but not the records.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four mock tests before your assessment. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Food Safety Supervisor Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is a food safety supervisor in Australia?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A food safety supervisor is a person in a food business who holds a food safety supervisor certificate from a registered training organisation or a body the regulator recognises, obtained within the past five years. They supervise food handling, coach staff and help prevent or correct food safety problems. Under Standard 3.2.2A of the Food Standards Code, caterers, food service and related retail businesses that handle unpackaged, ready-to-eat, potentially hazardous food must appoint one, and the supervisor must be reasonably available while that food is handled.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which units of competency does the food safety supervisor course cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              For hospitality and retail food service it is usually SITXFSA005 Use hygienic practices for food safety and SITXFSA006 Participate in safe food handling practices, together the food safety supervision skill set. Health, community and other sectors use their own units, and the accepted units vary by state. In NSW the course must also cover the Food Authority&apos;s key focus areas: allergen management, safe egg handling, cleaning and sanitising, and Food Act offences.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the course assessed, and is there a pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is competency based, so there is no national pass mark. Your training organisation sets written or online knowledge questions and practical tasks, such as probing food and cleaning and sanitising equipment, and you resubmit anything you get wrong until you are judged competent. The mock tests here use an 80 percent readiness line so you go into the assessment knowing the material well.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which temperatures and times do food safety supervisors need to know?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep potentially hazardous food at 5 degrees Celsius or below, or 60 degrees or above. Cool cooked food from 60 to 21 degrees within 2 hours, then to 5 degrees within a further 4 hours. Reheat food that will be held hot rapidly to 60 degrees or above. Under the 2-hour/4-hour rule, ready-to-eat food out of temperature control for under 2 hours can be used or refrigerated, 2 to 4 hours must be used and not refrigerated, and over 4 hours must be thrown away. Thermometers must be accurate to within 1 degree.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this an official course or certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from the Food Standards Code, FSANZ guidance and the published units of competency, so it tests the same knowledge without copying any training organisation&apos;s assessment. It is free practice for the course, not a certificate, and it does not replace the training and certificate your state requires. Rules such as notifying the council of your supervisor and renewing the certificate vary by state.
            </p>
          </div>
          <ExamClassFaq examId="aufss" />
        </div>
      </div>

      <ExamRelatedTests examId="aufss" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Food Safety Supervisor Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across both units and Standard 3.2.2A.</p>
          <ExamLandingCTA dashboardHref="/food-safety-supervisor/dashboard" />
        </div>
      </div>
    </div>
  );
}
