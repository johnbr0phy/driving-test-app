import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Free PSAT Practice Test 2026 - Full-Length, Adaptive";
const metaDescription =
  "Free full-length digital PSAT/NMSQT practice test: Reading and Writing plus Math in timed adaptive modules, a built-in calculator and a 320 to 1520 score estimate.";
const description =
  "A free full-length digital PSAT/NMSQT practice test: Reading and Writing plus Math in four timed, adaptive modules, a calculator and reference sheet, and a 320 to 1520 score estimate. Four skill drills sized for your phone teach the basics first and bring every miss back until you master it. All free, no account needed.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PSAT practice test, free PSAT practice test, digital PSAT practice test, PSAT/NMSQT practice test, PSAT 10 practice test, PSAT math practice, PSAT reading and writing practice, National Merit selection index, PSAT prep 2026",
  alternates: {
    canonical: `${siteUrl}/psat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/psat-practice-test`,
    images: [{ url: shareImageUrl("psat"), width: 1200, height: 630, alt: "Tigertest free PSAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("psat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the digital PSAT/NMSQT?",
    a: "Two sections, each split into two modules. Reading and Writing has 54 questions in two 32-minute modules, and Math has 44 questions in two 35-minute modules, with a 10-minute break between sections. That is 98 questions in 2 hours and 14 minutes, the same layout as the digital SAT. The Tigertest practice test uses the same structure and timing.",
  },
  {
    q: "How is the PSAT scored?",
    a: "Each section is scored from 160 to 760, for a total from 320 to 1520. The test is adaptive: how you do on the first module of a section decides whether the second module is easier or harder, and only the harder path reaches the top scores. Tigertest converts your correct answers into an estimated section score with a typical curve. It is an estimate, not an official score.",
  },
  {
    q: "What is the National Merit Selection Index?",
    a: "For 11th graders who take the PSAT/NMSQT, National Merit Scholarship Corporation uses a Selection Index: two times the Reading and Writing score plus the Math score, divided by 10, which runs from 48 to 228. The cutoff for Semifinalist status is set separately for each state and changes every year, so check the latest figures for your state.",
  },
  {
    q: "How is the PSAT different from the SAT?",
    a: "The format, question types and timing are the same, and both have a built-in calculator for all of Math. The PSAT is pitched a little easier and is scored on a lower scale, 320 to 1520 instead of 400 to 1600. The PSAT/NMSQT is given in the fall to 10th and 11th graders, and the PSAT 10 is the same test given in the spring. Practicing for one is practice for the other.",
  },
  {
    q: "Is this an official PSAT practice test?",
    a: "No. Every question is original, written to the published digital PSAT/NMSQT specifications for content, question types and difficulty. Tigertest is not affiliated with or endorsed by College Board or National Merit Scholarship Corporation. The practice test, its score and explanations, and all four drills are free with no account required. Use it alongside the official practice tests in Bluebook.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PSAT Practice Test",
      description,
      url: `${siteUrl}/psat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "A full-length adaptive digital PSAT/NMSQT practice test, 98 questions",
        "Four timed modules with adaptive second modules",
        "Built-in calculator and math reference sheet",
        "Estimated section scores and a 320 to 1520 total",
        "Four mastery drills that teach the basics first",
        "The practice test held out of the drills for a clean score",
        "Explanations for every question",
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
        classFaqJsonLd("psat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Craft and Structure", section: "Reading and Writing", weight: "28%" },
  { name: "Information and Ideas", section: "Reading and Writing", weight: "26%" },
  { name: "Standard English Conventions", section: "Reading and Writing", weight: "26%" },
  { name: "Expression of Ideas", section: "Reading and Writing", weight: "20%" },
  { name: "Algebra", section: "Math", weight: "35%" },
  { name: "Advanced Math", section: "Math", weight: "32.5%" },
  { name: "Problem Solving and Data Analysis", section: "Math", weight: "20%" },
  { name: "Geometry and Trigonometry", section: "Math", weight: "12.5%" },
];

export default function PsatLandingPage() {
  return (
    <div data-theme="psat" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PSAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/psat/dashboard"
            shortName="PSAT"
            subtitle="A full-length digital PSAT/NMSQT with timed, adaptive modules and a score estimate, plus four skill drills built for your phone. All free, no account needed."
            shots={{ mobile: "/landing/psat-mobile.png", desktop: "/landing/psat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="psat" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Skill Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four drills: Reading, Writing, Algebra and Advanced Math, and Data and Geometry. Each opens with short Basics lessons, then one question at a time, one tap to check, an explanation right away, and every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Test on a Computer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The real structure and timing: four modules, a countdown clock, flag for review, answer eliminator, calculator and reference sheet, and a break between sections. Finish with an estimated score and a plan for what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the Digital PSAT Blueprint</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each section reports four skill areas. The practice test matches their approximate share of the real test, so your results show exactly which area is holding your score back.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{area.section}</span>
                    </span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("psat", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Study guide */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Raise Your PSAT Score</h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know why you are taking it</h3>
            <p>
              In 10th grade the PSAT is a low-stakes preview of the SAT. In 11th grade the PSAT/NMSQT is also the entry to National Merit, so look up last year&apos;s Selection Index cutoff for your state and set your goal from it.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the basics, then drill</h3>
            <p>
              Ten minutes a night on your phone beats a weekend cram. Start each drill with its Basics lessons, then work through the questions until every one is mastered. Punctuation rules and linear equations repeat on every test, so they are the fastest points for most students.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Win the first module</h3>
            <p>
              The second module of each section depends on how you do in the first. Careful, accurate work early opens the harder module, and only the harder module can reach the top scores. Slow down on the first ten questions and check your arithmetic.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take the full test under real conditions</h3>
            <p>
              Sit the whole thing in one go on a computer, with the timer on and your phone in another room. Then review every miss and drill the weakest skill area. There is no penalty for guessing, so never leave a question blank.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">PSAT Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="psat" />
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="psat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Hit Your PSAT Goal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start and free to finish. No account required.</p>
          <ExamLandingCTA dashboardHref="/psat/dashboard" />
        </div>
      </div>
    </div>
  );
}
