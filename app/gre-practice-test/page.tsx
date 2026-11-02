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

const title = "Free GRE Practice Test 2026 - Shorter GRE Format";
const metaDescription =
  "Free GRE practice tests in the shorter format: adaptive Verbal and Quant sections, 194 original questions with explanations and a 130 to 170 score estimate.";
const description =
  "Free GRE practice tests built like the shorter GRE General Test: Verbal Reasoning and Quantitative Reasoning, each in two timed sections where the second section adapts to how you did in the first. 194 original questions cover text completion, sentence equivalence, reading comprehension, quantitative comparison, numeric entry and multiple-answer items, with an explanation on every answer and an estimated 130 to 170 score for each measure.";

const faqs = [
  {
    q: "How is the shorter GRE structured?",
    a: "Since September 2023 the GRE General Test takes about 1 hour 58 minutes. It opens with one Analytical Writing task (Analyze an Issue, 30 minutes), then two Verbal Reasoning sections (12 questions in 18 minutes and 15 questions in 23 minutes) and two Quantitative Reasoning sections (12 questions in 21 minutes and 15 questions in 26 minutes). There is no unscored section and no scheduled break.",
  },
  {
    q: "How does GRE adaptive testing work?",
    a: "The GRE is section-level adaptive. The first Verbal section and the first Quant section are of average difficulty, and the difficulty of the second section of each measure depends on how you did on the first. Within a section you can skip questions, mark them and change answers before time runs out. Tigertest works the same way: score at least 60 percent on a first section and you get the harder second section.",
  },
  {
    q: "How is the GRE scored?",
    a: "Verbal Reasoning and Quantitative Reasoning are each scored from 130 to 170 in 1-point steps, and Analytical Writing from 0 to 6 in half-point steps. Many programs look at the Verbal and Quant scores together, from 260 to 340. Tigertest estimates each measure on the 130 to 170 scale from a typical conversion; it is not an ETS score table, and the essay is not included.",
  },
  {
    q: "What question types are on the GRE?",
    a: "Verbal has text completion (one to three blanks), sentence equivalence (choose the two words that give the sentence the same meaning) and reading comprehension (single answer, select all that apply, and select a sentence in the passage). Quant has quantitative comparison, multiple choice with one answer, multiple choice with one or more answers, and numeric entry. Every type appears in the Tigertest practice tests.",
  },
  {
    q: "Is the Tigertest GRE practice test free?",
    a: "Yes. Both full practice tests and all seven drills are free, with no account required. The questions are original practice questions written to the ETS description of the test, not ETS questions. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GRE practice test, free GRE practice test, shorter GRE, GRE practice questions, GRE verbal practice, GRE quant practice, GRE text completion, GRE sentence equivalence, quantitative comparison practice, GRE score estimate",
  alternates: {
    canonical: `${siteUrl}/gre-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gre-practice-test`,
    images: [{ url: shareImageUrl("gre"), width: 1200, height: 630, alt: "Tigertest free GRE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gre")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free GRE Practice Test",
      description,
      url: `${siteUrl}/gre-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "194 original GRE practice questions with explanations",
        "2 full practice tests in the shorter GRE format, timed like the real sections",
        "Section-level adaptive: the second Verbal and Quant sections adapt to the first",
        "Every question type: text completion, sentence equivalence, reading, quantitative comparison, numeric entry",
        "Estimated Verbal and Quant scores on the 130 to 170 scale",
        "7 drills by question type and math topic",
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
        classFaqJsonLd("gre"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Verbal Reasoning", weight: "27 questions, 41 min" },
  { name: "Quantitative Reasoning", weight: "27 questions, 47 min" },
  { name: "Analytical Writing (not modelled)", weight: "1 essay, 30 min" },
];

export default function GreLandingPage() {
  return (
    <div data-theme="gre" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GRE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gre/dashboard"
            shortName="GRE"
            subtitle="194 original questions in the shorter, adaptive GRE format. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/gre-mobile.png", desktop: "/landing/gre-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gre" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Question Type</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills: text completion, sentence equivalence and reading for Verbal, and arithmetic, algebra, geometry and data analysis for Quant. Questions you miss come back until you have mastered them.
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
                Two full tests in the shorter GRE format: Verbal in sections of 12 and 15 questions, Quant in sections of 12 and 15, on the real clock. Do well on a first section and the second gets harder, as on the real test. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built Like the Shorter GRE
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since September 2023 the GRE takes under two hours. Each practice test follows the same timing and question mix for Verbal and Quant, scores each measure on the 130 to 170 scale and shows how you did by question type. The essay is not part of the practice tests.
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
                src={getTigerAsset("gre", 1)}
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
            How to Raise Your GRE Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Fill blanks from the sentence, not the choices</h3>
              <p>
                In text completion and sentence equivalence, cover the choices, find the signal words (although, because, far from, rather than) and predict your own word first. In sentence equivalence, a pair of synonyms is not enough: both words must fit the sentence, and one tempting pair usually means the opposite.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read for the argument</h3>
              <p>
                Reading questions reward knowing why each sentence is there: the view being challenged, the evidence, the qualification. For argument questions, name the conclusion and the gap between it and the evidence before you look at the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Master quantitative comparison</h3>
              <p>
                A large share of Quant questions compare two quantities. Try more than one kind of number (negative, fraction, zero, a large value) before you decide, and choose &quot;cannot be determined&quot; only when two cases really disagree. Many need no calculation at all.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Protect the first section</h3>
              <p>
                Your first section decides how hard the second one is, and the easier second section limits your top score. Pace yourself to answer every first-section question, mark the hard ones and come back. Tigertest tracks your accuracy by question type, so drill your weakest one before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          GRE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gre" />
        </div>
      </div>

      <ExamRelatedTests examId="gre" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the GRE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 194 questions across Verbal and Quant.</p>
          <ExamLandingCTA dashboardHref="/gre/dashboard" />
        </div>
      </div>
    </div>
  );
}
