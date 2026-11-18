import "@/lib/v2/banks/jamblit";
import type { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { getTigerAsset } from "@/lib/tigerAssets";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { examOffers } from "@/lib/examSeo";
import { SITE_URL } from "@/lib/siteUrl";

const title = "Free JAMB Literature in English Practice Test";
const metaDescription = "120 original JAMB Literature skills questions: drama, prose, poetry and unseen extracts. Four free drills and two timed practice tests. Prescribed books must be studied separately.";
const description = "Free JAMB Literature in English practice with 120 original literary-skills questions from the current JAMB IBASS syllabus: drama, prose, poetry and appreciation of original unseen extracts, in four drills and two 40-question practice tests. Prescribed-book knowledge is not covered; study the prescribed texts separately.";
const url = `${SITE_URL}/jamb-literature-practice-test`;
const faqs = [
  { q: "What does this JAMB Literature practice cover?", a: "It covers literary skills from the current JAMB IBASS syllabus: dramatic techniques, narrative viewpoints, character and plot, poetic forms and devices, and interpretation of original unseen extracts. There are 120 original questions, four topic drills and two 40-question tests. It does not cover knowledge of the prescribed books and poems, so use it alongside your reading and lessons." },
  { q: "Does it replace reading the prescribed texts?", a: "No. JAMB's Literature syllabus includes named plays, novels and poems, as well as general literary skills. This practice does not test those books. Read the current list on IBASS and study each prescribed text with your teacher. A strong score here is a check of these skills, not a prediction of your full UTME Literature score." },
  { q: "How long are the practice tests?", a: "Each practice test has 40 questions and a 30-minute timer. The timer and equal split of ten questions from each of the four areas are Tigertest practice choices, not a claim about JAMB's official topic weights or a separate Literature time limit. You can move between questions and flag them." },
  { q: "What score should I aim for?", a: "Choose a practice goal from 50% to 90%. These are study targets, not official admission pass marks. Each correct answer earns one point, with no penalty for a wrong answer in this practice. Admission requirements depend on the institution, course and current JAMB rules." },
  { q: "Are the questions original and free?", a: "Yes. All 120 questions and all extracts are original, not JAMB past questions or copied textbook exercises. Both tests and all four drills are free, with no account required. Practice Test 2 is held out of the drills for a fresh skills check. Tigertest is not affiliated with or endorsed by JAMB." },
];
export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords: "JAMB Literature in English practice test, UTME Literature, JAMB literature skills, unseen poetry drama prose, JAMB Literature skills",
  alternates: { canonical: url },
  openGraph: { title, description: metaDescription, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("jamblit"), width: 1200, height: 630, alt: "Tigertest free JAMB Literature in English practice test" }] },
  twitter: { card: "summary_large_image", title, description: metaDescription, images: [shareImageUrl("jamblit")] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - JAMB Literature Skills Practice",
      description,
      url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("jamblit", "NGN"),
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: ["120 original literary-skills questions", "Four topic drills", "Two 40-question tests", "Prescribed-book knowledge not covered"],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("jamblit"),
      ],
    },
  ],
};

const topics = [
  { name: "Drama", detail: "Dramatic forms, dialogue, stage directions, character, conflict and irony." },
  { name: "Prose", detail: "Narrators, character development, plot, setting, symbolism and theme." },
  { name: "Poetry", detail: "Poetic forms, sound patterns, figurative language, structure and persona." },
  { name: "Literary Appreciation", detail: "Interpret original short extracts and support your reading with evidence." },
];

const tips = [
  ["Keep the prescribed-text list beside your plan", "Keep the current IBASS prescribed-text list beside your study plan. This practice supplements those books."],
  ["Explain what a device does", "When identifying a device, explain what it does in the particular passage."],
  ["Separate speaker from author", "Separate the narrator or poetic speaker from the real author."],
  ["Check against the words on the page", "Check an interpretation against the words on the page before choosing it."],
];

export default function JambLiteratureLandingPage() {
  return (
    <div data-theme="jamblit" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JAMB Literature in English Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/jamb-literature/dashboard"
            shortName="JAMB Literature"
            subtitle="120 original questions on literary skills and unseen extracts. Study the prescribed books separately. All drills and tests are free, no account needed."
            shots={{ mobile: "/landing/jamblit-mobile.png", desktop: "/landing/jamblit-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jamblit" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practise One Area at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four topic drills bring back questions you miss. Every answer has an explanation of the literary technique or the evidence supporting the interpretation.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Check Your Skills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each test has 40 questions in 30 minutes. The second test stays out of the drills. Topic weights and timing are practice choices; the score does not measure your knowledge of the prescribed books.
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
                Four Areas of Literary Practice
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Built on JAMB&apos;s current IBASS Literature in English syllabus, which prints no topic weights. Each practice test has 10 questions from each area, a Tigertest practice choice rather than an official weight.
              </p>
              <div className="space-y-3">
                {topics.map((area) => (
                  <div key={area.name} className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="text-brand-dark font-semibold">10 per test</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("jamblit", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
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
            How to Study for JAMB Literature
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            {tips.map(([h, p], i) => (
              <div key={h}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">{i + 1}. {h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JAMB Literature Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jamblit" />
        </div>
      </div>

      <SampleQuestionsV2 examId="jamblit" />

      <ExamRelatedTests examId="jamblit" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Build Your Literary Skills</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Drama, then practise prose, poetry and unseen extracts.</p>
          <ExamLandingCTA dashboardHref="/jamb-literature/dashboard" />
        </div>
      </div>
    </div>
  );
}
