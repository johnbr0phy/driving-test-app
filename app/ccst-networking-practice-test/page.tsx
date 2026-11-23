import "@/lib/v2/banks/ccst";
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

const title = "Free Cisco CCST Networking Practice Test 2026";
const metaDescription =
  "Free Cisco CCST Networking (100-150) practice tests: 208 original questions on network models, subnets, IPv6, cables, Wi-Fi, switches, troubleshooting and security, all explained.";
const description =
  "Free Cisco Certified Support Technician (CCST) Networking 100-150 practice tests with 208 original questions built on the six exam domains: OSI and TCP/IP models, bandwidth and throughput, network types and cloud models, common protocols and ports, private and public addresses, IPv4 subnets and IPv6, cables, connectors, Wi-Fi and cellular, endpoints and connectivity checks, status lights, ports, routing, switching and VLANs, help desk troubleshooting, Wireshark, ping, tracert and Cisco show commands, firewalls, security concepts and WPA3.";

const faqs = [
  {
    q: "How long is the Cisco CCST Networking exam?",
    a: "The 100-150 CCST Networking exam lasts 50 minutes. Cisco says the number of questions varies, so it publishes no fixed count. The exam is offered in English, Arabic, Chinese, Spanish, French, Japanese and Portuguese.",
  },
  {
    q: "What is the passing score for CCST Networking?",
    a: "Cisco reports the result as Pass or Fail right after the exam and does not publish a passing score. The 80 percent goal on these practice tests is Tigertest's own readiness target, not a Cisco figure.",
  },
  {
    q: "What is on the CCST Networking exam?",
    a: "Six domains: Standards and Concepts, Addressing and Subnet Formats, Endpoints and Media Types, Infrastructure, Diagnosing Problems, and Security. Cisco lists the objectives under each but no domain weights.",
  },
  {
    q: "Do I need CCST Networking before CCNA?",
    a: "No. CCST Networking has no prerequisites and is not required for CCNA, but Cisco describes it as a first step toward CCNA. It is delivered by Certiport and Pearson VUE, at a test centre or online with a proctor.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 45 questions in 50 minutes with free navigation and flagging, which is Tigertest's length because Cisco publishes no question count. Most are multiple choice, with some typed subnet answers and ordering and matching items. The questions are original, not Cisco's.",
  },
  {
    q: "Is the Tigertest CCST Networking practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the standards, addressing and endpoints drills are free; the infrastructure, diagnosing problems and security drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CCST Networking practice test, Cisco CCST practice exam, 100-150 practice test, Cisco Certified Support Technician practice test, free CCST questions, CCST Networking exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/ccst-networking-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccst-networking-practice-test`,
    images: [{ url: shareImageUrl("ccst"), width: 1200, height: 630, alt: "Tigertest free Cisco CCST Networking practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccst")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Cisco CCST Networking Practice Tests",
      description,
      url: `${siteUrl}/ccst-networking-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ccst"),
      featureList: [
        "208 original CCST Networking practice questions",
        "2 full 45-question practice tests in 50 minutes",
        "6 drills, one for each exam domain",
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
        classFaqJsonLd("ccst"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Standards and Concepts", weight: "9 per test" },
  { name: "Addressing and Subnet Formats", weight: "8 per test" },
  { name: "Endpoints and Media Types", weight: "8 per test" },
  { name: "Infrastructure", weight: "7 per test" },
  { name: "Diagnosing Problems", weight: "8 per test" },
  { name: "Security", weight: "5 per test" },
];

export default function CcstLandingPage() {
  return (
    <div data-theme="ccst" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Cisco CCST Networking Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccst-networking/dashboard"
            shortName="CCST Networking"
            subtitle="208 questions on the six CCST Networking 100-150 domains, from subnets to show commands. Free to start, no account needed."
            shots={{ mobile: "/landing/ccst-mobile.png", desktop: "/landing/ccst-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccst" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Six Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Standards and concepts; addressing and subnets; endpoints and media; infrastructure; diagnosing problems; and security. Questions you miss come back until you have mastered them.
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
                Two 45-question tests in 50 minutes with flagging and review, matching the real exam&apos;s 50 minutes. Questions mix all six domains. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the CCST Networking Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Cisco lists the 100-150 objectives under six domains but publishes no weights, so the questions per test below are Tigertest&apos;s split. Every objective is covered, from the OSI model and IPv6 short forms to status lights, show commands and WPA3.
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
                src={getTigerAsset("ccst", 3)}
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
            How to Pass CCST Networking
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Subnet by hand every day</h3>
              <p>
                Addressing questions are quick marks once practised. Learn the block sizes (128, 64, 32, 16, 8, 4) and work out hosts, network and broadcast addresses for a few prefixes each day without a calculator. Then practise shortening IPv6 addresses.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Run the commands yourself</h3>
              <p>
                Open a terminal and run ipconfig /all or ip addr, ping, tracert or traceroute and nslookup. If you can, use a lab or Cisco Packet Tracer to try show ip interface brief, show cdp neighbors and show mac address-table. Seeing real output makes the questions easy to read.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like the help desk</h3>
              <p>
                The exam is for support technicians: gather information, work outward from the PC, document every step and escalate what is beyond your role. Learn what each status light and each show command tells you, so you can report it to an engineer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold under the 50-minute clock.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Cisco CCST Networking Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ccst" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ccst" />

      <ExamRelatedTests examId="ccst" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CCST Networking?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 208 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/ccst-networking/dashboard" />
        </div>
      </div>
    </div>
  );
}
