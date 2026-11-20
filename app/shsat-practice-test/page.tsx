import "@/lib/v2/banks/shsat";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free SHSAT Practice Test 2026 - NYC Specialized High Schools ELA and Math";
const metaDescription =
  "Free SHSAT practice for the NYC Specialized High Schools Admissions Test: two full tests of 50 ELA and 50 Math questions in 3 hours, Revising/Editing, reading passages and no-calculator math.";
const description =
  "A free practice test for the SHSAT, the NYC Public Schools test for Stuyvesant, Bronx Science, Brooklyn Tech and the other Specialized High Schools. Two full practice tests of 50 English Language Arts and 50 Math questions in 3 hours, written to the NYC Guide to the SHSAT and the New York State standards, with Revising/Editing Parts A and B, informational and literary reading passages, math with no calculator, a percent score per subject and an explanation for every question. Eight drills, two of which teach the basics first. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SHSAT practice test, free SHSAT practice test, SHSAT 2026, SHSAT practice questions, SHSAT math practice, SHSAT ELA practice, SHSAT revising editing, Specialized High Schools Admissions Test, Stuyvesant test, Bronx Science test, Brooklyn Tech test, NYC specialized high school test prep",
  alternates: {
    canonical: `${siteUrl}/shsat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/shsat-practice-test`,
    images: [{ url: shareImageUrl("shsat"), width: 1200, height: 630, alt: "Tigertest free SHSAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("shsat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SHSAT?",
    a: "The Specialized High Schools Admissions Test is the NYC Public Schools test used to admit students to eight of the city's nine Specialized High Schools: Bronx High School of Science, Brooklyn Latin School, Brooklyn Technical High School, High School for Math, Science and Engineering at City College, High School of American Studies at Lehman College, Queens High School for Sciences at York College, Staten Island Technical High School and Stuyvesant High School. LaGuardia High School admits students by audition instead. NYC residents in 8th grade, or in 9th grade for the first time, can take it in the fall before the year they want to start.",
  },
  {
    q: "How many questions are on the SHSAT, and how long is it?",
    a: "From fall 2026 the SHSAT has 50 English Language Arts questions and 50 Math questions, and you have 180 minutes for both. You choose which subject to start with and how to split the time, but once you submit a subject you cannot go back to it. Each subject includes 10 field-test questions that do not count toward your score. Each Tigertest practice test has the same 50 and 50 questions, with 90 minutes for each subject.",
  },
  {
    q: "What changed on the SHSAT in 2026?",
    a: "Beginning in fall 2026, the SHSAT is a computer-adaptive test: it picks harder or easier questions based on how you are doing, while every student answers the same number of questions on the same content. You must answer each question before you move on. In ELA you can go back within a passage set until you submit it; in Math, and on stand-alone ELA questions, you cannot go back at all. The Tigertest practice tests are fixed forms, not adaptive, and the Math section, like the real one, does not let you go back.",
  },
  {
    q: "What is on the ELA section?",
    a: "Three kinds of questions. Revising/Editing Part A gives you a text with numbered sentences and asks how to improve it: a clearer claim, a better transition, a detail that does not belong, a stronger conclusion. Part B asks stand-alone questions about grammar and punctuation, such as verb tense shifts, pronouns, dangling modifiers and combining sentences. Reading Comprehension gives you informational and literary texts, including poems and stories, with questions on central idea, evidence, word meaning, structure and theme.",
  },
  {
    q: "What is on the Math section, and can I use a calculator?",
    a: "No calculator is allowed, and formulas are not given, so you need to know area, volume and circle formulas by heart. On the grade 8 test, the math comes from New York State standards through grade 7: ratios and percents, negative numbers and expressions, equations and inequalities, geometry, and statistics and probability. Some questions are multiple choice and some ask you to type in the answer.",
  },
  {
    q: "What score do I need to get into Stuyvesant or another specialized high school?",
    a: "There is no pass mark. Your two subject scores are converted to scaled scores and added into a composite score, which is used to rank students for offers. No fixed score guarantees a seat at any school. Tigertest reports percent correct, not a scaled score, so use it to find your weak areas rather than to predict an offer.",
  },
  {
    q: "Is the Tigertest SHSAT practice free?",
    a: "Yes, all of it: both full practice tests, all eight drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SHSAT Practice Test",
      description,
      url: `${siteUrl}/shsat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("shsat"),
      featureList: [
        "Two full practice tests: 50 English Language Arts and 50 Math questions in 3 hours",
        "Revising/Editing Parts A and B and informational and literary reading passages",
        "Math with no calculator and no formula sheet, like the real SHSAT",
        "Some math answers typed in, like the real fill-in-the-blank questions",
        "Eight mastery drills, one for each part of the test, two with the basics taught first",
        "Practice Test 2 held out of the drills for a clean score",
        "An explanation for every question",
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
        classFaqJsonLd("shsat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Revising/Editing Part A", section: "ELA", weight: "10 per test" },
  { name: "Revising/Editing Part B", section: "ELA", weight: "10 per test" },
  { name: "Reading: Informational Texts", section: "ELA", weight: "15 per test" },
  { name: "Reading: Literary Texts", section: "ELA", weight: "15 per test" },
  { name: "Ratios and Percents", section: "Math", weight: "10 per test" },
  { name: "Number System and Expressions", section: "Math", weight: "11 per test" },
  { name: "Equations and Inequalities", section: "Math", weight: "11 per test" },
  { name: "Geometry", section: "Math", weight: "10 per test" },
  { name: "Statistics and Probability", section: "Math", weight: "8 per test" },
];

export default function ShsatLandingPage() {
  return (
    <div data-theme="shsat" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SHSAT Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/shsat/dashboard"
            shortName="SHSAT"
            subtitle="50 ELA and 50 Math questions in 3 hours like the real SHSAT. Everything is free, no account needed."
            shots={{ mobile: "/landing/shsat-mobile.png", desktop: "/landing/shsat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="shsat" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, one for each part of the SHSAT, from Revising/Editing and reading passages to percents and geometry. Grammar and percents open with the basics. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                ELA and Math in one 3-hour sitting, 90 minutes each, on a computer like the real test. Reading passages stay beside their questions, Math lets you go only forward, and you finish with a percent score per subject and a list of what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the Real Exam Format</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test has the real SHSAT&apos;s 50 ELA and 50 Math questions, written to the NYC Guide to the SHSAT and the New York State standards through grade 7. NYC Public Schools does not publish how many questions come from each part, so the split below is Tigertest&apos;s own. The real test adapts to each student and gives a scaled score; this one is a fixed set, so it reports percent correct.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{area.section}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("shsat", 3)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Run an SHSAT Prep Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teachers can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores in each subject and the questions your class misses most.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the SHSAT</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan your time before test day</h3>
              <p>
                You get 180 minutes for both subjects and choose the order. Decide which subject you will start with and roughly when you will switch, and practice that plan on a full practice test so the clock holds no surprises.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the formulas by heart</h3>
              <p>
                No formulas are given and no calculator is allowed. Know the area of triangles, trapezoids and circles, circumference, surface area and volume of prisms, and how to work percents and fractions on paper quickly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Answer from the text, not from memory</h3>
              <p>
                Reading questions are about what the passage says. Find the sentence that supports your answer before you choose it, and for Revising/Editing read the sentences around the one in the question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest part, then test again</h3>
              <p>
                Take Practice Test 1, look at your score by part, and spend a little time each day on the weakest drill. Then take Practice Test 2. Its questions never appear in the drills, so it shows real progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">SHSAT Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="shsat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="shsat" />

      <ExamRelatedTests examId="shsat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two full practice tests and eight drills, from Revising/Editing to geometry.</p>
          <ExamLandingCTA dashboardHref="/shsat/dashboard" />
        </div>
      </div>
    </div>
  );
}
