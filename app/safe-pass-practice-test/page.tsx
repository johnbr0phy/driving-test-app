import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Safe Pass Practice Test 2026 - Free Irish Safe Pass Questions";
const metaDescription =
  "Free practice for the SOLAS Safe Pass construction safety course in Ireland: 200 original questions on site safety law, accident reporting, risk, electricity, excavations, work at height, plant and vehicles, noise, vibration and PPE. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for SOLAS Safe Pass, the one-day construction health and safety awareness course every craft and general construction worker in Ireland must complete: 200 original questions across the course's 13 learning units, written from the Safety, Health and Welfare at Work Act 2005, the Construction Regulations 2013, the General Application Regulations 2007 and HSA guidance. Four 50-question mock tests at the renewal test's 45 out of 50, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "safe pass test, safe pass questions, safe pass practice test, safe pass exam ireland, safe pass renewal test, safe pass mock test, solas safe pass, safe pass questions and answers, safe pass course, construction safety test ireland",
  alternates: {
    canonical: `${siteUrl}/safe-pass-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/safe-pass-practice-test`,
    images: [{ url: shareImageUrl("iesafepass"), width: 1200, height: 630, alt: "Tigertest free Safe Pass practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iesafepass")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is Safe Pass?",
    a: "Safe Pass is the one-day health and safety awareness programme run by SOLAS for construction workers in Ireland. Under the Construction Regulations 2013, craft and general construction workers, apprentices and people doing on-site security work must hold a valid Safe Pass card. The course is given by SOLAS-approved tutors and covers 13 units, from site safety law and accident reporting to electricity, excavations, work at height, plant and vehicles, noise and vibration, and PPE.",
  },
  {
    q: "How is the Safe Pass course assessed?",
    a: "SOLAS says the course assessment is not a written test but a multiple-choice test: the tutor reads each question twice and you tick one answer. SOLAS does not publish how many questions it has or the pass mark. The alternative renewal test, taken on a computer at a Pearson test centre, is 50 multiple-choice questions in 45 minutes, and you must get 45 right to pass. The mock tests here use that renewal format: 50 questions and a 90% target.",
  },
  {
    q: "How long does a Safe Pass card last?",
    a: "SOLAS says Safe Pass cards are valid for four years. To renew, you attend the one-day course again, or, if you have done the classroom course before, take the alternative renewal computer test. You must be 16 on the day of the course and have an Irish PPS number, or a process number if you are a non-national working in Ireland for a short time.",
  },
  {
    q: "Who does not need a Safe Pass card?",
    a: "HSA guidance lists people who are not doing construction work: site office staff, canteen staff, architects, engineers and surveyors, client representatives, supervised visitors and delivery drivers who do not go on site. A client, PSCS or contractor can still ask everyone on their site to hold one, and Safe Pass never replaces the employer's own duty to train workers for their tasks and to give a site induction.",
  },
  {
    q: "Are these the real Safe Pass questions?",
    a: "No. Every question is original, written by Tigertest from the Safety, Health and Welfare at Work Act 2005, the Construction Regulations 2013, the General Application Regulations 2007 and HSA guidance, following the 13 units of the course. It is free revision, not affiliated with SOLAS, the HSA or any Safe Pass tutor, and it does not replace the course or the official revision material in your SOLAS account.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Safe Pass Practice Test",
      description,
      url: `${siteUrl}/safe-pass-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Safe Pass practice questions",
        "4 mock tests of 50 questions",
        "4 training sets by topic",
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
  { name: "Site safety and the law", weight: "7 per test" },
  { name: "Accident reporting and emergencies", weight: "5 per test" },
  { name: "Risk assessment and safe behaviour", weight: "6 per test" },
  { name: "Electricity", weight: "5 per test" },
  { name: "Excavations and buried services", weight: "5 per test" },
  { name: "Work at height", weight: "7 per test" },
  { name: "Construction equipment and vehicles", weight: "6 per test" },
  { name: "Health, welfare, noise and vibration", weight: "5 per test" },
  { name: "Personal protective equipment", weight: "4 per test" },
];

export default function SafePassLandingPage() {
  return (
    <div data-theme="iesafepass" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Safe Pass Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/safe-pass/dashboard"
            shortName="Safe Pass"
            subtitle="200 original questions for the SOLAS Safe Pass course and renewal test: site safety law, accident reporting, risk, electricity, excavations, work at height, plant and vehicles, noise, vibration and PPE. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/iesafepass-mobile.png", desktop: "/landing/iesafepass-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iesafepass" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Topic by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: site safety law and accident reporting, risk, health and PPE, electricity and excavations, and work at height, plant and vehicles. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions that mix all 13 course units, with a 90% target, the 45 out of 50 the renewal test asks for. No question appears in more than one test, and every answer comes with a short explanation from Irish law and HSA guidance.
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
                Built on the 13 Safe Pass Units
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                SOLAS does not publish topic weights, so each 50-question test spreads the 13 learning units of the one-day course as below. The law questions follow the Safety, Health and Welfare at Work Act 2005, the Construction Regulations 2013 and the General Application Regulations 2007.
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
                src={getTigerAsset("iesafepass", 1)}
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
            How to Pass Safe Pass
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who does what</h3>
              <p>
                The HSA enforces the law, SOLAS runs Safe Pass, the PSCS manages safety on site during construction and the PSDP during design. Your own duties under section 13 of the 2005 Act come up again and again: take reasonable care, cooperate, use PPE properly, report defects and never work under the influence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers once</h3>
              <p>
                Report an injury that keeps someone off normal work for more than three days, not counting the day itself. Noise action values are 80 and 85 dB(A), the limit 87. Top guard rails at least 950 mm, gaps no more than 470 mm. Working platforms with a 2 m fall checked every 7 days, excavations every day. RCDs trip at 30 mA. Ladders 1 out for every 4 up.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Pick the answer that removes the hazard</h3>
              <p>
                When a question asks what to do, the right answer is usually to stop, make it safe and report it, not to work around the problem. Guard rails beat harnesses, isolation beats care, and PPE is always the last line of defence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 45 out of 50 on every mock test before your course or renewal test, and use the revision material in your SOLAS account too.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Safe Pass Frequently Asked Questions
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

      <ExamRelatedTests examId="iesafepass" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Safe Pass?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all 13 units of the Safe Pass course.</p>
          <ExamLandingCTA dashboardHref="/safe-pass/dashboard" />
        </div>
      </div>
    </div>
  );
}
