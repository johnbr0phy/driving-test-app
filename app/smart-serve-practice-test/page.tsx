import "@/lib/banks/smartserve";
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

const title = "Free Smart Serve Practice Test 2026 - Ontario Responsible Alcohol Service";
const metaDescription =
  "Free practice for the Smart Serve Ontario test: 200 original questions on Ontario's liquor law, the legal age and checking ID, standard drinks, recognizing intoxication, refusing service and service hours. Six 33-question mock tests at the 80% pass mark, every answer explained.";
const description =
  "Free practice for Smart Serve, the responsible alcohol service certification anyone who serves, sells or delivers liquor in Ontario needs: 200 original questions written from the Liquor Licence and Control Act, 2019, its regulations and the AGCO's guidance for licensees. Six real-length mock tests of 33 questions at the 80% pass mark, and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "smart serve, smart serve test, smart serve practice test, smart serve ontario, smart serve questions, smart serve answers, smart serve exam, ontario bartender certification, ontario alcohol server training, agco server training",
  alternates: {
    canonical: `${siteUrl}/smart-serve-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/smart-serve-practice-test`,
    images: [{ url: shareImageUrl("smartserve"), width: 1200, height: 630, alt: "Tigertest free Smart Serve practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("smartserve")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Who needs Smart Serve in Ontario?",
    a: "The AGCO's standards require every person involved in the sale, service, sampling or delivery of liquor, or in taking orders for it, to hold a valid certificate from a training course approved by the AGCO Board, along with security staff the licensee employs. Smart Serve is the program approved for all liquor licensees and their staff, including bars, restaurants, events, delivery and retail stores. Retail-only programs cover licensed retail stores only.",
  },
  {
    q: "What is the Smart Serve test like?",
    a: "Smart Serve says the Full Course final test has 33 multiple-choice questions, randomly generated, taken in one sitting of about 30 minutes, and you need at least 80% to pass. Each purchase includes two attempts, and every final test is proctored online with a webcam and a valid government-issued photo ID. The Retail course test has 20 questions. Course access ends 30 days after purchase. Check smartserve.ca for the current details.",
  },
  {
    q: "How long is a certificate valid?",
    a: "The AGCO says all liquor training certifications must be renewed every five years. Once a certificate expires you must recertify or get a new certificate from another Board-approved program that fits your job before you keep working with liquor.",
  },
  {
    q: "What does this practice test cover?",
    a: "Smart Serve does not publish topic weights, so these tests follow what the AGCO tells licensees and staff: Ontario's liquor law and the AGCO, the legal age of 19 and checking ID, standard drinks and how alcohol affects the body, the signs of intoxication, preventing intoxication and refusing service, the hours of sale and service, and retail, delivery and special events. Each 33-question test mixes all seven topics.",
  },
  {
    q: "Are these the real Smart Serve questions?",
    a: "No. Every question is original, written by Tigertest from the Liquor Licence and Control Act, 2019 as quoted by the AGCO, the Registrar's Interim Standards and Requirements for Liquor, AGCO information sheets, and Health Canada and Canadian Centre on Substance Use and Addiction guidance on alcohol. No Smart Serve course material or test question was used. Tigertest is not affiliated with Smart Serve Ontario or the AGCO, and this practice does not replace the course or give you a certificate.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Smart Serve Practice Test",
      description,
      url: `${siteUrl}/smart-serve-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("smartserve"),
      featureList: [
        "200 Smart Serve practice questions",
        "6 mock tests of 33 questions",
        "5 training sets by topic",
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
  { name: "Liquor law, the AGCO and liability", weight: "5 per test" },
  { name: "Legal age and checking ID", weight: "6 per test" },
  { name: "Alcohol and the body", weight: "5 per test" },
  { name: "Recognizing intoxication", weight: "6 per test" },
  { name: "Preventing intoxication and refusing service", weight: "6 per test" },
  { name: "Hours and liquor on the premises", weight: "3 per test" },
  { name: "Retail, delivery and events", weight: "2 per test" },
];

export default function SmartServeLandingPage() {
  return (
    <div data-theme="smartserve" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Smart Serve Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/smart-serve/dashboard"
            shortName="Smart Serve"
            subtitle="200 Smart Serve questions and six 33-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/smartserve-mobile.png", desktop: "/landing/smartserve-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="smartserve" />

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
                Five training sets: liquor law and service hours, legal age, ID and retail sales, alcohol and the body, recognizing intoxication, and preventing intoxication and refusing service. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Six Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six tests of 33 questions, the length of the real final test, mixing all seven topics with the same 80% target. No question appears in more than one test, and every answer comes with a short explanation from Ontario law and AGCO guidance.
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
                Built on Ontario&apos;s Liquor Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Smart Serve publishes no topic weights, so each 33-question test spreads the rules the AGCO expects licensees and staff to know across seven topics as below. Health facts follow Health Canada&apos;s standard drink and Canada&apos;s Guidance on Alcohol and Health.
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
                src={getTigerAsset("smartserve", 3)}
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
            How to Pass Smart Serve
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the numbers that never change</h3>
              <p>
                The legal drinking age is 19, and anyone handling alcohol at work must be 18. Licensed establishments sell and serve from 9 a.m. to 2 a.m., and every sign of liquor is cleared 45 minutes after the end time. A Canadian standard drink is 17.05 mL of pure alcohol: a 341 mL beer at 5%, a 142 mL glass of wine at 12% or a 43 mL shot at 40%.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Check ID the same way every time</h3>
              <p>
                Ask anyone who appears under 19. Valid ID is government-issued, current, and shows a photo and date of birth. Hold the physical card, never a photo on a phone, compare the face, and ask a question or a second ID when in doubt. No ID means no sale.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the signs and what each level means</h3>
              <p>
                One sign means monitor and offer food or water; a few signs mean keep watching and slow the pace; several signs mean stop serving and make sure the guest gets home safely. Signs can appear in any order and can come from alcohol, cannabis or other drugs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the five training sets first, then take the mock tests. Aim for at least 27 of 33 on every mock test, which clears the 80% mark, and keep working through the official course, because only the real final test gives you a certificate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Smart Serve Frequently Asked Questions
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

      <ExamSampleQuestions examId="smartserve" />

      <ExamRelatedTests examId="smartserve" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Smart Serve?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across seven topics of Ontario&apos;s liquor rules.</p>
          <ExamLandingCTA dashboardHref="/smart-serve/dashboard" />
        </div>
      </div>
    </div>
  );
}
