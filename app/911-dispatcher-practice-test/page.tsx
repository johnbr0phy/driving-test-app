import "@/lib/banks/dispatcher";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "911 Dispatcher Practice Test 2026 - Free Telecommunicator Questions";
const metaDescription =
  "Free 911 dispatcher practice test: 200 original questions on APCO's telecommunicator training standard, NENA call processing, FCC 911 rules, TTY, radio procedure and NIMS. Four 50-question tests, every answer explained.";
const description =
  "Free practice for 911 public safety telecommunicator (dispatcher) certification exams: 200 original multiple-choice questions written from APCO ANS 3.103.3-2025, NENA's 2026 call processing and TTY standards, the FCC's 911 rules and FEMA's NIMS. Four 50-question practice tests and four training sets covering the telecommunicator's role and 911 technology; call answering, processing and accessibility; caller communication and radio procedure; and dispatch operations and incident command.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "911 dispatcher practice test, 911 dispatcher test, emergency dispatcher exam, public safety telecommunicator practice test, apco pst1 practice, telecommunicator certification, 911 call taker test, dispatcher exam questions, 911 dispatcher 2026",
  alternates: {
    canonical: `${siteUrl}/911-dispatcher-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/911-dispatcher-practice-test`,
    images: [{ url: shareImageUrl("dispatcher"), width: 1200, height: 630, alt: "Tigertest free 911 dispatcher practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dispatcher")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What does a 911 telecommunicator exam cover?",
    a: "Most dispatcher certification exams follow the knowledge in APCO ANS 3.103.3-2025, the minimum training standard for public safety telecommunicators: the role, ethics and confidentiality of the job, 911 and location technology, call taking and caller handling, TTY and text-to-911, radio procedure, law enforcement, fire and EMS dispatch, and the telecommunicator's place in NIMS and the Incident Command System. Agencies add their own policies, protocols and maps.",
  },
  {
    q: "Who gives the exam and what score do I need?",
    a: "It depends on where you work. Many agencies send new hires through APCO's Public Safety Telecommunicator 1 course, which ends with a final exam that earns APCO certification, and some states run their own telecommunicator certification. APCO does not publish a question count or pass mark for PST1, and state rules vary by state, so the tests here use a 75% readiness line.",
  },
  {
    q: "What call answering standards should I know?",
    a: "NENA's 2026 call processing standard says 90% of 911 calls shall be answered within 15 seconds and 95% should be answered within 20 seconds. Calls with an imminent threat to life should be ready to dispatch within 60 seconds and other emergencies within 90 seconds. It also covers answering with 9-1-1, verifying the location first, warm transfers and abandoned, silent and misdialed calls.",
  },
  {
    q: "Is this an emergency medical dispatch course?",
    a: "No. Medical call protocols and their codes come from your agency's emergency medical dispatch program, and state certification rules vary by state. This practice covers the general telecommunicator knowledge that every call taker and dispatcher needs, and it does not replace your agency's training.",
  },
  {
    q: "Are these real APCO or state exam questions?",
    a: "No. Every question is original, written by Tigertest from APCO's and NENA's published standards, the FCC's 911 rules, the ADA regulation on 911 access and FEMA's NIMS doctrine. It is practice, not affiliated with APCO International, NENA or any state 911 board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free 911 Dispatcher Practice Test",
      description,
      url: `${siteUrl}/911-dispatcher-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("dispatcher"),
      featureList: [
        "200 911 telecommunicator practice questions",
        "4 practice tests of 50 questions",
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
        classFaqJsonLd("dispatcher"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Role, standards and confidentiality", weight: "12%" },
  { name: "911 technology and location", weight: "14%" },
  { name: "TTY, text and accessibility", weight: "10%" },
  { name: "Call answering and processing", weight: "18%" },
  { name: "Caller communication and classification", weight: "12%" },
  { name: "Radio procedure and phonetics", weight: "12%" },
  { name: "Dispatch operations and resources", weight: "12%" },
  { name: "NIMS and incident command", weight: "10%" },
];

export default function DispatcherLandingPage() {
  return (
    <div data-theme="dispatcher" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free 911 Dispatcher Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/dispatcher/dashboard"
            shortName="911 Dispatcher"
            subtitle="200 questions for 911 telecommunicators and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/dispatcher-mobile.png", desktop: "/landing/dispatcher-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dispatcher" />

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
                Four training sets: role, standards and 911 technology; call answering and accessibility; callers and radio procedure; and dispatch operations and NIMS. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions that mix every topic, with a 75% target. No question appears in more than one test, and every explanation names the standard or rule behind the answer.
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
                Built on APCO and NENA Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                APCO ANS 3.103.3-2025 sets the minimum training for call takers and law enforcement, fire and EMS telecommunicators, and NENA&apos;s 2026 standard sets how 911 calls are answered and processed. Neither publishes exam weights, so each practice test here spreads its 50 questions across eight topics as below. Agency policies, maps and medical protocols are not modelled.
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
                src={getTigerAsset("dispatcher", 3)}
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
            How to Pass Your Dispatcher Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers that are standards</h3>
              <p>
                Answer 90% of 911 calls within 15 seconds, 60 seconds to dispatch an imminent threat, two failed voice attempts before a TTY response, 30 minutes for Public Safety Pool station identification in continuous operation: these figures come straight from NENA, APCO and the FCC, and questions test them exactly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know every call type by its definition</h3>
              <p>
                Abandoned, disconnected, silent, non-responsive, misdialed, misrouted and redundant calls each have their own handling. Learn what separates them, such as whether the call was answered or whether you can hear background noise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the radio alphabet and plain language</h3>
              <p>
                Say plates and names in the ICAO phonetic alphabet until it is automatic, and learn when NIMS expects plain language instead of codes. Radio questions reward the exact word, such as Juliett, Quebec, Tree and Fife.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Map ICS before you need it</h3>
              <p>
                Draw the Incident Command System: the Incident Commander, the Command Staff (PIO, Safety and Liaison Officers) and the four General Staff sections. Then add Unified Command, staging areas and the EOC. Aim for 80% or better on every practice test here before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          911 Dispatcher Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="dispatcher" />
        </div>
      </div>

      <ExamSampleQuestions examId="dispatcher" />

      <ExamRelatedTests examId="dispatcher" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Dispatcher Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on call taking, 911 technology, radio and dispatch.</p>
          <ExamLandingCTA dashboardHref="/dispatcher/dashboard" />
        </div>
      </div>
    </div>
  );
}
