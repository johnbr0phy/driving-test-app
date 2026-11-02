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

const title = "Free JAMB Biology Practice Test 2027 - UTME CBT";
const metaDescription =
  "Free JAMB UTME Biology practice: 203 original questions on the whole syllabus, with 40-question timed tests in 30 minutes. Every answer explained.";
const description =
  "Free JAMB UTME Biology practice with 203 original questions on the syllabus: variety of organisms, nutrition, transport and respiration, reproduction and co-ordination, ecology, and heredity and evolution. Two full 40-question practice tests in 30 minutes, six drills and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in JAMB Biology?",
    a: "Biology, like every UTME subject except Use of English, has 40 questions. The whole UTME is 180 questions in 2 hours on a computer: 60 in Use of English and 40 in each of your three other subjects. Each subject is scored out of 100, giving a total out of 400. Tigertest practice tests have 40 Biology questions in 30 minutes, which is one subject's share of the 2 hours if you split the time by questions.",
  },
  {
    q: "What topics does the JAMB Biology syllabus cover?",
    a: "The JAMB Biology syllabus has five sections: Variety of Organisms (living things, cells, levels of organisation and the kingdoms), Form and Functions (nutrition, transport, respiration, excretion, support, reproduction, growth and co-ordination), Ecology (ecological factors, food chains, nutrient cycles, populations, soil, and humans and the environment), Heredity and Variations, and Evolution. JAMB does not publish how many questions come from each section, so Tigertest spreads each test across all five.",
  },
  {
    q: "Does JAMB Biology have diagrams?",
    a: "The JAMB syllabus asks candidates to know the structure of cells, organs and organisms, and guides say diagrams appear in the paper. Tigertest describes structures in words instead of showing pictures, so learn the labelled diagrams in your textbook too: the flower, the heart, the kidney, the eye, the ear and the teeth.",
  },
  {
    q: "What score do I need in the UTME?",
    a: "Your UTME score is your total across four subjects, out of 400. JAMB sets minimum scores each year; for 2026 admissions it set 150 for universities and 100 for polytechnics and colleges of education. Medicine, nursing, pharmacy and other competitive courses ask for much more, so check the cut-off mark for your course.",
  },
  {
    q: "Are these real JAMB past questions?",
    a: "No. These are original practice questions written to the JAMB Biology syllabus, not JAMB past questions. They use Nigerian examples, such as the vegetation zones, the mangroves of the Niger Delta, malaria and river blindness, and JAMB's chemical names such as carbon(IV) oxide. Both practice tests and all six drills are free, with no account required. Tigertest is not affiliated with or endorsed by JAMB.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JAMB Biology practice test, JAMB Biology past questions alternative, UTME Biology practice, JAMB CBT practice Biology, JAMB Biology 2027, JAMB Biology syllabus questions, JAMB ecology questions, JAMB genetics questions",
  alternates: {
    canonical: `${siteUrl}/jamb-biology-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jamb-biology-practice-test`,
    images: [{ url: shareImageUrl("jambbio"), width: 1200, height: 630, alt: "Tigertest free JAMB Biology practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jambbio")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JAMB Biology Practice Test",
      description,
      url: `${siteUrl}/jamb-biology-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "203 original JAMB Biology practice questions with explanations",
        "2 full 40-question practice tests in 30 minutes",
        "6 drills: variety of organisms, nutrition, transport and respiration, reproduction and co-ordination, ecology, heredity and evolution",
        "Nigerian examples: vegetation zones, the Niger Delta, malaria, river blindness",
        "JAMB's chemical names, such as carbon(IV) oxide",
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
        classFaqJsonLd("jambbio"),
      ],
    },
  ],
};

const sections = [
  { name: "Variety of organisms", detail: "8 questions" },
  { name: "Plant structure and nutrition", detail: "6 questions" },
  { name: "Transport, respiration, excretion and support", detail: "6 questions" },
  { name: "Reproduction, growth and co-ordination", detail: "6 questions" },
  { name: "Ecology", detail: "8 questions" },
  { name: "Heredity, variation and evolution", detail: "6 questions" },
];

export default function JambBiologyLandingPage() {
  return (
    <div data-theme="jambbio" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JAMB Biology Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/jamb-biology/dashboard"
            shortName="JAMB Biology"
            subtitle="203 original questions on the whole JAMB Biology syllabus, with full 40-question timed tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jambeng-mobile.png", desktop: "/landing/jambeng-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jambbio" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Syllabus Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills that follow the syllabus: variety of organisms, nutrition, transport and respiration, reproduction and co-ordination, ecology, and heredity and evolution. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 40-question practice tests in 30 minutes, with free movement between questions and flags like the real CBT. Practice Test 2 is held out of the drills, so it measures how ready you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the JAMB Biology Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has 40 four-option questions across the five syllabus sections: Variety of Organisms, Form and Functions, Ecology, Heredity and Variations, and Evolution. JAMB publishes no split by topic, so this mix is Tigertest&apos;s. Diagrams are described in words. Your score is out of 100, like the UTME subject score.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("jambbio", 1)}
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
            How to Score High in JAMB Biology
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Budget your 2 hours</h3>
              <p>
                The UTME gives you 2 hours for all four subjects. Biology&apos;s fair share is about 30 minutes for 40 questions, under a minute each. Answer the quick recall questions first and flag the genetics crosses and calculations to come back to.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Cover the whole syllabus</h3>
              <p>
                Questions come from all five sections, so do not skip a topic. Ecology and the human body systems are long sections; pair each drill with the matching chapter in your textbook and use the questions you miss to decide what to reread.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the diagrams and the Nigerian examples</h3>
              <p>
                Draw and label the flower, the heart, the kidney, the eye, the ear and the teeth until you can do it from memory. Know the Nigerian vegetation zones, the vectors of malaria, river blindness and sleeping sickness, and the crops propagated by cuttings and suckers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise genetics crosses on paper</h3>
              <p>
                Write the gametes and draw the Punnett square for every cross, including the sickle cell (AS) and blood group questions. Guides agree that the UTME takes nothing off for a wrong answer, so never leave a question blank.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JAMB Biology Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jambbio" />
        </div>
      </div>

      <ExamRelatedTests examId="jambbio" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for JAMB Biology?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 203 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/jamb-biology/dashboard" />
        </div>
      </div>
    </div>
  );
}
