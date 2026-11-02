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

const title = "Free JAMB Chemistry Practice Test 2027 - UTME CBT";
const metaDescription =
  "Free JAMB UTME Chemistry practice: 208 original questions on the whole syllabus, with 40-question timed tests and every calculation worked out. No account needed.";
const description =
  "Free JAMB UTME Chemistry practice with 208 original questions on the JAMB syllabus: separation of mixtures, gas laws, the mole, atomic structure, nuclear chemistry, acids and redox, electrolysis, rates and equilibrium, non-metals, metals and organic chemistry. Two full 40-question practice tests in 30 minutes, eight drills and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in JAMB Chemistry?",
    a: "Chemistry is one of your three UTME subjects besides Use of English, and has 40 questions. The whole UTME is 180 questions (English 60, each other subject 40) in 2 hours on a computer, and each subject is scored out of 100, so the total is out of 400. Tigertest practice tests have the full 40 Chemistry questions in 30 minutes, which is one subject's share of the 2 hours if you split the time by questions.",
  },
  {
    q: "What topics does the JAMB Chemistry syllabus cover?",
    a: "The JAMB Chemistry syllabus has 18 topics: separation of mixtures, chemical combination, kinetic theory and gas laws, atomic structure and bonding, nuclear chemistry, solubility, environmental pollution, acids, bases and salts, oxidation and reduction, electrolysis, energy changes, rates of reaction, chemical equilibria, non-metals, metals, organic compounds, chemistry and industry, and astronomical chemistry. JAMB does not say how many questions come from each topic, so Tigertest spreads its tests across all of them.",
  },
  {
    q: "Are there calculations in JAMB Chemistry?",
    a: "Yes. Expect mole and mass calculations, gas laws, empirical formulae, pH, titration, Faraday's laws, cell e.m.f., free energy and half-life. Tigertest questions give the relative atomic masses and constants you need. Guides say the CBT screen has a basic on-screen calculator, but practise the arithmetic by hand as well. Every Tigertest calculation shows the working and the common slips behind the wrong answers.",
  },
  {
    q: "What score do I need in the UTME?",
    a: "Your UTME score is your total across four subjects, out of 400. JAMB sets minimum scores each year; for 2026 admissions it set 150 for universities and 100 for polytechnics and colleges of education. Courses such as medicine, pharmacy and engineering, which need Chemistry, usually ask for much more, so check the cut-off mark for your course and institution.",
  },
  {
    q: "Are these real JAMB past questions?",
    a: "No. These are original practice questions written to the JAMB UTME Chemistry syllabus, using the same IUPAC names as the syllabus, such as trioxocarbonate(IV) and tetraoxosulphate(VI). Both practice tests and all eight drills are free, with no account required. Tigertest is not affiliated with or endorsed by JAMB.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JAMB Chemistry practice test, JAMB Chemistry past questions alternative, UTME Chemistry practice, JAMB CBT practice Chemistry, JAMB Chemistry 2027, JAMB Chemistry syllabus, JAMB Chemistry calculations, UTME Chemistry mock",
  alternates: {
    canonical: `${siteUrl}/jamb-chemistry-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jamb-chemistry-practice-test`,
    images: [{ url: shareImageUrl("jambchem"), width: 1200, height: 630, alt: "Tigertest free JAMB Chemistry practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jambchem")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JAMB Chemistry Practice Test",
      description,
      url: `${siteUrl}/jamb-chemistry-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "208 original JAMB Chemistry practice questions with explanations",
        "2 full 40-question practice tests in 30 minutes",
        "8 drills covering all 18 topics of the JAMB Chemistry syllabus",
        "Every calculation worked step by step",
        "IUPAC names as used in the JAMB syllabus",
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
        classFaqJsonLd("jambchem"),
      ],
    },
  ],
};

const sections = [
  { name: "Separation of mixtures, kinetic theory and gas laws", detail: "4 questions" },
  { name: "Chemical combination, the mole and solubility", detail: "5 questions" },
  { name: "Atomic structure, bonding and nuclear chemistry", detail: "6 questions" },
  { name: "Acids, bases, salts and redox", detail: "5 questions" },
  { name: "Electrolysis, energy, rates and equilibrium", detail: "6 questions" },
  { name: "Non-metals, water, air and pollution", detail: "5 questions" },
  { name: "Metals, industry and astronomical chemistry", detail: "4 questions" },
  { name: "Organic chemistry", detail: "5 questions" },
];

export default function JambChemistryLandingPage() {
  return (
    <div data-theme="jambchem" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JAMB Chemistry Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/jamb-chemistry/dashboard"
            shortName="JAMB Chemistry"
            subtitle="208 original questions on the whole UTME Chemistry syllabus, with full 40-question timed tests and every calculation worked out. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jambchem-mobile.png", desktop: "/landing/jambchem-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jambchem" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills that cover all 18 syllabus topics, from separation of mixtures to organic chemistry. Questions you miss come back until you have mastered them, and every calculation shows its working.
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
                Built on the JAMB Chemistry Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has 40 four-option questions in syllabus order. JAMB does not publish how many questions come from each topic, so this split is Tigertest&apos;s, spread across all 18 topics. Your score is out of 100, like the UTME subject score.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("jambchem", 1)}
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
            How to Score High in JAMB Chemistry
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Budget your 2 hours</h3>
              <p>
                The UTME gives you 2 hours for all four subjects. Plan about 30 minutes for Chemistry&apos;s 40 questions. Answer the quick recall questions first, flag the long calculations, then come back to them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master the mole</h3>
              <p>
                Moles connect almost every calculation: mass, gas volume at s.t.p. (22.4 dm³ per mole), concentration and faradays. Write the balanced equation, change what you are given into moles, use the ratio, then change back.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the syllabus names and tests</h3>
              <p>
                JAMB uses IUPAC names such as trioxonitrate(V) and tetraoxosulphate(VI), so learn to work out oxidation numbers from them. Learn the tests for gases and ions, the colours of hydroxide precipitates and flame colours, and the industrial processes: Haber, Contact, Solvay and the blast furnace.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Guides agree that the UTME takes nothing off for a wrong answer, so never leave a question blank. In a calculation, check which wrong options come from a common slip, such as forgetting to change °C to kelvin or ignoring the mole ratio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JAMB Chemistry Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jambchem" />
        </div>
      </div>

      <ExamRelatedTests examId="jambchem" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for JAMB Chemistry?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 208 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/jamb-chemistry/dashboard" />
        </div>
      </div>
    </div>
  );
}
