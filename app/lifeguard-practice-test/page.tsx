import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Lifeguard Practice Test 2026 - Certification Written Exam Prep";
const description =
  "Free lifeguard practice tests with 200 questions on surveillance and scanning, recognizing drowning, water rescues with a rescue tube, spinal injury management, first aid, CPR and AED, and facility safety and legal duties. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "lifeguard practice test, lifeguard certification test questions, lifeguard written exam practice, lifeguarding test prep 2026, lifeguard CPR AED practice questions, free lifeguard practice test",
  alternates: {
    canonical: `${siteUrl}/lifeguard-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/lifeguard-practice-test`,
    images: [{ url: "/og/lifeguard", width: 1200, height: 630, alt: "TigerTest free lifeguard practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/lifeguard"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Lifeguard Practice Tests",
      description,
      url: `${siteUrl}/lifeguard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 lifeguard practice questions",
        "4 practice tests across all five content areas",
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
          name: "What score do I need to pass the lifeguard written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most lifeguard certification courses require 80 percent or higher on the written exam, and some set the bar at 80 percent on each section. Your instructor will tell you the exact passing score for your course. The practice tests here use an 80 percent pass line to match.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover the in-water skills test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Lifeguard certification has two parts: a written exam and hands-on skills scenarios in the water and on deck. Most courses also have swimming prerequisites before you can enroll, such as a 300 yard continuous swim, treading water for two minutes without using your hands, and a timed brick retrieval from the deep end. This prep is for the written portion only.",
          },
        },
        {
          "@type": "Question",
          name: "How long is a lifeguard certification valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most lifeguard certifications, along with the included CPR, AED and first aid certification, are valid for two years. Recertification courses are shorter than the original course but still include a written exam and skills check. Many employers also require regular in-service training during the season.",
          },
        },
        {
          "@type": "Question",
          name: "How old do I have to be to become a lifeguard?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most courses require you to be at least 15 years old by the last day of class. Some waterfront or waterpark programs set a higher minimum, and employer age requirements vary by state and facility.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test work for any lifeguard course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The questions cover material that every major lifeguard training program teaches: scanning, victim recognition, rescue tube skills, spinal injury care, CPR and AED per current guidelines, first aid and facility safety. It is a study tool, not a certificate; you still need to complete an in-person course with a certified instructor to be hired as a lifeguard.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Professional Lifeguard & Surveillance", weight: "20%" },
  { name: "Recognizing Drowning & Distress", weight: "16%" },
  { name: "Water Rescue & Spinal Injury", weight: "24%" },
  { name: "First Aid, CPR & AED", weight: "24%" },
  { name: "Facility Safety & Legal", weight: "16%" },
];

export default function LifeguardLandingPage() {
  return (
    <div data-theme="lifeguard" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="lifeguard" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Lifeguard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/lifeguard/dashboard"
            shortName="Lifeguard"
            subtitle="200 questions on surveillance, drowning recognition, rescue tube skills, spinal injuries, CPR and AED, first aid and facility safety. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/lifeguard-mobile.png", desktop: "/landing/lifeguard-desktop.png" }}
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
                Four sets: surveillance and victim recognition, water rescue skills, first aid with CPR and AED, and facility safety and legal duties. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted the way lifeguard course exams are, with an 80 percent pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the Lifeguard Course Outline
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every major lifeguard training program tests the same core: how to watch the water, how to tell a drowning victim from a swimmer, how to make the rescue, and how to care for the victim once they&apos;re out. The practice tests here give rescue skills and emergency care the most weight because that is where the written exam spends the most questions.
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
                src={getTigerAsset("lifeguard", 1)}
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
            The lifeguard practice test is brand new. If a question looks wrong or your course teaches a skill differently, tell us.
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
            How to Pass the Lifeguard Written Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know the numbers cold</h3>
              <p>
                Recognize a victim within 10 seconds and reach them within 20. Brain damage begins after about 4 to 6 minutes without oxygen. An adult active drowning victim struggles for 20 to 60 seconds. Stride jumps need 5 feet of water and no more than 3 feet of height. Free chlorine 1 to 3 ppm, pH 7.2 to 7.8, and wait 30 minutes after the last thunder.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the three victim types by behavior</h3>
              <p>
                A distressed swimmer can breathe, call out and grab a tube. An active drowning victim is vertical, silent, arms pressing down, head back. A passive victim is motionless, face down or on the bottom. Exam questions describe a scene and ask what you are looking at; the answer is always in the behavior, never in the swimmer&apos;s age or appearance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Separate the CPR facts from the water rescue facts</h3>
              <p>
                CPR questions follow current guidelines: 100 to 120 compressions per minute, at least 2 inches on an adult, 30:2 alone and 15:2 with two rescuers on a child or infant, two ventilations first for a drowning victim, and an AED is fine on a wet deck once the chest is dried. Rescue questions are about entries, the rescue tube and the head splint. Study them as two separate lists.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain to 90 percent</h3>
              <p>
                TigerTest tracks your accuracy by content area. Most courses require 80 percent on the written exam, so retake the training set you miss most until you clear 90 percent with room to spare, then take all four practice tests back to back.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Lifeguard Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What score do I need to pass the lifeguard written exam?</h3>
            <p className="text-gray-600">
              Most lifeguard certification courses require 80 percent or higher on the written exam, and some set the bar at 80 percent on each section. Your instructor will tell you the exact passing score for your course. The practice tests here use an 80 percent pass line to match.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover the in-water skills test?</h3>
            <p className="text-gray-600">
              No. Lifeguard certification has two parts: a written exam and hands-on skills scenarios in the water and on deck. Most courses also have swimming prerequisites before you can enroll, such as a 300 yard continuous swim, treading water for two minutes without using your hands, and a timed brick retrieval from the deep end. This prep is for the written portion only.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How long is a lifeguard certification valid?</h3>
            <p className="text-gray-600">
              Most lifeguard certifications, along with the included CPR, AED and first aid certification, are valid for two years. Recertification courses are shorter than the original course but still include a written exam and skills check. Many employers also require regular in-service training during the season.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How old do I have to be to become a lifeguard?</h3>
            <p className="text-gray-600">
              Most courses require you to be at least 15 years old by the last day of class. Some waterfront or waterpark programs set a higher minimum, and employer age requirements vary by state and facility.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this practice test work for any lifeguard course?</h3>
            <p className="text-gray-600">
              Yes. The questions cover material that every major lifeguard training program teaches: scanning, victim recognition, rescue tube skills, spinal injury care, CPR and AED per current guidelines, first aid and facility safety. It is a study tool, not a certificate; you still need to complete an in-person course with a certified instructor to be hired as a lifeguard.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="lifeguard" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Lifeguard Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five content areas.</p>
          <ExamLandingCTA dashboardHref="/lifeguard/dashboard" />
        </div>
      </div>
    </div>
  );
}
