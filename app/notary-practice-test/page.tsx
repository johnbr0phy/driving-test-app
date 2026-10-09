import { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Notary Practice Test 2026 - Notary Public Exam Prep";
const description =
  "Free notary public practice tests with 200 questions on the notary law every state tests: acknowledgments, jurats, oaths and affirmations, identifying signers, the journal and seal, prohibited acts, fees, the commission and liability. Scenario questions with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "notary practice test, notary public exam practice questions, notary exam prep 2026, California notary practice test, New York notary practice exam, notary test questions, free notary practice test, notary study guide",
  alternates: {
    canonical: `${siteUrl}/notary-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/notary-practice-test`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Notary Practice Tests",
      description,
      url: `${siteUrl}/notary-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 notary practice questions",
        "4 practice tests on the notary duties every state tests",
        "Training sets for every domain",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which states require a notary exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "About a dozen states test notary applicants, including California, New York, Louisiana, Nebraska, Ohio, Oregon, Utah, Montana, Maine, Hawaii and Colorado, and others require a course. The exam content is the general notary law in this bank plus your state's own rules on fees, terms, the journal and remote notarization.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover my state's exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It covers the principles every state tests and flags where states differ. Study it first, then read your state's notary handbook for its specific numbers. No question here states one state's rule as if it applied everywhere.",
          },
        },
        {
          "@type": "Question",
          name: "What is the hardest part of the notary exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scenarios where a customer, boss or relative pressures you to skip a step: notarize without the signer present, backdate, fill in a certificate for someone else, or certify a birth certificate. The right answer is almost always to refuse, and the explanations here tell you why.",
          },
        },
        {
          "@type": "Question",
          name: "Can a notary give legal advice or choose the notarial act?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. A notary who is not an attorney may describe the acts available but may not recommend one, prepare or explain a document, or advise on immigration matters. The signer, or the document's drafter, decides which act is needed.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest notary practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Notarial Acts & Certificates", weight: "28%" },
  { name: "Identification & Signers", weight: "20%" },
  { name: "Journal, Seal & Records", weight: "20%" },
  { name: "Ethics & Prohibited Acts", weight: "20%" },
  { name: "Commission & Liability", weight: "12%" },
];

export default function NotaryLandingPage() {
  return (
    <div data-theme="notary" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Notary Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/notary/dashboard"
            shortName="Notary"
            subtitle="200 questions on the notary law every state's exam tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/notary-mobile.png", desktop: "/landing/notary-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Four sets covering notarial acts and certificates, identifying signers, the journal and seal, and ethics, the commission and liability. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests written the way state notary exams ask: a signer walks in with a document and a problem, and you pick the one thing a notary may do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the Law Every State Tests
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                California, New York, Louisiana, Nebraska, Ohio, Oregon, Utah, Montana, Colorado and other states test their notaries, and the core of every exam is the same: personal appearance, identification, the acts, the certificate, the journal and seal, and what a notary may never do. Each practice test follows this spread, and nothing states one state&apos;s number as universal.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/tiger_face_01.png"
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The notary practice test is brand new. If a question looks wrong or your state&apos;s rule differs, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the Notary Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know the difference between an acknowledgment and a jurat</h3>
              <p>
                An acknowledgment certifies the signer appeared, was identified and signed willingly, and the document can be signed beforehand. A jurat adds an oath and the signer must sign in front of you. Half the scenario questions turn on which one the certificate calls for and who gets to choose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Personal appearance and identification are not negotiable</h3>
              <p>
                No phone, no video (outside remote online notarization), no notarizing for a boss or spouse who is not in the room. Learn which IDs count, what a credible witness is, and when to refuse: coercion, confusion, an incomplete document, a signer you cannot identify.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. The seal and journal are yours</h3>
              <p>
                Even if your employer paid for the seal, it is your property and no one else may use it. The journal records every act in order and stays under your control. Know what goes in an entry, what to do when the seal is lost, and what happens when the commission ends.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Then read your state&apos;s handbook for the numbers</h3>
              <p>
                Fees, commission term, bond amount, journal retention and remote notarization rules differ by state. This bank teaches the principles and marks the state-dependent parts. Clear 80 percent here, then learn your state&apos;s figures from the official handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Notary Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which states require a notary exam?</h3>
            <p className="text-gray-600">
              About a dozen states test notary applicants, including California, New York, Louisiana, Nebraska, Ohio, Oregon, Utah, Montana, Maine, Hawaii and Colorado, and others require a course. The exam content is the general notary law in this bank plus your state&apos;s own rules on fees, terms, the journal and remote notarization.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover my state&apos;s exam?</h3>
            <p className="text-gray-600">
              It covers the principles every state tests and flags where states differ. Study it first, then read your state&apos;s notary handbook for its specific numbers. No question here states one state&apos;s rule as if it applied everywhere.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is the hardest part of the notary exam?</h3>
            <p className="text-gray-600">
              Scenarios where a customer, boss or relative pressures you to skip a step: notarize without the signer present, backdate, fill in a certificate for someone else, or certify a birth certificate. The right answer is almost always to refuse, and the explanations here tell you why.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Can a notary give legal advice or choose the notarial act?</h3>
            <p className="text-gray-600">
              No. A notary who is not an attorney may describe the acts available but may not recommend one, prepare or explain a document, or advise on immigration matters. The signer, or the document&apos;s drafter, decides which act is needed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest notary practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Notary Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every notary duty.</p>
          <ExamLandingCTA dashboardHref="/notary/dashboard" />
        </div>
      </div>
    </div>
  );
}
