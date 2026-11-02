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
const path = "/red-seal-automotive-service-technician-practice-test";

const title = "Red Seal Automotive Service Technician Practice Test 2026";
const metaDescription =
  "Free Red Seal auto service technician practice: 200 original questions on engines, networks, driveline, HVAC, brakes, restraints and EVs. 70% to pass.";
const description =
  "Free practice for the Red Seal Automotive Service Technician exam (310S in Ontario): 200 original questions across the eight Major Work Activities of the 2023 Red Seal Occupational Standard, from engine and diesel support systems, module networks and driveline to electrical and HVAC, steering, suspension and brakes, restraints and body, and hybrid and electric vehicles. Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal automotive service technician practice test, 310S practice exam, Red Seal auto mechanic exam, automotive service technician exam questions, interprovincial exam auto, Red Seal 2026, certificate of qualification automotive",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("caauto"), width: 1200, height: 630, alt: "Tigertest free Red Seal Automotive Service Technician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caauto")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Automotive Service Technician Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Red Seal Automotive Service Technician practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Tests weighted like the Red Seal exam breakdown by Major Work Activity",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the Red Seal Automotive Service Technician exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your certificate, which is recognized in every province and territory.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal automotive exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions follow the Red Seal Occupational Standard, grouped into eight Major Work Activities: common occupational skills (9 questions), engine and engine support systems (22), vehicle module communications (12), driveline (17), electrical and comfort control (23), steering, suspension, brakes, tires, hubs and wheel bearings (23), restraint systems, body and trim (10), and hybrid and electric vehicles (9). The practice tests here keep those proportions in 50 questions.",
          },
        },
        {
          "@type": "Question",
          name: "Is 310S the same as the Red Seal exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "310S is the Ontario trade code for Automotive Service Technician. Ontario apprentices write the same interprovincial Red Seal exam as everyone else, and other provinces and territories use their own codes for the trade. The exam content is the same across Canada.",
          },
        },
        {
          "@type": "Question",
          name: "Who can write the Red Seal exam and how do I book it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apprentices write it when they finish their technical training and work hours, and experienced technicians without an apprenticeship can apply as trade qualifiers. Hours, fees, booking and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Red Seal exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown and standard shop practice, so it covers the same tasks without copying the exam. Always follow the vehicle maker's service information for specifications and procedures; figures in these questions are typical values used to teach the concept.",
          },
        },
        classFaqJsonLd("caauto"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Common Occupational Skills", weight: "8%" },
  { name: "B. Engine & Engine Support Systems", weight: "18%" },
  { name: "C. Module Communication Networks", weight: "10%" },
  { name: "D. Driveline Systems", weight: "14%" },
  { name: "E. Electrical & Comfort Control (HVAC)", weight: "18%" },
  { name: "F. Steering, Suspension, Brakes & Tires", weight: "18%" },
  { name: "G. Restraints, Body & Accessories", weight: "8%" },
  { name: "H. Hybrid & Electric Vehicles", weight: "6%" },
];

export default function RedSealAutomotiveLandingPage() {
  return (
    <div data-theme="caauto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Automotive Service Technician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-automotive/dashboard"
            shortName="Red Seal Auto"
            subtitle="200 questions across all eight Major Work Activities, from engines and CAN networks to brakes, HVAC and hybrid and EV safety, with the real 70% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caauto-mobile.png", desktop: "/landing/caauto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caauto" />

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
                Red Seal publishes how many of the 125 questions come from each Major Work Activity of the 2023 Occupational Standard, and the practice tests here keep that split in 50 questions. Electrical and comfort control, steering, suspension and brakes, and engine systems together are more than half the exam, so those three sets are where most of your study time should go. Instructors running a pre-apprenticeship or apprenticeship class can assign Tigertest at{" "}
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
                src={getTigerAsset("caauto", 1)}
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
            How to Pass the Red Seal Auto Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think in diagnostic steps</h3>
              <p>
                Most questions describe a symptom and ask for the cause or the next test. Work from the simple and likely to the complex: check fluids, power and grounds, codes and service bulletins before condemning a module. Know what each test isolates, such as wet versus dry compression or voltage drop under load.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Own the electrical basics</h3>
              <p>
                Ohm&apos;s law, series and parallel circuits, voltage drop, relays and sensor signals run through three Major Work Activities: electrical, networks and engine management. Learn what a CAN bus should measure at the data link connector and what each kind of sensor signal looks like on a scope.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip hybrid and EV safety</h3>
              <p>
                The 2023 standard added a whole work activity on hybrid and electric vehicles. Know the high-voltage disable sequence, glove testing, how to prove a circuit dead with a CAT III meter, and what the DC-DC converter and interlock loop do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by work activity. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% line. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Auto Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal Automotive Service Technician exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your certificate, which is recognized in every province and territory.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal automotive exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions follow the Red Seal Occupational Standard, grouped into eight Major Work Activities: common occupational skills (9 questions), engine and engine support systems (22), vehicle module communications (12), driveline (17), electrical and comfort control (23), steering, suspension, brakes, tires, hubs and wheel bearings (23), restraint systems, body and trim (10), and hybrid and electric vehicles (9). The practice tests here keep those proportions in 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is 310S the same as the Red Seal exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              310S is the Ontario trade code for Automotive Service Technician. Ontario apprentices write the same interprovincial Red Seal exam as everyone else, and other provinces and territories use their own codes for the trade. The exam content is the same across Canada.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can write the Red Seal exam and how do I book it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apprentices write it when they finish their technical training and work hours, and experienced technicians without an apprenticeship can apply as trade qualifiers. Hours, fees, booking and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Red Seal exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown and standard shop practice, so it covers the same tasks without copying the exam. Always follow the vehicle maker&apos;s service information for specifications and procedures; figures in these questions are typical values used to teach the concept.
            </p>
          </div>
          <ExamClassFaq examId="caauto" />
        </div>
      </div>

      <ExamRelatedTests examId="caauto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all eight Major Work Activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-automotive/dashboard" />
        </div>
      </div>
    </div>
  );
}
