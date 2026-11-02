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

const title = "Free GCSE Maths Higher Practice Test - 3 Papers";
const metaDescription =
  "Free GCSE Maths Higher tier practice: two full practice tests of three papers (Paper 1 non-calculator), topic drills for grades 4 to 9 and every answer explained.";
const description =
  "Free GCSE Maths Higher tier practice for students in England. Two full practice tests, each three timed papers like the real exam (Paper 1 without a calculator, Papers 2 and 3 with one), weighted like the Higher tier: algebra 30%, ratio and proportion 20%, geometry 20%, number 15%, probability and statistics 15%. Five topic drills sized for a phone cover surds, indices, quadratics, functions, circle theorems, the sine and cosine rules, vectors, histograms and tree diagrams; four open with short Basics lessons. Every answer is explained, every miss comes back until it is learned, and teachers can set it for a class free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GCSE maths higher practice test, GCSE maths higher paper, GCSE maths practice paper, higher tier maths questions, GCSE maths non calculator paper, GCSE maths calculator paper, grade 7 maths revision, grade 9 maths questions, GCSE maths revision, AQA Edexcel OCR higher maths practice",
  alternates: {
    canonical: `${siteUrl}/gcse-maths-higher-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gcse-maths-higher-practice-test`,
    images: [{ url: shareImageUrl("gcsehigher"), width: 1200, height: 630, alt: "Tigertest free GCSE Maths Higher practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcsehigher")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the GCSE Maths Higher tier exam?",
    a: "Three papers of 1 hour 30 minutes and 80 marks each, all sat at the end of Year 11. Paper 1 is non-calculator; Papers 2 and 3 allow a calculator. Every paper can test any topic, and Higher tier content is weighted 30% algebra, 20% ratio, proportion and rates of change, 20% geometry and measures, 15% number, and 15% probability and statistics. AQA, Pearson Edexcel and OCR all follow this structure because it comes from the Department for Education's subject content.",
  },
  {
    q: "What grades can you get on the Higher tier?",
    a: "Grades 4 to 9, with an allowed grade 3 for students who just miss grade 4. Grade boundaries are set after each exam series and change from year to year, so there is no fixed percentage for a grade. In June 2025, for example, Pearson Edexcel's Higher tier needed 53 of 240 marks (about 22%) for a grade 4 and 217 (about 90%) for a grade 9; other boards and other years differ.",
  },
  {
    q: "Should I sit Higher or Foundation?",
    a: "Foundation covers grades 1 to 5 and Higher covers 4 to 9, so a student aiming for grade 6 or above has to sit Higher. A student who is secure at grade 4 or 5 but not yet higher can do better on Foundation, where the top grade is 5. Your maths teacher decides entries, usually from mock results. If Foundation is right for you, Tigertest has a separate GCSE Maths Foundation practice test.",
  },
  {
    q: "How is the Tigertest practice test set out?",
    a: "Each practice test is three papers of 20 questions in 45 minutes, with the same mix of topics and the same calculator rules as the real papers, and a 10-minute break between them. Questions are multiple choice or a typed answer, marked right or wrong, so your score is a percentage rather than a grade. Practice Test 2 is kept out of the drills so it gives a clean measure of where you are.",
  },
  {
    q: "What are the drills?",
    a: "Five topic drills, one for each content area: number, algebra, ratio and proportion, geometry and measures, and probability and statistics. Each is 20 non-calculator questions that run from grade 4 style to grade 8 and 9 style, and every miss comes back until you get it right. Four drills open with short Basics lessons (indices, factorising, percentage change, SOH CAH TOA and more) that you can skip if you already know them.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: both practice tests, all five drills, the Basics lessons and every explanation, with no account required. An account saves your progress across a phone and a laptop.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free GCSE Maths Higher Practice Test",
      description,
      url: `${siteUrl}/gcse-maths-higher-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Two full practice tests of three timed papers each",
        "Paper 1 without a calculator, Papers 2 and 3 with one",
        "Weighted like the Higher tier: 30% algebra",
        "Five topic drills with short Basics lessons",
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
        classFaqJsonLd("gcsehigher"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Algebra", topics: "Quadratics, simultaneous equations, functions, sequences, iteration, circle equations", weight: "30%" },
  { name: "Ratio, proportion and rates", topics: "Compound interest, reverse percentages, direct and inverse proportion", weight: "20%" },
  { name: "Geometry and measures", topics: "Sine and cosine rules, circle theorems, vectors, similar solids", weight: "20%" },
  { name: "Number", topics: "Surds, fractional indices, standard form, bounds, recurring decimals", weight: "15%" },
  { name: "Probability and statistics", topics: "Tree and Venn diagrams, histograms, quartiles, sampling", weight: "15%" },
];

export default function GcseHigherLandingPage() {
  return (
    <div data-theme="gcsehigher" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GCSE Maths Higher Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/gcse-maths-higher/dashboard"
            shortName="GCSE Maths Higher"
            subtitle="Two full practice tests of three timed papers, Paper 1 without a calculator, plus five topic drills for grades 4 to 9. Free, no account needed."
            shots={{ mobile: "/landing/gcsehigher-mobile.png", desktop: "/landing/gcsehigher-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcsehigher" />

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
                One drill per topic area, 20 non-calculator questions each. Check every answer as you go, read why it is right, and every miss comes back until you get it. Four drills start with short Basics lessons you can skip.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Three-Paper Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Paper 1 without a calculator, Papers 2 and 3 with the on-screen calculator, timed with a break between. Flag questions, go back, then see your score by paper and by topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content areas */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Weighted Like the Higher Tier</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every paper follows the Department for Education&apos;s Higher tier weightings, so algebra gets the most practice, with plenty of the Higher-only topics that decide grades 7 to 9.
              </p>
              <div className="space-y-3">
                {contentAreas.map((a) => (
                  <div key={a.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{a.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{a.topics}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{a.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("gcsehigher", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a Year 10 or 11 Class?</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Revise for GCSE Maths Higher</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with algebra</h3>
              <p>
                Algebra is 30% of the Higher papers and turns up inside geometry and ratio questions too. Secure factorising, solving quadratics and rearranging formulae first, and many other topics get easier.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise without a calculator</h3>
              <p>
                Paper 1 is a third of the marks. Surds, exact trig values, fractional indices and fraction arithmetic all need to be done by hand, which is why every drill here is non-calculator.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the formulae you are not given</h3>
              <p>
                The quadratic formula, the sine and cosine rules, the area of a triangle using sine, and compound interest are not printed on the paper. Formulae for the volume of a cone or sphere are given in the question when needed.
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">GCSE Maths Higher Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcsehigher" />
        </div>
      </div>

      <ExamRelatedTests examId="gcsehigher" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with the algebra drill.</p>
          <ExamLandingCTA dashboardHref="/gcse-maths-higher/dashboard" />
        </div>
      </div>
    </div>
  );
}
