import "@/lib/v2/banks/techplus";
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

const title = "Free CompTIA Tech+ Practice Test 2026";
const metaDescription =
  "Free CompTIA Tech+ (FC0-U71) practice tests: 214 original questions on computing basics, hardware, networking, software, programming, databases and security, all explained.";
const description =
  "Free CompTIA Tech+ (FC0-U71) practice tests with 214 original questions weighted to the exam objectives: number systems and units, the troubleshooting steps, computing devices, internal components, storage, peripherals and ports, virtualization and cloud models, internet services, networking and Wi-Fi, operating systems, software, browsers and AI, programming concepts, databases and backups, and security basics from passwords to Wi-Fi encryption.";

const faqs = [
  {
    q: "How many questions are on the CompTIA Tech+ exam?",
    a: "A maximum of 70 multiple-choice questions in 60 minutes. The exam code is FC0-U71, and CompTIA offers it in English and Japanese.",
  },
  {
    q: "What is the passing score for CompTIA Tech+?",
    a: "You need 650 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Tech+ exam?",
    a: "Six domains in the FC0-U71 objectives: IT Concepts and Terminology 13 percent, Infrastructure 24 percent, Applications and Software 18 percent, Software Development Concepts 13 percent, Data and Database Fundamentals 13 percent, and Security 19 percent.",
  },
  {
    q: "Is Tech+ the same as CompTIA IT Fundamentals (ITF+)?",
    a: "Tech+ replaced IT Fundamentals+. The ITF+ exam (FC0-U61) retired on July 31, 2025 in English, and Tech+ (FC0-U71) is the entry-level exam that took its place, with updated objectives that now include uses of AI. CompTIA recommends it for high school students and people new to IT, with no experience needed.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 70 questions in 60 minutes with free navigation and flagging, the most the real exam can have. Almost all are multiple choice like the real exam. The questions are original, not CompTIA's.",
  },
  {
    q: "Is the Tigertest CompTIA Tech+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the IT concepts, hardware, networking and operating systems drills are free; the software, development, data and two security drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CompTIA Tech+ practice test, Tech+ practice exam, FC0-U71 practice test, free Tech+ questions, CompTIA IT Fundamentals practice test, ITF+ practice test, Tech+ exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/comptia-tech-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-tech-plus-practice-test`,
    images: [{ url: shareImageUrl("techplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Tech+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("techplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Tech+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-tech-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("techplus"),
      featureList: [
        "214 original CompTIA Tech+ practice questions",
        "2 full 70-question practice tests in 60 minutes",
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
        classFaqJsonLd("techplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "IT Concepts and Terminology", weight: "13%" },
  { name: "Infrastructure", weight: "24%" },
  { name: "Applications and Software", weight: "18%" },
  { name: "Software Development Concepts", weight: "13%" },
  { name: "Data and Database Fundamentals", weight: "13%" },
  { name: "Security", weight: "19%" },
];

export default function TechPlusLandingPage() {
  return (
    <div data-theme="techplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Tech+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-tech-plus/dashboard"
            shortName="Tech+"
            subtitle="214 questions weighted to the Tech+ FC0-U71 objectives, from binary to Wi-Fi security. Free to start, no account needed."
            shots={{ mobile: "/landing/techplus-mobile.png", desktop: "/landing/techplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="techplus" />

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
                IT concepts; hardware and storage; networking and cloud; operating systems; software, browsers and AI; software development; data and databases; security concepts; and passwords, encryption and Wi-Fi. Questions you miss come back until you have mastered them.
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
                Two 70-question tests in 60 minutes with flagging and review, the full length and pace of the real exam. Questions mix every domain in the weights CompTIA publishes. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the Tech+ Exam Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the FC0-U71 exam objectives with six domains and their weights. Every practice test follows them, from number systems and the troubleshooting steps to Wi-Fi 6, cloud models, AI tools and current password guidance.
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
                src={getTigerAsset("techplus", 3)}
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
            How to Pass CompTIA Tech+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Look at real settings</h3>
              <p>
                Tech+ is an entry-level exam, so most questions ask what something is for. Open a computer's settings, a home router's admin page and a browser's privacy options, and look at the parts you read about. Seeing Wi-Fi bands, file permissions and cache settings once makes the questions easy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the number systems</h3>
              <p>
                Converting between binary, decimal, hexadecimal and octal, and telling bits from bytes, are quick marks once practised. Write out the place values (1, 2, 4, 8, 16...) and work a few conversions by hand each day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the six troubleshooting steps</h3>
              <p>
                CompTIA asks the steps in order: identify the problem, establish a theory, test it, plan and implement the fix, verify full functionality, then document. Know what belongs in each step and what to do when a theory fails.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Infrastructure and security together are over 40 percent of the exam, so give them the most time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CompTIA Tech+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="techplus" />
        </div>
      </div>

      <SampleQuestionsV2 examId="techplus" />

      <ExamRelatedTests examId="techplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CompTIA Tech+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 214 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-tech-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
