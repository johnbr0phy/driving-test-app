import "@/lib/v2/banks/fortinse";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Fortinet NSE 1 (FCF) Practice Test 2026";
const metaDescription =
  "Free practice for Fortinet NSE 1 Cybersecurity and Cloud Fundamentals, the course exam that replaced FCF: 200 original questions on all ten modules, all explained.";
const description =
  "Free practice tests for the Fortinet NSE 1 Cybersecurity and Cloud Fundamentals exam, which replaced Fortinet Certified Fundamentals (FCF) in Cybersecurity in July 2026: 200 original questions on the threat landscape, social engineering, malware, cryptography and PKI, secure networking, authentication and access control, endpoint security, secure data and applications, and cloud security and virtualization.";

const faqs = [
  {
    q: "What happened to the Fortinet FCF certification?",
    a: "On July 15, 2026 Fortinet moved its NSE program from five levels to eight. Fortinet Certified Fundamentals (FCF) in Cybersecurity was replaced by NSE 1 in Cybersecurity, and people with an active FCF were awarded NSE 1 and NSE 2. The new NSE 1 course, Cybersecurity and Cloud Fundamentals, covers the same ground as the old FCF courses.",
  },
  {
    q: "How do I earn Fortinet NSE 1?",
    a: "Take the free self-paced Cybersecurity and Cloud Fundamentals course on the Fortinet Training Institute and pass the online exam presented at the end of the course. Fortinet says the course takes about 11 hours. The certification is active for two years.",
  },
  {
    q: "How many questions are on the NSE 1 exam, and what is the pass mark?",
    a: "Fortinet does not publish a question count, time limit or pass mark for the NSE 1 online exam. Each Tigertest practice test is 40 questions in 60 minutes, and the 80 percent goal is our own readiness line, not Fortinet's.",
  },
  {
    q: "What does the NSE 1 course cover?",
    a: "Ten modules: Intro to Cybersecurity, Threat Landscape, Social Engineering, Malware, Cryptography and the Public Key Infrastructure, Secure Networking, Authentication and Access Control, Endpoint Security, Secure Data and Applications, and Cloud Security and Virtualization. Every Tigertest practice test asks four questions from each.",
  },
  {
    q: "Is this practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the last drill and the final practice test are part of Tigertest Premium, one payment with no subscription. Tigertest is not affiliated with Fortinet.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Fortinet NSE 1 practice test, FCF practice test, Fortinet Certified Fundamentals exam, NSE 1 Cybersecurity and Cloud Fundamentals, Fortinet FCF questions, free Fortinet practice exam, NSE 1 exam questions 2026",
  alternates: {
    canonical: `${siteUrl}/fortinet-nse-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/fortinet-nse-1-practice-test`,
    images: [{ url: shareImageUrl("fortinse"), width: 1200, height: 630, alt: "Tigertest free Fortinet NSE 1 (FCF) practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fortinse")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Fortinet NSE 1 (FCF) Practice Tests",
      description,
      url: `${siteUrl}/fortinet-nse-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("fortinse"),
      featureList: [
        "200 original NSE 1 practice questions",
        "2 practice tests of 40 questions in 60 minutes",
        "7 drills covering all ten course modules",
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
  { name: "Intro to Cybersecurity", weight: "4" },
  { name: "Threat Landscape", weight: "4" },
  { name: "Social Engineering", weight: "4" },
  { name: "Malware", weight: "4" },
  { name: "Cryptography and PKI", weight: "4" },
  { name: "Secure Networking", weight: "4" },
  { name: "Authentication and Access Control", weight: "4" },
  { name: "Endpoint Security", weight: "4" },
  { name: "Secure Data and Applications", weight: "4" },
  { name: "Cloud Security and Virtualization", weight: "4" },
];

export default function FortinetNse1LandingPage() {
  return (
    <div data-theme="fortinse" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Fortinet NSE 1 (FCF) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/fortinet-nse-1/dashboard"
            shortName="NSE 1"
            subtitle="200 questions on all ten modules of Fortinet's NSE 1 course. Free to start, no account needed."
            shots={{ mobile: "/landing/fortinse-mobile.png", desktop: "/landing/fortinse-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fortinse" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Seven Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Security basics and threats, social engineering and malware, cryptography, secure networking, authentication and access, endpoint security, and data, apps and cloud. Questions you miss come back until you have mastered them.
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
                Two 40-question tests in 60 minutes with flagging and review, four questions from every course module. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the NSE 1 Course Agenda
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Fortinet lists ten modules for Cybersecurity and Cloud Fundamentals but no weights, so every practice test asks four questions from each module.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight} per test</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("fortinse", 3)}
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
            How to Pass Fortinet NSE 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Take the free course first</h3>
              <p>
                The NSE 1 exam comes at the end of Fortinet&apos;s free Cybersecurity and Cloud Fundamentals course on the Fortinet Training Institute. Work through every module; the practice tests here check that the ideas stuck.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the terms in pairs</h3>
              <p>
                Many questions turn on telling two close ideas apart: integrity and confidentiality, a worm and a trojan, an IDS and an IPS, authentication and authorization, symmetric and asymmetric keys, IaaS and SaaS. Know what each one does that the other does not.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like the attacker, then the defender</h3>
              <p>
                For each threat, from phishing to ransomware, know how it gets in and which control stops it: training and MFA, patching, backups, segmentation, encryption or a firewall rule.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak module, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by module. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Fortinet NSE 1 Frequently Asked Questions
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

      <SampleQuestionsV2 examId="fortinse" />

      <ExamRelatedTests examId="fortinse" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for NSE 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all ten modules.</p>
          <ExamLandingCTA dashboardHref="/fortinet-nse-1/dashboard" />
        </div>
      </div>
    </div>
  );
}
