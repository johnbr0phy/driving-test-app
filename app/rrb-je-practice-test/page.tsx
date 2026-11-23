import "@/lib/v2/banks/inrrn";
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

const title = "Free RRB JE Mock Test 2026 - CBT 1 Practice";
const metaDescription =
  "Free RRB JE CBT 1 mock tests: 224 original questions on Mathematics, Reasoning, General Awareness and General Science, with two full 100-question tests in 90 minutes and an explanation on every answer.";
const description =
  "Free RRB JE (Junior Engineer) CBT 1 practice tests with 224 original questions on the CEN 04/2026 syllabus: Mathematics, General Intelligence and Reasoning, General Awareness and General Science (physics, chemistry and life sciences to class 10). Each full mock test has 100 questions in 90 minutes, the real CBT 1 length, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the RRB JE CBT 1 exam pattern?",
    a: "Under CEN 04/2026, the 1st stage CBT for Junior Engineer and Depot Material Superintendent posts has 100 multiple-choice questions in 90 minutes (120 minutes for candidates with a scribe): Mathematics 30, General Intelligence and Reasoning 25, General Awareness 15 and General Science 30, one mark each. The notice says the split is only indicative and papers may vary a little. General Science covers physics, chemistry and life sciences up to the 10th standard CBSE syllabus. Calculators are not allowed in CBT 1. Questions are shown in your chosen language and in English.",
  },
  {
    q: "Is there negative marking in RRB JE CBT 1?",
    a: "Yes. One third of a mark is deducted for each wrong answer, and an unanswered question costs nothing. A blind guess among four options breaks even on average (a 1 in 4 chance of +1 against a 3 in 4 chance of -1/3); once you can rule out even one option, a guess gains marks on average. Tigertest scores percent correct without the deduction, so keep count of the questions you guessed.",
  },
  {
    q: "What are the minimum marks for RRB JE CBT 1?",
    a: "The notice sets minimum percentages for eligibility of 40 for UR and EWS, 30 for OBC (non-creamy layer) and SC, and 25 for ST, with up to 2 marks of relaxation for PwBD candidates if there are too few of them. CBT 1 is a screening test: its normalised marks are used only to shortlist candidates for CBT 2, 15 times the vacancies in each community, so the marks needed in practice are usually well above the minimum.",
  },
  {
    q: "Are these RRB JE previous year questions?",
    a: "No. Every question is original, written to the CBT 1 syllabus in the RRB notice, and none is copied from previous papers. General Awareness here sticks to static topics such as history, polity, geography and the economy, so read current affairs from the news as well. The reasoning questions are text only, so practise figure-based items such as mirror images and paper folding from your own books too. CBT 2, with its technical questions for your engineering group, is not covered.",
  },
  {
    q: "Is the Tigertest RRB JE mock test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the Arithmetic, Numbers, Algebra and Geometry, Verbal Reasoning and Logical Reasoning drills are free. The General Awareness, Physics, Chemistry and Biology drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RRB JE mock test, RRB JE practice test, RRB JE CBT 1 mock test free, RRB JE 2026, railway junior engineer exam questions, RRB JE general science questions, RRB JE maths and reasoning practice, CEN 04/2026 JE mock test",
  alternates: {
    canonical: `${siteUrl}/rrb-je-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rrb-je-practice-test`,
    images: [{ url: shareImageUrl("inrrn"), width: 1200, height: 630, alt: "Tigertest free RRB JE mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("inrrn")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RRB JE Mock Test",
      description,
      url: `${siteUrl}/rrb-je-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("inrrn", "INR"),
      featureList: [
        "224 original RRB JE CBT 1 practice questions with explanations",
        "2 full 100-question mock tests in 90 minutes, the real CBT 1 length",
        "8 drills: arithmetic, numbers and geometry, verbal and logical reasoning, general awareness, physics, chemistry and biology",
        "Follows the CEN 04/2026 CBT 1 syllabus and section split",
        "Negative marking explained, with percent-correct scoring",
        "Auto-save progress",
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
        classFaqJsonLd("inrrn"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", weight: "30 questions" },
  { name: "General Intelligence and Reasoning", weight: "25 questions" },
  { name: "General Awareness", weight: "15 questions" },
  { name: "General Science (class 10)", weight: "30 questions" },
];

export default function RrbJeLandingPage() {
  return (
    <div data-theme="inrrn" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RRB JE Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rrb-je/dashboard"
            shortName="RRB JE"
            subtitle="224 RRB JE CBT 1 questions on Maths, Reasoning, General Awareness and Science. Free to start, no account needed."
            shots={{ mobile: "/landing/inrrn-mobile.png", desktop: "/landing/inrrn-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="inrrn" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole CBT 1 syllabus: arithmetic, numbers and geometry, verbal reasoning, logical reasoning, general awareness, physics, chemistry and biology. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 100-question mock tests in 90 minutes, the real JE CBT 1 length and timing, grouped by subject in the notice&apos;s order. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the JE CBT 1 Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Railway Recruitment Boards hold CBT 1 as the common screening stage for Junior Engineer and Depot Material Superintendent posts. Every mock test here follows the section split in CEN 04/2026, which the notice calls indicative. In the real exam each wrong answer costs 1/3 mark, so practise leaving a question blank when you cannot rule anything out.
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
                src={getTigerAsset("inrrn", 3)}
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
            How to Prepare for RRB JE CBT 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Do not skip General Science</h3>
              <p>
                Science is 30 of the 100 questions, as many as maths. It is class 10 CBSE level, not engineering: learn the NCERT chapters on motion, electricity, light, sound, chemical reactions, acids and bases, metals, carbon compounds and life processes until the facts and formulas are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work maths without a calculator</h3>
              <p>
                Calculators are not allowed in CBT 1. Practise percentages, interest, time and work, trains, mensuration and trigonometry values by hand, and know conversions such as km/h to m/s (multiply by 5/18). With 100 questions in 90 minutes you have 54 seconds each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make reasoning your fastest section</h3>
              <p>
                Series, coding and decoding, relationships, directions, syllogisms, data sufficiency and clock and calendar questions follow a few fixed patterns. Drill them until you can spot the rule in seconds, and save the time for the longer calculations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read the news for General Awareness</h3>
              <p>
                The syllabus includes current affairs, which no practice bank can keep up with. Use the General Awareness drill for history, polity, geography and the economy, and read a daily newspaper for the rest. With 1/3 mark off for each wrong answer, skip a current affairs question you cannot narrow down.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RRB JE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="inrrn" />
        </div>
      </div>

      <SampleQuestionsV2 examId="inrrn" />

      <ExamRelatedTests examId="inrrn" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for RRB JE CBT 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 224 questions across all four subjects.</p>
          <ExamLandingCTA dashboardHref="/rrb-je/dashboard" />
        </div>
      </div>
    </div>
  );
}
