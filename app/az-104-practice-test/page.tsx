import "@/lib/v2/banks/az104";
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

const title = "Free Microsoft AZ-104 Practice Test 2026";
const metaDescription =
  "Free AZ-104 practice tests: 210 original questions on Entra ID, RBAC, Azure Policy, storage, VMs, App Service, networking, Azure Monitor and Backup, all explained.";
const description =
  "Free Microsoft AZ-104 (Azure Administrator) practice tests with 210 original questions weighted to the skills measured as of October 26, 2023: Microsoft Entra users and groups, Azure roles, Azure Policy, locks, tags and costs, storage access, redundancy and blob tiers, ARM templates and Bicep, virtual machines and scale sets, containers and App Service, virtual networks, NSGs, Bastion, DNS and load balancers, Azure Monitor, Azure Backup and Site Recovery.";

const faqs = [
  {
    q: "How many questions are on the AZ-104 exam?",
    a: "Microsoft does not publish a fixed number. You get 100 minutes, and Microsoft says most of its certification exams have between 40 and 60 questions. Question types can include multiple choice, build lists, drag and drop, hot areas, case studies and, on some role-based exams, labs.",
  },
  {
    q: "What is the passing score for AZ-104?",
    a: "You need a score of 700 or greater on a scale of 1 to 1,000. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the AZ-104 exam?",
    a: "Five skill areas, in the skills measured as of October 26, 2023, which is still the current list: Manage Azure identities and governance 20 to 25 percent, Implement and manage storage 15 to 20 percent, Deploy and manage Azure compute resources 20 to 25 percent, Implement and manage virtual networking 15 to 20 percent, and Monitor and maintain Azure resources 10 to 15 percent.",
  },
  {
    q: "Is AZ-104 harder than AZ-900?",
    a: "Yes. AZ-900 asks what Azure services are for. AZ-104 asks how to configure and troubleshoot them: which role or policy effect fits, why a peering or NSG rule blocks traffic, which storage setting or backup vault a task needs. Hands-on time in the Azure portal, the Azure CLI and PowerShell helps a lot.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 50 questions in 100 minutes with free navigation and flagging. Most are multiple choice, with choose-two, yes or no statement sets, ordering and typed-number items. Labs and case studies are not included, and the questions are original, not Microsoft's.",
  },
  {
    q: "Is the Tigertest AZ-104 practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the identity, governance and two storage drills are free; the compute, networking and monitoring drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AZ-104 practice test, Microsoft AZ-104 practice exam, free AZ-104 questions, Azure Administrator practice test, AZ-104 exam prep 2026, Azure Administrator Associate practice questions, Azure admin exam questions",
  alternates: {
    canonical: `${siteUrl}/az-104-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/az-104-practice-test`,
    images: [{ url: shareImageUrl("az104"), width: 1200, height: 630, alt: "Tigertest free Microsoft AZ-104 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("az104")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Microsoft AZ-104 Practice Tests",
      description,
      url: `${siteUrl}/az-104-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("az104"),
      featureList: [
        "210 original AZ-104 practice questions",
        "2 full 50-question practice tests in 100 minutes",
        "9 drills covering every skills measured area",
        "Choose-two, yes or no statement, ordering and typed-number items",
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
        classFaqJsonLd("az104"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Manage Azure identities and governance", weight: "20-25%" },
  { name: "Implement and manage storage", weight: "15-20%" },
  { name: "Deploy and manage Azure compute resources", weight: "20-25%" },
  { name: "Implement and manage virtual networking", weight: "15-20%" },
  { name: "Monitor and maintain Azure resources", weight: "10-15%" },
];

export default function Az104LandingPage() {
  return (
    <div data-theme="az104" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Microsoft AZ-104 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/az-104/dashboard"
            shortName="AZ-104"
            subtitle="210 questions weighted to the AZ-104 skills measured, from Entra ID to Azure Backup. Free to start, no account needed."
            shots={{ mobile: "/landing/az104-mobile.png", desktop: "/landing/az104-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="az104" />

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
                Users, groups and roles; governance and costs; storage access; files and blobs; templates and App Service; virtual machines; virtual networks; network security and load balancing; and monitoring and backup. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 100 minutes with flagging and review, at the pace of the real exam. Pick roles, policy effects and network settings, judge yes or no statements and put recovery steps in order. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the AZ-104 Skills Measured
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Microsoft publishes the skills measured and their weights in the AZ-104 study guide. Every practice test follows the version as of October 26, 2023, with current product names and facts: Microsoft Entra ID, the retirement of Basic public IPs and Basic Load Balancer, VNet flow logs and encryption at host.
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
                src={getTigerAsset("az104", 3)}
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
            How to Pass AZ-104
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build it yourself</h3>
              <p>
                AZ-104 rewards hands-on time. Create a free account or a sandbox subscription and set up a VNet with two peered networks, an NSG, a storage account with a SAS and a lifecycle rule, a VM in an availability zone and a backup policy. Questions about why something is blocked are easy once you have seen it happen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the limits and defaults</h3>
              <p>
                Many questions turn on one setting: five reserved IPs in every subnet, NSG priorities from 100 to 4096, Archive only on LRS, GRS and RA-GRS, deployment slots from the Standard App Service tier, a Recovery Services vault in the same region as its VMs. Note each one as you meet it in a drill.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who can do what</h3>
              <p>
                Identity and governance is up to a quarter of the exam. Know the difference between Owner, Contributor, User Access Administrator and the data roles, how role assignments add up across scopes, and when Azure Policy, a lock or a deny assignment is the thing that stops a change.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by area. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Before the real exam, try Microsoft&apos;s exam sandbox so the question types and any labs are familiar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AZ-104 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="az104" />
        </div>
      </div>

      <SampleQuestionsV2 examId="az104" />

      <ExamRelatedTests examId="az104" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass AZ-104?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 210 questions across all five skill areas.</p>
          <ExamLandingCTA dashboardHref="/az-104/dashboard" />
        </div>
      </div>
    </div>
  );
}
