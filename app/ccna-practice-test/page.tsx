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

const siteUrl = SITE_URL;

const title = "Free CCNA Practice Test 2026 (200-301)";
const metaDescription =
  "Free CCNA 200-301 practice tests: 224 original questions with router and switch output, typed subnetting, OSPF, VLANs, ACLs and automation, all explained.";
const description =
  "Free Cisco CCNA (200-301) practice tests with 224 original questions weighted to the v1.1 exam topics: network fundamentals and subnetting, VLANs, trunks and spanning tree, routing tables, static routes and OSPF, NAT, DHCP and other IP services, ACLs and Layer 2 security, and automation with REST APIs, JSON and Ansible.";

const faqs = [
  {
    q: "How many questions are on the CCNA exam?",
    a: "Cisco gives you 120 minutes and does not publish a fixed question count; candidates usually report about 100 to 120 questions. Most are multiple choice with one or more answers, plus drag-and-drop and some simulations. You answer in order and cannot go back to an earlier question.",
  },
  {
    q: "What is the passing score for the CCNA 200-301?",
    a: "Cisco does not publish a passing score, and the exam is scaled, so the mark can vary from one exam form to another. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the CCNA 200-301 exam?",
    a: "The v1.1 exam topics have six domains: Network Fundamentals 20 percent, Network Access 20 percent, IP Connectivity 25 percent, IP Services 10 percent, Security Fundamentals 15 percent, and Automation and Programmability 10 percent. Cisco gives v1.1 through February 2, 2027; version 2.0, with five domains, starts on February 3, 2027.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 100 questions in 120 minutes, answered in order with no going back, like the real exam. Items show router and switch output, subnetting answers are typed, and ordering and matching items stand in for drag-and-drop. Lab simulations are not included, so practice on real or virtual gear too.",
  },
  {
    q: "Is the Tigertest CCNA practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CCNA practice test, CCNA 200-301 practice exam, free CCNA questions, Cisco CCNA exam prep 2026, CCNA subnetting practice, CCNA sample questions, CCNA mock exam",
  alternates: {
    canonical: `${siteUrl}/ccna-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccna-practice-test`,
    images: [{ url: shareImageUrl("ccna"), width: 1200, height: 630, alt: "Tigertest free CCNA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccna")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CCNA Practice Tests",
      description,
      url: `${siteUrl}/ccna-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "224 original CCNA practice questions",
        "2 full 100-question practice tests in 120 minutes",
        "8 drills covering all six 200-301 domains",
        "Router and switch output exhibits and typed subnetting answers",
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
        classFaqJsonLd("ccna"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "IP Connectivity", weight: "25%" },
  { name: "Network Fundamentals", weight: "20%" },
  { name: "Network Access", weight: "20%" },
  { name: "Security Fundamentals", weight: "15%" },
  { name: "IP Services", weight: "10%" },
  { name: "Automation & Programmability", weight: "10%" },
];

export default function CcnaLandingPage() {
  return (
    <div data-theme="ccna" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCNA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccna/dashboard"
            shortName="CCNA"
            subtitle="224 original questions weighted to the Cisco 200-301 exam topics, with router output and typed subnetting. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ccna-mobile.png", desktop: "/landing/ccna-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccna" />

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
                One drill per exam area, with subnetting and OSPF given their own: fundamentals, subnetting and IPv6, network access, routing and static routes, OSPF and FHRP, IP services, security and automation. Questions you miss come back until you have mastered them.
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
                Two 100-question tests in 120 minutes, answered in order with no going back, like the real exam. Read show command output, type subnetting answers and put steps in order. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the 200-301 Exam Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Cisco publishes the domain weighting for the CCNA. Every practice test follows the v1.1 exam topics, including the newer automation material on Ansible, Terraform and AI in network operations.
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
                src={getTigerAsset("ccna", 1)}
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
            How to Pass the CCNA
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make subnetting automatic</h3>
              <p>
                Usable hosts, block sizes, broadcast addresses and wildcard masks come up across routing, ACLs and OSPF, and there is no calculator. Work them on paper until a /27 or a 255.255.240.0 mask takes you seconds, not minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the output, not just the config</h3>
              <p>
                Many questions show show ip route, show interfaces trunk, show ip ospf neighbor or show spanning-tree and ask what is wrong or where a packet goes. Learn longest prefix match, administrative distance, port roles and neighbor states well enough to read them at a glance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Configure it yourself</h3>
              <p>
                The real exam can include simulations. Build VLANs, trunks, EtherChannel, OSPF, NAT, ACLs and SSH on real switches or a lab tool such as Cisco Packet Tracer, then use these questions to check you understand why each command works.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by area. Cisco does not publish a passing score, so retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. You cannot go back on the real exam, so practice committing to an answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCNA Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ccna" />
        </div>
      </div>

      <ExamRelatedTests examId="ccna" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CCNA?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 224 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/ccna/dashboard" />
        </div>
      </div>
    </div>
  );
}
