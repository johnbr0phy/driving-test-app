import "@/lib/banks/oacp";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;
const url = `${siteUrl}/oacp-certificate-practice-test`;

const title = "Free OACP Certificate Practice Test 2026 - Ontario Police Exam";
const metaDescription =
  "Free practice for the OACP Certificate, the Ontario police constable pre-screening test: 200 original questions on spelling, vocabulary, punctuation, grammar, police problem-solving and word problems, four practice tests and a timed 74-question, 35-minute mock.";
const description =
  "Free practice for the online assessment of the OACP Certificate, which most Ontario police services require before you apply as a constable: 200 original questions in the shape of Part B, 44 language questions and 30 police problem-solving questions in 35 minutes. Four 50-question practice tests, a timed full-length mock and five training sets, every answer explained.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "oacp certificate, oacp test, oacp practice test, ontario police test, canadian police test, police constable test ontario, opp test, toronto police test, sigma police test, police pre-screening ontario, constable selection system",
  alternates: { canonical: url },
  openGraph: {
    title,
    description: metaDescription,
    url,
    images: [{ url: shareImageUrl("oacp"), width: 1200, height: 630, alt: "Tigertest free OACP Certificate practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("oacp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the OACP Certificate?",
    a: "The OACP Certificate is the pre-screening that most Ontario police services, including the OPP, ask for before you apply as a police constable. The Ontario Association of Chiefs of Police sells and runs it. It has an online, proctored assessment, a 14-day fitness log, and vision and hearing tests by specialists, and it is valid for one year. Requirements vary by service, so check the services you plan to apply to.",
  },
  {
    q: "What is on the online assessment?",
    a: "Part B has 74 multiple-choice questions in 35 minutes. Section A has 44 questions on spelling, vocabulary, punctuation and grammar, and section B has 30 questions on police problem-solving. The OACP says the old quantitative section is gone: the only math is basic word problems, and calculators are not allowed, though blank paper is. Part C is a personality questionnaire with no time limit, taken in the same sitting.",
  },
  {
    q: "What score do I need?",
    a: "There is no pass mark. You do not receive your results: they go to the police services you apply to, which compare you with other applicants. Unanswered questions are not scored and wrong answers carry a penalty, so the OACP advises against blind guessing. Tigertest uses 70% as a readiness target, and the timed mock runs 74 questions in 35 minutes like the real Part B.",
  },
  {
    q: "How long is the certificate valid, and can I retest?",
    a: "The OACP Certificate is valid for one year from the date it is issued. The OACP lets you retest as early as ten months after issue, through its re-testing package. The vision and hearing medical package is valid for two years.",
  },
  {
    q: "Are these the real OACP questions?",
    a: "No. Every question is original, written by Tigertest from the OACP's description of Part B. The OACP publishes no sample questions, and none from the real assessment or any prep company were used. The problem-solving questions give you every rule and fact you need, so they test reasoning, not knowledge of the law. This is free practice, not affiliated with the Ontario Association of Chiefs of Police.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free OACP Certificate Practice Test",
      description,
      url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("oacp", "CAD"),
      featureList: [
        "200 OACP Part B practice questions",
        "4 practice tests of 50 questions",
        "A timed 74-question, 35-minute mock",
        "5 training sets by topic",
        "Instant feedback with explanations",
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
        classFaqJsonLd("oacp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Spelling", weight: "8 per test" },
  { name: "Vocabulary", weight: "8 per test" },
  { name: "Punctuation and capitals", weight: "7 per test" },
  { name: "Grammar", weight: "7 per test" },
  { name: "Applying rules and policies", weight: "7 per test" },
  { name: "Reading reports and statements", weight: "7 per test" },
  { name: "Word problems", weight: "6 per test" },
];

export default function OacpLandingPage() {
  return (
    <div data-theme="oacp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free OACP Certificate Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/oacp-certificate/dashboard"
            shortName="OACP"
            subtitle="200 questions for the Ontario police pre-screening test, with a timed 74-question mock. Free to start, no account needed."
            shots={{ mobile: "/landing/oacp-mobile.png", desktop: "/landing/oacp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="oacp" />

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
                Five training sets: spelling, vocabulary, punctuation and grammar, police problem-solving, and word problems. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests and a Timed Mock</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions keep the real 44 to 30 balance of language and problem-solving. Then a full-length mock runs 74 questions on a 35-minute clock, like Part B. Every answer comes with a short explanation.
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
                Built on the Two Sections of Part B
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Part B has 44 language questions and 30 police problem-solving questions. The OACP does not break the sections down further, so each 50-question test splits them as below. The personality questionnaire (Part C) has no right answers, so it is not practised here.
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
                src={getTigerAsset("oacp", 3)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2>
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
            How to Prepare for the OACP Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work on speed</h3>
              <p>
                74 questions in 35 minutes is under 30 seconds each. Take the timed mock at least once so the pace is not a surprise on the day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the words reports trip on</h3>
              <p>
                Most of Part B is language. Words such as surveillance, harassment and occurrence, and pairs such as affect and effect, come up in every report, so drill the spelling and vocabulary sets until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the rule, then the situation</h3>
              <p>
                Problem-solving questions give you a policy or a report and ask what follows from it. Answer from what the question says, not from what you think the law is, and watch for words such as only, unless and both.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not guess blindly</h3>
              <p>
                Wrong answers carry a penalty and blank ones are not scored, so the OACP advises against blind guessing. If you can rule out two choices, an answer is usually worth giving; if you have no idea, move on.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          OACP Certificate Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="oacp" />
        </div>
      </div>

      <ExamSampleQuestions examId="oacp" />

      <ExamRelatedTests examId="oacp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the OACP Assessment?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across both sections of Part B.</p>
          <ExamLandingCTA dashboardHref="/oacp-certificate/dashboard" />
        </div>
      </div>
    </div>
  );
}
