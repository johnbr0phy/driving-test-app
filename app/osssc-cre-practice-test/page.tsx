import "@/lib/v2/banks/osssc";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free OSSSC CRE Practice Test";
const metaDescription =
  "200 original questions for selected Odisha OSSSC CRE-2025 written subjects. English-language practice; Odia, current affairs and computer practical excluded. Free to start.";
const description =
  "Free to start OSSSC CRE-2025 practice with 200 original English-language questions for five written subjects of advertisement IIE-120/2025-3219: mathematics, stable general studies, English, computer knowledge and logical reasoning. Odia, current affairs and the Stage II computer practical are excluded, and practice scores do not apply official negative marking.";

const faqs = [
  { q: "Which Odisha recruitment exam does this cover?", a: "This is selected written-subject practice for OSSSC CRE-2025 advertisement IIE-120/2025-3219, covering RI, ICDS Supervisor, VAW, Junior Assistant, ARI, Amin and SFS posts. OSSSC means Odisha Sub-ordinate Staff Selection Commission. This is not OSSC, Odisha Police, or OSSSC CRE-2025(II) forest and excise recruitment. Check the official notice for your particular post and cycle." },
  { q: "What is the official written format?", a: "The verified CRE-2025 notice specifies 100 MCQs in 90 minutes at minimum HSC standard: mathematics 20, general studies 20, English 20, Odia 15, computer knowledge 15 and logical reasoning 10. Correct answers earn one mark, wrong answers lose 0.25 and blanks earn zero. Stage II is a qualifying basic-computer practical of 50 marks in 60 minutes, with 40% qualifying." },
  { q: "Is this a full mock exam?", a: "No. Each practice test contains 85 questions, retaining the five non-Odia subject counts. All practice is in English. Odia, current affairs and the practical computer assessment are excluded. General studies covers selected stable topics rather than the full breadth of the subject. The 90-minute subset timer is a practice choice. All 200 questions are original, not reproduced papers." },
  { q: "Does the displayed score include negative marking?", a: "No. Tigertest shows percentage correct without the official 0.25 wrong-answer deduction, normalization or selection rules. Study goals from 50% to 90% are personal targets, not official qualifying or selection cutoffs. Prepare the excluded subjects separately and check current official instructions." },
  { q: "Is OSSSC practice free?", a: "It is free to start. The last quarter of the five drills and two tests requires a one-time Premium purchase; earlier steps are free. The second test is held out of drills for a fresh check. Tigertest is not affiliated with OSSSC or the Government of Odisha." },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "OSSSC CRE practice test, Odisha combined recruitment examination, OSSSC RI ARI Amin Junior Assistant, CRE 2025 English practice",
  alternates: {
    canonical: `${siteUrl}/osssc-cre-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/osssc-cre-practice-test`,
    images: [{ url: shareImageUrl("osssc"), width: 1200, height: 630, alt: title }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("osssc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - OSSSC CRE Written Subjects Practice",
      description,
      url: `${siteUrl}/osssc-cre-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("osssc", "INR"),
      featureList: [
        "200 original English-language questions",
        "Five subject drills",
        "Two 85-question subset tests",
        "Odia, current affairs and practical excluded",
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
        classFaqJsonLd("osssc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", weight: "20 per test" },
  { name: "Stable General Studies", weight: "20 per test" },
  { name: "English", weight: "20 per test" },
  { name: "Computer Knowledge", weight: "15 per test" },
  { name: "Logical Reasoning", weight: "10 per test" },
];

export default function OssscLandingPage() {
  return (
    <div data-theme="osssc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free OSSSC CRE Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/osssc/dashboard"
            shortName="OSSSC CRE"
            subtitle="200 CRE-2025 questions, scored without negative marking. Free to start, no account needed."
            shots={{ mobile: "/landing/osssc-mobile.png", desktop: "/landing/osssc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="osssc" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Five Subject Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start with a topic drill. Missed questions return for more practice, and each answer includes an explanation. Use separate resources for Odia, current affairs and practical computer tasks.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Subject Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 85-question tests retain the five covered subject counts. Each uses a chosen 90-minute timer; the second stays out of drills. The percentage score measures this limited practice, not the complete official paper or selection prospects.
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
                Built on the CRE-2025 Written Paper
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each test keeps the five non-Odia subject counts of the official 100-question paper: percentages, ratios, work, geometry, algebra and data; selected Odisha history and geography, civics and basic science; grammar, vocabulary, notices and short reading passages; hardware, software, documents, spreadsheets and digital security; and directions, order, conclusions, sequences and data sufficiency. Current affairs are excluded.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("osssc", 1)}
                alt="Tigertest government exam study tiger"
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
            How to Prepare for the OSSSC CRE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Write out your calculations</h3>
              <p>Write out calculations and check units before selecting an answer.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Separate the given from the conclusion</h3>
              <p>For reasoning, separate what is given from what must follow.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise on a real computer</h3>
              <p>Practise spreadsheet and document tasks on a computer as well as learning concepts.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Cover what this practice leaves out</h3>
              <p>Prepare Odia and current affairs separately. Remember that the official exam penalises wrong answers even though this practice score does not.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          OSSSC CRE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="osssc" />
        </div>
      </div>

      <SampleQuestionsV2 examId="osssc" />

      <ExamRelatedTests examId="osssc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start with Mathematics</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Build your skills one subject at a time. Start for free. No account required.</p>
          <ExamLandingCTA dashboardHref="/osssc/dashboard" />
        </div>
      </div>
    </div>
  );
}
