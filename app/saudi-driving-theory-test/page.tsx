import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/samuroor";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Saudi Driving Theory Practice Test 2026 - Muroor Signs and Rules";
const metaDescription =
  "Free Saudi driving theory practice test: 200 original questions on the Traffic Law, SHC 602 road signs, markings and signals, and right of way. Start for free.";
const description =
  "Practice for the Saudi Arabia driving theory test you take at your licensed driving school: 200 original questions on the Saudi Traffic Law and the SHC 602 manual of traffic signs, markings and signals. Four 50-question mock tests and four training sets on road signs, signals and markings, right of way and safe driving, and licences, parking and crashes, with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "saudi driving theory test, saudi driving test questions, muroor test, ksa driving licence test, saudi driving school computer test, saudi road signs test, saudi traffic rules test 2026, saudi driving test practice",
  alternates: {
    canonical: `${siteUrl}/saudi-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/saudi-driving-theory-test`,
    images: [{ url: shareImageUrl("samuroor"), width: 1200, height: 630, alt: "Tigertest free Saudi driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("samuroor")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Saudi driving theory test and what is the pass mark?",
    a: "The General Department of Traffic did not publish a question count, time limit or pass mark on any official page we could load, and unofficial sites disagree. Tigertest's mock tests use 50 questions and an 80% target, so aim well above that before your appointment and ask your driving school for the current format.",
  },
  {
    q: "Where do I take the theory test?",
    a: "At a licensed driving school. The driving school regulation published in the Umm Al-Qura gazette says a trainee completes the school's set theory and practical hours, then takes a practical driving test and a theory test on the Traffic Law and its Implementing Regulations, road rules, signs and signals, and public safety rules, run by the traffic authority or a body it authorises.",
  },
  {
    q: "Is this practice test in Arabic?",
    a: "No. Tigertest's questions are in English, and the site does not yet support Arabic. Many signs on Saudi roads carry both Arabic and English, but learn the Arabic wording on signs with your driving school's materials too, and ask your school which languages the theory test offers.",
  },
  {
    q: "Are fines and violation points on this practice test?",
    a: "No. Fine amounts and points totals change with amendments, so Tigertest's questions ask about the rules themselves: what a sign or marking means, who gives way, when you may not overtake, and what to do after a crash.",
  },
  {
    q: "Are these the real Muroor test questions?",
    a: "No. Every question is original, written by Tigertest from the Saudi Traffic Law, its violation tables and the SHC 602 Manual on Uniform Traffic Control Devices. Signs are described in words, so study the sign pictures in your driving school's materials as well. It is practice, free to start, not an official test, and it does not book or replace your theory test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Saudi Driving Theory Practice Test",
      description,
      url: `${siteUrl}/saudi-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("samuroor", "SAR"),
      featureList: [
        "200 Saudi traffic rules and road signs practice questions",
        "4 mock tests of 50 questions",
        "4 training sets by topic",
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
  { name: "Regulatory Signs", weight: "16%" },
  { name: "Warning, Guide & Work Zone Signs", weight: "14%" },
  { name: "Right of Way & Roundabouts", weight: "14%" },
  { name: "Safe Driving & Conduct", weight: "14%" },
  { name: "Road Markings", weight: "12%" },
  { name: "Licence, Documents & Vehicle", weight: "10%" },
  { name: "Traffic Signals", weight: "10%" },
  { name: "Stopping, Parking & Crashes", weight: "10%" },
];

export default function SaudiDrivingTheoryLandingPage() {
  return (
    <div data-theme="samuroor" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Saudi Driving Theory Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/saudi-driving-theory/dashboard"
            shortName="Saudi driving theory"
            subtitle="200 Saudi traffic rules and road sign questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/samuroor-mobile.png", desktop: "/landing/samuroor-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="samuroor" />

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
                Four training sets cover what the theory test is about, from SHC 602 sign shapes and colours to road markings, right of way and the Traffic Law&apos;s rules on licences and crashes. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests drawn from every topic, with Tigertest&apos;s 80% target. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Saudi Traffic Law and SHC 602
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The General Department of Traffic does not publish how many questions come from each topic, so each mock test is Tigertest&apos;s own mix, weighted towards road signs, markings and right of way. Every rule is Saudi: right-hand traffic, yellow edge lines, giving way to the right at an unmarked junction and to traffic already on a roundabout, and never overtaking a school bus that has stopped for pupils.
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
                src={getTigerAsset("samuroor", 3)}
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
            How to Prepare for the Saudi Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour</h3>
              <p>
                SHC 602 gives each kind of sign its own shape: an octagon only for Stop, a downward triangle only for Yield, upright red-bordered triangles for warnings and circles for rules. Blue circles order, red-bordered circles forbid, and blue circles with a red border control parking: one red line for no parking, two crossed lines for no stopping. Road work signs are black on yellow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the road markings</h3>
              <p>
                Edge lines are yellow and lane lines are white. A broken white line lets you change lanes with care, a solid white line means you should not change lanes there, and a yellow box tells you not to stop inside the junction. Kerbs painted yellow and black, or red, mean no parking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who gives way</h3>
              <p>
                At an unmarked junction give way to the car on your right; coming out of a minor road, give way to the main road; at a roundabout, give way to traffic already on it, which comes from your left. Emergency vehicles on duty and official motorcades have priority, and a traffic officer&apos;s signal comes before the lights.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 80%</h3>
              <p>
                Aim for at least 45 of 50 in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before your appointment at the driving school.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Saudi Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="samuroor" />

      <ExamRelatedTests examId="samuroor" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Saudi Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic on the theory test.</p>
          <ExamLandingCTA dashboardHref="/saudi-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
