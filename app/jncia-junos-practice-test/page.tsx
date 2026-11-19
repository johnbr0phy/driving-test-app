import "@/lib/v2/banks/jncia";
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

const title = "Free JNCIA-Junos Practice Test 2026: JN0-106 Exam Questions";
const metaDescription =
  "Free JNCIA-Junos (JN0-106) practice tests: 186 original questions on Junos OS, the CLI, configuration, monitoring, routing, policy and firewall filters, all explained.";
const description =
  "Free Juniper JNCIA-Junos (JN0-106) practice tests with 186 original questions across Juniper's seven exam objectives: networking fundamentals; Junos OS architecture, the Routing Engine and Packet Forwarding Engine; the CLI, candidate and active configuration, commit and rollback; configuration basics such as login classes, interfaces, groups, NTP, SNMP, syslog and the rescue configuration; operational monitoring and maintenance; routing fundamentals, route preference, routing instances and static routes; and routing policy, firewall filters and unicast RPF.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JNCIA-Junos practice test, JN0-106 practice exam, JN0-106 questions, JNCIA practice test, Junos associate practice test, Juniper certification practice test 2026, free JNCIA practice test, Junos CLI practice questions",
  alternates: {
    canonical: `${siteUrl}/jncia-junos-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jncia-junos-practice-test`,
    images: [{ url: shareImageUrl("jncia"), width: 1200, height: 630, alt: "Tigertest free JNCIA-Junos practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jncia")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Is the JNCIA-Junos exam JN0-105 or JN0-106?",
    a: "JN0-106. Juniper retired JN0-105 on April 5, 2026 and started JN0-106 on April 6, 2026. Both lead to the same JNCIA-Junos certification, which is valid for three years. Many study guides still say JN0-105, so check that yours follows the JN0-106 objectives.",
  },
  {
    q: "How many questions are on the JNCIA-Junos exam?",
    a: "JN0-106 has 65 multiple-choice questions and you have 90 minutes. It is given in English through Pearson VUE, and it is based on Junos OS 21.2.",
  },
  {
    q: "What is the passing score for JN0-106?",
    a: "Juniper does not publish one. You see a pass or fail result as soon as you finish the exam. Aim for a steady 80 percent on these practice tests before you book.",
  },
  {
    q: "What is on the JN0-106 exam?",
    a: "Seven objective areas: networking fundamentals, Junos OS fundamentals, user interfaces, configuration basics, operational monitoring and maintenance, routing fundamentals, and routing policy and firewall filters. Juniper does not publish a weight for each area.",
  },
  {
    q: "Is the Tigertest JNCIA-Junos practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and six of the seven drills are free; the last drill and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JNCIA-Junos JN0-106 Practice Tests",
      description,
      url: `${siteUrl}/jncia-junos-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("jncia"),
      featureList: [
        "186 original JN0-106 practice questions",
        "2 full 65-question practice tests in 90 minutes",
        "7 drills, one per exam objective",
        "Junos CLI commands and output in the questions",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("jncia"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Networking Fundamentals", weight: "10 per test" },
  { name: "Junos OS Fundamentals", weight: "7 per test" },
  { name: "User Interfaces", weight: "10 per test" },
  { name: "Configuration Basics", weight: "11 per test" },
  { name: "Operational Monitoring and Maintenance", weight: "9 per test" },
  { name: "Routing Fundamentals", weight: "9 per test" },
  { name: "Routing Policy and Firewall Filters", weight: "9 per test" },
];

export default function JnciaLandingPage() {

  return (
    <div data-theme="jncia" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JNCIA-Junos Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/jncia/dashboard"
            shortName="JNCIA-Junos"
            subtitle="186 original questions on the seven JN0-106 exam objectives, with Junos commands and output. Free to start, no account needed."
            shots={{ mobile: "/landing/jncia-mobile.png", desktop: "/landing/jncia-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jncia" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Objective</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills, one for each JN0-106 objective: networking, Junos OS, the CLI, configuration basics, monitoring and maintenance, routing, and policy and firewall filters. Questions you miss come back until you have mastered them.
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
                Two 65-question tests in 90 minutes, the real exam&apos;s length and pace. Most questions ask which Junos command, hierarchy or value does a job, and subnetting answers are typed as a number. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the JN0-106 Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Juniper lists seven objective areas for JN0-106, based on Junos OS 21.2, but no weight for each. Every practice test here covers all seven in the split below, so you see the CLI, configuration and routing topics in roughly the proportion they come up.
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
                src={getTigerAsset("jncia", 3)}
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
            How to Pass the JNCIA-Junos Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the candidate and commit model</h3>
              <p>
                Configuration mode edits a candidate, and nothing changes until you commit. Know commit check, commit confirmed, show | compare, rollback 0 to 49, the rescue configuration and the load options cold, because they come up in several objectives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get the architecture straight</h3>
              <p>
                The Routing Engine runs the routing protocols and the CLI and builds the routing table; the Packet Forwarding Engine forwards transit traffic from the forwarding table. Traffic for the device itself is exception traffic and goes to the Routing Engine.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Memorize the route preference values</h3>
              <p>
                Direct 0, static 5, OSPF internal 10, RIP 100, OSPF external 150 and BGP 170, with the lowest value winning. Then learn the default routing policies for each protocol and how a policy chain is read from left to right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice on a lab device and drill your weak area</h3>
              <p>
                Type the commands on a lab router or a virtual Junos image: interfaces, static routes, a policy and a firewall filter on lo0. Tigertest tracks your accuracy by objective, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JNCIA-Junos Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jncia" />
        </div>
      </div>

      <SampleQuestionsV2 examId="jncia" />

      <ExamRelatedTests examId="jncia" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass JNCIA-Junos?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 186 questions across all seven exam objectives.</p>
          <ExamLandingCTA dashboardHref="/jncia/dashboard" />
        </div>
      </div>
    </div>
  );
}
