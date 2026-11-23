import "@/lib/v2/banks/serverplus";
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

const title = "Free CompTIA Server+ Practice Test 2026";
const metaDescription =
  "Free CompTIA Server+ (SK0-005) practice tests: 207 original questions on server hardware, RAID and storage, administration, virtualization, security, backups and troubleshooting, all explained.";
const description =
  "Free CompTIA Server+ (SK0-005) practice tests with 207 original questions weighted to the exam objectives: racking, power and cabling, chassis types and out-of-band management, RAID levels and usable capacity, NAS and SAN, server OS installs, partitions and file systems, network services, monitoring, documentation and licensing, clustering, virtualization and scripting, physical and logical security, hardening, backups and disaster recovery, and troubleshooting hardware, storage, OS, network and security problems.";

const faqs = [
  {
    q: "How many questions are on the CompTIA Server+ exam?",
    a: "A maximum of 90 questions in 90 minutes, a mix of multiple choice and performance-based questions. The exam code is SK0-005, and CompTIA offers it in English and Japanese at Pearson VUE test centers and online.",
  },
  {
    q: "What is the passing score for CompTIA Server+?",
    a: "You need 750 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for about 85 percent on these practice tests to leave yourself a margin.",
  },
  {
    q: "What is on the Server+ exam?",
    a: "Four domains in the SK0-005 objectives: Server Hardware Installation and Management 18 percent, Server Administration 30 percent, Security and Disaster Recovery 24 percent, and Troubleshooting 28 percent.",
  },
  {
    q: "Is a new version of Server+ coming?",
    a: "Yes. CompTIA is running a beta of the next exam, SK0-006, until February 4, 2027, and expects to launch it in summer 2027. SK0-005 is the exam in use now, and CompTIA has not yet announced its retirement date. These practice tests follow SK0-005 and will be updated when SK0-006 launches.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 90 questions in 90 minutes with free navigation and flagging, the most the real exam can have. Most are multiple choice, with some matching, ordering and typed-number questions; the real exam's performance-based simulations are not modelled. The questions are original, not CompTIA's.",
  },
  {
    q: "Is the Tigertest CompTIA Server+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the hardware, storage, OS and networking, and administration drills are free; the high availability, security, backup and two troubleshooting drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CompTIA Server+ practice test, Server+ practice exam, SK0-005 practice test, free Server+ questions, Server+ exam prep 2026, RAID practice questions, server administration practice test",
  alternates: {
    canonical: `${siteUrl}/comptia-server-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-server-plus-practice-test`,
    images: [{ url: shareImageUrl("serverplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Server+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("serverplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Server+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-server-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("serverplus"),
      featureList: [
        "207 original CompTIA Server+ practice questions",
        "2 full 90-question practice tests in 90 minutes",
        "9 drills covering every exam domain",
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
        classFaqJsonLd("serverplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Server Hardware Installation and Management", weight: "18%" },
  { name: "Server Administration", weight: "30%" },
  { name: "Security and Disaster Recovery", weight: "24%" },
  { name: "Troubleshooting", weight: "28%" },
];

export default function ServerPlusLandingPage() {
  return (
    <div data-theme="serverplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Server+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-server-plus/dashboard"
            shortName="Server+"
            subtitle="207 questions weighted to the Server+ SK0-005 objectives, from RAID math to disaster recovery. Free to start, no account needed."
            shots={{ mobile: "/landing/serverplus-mobile.png", desktop: "/landing/serverplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="serverplus" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Nine Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Server hardware; storage and RAID; OS installs and networking; administration and licensing; high availability, virtualization and scripting; security and hardening; backups and disaster recovery; and two troubleshooting drills. Questions you miss come back until you have mastered them.
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
                Two 90-question tests in 90 minutes with flagging and review, the full length and pace of the real exam. Questions mix every domain in the weights CompTIA publishes. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the Server+ Exam Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the SK0-005 exam objectives with four domains and their weights. Every practice test follows them, from rack units and RAID capacity to clustering, hardening, backup rotation and the troubleshooting steps.
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
                src={getTigerAsset("serverplus", 3)}
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
            How to Pass CompTIA Server+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get your RAID math automatic</h3>
              <p>
                Know how many drives each RAID level needs, how many failures it survives and how much space it leaves: RAID 5 loses one drive to parity, RAID 6 two, and RAID 1 and RAID 10 half. Work a few capacity sums by hand until they take seconds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn backups as restore chains</h3>
              <p>
                For full, incremental, differential and synthetic full backups, picture what a restore needs. Pair that with RPO, RTO and hot, warm and cold sites, and most disaster recovery questions follow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Use the troubleshooting steps on every scenario</h3>
              <p>
                Troubleshooting is the second-largest domain. CompTIA&apos;s method runs identify the problem, establish a theory, test it, plan the fix, implement or escalate, verify, then document. Ask what changed, look for a common element, and make one change at a time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 85 percent, then take Practice Test 2 cold. Server administration and troubleshooting together are 58 percent of the exam, so give them the most time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CompTIA Server+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="serverplus" />
        </div>
      </div>

      <SampleQuestionsV2 examId="serverplus" />

      <ExamRelatedTests examId="serverplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CompTIA Server+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 207 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-server-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
