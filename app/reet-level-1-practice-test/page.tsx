import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free REET Level 1 Mock Test 2026 - Practice Questions";
const metaDescription =
  "Free REET Level 1 mock tests: 201 original questions on Child Development and Pedagogy, Hindi, English, Maths and EVS with Rajasthan, with content and pedagogy items and explanations.";
const description =
  "Free REET Level 1 (Classes 1 to 5) practice with 201 original questions written to the REET syllabus: Child Development and Pedagogy, Language I (Hindi) and Language II (English) with unseen passages, Mathematics and Environmental Studies with Rajasthan's culture, wildlife and water, each with content and pedagogy questions. Two timed mock tests and nine drills, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the exam pattern of REET Level 1?",
    a: "REET Level 1 is for teachers of Classes 1 to 5. Under the REET 2024 notification it has 150 multiple-choice questions of one mark each in 2 hours 30 minutes, in five parts of 30 questions: Child Development and Pedagogy, Language I, Language II, Mathematics and Environmental Studies. The languages are chosen from Hindi, English, Sanskrit, Urdu, Sindhi, Punjabi and Gujarati. Apart from the language parts, the paper is bilingual in Hindi and English. The exam is held on paper with an OMR answer sheet by the Board of Secondary Education, Rajasthan.",
  },
  {
    q: "Is there negative marking in REET?",
    a: "Only for blanks. Since REET 2024 each question in the paper has four options, A to D, and the OMR sheet has a fifth bubble, E, for a question you choose not to answer. Under the REET 2024 notification, a question with no bubble filled at all loses one-third of a mark, and a candidate who leaves more than 10 percent of the questions with no bubble is disqualified. The notification sets no deduction for a wrong answer; check the notice for your own session. Tigertest gives one mark for each right answer and deducts nothing.",
  },
  {
    q: "What are the qualifying marks for REET Level 1?",
    a: "Under the REET 2024 notification, a general category candidate qualifies with 60 percent, which is 90 of 150 marks. SC, OBC, MBC, EWS and ST candidates need 55 percent (ST candidates in TSP areas 36 percent), widows, divorced women and ex-servicemen 50 percent, persons with disabilities 40 percent and Sahariya candidates 36 percent. The REET certificate is valid for life. Teacher posts are then filled through the separate REET Mains exam.",
  },
  {
    q: "What does this REET mock test cover?",
    a: "Each mock has 75 questions in 75 minutes, the real paper's pace of one minute per question: 15 each from Child Development and Pedagogy, Hindi (in Devanagari), English, Mathematics and EVS, split between content and pedagogy. EVS includes Rajasthan's fairs, festivals, crafts, parks and water systems. The questions are original, not copied from past papers, and Tigertest is not affiliated with the Board of Secondary Education, Rajasthan.",
  },
  {
    q: "Is the Tigertest REET practice test free?",
    a: "Yes. Both mock tests and all nine drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "REET mock test, REET Level 1 mock test, REET practice test, REET free mock test 2026, REET Level 1 practice set, REET CDP questions, REET Hindi pedagogy, REET EVS Rajasthan questions, Rajasthan teacher eligibility test",
  alternates: {
    canonical: `${siteUrl}/reet-level-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/reet-level-1-practice-test`,
    images: [{ url: shareImageUrl("reet"), width: 1200, height: 630, alt: "Tigertest free REET Level 1 mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("reet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free REET Level 1 Mock Test",
      description,
      url: `${siteUrl}/reet-level-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "201 original REET Level 1 practice questions with explanations",
        "2 timed mock tests of 75 questions in 75 minutes",
        "9 drills: CDP, Hindi, Hindi pedagogy, English, English pedagogy, maths, maths pedagogy, EVS with Rajasthan and EVS pedagogy",
        "Unseen passages in Hindi (Devanagari) and English",
        "Negative marking explained, not applied",
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
        classFaqJsonLd("reet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Child Development and Pedagogy", weight: "30 questions" },
  { name: "Language I (Hindi here)", weight: "30 questions" },
  { name: "Language II (English here)", weight: "30 questions" },
  { name: "Mathematics", weight: "30 questions" },
  { name: "Environmental Studies (with Rajasthan)", weight: "30 questions" },
];

export default function ReetLandingPage() {
  return (
    <div data-theme="reet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free REET Level 1 Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/reet/dashboard"
            shortName="REET"
            subtitle="201 original questions on CDP, Hindi, English, Maths and EVS with Rajasthan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/reet-mobile.png", desktop: "/landing/reet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="reet" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Nine Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Child development and pedagogy, Hindi, Hindi pedagogy, English, English pedagogy, maths, maths pedagogy, EVS with Rajasthan and EVS pedagogy. Questions you miss come back until you have mastered them, and every answer has an explanation.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two mocks of 75 questions in 75 minutes, one minute per question like the real paper: 15 each from CDP, Hindi, English, Maths and EVS. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.
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
                Built on the REET Level 1 Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Level 1 has five parts of 30 questions. Tigertest models all five at half length, with Hindi as Language I and English as Language II, the most common pair. If you choose another language, use the CDP, Maths and EVS drills and prepare that language from its own syllabus.
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
                src={getTigerAsset("reet", 1)}
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
            How to Qualify REET Level 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Take pedagogy seriously</h3>
              <p>
                In every subject, part of the section is about teaching it. The answer REET wants is usually the child-centred one: start from what children already know, learn by doing and discussing, treat errors as clues to thinking and assess to improve teaching rather than to rank.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the psychologists and the RTE Act</h3>
              <p>
                Child Development and Pedagogy leans on Piaget, Erikson, Pavlov, Skinner, Kohler, Kohlberg and Gardner, on intelligence and personality, and on the RTE Act 2009. Learn what each idea means for a primary classroom, not just the names.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know Rajasthan for EVS</h3>
              <p>
                EVS asks about Rajasthan&apos;s fairs and festivals, folk dances, crafts, national parks, lakes and traditional water systems as well as plants, animals, food, water and shelter. In the language sections, read the unseen passage once for its main idea, then answer from the text.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fill a bubble for every question</h3>
              <p>
                A question with none of its five bubbles filled costs one-third of a mark, and leaving more than 10 percent blank disqualifies you, so fill a bubble for every question: A to D for your answer, or E if you choose not to answer. Wrong answers are not penalised, so a sensible guess costs nothing. You need 90 of 150 as a general candidate; keep working on your weakest drill until both mocks are comfortably above 60 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          REET Level 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="reet" />
        </div>
      </div>

      <ExamRelatedTests examId="reet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for REET Level 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 201 questions across CDP, Hindi, English, Maths and EVS.</p>
          <ExamLandingCTA dashboardHref="/reet/dashboard" />
        </div>
      </div>
    </div>
  );
}
