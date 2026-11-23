import "@/lib/banks/carstruck";
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
const path = "/red-seal-truck-transport-mechanic-practice-test";

const title = "Free Red Seal Truck and Transport Mechanic Practice Test 2026 - 310T Prep";
const metaDescription =
  "Red Seal Truck and Transport Mechanic practice: 200 original questions on diesel engines, air brakes, electrical, drive trains, trailers and hydraulics. Start free.";
const description =
  "Practice for the Red Seal Truck and Transport Mechanic interprovincial exam (Truck and Coach Technician, 310T, in Ontario): 200 original questions across the 11 blocks of the Red Seal Occupational Standard, from diesel engines, aftertreatment, air systems and brakes to electrical and J1939 networks, drive trains, steering and suspension, trailers, climate control, hydraulics and hybrid and electric trucks. Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal truck and transport mechanic practice test, 310T practice exam, truck and coach technician exam questions, heavy duty truck mechanic exam, Red Seal truck mechanic 2026, truck and transport certificate of qualification, diesel mechanic exam Canada",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("carstruck"), width: 1200, height: 630, alt: "Tigertest Red Seal Truck and Transport Mechanic practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("carstruck")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Red Seal Truck and Transport Mechanic Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("carstruck", "CAD"),
      featureList: [
        "200 Red Seal Truck and Transport Mechanic practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Tests weighted like the Red Seal exam breakdown by block",
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
          name: "What is the pass mark for the Red Seal Truck and Transport Mechanic exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The exam has 135 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives four hours to write it. A calculator is provided if you need one, and the formulas and acronyms used on the exam are given to you at the sitting. Red Seal's exam weightings page still lists 150 questions, while its exam information page and Saskatchewan's 2025 exam sheet give 135, so confirm the count with your apprenticeship authority.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal Truck and Transport Mechanic exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Red Seal's exam breakdown spreads the 135 questions over 11 blocks of the Occupational Standard: electrical and electronic systems 22, engines and supporting systems 21, steering, frames, suspensions, tires, wheels and hubs 18, air systems and brakes 17, drive trains 17, common occupational skills 8, trailers 8, hydraulic systems 8, climate control 7, cabs 5, and hybrid and electric vehicles 4. The practice tests here keep those proportions in 50 questions.",
          },
        },
        {
          "@type": "Question",
          name: "What kinds of questions are on the exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All of them are multiple choice, but most are not simple recall. Red Seal says fewer than 10% test knowledge and recall, 50 to 60% test procedures and how you apply them, and 35 to 45% are critical thinking questions that give you a symptom or a reading and ask for the cause or the next step.",
          },
        },
        {
          "@type": "Question",
          name: "Is 310T the same as the Red Seal exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "310T is the Ontario trade code for Truck and Coach Technician, Ontario's name for the trade. Alberta and Nunavut call it Heavy Equipment Technician, Truck and Transport Mechanic. Candidates who pass the interprovincial exam earn the Red Seal endorsement, the same exam written across Canada. Eligibility, booking, fees and retake rules are set by each province or territory, so check with yours before you apply.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Red Seal exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown and the Red Seal Occupational Standard for Truck and Transport Mechanic, so it covers the same tasks without copying the exam. Tigertest is not affiliated with the Red Seal Program. Specifications differ between manufacturers, so follow the service information for the truck in front of you.",
          },
        },
        classFaqJsonLd("carstruck"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Common Occupational Skills", weight: "8 of 135" },
  { name: "B. Engines & Supporting Systems", weight: "21 of 135" },
  { name: "C. Air Systems & Brakes", weight: "17 of 135" },
  { name: "D. Electrical & Electronic Systems", weight: "22 of 135" },
  { name: "E. Drive Trains", weight: "17 of 135" },
  { name: "F. Steering, Frames, Suspension & Wheels", weight: "18 of 135" },
  { name: "G. Cabs", weight: "5 of 135" },
  { name: "H. Trailers", weight: "8 of 135" },
  { name: "I. Climate Control", weight: "7 of 135" },
  { name: "J. Hydraulic Systems", weight: "8 of 135" },
  { name: "K. Hybrid & Electric Vehicles", weight: "4 of 135" },
];

export default function RedSealTruckTransportLandingPage() {
  return (
    <div data-theme="carstruck" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Truck and Transport Mechanic Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-truck-transport/dashboard"
            shortName="Red Seal Truck and Transport"
            subtitle="200 Truck and Transport Mechanic questions with the real 70% pass mark. Free to start, no account needed."
            shots={{ mobile: "/landing/carstruck-mobile.png", desktop: "/landing/carstruck-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="carstruck" />
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
                Five training sets by topic, from Common Skills &amp; Engines to Cabs, Trailers &amp; Climate Control. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Red Seal publishes how many of the 135 questions come from each of the 11 blocks in the Occupational Standard for Truck and Transport Mechanic, and the practice tests here keep that split in 50 questions. Electrical and electronic systems and engines carry the most questions, with steering, chassis and wheels, air brakes and drive trains close behind. Instructors running a truck and transport apprenticeship class can assign Tigertest at{" "}
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
                src={getTigerAsset("carstruck", 3)}
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
            How to Pass the Red Seal Truck and Transport Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think like a diagnostician</h3>
              <p>
                Most questions give a symptom or a reading and ask for the cause or the next step. For each system, learn the order a good technician checks things in: the simple, cheap and likely causes first, a test that proves the fault, then the repair.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the air system end to end</h3>
              <p>
                Compressor, governor, dryer, tanks, check valves, relay and quick-release valves, spring brakes, slack adjusters and the tractor protection system all link together. Trace what each one does when it fails, and how stored air and spring energy are made safe before you work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get comfortable with electrical and networks</h3>
              <p>
                Electrical and electronic systems are the largest block. Practise voltage drop, Ohm&apos;s law and watts, reading fault codes with their failure mode identifiers, and checking a J1939 backbone and its terminators.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% line. After each test, drill the questions you missed and retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Truck and Transport Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal Truck and Transport Mechanic exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The exam has 135 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives four hours to write it. A calculator is provided if you need one, and the formulas and acronyms used on the exam are given to you at the sitting. Red Seal&apos;s exam weightings page still lists 150 questions, while its exam information page and Saskatchewan&apos;s 2025 exam sheet give 135, so confirm the count with your apprenticeship authority.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal Truck and Transport Mechanic exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Red Seal&apos;s exam breakdown spreads the 135 questions over 11 blocks of the Occupational Standard: electrical and electronic systems 22, engines and supporting systems 21, steering, frames, suspensions, tires, wheels and hubs 18, air systems and brakes 17, drive trains 17, common occupational skills 8, trailers 8, hydraulic systems 8, climate control 7, cabs 5, and hybrid and electric vehicles 4. The practice tests here keep those proportions in 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What kinds of questions are on the exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All of them are multiple choice, but most are not simple recall. Red Seal says fewer than 10% test knowledge and recall, 50 to 60% test procedures and how you apply them, and 35 to 45% are critical thinking questions that give you a symptom or a reading and ask for the cause or the next step.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is 310T the same as the Red Seal exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              310T is the Ontario trade code for Truck and Coach Technician, Ontario&apos;s name for the trade. Alberta and Nunavut call it Heavy Equipment Technician, Truck and Transport Mechanic. Candidates who pass the interprovincial exam earn the Red Seal endorsement, the same exam written across Canada. Eligibility, booking, fees and retake rules are set by each province or territory, so check with yours before you apply.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Red Seal exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown and the Red Seal Occupational Standard for Truck and Transport Mechanic, so it covers the same tasks without copying the exam. Tigertest is not affiliated with the Red Seal Program. Specifications differ between manufacturers, so follow the service information for the truck in front of you.
            </p>
          </div>
          <ExamClassFaq examId="carstruck" />
        </div>
      </div>

      <ExamSampleQuestions examId="carstruck" />

      <ExamRelatedTests examId="carstruck" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all 11 blocks of the standard.</p>
          <ExamLandingCTA dashboardHref="/red-seal-truck-transport/dashboard" />
        </div>
      </div>
    </div>
  );
}
