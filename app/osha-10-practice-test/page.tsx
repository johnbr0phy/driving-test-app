import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free OSHA 10 Practice Test 2026 - Construction & General Industry";
const description =
  "Free OSHA 10 practice tests with 200 questions on the Outreach Training Program topics: worker rights, the Focus Four (falls, electrocution, struck-by, caught-in), hazard communication and PPE, health hazards, tools and fire safety. Every answer cites the rule in plain words.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "OSHA 10 practice test, OSHA 10 final exam questions, OSHA 10 hour construction practice test, OSHA 10 general industry practice test, OSHA 30 practice questions, Focus Four quiz, free OSHA 10 practice test 2026",
  alternates: {
    canonical: `${siteUrl}/osha-10-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/osha-10-practice-test`,
    images: [{ url: "/og/osha", width: 1200, height: 630, alt: "TigerTest free OSHA 10 practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/osha"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free OSHA 10 Practice Tests",
      description,
      url: `${siteUrl}/osha-10-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 OSHA 10 practice questions",
        "4 practice tests weighted like the Outreach course",
        "Training sets for every topic including the Focus Four",
        "Instant feedback with explanations that cite the rule",
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
          name: "What is OSHA 10, and who issues the card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OSHA 10 is a 10-hour safety awareness course in the OSHA Outreach Training Program, offered in construction and general industry versions. It is taught by OSHA-authorized trainers, in person or through OSHA-accepted online providers, and the Department of Labor wallet card is issued through the trainer after you complete the course and pass the final exam. The course is voluntary under federal law, though some states, cities, unions and employers require it before you can work on a site.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the OSHA 10 final exam and what score do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The final exam covers the course topics: an introduction to OSHA and worker rights, the Focus Four hazards (falls, electrocution, struck-by and caught-in or between), hazard communication and personal protective equipment, and health hazards, tools and fire safety. Most online providers use a 20 to 40 question multiple-choice final, require 70 percent to pass, and allow up to three attempts before you must retake the course. Check your provider's rules, since the exact length and retake policy vary.",
          },
        },
        {
          "@type": "Question",
          name: "Does an OSHA 10 card expire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OSHA itself does not put an expiration date on Outreach cards. However, some states and many employers and job sites require that the card be no more than three to five years old, so renewal is often required in practice. Check your state's rules and your employer's policy.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between OSHA 10 and OSHA 30?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OSHA 10 is a 10-hour awareness course for entry-level workers. OSHA 30 is a 30-hour course for supervisors, foremen and anyone with safety responsibility; it covers the same core topics in more depth plus managing safety programs. Both come in construction and general industry versions, and neither replaces the hazard-specific training that individual OSHA standards require employers to provide.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest OSHA 10 practice test an official OSHA course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. TigerTest is a free study tool, not an OSHA-authorized Outreach course, and it does not issue a card. Use it to learn the material and check your readiness, then take the real course from an OSHA-authorized trainer. All four practice tests and all training sets are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Intro to OSHA & Worker Rights", weight: "16%" },
  { name: "Fall Protection", weight: "18%" },
  { name: "Electrical Safety", weight: "14%" },
  { name: "Struck-By & Caught-In", weight: "14%" },
  { name: "HazCom & PPE", weight: "20%" },
  { name: "Health Hazards, Tools & Fire", weight: "18%" },
];

export default function OshaLandingPage() {
  return (
    <div data-theme="osha" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="osha" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free OSHA 10 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/osha-10/dashboard"
            shortName="OSHA 10"
            subtitle="200 questions on worker rights, the Focus Four, HazCom and PPE, health hazards, tools and fire safety. Construction and general industry. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/osha-mobile.png", desktop: "/landing/osha-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Topic</h3>
              <p className="text-gray-600">
                Five sets: intro to OSHA and worker rights, fall protection, electrical plus struck-by and caught-in, hazard communication and PPE, and health hazards, tools and fire safety. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that mix every topic the way a course final does, with the 70 percent pass line and an explanation on every item that quotes the rule in plain words, such as 6 feet in construction and 4 feet in general industry.
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
                Built on the Outreach Course Topics
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                OSHA&apos;s 10-hour construction and general industry courses share a required core: an introduction to OSHA, the Focus Four hazards, and hazard communication and PPE, plus elective hours on health hazards, tools and fire. The practice tests here weight the Focus Four and HazCom most heavily because that is where the final exam spends its questions.
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
                src={getTigerAsset("osha", 1)}
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
            The OSHA 10 practice test is brand new. If a question looks wrong or your course covered a topic differently, tell us.
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
            How to Pass the OSHA 10 Final Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the numbers that keep coming back</h3>
              <p>
                Fall protection at 6 feet in construction and 4 feet in general industry, 10 feet on scaffolds. Trench protection at 5 feet, a ladder every 25 feet, spoil 2 feet back. Power lines 10 feet. Guardrails 42 inches, anchors 5,000 pounds. Fatalities reported in 8 hours, hospitalizations in 24. A dozen numbers cover a third of the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Know the Focus Four cold</h3>
              <p>
                Falls, electrocution, struck-by and caught-in or between cause most construction deaths, and the course spends most of its hours on them. For each, be able to name the hazard, the control and the rule: GFCIs and lockout for electrical, swing-radius barricades and spotters for struck-by, trench boxes and machine guards for caught-in.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Read labels and SDS sections by number</h3>
              <p>
                Know the nine GHS pictograms, the two signal words, and the 16 SDS sections well enough to say that first aid is Section 4, fire-fighting is Section 5 and PPE is Section 8. Then memorize the hierarchy of controls from elimination down to PPE; the exam loves to ask which control is most or least effective.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak topic</h3>
              <p>
                TigerTest tracks your accuracy by topic. The real final is short, so a single weak area can cost you the 70 percent you need. Retake the training set you miss most until you clear 85 percent, then take all four practice tests in a row.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          OSHA 10 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is OSHA 10, and who issues the card?</h3>
            <p className="text-gray-600">
              OSHA 10 is a 10-hour safety awareness course in the OSHA Outreach Training Program, offered in construction and general industry versions. It is taught by OSHA-authorized trainers, in person or through OSHA-accepted online providers, and the Department of Labor wallet card is issued through the trainer after you complete the course and pass the final exam. The course is voluntary under federal law, though some states, cities, unions and employers require it before you can work on a site.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the OSHA 10 final exam and what score do I need?</h3>
            <p className="text-gray-600">
              The final exam covers the course topics: an introduction to OSHA and worker rights, the Focus Four hazards (falls, electrocution, struck-by and caught-in or between), hazard communication and personal protective equipment, and health hazards, tools and fire safety. Most online providers use a 20 to 40 question multiple-choice final, require 70 percent to pass, and allow up to three attempts before you must retake the course. Check your provider&apos;s rules, since the exact length and retake policy vary.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does an OSHA 10 card expire?</h3>
            <p className="text-gray-600">
              OSHA itself does not put an expiration date on Outreach cards. However, some states and many employers and job sites require that the card be no more than three to five years old, so renewal is often required in practice. Check your state&apos;s rules and your employer&apos;s policy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is the difference between OSHA 10 and OSHA 30?</h3>
            <p className="text-gray-600">
              OSHA 10 is a 10-hour awareness course for entry-level workers. OSHA 30 is a 30-hour course for supervisors, foremen and anyone with safety responsibility; it covers the same core topics in more depth plus managing safety programs. Both come in construction and general industry versions, and neither replaces the hazard-specific training that individual OSHA standards require employers to provide.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest OSHA 10 practice test an official OSHA course?</h3>
            <p className="text-gray-600">
              No. TigerTest is a free study tool, not an OSHA-authorized Outreach course, and it does not issue a card. Use it to learn the material and check your readiness, then take the real course from an OSHA-authorized trainer. All four practice tests and all training sets are free, with no account required.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="osha" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the OSHA 10?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every Outreach course topic.</p>
          <ExamLandingCTA dashboardHref="/osha-10/dashboard" />
        </div>
      </div>
    </div>
  );
}
