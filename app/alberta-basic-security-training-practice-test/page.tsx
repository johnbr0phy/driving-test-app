import "@/lib/banks/caabguard";
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

const title = "Free Alberta Security Guard Practice Test 2026 - ABST Exam Questions";
const metaDescription =
  "Free practice for Alberta's provincial security exam after the Alberta Basic Security Training (ABST) course: 200 original questions on the Security Services and Investigators Act, citizen's arrest, trespass, use of force, patrol, notebooks and emergencies. Four 50-question mock tests at the 80% pass mark, every answer explained.";
const description =
  "Free practice for the Alberta Basic Security Training (ABST) provincial exam, needed for a security worker licence in Alberta: 200 original questions across the seven modules of the ABST Participant Manual, with the law written from the current Security Services and Investigators Act and regulations, the Trespass to Premises Act, the Petty Trespass Act and the Criminal Code. Four 50-question mock tests at the real 80% pass mark, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "abst, abst exam, abst practice test, alberta basic security training, alberta security guard test, alberta security licence, alberta security guard exam, security services and investigators act, alberta security exam questions, alberta security guard licence",
  alternates: {
    canonical: `${siteUrl}/alberta-basic-security-training-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/alberta-basic-security-training-practice-test`,
    images: [{ url: shareImageUrl("caabguard"), width: 1200, height: 630, alt: "Tigertest free Alberta security guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caabguard")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ABST exam?",
    a: "ABST is the Alberta Basic Security Training course, and the ABST exam is the provincial final exam you write at the end of it. Alberta requires security workers to complete an approved course, the ABST course or an accredited basic security course, with an approved training provider, and to score 80% or higher on the provincial final exam before they can be licensed under the Security Services and Investigators Act. A Ministry or certified proctor runs and marks the exam.",
  },
  {
    q: "What score do I need to pass?",
    a: "You need 80% or higher. Alberta does not publish the number of questions or the time limit, so ask your training provider. Under the Ministry's exam process, a candidate who fails may rewrite the exam as many times as needed for up to two years from the start of their training course; alberta.ca says to contact Security Programs about rewrites. Each mock test here has 50 questions with 40 to pass.",
  },
  {
    q: "Who needs an Alberta security licence?",
    a: "Anyone paid to patrol, guard or provide security for another person or their property, or to prevent loss in plain clothes in a store, needs a licence. Alberta's security services licence covers security guards, loss prevention workers, patrol dog handlers, alarm responders and executive security. You must be over 18, eligible to work in Canada, at Canadian Language Benchmark 5 in English, and have no criminal record or outstanding charges. A valid licence from another Canadian province or territory can also qualify you; check with Security Programs.",
  },
  {
    q: "What does the exam cover?",
    a: "The ABST Participant Manual has seven modules: the security industry and the Security Services and Investigators Act; the Canadian legal system, including the Charter, citizen's arrest, search, trespass and use of force; basic security procedures such as patrol, access control, crowds and traffic; communication; notebooks, reports and evidence; alarms, fire and bomb threats; and health and safety. Alberta publishes no topic weights, so each mock test spreads the modules across eight topics.",
  },
  {
    q: "Are these the real ABST exam questions?",
    a: "No. Every question is original, written by Tigertest from the Government of Alberta's ABST Participant Manual and the current text of the Security Services and Investigators Act and its regulations, the Trespass to Premises Act, the Petty Trespass Act and the Criminal Code. The provincial exam is not published and none of it was used. This is free revision, not affiliated with the Government of Alberta, and it does not replace the course. Rules change, so check alberta.ca and your training provider.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Alberta Security Guard Practice Test",
      description,
      url: `${siteUrl}/alberta-basic-security-training-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("caabguard", "CAD"),
      featureList: [
        "200 Alberta security exam practice questions",
        "4 mock tests of 50 questions",
        "4 training sets by topic",
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
        classFaqJsonLd("caabguard"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Security industry, licensing and conduct", weight: "9 per test" },
  { name: "The Charter, arrest, search and trespass", weight: "8 per test" },
  { name: "Use of force", weight: "5 per test" },
  { name: "Observation, patrol and access control", weight: "8 per test" },
  { name: "Communication and interviews", weight: "6 per test" },
  { name: "Notebooks, reports and evidence", weight: "6 per test" },
  { name: "Alarms, fire and bomb threats", weight: "5 per test" },
  { name: "Health and safety on the job", weight: "3 per test" },
];

export default function AlbertaSecurityLandingPage() {
  return (
    <div data-theme="caabguard" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Alberta Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/alberta-security-guard/dashboard"
            shortName="ABST"
            subtitle="200 Alberta ABST questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/caabguard-mobile.png", desktop: "/landing/caabguard-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caabguard" />

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
                Four training sets: the security industry and licensing, the law and use of force, patrol and communication, and notes, emergencies and safety. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix all eight topics, at the provincial exam&apos;s 80% pass mark, 40 out of 50. No question appears in more than one test, and every answer comes with a short explanation from Alberta law and the ABST manual.
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
                Built on the Seven ABST Modules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Alberta publishes no topic weights, so each 50-question test spreads the manual&apos;s seven modules across eight topics as below. The law questions follow the current Security Services and Investigators Act and regulations, the Trespass to Premises Act, the Petty Trespass Act and the Criminal Code.
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
                src={getTigerAsset("caabguard", 3)}
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
            How to Pass the ABST Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your arrest powers exactly</h3>
              <p>
                A licence gives you no police powers. Learn section 494 of the Criminal Code: anyone may arrest a person found committing an indictable offence, and the owner or someone acting for the owner may arrest a person found committing a criminal offence on or in relation to the property. Every arrested person goes to the police forthwith.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the licence rules once</h3>
              <p>
                Report an arrest, a charge or a lost licence to the Registrar in writing within 24 hours and other changes within 30 days. Carry your licence and show it on request, never call yourself a security officer, and never imply you do police work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the notebook and radio skills</h3>
              <p>
                Write in pen, strike errors with one line and initial them, leave no blank lines, and use the 24-hour clock and the phonetic alphabet. Record facts, not opinions, because your notes may be read in court.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for at least 40 out of 50 on every mock test, since the provincial exam needs 80%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Alberta Security Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="caabguard" />
        </div>
      </div>

      <ExamSampleQuestions examId="caabguard" />

      <ExamRelatedTests examId="caabguard" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the ABST Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all seven ABST modules.</p>
          <ExamLandingCTA dashboardHref="/alberta-security-guard/dashboard" />
        </div>
      </div>
    </div>
  );
}
