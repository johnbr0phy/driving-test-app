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

const title = "Free UPTET Paper 1 Mock Test 2026 - Practice Questions";
const metaDescription =
  "Free UPTET Paper 1 mock tests: 200 original questions on Child Development and Pedagogy, Hindi, English, Maths and EVS, with content and pedagogy items and explanations.";
const description =
  "Free UPTET Paper 1 (Classes 1 to 5) practice with 200 original questions written to the UPTET syllabus: Child Development and Pedagogy, Language I (Hindi) with an unseen passage, Language II (English), Mathematics and Environmental Studies, each with content and pedagogy questions. Two timed mock tests and nine drills, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the exam pattern of UPTET Paper 1?",
    a: "UPTET Paper 1 is for teachers of Classes 1 to 5 in Uttar Pradesh. It has 150 multiple-choice questions of one mark each in 2 hours 30 minutes, in five sections of 30: Child Development and Pedagogy, Language I (Hindi), Language II (English, Urdu or Sanskrit), Mathematics and Environmental Studies. The 2026 test was held on OMR sheets on 2 to 4 July 2026 by the Uttar Pradesh Education Service Selection Commission (UPESSC).",
  },
  {
    q: "What are the qualifying marks for UPTET?",
    a: "The UPTET 2026 information booklet sets the qualifying mark at 90 of 150 (60 percent) for general candidates and 82 of 150 (55 percent) for SC, ST, OBC, EWS, dependants of freedom fighters, ex-servicemen and candidates with disabilities. Check the booklet for your cycle. Passing UPTET makes you eligible to apply for primary teacher posts; it is not a job offer by itself.",
  },
  {
    q: "Is there negative marking in UPTET?",
    a: "No. The 2026 information booklet says there is no negative marking, so answer every question. Tigertest scores the same way: every question is worth one mark and a wrong answer simply earns zero.",
  },
  {
    q: "What does this UPTET mock test cover?",
    a: "Each mock has 60 questions in 60 minutes, the real paper's pace of one minute per question: 12 each from Child Development and Pedagogy, Hindi, English, Mathematics and EVS, split between content and pedagogy. Hindi questions are written in Hindi with explanations in English. Language II is modelled as English; if you take Urdu or Sanskrit, prepare it from that language's syllabus. The questions are original and written to the UPTET syllabus, not copied from past papers.",
  },
  {
    q: "Is the Tigertest UPTET practice test free?",
    a: "Yes. Both mock tests and all nine drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "UPTET mock test, UPTET practice test, UPTET Paper 1 mock test, UP TET free mock test 2026, UPTET CDP questions, UPTET Hindi questions, UPTET EVS pedagogy, UPTET maths pedagogy, Uttar Pradesh teacher eligibility test",
  alternates: {
    canonical: `${siteUrl}/uptet-paper-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/uptet-paper-1-practice-test`,
    images: [{ url: shareImageUrl("uptet"), width: 1200, height: 630, alt: "Tigertest free UPTET Paper 1 mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uptet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UPTET Paper 1 Mock Test",
      description,
      url: `${siteUrl}/uptet-paper-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "200 original UPTET Paper 1 practice questions with explanations",
        "2 timed mock tests of 60 questions in 60 minutes",
        "9 drills: child development, learning, Hindi, Hindi pedagogy, English, maths, maths pedagogy, EVS and EVS pedagogy",
        "Hindi questions written in Hindi, with unseen passages in Hindi and English",
        "No negative marking, like the real UPTET",
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
        classFaqJsonLd("uptet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Child Development and Pedagogy", weight: "30 questions" },
  { name: "Language I (Hindi)", weight: "30 questions" },
  { name: "Language II (English, Urdu or Sanskrit)", weight: "30 questions" },
  { name: "Mathematics", weight: "30 questions" },
  { name: "Environmental Studies", weight: "30 questions" },
];

export default function UptetLandingPage() {
  return (
    <div data-theme="uptet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UPTET Paper 1 Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/uptet/dashboard"
            shortName="UPTET"
            subtitle="200 original questions on CDP, Hindi, English, Maths and EVS, content and pedagogy. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/uptet-mobile.png", desktop: "/landing/uptet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uptet" />

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
                Child development, learning and pedagogy, Hindi, Hindi pedagogy, English, maths, maths pedagogy, EVS and EVS pedagogy. Questions you miss come back until you have mastered them, and every answer has an explanation.
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
                Two mocks of 60 questions in 60 minutes, one minute per question like the real paper: 12 each from CDP, Hindi, English, Maths and EVS. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.
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
                Built on the UPTET Paper 1 Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Paper 1 has five sections of 30 questions. Tigertest models all five at 12 questions each, with the same mix of content and pedagogy. Language II is modelled as English; Urdu and Sanskrit are not included.
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
                src={getTigerAsset("uptet", 1)}
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
            How to Qualify UPTET Paper 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat pedagogy as half the paper</h3>
              <p>
                Pedagogy runs through every section. The answer UPTET wants is usually the child-centred one: start from what children know, learn by doing, treat errors as clues, include every child and assess to improve teaching rather than to rank.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Score in Hindi grammar</h3>
              <p>
                Language I is Hindi for every candidate. Sandhi, samas, alankar, varn and uchcharan sthan, paryayvachi and vilom come up every year, alongside an unseen passage and Hindi teaching methods. Practise them until they are quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the theorists and the laws</h3>
              <p>
                Child Development and Pedagogy leans on Piaget, Vygotsky, Erikson, Kohlberg, Thorndike, Skinner and Bandura, inclusive education, the RTE Act 2009 and NEP 2020. Learn what each means for a primary classroom, not just the names.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                There is no negative marking, so never leave a bubble empty. Use the drills to find your weakest section and keep working on it until both mock tests are comfortably above 60 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          UPTET Paper 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="uptet" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-12">
          Tigertest is not affiliated with or endorsed by UPESSC or the Government of Uttar Pradesh.
        </p>
      </div>

      <ExamRelatedTests examId="uptet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for UPTET Paper 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across CDP, Hindi, English, Maths and EVS.</p>
          <ExamLandingCTA dashboardHref="/uptet/dashboard" />
        </div>
      </div>
    </div>
  );
}
