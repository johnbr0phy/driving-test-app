import "@/lib/v2/banks/linuxplus";
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

const title = "Free CompTIA Linux+ Practice Test 2026 (XK0-006)";
const metaDescription =
  "Free Linux+ XK0-006 practice tests: 204 original questions on storage, users, systemd, containers, SELinux, firewalls, scripting, Git and troubleshooting, all explained.";
const description =
  "Free CompTIA Linux+ (XK0-006) practice tests with 204 original questions weighted to the exam objectives: system management, services and user management, security, automation, orchestration and scripting, and troubleshooting. Commands are shown as you would type them.";

const faqs = [
  {
    q: "How many questions are on the Linux+ exam?",
    a: "The CompTIA Linux+ XK0-006 exam has a maximum of 90 questions in 90 minutes. Most are multiple choice, plus performance-based questions where you work with commands, files or a simulated system.",
  },
  {
    q: "What is the passing score for Linux+?",
    a: "You need 720 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Linux+ XK0-006 exam?",
    a: "Five domains: System Management 23 percent, Services and User Management 20 percent, Security 18 percent, Automation, Orchestration, and Scripting 17 percent, and Troubleshooting 22 percent.",
  },
  {
    q: "Is XK0-006 the current Linux+ exam?",
    a: "Yes. Linux+ V8 (XK0-006) launched on July 15, 2025. The English XK0-005 exam retired on January 13, 2026, so XK0-006 is the version to study for. CompTIA usually retires an exam about three years after launch.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 90 questions in 90 minutes with free navigation and flagging, like the real exam. Commands are shown in monospace, and choose-two, matching and ordering items stand in for the performance-based questions.",
  },
  {
    q: "Is the Tigertest Linux+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the first drills are free; the later drills and practice tests are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Linux+ practice test, CompTIA Linux+ XK0-006 practice exam, free Linux+ questions, Linux+ exam prep 2026, XK0-006 practice test, Linux+ sample questions, Linux system administration practice exam",
  alternates: {
    canonical: `${siteUrl}/comptia-linux-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-linux-plus-practice-test`,
    images: [{ url: shareImageUrl("linuxplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Linux+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("linuxplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Linux+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-linux-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("linuxplus"),
      featureList: [
        "204 original Linux+ practice questions",
        "2 full 90-question practice tests in 90 minutes",
        "8 drills covering all five XK0-006 domains",
        "Command reading, choose-two, matching and ordering items",
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
        classFaqJsonLd("linuxplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "System Management", weight: "23%" },
  { name: "Services and User Management", weight: "20%" },
  { name: "Security", weight: "18%" },
  { name: "Automation, Orchestration, and Scripting", weight: "17%" },
  { name: "Troubleshooting", weight: "22%" },
];

export default function LinuxPlusLandingPage() {
  return (
    <div data-theme="linuxplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Linux+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-linux-plus/dashboard"
            shortName="Linux+"
            subtitle="204 Linux+ questions weighted to the XK0-006 exam objectives. Free to start, no account needed."
            shots={{ mobile: "/landing/linuxplus-mobile.png", desktop: "/landing/linuxplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="linuxplus" />

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
                One drill per topic: boot, devices and networking; storage, shell and backups; files, users and processes; software, systemd and containers; security; automation and scripting; and two troubleshooting drills. Questions you miss come back until you have mastered them.
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
                Two 90-question tests in 90 minutes with flagging and review, like the real exam. Read commands, match tools to tasks and put steps in order. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the XK0-006 Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the domain weighting for Linux+. Every practice test follows it, from boot, storage and accounts through systemd, containers, security and automation to troubleshooting a server that misbehaves.
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
                src={getTigerAsset("linuxplus", 3)}
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
            How to Pass Linux+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practice on a real Linux system</h3>
              <p>
                Install a Red Hat-family and a Debian-family distribution in virtual machines and do the tasks yourself: build an LVM volume, add a user, write a systemd timer, open a firewall port. Linux+ asks which command does a job, and typing it once makes it stick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the options that change the meaning</h3>
              <p>
                Many questions turn on one flag: usermod -aG against -G, --permanent on firewall-cmd, setsebool -P, 2&gt;&amp;1 after or before the redirect. Learn what each common option does, not just the command name.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Treat troubleshooting as reading evidence</h3>
              <p>
                Troubleshooting is 22 percent of the exam. Practise going from a symptom to the tool that proves the cause: df -i for inodes, lsof for a busy mount, getfacl for a + in ls -l, ip route get for a routing doubt, vmstat for swapping.
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
          Linux+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="linuxplus" />
        </div>
      </div>

      <SampleQuestionsV2 examId="linuxplus" />

      <ExamRelatedTests examId="linuxplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Linux+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 204 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-linux-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
