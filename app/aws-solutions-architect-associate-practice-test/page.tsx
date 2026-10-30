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

const title = "Free AWS Solutions Architect Associate Practice Test 2026";
const metaDescription =
  "Free AWS Solutions Architect Associate SAA-C03 practice tests: 200 scenario questions on secure, resilient, high-performing and cost-optimized architectures, all explained.";
const description =
  "Free AWS Certified Solutions Architect - Associate (SAA-C03) practice tests with 200 original scenario questions weighted to the exam guide: secure access, workloads and data, scalable and highly available designs, storage, compute, database and network performance, and cost optimization.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AWS Solutions Architect Associate practice test, SAA-C03 practice exam, AWS SAA practice questions, AWS solutions architect exam prep 2026, free SAA-C03 practice test, AWS associate certification questions",
  alternates: {
    canonical: `${siteUrl}/aws-solutions-architect-associate-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aws-solutions-architect-associate-practice-test`,
    images: [{ url: shareImageUrl("awssaa"), width: 1200, height: 630, alt: "Tigertest free AWS Solutions Architect Associate practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("awssaa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the AWS Solutions Architect Associate exam?",
    a: "65 questions in 130 minutes, of which 50 are scored and 15 are unscored. The score is scaled from 100 to 1000 and 720 is passing. Questions are multiple choice (one answer) and multiple response (two or more).",
  },
  {
    q: "What is on the SAA-C03 exam?",
    a: "Four domains: Design Secure Architectures 30 percent, Design Resilient Architectures 26 percent, Design High-Performing Architectures 24 percent, and Design Cost-Optimized Architectures 20 percent. Most questions describe a company's requirement and constraint and ask which design meets it best.",
  },
  {
    q: "Should I take the Cloud Practitioner exam first?",
    a: "It is optional. AWS recommends about a year of hands-on experience designing on AWS for the Solutions Architect Associate. The Cloud Practitioner exam tests what each service is for, while the associate exam tests choosing between services under constraints such as cost, latency and availability.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Yes. Each practice test is 65 questions in 130 minutes with flagging and review, mixing single-answer items with choose-two items, weighted to the four SAA-C03 domains. These are original practice questions, not real exam questions. Scores here are percent correct; the real exam reports a scaled score from 100 to 1000, with 720 to pass.",
  },
  {
    q: "Is the Tigertest AWS Solutions Architect practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AWS Solutions Architect Associate Practice Tests",
      description,
      url: `${siteUrl}/aws-solutions-architect-associate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original SAA-C03 practice questions",
        "2 full 65-question practice tests in 130 minutes",
        "8 drills across the four SAA-C03 domains",
        "Choose-two multiple-response items",
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
        classFaqJsonLd("awssaa"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Design Secure Architectures", weight: "30%" },
  { name: "Design Resilient Architectures", weight: "26%" },
  { name: "Design High-Performing Architectures", weight: "24%" },
  { name: "Design Cost-Optimized Architectures", weight: "20%" },
];

export default function AwsSaaLandingPage() {
  return (
    <div data-theme="awssaa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AWS Solutions Architect Associate Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aws-solutions-architect/dashboard"
            shortName="AWS SAA"
            subtitle="200 scenario questions weighted to the SAA-C03 exam guide. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/awssaa-mobile.png", desktop: "/landing/awssaa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="awssaa" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Focused Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The four exam domains split into eight drills: secure access, secure workloads, data security, loosely coupled design, high availability and DR, storage and compute, databases and networking, and cost. Questions you miss come back until you have mastered them.
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
                Two 65-question tests in 130 minutes, written in the real exam&apos;s style: a company needs something under a constraint, and you pick the design that fits best, sometimes two parts of it. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the SAA-C03 Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AWS publishes the domain weighting for the Solutions Architect Associate exam. Every practice test here follows it, and the questions use current service names and features, so nothing you learn is a retired product.
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
                src={getTigerAsset("awssaa", 1)}
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
            How to Pass the AWS Solutions Architect Associate Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read for the constraint</h3>
              <p>
                Most questions name a requirement and a constraint: least operational overhead, lowest cost, no internet traffic, an RTO of minutes. Two options usually work; the constraint decides which one is best. Underline it before you look at the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the pairs that look alike</h3>
              <p>
                Multi-AZ for availability, read replicas for read scaling. Security groups are stateful allow lists, network ACLs are stateless and can deny. SQS standard for scale, FIFO for order. CloudFront for caching, Global Accelerator for static IPs and fast failover. Gateway endpoints for S3 and DynamoDB, interface endpoints for the rest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the storage and pricing ladders</h3>
              <p>
                S3 Standard, Standard-IA, One Zone-IA, Glacier Instant, Flexible and Deep Archive, with their minimum durations and retrieval times. EBS gp3, io2, st1 and sc1. On-Demand, Savings Plans, Reserved Instances and Spot, and when each one is the cheapest correct answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain</h3>
              <p>
                Tigertest tracks your accuracy by topic. The exam is scored on a 100 to 1000 scale with 720 to pass, which is not a fixed percent. Retake the drill you missed most until you clear 80 percent with room to spare, then take Practice Test 2 cold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AWS Solutions Architect Associate Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="awssaa" />
        </div>
      </div>

      <ExamRelatedTests examId="awssaa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the AWS Solutions Architect Associate?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/aws-solutions-architect/dashboard" />
        </div>
      </div>
    </div>
  );
}
