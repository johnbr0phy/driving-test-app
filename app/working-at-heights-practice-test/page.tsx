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

const title = "Working at Heights Practice Test 2026 - Free RIIWHS204 Quiz";
const metaDescription =
  "Free working at heights practice for Australia: 200 original questions on the RIIWHS204 unit, from the falls hierarchy and ladders to harnesses, anchors, roofs and rescue, every answer explained.";
const description =
  "Free practice for the knowledge assessment in RIIWHS204 Work safely at heights (formerly RIIWHS204E), the nationally recognised working at heights unit in Australia: 200 original questions on WHS duties and licences, hazards and risk assessment, the hierarchy of control for falls, edge protection, scaffolds and EWPs, ladders, harnesses, lanyards and anchors, roof work in housing construction, and rescue and clean-up. Four 50-question practice tests with an 80 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "working at heights practice test, working at heights test questions, riiwhs204e quiz, riiwhs204 work safely at heights, working at heights course australia, fall protection test questions, harness and ladder safety quiz, working safely at heights assessment",
  alternates: {
    canonical: `${siteUrl}/working-at-heights-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/working-at-heights-practice-test`,
    images: [{ url: shareImageUrl("auwah"), width: 1200, height: 630, alt: "Tigertest free working at heights practice test for Australia" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("auwah")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the working at heights course in Australia?",
    a: "It is the nationally recognised unit RIIWHS204 Work safely at heights, which replaced RIIWHS204E in September 2026 as an equivalent unit, so a RIIWHS204E statement of attainment still counts. It is usually a one-day course with a registered training organisation (RTO) and covers WHS duties, finding fall hazards, the hierarchy of control for falls, ladders, scaffolds and EWPs, harnesses and anchors, and emergency and rescue procedures.",
  },
  {
    q: "How is the course assessed, and what is the pass mark?",
    a: "You show the trainer you can work safely at heights in practical tasks, such as checking and fitting a harness, choosing an anchor and setting up a ladder, and you complete a written or online knowledge assessment. The unit is competency based, so there is no national question count or pass mark: each RTO sets its own marking, and often lets you resubmit answers that are not yet satisfactory. The practice tests here have 50 questions each and use an 80 percent readiness line.",
  },
  {
    q: "Which rules do these questions follow?",
    a: "The answers follow the model Work Health and Safety Regulations on falls and the Safe Work Australia model Codes of Practice on managing the risk of falls at workplaces and in housing construction: work on the ground or a solid construction first, then fall prevention devices, then work positioning, then fall arrest. Figures such as a 900 to 1100 mm guardrail, a 4 to 1 ladder slope and a 2 metre maximum free fall come from those codes. Where rules differ by state or territory, the questions say so instead of picking one.",
  },
  {
    q: "Does a working at heights certificate expire?",
    a: "The unit itself has no expiry date. Some employers and principal contractors set their own refresher requirements, so check what your site asks for; site and industry rules also vary by state and territory. A working at heights unit is not a high risk work licence: erecting a scaffold from which a person or object could fall more than 4 metres, or operating a boom-type EWP with a boom of 11 metres or more, needs the matching licence.",
  },
  {
    q: "Is this an official assessment or certificate?",
    a: "No. Every question is written by Tigertest from the RIIWHS204 unit, the model WHS Regulations and the Safe Work Australia codes of practice, so it tests the same knowledge without copying any training organisation's assessment. It is free study for the knowledge part of the course, not a statement of attainment, and it cannot replace the hands-on practice and assessment that an RTO provides.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Working at Heights Practice Test",
      description,
      url: `${siteUrl}/working-at-heights-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 working at heights practice questions",
        "4 practice tests of 50 questions with an 80% readiness line",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("auwah"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "WHS Laws, Duties & Licences", weight: "12%" },
  { name: "Hazards & Risk Assessment", weight: "14%" },
  { name: "Hierarchy of Control for Falls", weight: "14%" },
  { name: "Edge Protection, Scaffolds & EWPs", weight: "14%" },
  { name: "Ladders", weight: "12%" },
  { name: "Harnesses, Lanyards & Anchors", weight: "16%" },
  { name: "Roof Work & Housing Construction", weight: "10%" },
  { name: "Rescue, Emergencies & Clean-up", weight: "8%" },
];

export default function WorkingAtHeightsLandingPage() {
  return (
    <div data-theme="auwah" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Working at Heights Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/working-at-heights/dashboard"
            shortName="Working at Heights"
            subtitle="200 questions for the knowledge assessment in RIIWHS204 Work safely at heights: the falls hierarchy, ladders, scaffolds and EWPs, harnesses and anchors, roof work and rescue. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/auwah-mobile.png", desktop: "/landing/auwah-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auwah" />

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
                Four 50-question practice tests covering every part of the unit, with an 80 percent readiness line (each RTO sets its own pass mark) and an explanation of the right answer on every question.
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
                Built on RIIWHS204 and the Falls Codes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                RIIWHS204 sets what a working at heights course must cover: work requirements and documents, hazards and controls, fall protection equipment, doing the work, and cleaning up. The detail comes from the model WHS Regulations and the Safe Work Australia codes of practice on falls. No one publishes how many questions each topic gets, so the practice tests weight topics by how much of the course they fill. Trainers and RTOs can set Tigertest as practice for a class at{" "}
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
                src={getTigerAsset("auwah", 1)}
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
            How to Pass Working at Heights
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the falls hierarchy in order</h3>
              <p>
                Work on the ground or a solid construction first. If you cannot, use a fall prevention device such as guardrails, a scaffold or an EWP, then a work positioning system such as restraint, then a fall arrest system. Administrative controls like permits and no go areas only support the others.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Lock in the numbers</h3>
              <p>
                A SWMS for construction work with a fall of more than 2 metres. Guardrails 900 to 1100 mm high with a mid-rail and toe-board. Ladders at 4 up to 1 out, rated to at least 120 kg and extending 1 metre above the landing. A free fall of no more than 2 metres, and a single-person anchor commonly rated to 15 kN.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check gear and plan the rescue</h3>
              <p>
                Inspect every harness, lanyard and connector before use and take anything frayed, cut or past its date out of service. Gear that has arrested a fall stays out of use until a competent person checks it. Never work alone in a harness: suspension intolerance can set in within minutes, so the rescue plan must be tested before work starts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four practice tests before your course. After each test, drill the questions you missed and retrain that test&apos;s set. Then practise fitting a harness and setting up a ladder with your trainer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Working at Heights Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="auwah" />
        </div>
      </div>

      <ExamRelatedTests examId="auwah" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Working at Heights?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the RIIWHS204 working at heights unit.</p>
          <ExamLandingCTA dashboardHref="/working-at-heights/dashboard" />
        </div>
      </div>
    </div>
  );
}
