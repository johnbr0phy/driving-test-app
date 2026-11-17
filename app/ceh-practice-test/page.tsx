import "@/lib/v2/banks/ceh";
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

const title = "Free CEH Practice Test 2026 (Certified Ethical Hacker v13)";
const metaDescription =
  "Free CEH v13 practice tests: 200 original questions on footprinting, scanning, system, network, web, wireless, mobile, cloud and crypto attacks, all explained.";
const description =
  "Free EC-Council Certified Ethical Hacker (CEH v13, exam 312-50) practice tests with 200 original questions weighted to the CEH Exam Blueprint v5.0: ethical hacking concepts, reconnaissance, system hacking and malware, network and perimeter hacking, web application hacking, wireless, mobile, IoT and OT, cloud computing and cryptography. Every scenario is authorised testing.";

const faqs = [
  {
    q: "How many questions are on the CEH exam?",
    a: "The CEH knowledge exam (312-50) has 125 multiple-choice questions in 4 hours. It is not open book, and you take it at an ECC Exam Centre, a Pearson VUE center or by remote proctoring.",
  },
  {
    q: "What is the passing score for CEH?",
    a: "EC-Council sets a cut score for each exam form, anywhere from 60 percent to 85 percent, depending on how hard that form's questions are. You are not told which form you will get, so aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the CEH v13 exam?",
    a: "Nine domains from the CEH Exam Blueprint v5.0: Information Security and Ethical Hacking Overview 6 percent, Reconnaissance Techniques 17 percent, System Hacking Phases and Attack Techniques 15 percent, Network and Perimeter Hacking 24 percent, Web Application Hacking 14 percent, Wireless Network Hacking 5 percent, Mobile Platform, IoT and OT Hacking 10 percent, Cloud Computing 5 percent and Cryptography 5 percent.",
  },
  {
    q: "Is CEH v13 the current version?",
    a: "Yes. EC-Council says CEH is currently on version 13 and that it releases new versions every 12 to 18 months. No successor has been announced, so v13 is the version to study for.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 80 multiple-choice questions in 154 minutes, the same pace as the real 125 questions in 4 hours, with free navigation and flagging. The questions follow the blueprint's weights. The hands-on CEH Practical exam is not modelled, and no working exploit payloads are shown.",
  },
  {
    q: "Is the Tigertest CEH practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the last drill (Cloud and Cryptography) and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CEH practice test, Certified Ethical Hacker practice exam, CEH v13 practice test, free CEH questions, 312-50 practice test, CEH exam prep 2026, EC-Council CEH sample questions, ethical hacking practice exam",
  alternates: {
    canonical: `${siteUrl}/ceh-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ceh-practice-test`,
    images: [{ url: shareImageUrl("ceh"), width: 1200, height: 630, alt: "Tigertest free CEH practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ceh")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CEH Practice Tests",
      description,
      url: `${siteUrl}/ceh-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ceh"),
      featureList: [
        "200 original Certified Ethical Hacker practice questions",
        "2 full 80-question practice tests in 154 minutes",
        "7 drills covering all nine CEH blueprint domains",
        "Weighted to the CEH Exam Blueprint v5.0",
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
        classFaqJsonLd("ceh"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Information Security and Ethical Hacking Overview", weight: "6%" },
  { name: "Reconnaissance Techniques", weight: "17%" },
  { name: "System Hacking Phases and Attack Techniques", weight: "15%" },
  { name: "Network and Perimeter Hacking", weight: "24%" },
  { name: "Web Application Hacking", weight: "14%" },
  { name: "Wireless Network Hacking", weight: "5%" },
  { name: "Mobile Platform, IoT and OT Hacking", weight: "10%" },
  { name: "Cloud Computing", weight: "5%" },
  { name: "Cryptography", weight: "5%" },
];

export default function CehLandingPage() {
  return (
    <div data-theme="ceh" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CEH Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ceh/dashboard"
            shortName="CEH"
            subtitle="200 original questions weighted to EC-Council's CEH v13 blueprint, from footprinting and scanning to web, wireless, cloud and crypto attacks. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/ceh-mobile.png", desktop: "/landing/ceh-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ceh" />

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
                One drill per part of the blueprint: ethical hacking overview, reconnaissance, system hacking and malware, network and perimeter hacking, web application hacking, wireless, mobile, IoT and OT, and cloud and cryptography. Questions you miss come back until you have mastered them.
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
                Two 80-question tests in 154 minutes with flagging and review, the same pace as the real 125 questions in 4 hours. Practice Test 2 is held out of the drills, so it measures readiness, not memory.
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
                Built on the CEH Exam Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                EC-Council publishes how many questions come from each domain. Every practice test follows those weights, from footprinting and scanning through system, network and web attacks to the cloud and cryptography.
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
                src={getTigerAsset("ceh", 3)}
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
            How to Pass CEH
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put your time where the weight is</h3>
              <p>
                Network and perimeter hacking alone is about a quarter of the exam, and reconnaissance and system hacking add almost a third more. Learn sniffing, social engineering, DoS, session hijacking and IDS evasion well before you spend long on the small domains.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what each scan and response means</h3>
              <p>
                Many questions describe a probe and a reply and ask what it shows. Know how a closed port answers a SYN, what silence means to a FIN, NULL or Xmas scan, what an ACK scan maps, how an idle scan works and which ports common services use.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn each attack with its defence</h3>
              <p>
                For every attack, know the countermeasure the exam expects: port security for MAC flooding, DHCP snooping for rogue servers, dynamic ARP inspection for ARP poisoning, SYN cookies for SYN floods, HttpOnly and new session IDs for hijacking, salts for rainbow tables.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold, at the real exam&apos;s pace of a little under two minutes a question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CEH Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ceh" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ceh" />

      <ExamRelatedTests examId="ceh" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CEH?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all nine domains.</p>
          <ExamLandingCTA dashboardHref="/ceh/dashboard" />
        </div>
      </div>
    </div>
  );
}
