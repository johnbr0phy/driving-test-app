import "@/lib/banks/hamextra";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Ham Radio Extra Practice Test 2026";
const metaDescription =
  "Free Amateur Extra practice exams from the official NCVEC 2024-2028 Element 4 pool, with a plain-English explanation for every question. 50 questions, 37 to pass.";
const description =
  "Free Amateur Extra class practice exams built from the official NCVEC 2024-2028 Element 4 question pool, with a plain-English explanation for every question. 50-question exams drawn like the real test, one question from each pool group, 37 to pass.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ham radio extra practice test, amateur extra class exam practice, element 4 practice exam, NCVEC extra question pool 2024-2028, extra class license test questions, FCC amateur extra exam",
  alternates: {
    canonical: `${siteUrl}/ham-radio-extra-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ham-radio-extra-practice-test`,
    images: [{ url: shareImageUrl("hamextra"), width: 1200, height: 630, alt: "Tigertest free Ham Radio Extra practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hamextra")],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the Amateur Extra exam?",
    a: "The Amateur Extra class exam (FCC Element 4) has 50 multiple-choice questions, and you must answer 37 correctly, 74 percent. The pool has 50 groups and each exam takes one question from each group, so every question on the real exam is in the public pool word for word.",
  },
  {
    q: "Which question pool is current?",
    a: "The NCVEC 2024-2028 Extra class pool, valid July 1, 2024 through June 30, 2028. After four rounds of errata (the last on February 4, 2026) it has 599 questions in use. This practice test uses all of them except the 27 that need a pool figure.",
  },
  {
    q: "Do I need a General license first?",
    a: "Yes. You earn the Extra class by passing Element 4 while you hold a General license or have a recent General exam credit. The Extra class gives you every privilege on every amateur band.",
  },
  {
    q: "Is the Tigertest Extra practice exam free?",
    a: "You can start for free with no account. The first training sets and practice exams are free; the last few steps are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ham Radio Extra Practice Exams",
      description,
      url: `${siteUrl}/ham-radio-extra-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hamextra"),
      featureList: [
        "The official NCVEC 2024-2028 Extra class question pool",
        "A plain-English explanation for every question",
        "50-question practice exams drawn one question per pool group",
        "Training sets for all ten subelements",
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
        classFaqJsonLd("hamextra"),
      ],
    },
  ],
};

const subelements = [
  { name: "E1 Commission Rules", weight: "6 questions" },
  { name: "E2 Operating Procedures", weight: "5 questions" },
  { name: "E3 Radio Wave Propagation", weight: "3 questions" },
  { name: "E4 Amateur Practices", weight: "5 questions" },
  { name: "E5 Electrical Principles", weight: "4 questions" },
  { name: "E6 Circuit Components", weight: "6 questions" },
  { name: "E7 Practical Circuits", weight: "8 questions" },
  { name: "E8 Signals & Emissions", weight: "4 questions" },
  { name: "E9 Antennas & Transmission Lines", weight: "8 questions" },
  { name: "E0 Safety", weight: "1 question" },
];

export default function HamExtraLandingPage() {
  return (
    <div data-theme="hamextra" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ham Radio Extra Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ham-radio-extra/dashboard"
            shortName="Extra"
            subtitle="The official 2024-2028 Element 4 pool with an explanation for every answer. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/hamextra-mobile.png", desktop: "/landing/hamextra-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hamextra" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Training by Subelement</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven sets that walk the pool, E1 to E0. Every question is the real one, and every
                answer comes with a plain-English explanation. Questions you miss come back until you
                have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five 50-question exams, each with one question from every pool group like the real
                Element 4 exam, and the real pass line of 37 correct.
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
                The Official NCVEC 2024-2028 Pool
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The exam draws one question from each of the pool&apos;s 50 groups. Here is how the 50
                questions split across the ten subelements, and how each practice exam draws them.
              </p>
              <div className="space-y-3">
                {subelements.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("hamextra", 3)}
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
            How to Pass the Extra Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the format</h3>
              <p>
                50 multiple-choice questions, 37 to pass. Volunteer examiners give the exam at local
                sessions and online, and you need a General license or exam credit to upgrade.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the pool, because the pool is the exam</h3>
              <p>
                Every question on the real exam is taken word for word from the public pool, with the
                same four answers. The Extra pool is the biggest of the three, so work through it set
                by set and read the explanations so the answers stick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put your time where the questions are</h3>
              <p>
                E7 (practical circuits) and E9 (antennas and transmission lines) are 8 questions each,
                almost a third of the exam. E1 (rules) and E6 (components) add 6 each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                Tigertest tracks your accuracy by subelement. After each practice exam, go back to the
                set you missed most and retake until you clear 37 with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Extra Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hamextra" />
        </div>
      </div>

      <ExamSampleQuestions examId="hamextra" />

      <ExamRelatedTests examId="hamextra" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Upgrade to Extra?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required.</p>
          <ExamLandingCTA dashboardHref="/ham-radio-extra/dashboard" />
        </div>
      </div>
    </div>
  );
}
