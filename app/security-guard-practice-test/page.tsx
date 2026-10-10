import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Security Guard Practice Test 2026 - Guard Card & License Exam Prep";
const description =
  "Free security guard practice tests with 200 questions on the topics every unarmed guard card and license exam covers: powers to arrest and use of force, observation and patrol, access control, report writing, radio communication, emergency response and terrorism awareness. Explanations on every answer.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "security guard practice test, guard card practice test, security guard license test, unarmed security exam, security guard test questions, security officer exam prep 2026, free security guard practice test",
  alternates: {
    canonical: `${siteUrl}/security-guard-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/security-guard-practice-test`,
    images: [{ url: "/og/security", width: 1200, height: 630, alt: "TigerTest free security guard practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/security"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Security Guard Practice Tests",
      description,
      url: `${siteUrl}/security-guard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 security guard practice questions",
        "4 practice tests across all six content areas",
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
          name: "How do I get a security guard license or guard card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states license unarmed guards through a state agency such as the department of public safety, the state police or a licensing board. The usual steps are a background check with fingerprints, a pre-assignment training course of roughly 8 to 40 hours depending on the state, and a written exam. A few states have no state license and leave requirements to employers, so check your state's rules.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the security guard exam and what score do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Guard exams cover the role of private security, legal powers and limits including arrest and use of force, observation and patrol, access control, report writing and communication, emergency response, and safety and terrorism awareness. Most are multiple choice with a pass mark of around 70 percent, though the exact number of questions and passing score vary by state.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test cover my state's law?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These questions cover the universal portion of guard training that is common nationwide. Arrest powers, training hours, licensing bodies, weapons rules and renewal periods vary by state, so study your state's training manual or statute for those details alongside this practice.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include armed guard or firearms content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. This practice test is for the unarmed guard exam. Armed guard permits require separate firearms training, range qualification and a separate exam in every state that issues them, and that content is not included here.",
          },
        },
        {
          "@type": "Question",
          name: "Who can take the security guard exam, and is the TigerTest practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The minimum age is typically 18 for unarmed guards, with a clean criminal background check; some states set 21 for armed work. The TigerTest practice test is free: all four practice tests and all training sets, with no account required. Create a free account if you want progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Role & Professionalism", weight: "16%" },
  { name: "Legal Powers & Limits", weight: "22%" },
  { name: "Observation, Patrol & Access Control", weight: "20%" },
  { name: "Report Writing & Communication", weight: "16%" },
  { name: "Emergency Response", weight: "18%" },
  { name: "Safety & Terrorism Awareness", weight: "8%" },
];

export default function SecurityGuardLandingPage() {
  return (
    <div data-theme="security" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="security" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/security-guard/dashboard"
            shortName="Security Guard"
            subtitle="200 questions on legal powers, use of force, patrol, access control, report writing and emergency response. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/security-mobile.png", desktop: "/landing/security-desktop.png" }}
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
                Four sets: role, ethics and legal powers; observation, patrol and access control; report writing and communication; and emergencies, safety and terrorism awareness. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted the way guard card exams are, with the legal section carrying the most questions and an explanation of why each answer is right and the common wrong pick is wrong.
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
                Built on the Pre-Assignment Curriculum
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every state&apos;s unarmed guard course teaches the same core: what a guard may and may not do, how to observe and report, how to control access and how to respond when something goes wrong. The practice tests here weight the legal section most heavily because that is where candidates lose the most points.
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
                src={getTigerAsset("security", 1)}
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
            The security guard practice test is brand new. If a question looks wrong or your state&apos;s course teaches a topic differently, tell us.
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
            How to Pass the Security Guard Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the limits of your authority</h3>
              <p>
                A guard has the powers of a private citizen and the property owner, not a police officer. Know the use of force continuum, when a detention becomes false imprisonment, why searches need consent and why most companies tell you to observe and report instead of making a citizen&apos;s arrest. When a question offers an aggressive option and a cautious one, the cautious one is almost always right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Think observe, deter, report</h3>
              <p>
                Exam writers test whether you understand the job. Suspicion comes from behavior, not appearance; patrols are varied so they cannot be timed; doors are tested by hand; unknown packages are not touched; and anything unusual goes in the log. If an answer has you leaving your post, ignoring a hazard or acting alone in a dangerous situation, eliminate it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Memorize the acronyms</h3>
              <p>
                Who, what, when, where, why and how for reports. PASS for extinguishers and RACE for fire response. Fire classes A, B, C, D and K. Run, Hide, Fight for an active threat. The phonetic alphabet from Alpha to Zulu. These are the questions you should never miss.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Add your state&apos;s specifics</h3>
              <p>
                This practice covers the universal material. Your state&apos;s manual adds the licensing agency, training hours, renewal period, which crimes allow a citizen&apos;s arrest and any rules on handcuffs or pepper spray. Read those sections once, then drill here until you clear 85 percent on every set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Security Guard Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How do I get a security guard license or guard card?</h3>
            <p className="text-gray-600">
              Most states license unarmed guards through a state agency such as the department of public safety, the state police or a licensing board. The usual steps are a background check with fingerprints, a pre-assignment training course of roughly 8 to 40 hours depending on the state, and a written exam. A few states have no state license and leave requirements to employers, so check your state&apos;s rules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the security guard exam and what score do I need to pass?</h3>
            <p className="text-gray-600">
              Guard exams cover the role of private security, legal powers and limits including arrest and use of force, observation and patrol, access control, report writing and communication, emergency response, and safety and terrorism awareness. Most are multiple choice with a pass mark of around 70 percent, though the exact number of questions and passing score vary by state.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this practice test cover my state&apos;s law?</h3>
            <p className="text-gray-600">
              No. These questions cover the universal portion of guard training that is common nationwide. Arrest powers, training hours, licensing bodies, weapons rules and renewal periods vary by state, so study your state&apos;s training manual or statute for those details alongside this practice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this include armed guard or firearms content?</h3>
            <p className="text-gray-600">
              No. This practice test is for the unarmed guard exam. Armed guard permits require separate firearms training, range qualification and a separate exam in every state that issues them, and that content is not included here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Who can take the security guard exam, and is the TigerTest practice test free?</h3>
            <p className="text-gray-600">
              The minimum age is typically 18 for unarmed guards, with a clean criminal background check; some states set 21 for armed work. The TigerTest practice test is free: all four practice tests and all training sets, with no account required. Create a free account if you want progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="security" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the Security Guard Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all six content areas.</p>
          <ExamLandingCTA dashboardHref="/security-guard/dashboard" />
        </div>
      </div>
    </div>
  );
}
