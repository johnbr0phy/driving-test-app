import "@/lib/banks/ukhs2";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Level 2 Health and Safety Practice Test 2026 - Free UK Workplace Quiz with Answers";
const metaDescription =
  "Free Level 2 Health and Safety in the Workplace practice: 200 original questions on duties and the law, risk assessment, PPE, manual handling, COSHH, fire, first aid and RIDDOR, every answer explained.";
const description =
  "Free practice for the UK Level 2 Award in Health and Safety in the Workplace: 200 original questions on law, duties and enforcement, training and safety signs, hazards and risk assessment, the risk control hierarchy and PPE, manual handling and display screen equipment, slips, work at height, machinery and vehicles, substances, electricity and noise, and fire, first aid and accidents. Four 50-question mock tests with a 64 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "level 2 health and safety practice test, level 2 award in health and safety in the workplace questions, health and safety mock exam UK, RSPH level 2 health and safety, Highfield level 2 health and safety, risk assessment quiz, COSHH RIDDOR questions",
  alternates: {
    canonical: `${siteUrl}/level-2-health-and-safety-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/level-2-health-and-safety-practice-test`,
    images: [{ url: shareImageUrl("ukhs2"), width: 1200, height: 630, alt: "Tigertest free Level 2 health and safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukhs2")],
    title,
    description: metaDescription,
  },
};

const FAQS = [
  {
    q: "What is the Level 2 health and safety certificate?",
    a: "It is the usual name for a Level 2 Award in Health and Safety in the Workplace, a short Ofqual-regulated qualification for anyone in work or about to start. Awarding bodies such as RSPH, Highfield and AIM offer it, with roughly 6 to 10 guided learning hours. It covers employer and employee duties, risk assessment, common hazards and their controls, and what to do after accidents and emergencies.",
  },
  {
    q: "How is the Level 2 health and safety exam assessed?",
    a: "Each awarding body sets its own multiple-choice exam. RSPH's Level 2 Award in Health and Safety in the Workplace, for example, is 25 questions in 40 minutes, and a candidate passes with at least 16 out of 25 (64 percent). Check your own course's format with your trainer. The mock tests here have 50 questions each and use a 64 percent pass line.",
  },
  {
    q: "Which laws does the course cover?",
    a: "Mainly the Health and Safety at Work etc. Act 1974 and the regulations made under it: the Management of Health and Safety at Work Regulations 1999 (risk assessment), COSHH, RIDDOR, the Manual Handling, Display Screen Equipment, Work at Height, PPE, Noise and Safety Signs Regulations, plus fire safety law and first aid. Northern Ireland has its own equivalent law, enforced by HSENI.",
  },
  {
    q: "Is a Level 2 health and safety certificate a legal requirement?",
    a: "No. The law requires employers to give suitable health and safety information and training, when people start and when risks change. It does not name a qualification, but a Level 2 award is a common way to show that basic training has been given.",
  },
  {
    q: "Is this an official course or certificate?",
    a: "No. Every question is written by Tigertest from Great Britain health and safety law and HSE guidance that the Level 2 qualifications are built on, so it tests the same knowledge without copying any awarding body's exam. Tigertest is not affiliated with RSPH, Highfield, AIM, the HSE or any awarding body, and it is revision practice, not a certificate.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Level 2 Health and Safety Practice Test",
      description,
      url: `${siteUrl}/level-2-health-and-safety-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukhs2", "GBP"),
      featureList: [
        "200 Level 2 health and safety practice questions",
        "4 mock tests of 50 questions with a 64% pass line",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("ukhs2"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Law, Duties & Enforcement", weight: "14%" },
  { name: "Training, Consultation & Signs", weight: "10%" },
  { name: "Hazards & Risk Assessment", weight: "14%" },
  { name: "Risk Control Hierarchy & PPE", weight: "10%" },
  { name: "Manual Handling & DSE", weight: "12%" },
  { name: "Slips, Height, Machinery & Vehicles", weight: "12%" },
  { name: "Substances, Electricity & Noise", weight: "14%" },
  { name: "Fire, First Aid & Accidents", weight: "14%" },
];

export default function Level2HealthSafetyLandingPage() {
  return (
    <div data-theme="ukhs2" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Level 2 Health and Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uk-level-2-health-and-safety/dashboard"
            shortName="Level 2 Health and Safety"
            subtitle="200 questions on workplace duties, risk assessment, hazards, fire and first aid. Free to start, no account needed."
            shots={{ mobile: "/landing/ukhs2-mobile.png", desktop: "/landing/ukhs2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukhs2" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets by topic, from Duties, Law &amp; Communication to Substances, Accidents &amp; Fire. Master a topic, then take a test. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests covering every learning outcome, with a 64 percent pass line like RSPH&apos;s 16 out of 25, and an explanation of the right answer on every question.
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
                Built on the Level 2 Health and Safety in the Workplace Unit
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Level 2 unit has four outcomes: roles and responsibilities for health, safety and welfare, how risk assessment works, how to identify and control common workplace hazards, and what to do after accidents and incidents. No awarding body publishes how many questions each topic gets, so the mock tests here spread the weight across all four outcomes. Colleges, employers and trainers who run the course can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
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
                src={getTigerAsset("ukhs2", 1)}
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
            How to Pass Level 2 Health and Safety
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who does what</h3>
              <p>
                Employers protect staff and others so far as is reasonably practicable, write a policy once they have five or more employees, assess risks and provide training and PPE free of charge. Employees take reasonable care, co-operate, use equipment as trained and report hazards. Learn which body enforces where, and what improvement and prohibition notices do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the risk control hierarchy</h3>
              <p>
                Eliminate, substitute, engineer, then administrative controls, with PPE last because it only protects the wearer. Many questions give a control and ask which level it is, or ask which option is most effective.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Fix the key figures and colours</h3>
              <p>
                Safety sign colours and shapes, extinguisher label colours, the fire triangle, noise action values of 80 and 85 dB(A), the 1 in 4 ladder rule, TILE for manual handling, and the RIDDOR timescales for reporting and recording injuries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each mock test, drill the questions you missed and retrain your weakest topic before you sit the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Level 2 Health and Safety Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ukhs2" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukhs2" />

      <ExamRelatedTests examId="ukhs2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Level 2 Health and Safety?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every learning outcome.</p>
          <ExamLandingCTA dashboardHref="/uk-level-2-health-and-safety/dashboard" />
        </div>
      </div>
    </div>
  );
}
