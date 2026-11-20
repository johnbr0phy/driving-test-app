import "@/lib/v2/banks/ccnpencor";
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

const title = "Free CCNP ENCOR Practice Test 2026: 350-401 Exam Questions";
const metaDescription =
  "Free Cisco CCNP ENCOR (350-401 v1.2) practice tests: 224 original questions on architecture, virtualization, infrastructure, assurance, security and automation, all explained.";
const description =
  "Free Cisco CCNP ENCOR (350-401 v1.2) practice tests with 224 original questions across the six exam domains: architecture, with campus design, SSO, Catalyst SD-WAN, SD-Access and QoS; virtualization, with VRF, GRE, IPsec, LISP and VXLAN; infrastructure, with trunks, EtherChannel, RSTP, MST, EIGRP, OSPF, eBGP, policy-based routing, NTP, NAT, VRRP and multicast; network assurance, with NetFlow, SPAN, IP SLA, NETCONF and RESTCONF; security, with AAA, ACLs, CoPP, TrustSec and MACsec; and automation, with Python, JSON, YANG, REST APIs and EEM.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CCNP ENCOR practice test, 350-401 practice exam, ENCOR 350-401 questions, CCNP Enterprise practice test, ENCOR v1.2 practice questions, Cisco ENCOR practice test 2026, free CCNP practice test",
  alternates: {
    canonical: `${siteUrl}/ccnp-encor-350-401-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccnp-encor-350-401-practice-test`,
    images: [{ url: shareImageUrl("ccnpencor"), width: 1200, height: 630, alt: "Tigertest free CCNP ENCOR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccnpencor")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Which version of the ENCOR 350-401 exam is current?",
    a: "Version 1.2. Its exam topics took effect on March 19, 2026 and replaced v1.1, dropping the wireless topics and using Cisco's current product names such as Catalyst Center and Catalyst SD-WAN. Check that your study material follows the v1.2 topics.",
  },
  {
    q: "How many questions are on the CCNP ENCOR exam?",
    a: "Cisco does not publish a question count. The exam lasts 120 minutes and is offered in English and Japanese. Cisco exams are answered in order with no going back, so these practice tests work the same way: 100 questions in 120 minutes.",
  },
  {
    q: "What is the passing score for ENCOR 350-401?",
    a: "Cisco does not publish one, and the real exam is scaled. Aim for a steady 80 percent on these practice tests before you book.",
  },
  {
    q: "What is on the ENCOR 350-401 exam?",
    a: "Six domains: Architecture 15%, Virtualization 10%, Infrastructure 30%, Network Assurance 10%, Security 20%, and Automation and Artificial Intelligence 15%. Infrastructure, the largest, covers Layer 2, Layer 3 routing with EIGRP, OSPF and eBGP, and IP services such as NTP, NAT, first hop redundancy and multicast.",
  },
  {
    q: "Is the Tigertest CCNP ENCOR practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and six of the eight drills are free; the Security and Automation drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CCNP ENCOR 350-401 Practice Tests",
      description,
      url: `${siteUrl}/ccnp-encor-350-401-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ccnpencor"),
      featureList: [
        "224 original 350-401 v1.2 practice questions",
        "2 full 100-question practice tests in 120 minutes",
        "8 drills across the six exam domains",
        "Router output, configuration and Python in the questions",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("ccnpencor"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Architecture", weight: "15%" },
  { name: "Virtualization", weight: "10%" },
  { name: "Infrastructure", weight: "30%" },
  { name: "Network Assurance", weight: "10%" },
  { name: "Security", weight: "20%" },
  { name: "Automation and Artificial Intelligence", weight: "15%" },
];

export default function CcnpEncorLandingPage() {

  return (
    <div data-theme="ccnpencor" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCNP ENCOR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccnp-encor/dashboard"
            shortName="CCNP ENCOR"
            subtitle="224 original questions on the six ENCOR 350-401 v1.2 domains, with router output, configuration and Python. Free to start, no account needed."
            shots={{ mobile: "/landing/ccnpencor-mobile.png", desktop: "/landing/ccnpencor-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccnpencor" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills across the six ENCOR domains, with Infrastructure split into Layer 2, Layer 3 routing and IP services. Questions you miss come back until you have mastered them.
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
                Two 100-question tests in 120 minutes, answered in order with no going back, like the real exam. Some questions show router output, configuration or a short Python script. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the 350-401 v1.2 Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Cisco publishes a weight for each of the six ENCOR domains. Every practice test here follows those weights, so the 100 questions split the same way the exam topics do.
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
                src={getTigerAsset("ccnpencor", 3)}
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
            How to Pass the CCNP ENCOR Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with Infrastructure</h3>
              <p>
                Infrastructure is 30 percent of the exam. Know RSTP roles and MST regions, how EIGRP picks a feasible successor, how OSPF area types filter LSAs, the BGP best path order, and the multicast basics of PIM sparse mode, IGMPv3 and SSM.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the overlays by role</h3>
              <p>
                For Catalyst SD-WAN, know what the Manager, Controller, Validator and WAN edge each do. For SD-Access, know the control plane, border and edge nodes, and that LISP, VXLAN and SGTs make up its control, data and policy planes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read output and configuration</h3>
              <p>
                Many questions show a QoS policy, an ACL, an EEM applet or a short Python script and ask what it does. Practise reading them line by line: which entry matches first, which action runs, which value prints.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Lab it, then drill your weak domain</h3>
              <p>
                Build the topics on lab routers and switches or a virtual lab: VRF-lite, a GRE tunnel, OSPF areas, an eBGP peering, Flexible NetFlow and a RESTCONF call. Tigertest tracks your accuracy by domain, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCNP ENCOR Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ccnpencor" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ccnpencor" />

      <ExamRelatedTests examId="ccnpencor" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CCNP ENCOR?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 224 questions across all six exam domains.</p>
          <ExamLandingCTA dashboardHref="/ccnp-encor/dashboard" />
        </div>
      </div>
    </div>
  );
}
