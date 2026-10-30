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

const title = "CSCS Test Practice 2026 - Free HS&E Mock Tests";
const metaDescription =
  "Free CSCS test practice for the CITB Health, Safety and Environment test for operatives: 200 original questions, four 50-question mock tests, 45 of 50 to pass.";
const description =
  "Free practice for the CITB Health, Safety and Environment (HS&E) test for operatives, the test you need for a CSCS card: 200 original questions on legal duties and site rules, welfare and emergencies, occupational health and PPE, signs, fire, electricity, tools and plant, working at height, excavations and confined spaces, and the environment. Four 50-question mock tests with the real 45 of 50 pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CSCS test practice, CITB HS&E test, CSCS mock test, health safety and environment test operatives, CSCS green card test, CSCS test questions 2026, free CSCS test",
  alternates: {
    canonical: `${siteUrl}/cscs-test-practice`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cscs-test-practice`,
    images: [{ url: shareImageUrl("cscs"), width: 1200, height: 630, alt: "Tigertest free CSCS test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cscs")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the pass mark for the CSCS test?",
    a: "The CITB Health, Safety and Environment test for operatives has 50 questions in 45 minutes, and you need 45 of them right, which is 90 percent. There is no negative marking, so answer every question. The mock tests here use the same length and the same 45 of 50 pass line.",
  },
  {
    q: "Which HS&E test do I need for a CSCS card?",
    a: "CITB runs three versions: Operatives, Specialists and Managers and Professionals. Most site workers applying for a labourer or skilled worker card take the operatives test, and supervisors and managers take the managers and professionals test. Use the card finder on the CSCS website to check which one your card needs. This practice covers the operatives test.",
  },
  {
    q: "What topics does the operatives test cover?",
    a: "The questions come from the core knowledge areas of the official revision material: legal and management duties, health and welfare, general safety, high-risk activities such as working at height, excavations and confined spaces, and the environment. Many questions are set on site and ask what you should do, not just what the rule says. CITB does not publish how many questions come from each area, so the weights here are ours.",
  },
  {
    q: "How much does the test cost and how long does a pass last?",
    a: "CITB lists the test at 23.50 pounds, booked online or by phone and taken at a Pearson Professional Centre. There is no expiry date on the result itself, but CSCS will only accept a test passed in the 2 years before you apply for or renew a card, so plan to apply soon after you pass.",
  },
  {
    q: "Are these the official CITB questions?",
    a: "No. Every question here is written by Tigertest from the Health and Safety at Work Act, the CDM Regulations 2015, HSE guidance and the other law the test is based on. It tests the same knowledge without copying the CITB revision book or its question bank. Rules follow Great Britain law; where Scotland, Wales or Northern Ireland differ, the question says so or stays general.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CSCS Test Practice",
      description,
      url: `${siteUrl}/cscs-test-practice`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 HS&E test practice questions",
        "4 mock tests of 50 questions with the 45 of 50 pass mark",
        "5 training sets by topic",
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
        classFaqJsonLd("cscs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Legal Duties & Site Management", weight: "16%" },
  { name: "Health, Welfare & Emergencies", weight: "12%" },
  { name: "Occupational Health & PPE", weight: "20%" },
  { name: "Signs, Fire, Electricity, Tools & Plant", weight: "20%" },
  { name: "Working at Height", weight: "14%" },
  { name: "Excavations & Confined Spaces", weight: "8%" },
  { name: "Environment & Waste", weight: "10%" },
];

export default function CscsTestPracticeLandingPage() {
  return (
    <div data-theme="cscs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CSCS Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cscs/dashboard"
            shortName="CSCS Test"
            subtitle="200 questions for the CITB Health, Safety and Environment test for operatives: site law, health hazards, working at height, plant, fire and the environment, with the real 45 of 50 pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cscs-mobile.png", desktop: "/landing/cscs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cscs" />

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
                Five training sets: law, welfare and emergencies; occupational health and PPE; general site safety; high-risk activities; and the environment. Questions you miss come back until you have mastered them.
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
                Four 50-question mock tests, the length of the real operatives test, with the same 45 of 50 pass mark and an explanation of the right answer on every question.
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
                Built on the HS&amp;E Core Knowledge Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The operatives test draws on the core knowledge of the official revision material, from your legal duties to dust, noise, scaffolds, plant and spills. CITB does not publish how many questions each area gets, so the mock tests spread them the way the material does, with the most weight on occupational health and general site safety. Colleges and training centres running a construction course can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("cscs", 1)}
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
            How to Pass the CSCS Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think &quot;stop and report&quot;</h3>
              <p>
                Many questions put you on site and ask what you should do: suspected asbestos, a missing guard rail, a damaged lead, a nest in a hedge. The right answer is almost always to stop, keep others away and tell your supervisor, not to fix it yourself or carry on carefully.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the handful of numbers</h3>
              <p>
                110 volts for site tools, 85 dB(A) for compulsory hearing protection, guard rails at least 950 mm high, scaffold inspections at least every 7 days, excavations checked at the start of every shift, ladders at 1 out for every 4 up, RIDDOR reports for injuries over 7 days and fuel bunds holding 110 percent.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the sign colours and the order of controls</h3>
              <p>
                Red circles forbid, blue circles tell you what to do, yellow triangles warn and green means safe condition. For any hazard, the order is the same: avoid it, control it at source, protect everyone, and only then rely on PPE.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above the pass mark</h3>
              <p>
                With 45 of 50 needed there is little room for error. Tigertest tracks your accuracy by topic: aim for 47 or more on every mock test before you book, then drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CSCS Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cscs" />
        </div>
      </div>

      <ExamRelatedTests examId="cscs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your CSCS Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every core knowledge area.</p>
          <ExamLandingCTA dashboardHref="/cscs/dashboard" />
        </div>
      </div>
    </div>
  );
}
