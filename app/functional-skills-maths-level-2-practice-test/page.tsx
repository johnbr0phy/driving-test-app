import { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Functional Skills Maths Level 2 Practice Test";
const metaDescription =
  "Free Functional Skills Maths Level 2 practice: two full practice papers with a non-calculator and a calculator section, four topic drills and a short lesson before each topic.";
const description =
  "Free Functional Skills Maths Level 2 practice for adults, apprentices and college learners in England. Two full practice papers follow the real exam's shape: a non-calculator section worth a quarter of the marks, then a calculator section of real-life problems with money, measures and data. Four drills cover number, fractions, percentages and ratio, measures and shape, and handling data, each opening with click-through lessons (BIDMAS, percentage change, scale drawings, probability from a two-way table) and bringing every miss back until it is mastered. Free, with no account needed, and tutors can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "functional skills maths level 2, functional skills maths level 2 practice test, functional skills maths mock exam, functional skills level 2 maths questions, functional skills maths online test, level 2 maths practice, functional skills maths non calculator, functional skills maths revision, maths for apprenticeships, adult maths level 2",
  alternates: {
    canonical: `${siteUrl}/functional-skills-maths-level-2-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/functional-skills-maths-level-2-practice-test`,
    images: [{ url: "/og/fsmaths", width: 1200, height: 630, alt: "Tigertest free Functional Skills Maths Level 2 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/fsmaths"],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Functional Skills Maths Level 2 exam?",
    a: "Three areas of maths set by the Department for Education: using numbers (negative numbers, fractions, decimals, percentages, ratio, proportion and formulas), using measures, shape and space (money and interest, conversions, speed and rates of pay, area, volume, scale drawings, angles and 3-D views) and handling data (mean, median, mode and range, grouped frequency, probability and scatter graphs). Most marks are for multi-step problems set in everyday and work situations.",
  },
  {
    q: "Is there a non-calculator section?",
    a: "Yes. Ofqual's rules say 25% of the marks must come from a part taken without a calculator, either a separate section or a separate paper. Many awarding bodies put a short non-calculator section first and a longer calculator section after it. The Tigertest practice papers do the same: 10 questions without a calculator, then 30 with one.",
  },
  {
    q: "How long is the exam and what is the pass mark?",
    a: "Each awarding body sets its own paper and timing, so check yours when you book. Many Level 2 exams take around 2 hours in total; Pearson Edexcel's, for example, is a 25-minute non-calculator section and a 1 hour 30 minute calculator section. The pass mark is set for each paper by the awarding body, so there is no single number to aim for. Tigertest scores you in percent; reaching 70% on a practice paper gives you a comfortable margin.",
  },
  {
    q: "Is Level 2 the same as a GCSE?",
    a: "No, it is a separate qualification. Many employers, colleges and apprenticeship providers accept Functional Skills Maths Level 2 in place of GCSE maths at grade 4, but not all do (some university courses and teacher training ask for the GCSE), so check with the course or employer you are applying to. It focuses on using maths to solve practical problems, with much less algebra than GCSE, and the exam can usually be booked when you are ready rather than in one summer exam season.",
  },
  {
    q: "Do I have to remember the formulas?",
    a: "You need to know how to use the common ones, such as the area of a circle, the volume of a cylinder and speed = distance ÷ time. Tigertest keeps a formula sheet one tap away in every practice paper, and the measures drill opens with short lessons on each of them.",
  },
  {
    q: "How should I revise?",
    a: "Take Practice Paper 1 first to find your weak spots. Then work through the four drills: each starts with click-through lessons where you supply each step yourself, then 20 exam-style questions where every miss comes back until you get it right. Finish with Practice Paper 2, which is kept out of the drills, to check you are ready before you book.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: both practice papers, all four drills, every lesson and every explanation, with no account required. An account saves your progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Functional Skills Maths Level 2 Practice Test",
      description,
      url: `${siteUrl}/functional-skills-maths-level-2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Two full practice papers with a non-calculator and a calculator section",
        "Four topic drills on the DfE Level 2 subject content",
        "Click-through lessons before each topic, from BIDMAS to scatter graphs",
        "Real-life problems with pounds, metric units and imperial conversions",
        "Every missed question comes back until it is mastered",
        "Formula sheet on every practice paper",
        "Free class dashboards for tutors and teachers",
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
        classFaqJsonLd("fsmaths"),
      ],
    },
  ],
};

const topics = [
  { name: "Number and calculation", what: "Negative numbers, BIDMAS, formulas in words, decimals, estimating" },
  { name: "Fractions, percentages and ratio", what: "VAT, interest, discounts, budgets, best buys, proportion" },
  { name: "Measures, shape and space", what: "Area, volume, scale, speed, rates of pay, conversions, angles" },
  { name: "Handling data and probability", what: "Averages, frequency tables, two-way tables, scatter graphs" },
];

export default function FunctionalSkillsMathsLandingPage() {
  return (
    <div data-theme="fsmaths" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Functional Skills Maths Level 2 Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/functional-skills-maths/dashboard"
            shortName="FS Maths L2"
            subtitle="Two full practice papers with a non-calculator and a calculator section, four topic drills, and a short lesson before each topic. Real-life problems in pounds and metric units. Free, no account needed."
            shots={{ mobile: "/landing/fsmaths-mobile.png", desktop: "/landing/fsmaths-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fsmaths" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">A Lesson, Then a Drill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each topic opens with short lessons you tap through, like finding 10% first or always dividing by the original price, then 20 exam-style questions. See straight away if you are right, read why, and every miss comes back until you have it.
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
                Two timed papers of 40 questions: 10 without a calculator, then 30 with one, the same one-to-three split as the real exam. A formula sheet is one tap away, and your results show which topics to drill next.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">Every Level 2 Topic</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
            The drills follow the Department for Education&apos;s Level 2 subject content, split into four topics you can practise one at a time.
          </p>
          <div className="space-y-3">
            {topics.map((t) => (
              <div key={t.name} className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                <span className="block font-medium text-gray-900 dark:text-gray-50">{t.name}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">{t.what}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Functional Skills?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as practice for free: share one link, learners join on their phones, and you see who practised, their practice paper scores and the topics your group finds hardest. Built for college, adult learning and apprenticeship groups.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Pass Functional Skills Maths Level 2</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practise without a calculator</h3>
              <p>
                A quarter of the marks are calculator-free. Find 10% and build up from it, line up decimal points, and know BIDMAS so 3 + 4 × 2 comes out as 11, not 14.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Divide by the original</h3>
              <p>
                Percentage change and reverse percentages catch more people than anything else. The change is always compared with where you started, and a price after 20% off is 80% of the original, so divide by 0.8 to get back.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check the units and the time</h3>
              <p>
                2 hours 15 minutes is 2.25 hours, not 2.15. Areas are in m², volumes in m³ or cm³, and 1,000 cm³ is a litre. Write the units next to every number in your working.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Ask if the answer makes sense</h3>
              <p>
                Estimate first, then compare with your calculator. Round up when you need whole tins, packs or minibuses, and round down when you can only make whole pieces.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">Functional Skills Maths Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="fsmaths" />
        </div>
      </div>

      <ExamRelatedTests examId="fsmaths" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with a lesson on BIDMAS.</p>
          <ExamLandingCTA dashboardHref="/functional-skills-maths/dashboard" />
        </div>
      </div>
    </div>
  );
}
