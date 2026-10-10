import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CPR Practice Test 2026 - CPR, AED & First Aid Exam Prep";
const description =
  "Free CPR practice tests with 200 questions on adult, child and infant CPR, AED use, choking, anaphylaxis and first aid, based on the 2020 resuscitation guidelines. Compression rates, depths and ratios, naloxone, tourniquets, stroke and heart attack signs, with an explanation on every answer.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CPR practice test, CPR test questions and answers, BLS practice test, AED practice questions, first aid practice test, CPR certification exam prep 2026, free CPR practice test, infant CPR quiz",
  alternates: {
    canonical: `${siteUrl}/cpr-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/cpr-practice-test`,
    images: [{ url: "/og/cpr", width: 1200, height: 630, alt: "TigerTest free CPR practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/cpr"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free CPR, AED and First Aid Practice Tests",
      description,
      url: `${siteUrl}/cpr-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CPR, AED and first aid practice questions",
        "4 practice tests weighted like the written exam",
        "Training sets for every topic",
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
          name: "What is on the CPR written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most written exams cover scene safety and the Chain of Survival, adult CPR and AED use, child and infant CPR, choking relief, and basic first aid such as bleeding control, shock, burns, stroke and heart attack recognition, seizures, and heat and cold emergencies. Healthcare BLS exams go deeper on team CPR, bag-mask ventilation and pulse checks; lay rescuer courses spend more time on first aid.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most training providers require 84 percent or higher on the written portion, which is 21 of 25 questions on a typical 25-question exam. Some first aid only courses use a lower cutoff. TigerTest marks a pass at 84 percent so you practice against the stricter standard.",
          },
        },
        {
          "@type": "Question",
          name: "Does passing a written test get me certified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every recognized CPR certification also requires a hands-on skills session where an instructor watches you perform compressions, breaths and AED use on a manikin. The written test is one part of the course. TigerTest prepares you for the written part only and is not affiliated with any training provider.",
          },
        },
        {
          "@type": "Question",
          name: "How long is a CPR certification valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Certification cards from the major providers are typically valid for two years. Workplaces and licensing boards may require renewal sooner, so check the rules that apply to your job or program.",
          },
        },
        {
          "@type": "Question",
          name: "Is this practice test for healthcare BLS or for lay rescuer CPR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both. The bank follows the 2020 resuscitation guidelines that every provider's course is built on. Lay rescuer items cover hands-only CPR, AED steps, choking and first aid; healthcare-level items cover pulse checks, two-rescuer ratios, advanced airway ventilation rates and team roles. The training sets let you focus on whichever you need.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basics & Chain of Survival", weight: "16%" },
  { name: "Adult CPR & AED", weight: "24%" },
  { name: "Child & Infant CPR", weight: "20%" },
  { name: "Choking & Breathing Emergencies", weight: "12%" },
  { name: "First Aid", weight: "28%" },
];

export default function CprLandingPage() {
  return (
    <div data-theme="cpr" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="cpr" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CPR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpr/dashboard"
            shortName="CPR"
            subtitle="200 questions on adult, child and infant CPR, AED use, choking and first aid. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cpr-mobile.png", desktop: "/landing/cpr-desktop.png" }}
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
                Four sets: basics and choking, adult CPR and AED, child and infant CPR, and first aid. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that mix every topic the way a written exam does, with an explanation on every answer that says why the right choice is right and the common wrong pick is wrong.
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
                Built on the 2020 Resuscitation Guidelines
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every provider&apos;s CPR, AED and first aid course is built on the same guidelines, so the written exams test the same numbers and steps: compression rate and depth, ratios for one and two rescuers, AED pad placement, choking relief by age, and the first aid basics. The practice tests here weight adult CPR and first aid most heavily because that is where exams spend their questions.
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
                src={getTigerAsset("cpr", 1)}
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
            The CPR practice test is brand new. If a question looks wrong or your course teaches a step differently, tell us.
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
            How to Pass the CPR Written Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Memorize the numbers</h3>
              <p>
                100 to 120 compressions a minute. At least 2 inches deep for adults, about 2 inches for children and 1.5 inches for infants. 30 to 2 for a single rescuer at every age and 15 to 2 for two rescuers on a child or infant. Pauses under 10 seconds, switch compressors every 2 minutes. Half the exam is these figures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Know what changes by age</h3>
              <p>
                Infants get two fingers or two thumbs, a brachial pulse check, back slaps and chest thrusts for choking, and a neutral head position. Children get one or two hands and abdominal thrusts. A lone rescuer calls first for an adult but gives 2 minutes of CPR first for an unwitnessed child or infant collapse with no phone. Exams love these contrasts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Learn the AED sequence cold</h3>
              <p>
                Turn it on, bare and dry the chest, attach pads upper right and lower left, clear the victim for analysis, shock if advised, and go straight back to compressions for 2 minutes. Know the special cases: water, hair, medication patches, implanted devices, pediatric pads, and oxygen nearby.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill the first aid recognition items</h3>
              <p>
                FAST for stroke, chewed aspirin for a heart attack with no allergy or bleeding, epinephrine in the outer thigh for anaphylaxis, direct pressure then a tourniquet for severe bleeding, cool water not ice for burns, and nothing by mouth for anyone who is not fully alert. TigerTest tracks your accuracy by topic so you can retake the set you miss most until you clear 90 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CPR Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the CPR written exam?</h3>
            <p className="text-gray-600">
              Most written exams cover scene safety and the Chain of Survival, adult CPR and AED use, child and infant CPR, choking relief, and basic first aid such as bleeding control, shock, burns, stroke and heart attack recognition, seizures, and heat and cold emergencies. Healthcare BLS exams go deeper on team CPR, bag-mask ventilation and pulse checks; lay rescuer courses spend more time on first aid.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600">
              Most training providers require 84 percent or higher on the written portion, which is 21 of 25 questions on a typical 25-question exam. Some first aid only courses use a lower cutoff. TigerTest marks a pass at 84 percent so you practice against the stricter standard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does passing a written test get me certified?</h3>
            <p className="text-gray-600">
              No. Every recognized CPR certification also requires a hands-on skills session where an instructor watches you perform compressions, breaths and AED use on a manikin. The written test is one part of the course. TigerTest prepares you for the written part only and is not affiliated with any training provider.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How long is a CPR certification valid?</h3>
            <p className="text-gray-600">
              Certification cards from the major providers are typically valid for two years. Workplaces and licensing boards may require renewal sooner, so check the rules that apply to your job or program.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this practice test for healthcare BLS or for lay rescuer CPR?</h3>
            <p className="text-gray-600">
              Both. The bank follows the 2020 resuscitation guidelines that every provider&apos;s course is built on. Lay rescuer items cover hands-only CPR, AED steps, choking and first aid; healthcare-level items cover pulse checks, two-rescuer ratios, advanced airway ventilation rates and team roles. The training sets let you focus on whichever you need.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="cpr" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your CPR Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions on CPR, AED and first aid.</p>
          <ExamLandingCTA dashboardHref="/cpr/dashboard" />
        </div>
      </div>
    </div>
  );
}
