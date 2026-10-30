import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CompTIA Network+ Practice Test 2026 (N10-009)";
const metaDescription =
  "Free Network+ N10-009 practice tests: 204 original questions on ports, subnetting, routing, VLANs, Wi-Fi, security and troubleshooting, all explained.";
const description =
  "Free CompTIA Network+ (N10-009) practice tests with 204 original questions weighted to the exam objectives: the OSI model, ports and protocols, IPv4 subnetting, cloud and modern networks, routing, switching and wireless, DHCP, DNS and monitoring, network security, and the troubleshooting methodology, tools and common faults.";

const faqs = [
  {
    q: "How many questions are on the Network+ exam?",
    a: "The CompTIA Network+ N10-009 exam has a maximum of 90 questions in 90 minutes. Most are multiple choice with one or more answers, plus a few performance-based questions where you configure, match or troubleshoot in a simulated environment.",
  },
  {
    q: "What is the passing score for Network+?",
    a: "You need 720 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Network+ N10-009 exam?",
    a: "Five domains: Networking Concepts 23 percent, Network Implementation 20 percent, Network Operations 19 percent, Network Security 14 percent, and Network Troubleshooting 24 percent. Troubleshooting is the largest, so learn the CompTIA troubleshooting methodology and the common cable, addressing and wireless faults well.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 90 questions in 90 minutes with free navigation and flagging, like the real exam. Choose-two, matching and ordering items stand in for the performance-based questions, and a few subnet and throughput calculations are typed. Simulated configuration labs are not included.",
  },
  {
    q: "Is the Tigertest Network+ practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Network+ practice test, CompTIA Network+ N10-009 practice exam, free Network+ questions, Network+ exam prep 2026, Network+ subnetting practice, Network+ sample questions, Network+ mock exam",
  alternates: {
    canonical: `${siteUrl}/comptia-network-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-network-plus-practice-test`,
    images: [{ url: shareImageUrl("netplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Network+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("netplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Network+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-network-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "204 original Network+ practice questions",
        "2 full 90-question practice tests in 90 minutes",
        "8 drills covering all five N10-009 domains",
        "Choose-two, matching, ordering and typed calculation items",
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
        classFaqJsonLd("netplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Network Troubleshooting", weight: "24%" },
  { name: "Networking Concepts", weight: "23%" },
  { name: "Network Implementation", weight: "20%" },
  { name: "Network Operations", weight: "19%" },
  { name: "Network Security", weight: "14%" },
];

export default function NetworkPlusLandingPage() {
  return (
    <div data-theme="netplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Network+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-network-plus/dashboard"
            shortName="Network+"
            subtitle="204 original questions weighted to the N10-009 exam objectives, with matching, ordering and typed subnetting items. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/netplus-mobile.png", desktop: "/landing/netplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="netplus" />

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
                One drill per exam area, with the three biggest domains split in two: OSI and ports, appliances and addressing, routing and switching, wireless and installation, operations, security, and two for troubleshooting. Questions you miss come back until you have mastered them.
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
                Two 90-question tests in 90 minutes with flagging and review, like the real exam. Match tools to tasks, put steps in order and type subnet answers. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the N10-009 Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the domain weighting for Network+. Every practice test follows it, including the newer N10-009 material on SD-WAN, VXLAN, SASE, infrastructure as code and cloud networking.
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
                src={getTigerAsset("netplus", 1)}
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
            How to Pass Network+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the ports and the OSI model cold</h3>
              <p>
                Dozens of questions assume you know which port a service uses and which layer a device or problem belongs to. Learn the N10-009 port list (SSH 22, DNS 53, NTP 123, LDAPS 636, RDP 3389 and the rest) until you can answer without thinking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the troubleshooting methodology in order</h3>
              <p>
                Troubleshooting is the biggest domain. Know the seven steps, from identifying the problem to documenting the outcome, and which step comes next in a scenario. Then learn what CRC errors, giants, APIPA addresses and jitter each point to.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice subnetting by hand</h3>
              <p>
                Usable hosts, CIDR ranges and whether a gateway sits inside a host&apos;s subnet come up in implementation and troubleshooting questions. Work them on paper until a /26 or a /22 takes seconds.
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
          Network+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="netplus" />
        </div>
      </div>

      <ExamRelatedTests examId="netplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Network+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 204 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-network-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
