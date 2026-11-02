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

const title = "Free GCSE Combined Science Practice Test 2026";
const metaDescription =
  "Free GCSE Combined Science practice: biology, chemistry and physics questions with explanations, two timed practice tests and drills that teach the maths skills first.";
const description =
  "Free GCSE Combined Science practice for Foundation tier students in England. Two timed practice tests cover biology, chemistry and physics, and six drills follow the paper 1 and paper 2 topics of each science, with short lessons first on magnification, variables, relative formula mass, balancing equations, using and rearranging physics equations and units. Every miss comes back until it is mastered, and every question has an explanation. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GCSE combined science practice test, GCSE science revision, GCSE combined science foundation, trilogy science revision, GCSE biology questions, GCSE chemistry questions, GCSE physics questions, required practicals, GCSE science mock, free GCSE science quiz",
  alternates: {
    canonical: `${siteUrl}/gcse-combined-science-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gcse-combined-science-practice-test`,
    images: [{ url: shareImageUrl("gcsescience"), width: 1200, height: 630, alt: "Tigertest free GCSE Combined Science practice test" }],
    siteName: "Tigertest",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcsescience")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is in the GCSE Combined Science exam?",
    a: "GCSE Combined Science is a double award worth two GCSEs, graded from 9-9 down to 1-1. Students sit six written papers, two each for biology, chemistry and physics, and on the most widely taken specification each paper lasts 1 hour 15 minutes. Questions range from multiple choice to calculations and longer written answers. The Tigertest practice test covers the same three sciences in three 25-minute sections.",
  },
  {
    q: "Is this for Foundation or Higher tier?",
    a: "It is written for Foundation tier, which leads to grades 1-1 to 5-5, and for Higher tier students who want to secure the core content. It covers the topics both tiers share and leaves out most Higher-only content, such as moles, Le Chatelier's principle and the motor effect equation.",
  },
  {
    q: "Do I need to learn the physics equations?",
    a: "For the 2025, 2026 and 2027 exams, the Department for Education decided that students do not need to memorise most physics equations, so every candidate is given an equation sheet. You still need to know how to choose the right equation, substitute values, rearrange it and convert units. Tigertest gives the equation in each question and the full sheet in the tools drawer, and the physics drills open with short lessons on using and rearranging equations.",
  },
  {
    q: "Are the required practicals included?",
    a: "Yes, as written questions, the way the exam tests them: identifying independent, dependent and control variables, putting a method in order, reading results and spotting why a step is done. Examples include osmosis in potato cylinders, the amylase and iodine test, rates with a disappearing cross, making a soluble salt, specific heat capacity and quadrat sampling.",
  },
  {
    q: "Which exam board does it follow?",
    a: "It follows the Department for Education subject content for GCSE combined science, which every exam board's combined science specification is built on, so it suits AQA Trilogy, Edexcel, OCR and Eduqas students alike. Questions are original and use board-neutral wording; check your own specification for the exact topic list and paper order.",
  },
  {
    q: "What score should I aim for?",
    a: "Grade boundaries change every year, so there is no fixed percentage for each grade. Aim for 60 percent or better on a practice test as a solid Foundation target, then use your results by topic to choose which drill to do next.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: both practice tests, all six drills, the lessons and every explanation, with no account needed. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free GCSE Combined Science Practice Test",
      description,
      url: `${siteUrl}/gcse-combined-science-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Two timed practice tests: biology, chemistry and physics, 60 questions each",
        "Six mastery drills split by paper 1 and paper 2 topics",
        "Short lessons on magnification, variables, relative formula mass, balancing and physics equations",
        "Physics equation sheet in the tools drawer",
        "Required practicals as written questions",
        "Practice Test 2 held out of the drills for a clean score",
        "Explanations for every question",
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
        classFaqJsonLd("gcsescience"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cells, Organisation and Disease", section: "Biology paper 1", weight: "10 per test" },
  { name: "Control, Genetics and Ecology", section: "Biology paper 2", weight: "10 per test" },
  { name: "Atoms, Bonding and Reactions", section: "Chemistry paper 1", weight: "10 per test" },
  { name: "Rates, Organic and the Earth", section: "Chemistry paper 2", weight: "10 per test" },
  { name: "Energy, Electricity and Particles", section: "Physics paper 1", weight: "10 per test" },
  { name: "Forces, Waves and Magnetism", section: "Physics paper 2", weight: "10 per test" },
];

export default function GcseScienceLandingPage() {
  return (
    <div data-theme="gcsescience" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GCSE Combined Science Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/gcse-science/dashboard"
            shortName="GCSE Science"
            subtitle="Biology, chemistry and physics in two timed practice tests, plus six drills that teach the maths skills first. Free, no account needed."
            shots={{ mobile: "/landing/gcsescience-mobile.png", desktop: "/landing/gcsescience-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcsescience" />

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
                Six drills, one for each science&apos;s paper 1 and paper 2 topics. Four open with short lessons on the maths skills behind the questions: magnification, variables, relative formula mass, balancing equations, and using and rearranging physics equations. One tap to check, an explanation straight away, and every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Biology, chemistry and physics in three 25-minute sections with a short break between them, a calculator, the physics equation sheet and flag for review. Finish with a percent score for each science and each topic group, so you know what to revise next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the GCSE Subject Content</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the Department for Education subject content for GCSE combined science, split the way the papers are: paper 1 and paper 2 topics for each science. Your results show which group of topics is holding you back.
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
              <Image src={getTigerAsset("gcsescience", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach GCSE Science?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Science teachers and tutors can set it for a class for free: share one link, students join with just their name, and you see who has practised, their test scores and the topics your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Revise for GCSE Combined Science</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get the maths marks first</h3>
              <p>
                A good share of the marks need maths: magnification, relative formula mass, reading graphs and using physics equations. These are the most reliable marks to gain, because the method is the same every time. Start with the lessons inside the drills, then practise until the steps are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your required practicals</h3>
              <p>
                Every paper asks about practical work. For each required practical, be able to name the independent, dependent and control variables, describe the method in order and say what the results show.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Little and often, one topic group at a time</h3>
              <p>
                Ten minutes a day on one drill beats a long session the night before. Each drill brings back the questions you missed until you get them right, which is how facts like gas tests, hormone names and the electromagnetic spectrum stick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Sit a practice test before your mocks</h3>
              <p>
                Take Practice Test 1 to see where you stand, drill the weakest topic group, then take Practice Test 2. Its questions never appear in the drills, so it is an honest check of what you know.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">GCSE Combined Science FAQ</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcsescience" />
        </div>
      </div>

      <ExamRelatedTests examId="gcsescience" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Revise?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests, six drills and the maths skills, all three sciences.</p>
          <ExamLandingCTA dashboardHref="/gcse-science/dashboard" />
        </div>
      </div>
    </div>
  );
}
