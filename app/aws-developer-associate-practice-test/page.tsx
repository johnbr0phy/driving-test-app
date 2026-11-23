import "@/lib/v2/banks/awsdva";
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

const title = "Free AWS Developer Associate Practice Test 2026 (DVA-C03)";
const metaDescription =
  "Free AWS Certified Developer - Associate practice tests: 212 original DVA-C03 questions on Lambda, DynamoDB, API Gateway, IAM and KMS, CI/CD with CodeDeploy, X-Ray and AI service security, all explained.";
const description =
  "Free AWS Certified Developer - Associate (DVA-C03) practice tests with 212 original questions weighted to the AWS exam guide: developing with Lambda, SQS, SNS, EventBridge, API Gateway and DynamoDB, authentication and encryption with IAM, Cognito, STS, KMS and Secrets Manager, securing Amazon Bedrock and AgentCore, testing and deploying with SAM, CDK, CodeDeploy and CodePipeline, and troubleshooting and optimizing with CloudWatch and X-Ray.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AWS Developer Associate practice test, DVA-C03 practice exam, DVA-C02 practice test, AWS Certified Developer Associate practice questions, AWS developer exam prep 2026, free DVA-C03 practice test",
  alternates: {
    canonical: `${siteUrl}/aws-developer-associate-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aws-developer-associate-practice-test`,
    images: [{ url: shareImageUrl("awsdva"), width: 1200, height: 630, alt: "Tigertest free AWS Developer Associate practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("awsdva")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the AWS Developer Associate exam?",
    a: "The DVA-C03 exam has 65 questions in 130 minutes. 50 of them count toward your score and 15 are unscored questions AWS is trying out, which are not marked. Unanswered questions count as wrong and there is no penalty for guessing.",
  },
  {
    q: "What score do I need to pass DVA-C03?",
    a: "AWS reports a scaled score from 100 to 1,000, and the minimum passing score is 720. The scoring is compensatory, so you pass on the overall score and do not need to pass each domain. A scaled 720 is not a fixed percent of questions.",
  },
  {
    q: "Is it DVA-C02 or DVA-C03?",
    a: "AWS is moving the exam to DVA-C03. Registration for DVA-C03 opened on October 27, 2026, the last day to take DVA-C02 is November 30, 2026, and DVA-C03 is the exam from December 1, 2026. This practice test follows the DVA-C03 guide, which keeps most DVA-C02 content and adds AI-assisted development and AI service security.",
  },
  {
    q: "What is on the DVA-C03 exam?",
    a: "Four domains from the AWS exam guide: Development with AWS Services, 30 percent; Security, 26 percent; Testing and Deployment, 22 percent; and Troubleshooting and Optimization, 22 percent. It is aimed at developers with a year or more of hands-on AWS experience, so designing whole architectures and building CI/CD pipelines from scratch are out of scope.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 65 questions in 130 minutes with flagging and review, mixing multiple choice items (one answer of four) with multiple response items that say how many to choose, the two question types in the exam guide. Scores here are percent correct; the real exam reports a scaled score from 100 to 1,000, with 720 to pass.",
  },
  {
    q: "Is the Tigertest AWS Developer Associate practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and five drills (Code for AWS, Lambda, Data Stores, Auth and Access, Encryption and Secrets) are free; Practice Test 2 and the AI Service Security, Artifacts and Testing, CI/CD Deployment, Troubleshooting and Optimization drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AWS Developer Associate Practice Tests",
      description,
      url: `${siteUrl}/aws-developer-associate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("awsdva"),
      featureList: [
        "212 original DVA-C03 practice questions",
        "2 full 65-question practice tests in 130 minutes",
        "10 drills that follow the exam guide's task statements",
        "Multiple choice and choose-two items",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("awsdva"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Development with AWS Services", weight: "30%" },
  { name: "Security", weight: "26%" },
  { name: "Testing and Deployment", weight: "22%" },
  { name: "Troubleshooting and Optimization", weight: "22%" },
];

export default function AwsDvaLandingPage() {
  return (
    <div data-theme="awsdva" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AWS Developer Associate Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aws-developer-associate/dashboard"
            shortName="AWS Developer Associate"
            subtitle="212 questions weighted to the DVA-C03 exam guide. Free to start, no account needed."
            shots={{ mobile: "/landing/awsdva-mobile.png", desktop: "/landing/awsdva-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="awsdva" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ten drills that follow the exam guide&apos;s task statements: code for AWS, Lambda, data stores, auth and access, encryption and secrets, AI service security, artifacts and testing, CI/CD deployment, troubleshooting and optimization. Questions you miss come back until you have mastered them.
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
                Two 65-question tests in 130 minutes, written in the real exam&apos;s style: a developer has a problem with an app on AWS and you pick the service, setting or code change that fixes it, or choose the two statements that are true. Practice Test 2 is held out of the drills, so it shows how you do on questions you have not seen.
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
                Built on the DVA-C03 Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AWS publishes the DVA-C03 exam guide with its domains, weights and in-scope services. It replaces DVA-C02 from December 1, 2026, moves some weight from development to troubleshooting, and adds AI-assisted development with tools such as Kiro and a new task on securing AI services like Amazon Bedrock and Bedrock AgentCore. Every practice test here follows that weighting and uses current service names.
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
                src={getTigerAsset("awsdva", 3)}
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
            How to Pass the AWS Developer Associate Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know Lambda inside out</h3>
              <p>
                Learn how functions reach a VPC, what layers, extensions and environment variables are for, and how failures are handled: destinations and dead-letter queues for asynchronous calls, partial batch responses and queue redrive policies for SQS, and retry limits for streams.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the DynamoDB arithmetic</h3>
              <p>
                A strongly consistent read uses one RCU per 4 KB, an eventually consistent read half that, and a write one WCU per 1 KB, always rounded up. Pair that with partition key choice, Query against Scan, and when a global or local secondary index fits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get security right in code</h3>
              <p>
                Use roles and temporary credentials rather than stored keys, envelope encryption with KMS data keys, and Secrets Manager for credentials. DVA-C03 adds AI services: blocking models with IAM, filtering prompts with Bedrock Guardrails, and keeping agents to the tools they need.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Learn deployments and debugging together</h3>
              <p>
                Know the CodeDeploy canary and linear configurations, the AppSpec hooks and alarm-based rollback, then how to find a failure with CloudWatch Logs Insights, X-Ray traces and metrics. The exam is scored from 100 to 1,000 with 720 to pass, which is not a fixed percent, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AWS Developer Associate Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="awsdva" />
        </div>
      </div>

      <SampleQuestionsV2 examId="awsdva" />

      <ExamRelatedTests examId="awsdva" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the AWS Developer Associate Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 212 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/aws-developer-associate/dashboard" />
        </div>
      </div>
    </div>
  );
}
