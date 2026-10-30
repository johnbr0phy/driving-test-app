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

const title = "Free HSC Maths Standard 2 Practice Test - Full Papers";
const metaDescription =
  "Free HSC Mathematics Standard 2 practice: two full papers with a reference sheet, drills for every Year 12 topic from annuities to the normal distribution, and every answer explained.";
const description =
  "Free HSC Mathematics Standard 2 practice for Year 12 students in NSW, written to the NESA Mathematics Standard 11-12 Syllabus (2024) first examined in the 2027 HSC. Two full practice papers, each a multiple-choice Section I and a short-answer Section II, with a calculator and a reference sheet on every question. Six topic drills sized for a phone cover algebraic relationships, investment, loans and annuities, trigonometry and rates, network flow and critical paths, bivariate data, and probability and the normal distribution; three open with short Basics lessons. Every answer is explained, every miss comes back until it is learned, and teachers can set it for a class free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "HSC maths standard 2 practice test, HSC maths standard 2 practice paper, HSC standard maths questions, maths standard 2 trial paper, HSC maths standard 2 revision, year 12 standard maths, annuities questions, network flow questions, critical path analysis questions, normal distribution z-score questions, NESA maths standard",
  alternates: {
    canonical: `${siteUrl}/hsc-maths-standard-2-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hsc-maths-standard-2-practice-test`,
    images: [{ url: shareImageUrl("hscmaths"), width: 1200, height: 630, alt: "Tigertest free HSC Maths Standard 2 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hscmaths")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the HSC Mathematics Standard 2 exam?",
    a: "One written paper worth 100 marks, with 2 hours and 30 minutes plus 10 minutes reading time. Section I is objective-response (multiple-choice) questions worth 15 marks. Section II is worth 85 marks, with 35 to 40 items that may have parts and at least two worth 4 or 5 marks. NESA-approved calculators are allowed and a reference sheet is provided. The paper focuses on the Year 12 course, with the Year 11 course as assumed knowledge that may also be examined.",
  },
  {
    q: "Which syllabus does the HSC exam follow?",
    a: "The 2027 HSC is the first examination of NESA's Mathematics Standard 11-12 Syllabus (2024). Year 11 started it in 2026 and Year 12 moved onto it in Term 4 of 2026; the 2026 HSC is the last on the 2017 syllabus. Most Year 12 topics carry over, so the practice here also suits revision from 2017-syllabus resources, but the new syllabus is what the 2027 paper tests.",
  },
  {
    q: "What topics are in Year 12 Standard 2?",
    a: "Ten focus areas: algebraic relationships, investment and loans, annuities, trigonometry, ratios and rates, network flow, critical path analysis, bivariate data analysis, relative frequency and probability, and the normal distribution. Tigertest groups them into six drills.",
  },
  {
    q: "How is the Tigertest practice test set out?",
    a: "Each practice paper is a Section I of 15 multiple-choice questions (25 minutes) and a Section II of 25 short-answer questions (60 minutes), mostly typed numerical answers like the parts of a real Section II question. A calculator and a reference sheet are on every question. Each question is one mark, right or wrong, so your score is a percentage rather than a band. Practice Test 2 is kept out of the drills so it gives a clean measure of where you are.",
  },
  {
    q: "How are HSC results reported?",
    a: "Your HSC mark for the course combines the exam mark with your moderated school-based assessment mark, and is reported in Bands 1 to 6, with Band 6 for marks of 90 and above. Exam marks are aligned to the bands by NESA after the exam, so a raw percentage on any practice paper is a guide, not a band.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: both practice papers, all six drills, the Basics lessons and every explanation, with no account required. An account saves your progress across a phone and a laptop.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HSC Maths Standard 2 Practice Test",
      description,
      url: `${siteUrl}/hsc-maths-standard-2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "Two full practice papers: Section I multiple choice and Section II short answer",
        "Calculator and reference sheet on every question",
        "Written to the NESA Mathematics Standard 11-12 Syllabus (2024)",
        "Six topic drills with short Basics lessons",
        "Practice Test 2 held out of the drills for a clean score",
        "Every answer explained",
        "Free class dashboards for teachers",
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
        classFaqJsonLd("hscmaths"),
      ],
    },
  ],
};

const topics = [
  { name: "Investment, loans and annuities", topics: "Compound interest, depreciation, shares, credit cards, annuity tables, recurrence relations", weight: "8 per paper" },
  { name: "Trigonometry, ratios and rates", topics: "Sine and cosine rules, bearings, radial surveys, energy, fuel, scale, trapezoidal rule", weight: "8 per paper" },
  { name: "Probability and the normal distribution", topics: "Relative frequency, two-way tables, z-scores, the 68-95-99.7 rule", weight: "7 per paper" },
  { name: "Algebraic relationships", topics: "Break-even, simultaneous equations, exponential, quadratic and reciprocal models", weight: "6 per paper" },
  { name: "Networks and critical paths", topics: "Maximum-flow minimum-cut, earliest and latest start times, float, spanning trees", weight: "6 per paper" },
  { name: "Bivariate data analysis", topics: "Pearson's correlation, least-squares line, interpolation and extrapolation", weight: "5 per paper" },
];

export default function HscMathsLandingPage() {
  return (
    <div data-theme="hscmaths" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HSC Maths Standard 2 Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/hsc-maths-standard/dashboard"
            shortName="HSC Maths Standard 2"
            subtitle="Two full practice papers with a reference sheet, plus six drills for every Year 12 topic, written to the new NESA syllabus. Free, no account needed."
            shots={{ mobile: "/landing/hscmaths-mobile.png", desktop: "/landing/hscmaths-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hscmaths" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill per topic group, 20 questions each. Check every answer as you go, read the worked solution, and every miss comes back until you get it. Three drills start with short Basics lessons you can skip.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Papers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Section I multiple choice, then Section II short answer, timed, with the on-screen calculator and a reference sheet. Flag questions, go back, then see your score by section and by topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Every Year 12 Focus Area</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                All ten Year 12 Standard 2 focus areas, grouped into six drills, with the Year 11 skills the paper assumes. Each 40-question practice paper covers every group.
              </p>
              <div className="space-y-3">
                {topics.map((a) => (
                  <div key={a.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{a.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{a.topics}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base whitespace-nowrap">{a.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("hscmaths", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a Year 12 Standard Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as revision for free: share one link, students join with just their first name, and you see who practised, their paper scores and the topics your class finds hardest.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Revise for HSC Maths Standard 2</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your reference sheet</h3>
              <p>
                The formulas for compound interest, depreciation, the sine and cosine rules, the area of a triangle and z-scores are given to you. Know where each one is and when to use it, so you spend exam time working, not searching.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get fluent with your calculator</h3>
              <p>
                Pearson&apos;s correlation coefficient and the least-squares line come from statistics mode, and compound interest needs powers entered correctly. Practise each keystroke sequence until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Show the rate and the number of periods</h3>
              <p>
                Most finance mistakes are a yearly rate used monthly. Write down the rate per period and the number of periods before you calculate, every time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Sit a full paper under time</h3>
              <p>
                Once the drills are green, take Practice Test 2 in one sitting with the clock on. It is kept out of the drills, so the score shows what you can do on questions you have not seen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">HSC Maths Standard 2 Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hscmaths" />
        </div>
      </div>

      <ExamRelatedTests examId="hscmaths" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with the finance drill.</p>
          <ExamLandingCTA dashboardHref="/hsc-maths-standard/dashboard" />
        </div>
      </div>
    </div>
  );
}
