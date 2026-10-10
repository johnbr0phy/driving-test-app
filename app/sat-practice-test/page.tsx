import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free SAT Practice Test 2026 - Full-Length, Timed, Adaptive";
const description =
  "Free full-length digital SAT practice test: Reading and Writing plus Math in four timed, adaptive modules, a built-in calculator and reference sheet, and a 400 to 1600 score estimate. Eight skill drills sized for your phone bring every miss back until you master it.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "SAT practice test, free SAT practice test, digital SAT practice test, full length SAT practice test, SAT math practice, SAT reading and writing practice, PSAT practice, SAT score calculator, SAT prep 2026",
  alternates: {
    canonical: `${siteUrl}/sat-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/sat-practice-test`,
    images: [{ url: "/og/sat", width: 1200, height: 630, alt: "TigerTest free SAT practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/sat"],
    title,
    description,
  },
};

const faqs = [
  {
    q: "What is on the digital SAT?",
    a: "Two sections, each split into two modules. Reading and Writing has 54 questions in two 32-minute modules, and Math has 44 questions in two 35-minute modules, with a 10-minute break between sections. That is 98 questions in 2 hours and 14 minutes. The TigerTest practice test uses the same structure and timing.",
  },
  {
    q: "How is the SAT scored?",
    a: "Each section is scored from 200 to 800, for a total from 400 to 1600. The test is adaptive: how you do on the first module of a section decides whether the second module is easier or harder, and the harder path can reach higher scores. TigerTest converts your correct answers into an estimated section score with a typical curve. It is an estimate, not an official score.",
  },
  {
    q: "Can I use a calculator on the SAT?",
    a: "Yes, on the whole Math section. The real test has a built-in graphing calculator and a reference sheet of formulas, and you can bring an approved handheld calculator. The TigerTest practice test has a calculator and the reference sheet one tap away on every Math question.",
  },
  {
    q: "What is a good SAT score?",
    a: "The national average total is usually a little above 1000. Around 1200 puts you in the top quarter of test takers, 1400 in roughly the top 5 percent. The score that matters is the one your target colleges expect, so check their middle 50 percent range and set that as your goal on the dashboard.",
  },
  {
    q: "Is this an official SAT practice test?",
    a: "No. Every question is original, written to the published digital SAT specifications for content, question types and difficulty. TigerTest is not affiliated with or endorsed by College Board. Use it alongside the official practice tests in Bluebook.",
  },
  {
    q: "Is the TigerTest SAT practice test free?",
    a: "Yes. The full-length test and all eight skill drills are free with no account required. Create a free account to keep your progress in step between your phone and your computer.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free SAT Practice Test",
      description,
      url: `${siteUrl}/sat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Full-length digital SAT practice test, 98 questions",
        "Four timed modules with adaptive second modules",
        "Built-in calculator and math reference sheet",
        "Estimated section scores and a 400 to 1600 total",
        "Eight mastery drills, one per SAT skill area",
        "Explanations for every question",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
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
  { name: "Craft and Structure", section: "Reading and Writing", weight: "28%" },
  { name: "Information and Ideas", section: "Reading and Writing", weight: "26%" },
  { name: "Standard English Conventions", section: "Reading and Writing", weight: "26%" },
  { name: "Expression of Ideas", section: "Reading and Writing", weight: "20%" },
  { name: "Algebra", section: "Math", weight: "35%" },
  { name: "Advanced Math", section: "Math", weight: "35%" },
  { name: "Problem Solving and Data Analysis", section: "Math", weight: "15%" },
  { name: "Geometry and Trigonometry", section: "Math", weight: "15%" },
];

export default function SatLandingPage() {
  return (
    <div data-theme="sat" className="flex-1 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ExamLandingBreadcrumbs examId="sat" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free SAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sat"
            shortName="SAT"
            subtitle="A full-length digital SAT with timed, adaptive modules and a score estimate, plus eight skill drills built for your phone. No account needed."
            shots={{ mobile: "/landing/sat-mobile.png", desktop: "/landing/sat-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Drills on Your Phone</h3>
              <p className="text-gray-600">
                Eight drills, one for each skill area the SAT reports. One question at a time, one tap to check, an explanation right away, and every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Full Test on a Computer</h3>
              <p className="text-gray-600">
                The real structure and timing: four modules, a countdown clock, flag for review, answer eliminator, calculator and reference sheet, and a break between sections. Finish with an estimated score and a plan for what to drill next.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Built on the Digital SAT Blueprint</h2>
              <p className="text-lg text-gray-600 mb-6">
                Each section reports four skill areas. The practice test matches their share of the real test, and the drills are split the same way, so your results show exactly which area is holding your score back.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-3 bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span>
                      <span className="block font-medium text-gray-900">{area.name}</span>
                      <span className="block text-xs text-gray-500">{area.section}</span>
                    </span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("sat", 1)} alt="TigerTest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The SAT practice test is brand new, with more full-length tests on the way. If a question looks wrong or your score estimate feels off, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">How to Raise Your SAT Score</h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Set a goal score first</h3>
              <p>
                Look up the middle 50 percent SAT range for the colleges on your list and aim for the top of it. A fixed number tells you how many more questions you need per section and keeps your practice honest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Drill one skill area at a time</h3>
              <p>
                Ten minutes a night on your phone beats a weekend cram. Work through one drill until every question is mastered, then move to the next. Conventions and Algebra are the fastest points for most students because the rules repeat.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Win the first module</h3>
              <p>
                The second module of each section depends on how you do in the first. Careful, accurate work early opens the harder module, and only the harder module can reach the top scores. Slow down on the first ten questions and check your arithmetic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Take full tests under real conditions</h3>
              <p>
                Sit the whole thing in one go on a computer, with the timer on and your phone in another room. Then review every miss, drill the weakest skill area, and retake. There is no penalty for guessing, so never leave a question blank.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">SAT Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{f.q}</h3>
              <p className="text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="sat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Hit Your SAT Goal?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. A full-length test and eight skill drills.</p>
          <ExamLandingCTA dashboardHref="/sat" />
        </div>
      </div>
    </div>
  );
}
