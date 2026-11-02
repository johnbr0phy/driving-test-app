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

const title = "Free JAMB Physics Practice Test 2027 - UTME CBT";
const metaDescription =
  "Free JAMB UTME Physics practice: 200 original questions on the whole syllabus, from motion and heat to electricity and modern physics, with 40-question timed tests. Every calculation explained.";
const description =
  "Free JAMB UTME Physics practice with 200 original questions on the syllabus: measurement and motion, forces and energy, pressure and heat, waves and light, electricity, magnetism and a.c., and modern physics and electronics. Two full 40-question practice tests in 30 minutes, seven drills and a worked explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in JAMB Physics?",
    a: "Guides that reproduce the JAMB brochure give Physics 40 questions in the UTME, and the whole UTME as 180 questions in 2 hours on a computer: 60 in Use of English and 40 in each of your three other subjects. Each subject is scored out of 100, giving a total out of 400. Tigertest practice tests have 40 Physics questions in 30 minutes, which is Physics's share of the 2 hours if you split the time by questions.",
  },
  {
    q: "What topics does the JAMB Physics syllabus cover?",
    a: "The syllabus runs from measurements and units, vectors, motion, gravitation, equilibrium, work, energy, friction, machines and elasticity, through pressure, heat, gas laws and vapours, to waves, sound, light, mirrors, lenses and dispersion, then electrostatics, capacitors, cells, current electricity, magnetism, electromagnetic induction and a.c. circuits, and ends with elementary modern physics, introductory electronics, and fibre optics and lasers. JAMB publishes no topic weights, so Tigertest spreads each test across all seven areas.",
  },
  {
    q: "Do I need a calculator for JAMB Physics?",
    a: "Many Physics questions are short calculations, such as equations of motion, gas laws, lens formulas and resistor networks, so practise working them quickly by hand. The questions here use simple numbers and take g as 10 m s⁻² unless a question says otherwise, and every explanation shows the working step by step. Check the current JAMB brochure for the rules on what you may use on the day.",
  },
  {
    q: "What score do I need in the UTME?",
    a: "Your UTME score is your total across four subjects, out of 400. JAMB sets minimum scores each year; for 2026 admissions it set 150 for universities and 100 for polytechnics and colleges of education. Engineering, medicine and other competitive courses usually ask for much more, so check the cut-off mark for your course and institution.",
  },
  {
    q: "Are these real JAMB past questions?",
    a: "No. These are original practice questions written to the JAMB UTME Physics syllabus, not JAMB past questions. They follow the real question style: four options, one correct answer, and a mix of calculations and theory. Both practice tests and all seven drills are free, with no account required. Tigertest is not affiliated with or endorsed by JAMB.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JAMB Physics practice test, JAMB Physics past questions alternative, UTME Physics practice, JAMB CBT practice Physics, JAMB Physics 2027, JAMB Physics syllabus questions, JAMB Physics calculations, UTME Physics mock exam",
  alternates: {
    canonical: `${siteUrl}/jamb-physics-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jamb-physics-practice-test`,
    images: [{ url: shareImageUrl("jambphys"), width: 1200, height: 630, alt: "Tigertest free JAMB Physics practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jambphys")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JAMB Physics Practice Test",
      description,
      url: `${siteUrl}/jamb-physics-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 original JAMB Physics practice questions with worked explanations",
        "2 full 40-question practice tests in 30 minutes",
        "7 drills: motion, forces and energy, heat, waves and light, electricity, magnetism, modern physics",
        "Every calculation worked step by step",
        "Covers the whole UTME Physics syllabus, including fibre optics and lasers",
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
        classFaqJsonLd("jambphys"),
      ],
    },
  ],
};

const sections = [
  { name: "Measurement, vectors and motion", detail: "7 questions" },
  { name: "Forces, energy and machines", detail: "7 questions" },
  { name: "Pressure, fluids and heat", detail: "7 questions" },
  { name: "Waves, sound and light", detail: "7 questions" },
  { name: "Electrostatics and current electricity", detail: "5 questions" },
  { name: "Magnetism, induction and a.c.", detail: "4 questions" },
  { name: "Modern physics and electronics", detail: "3 questions" },
];

export default function JambPhysicsLandingPage() {
  return (
    <div data-theme="jambphys" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JAMB Physics Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/jamb-physics/dashboard"
            shortName="JAMB Physics"
            subtitle="200 original questions on the whole UTME Physics syllabus, with full 40-question timed tests and every calculation worked. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jambphys-mobile.png", desktop: "/landing/jambphys-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jambphys" />

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
                Seven drills, one for each area of the syllabus: motion, forces and energy, heat, waves and light, electricity, magnetism, and modern physics. Questions you miss come back until you have mastered them.
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
                Built on the JAMB Physics Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has 40 four-option questions drawn from all seven areas of the syllabus. JAMB does not publish how many questions come from each topic, so this split is Tigertest&apos;s own. Your score is out of 100, like the UTME subject score.
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
                src={getTigerAsset("jambphys", 1)}
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
            How to Score High in JAMB Physics
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Budget your 2 hours</h3>
              <p>
                The UTME gives you 2 hours for all four subjects. Plan about 30 minutes for Physics&apos;s 40 questions. Answer the quick theory questions first, then come back to the longer calculations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the formulas and their units</h3>
              <p>
                Most marks come from a short list of formulas: the equations of motion, F = ma, work and power, pressure, the gas laws, Q = mcθ, v = fλ, the mirror and lens formula, Ohm&apos;s law, P = IV and half-life. Write the units in every step: converting cm to m, minutes to seconds and °C to kelvin catches the commonest mistakes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check your answer makes sense</h3>
              <p>
                A refractive index below 1, an efficiency over 100% or a pool that looks deeper than it is all mean a slip. The wrong options are often the answer to a common mistake, such as forgetting the ½ in ½mv² or using degrees Celsius in a gas law.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Guides agree that the UTME takes nothing off for a wrong answer, so never leave a question blank. Flag the hard ones, finish the rest, then come back.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JAMB Physics Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jambphys" />
        </div>
      </div>

      <ExamRelatedTests examId="jambphys" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for JAMB Physics?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/jamb-physics/dashboard" />
        </div>
      </div>
    </div>
  );
}
