import "@/lib/v2/banks/tgsi";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Telangana Police SI Mock Test 2026 - Practice Test";
const metaDescription =
  "Free Telangana Police SI mock tests: 236 original questions on arithmetic, reasoning and mental ability, and General Studies with the Telangana Movement, in 100-question tests at the real paper's pace, with an explanation on every answer.";
const description =
  "Free Telangana Police Sub-Inspector practice tests with 236 original questions on the TSLPRB Preliminary Written Test syllabus: Arithmetic, Test of Reasoning / Mental Ability, and General Studies (General Science, History of India and the National Movement, Geography, Indian Polity and Economy, and the Telangana Movement and State Formation). Each mock test has 100 questions in 90 minutes, half the real paper at the same pace, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the Telangana Police SI Preliminary Written Test pattern?",
    a: "The TSLPRB notification of 29 July 2026 sets one 3-hour paper of 200 objective questions for 200 marks: Arithmetic and Test of Reasoning / Mental Ability 100 and General Studies 100. Answers are marked on an OMR sheet. Tigertest's mock tests have 100 questions in 90 minutes, half the paper at the same pace, split 50 and 50 the same way.",
  },
  {
    q: "Is there negative marking in the Telangana SI prelims?",
    a: "Yes. For each question you get full marks for darkening the one right bubble and zero for leaving it blank; in every other case, a wrong bubble or more than one bubble, 20% of the question's marks is deducted. With four options a pure guess still gains a little on average (a quarter of a mark against three-quarters of a chance of losing a fifth), and ruling out even one option makes it clearly worth answering. Tigertest scores percent correct and does not deduct, so check how many marks your wrong answers would have cost.",
  },
  {
    q: "What are the qualifying marks for the Preliminary Written Test?",
    a: "The 2026 notification sets 30% for OCs (including EWS), 25% for BCs and 20% for SCs, STs and Ex-Servicemen. Only those who qualify go on to the Physical Measurement and Efficiency Tests and then the Final Written Examination of four papers, so aim well above the minimum.",
  },
  {
    q: "When is the Telangana Police SI exam in 2026?",
    a: "The board's press note of 17 September 2026 puts the SI Preliminary Written Test tentatively on 29 November 2026 (and the constable test on 20 December). Applications for the 2026 recruitment closed on 16 September 2026. Check www.tgprb.in for hall tickets and any change of date.",
  },
  {
    q: "Is the Telangana SI exam in English or Telugu?",
    a: "The notification says questions are set in English-Telugu and English-Urdu, and if a Telugu or Urdu version is unclear, the English version is final. Tigertest's questions are in English only, so they also help you read the English version quickly.",
  },
  {
    q: "Are these previous year TSLPRB SI questions?",
    a: "No. Every question is original, written to the syllabus in Annexure II of the notification, and none is copied from previous papers. General Studies covers static facts; current events of national and international importance, which the syllabus also lists, are not covered, so read the past year's news separately. It is free to start, with no account needed. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Telangana Police SI mock test, TS SI mock test, TG SI practice test, TSLPRB SI exam, TGPRB SI prelims, Telangana sub inspector exam questions, Telangana movement questions, SI preliminary written test practice",
  alternates: {
    canonical: `${siteUrl}/telangana-police-si-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/telangana-police-si-practice-test`,
    images: [{ url: shareImageUrl("tgsi"), width: 1200, height: 630, alt: "Tigertest free Telangana Police SI mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("tgsi")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Telangana Police SI Mock Test",
      description,
      url: `${siteUrl}/telangana-police-si-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("tgsi", "INR"),
      featureList: [
        "236 original Telangana Police SI practice questions with explanations",
        "2 mock tests of 100 questions in 90 minutes, the real paper's pace",
        "9 drills: two in arithmetic, two in reasoning and five in General Studies, including the Telangana Movement",
        "The real paper's even split between Arithmetic and Reasoning and General Studies",
        "Negative marking explained, with the 30, 25 and 20 percent qualifying marks",
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
        classFaqJsonLd("tgsi"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Arithmetic and Test of Reasoning / Mental Ability", weight: "100 questions" },
  { name: "General Studies", weight: "100 questions" },
];

export default function TgsiLandingPage() {
  return (
    <div data-theme="tgsi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Telangana Police SI Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/telangana-police-si/dashboard"
            shortName="TG Police SI"
            subtitle="236 original questions on arithmetic, reasoning and General Studies, with the Telangana Movement. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/tgsi-mobile.png", desktop: "/landing/tgsi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="tgsi" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills cover the Preliminary Written Test syllabus: two in arithmetic, two in reasoning and mental ability, and one each for general science, history, geography, polity and economy, and the Telangana Movement. Questions you miss come back until you have mastered them.
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
                Two mock tests of 100 questions in 90 minutes, half the real paper at the same pace, split evenly between Arithmetic and Reasoning and General Studies. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the TSLPRB Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The board&apos;s 2026 notification splits the 200-question paper into the two parts shown below, and every Tigertest mock keeps the same even split. General Studies here covers the syllabus&apos;s static areas: general science and the environment, history and the national movement, geography of India, polity and economy, and the Telangana Movement from 1948 to 2014. Current events, non-verbal figure items and visual memory are not modelled, nor are the physical tests and the Final Written Examination.
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
                src={getTigerAsset("tgsi", 1)}
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
            How to Prepare for the Telangana Police SI Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the Telangana Movement well</h3>
              <p>
                The syllabus names three phases: the idea of Telangana (1948 to 1970), the mobilisation phase (1971 to 1990) and the formation of the State (1991 to 2014). Learn the milestones in order: the Police Action, the Gentlemen&apos;s Agreement, the Mulki Rules, the 1969 agitation, the Six-Point Formula and Article 371D, G.O. 610, the Srikrishna Committee and the Andhra Pradesh Reorganisation Act, 2014. Then read the past year&apos;s news for current events, which this bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make reasoning routine</h3>
              <p>
                Arithmetic and reasoning are half the paper. Series, analogies, coding-decoding, blood relations, directions, syllogisms and arrangements follow a few fixed patterns, so drill them until each takes well under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the arithmetic shortcuts</h3>
              <p>
                Number system, percentages, profit and loss, interest, ratio, partnership, averages, time and work, work and wages, time and distance, clocks, calendars and mensuration are all named in the syllabus. Know conversions such as km/h to m/s (multiply by 5/18) and the formulas for compound interest and areas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know the cost of a wrong answer</h3>
              <p>
                The real paper gives you 200 questions in 3 hours, under a minute each, and a wrong answer costs a fifth of a mark. Because that penalty is small next to a full mark for a right answer, a question where you can rule out even one option is worth attempting. Take a full mock, see which part ate your time, and drill it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Telangana Police SI Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="tgsi" />
        </div>
      </div>

      <SampleQuestionsV2 examId="tgsi" />

      <ExamRelatedTests examId="tgsi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Telangana Police SI Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 236 questions across both parts of the paper.</p>
          <ExamLandingCTA dashboardHref="/telangana-police-si/dashboard" />
        </div>
      </div>
    </div>
  );
}
