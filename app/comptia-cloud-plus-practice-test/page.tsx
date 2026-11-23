import "@/lib/v2/banks/cloudplus";
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

const title = "Free CompTIA Cloud+ Practice Test 2026";
const metaDescription =
  "Free CompTIA Cloud+ (CV0-004) practice tests: 220 original questions on cloud architecture, deployment, operations, security, DevOps and troubleshooting, all explained.";
const description =
  "Free CompTIA Cloud+ (CV0-004) practice tests with 220 original questions weighted to the exam objectives: service models and shared responsibility, regions, zones, RTO, RPO and recovery sites, load balancers, peering and routing, storage tiers and types, containers and virtualization, billing models, deployment and migration strategies, infrastructure as code, JSON and YAML, logging, tracing and scaling, backups and restore chains, compliance, identity and access, security controls and cloud attacks, Git, CI/CD and DevOps tools, and troubleshooting quotas, DNS, NAT, routing and HTTP errors.";

const faqs = [
  {
    q: "How many questions are on the CompTIA Cloud+ exam?",
    a: "A maximum of 90 questions in 90 minutes, multiple choice and performance-based. The current exam code is CV0-004, launched on September 24, 2024, and CompTIA offers it in English and Japanese.",
  },
  {
    q: "What is the passing score for CompTIA Cloud+?",
    a: "You need 750 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Cloud+ CV0-004 exam?",
    a: "Six domains: Cloud Architecture 23 percent, Deployment 19 percent, Operations 17 percent, Security 19 percent, DevOps Fundamentals 10 percent and Troubleshooting 12 percent. CompTIA recommends 2 to 3 years of hands-on experience as a systems administrator or cloud engineer, with Network+ and Server+ or equivalent knowledge.",
  },
  {
    q: "Is a new version of Cloud+ coming?",
    a: "CompTIA expects CV0-004 to retire about three years after its September 2024 launch, and it has published draft objectives for a CV0-005 with domains for governance, risk and compliance and for AI. No launch date has been announced, so CV0-004 is the exam to prepare for now, and these practice tests follow it.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 90 questions in 90 minutes with free navigation and flagging, the most the real exam can have. Most are multiple choice; the performance-based tasks of the real exam are modelled as matching, ordering, choose-two and typed-number questions. The questions are original, not CompTIA's.",
  },
  {
    q: "Is the Tigertest CompTIA Cloud+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the service models, storage and cost, deployment, infrastructure as code and observability drills are free; the backup, compliance and identity, security, DevOps and troubleshooting drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CompTIA Cloud+ practice test, Cloud+ practice exam, CV0-004 practice test, free Cloud+ questions, cloud certification practice test, Cloud+ exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/comptia-cloud-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-cloud-plus-practice-test`,
    images: [{ url: shareImageUrl("cloudplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Cloud+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cloudplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Cloud+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-cloud-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cloudplus"),
      featureList: [
        "220 original CompTIA Cloud+ practice questions",
        "2 full 90-question practice tests in 90 minutes",
        "10 drills covering every exam domain",
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
        classFaqJsonLd("cloudplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cloud Architecture", weight: "23%" },
  { name: "Deployment", weight: "19%" },
  { name: "Operations", weight: "17%" },
  { name: "Security", weight: "19%" },
  { name: "DevOps Fundamentals", weight: "10%" },
  { name: "Troubleshooting", weight: "12%" },
];

export default function CloudPlusLandingPage() {
  return (
    <div data-theme="cloudplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Cloud+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-cloud-plus/dashboard"
            shortName="Cloud+"
            subtitle="220 questions weighted to the Cloud+ CV0-004 objectives, from service models to troubleshooting. Free to start, no account needed."
            shots={{ mobile: "/landing/cloudplus-mobile.png", desktop: "/landing/cloudplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cloudplus" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Ten Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Service models and networking; storage, containers and cost; deployment and migration; infrastructure as code; observability and scaling; backup and life cycle; compliance and identity; security controls and attacks; DevOps fundamentals; and troubleshooting. Questions you miss come back until you have mastered them.
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
                Built on the Cloud+ Exam Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the CV0-004 exam objectives with six domains and their weights. Every practice test follows them, from shared responsibility and recovery sites to canary releases, drift detection, restore chains, cryptojacking and HTTP 429 errors.
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
                src={getTigerAsset("cloudplus", 3)}
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
            How to Pass CompTIA Cloud+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build something in a free cloud account</h3>
              <p>
                Cloud+ is vendor-neutral, but the ideas are easier once you have done them. Create a network with public and private subnets, put two small instances behind a load balancer in two zones, take a snapshot and restore it, then tear it all down with infrastructure as code.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the pairs that get swapped</h3>
              <p>
                Many questions turn on one word: RTO or RPO, incremental or differential, horizontal or vertical scaling, blue-green or canary, rehost or replatform, IDS or IPS, SAML or OpenID Connect, 401 or 403. Write each pair down with a one-line example.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Troubleshoot from the symptom</h3>
              <p>
                Troubleshooting questions give a symptom and expect the cause: a 429 means throttling, a name that fails while the IP works means DNS, expired tokens on one server mean clock drift, and private instances with no internet need a NAT route.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Cloud architecture is the biggest domain at 23 percent, so give its two drills extra time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CompTIA Cloud+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cloudplus" />
        </div>
      </div>

      <SampleQuestionsV2 examId="cloudplus" />

      <ExamRelatedTests examId="cloudplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CompTIA Cloud+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 220 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-cloud-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
