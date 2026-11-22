import "@/lib/banks/nlvca";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free VCA Basic Safety Practice Test 2026 - B-VCA Exam Questions in English";
const metaDescription =
  "Free practice for the B-VCA (VCA Basic Safety) exam in the Netherlands and Belgium: 200 original questions on safety law, LMRA, signs, PPE, machines, work at height, confined spaces, hazardous substances, electricity, fire and emergencies. Four 40-question mock tests, every answer explained.";
const description =
  "Free practice in English for B-VCA (Basisveiligheid VCA), the basic safety diploma most contractors and staffing agencies in the Netherlands and Belgium ask workers to hold: 200 original questions written from the SSVV eindtermen and toetstermen (ETT 2026), four 40-question mock tests with the official toetsmatrijs topic counts and a 65% target, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "vca exam, b-vca, vca basic safety, vca basis, basisveiligheid vca, vca practice test, vca exam english, vca questions and answers, vca mock exam, vca diploma, vca proefexamen, vca oefenexamen",
  alternates: {
    canonical: `${siteUrl}/vca-basic-safety-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/vca-basic-safety-practice-test`,
    images: [{ url: shareImageUrl("nlvca"), width: 1200, height: 630, alt: "Tigertest free VCA Basic Safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nlvca")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is B-VCA?",
    a: "B-VCA (Basisveiligheid VCA, VCA Basic Safety) is the personal safety diploma of the VCA scheme, owned by SSVV in the Netherlands and BeSaCC-VCA in Belgium. Most contractors in construction, industry, petrochemicals and installation work, and many staffing agencies, ask operational workers to hold it. Supervisors usually need VOL-VCA instead. A VCA diploma is valid for 10 years and is recorded in the Central Diploma Register (CDR).",
  },
  {
    q: "What is the format of the B-VCA exam?",
    a: "According to the SSVV toetsmatrijs 2026, the B-VCA exam has 40 closed questions in 60 minutes. Some are multiple choice, others are multiple response, matrix or matching questions. You pass with 2,580 of 4,000 points (64.5%), which exam centres such as PBNA describe as 65%. The read-aloud version gives 15 minutes more. The mock tests here use single-answer questions, 40 per test, with a 65% target.",
  },
  {
    q: "Can I take the VCA exam in English?",
    a: "Yes. Recognised exam centres offer B-VCA in Dutch, English and several other languages, and SSVV renewed the English exams in 2026 along with Dutch, German and French. These practice questions are in English and use the Dutch and Belgian terms you will meet in the exam, such as Arbowet, RI&E, LMRA and toolbox meeting.",
  },
  {
    q: "What does the B-VCA exam cover?",
    a: "SSVV's eindtermen and toetstermen set four sections: preparing and inspecting the work (laws and duties, safe-work agreements, safe behaviour, toolbox meetings, prevention and the LMRA), carrying out the work (workplace, signs, PPE, machines and lifting, work at height and confined spaces), specific hazards (hazardous substances, electricity, fire and explosion) and incidents and emergencies. Each mock test here follows the official count per topic.",
  },
  {
    q: "Are these the real VCA exam questions?",
    a: "No. The SSVV item bank is secret, and every question here is original, written by Tigertest from the published VCA eindtermen and toetstermen 2026. It is free revision, not affiliated with SSVV, BeSaCC-VCA or any exam institute, and it does not replace a VCA course or the official proefexamens, which show how the exam system looks.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free VCA Basic Safety Practice Test",
      description,
      url: `${siteUrl}/vca-basic-safety-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nlvca", "EUR"),
      featureList: [
        "200 B-VCA practice questions",
        "4 mock tests of 40 questions",
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
  { name: "Laws, duties and safe-work agreements", weight: "4 per test" },
  { name: "Safe behaviour, toolbox meetings and LMRA", weight: "4 per test" },
  { name: "Workplace, signs and marking", weight: "5 per test" },
  { name: "Personal protective equipment", weight: "4 per test" },
  { name: "Machines, tools and lifting", weight: "4 per test" },
  { name: "Heights, openings and confined spaces", weight: "6 per test" },
  { name: "Hazardous substances", weight: "6 per test" },
  { name: "Electricity", weight: "2 per test" },
  { name: "Fire and explosion", weight: "2 per test" },
  { name: "Accidents and emergencies", weight: "3 per test" },
];

export default function VcaBasicSafetyLandingPage() {
  return (
    <div data-theme="nlvca" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free VCA Basic Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/vca-basic-safety/dashboard"
            shortName="B-VCA"
            subtitle="200 B-VCA questions in English and four 40-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nlvca-mobile.png", desktop: "/landing/nlvca-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nlvca" />

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
                Four training sets: rules, safe behaviour and the LMRA; workplace, signs and PPE; equipment, heights and confined spaces; and hazardous substances, electricity, fire and emergencies. Questions you miss come back until you have mastered them.
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
                Four tests of 40 questions with the same topic counts as the official B-VCA toetsmatrijs, and a 65% target (26 out of 40). No question appears in more than one test, and every answer comes with a short explanation from the VCA eindtermen and toetstermen.
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
                Built on the B-VCA Toetsmatrijs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                SSVV publishes how many of the 40 exam questions come from each part of the eindtermen and toetstermen (ETT 2026). Each mock test uses those counts. Real exam items also include multiple response, matrix and matching questions; here every question has one answer.
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
                src={getTigerAsset("nlvca", 3)}
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
            How to Prepare for B-VCA
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who does what</h3>
              <p>
                The employer makes the risk analysis, provides PPE and arranges instruction; you use equipment and PPE correctly, leave guards in place and report incidents. The Labour Inspectorate in the Netherlands and Belgiumthe welfare inspectorate in Belgium can halt workapos;s Supervision of Well-being at Work directorate (TWW) can halt work in serious danger. Learn the Belgian terms too if you work there: Welfare at Work Act, prevention advisor, IDPBW.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers once</h3>
              <p>
                Hearing protection available from 80 dB(A), compulsory from 85. Lifting by hand at most 23 kg in the Netherlands, 25 kg in Belgium. Work at height from 2.5 m (NL) or 2 m (B). Ladders: under 5 m, under 2 hours, about 75 degrees, 1 m above the landing. Confined spaces: at least 19% oxygen and below 10% of the LEL.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think in the prevention hierarchy</h3>
              <p>
                Tackle the source first, then collective measures such as guards and edge protection, then individual measures such as job rotation, and PPE last. Many questions also turn on timing: do an LMRA before every task and again when conditions change.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim well above 26 out of 40 on every mock test before your exam, and use your course material and the official SSVV proefexamens to see how the exam system works.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          B-VCA Frequently Asked Questions
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

      <ExamSampleQuestions examId="nlvca" />

      <ExamRelatedTests examId="nlvca" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your VCA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every part of the B-VCA eindtermen.</p>
          <ExamLandingCTA dashboardHref="/vca-basic-safety/dashboard" />
        </div>
      </div>
    </div>
  );
}
