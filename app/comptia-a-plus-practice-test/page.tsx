import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

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
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
        "4 practice tests weighted to the 220-1201 and 220-1202 objectives",
        "Training sets for every domain",
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
            text: "No. Everything here is four-option single answer, which is most of the real exam. Performance-based items simulate a console or configuration task, so pair this bank with hands-on practice in Windows, a home router and a virtual machine.",
          },
        },
        {
          "@type": "Question",
          name: "Should I take Core 1 or Core 2 first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most candidates take Core 1 first because hardware and networking are more concrete, but either order works. The training sets here are split by core, so you can prepare for one exam at a time.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest A+ practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
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
    <div data-theme="aplus" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CompTIA A+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-a-plus/dashboard"
            shortName="CompTIA A+"
            subtitle="200 questions weighted to the 220-1201 and 220-1202 objectives. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aplus-mobile.png", desktop: "/landing/aplus-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Four sets covering both cores: Core 1 mobile, networking and hardware; Core 1 cloud and hardware troubleshooting; Core 2 operating systems and security; and Core 2 software troubleshooting and operational procedures. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests, half Core 1 and half Core 2, written the CompTIA way: a technician, a symptom, and the thing to do FIRST, NEXT or BEST.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the 2025 A+ Objectives
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                CompTIA publishes the domain weighting for each exam, and version 15 (220-1201 and 220-1202) launched in 2025. Every practice test here splits 25 questions per core in each core&apos;s proportions, so troubleshooting, hardware, networking, operating systems and security get the most weight.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
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

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The CompTIA A+ practice test is brand new. If a question looks wrong or an objective has changed, tell us.
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
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the CompTIA A+
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Memorize the troubleshooting methodology in order</h3>
              <p>
                Identify the problem, establish a theory, test the theory, establish a plan, verify full functionality, document. The same six steps (and the seven-step malware removal procedure) decide dozens of FIRST and NEXT questions across both cores.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                Ports (22, 25, 53, 80, 110, 143, 443, 445, 3389), private IP ranges, 169.254, cable speeds and distances, USB and SATA speeds, RAID levels and disk counts, the laser printer steps, Wi-Fi standards and channels. The exam tests them as recall and inside scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think like the help desk</h3>
              <p>
                The right answer follows policy: back up before changes, question the obvious, escalate when out of scope, quarantine before you remediate, document everything, respect the customer&apos;s data and time. If an option skips a step or risks data, it is a distractor.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain and take both cores</h3>
              <p>
                TigerTest tracks your accuracy by domain. Core 1 passes at 675 and Core 2 at 700 of 900, and you need both to certify. Retake the set you missed most until you clear 80 percent with room to spare, then expect performance-based items on exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CompTIA A+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the CompTIA A+ exams?</h3>
            <p className="text-gray-600">
              Each core has up to 90 questions in 90 minutes, mixing multiple choice, multiple response, drag-and-drop and performance-based items. Core 1 (220-1201) passes at 675 of 900 and Core 2 (220-1202) at 700 of 900, and you need both to earn the certification.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which version of A+ is this for?</h3>
            <p className="text-gray-600">
              The current version 15 objectives, 220-1201 and 220-1202, which launched in 2025 and replaced 220-1101 and 220-1102 in September 2025. Domain names and weights match the new objectives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this include performance-based questions?</h3>
            <p className="text-gray-600">
              No. Everything here is four-option single answer, which is most of the real exam. Performance-based items simulate a console or configuration task, so pair this bank with hands-on practice in Windows, a home router and a virtual machine.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Should I take Core 1 or Core 2 first?</h3>
            <p className="text-gray-600">
              Most candidates take Core 1 first because hardware and networking are more concrete, but either order works. The training sets here are split by core, so you can prepare for one exam at a time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest A+ practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the CompTIA A+?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all nine domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-a-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
