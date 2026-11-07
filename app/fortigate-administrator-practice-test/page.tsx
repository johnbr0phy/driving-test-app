import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "FortiGate Administrator Practice Test 2026 - Free FCP NSE 4 Questions";
const metaDescription =
  "Free FCP - FortiGate 7.6 Administrator practice: 200 original questions on FortiOS 7.6, four 50-question tests and every answer explained. Policies, NAT, security profiles, SD-WAN, HA and IPsec.";
const description =
  "Free practice for Fortinet's FCP - FortiGate 7.6 Administrator exam (FCP_FGT_AD-7.6, formerly NSE 4): 200 original questions on FortiOS 7.6 across nine topics, from system setup, VDOMs, HA and the Security Fabric to firewall policies, NAT, FSSO, SSL inspection, security profiles, static routing, SD-WAN and IPsec VPN. Four 50-question practice tests and four training sets, every answer explained.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "fortigate administrator practice test, fcp fortigate 7.6 administrator, fcp_fgt_ad-7.6 practice questions, nse 4 practice test, fortinet certification practice exam, fortios 7.6 exam questions",
  alternates: {
    canonical: `${siteUrl}/fortigate-administrator-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/fortigate-administrator-practice-test`,
    images: [{ url: shareImageUrl("fortigate"), width: 1200, height: 630, alt: "Tigertest free FortiGate Administrator practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fortigate")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the FCP - FortiGate Administrator exam?",
    a: "It is Fortinet's certification exam for people who set up and run FortiGate next-generation firewalls. The current version, FCP_FGT_AD-7.6, is written for FortiOS 7.6 and used to be called NSE 4. It is the core exam toward the Fortinet Certified Professional (FCP) in Network Security, and you take it at a Pearson VUE test center or online.",
  },
  {
    q: "How many questions are on the FortiGate 7.6 Administrator exam?",
    a: "Study guides quoting Fortinet's exam description give about 50 multiple-choice and multiple-select questions in 90 minutes. The result is pass or fail and Fortinet does not publish a passing score, so the 70% line on each 50-question practice test here is Tigertest's readiness target, not Fortinet's cut score.",
  },
  {
    q: "What topics does the exam cover?",
    a: "Five areas: deployment and system configuration (initial setup, administrators, VDOMs, HA, the Security Fabric, logging and diagnostics), firewall policies and authentication (policies, NAT, LDAP, RADIUS and FSSO), content inspection (SSL inspection, antivirus, IPS, web filtering, application control and DNS filtering), routing (static routes, policy routes and SD-WAN) and VPN (IPsec). Each practice test here mixes all nine Tigertest topics in the same balance.",
  },
  {
    q: "Is SSL VPN on the FortiOS 7.6 exam?",
    a: "Fortinet removed SSL VPN tunnel mode in FortiOS 7.6.3 and points remote users to IPsec VPN with FortiClient instead. This bank therefore covers remote access through dial-up IPsec, not SSL VPN. Check Fortinet's current exam description before you book, in case the topic list changes.",
  },
  {
    q: "Are these real Fortinet exam questions?",
    a: "No. Every question is original, written by Tigertest from FortiOS 7.6 behavior and Fortinet's public course topics, never from exam dumps. It is free practice, not affiliated with or endorsed by Fortinet, and it does not replace the FortiGate Administrator course or hands-on lab time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free FortiGate Administrator Practice Test",
      description,
      url: `${siteUrl}/fortigate-administrator-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 FortiGate Administrator practice questions",
        "4 practice tests of 50 questions",
        "4 training sets, one per practice test",
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
  { name: "System setup, administration and VDOMs", weight: "12%" },
  { name: "HA, Security Fabric, logging and diagnostics", weight: "12%" },
  { name: "Firewall policies and objects", weight: "12%" },
  { name: "NAT, IP pools and virtual IPs", weight: "8%" },
  { name: "Authentication and FSSO", weight: "6%" },
  { name: "SSL inspection and inspection modes", weight: "8%" },
  { name: "Security profiles", weight: "18%" },
  { name: "Routing and SD-WAN", weight: "14%" },
  { name: "IPsec VPN", weight: "10%" },
];

export default function FortigateLandingPage() {
  return (
    <div data-theme="fortigate" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free FortiGate Administrator Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/fortigate/dashboard"
            shortName="FortiGate"
            subtitle="200 original questions for Fortinet's FCP - FortiGate 7.6 Administrator exam: firewall policies and NAT, security profiles, SSL inspection, SD-WAN, HA and IPsec VPN on FortiOS 7.6. Four 50-question tests, every answer explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/fortigate-mobile.png", desktop: "/landing/fortigate-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fortigate" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Set by Set</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, each holding exactly one practice test&apos;s 50 questions across all nine topics, from VDOMs and HA to SD-WAN rules and IPsec phase 2 selectors. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests at the Real Pace</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, about the length of the real exam, which study guides put at 50 questions in 90 minutes. No question appears in more than one test, and every answer is explained. Aim for 70% or better.
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
                Built on the FortiGate 7.6 Exam Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Fortinet lists five topic areas: deployment and system configuration, firewall policies and authentication, content inspection, routing and VPN. Fortinet publishes no weights, so Tigertest splits them into nine topics, each the same share of every 50-question test:
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
                src={getTigerAsset("fortigate", 1)}
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
            How to Pass the FortiGate Administrator Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the order traffic takes</h3>
              <p>
                Most scenario questions turn on what FortiGate checks first: the route lookup and reverse path check, then the firewall policy (top down, first match, implicit deny), then NAT and the security profiles. When a question asks why traffic was dropped, trace the packet through that order.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the commands that show what happened</h3>
              <p>
                diagnose debug flow, get router info routing-table all, diagnose sys sdwan health-check, get system ha status and diagnose vpn ike gateway list all show up as answers. Know what each one tells you and when you would run it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Spend time on policies, profiles and SD-WAN</h3>
              <p>
                Firewall policies, NAT and security profiles are close to half of every test here. Know central NAT against policy NAT, IP pool types, flow versus proxy inspection, web filter and application control actions, and how SD-WAN rules pick a member.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build it in a lab</h3>
              <p>
                Fortinet offers FortiGate VM trial licences, and nothing replaces configuring a policy, an IPsec tunnel or an HA pair yourself. Take each 50-question test here in about 90 minutes, read every explanation and retake until you score 70% or better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          FortiGate Administrator FAQ
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

      <ExamRelatedTests examId="fortigate" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the FortiGate Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every FortiGate 7.6 topic.</p>
          <ExamLandingCTA dashboardHref="/fortigate/dashboard" />
        </div>
      </div>
    </div>
  );
}
