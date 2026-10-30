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

const title = "Free VTNE Practice Test 2026 - Vet Tech Exam Prep";
const metaDescription =
  "Free VTNE practice tests: 200 questions on animal nursing, pharmacology, surgical nursing, anesthesia, lab procedures, imaging, dentistry and emergency care. All explained.";
const description =
  "Free VTNE practice tests with 200 questions weighted to the AAVSB content outline: animal care and nursing, pharmacy and pharmacology, surgical nursing, anesthesia, laboratory procedures, diagnostic imaging, dentistry, emergency and critical care, pain management and client communication. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "VTNE practice test, vet tech practice test, veterinary technician national exam practice questions, VTNE prep 2026, VTNE study guide, free VTNE practice questions, AAVSB VTNE",
  alternates: {
    canonical: `${siteUrl}/vtne-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/vtne-practice-test`,
    images: [{ url: shareImageUrl("vtne"), width: 1200, height: 630, alt: "Tigertest free VTNE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("vtne")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free VTNE Practice Tests",
      description,
      url: `${siteUrl}/vtne-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 VTNE practice questions",
        "4 practice tests across all ten content domains",
        "4 training sets, one per practice test",
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
          name: "What score do I need to pass the VTNE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The VTNE reports a scaled score from 200 to 800, and 425 passes. The AAVSB does not publish a percent-correct equivalent, so the practice tests here use a 70 percent pass line as a study target. Clearing it with room to spare on all four tests is a good sign you are ready.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the VTNE and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The VTNE has 170 multiple-choice questions, 150 of which are scored; the other 20 are unscored pilot items you cannot tell apart from the rest. You have three hours. The exam is given by computer at Prometric test centers during three windows a year: March 15 to April 15, July 15 to August 15 and November 15 to December 15.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the VTNE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ten domains from the AAVSB content outline approved in March 2023: animal care and nursing (20 percent), pharmacy and pharmacology, surgical nursing and anesthesia (about 13 percent each), laboratory procedures (9 percent), diagnostic imaging (6 percent), and dentistry, emergency medicine and critical care, pain management and analgesia, and communication and professional support services at 5 to 7 percent each. The practice tests here use the same proportions.",
          },
        },
        {
          "@type": "Question",
          name: "Who can take the VTNE and what does it cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most candidates are graduates of a veterinary technology program accredited by the AVMA Committee on Veterinary Technician Education and Activities (CVTEA). Some states and provinces have alternate pathways; check your board. The AAVSB application fee is 375 dollars per attempt, and you must test in the window you applied for or forfeit it. Retakes need a new application, and the AAVSB allows up to five attempts.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test cover state rules or a specific textbook?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The VTNE is a national exam, so every question here is about universal veterinary nursing practice: species vital signs, drug calculations, aseptic technique, anesthesia monitoring, lab and imaging procedures, dental charting and emergency care. Which tasks a credentialed technician may perform varies by state and is left to your state board. It is a study tool, not a credential.",
          },
        },
        classFaqJsonLd("vtne"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Animal Care & Nursing", weight: "20%" },
  { name: "Pharmacy & Pharmacology", weight: "14%" },
  { name: "Surgical Nursing", weight: "14%" },
  { name: "Anesthesia", weight: "14%" },
  { name: "Laboratory Procedures", weight: "10%" },
  { name: "Diagnostic Imaging", weight: "6%" },
  { name: "Dentistry", weight: "6%" },
  { name: "Emergency Medicine & Critical Care", weight: "6%" },
  { name: "Pain Management & Analgesia", weight: "4%" },
  { name: "Communication & Professional Support", weight: "6%" },
];

export default function VtneLandingPage() {
  return (
    <div data-theme="vtne" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free VTNE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/vtne/dashboard"
            shortName="VTNE"
            subtitle="200 questions on animal nursing, pharmacology, surgical nursing, anesthesia, lab work, imaging, dentistry, emergency care, pain management and client communication, in the AAVSB proportions. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/vtne-mobile.png", desktop: "/landing/vtne-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="vtne" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted the way the VTNE is, with a 70 percent practice pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the AAVSB Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AAVSB publishes exactly how the 150 scored VTNE items are split across ten domains, and the practice tests here follow that split. Animal care and nursing is the biggest single domain, and pharmacology, surgical nursing and anesthesia together are another 40 percent, so those four sets are where most of your study time should go. Vet tech programs accredited by the AVMA CVTEA can assign Tigertest as a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which domains the cohort misses most.
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
                src={getTigerAsset("vtne", 1)}
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
            How to Pass the VTNE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own the calculations</h3>
              <p>
                Dose and fluid math shows up in several domains, and every item is the same three steps: weight in kilograms, milligrams from the mg/kg dose, milliliters from the concentration. Maintenance fluids run 40 to 60 mL/kg/day, a deficit is body weight times percent dehydration, and a drip rate is volume over time times the drops per mL of the set. Practice until you can do them without the calculator.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the species differences as a table</h3>
              <p>
                Normal temperature, heart rate and respiratory rate for dogs, cats, horses, cattle and the common lab and exotic species; which drugs are dangerous in which species (xylitol, lilies and acetaminophen in cats, ivermectin in some herding breeds); and the blood types that matter for a first transfusion. Exam questions give you the patient and expect the number.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study anesthesia and surgery as one patient timeline</h3>
              <p>
                ASA status and pre-anesthetic bloodwork, then premedication, induction, intubation, circuit and bag choice, oxygen flow, monitoring (capnography, SpO2, blood pressure, depth signs), then recovery and hypothermia. Surgical nursing runs alongside it: pack prep and sterilization indicators, patient prep, instrument handling, suture choice and post-op monitoring. Walking one patient through the whole day keeps the facts in order.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. The VTNE passes on a scaled score, so there is no magic percentage, but students who master all four training sets and clear 70 percent on all four practice tests have covered the outline. After each test, drill the questions you missed and retrain that test&apos;s set, then take the four tests back to back the week before your window.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          VTNE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the VTNE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The VTNE reports a scaled score from 200 to 800, and 425 passes. The AAVSB does not publish a percent-correct equivalent, so the practice tests here use a 70 percent pass line as a study target. Clearing it with room to spare on all four tests is a good sign you are ready.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the VTNE and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The VTNE has 170 multiple-choice questions, 150 of which are scored; the other 20 are unscored pilot items you cannot tell apart from the rest. You have three hours. The exam is given by computer at Prometric test centers during three windows a year: March 15 to April 15, July 15 to August 15 and November 15 to December 15.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the VTNE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ten domains from the AAVSB content outline approved in March 2023: animal care and nursing (20 percent), pharmacy and pharmacology, surgical nursing and anesthesia (about 13 percent each), laboratory procedures (9 percent), diagnostic imaging (6 percent), and dentistry, emergency medicine and critical care, pain management and analgesia, and communication and professional support services at 5 to 7 percent each. The practice tests here use the same proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can take the VTNE and what does it cost?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Most candidates are graduates of a veterinary technology program accredited by the AVMA Committee on Veterinary Technician Education and Activities (CVTEA). Some states and provinces have alternate pathways; check your board. The AAVSB application fee is 375 dollars per attempt, and you must test in the window you applied for or forfeit it. Retakes need a new application, and the AAVSB allows up to five attempts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test cover state rules or a specific textbook?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The VTNE is a national exam, so every question here is about universal veterinary nursing practice: species vital signs, drug calculations, aseptic technique, anesthesia monitoring, lab and imaging procedures, dental charting and emergency care. Which tasks a credentialed technician may perform varies by state and is left to your state board. It is a study tool, not a credential.
            </p>
          </div>
          <ExamClassFaq examId="vtne" />
        </div>
      </div>

      <ExamRelatedTests examId="vtne" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the VTNE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all ten content domains.</p>
          <ExamLandingCTA dashboardHref="/vtne/dashboard" />
        </div>
      </div>
    </div>
  );
}
