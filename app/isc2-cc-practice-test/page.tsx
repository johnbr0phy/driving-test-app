import "@/lib/v2/banks/isc2cc";
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

const title = "Free ISC2 CC Practice Test 2026";
const metaDescription =
  "Free ISC2 Certified in Cybersecurity (CC) practice tests: 224 original questions on security principles, governance, IAM, networks and cloud, and incident response.";
const description =
  "Free ISC2 Certified in Cybersecurity (CC) practice tests with 224 original questions weighted to the CC exam outline effective September 1, 2026: security principles, risk and the ISC2 Code of Ethics, security governance with business continuity and disaster recovery, identity and access management, network and cloud security, data security and encryption, and security operations and incident response.";

const faqs = [
  {
    q: "How many questions are on the ISC2 CC exam?",
    a: "The CC exam is computerized adaptive testing (CAT) with 100 to 125 items in 2 hours, per the ISC2 CC exam outline effective September 1, 2026. Items are multiple choice plus advanced item types. Because it is adaptive, you answer in order and cannot go back to change an answer.",
  },
  {
    q: "What is the passing score for the CC exam?",
    a: "You need 700 out of 1000 points. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the ISC2 CC exam?",
    a: "Five domains in the outline effective September 1, 2026: Security Principles 24 percent, Security Governance 17.3 percent, Identity and Access Management (IAM) Concepts 20 percent, Networking and Cloud Security Concepts 21.3 percent, and Security Operations and Incident Response 17.3 percent.",
  },
  {
    q: "Do I need work experience for the CC?",
    a: "No. ISC2 lists no work experience requirement for Certified in Cybersecurity. It is ISC2's entry-level certification for people starting in a cybersecurity role.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 100 questions in 100 minutes, answered in order with no going back, like the real exam. It is a linear mock, not adaptive. Most items are multiple choice, with a few choose-two, ordering and matching items standing in for the advanced item types. The questions are original, not ISC2's.",
  },
  {
    q: "Is the Tigertest CC practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the first drills are free; the later drills and practice tests are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ISC2 CC practice test, Certified in Cybersecurity practice exam, free CC exam questions, ISC2 CC exam prep 2026, ISC2 certified in cybersecurity practice questions, CC cybersecurity practice test",
  alternates: {
    canonical: `${siteUrl}/isc2-cc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/isc2-cc-practice-test`,
    images: [{ url: shareImageUrl("isc2cc"), width: 1200, height: 630, alt: "Tigertest free ISC2 CC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("isc2cc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ISC2 CC Practice Tests",
      description,
      url: `${siteUrl}/isc2-cc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("isc2cc"),
      featureList: [
        "224 original ISC2 CC practice questions",
        "2 full 100-question practice tests in 100 minutes",
        "8 drills across the five CC domains",
        "Ordering, matching and choose-two items",
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
        classFaqJsonLd("isc2cc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Security Principles", weight: "24%" },
  { name: "Security Governance", weight: "17.3%" },
  { name: "Identity and Access Management (IAM) Concepts", weight: "20%" },
  { name: "Networking and Cloud Security Concepts", weight: "21.3%" },
  { name: "Security Operations and Incident Response", weight: "17.3%" },
];

export default function Isc2CcLandingPage() {
  return (
    <div data-theme="isc2cc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ISC2 CC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/isc2-cc/dashboard"
            shortName="ISC2 CC"
            subtitle="224 Certified in Cybersecurity questions weighted to the 2026 outline. Free to start, no account needed."
            shots={{ mobile: "/landing/isc2cc-mobile.png", desktop: "/landing/isc2cc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="isc2cc" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Concepts and controls, risk and ethics, security governance, identity and access, network security, architecture and cloud, data security, and operations and response. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 100-question tests in 100 minutes, answered in order with no going back, like the real adaptive exam. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CC Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISC2 publishes the CC domains and their average weights in its exam outline. Every practice test follows the outline effective September 1, 2026, including GRC, key risk indicators, Zero Trust, cloud shared responsibility, quantum-resistant cryptography and red, blue and purple teaming.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("isc2cc", 3)}
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
            How to Pass the ISC2 CC
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the vocabulary cold</h3>
              <p>
                Many CC questions turn on one term: integrity or availability, threat or vulnerability, RTO or RPO, DAC or MAC, purge or destroy. Make sure you can tell the close pairs apart from a one-line scenario.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think like a manager, not a technician</h3>
              <p>
                The exam often asks for the best or first step. Favor the answer that protects people and the business, follows policy and fits the risk, over the one that is most technical.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice without going back</h3>
              <p>
                The real exam is adaptive, so you cannot return to a question. Read each one fully, commit to an answer and move on. These practice tests run the same way.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ISC2 CC Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="isc2cc" />
        </div>
      </div>

      <SampleQuestionsV2 examId="isc2cc" />

      <ExamRelatedTests examId="isc2cc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ISC2 CC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 224 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/isc2-cc/dashboard" />
        </div>
      </div>
    </div>
  );
}
