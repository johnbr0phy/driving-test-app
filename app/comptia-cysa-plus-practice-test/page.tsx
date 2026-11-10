import "@/lib/v2/banks/cysa";
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

const title = "Free CompTIA CySA+ Practice Test 2026 (CS0-004)";
const metaDescription =
  "Free CySA+ CS0-004 practice tests: 194 original questions on logs, threat hunting, vulnerability scans, CVSS, incident response and reporting, all explained.";
const description =
  "Free CompTIA CySA+ (CS0-004) practice tests with 194 original questions weighted to the exam objectives: logging, SIEM and EDR, indicators of compromise, threat intelligence and hunting, vulnerability scanning and prioritization with CVSS, EPSS and KEV, the incident response life cycle and evidence handling, and vulnerability and incident reporting.";

const faqs = [
  {
    q: "How many questions are on the CySA+ exam?",
    a: "The CompTIA CySA+ CS0-004 exam has a maximum of 85 questions in 165 minutes. Most are multiple choice with one or more answers, plus performance-based questions where you analyze logs, scan output or an incident in a simulated environment.",
  },
  {
    q: "What is the passing score for CySA+?",
    a: "You need 750 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the CySA+ CS0-004 exam?",
    a: "Four domains: Security Operations 34 percent, Vulnerability Management 26 percent, Incident Response and Management 24 percent, and Reporting and Communication 16 percent. Compared with CS0-003, incident response gained weight and vulnerability management lost some.",
  },
  {
    q: "Should I study for CS0-003 or CS0-004?",
    a: "CS0-004 launched on June 23, 2026 and the English CS0-003 exam retires on December 22, 2026. If your exam is after that date, or you have not booked yet, study for CS0-004. Most of the analyst skills carry over between the two.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 85 questions in 165 minutes with free navigation and flagging, like the real exam. Log excerpts, choose-two, matching and ordering items stand in for the performance-based questions. Simulated labs are not included.",
  },
  {
    q: "Is the Tigertest CySA+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the final drill and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CySA+ practice test, CompTIA CySA+ CS0-004 practice exam, free CySA+ questions, CySA+ exam prep 2026, CS0-003 practice test, CySA+ sample questions, cybersecurity analyst practice exam",
  alternates: {
    canonical: `${siteUrl}/comptia-cysa-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-cysa-plus-practice-test`,
    images: [{ url: shareImageUrl("cysa"), width: 1200, height: 630, alt: "Tigertest free CompTIA CySA+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cysa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA CySA+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-cysa-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cysa"),
      featureList: [
        "194 original CySA+ practice questions",
        "2 full 85-question practice tests in 165 minutes",
        "8 drills covering all four CS0-004 domains",
        "Log reading, choose-two, matching and ordering items",
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
        classFaqJsonLd("cysa"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Security Operations", weight: "34%" },
  { name: "Vulnerability Management", weight: "26%" },
  { name: "Incident Response and Management", weight: "24%" },
  { name: "Reporting and Communication", weight: "16%" },
];

export default function CysaPlusLandingPage() {
  return (
    <div data-theme="cysa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA CySA+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-cysa-plus/dashboard"
            shortName="CySA+"
            subtitle="194 original questions weighted to the CS0-004 exam objectives, with log excerpts, matching and ordering items. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cysa-mobile.png", desktop: "/landing/cysa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cysa" />

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
                Two drills per domain: architecture and automation, threats and hunting, scanning, prioritizing vulnerabilities, frameworks and preparation, handling an incident, and vulnerability and incident reporting. Questions you miss come back until you have mastered them.
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
                Two 85-question tests in 165 minutes with flagging and review, like the real exam. Read logs and scan output, match tools to tasks and put response steps in order. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CS0-004 Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the domain weighting for CySA+. Every practice test follows it, including the CS0-004 material on cloud and hybrid environments, automation, AI in security operations and the heavier incident response domain.
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
                src={getTigerAsset("cysa", 1)}
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
            How to Pass CySA+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read logs and output, not just definitions</h3>
              <p>
                CySA+ is an analyst exam. Many questions give you a firewall log, an email header, Nmap or scanner output, or a process list and ask what it shows. Practice spotting beaconing, failed SPF and DKIM checks, odd parent processes and open services quickly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn to prioritize vulnerabilities</h3>
              <p>
                Know what CVSS base, threat and environmental metrics mean, what EPSS and the CISA Known Exploited Vulnerabilities catalog add, and why an exposed, exploited flaw on a critical asset goes first even with a lower score.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the incident response life cycle in order</h3>
              <p>
                Incident response is now about a quarter of the exam. Know which phase a step belongs to, the order of volatility, chain of custody, and when to contain before you eradicate. Map attacker actions to the Kill Chain, the Diamond Model and MITRE ATT&amp;CK.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by area. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. On the real exam, flag the performance-based questions and come back to them once the multiple choice is done.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CySA+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cysa" />
        </div>
      </div>

      <SampleQuestionsV2 examId="cysa" />

      <ExamRelatedTests examId="cysa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CySA+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 194 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-cysa-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
