import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CompTIA A+ Practice Test 2026 - 220-1201 & 220-1202 Exam Prep";
const description =
  "Free CompTIA A+ practice tests with 200 questions weighted to the 220-1201 Core 1 and 220-1202 Core 2 objectives: mobile devices, networking, hardware, virtualization and cloud, hardware and network troubleshooting, operating systems, security, software troubleshooting and operational procedures. Scenario questions with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CompTIA A+ practice test, A+ 220-1201 practice exam, A+ 220-1202 practice questions, CompTIA A+ Core 1 practice test, A+ Core 2 practice test, CompTIA A+ exam prep 2026, free A+ practice questions",
  alternates: {
    canonical: `${siteUrl}/comptia-a-plus-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/comptia-a-plus-practice-test`,
    images: [{ url: "/og/aplus", width: 1200, height: 630, alt: "TigerTest free CompTIA A+ practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/aplus"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free CompTIA A+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-a-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 A+ practice questions",
        "Full practice exam: Core 1 and Core 2, 90 questions each in 90 minutes",
        "4 drills, two per core",
        "Choose-two, matching and ordering items",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the CompTIA A+ exams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each core has up to 90 questions in 90 minutes, mixing multiple choice, multiple response, drag-and-drop and performance-based items. Core 1 (220-1201) passes at 675 of 900 and Core 2 (220-1202) at 700 of 900, and you need both to earn the certification.",
          },
        },
        {
          "@type": "Question",
          name: "Which version of A+ is this for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The current version 15 objectives, 220-1201 and 220-1202, which launched in 2025 and replaced 220-1101 and 220-1102 in September 2025. Domain names and weights match the new objectives.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include performance-based questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Partly. Alongside single-answer and choose-two items, each core includes matching (a table) and ordering items that stand in for performance-based questions. Real PBQs simulate a console or configuration task, which is not modelled here, so pair this bank with hands-on practice in Windows, a home router and a virtual machine.",
          },
        },
        {
          "@type": "Question",
          name: "Should I take Core 1 or Core 2 first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most candidates take Core 1 first because hardware and networking are more concrete, but either order works. The drills here are split by core, two each, so you can prepare for one exam at a time.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest A+ practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The full Core 1 and Core 2 practice exam and all four drills are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Core 1: Hardware & Network Troubleshooting", weight: "28%" },
  { name: "Core 1: Hardware", weight: "25%" },
  { name: "Core 1: Networking", weight: "23%" },
  { name: "Core 1: Mobile Devices", weight: "13%" },
  { name: "Core 1: Virtualization & Cloud", weight: "11%" },
  { name: "Core 2: Operating Systems", weight: "28%" },
  { name: "Core 2: Security", weight: "28%" },
  { name: "Core 2: Software Troubleshooting", weight: "23%" },
  { name: "Core 2: Operational Procedures", weight: "21%" },
];

export default function AplusLandingPage() {
  return (
    <div data-theme="aplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="aplus" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA A+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-a-plus"
            shortName="CompTIA A+"
            subtitle="200 questions weighted to the 220-1201 and 220-1202 objectives. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aplus-mobile.png", desktop: "/landing/aplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aplus" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four drills, two per core: Core 1 mobile, networking and hardware; Core 1 cloud and hardware troubleshooting; Core 2 operating systems and security; and Core 2 software troubleshooting and operational procedures. Questions you miss come back until you have mastered them.
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
                One full practice exam like the real pair: Core 1 (90 questions in 90 minutes), a 10-minute break, then Core 2 (90 in 90), written the CompTIA way: a technician, a symptom, and the thing to do FIRST, NEXT or BEST.
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
                Built on the 2025 A+ Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the domain weighting for each exam, and version 15 (220-1201 and 220-1202) launched in 2025. The practice exam weights each core&apos;s 90 questions in its own proportions, so troubleshooting, hardware, networking, operating systems and security get the most weight.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("aplus", 1)}
                alt="TigerTest mascot"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Spot a Mistake? Tell Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            If a question looks wrong or an objective has changed, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the CompTIA A+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Memorize the troubleshooting methodology in order</h3>
              <p>
                Identify the problem, establish a theory, test the theory, establish a plan, verify full functionality, document. The same six steps (and the seven-step malware removal procedure) decide dozens of FIRST and NEXT questions across both cores.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers</h3>
              <p>
                Ports (22, 25, 53, 80, 110, 143, 443, 445, 3389), private IP ranges, 169.254, cable speeds and distances, USB and SATA speeds, RAID levels and disk counts, the laser printer steps, Wi-Fi standards and channels. The exam tests them as recall and inside scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like the help desk</h3>
              <p>
                The right answer follows policy: back up before changes, question the obvious, escalate when out of scope, quarantine before you remediate, document everything, respect the customer&apos;s data and time. If an option skips a step or risks data, it is a distractor.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain and take both cores</h3>
              <p>
                TigerTest tracks your accuracy by domain. Core 1 passes at 675 and Core 2 at 700 of 900, and you need both to certify. Retake the drill you missed most until you clear 80 percent with room to spare, then expect performance-based items on exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CompTIA A+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the CompTIA A+ exams?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each core has up to 90 questions in 90 minutes, mixing multiple choice, multiple response, drag-and-drop and performance-based items. Core 1 (220-1201) passes at 675 of 900 and Core 2 (220-1202) at 700 of 900, and you need both to earn the certification.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which version of A+ is this for?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The current version 15 objectives, 220-1201 and 220-1202, which launched in 2025 and replaced 220-1101 and 220-1102 in September 2025. Domain names and weights match the new objectives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this include performance-based questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Partly. Alongside single-answer and choose-two items, each core includes matching (a table) and ordering items that stand in for performance-based questions. Real PBQs simulate a console or configuration task, which is not modelled here, so pair this bank with hands-on practice in Windows, a home router and a virtual machine.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Should I take Core 1 or Core 2 first?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Most candidates take Core 1 first because hardware and networking are more concrete, but either order works. The drills here are split by core, two each, so you can prepare for one exam at a time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the TigerTest A+ practice test free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The full Core 1 and Core 2 practice exam and all four drills are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="aplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CompTIA A+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all nine domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-a-plus" />
        </div>
      </div>
    </div>
  );
}
