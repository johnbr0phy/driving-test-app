import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/phlto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "LTO Exam Reviewer 2026 - Free LTO Practice Test (Philippines)";
const metaDescription =
  "Free LTO exam reviewer: 200 original questions on Philippine traffic rules, three 60-item mock tests with a 48-of-60 pass mark, every answer explained.";
const description =
  "Free practice for the Philippines LTO driver's license written exam: 200 original questions written from RA 4136 and the Philippine road safety laws. Three mock tests of 60 questions with a pass mark of 48, and five training sets on licenses and permits, road signs, pavement markings and traffic lights, right of way, speed and overtaking, parking, road safety laws, and emergencies.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "lto exam reviewer, lto exam reviewer 2026, lto practice test, lto written exam, lto exam questions, non-professional license exam, professional license exam, student permit exam, tdc exam reviewer, lto reviewer philippines, driver's license exam philippines",
  alternates: {
    canonical: `${siteUrl}/lto-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/lto-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phlto"), width: 1200, height: 630, alt: "Tigertest free LTO exam reviewer practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phlto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the LTO written exam and what is the passing score?",
    a: "LTO's Theoretical Driving Course module (TDC-15-S-01-2, version 9-2021) gives the written exam as 60 questions with 48 correct to pass, which is 80%. An older LTO memorandum, AHS-2008-949 of 12 March 2008, set 40 questions with 30 to pass for the non-professional license and 60 with 45 to pass for the professional license, and many reviewers still quote those figures. Ask your LTO office which version you will sit. The mock tests here use 60 questions and the stricter 48 mark.",
  },
  {
    q: "How old do I need to be for a student permit or a driver's license?",
    a: "You can get a student permit at 16, a non-professional driver's license at 17 and a professional driver's license at 18. A student permit is valid for one year, and while you hold it you may drive only when accompanied by a duly licensed driver, who is responsible for your violations under RA 4136.",
  },
  {
    q: "What courses do I need before the exam?",
    a: "Before a student permit you complete the 15-hour Theoretical Driving Course (TDC) from LTO or an accredited driving school. Before the non-professional license you complete the Practical Driving Course (PDC) and pass the written and practical exams. You also need a medical certificate from an LTO-accredited clinic.",
  },
  {
    q: "How long is a Philippine driver's license valid?",
    a: "Under RA 10930 a driver's license is valid for five years from your birthday. If you have no traffic violations during those five years, you can renew it for ten years.",
  },
  {
    q: "Are these the real LTO exam questions?",
    a: "No. Every question is original, written by Tigertest from RA 4136, the road safety laws (seat belts, helmets, child car seats, distracted driving and drunk driving) and the DPWH road signs manual, so it tests the same rules without copying LTO's questions or any reviewer. Signs are described in words, so study the pictures in your TDC materials too. It is free practice, not an official LTO test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LTO Exam Reviewer Practice Test",
      description,
      url: `${siteUrl}/lto-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 LTO exam practice questions",
        "3 mock tests of 60 questions with a 48 of 60 pass mark",
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
  { name: "Road Signs", weight: "20%" },
  { name: "Right of Way & Intersections", weight: "15%" },
  { name: "Speed, Lanes & Overtaking", weight: "15%" },
  { name: "Licenses & Permits", weight: "13%" },
  { name: "Road Safety Laws", weight: "13%" },
  { name: "Markings & Traffic Lights", weight: "10%" },
  { name: "Parking & Stopping", weight: "8%" },
  { name: "Emergencies, Crashes & Night", weight: "5%" },
];

export default function LtoExamLandingPage() {
  return (
    <div data-theme="phlto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LTO Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/lto-exam/dashboard"
            shortName="LTO exam"
            subtitle="200 original questions on Philippine traffic rules: road signs, right of way, speed limits, parking, seat belt, helmet and drunk driving laws, and your permit and license. Three 60-item mock tests with a 48 to pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phlto-mobile.png", desktop: "/landing/phlto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phlto" />

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
                Five training sets cover every topic the written exam asks about, from road signs to the drunk driving law. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Three 60-question tests with a pass mark of 48, so you can drop only twelve. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Philippine Traffic Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                LTO does not publish how many questions come from each topic, so this split is Tigertest&apos;s own, with road signs weighted heaviest. Every rule is the Philippines&apos; own: right-hand traffic, the RA 4136 speed limits and right of way rules, the DPWH road signs, and the Seat Belts Use, Motorcycle Helmet, Child Safety in Motor Vehicles, Anti-Distracted Driving and Anti-Drunk and Drugged Driving Acts.
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
                src={getTigerAsset("phlto", 1)}
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
            How to Pass the LTO Written Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the signs by shape first</h3>
              <p>
                Road signs are the biggest topic. Learn the families before the details: a red octagon is STOP, a downward triangle is give way, a red-bordered circle tells you what you must not do, a blue circle tells you what you must do, and a red-bordered triangle warns of a hazard ahead.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The RA 4136 speed limits for cars are 80, 40, 30 and 20 km/h (open country roads, through streets, city streets, crowded streets and school zones), and 50, 30, 30 and 20 for trucks and buses. Add the parking distances (6 meters from an intersection, 4 meters from a fire hydrant), the 0.05% alcohol limit for car drivers and the 150 cm child car seat rule, and quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the right of way rules cold</h3>
              <p>
                At an intersection with no signs, the vehicle on the left yields to the one on the right. A vehicle already in the intersection, or already turning left after signaling, goes first. Stop at a through highway and at a railroad crossing, and pull to the right and stop for a police car, fire truck or ambulance with its siren on.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 48</h3>
              <p>
                With twelve mistakes allowed out of 60, aim for 54 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all three tests back to back before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LTO Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="phlto" />

      <ExamRelatedTests examId="phlto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your LTO Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every topic on the written exam.</p>
          <ExamLandingCTA dashboardHref="/lto-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
