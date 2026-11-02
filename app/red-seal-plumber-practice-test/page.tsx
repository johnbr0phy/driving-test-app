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
const path = "/red-seal-plumber-practice-test";

const title = "Red Seal Plumber Practice Test 2026 - Free 306A Exam Prep";
const metaDescription =
  "Free Red Seal Plumber practice: 200 original questions on DWV, sewers and septic, water distribution, backflow, fixtures, hydronics and pipe joining. 70% to pass.";
const description =
  "Free practice for the Red Seal Plumber interprovincial exam (306A in Ontario): 200 original questions across the seven Major Work Activities of the 2023 Red Seal Occupational Standard: common occupational skills, preparing and joining pipe, sewers, sewage treatment and DWV systems, water service and distribution, fixtures and water treatment, hydronic and low-pressure steam systems, and specialized systems. Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

const faqs = [
  {
    q: "What is the pass mark for the Red Seal Plumber exam?",
    a: "You need 70 percent. The exam has 125 multiple-choice questions, each with four options and one correct answer, and you have up to four hours to write it. Passing earns the Red Seal endorsement on your certificate, which is recognized in every province and territory.",
  },
  {
    q: "What does the Red Seal Plumber exam cover?",
    a: "The questions follow the 2023 Red Seal Occupational Standard for Plumber, grouped into seven Major Work Activities: common occupational skills (11 percent), preparing and assembling tube, tubing and pipe (10 percent), sewers, sewage treatment and DWV systems (26 percent), water service and distribution (19 percent), fixtures, appliances and water treatment (13 percent), low-pressure steam and hydronic systems (13 percent) and specialized systems such as process piping and medical gas (8 percent). The practice tests here keep those proportions in 50 questions.",
  },
  {
    q: "Is 306A the same as the Red Seal Plumber exam?",
    a: "306A is the Ontario trade code for Plumber. Ontario apprentices write the same interprovincial Red Seal exam as everyone else, and other provinces and territories use their own codes for the trade. The written exam content is the same across Canada.",
  },
  {
    q: "Do I get the National Plumbing Code during the Red Seal exam?",
    a: "The exam is based on the National Plumbing Code of Canada 2020, and some jurisdictions, such as British Columbia, hand candidates a copy of the code and a reference booklet of formulas and acronyms. Others do not, and provinces that adopt their own plumbing code may differ in details, so ask your apprenticeship authority what you will be given. Learn the common figures by heart either way: it saves time on the day.",
  },
  {
    q: "Are these the real Red Seal exam questions?",
    a: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the National Plumbing Code and standard trade practice, so it covers the same tasks without copying the exam. Where a rule is set by your province or municipality, such as permits, septic setbacks or backflow testing, the questions say so instead of picking one jurisdiction.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal plumber practice test, 306A practice exam, Red Seal plumbing exam questions, interprovincial plumber exam, plumber certificate of qualification, National Plumbing Code practice questions, Red Seal plumber 2026, plumbing exam practice Canada",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("caplumb"), width: 1200, height: 630, alt: "Tigertest free Red Seal Plumber practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caplumb")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Plumber Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Red Seal Plumber practice questions",
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
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("caplumb"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Common Occupational Skills", weight: "11%" },
  { name: "B. Pipe Preparation & Joining", weight: "10%" },
  { name: "C. Sewers, Septic & DWV", weight: "26%" },
  { name: "D. Water Service & Distribution", weight: "19%" },
  { name: "E. Fixtures & Water Treatment", weight: "13%" },
  { name: "F. Hydronic & Steam Systems", weight: "13%" },
  { name: "G. Specialized Systems", weight: "8%" },
];

export default function RedSealPlumberLandingPage() {
  return (
    <div data-theme="caplumb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Plumber Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-plumber/dashboard"
            shortName="Red Seal Plumber"
            subtitle="200 questions across all seven Major Work Activities, from trap seals, venting and septic systems to backflow, water heaters and hydronic heating, with the real 70% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caplumb-mobile.png", desktop: "/landing/caplumb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caplumb" />

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
                Red Seal publishes how the 125 questions split across the seven Major Work Activities of the 2023 Occupational Standard, and the practice tests here keep that split in 50 questions. Sewers, septic and DWV systems are the biggest single area at about a quarter of the exam, with water service and distribution next, so those are where most of your study time should go. Instructors running a pre-apprenticeship or apprenticeship plumbing class can assign Tigertest at{" "}
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
                src={getTigerAsset("caplumb", 1)}
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
            How to Pass the Red Seal Plumber Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think in trap seals</h3>
              <p>
                Most DWV questions come back to one idea: keep the water seal in every trap. Learn the ways a seal is lost (self-siphonage, induced siphonage, back pressure, evaporation, capillary action, wind), and what prevents each: venting, trap arm limits, primers and the right fittings at changes of direction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the code numbers as a list</h3>
              <p>
                A 38 mm minimum trap seal, 1 in 50 slope on small drains, a 3 in minimum drain for a water closet, a 550 kPa limit before a pressure-reducing valve, 49°C at the shower, 60°C storage, a 25 mm minimum air gap and a 3 m water test for 15 minutes. Write them on one card and drill it until none needs thought.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the trade math</h3>
              <p>
                Expect fitting allowances, 45-degree offsets (travel is 1.414 times the offset), fall from a grade, scale drawings, pressure from height (about 9.81 kPa per metre) and hydronic heat from flow and temperature drop. Do them by hand until they are quick.
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
          Red Seal Plumber Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="caplumb" />
        </div>
      </div>

      <ExamRelatedTests examId="caplumb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all seven Major Work Activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-plumber/dashboard" />
        </div>
      </div>
    </div>
  );
}
