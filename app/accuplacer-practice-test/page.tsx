import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free ACCUPLACER Practice Test 2026 - Reading, Writing & Math Placement";
const description =
  "Free Next-Generation ACCUPLACER practice tests with 200 questions across reading passages, writing and sentence revision, arithmetic, quantitative reasoning, algebra and statistics, and advanced algebra and functions. The key step is shown on every math answer.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "ACCUPLACER practice test, ACCUPLACER math practice, ACCUPLACER reading practice test, ACCUPLACER writing practice, Next-Generation ACCUPLACER, college placement test practice 2026, free ACCUPLACER practice test",
  alternates: {
    canonical: `${siteUrl}/accuplacer-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/accuplacer-practice-test`,
    images: [{ url: "/og/accuplacer", width: 1200, height: 630, alt: "TigerTest free ACCUPLACER practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/accuplacer"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free ACCUPLACER Placement Tests on a Computer",
      description,
      url: `${siteUrl}/accuplacer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 ACCUPLACER practice questions",
        "Two untimed practice tests across all five placement sections",
        "Section scores on the 200 to 300 ACCUPLACER scale",
        "Mastery drills for reading, writing, arithmetic, quantitative reasoning and advanced algebra",
        "Instant feedback with explanations",
        "Progress syncs between phone and computer",
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
      mainEntity: [
        {
          "@type": "Question",
          name: "What is on the ACCUPLACER?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Next-Generation ACCUPLACER has five multiple-choice sections: Reading, Writing, Arithmetic, Quantitative Reasoning, Algebra and Statistics (QAS), and Advanced Algebra and Functions (AAF). Many colleges also give the WritePlacer essay, which is not included here. Your college decides which sections you take; most students take Reading, Writing and one or two of the math sections.",
          },
        },
        {
          "@type": "Question",
          name: "Can you fail the ACCUPLACER?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It is a placement test, not a pass or fail exam. Each section is scored from 200 to 300, and each college sets its own cut scores that decide whether you start in a credit-bearing course or a developmental one. A higher score can save you a semester and the tuition for courses that do not count toward your degree.",
          },
        },
        {
          "@type": "Question",
          name: "How long is the test and can I use a calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice sections are untimed and computer-adaptive, so the questions get harder or easier based on your answers, and most sections have 20 questions. You cannot bring your own calculator. An on-screen calculator appears for some math questions only, so you should be comfortable with arithmetic, fractions and percents by hand.",
          },
        },
        {
          "@type": "Question",
          name: "Which math section will I take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your college assigns it, often based on your intended major or a short placement questionnaire. Arithmetic covers whole numbers, fractions, decimals, percents and ratios. QAS adds linear equations, inequalities, exponents, probability and statistics, and geometry. AAF covers quadratics, polynomials, functions, radicals, exponentials and basic trigonometry for students heading into calculus. Many students take QAS, and some are routed to AAF based on their QAS score.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest ACCUPLACER practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Both practice tests and all five drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer. TigerTest is not affiliated with the College Board.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reading", weight: "26%" },
  { name: "Writing", weight: "24%" },
  { name: "Arithmetic", weight: "20%" },
  { name: "Quantitative Reasoning, Algebra & Statistics", weight: "20%" },
  { name: "Advanced Algebra & Functions", weight: "10%" },
];

export default function AccuplacerLandingPage() {
  return (
    <div data-theme="accuplacer" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="accuplacer" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free ACCUPLACER Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/accuplacer"
            shortName="ACCUPLACER"
            subtitle="200 questions across reading, writing, arithmetic, quantitative reasoning and algebra, and advanced algebra and functions. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/accuplacer-mobile.png", desktop: "/landing/accuplacer-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Section Drills on Your Phone</h3>
              <p className="text-gray-600">
                Five drills, one per section: reading passages beside the question, writing items with the sentence or paragraph to revise shown above the choices, and arithmetic, quantitative reasoning and advanced algebra with every step shown. Every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Two practice tests with 20 questions per section (10 for Advanced Algebra and Functions), untimed like the real ACCUPLACER, scored on the 200 to 300 scale. Finish with a score per section against the cut scores your college publishes, and a plan for what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the Next-Generation ACCUPLACER Sections
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The College Board&apos;s ACCUPLACER places you into college courses rather than passing or failing you. The practice tests here give reading and writing the most weight because nearly every student takes them, and they split the math across all three levels so you can see which one you are ready for.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("accuplacer", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The ACCUPLACER practice test is brand new. If a question looks wrong or your college tests a section differently, tell us.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Place Higher on the ACCUPLACER
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Find out which sections your college uses</h3>
              <p>
                Ask the testing center or advising office before you study. Most students take Reading and Writing plus one math section, and the math section you are assigned decides whether you should be reviewing fractions and percents or quadratics and functions. Ask for the cut scores too, so you know what you are aiming for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do the arithmetic by hand</h3>
              <p>
                The on-screen calculator shows up for only some math questions, so fractions, decimals, percents and order of operations need to be automatic. Work every practice problem on paper, then check the key step in the explanation. Most placement points are lost on arithmetic slips, not on hard algebra.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Read the question before the passage</h3>
              <p>
                Reading items ask one thing: the main idea, a detail, an inference, a word&apos;s meaning in context, or how two paired passages relate. Know what you are hunting for, then read. For writing items, read the whole passage first so the transition or verb tense you choose fits the sentences around it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Treat every question as if it counts</h3>
              <p>
                The real test is adaptive and untimed, and you cannot go back to a question once you answer it. Early answers shape which questions come next, so slow down rather than guessing. TigerTest tracks your accuracy by section; aim to clear 70 percent on each set before test day, and retake the set you miss most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          ACCUPLACER Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the ACCUPLACER?</h3>
            <p className="text-gray-600">
              The Next-Generation ACCUPLACER has five multiple-choice sections: Reading, Writing, Arithmetic, Quantitative Reasoning, Algebra and Statistics (QAS), and Advanced Algebra and Functions (AAF). Many colleges also give the WritePlacer essay, which is not included here. Your college decides which sections you take; most students take Reading, Writing and one or two of the math sections.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Can you fail the ACCUPLACER?</h3>
            <p className="text-gray-600">
              No. It is a placement test, not a pass or fail exam. Each section is scored from 200 to 300, and each college sets its own cut scores that decide whether you start in a credit-bearing course or a developmental one. A higher score can save you a semester and the tuition for courses that do not count toward your degree.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How long is the test and can I use a calculator?</h3>
            <p className="text-gray-600">
              The multiple-choice sections are untimed and computer-adaptive, so the questions get harder or easier based on your answers, and most sections have 20 questions. You cannot bring your own calculator. An on-screen calculator appears for some math questions only, so you should be comfortable with arithmetic, fractions and percents by hand.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which math section will I take?</h3>
            <p className="text-gray-600">
              Your college assigns it, often based on your intended major or a short placement questionnaire. Arithmetic covers whole numbers, fractions, decimals, percents and ratios. QAS adds linear equations, inequalities, exponents, probability and statistics, and geometry. AAF covers quadratics, polynomials, functions, radicals, exponentials and basic trigonometry for students heading into calculus. Many students take QAS, and some are routed to AAF based on their QAS score.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest ACCUPLACER practice test free?</h3>
            <p className="text-gray-600">
              Yes. Both practice tests and all five drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer. TigerTest is not affiliated with the College Board.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="accuplacer" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Place Into College-Level Courses?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five ACCUPLACER sections.</p>
          <ExamLandingCTA dashboardHref="/accuplacer" />
        </div>
      </div>
    </div>
  );
}
