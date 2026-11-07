import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/fihygiene";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Finland Hygiene Passport Test 2026 in English - Free Practice";
const metaDescription =
  "Free practice in English for the Finnish Hygiene Passport test (hygieniapassi): 200 original questions on microbes, food poisoning, Finnish temperature rules, hygiene, cleaning, self-monitoring and food law.";
const description =
  "Free practice in English for the Finnish Hygiene Passport test (hygieniaosaamistesti): 200 original questions on the six areas Ruokavirasto sets, covering microbes and contamination, food poisoning, Finland's storage, cooking and cooling temperatures, hygienic handling and allergens, personal hygiene, cleaning, self-monitoring and the Oiva system, and the Food Act. Five 40-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "hygiene passport finland, hygieniapassi, hygiene passport test english, hygieniapassitesti, hygieniaosaamistesti, finnish hygiene passport practice test, hygiene passport questions, ruokavirasto hygiene passport, food hygiene test finland, hygienpass, hygiene passport test 2026",
  alternates: {
    canonical: `${siteUrl}/finland-hygiene-passport-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/finland-hygiene-passport-practice-test`,
    images: [{ url: shareImageUrl("fihygiene"), width: 1200, height: 630, alt: "Tigertest free Finland Hygiene Passport practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fihygiene")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Hygiene Passport test like?",
    a: "The Hygiene Passport test (hygieniaosaamistesti) has 40 statements, and you mark each one true or false. You have 45 minutes and need at least 34 correct answers to pass, as set by Ruokavirasto's regulation on hygiene proficiency. It is a paper test run by an examiner approved by Ruokavirasto, who checks your identity and marks the test. Bring a valid official photo ID.",
  },
  {
    q: "Can I take the Hygiene Passport test in English?",
    a: "Yes. The normal test is in Finnish, Swedish or English. An examiner can also arrange a special situation test, for example an oral test, a test with an interpreter or a test translated into another language, which has no time limit. It has to be agreed with the examiner in advance. Tigertest's practice is in English and uses the Finnish terms you will meet at work, such as omavalvonta and Oiva.",
  },
  {
    q: "Who needs a Hygiene Passport in Finland?",
    a: "The Food Act requires a Hygiene Passport from anyone who handles unpackaged, easily perishable food on food premises, for example in cafes, restaurants, shop service counters, school kitchens and food factories, once they have done such work for three months. Earlier jobs that needed a passport count towards the three months. Hygiene certificates from other countries are not accepted in Finland.",
  },
  {
    q: "How does Tigertest's practice compare with the real test?",
    a: "The real test is 40 true or false statements. Tigertest's five mock tests also have 40 questions each with the same 85% line (34 of 40), but each question has four options, and some ask which statement is true, so you weigh the same facts the real statements test. The figures are Finland's own: 6 °C for most chilled food, 60 °C for hot holding, cooling within 4 hours, 70 °C when cooking. Pass every mock test with room to spare before you book.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Food Act, decree 318/2021 on food hygiene, Ruokavirasto's regulation 7/2021 and Ruokavirasto's guidance for restaurants. Ruokavirasto publishes free model test questions too, which are worth reading. Tigertest is free practice, not affiliated with Ruokavirasto or any Hygiene Passport examiner, and it does not issue a Hygiene Passport.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Finland Hygiene Passport Practice Test",
      description,
      url: `${siteUrl}/finland-hygiene-passport-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Finnish food hygiene questions in English",
        "5 mock tests of 40 questions",
        "5 training sets by topic",
        "Instant feedback with explanations",
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
        classFaqJsonLd("fihygiene"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Storage, Cooking & Cooling Temperatures", weight: "17.5%" },
  { name: "Personal Hygiene", weight: "17.5%" },
  { name: "Microbes & Contamination", weight: "15%" },
  { name: "Food Poisoning", weight: "15%" },
  { name: "Hygienic Handling & Allergens", weight: "12.5%" },
  { name: "Cleaning, Waste & Pests", weight: "10%" },
  { name: "Self-Monitoring & Oiva", weight: "7.5%" },
  { name: "Food Law & Authorities", weight: "5%" },
];

export default function FinlandHygienePassportLandingPage() {
  return (
    <div data-theme="fihygiene" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Finland Hygiene Passport Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/finland-hygiene-passport/dashboard"
            shortName="Hygiene Passport"
            subtitle="200 original questions in English for the Finnish Hygiene Passport test (hygieniapassi): microbes, food poisoning, Finland's 6 °C and 60 °C rules, cooling in 4 hours, hand hygiene, cleaning, self-monitoring and the Food Act. Five 40-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/fihygiene-mobile.png", desktop: "/landing/fihygiene-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fihygiene" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover microbes and food poisoning, temperatures, hygienic handling and cleaning, personal hygiene, and self-monitoring and food law. Questions you miss come back until you have mastered them.
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
                Five 40-question tests, the real test&apos;s length, that together cover all 200 questions, with the real 85% line: 34 of 40. No question repeats across tests, and every answer explains the rule behind it.
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
                Built on Ruokavirasto&apos;s Six Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Ruokavirasto&apos;s regulation lists what the test covers: microbiology and contamination, food poisoning and hygienic working methods, personal hygiene, cleaning, self-monitoring, and legislation and authorities. Tigertest follows those areas with Finland&apos;s own rules from decree 318/2021 and Ruokavirasto&apos;s guidance: 4 °C for minced meat, 0 to 3 °C for cold-smoked fish, up to 12 °C for 4 hours on a cold buffet, 70 °C cooking and 75 °C for poultry. Ruokavirasto publishes no weights, so the split below is Tigertest&apos;s. The real test asks true or false; Tigertest gives four options.
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
                src={getTigerAsset("fihygiene", 1)}
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
            How to Pass the Hygiene Passport Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the Finnish temperatures</h3>
              <p>
                Many statements turn on a number. Most easily perishable food is kept at 6 °C or below, minced meat at 4 °C, cold-smoked and gravlax-style fish at 0 to 3 °C, yoghurt at 8 °C. Hot food stays at 60 °C or above, cooked food is cooled to its storage temperature within 4 hours, and the danger zone is 6 to 60 °C. Learn them until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know why, not just what</h3>
              <p>
                Spores survive cooking, some toxins survive boiling, listeria grows in the fridge and norovirus spreads from hands. When you know why a rule exists, a statement that sounds right but is slightly off stands out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every word of a statement</h3>
              <p>
                True or false statements are often almost right. &quot;Always&quot;, &quot;never&quot;, &quot;only&quot; and a number that is one step off decide the answer. Practise reading each option to the end before you choose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 34</h3>
              <p>
                You can miss only six statements. Aim for 37 or more in every mock test, drill the questions you missed, then take all five tests before you sit the real one with an approved examiner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Hygiene Passport Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="fihygiene" />
        </div>
      </div>

      <ExamSampleQuestions examId="fihygiene" />

      <ExamRelatedTests examId="fihygiene" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Hygiene Passport Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Finnish food hygiene, in English.</p>
          <ExamLandingCTA dashboardHref="/finland-hygiene-passport/dashboard" />
        </div>
      </div>
    </div>
  );
}
