import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/rocpi";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Romania Driver CPC (CPI) Practice Test 2026 in English - Free ARR Questions";
const metaDescription =
  "Free English practice for the ARR CPI theory exam for truck and bus drivers in Romania: 200 original questions on drivers' hours, tachographs, loads and passengers, four 50-question mock tests, 70% to pass.";
const description =
  "Free practice in English for the theory questionnaire of Romania's Driver CPC initial qualification (CPI marfă / persoane), run by the Romanian Road Authority (ARR): 200 original questions on EU drivers' hours and the Mobility Package, smart tachographs, eco-driving and vehicle technology, load securing, weights and dimensions, passenger safety and rights, CMR and cabotage, health and road safety, and emergencies. Four mock tests of 50 questions at the real pace with 70% to pass, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "romania driver cpc, cpi arr english, atestat cpi marfa, atestat cpi persoane, arr exam english, cpi truck driver romania, romania truck driver test english, chestionare cpi arr, driver cpc initial qualification romania, testare.arr.ro, cpi scurt, tachograph and drivers hours test romania",
  alternates: {
    canonical: `${siteUrl}/romania-driver-cpc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/romania-driver-cpc-practice-test`,
    images: [{ url: shareImageUrl("rocpi"), width: 1200, height: 630, alt: "Tigertest free Romania Driver CPC (CPI) practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rocpi")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ARR CPI exam like?",
    a: "The CPI (certificat de pregătire profesională inițială) exam for goods or passenger drivers has a theory exam and a practical exam. The theory exam has two papers: 100 multiple-choice questions in 2 hours, each with 4 options and one correct answer, and 6 case studies in 2 hours, two on each of the three chapters of the course. You need at least 70% of the questions right and at least 70% of the case-study marks, and only then may you sit the practical exam. This is set out in the Norms approved by Order 1214/2015 of the Minister of Transport.",
  },
  {
    q: "Can I take the CPI exam in English?",
    a: "Yes. Since 2025 the Romanian Road Authority (ARR) runs the CPI and short CPI theory exams in English, in Bucharest only, on dates it announces, with the practical exam in English in Bucharest a few working days later. You sit the exam in the language of your training course, Romanian or English. ARR also publishes its English question base as online questionnaires on testare.arr.ro. Check the current dates with ARR or your training centre.",
  },
  {
    q: "What does Tigertest cover, and how is it different from ARR's own questions?",
    a: "Tigertest's 200 questions are original, written from the EU and Romanian rules the course covers: drivers' hours and the Mobility Package, smart tachographs, rational and eco-driving, brakes and vehicle technology, load securing and weights, passenger safety and rights, CMR, cabotage and Romanian transport rules, health and road safety, and emergencies. They do not copy ARR's question base, so study ARR's published questions too. The case-study paper and the practical exam are not modelled.",
  },
  {
    q: "What is the short CPI (CPI scurt)?",
    a: "A driver who already holds a CPI for one kind of transport, goods or passengers, can add the other through a shorter route: a 20-question questionnaire on the subjects specific to the new kind of transport, then the whole practical exam. The goods and passenger topics in Tigertest (loads, passengers, documents) are a useful way to revise for it.",
  },
  {
    q: "Is Tigertest linked to ARR?",
    a: "No. Tigertest is free, independent practice and is not affiliated with the Romanian Road Authority (ARR), its county agencies or any training centre. It does not book or replace the exam, and it does not issue CPI or CPC certificates. Follow your training centre and ARR for fees, dates, documents and the current rules.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Romania Driver CPC (CPI) Practice Test",
      description,
      url: `${siteUrl}/romania-driver-cpc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "RON" },
      featureList: [
        "200 original Driver CPC questions in English",
        "4 mock tests of 50 questions, 70% to pass",
        "4 training sets",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Drivers' Hours & Working Time", weight: "7 of 50" },
  { name: "Vehicle Technology, Brakes & Checks", weight: "6 of 50" },
  { name: "Loading, Weights & Load Securing", weight: "6 of 50" },
  { name: "Road Risks, Health & Fitness to Drive", weight: "6 of 50" },
  { name: "Rational Driving & Eco-Driving", weight: "5 of 50" },
  { name: "Passenger Transport & Accessibility", weight: "5 of 50" },
  { name: "Tachographs & Records", weight: "5 of 50" },
  { name: "Transport Documents, Cabotage & Licences", weight: "5 of 50" },
  { name: "Emergencies, Crime & Professional Conduct", weight: "5 of 50" },
];

export default function RomaniaDriverCpcLandingPage() {
  return (
    <div data-theme="rocpi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Romania Driver CPC (CPI) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/romania-driver-cpc/dashboard"
            shortName="CPI practice"
            subtitle="200 original questions in English for the ARR CPI theory exam for truck and bus drivers: drivers' hours, smart tachographs, eco-driving, load securing, passengers, CMR and cabotage. Four 50-question mock tests at the real pace with 70% to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rocpi-mobile.png", desktop: "/landing/rocpi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rocpi" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Set by Set</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each training set holds one mock test&apos;s 50 questions, across every chapter of the course. Questions you miss come back until you have mastered them, then you take the matching test.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests at the Real Pace</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, half the real 100-question paper, with the real 70% pass line (35 of 50). No question repeats across tests, and every answer explains the rule behind it.
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
                Built on the Driver CPC Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Questions follow the three chapters of the EU Driver CPC syllabus (Directive (EU) 2022/2561): rational driving and vehicle technology, the rules of road transport, and health, safety and service. They use the rules in force in 2026, including the Mobility Package&apos;s rest, return-home and cabotage rules, smart tachographs and the drivers&apos; hours rules for vans over 2.5 tonnes in international work from 1 July 2026. ARR publishes no topic split, so each mock test follows the weights below. The case-study paper and the practical exam are not modelled.
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
                src={getTigerAsset("rocpi", 1)}
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
            How to Pass the CPI Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work the hours rules as sums</h3>
              <p>
                Learn the limits, then practise with real numbers: what is left of the 90-hour fortnight after a long week, when a daily rest must start to end within 24 hours, how many hours a reduced weekly rest leaves to make up. Scenario questions are where candidates lose marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the tachograph in UTC</h3>
              <p>
                Digital tachographs keep UTC, two hours behind Romania in winter and three in summer. Know the activity modes, the card types, the download and inspection deadlines, and what to do when a seal, chart or the tachograph fails.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study ARR&apos;s published questions too</h3>
              <p>
                The real exam draws on ARR&apos;s own question base, which ARR publishes in English on testare.arr.ro. Use Tigertest to understand the rules and find your weak chapters, then read through ARR&apos;s questions before exam day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above the line</h3>
              <p>
                The pass line is 70%. Aim for 40 or more out of 50 in every mock test, drill the questions you missed, and retrain any set below that before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Romania Driver CPC Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="rocpi" />

      <ExamRelatedTests examId="rocpi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your CPI Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English for truck and bus drivers in Romania.</p>
          <ExamLandingCTA dashboardHref="/romania-driver-cpc/dashboard" />
        </div>
      </div>
    </div>
  );
}
