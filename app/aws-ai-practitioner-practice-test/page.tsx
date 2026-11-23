import "@/lib/v2/banks/awsaif";
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

const title = "Free AWS AI Practitioner Practice Test 2026 (AIF-C01)";
const metaDescription =
  "Free AWS Certified AI Practitioner practice tests: 201 original AIF-C01 questions on AI and ML basics, generative AI, Amazon Bedrock, RAG, prompting, responsible AI and security, all explained.";
const description =
  "Free AWS Certified AI Practitioner (AIF-C01) practice tests with 201 original questions weighted to the AWS exam guide: AI and ML concepts and the ML lifecycle, generative AI concepts and AWS services such as Amazon Bedrock, SageMaker AI and Bedrock AgentCore, foundation model design, RAG and prompt engineering, fine-tuning and evaluation, responsible AI with Bedrock Guardrails, and security, compliance and governance.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AWS AI Practitioner practice test, AIF-C01 practice exam, AIF-C01 questions, AWS Certified AI Practitioner practice questions, AWS AI Practitioner exam prep 2026, free AIF-C01 practice test, Amazon Bedrock practice questions",
  alternates: {
    canonical: `${siteUrl}/aws-ai-practitioner-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aws-ai-practitioner-practice-test`,
    images: [{ url: shareImageUrl("awsaif"), width: 1200, height: 630, alt: "Tigertest free AWS AI Practitioner practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("awsaif")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the AWS AI Practitioner exam?",
    a: "The AIF-C01 exam has 65 questions in 90 minutes. 50 of them count toward your score and 15 are unscored questions AWS is trying out, which are not marked. Unanswered questions count as wrong and there is no penalty for guessing.",
  },
  {
    q: "What score do I need to pass AIF-C01?",
    a: "AWS reports a scaled score from 100 to 1,000, and the minimum passing score is 700. The scoring is compensatory, so you pass on the overall score and do not need to pass each domain. A scaled 700 is not a fixed percent of questions.",
  },
  {
    q: "What is on the AIF-C01 exam?",
    a: "Five domains from the AWS exam guide: Fundamentals of AI and ML, 20 percent; Fundamentals of Generative AI, 24 percent; Applications of Foundation Models, 28 percent; Guidelines for Responsible AI, 14 percent; and Security, Compliance, and Governance for AI Solutions, 14 percent. It is aimed at people who use AI on AWS, not people who build models, so coding and tuning are out of scope.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "It is close. Each practice test is 65 questions in 90 minutes with flagging and review, mixing multiple choice items (one answer of four) with multiple response items that say how many to choose, the two question types in the current exam guide. Scores here are percent correct; the real exam reports a scaled score from 100 to 1,000, with 700 to pass.",
  },
  {
    q: "Is the Tigertest AWS AI Practitioner practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and four drills (AI and ML Basics, ML Lifecycle, GenAI Concepts and GenAI on AWS) are free; Practice Test 2 and the FM Apps and Prompting, Fine-Tuning and Evaluation, Responsible AI and Security and Governance drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AWS AI Practitioner Practice Tests",
      description,
      url: `${siteUrl}/aws-ai-practitioner-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("awsaif"),
      featureList: [
        "201 original AIF-C01 practice questions",
        "2 full 65-question practice tests in 90 minutes",
        "8 drills that follow the exam guide's task statements",
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
        classFaqJsonLd("awsaif"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Applications of Foundation Models", weight: "28%" },
  { name: "Fundamentals of Generative AI", weight: "24%" },
  { name: "Fundamentals of AI and ML", weight: "20%" },
  { name: "Guidelines for Responsible AI", weight: "14%" },
  { name: "Security, Compliance, and Governance for AI Solutions", weight: "14%" },
];

export default function AwsAifLandingPage() {
  return (
    <div data-theme="awsaif" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AWS AI Practitioner Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aws-ai-practitioner/dashboard"
            shortName="AWS AI Practitioner"
            subtitle="201 questions weighted to the AIF-C01 exam guide. Free to start, no account needed."
            shots={{ mobile: "/landing/awsaif-mobile.png", desktop: "/landing/awsaif-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="awsaif" />

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
                Eight drills that follow the exam guide: AI and ML basics, the ML lifecycle, generative AI concepts, GenAI on AWS, foundation model apps and prompting, fine-tuning and evaluation, responsible AI, and security and governance. Questions you miss come back until you have mastered them.
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
                Two 65-question tests in 90 minutes, written in the real exam&apos;s style: a team has a business problem and you pick the AI approach, AWS service or setting that fits, or choose the two statements that are true. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the AIF-C01 Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AWS publishes the AIF-C01 exam guide with its domains, weights and in-scope services, last revised October 29, 2026. The newest version adds agentic AI, the Model Context Protocol and context engineering, and names services such as Amazon Bedrock AgentCore, Strands Agents, Kiro and Amazon Quick. Every practice test here follows that weighting and uses current service names.
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
                src={getTigerAsset("awsaif", 3)}
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
            How to Pass the AWS AI Practitioner Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Match each AWS AI service to its job</h3>
              <p>
                Transcribe turns speech into text and Polly turns text into speech. Comprehend finds sentiment and entities, Textract reads forms, Rekognition analyzes images and Lex builds chatbots. Bedrock gives API access to foundation models and SageMaker AI is for building and hosting your own. Many questions are answered by picking the right service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the cheapest way to customize a model</h3>
              <p>
                Prompt engineering and RAG change only what goes into the prompt. Fine-tuning and continued pre-training change the model&apos;s weights and need data and Provisioned Throughput to serve, and pre-training from scratch costs the most. Questions often ask which approach meets a need at the lowest cost.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Guardrails policies and the evaluation metrics</h3>
              <p>
                Denied topics, word filters, content filters, sensitive information filters and contextual grounding checks each solve a different problem. On evaluation, ROUGE is for summaries, BLEU for translation and BERTScore for meaning, while precision, recall and F1 score classification models.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice choose-two items and drill your weak domain</h3>
              <p>
                Multiple response questions need every correct choice to score, so a half-remembered answer shows up fast. Tigertest tracks your accuracy by domain. The exam is scored from 100 to 1,000 with 700 to pass, which is not a fixed percent, so retake the drill you missed most until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AWS AI Practitioner Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="awsaif" />
        </div>
      </div>

      <SampleQuestionsV2 examId="awsaif" />

      <ExamRelatedTests examId="awsaif" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the AWS AI Practitioner Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 201 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/aws-ai-practitioner/dashboard" />
        </div>
      </div>
    </div>
  );
}
