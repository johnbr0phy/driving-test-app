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

const title = "Free CTET Paper 1 Mock Test 2026 - Practice Questions";
const metaDescription =
  "Free CTET Paper 1 mock tests: 160 original questions on Child Development and Pedagogy, English (Language I), Maths and EVS, with content and pedagogy items and explanations.";
const description =
  "Free CTET Paper I (Classes 1 to 5) practice with 160 original questions written to the CBSE CTET syllabus: Child Development and Pedagogy, Language I (English) with an unseen passage and poem, Mathematics and Environmental Studies, each with content and pedagogy questions. Two timed mock tests and eight drills, with an explanation on every answer. Language II is not included.";

const faqs = [
  {
    q: "What is the exam pattern of CTET Paper 1?",
    a: "CTET Paper I is for teachers of Classes 1 to 5. It has 150 multiple-choice questions of one mark each in 2 hours 30 minutes, in five sections of 30 questions: Child Development and Pedagogy, Language I, Language II, Mathematics and Environmental Studies. In the language, maths and EVS sections, half the questions test content and half test pedagogy. Recent sessions, including February 2026, were held on paper with OMR answer sheets.",
  },
  {
    q: "What are the qualifying marks for CTET?",
    a: "You qualify with 60 percent, which is 90 of 150 marks, as a general category candidate. Under NCTE guidelines, recruiting schools and governments may give SC, ST, OBC and disabled candidates a concession, usually to 55 percent, which is about 82 or 83 marks. There is no negative marking, so answer every question. The CTET certificate is now valid for life.",
  },
  {
    q: "Is there negative marking in CTET?",
    a: "No. A wrong answer costs nothing, so never leave a question blank. Tigertest scores the same way: every question is worth one mark and a wrong answer simply earns zero.",
  },
  {
    q: "What does this CTET mock test cover, and what is left out?",
    a: "Each mock has 60 questions in 60 minutes, the real paper's pace of one minute per question: 15 each from Child Development and Pedagogy, Language I (English), Mathematics and EVS, split between content and pedagogy like the real paper. Language II is not included, because candidates choose it from twenty languages; prepare it from your chosen language's syllabus. The questions are original and written to the CBSE syllabus, not copied from past papers.",
  },
  {
    q: "Is the Tigertest CTET practice test free?",
    a: "Yes. Both mock tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CTET mock test, CTET practice test, CTET Paper 1 mock test, CTET free mock test 2026, CTET CDP questions, CTET EVS pedagogy questions, CTET maths pedagogy, CTET English pedagogy, CTET previous year pattern",
  alternates: {
    canonical: `${siteUrl}/ctet-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ctet-practice-test`,
    images: [{ url: shareImageUrl("ctet"), width: 1200, height: 630, alt: "Tigertest free CTET Paper 1 mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ctet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CTET Paper 1 Mock Test",
      description,
      url: `${siteUrl}/ctet-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "160 original CTET Paper I practice questions with explanations",
        "2 timed mock tests of 60 questions in 60 minutes",
        "8 drills: child development, learning, English comprehension, language pedagogy, maths, maths pedagogy, EVS and EVS pedagogy",
        "Unseen prose passages and poems for Language I (English)",
        "No negative marking, like the real CTET",
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
        classFaqJsonLd("ctet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Child Development and Pedagogy", weight: "30 questions" },
  { name: "Language I", weight: "30 questions" },
  { name: "Language II (not modelled here)", weight: "30 questions" },
  { name: "Mathematics", weight: "30 questions" },
  { name: "Environmental Studies", weight: "30 questions" },
];

export default function CtetLandingPage() {
  return (
    <div data-theme="ctet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CTET Paper 1 Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ctet/dashboard"
            shortName="CTET"
            subtitle="160 original questions on CDP, English, Maths and EVS, content and pedagogy. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ctet-mobile.png", desktop: "/landing/ctet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ctet" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Child development, learning and pedagogy, English comprehension, language pedagogy, maths, maths pedagogy, EVS and EVS pedagogy. Questions you miss come back until you have mastered them, and every answer has an explanation.
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
                Two mocks of 60 questions in 60 minutes, one minute per question like the real paper: 15 each from CDP, English, Maths and EVS. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.
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
                Built on the CTET Paper I Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Paper I has five sections of 30 questions. Tigertest models four of them with the same split between content and pedagogy. Language II is not included, because you choose it from twenty languages, so prepare it separately in the language you pick.
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
                src={getTigerAsset("ctet", 1)}
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
            How to Qualify CTET Paper 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Take pedagogy seriously</h3>
              <p>
                Half of every subject section is pedagogy. The answer CTET wants is usually the child-centred one: start from what children already know, learn by doing and discussing, treat errors as clues to thinking, value home languages and assess to improve teaching rather than to rank.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the theorists and the policies</h3>
              <p>
                Child Development and Pedagogy leans on Piaget, Vygotsky, Kohlberg, Gardner and Bruner, inclusive education and the RPwD Act 2016, and the ideas of NCF 2005 and NEP 2020. Learn what each one says about the classroom, not just the names.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the passage before the questions</h3>
              <p>
                Language I opens with an unseen prose passage and an unseen poem. Read once for the main idea, then answer from the text, not from what you already believe. Expect vocabulary, grammar and figures of speech asked from the passage itself.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                There is no negative marking, so never leave a bubble empty. You need 90 of 150 as a general candidate. Use the drills to find your weakest section and keep working on it until both mock tests are comfortably above 60 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CTET Paper 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ctet" />
        </div>
      </div>

      <ExamRelatedTests examId="ctet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for CTET Paper 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 160 questions across CDP, English, Maths and EVS.</p>
          <ExamLandingCTA dashboardHref="/ctet/dashboard" />
        </div>
      </div>
    </div>
  );
}
