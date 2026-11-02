import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "First Aid at Work Practice Test 2026 - Free UK FAW Mock Tests";
const metaDescription =
  "Free First Aid at Work practice: 200 original questions on CPR and AEDs, bleeding, fractures, burns, choking and major illness, to the 2025 UK guidelines, every answer explained.";
const description =
  "Free practice for the theory side of the UK First Aid at Work (FAW) course: 200 original questions on the first-aider's role and RIDDOR, CPR and AEDs, wounds, bleeding and shock, fractures and spinal injuries, choking and chest injuries, burns, eyes and poisoning, and major illness and anaphylaxis. Four 50-question mock tests with a 70 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "first aid at work practice test, first aid at work questions, FAW mock test, level 3 first aid at work exam questions, first aid quiz UK, CPR test questions UK, workplace first aid test, first aid at work requalification",
  alternates: {
    canonical: `${siteUrl}/first-aid-at-work-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/first-aid-at-work-practice-test`,
    images: [{ url: shareImageUrl("ukfaw"), width: 1200, height: 630, alt: "Tigertest free First Aid at Work practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukfaw")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free First Aid at Work Practice Test",
      description,
      url: `${siteUrl}/first-aid-at-work-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 First Aid at Work practice questions",
        "4 mock tests of 50 questions with a 70% pass line",
        "4 training sets, one per mock test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the First Aid at Work qualification?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "First Aid at Work, or FAW, is the three-day workplace first aid course described in HSE's guidance on the Health and Safety (First-Aid) Regulations 1981. It is usually certificated as a Level 3 Award in First Aid at Work and covers everything on the one-day Emergency First Aid at Work course plus fractures, spinal injuries, chest injuries, burns, eye injuries, poisoning, anaphylaxis and major illness such as heart attack, stroke, epilepsy, asthma and diabetes.",
          },
        },
        {
          "@type": "Question",
          name: "How is First Aid at Work assessed, and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trainers watch you carry out practical skills such as CPR, using an AED, the recovery position and bandaging, and you also sit a short written or multiple-choice theory paper. Each awarding body sets its own papers and pass marks, which usually sit around 70 percent. The mock tests here have 50 questions each and use a 70 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "How long is a First Aid at Work certificate valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Three years. To stay qualified you take a two-day requalification course before the certificate expires. HSE also strongly recommends a short refresher course in each year of the three, so CPR and other skills stay sharp.",
          },
        },
        {
          "@type": "Question",
          name: "Do these questions follow the 2025 resuscitation guidelines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. CPR, AED, choking and first aid answers follow the Resuscitation Council UK guidelines published in October 2025, such as calling 999 as soon as someone is unresponsive, compressions 5 to 6 cm deep at 100 to 120 a minute and tourniquets 5 to 7 cm above a wound. Workplace rules follow HSE guidance L74 and RIDDOR.",
          },
        },
        {
          "@type": "Question",
          name: "Is this an official course or certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from HSE guidance and the Resuscitation Council UK guidelines that First Aid at Work courses are built on, so it tests the same knowledge without copying any awarding body's paper. It is free revision for the theory side of the course, not a certificate, and it cannot replace the hands-on practice and assessment that make you a qualified first-aider.",
          },
        },
        classFaqJsonLd("ukfaw"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "The First-Aider's Role & Assessment", weight: "12%" },
  { name: "Unresponsive Casualty, CPR & AED", weight: "16%" },
  { name: "Wounds, Bleeding & Shock", weight: "16%" },
  { name: "Bones, Joints, Head & Spinal Injuries", weight: "14%" },
  { name: "Choking, Breathing & Chest Injuries", weight: "10%" },
  { name: "Burns, Eyes, Electricity & Poisoning", weight: "14%" },
  { name: "Major Illness & Anaphylaxis", weight: "18%" },
];

export default function FirstAidAtWorkLandingPage() {
  return (
    <div data-theme="ukfaw" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free First Aid at Work Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/first-aid-at-work/dashboard"
            shortName="First Aid at Work"
            subtitle="200 questions on CPR and AEDs, bleeding, fractures, burns, choking and major illness, written to the 2025 UK resuscitation guidelines and HSE guidance. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukfaw-mobile.png", desktop: "/landing/ukfaw-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukfaw" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests covering every part of the course, with a 70 percent pass line, in line with most awarding bodies&apos; theory papers, and an explanation of the right answer on every question.
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
                Built on HSE&apos;s First Aid at Work Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                HSE&apos;s guidance L74 lists what every First Aid at Work course must cover: the emergency first aid content, from CPR and AEDs to bleeding, shock and choking, plus fractures, spinal and chest injuries, burns, eye injuries, poisoning, anaphylaxis and major illness. No awarding body publishes how many questions each topic gets, so the mock tests here weight the topics by how much of the course they fill. Colleges, employers and trainers who run first aid courses can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
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
                src={getTigerAsset("ukfaw", 1)}
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
            How to Pass First Aid at Work
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Lock in the CPR numbers</h3>
              <p>
                Call 999 as soon as someone is unresponsive, check breathing for no more than 10 seconds, then give compressions on the lower half of the breastbone, 5 to 6 cm deep at 100 to 120 a minute, with 30 compressions to 2 breaths. Drowning starts with 5 rescue breaths, and an AED goes on as soon as it arrives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn each condition by its signs</h3>
              <p>
                Pale, cold and clammy with a fast, weak pulse is shock. Crushing chest pain into the arm is a heart attack. A drooping face or weak arm is a stroke. Sweaty, shaky and confused in a person with diabetes is a hypo. Swollen lips, wheeze and hives are anaphylaxis. Most questions start from the signs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the treatment numbers</h3>
              <p>
                Cool burns for at least 20 minutes, pinch a nosebleed for about 10 minutes, put a tourniquet 5 to 7 cm above the wound, give 300 mg of aspirin for a heart attack and 15 to 20 g of glucose for a hypo, repeat an adrenaline auto-injector after 5 minutes and call 999 for a seizure over 5 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four mock tests before your assessment. After each test, drill the questions you missed and retrain that test&apos;s set. Then practise the hands-on skills on the course itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          First Aid at Work Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the First Aid at Work qualification?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              First Aid at Work, or FAW, is the three-day workplace first aid course described in HSE&apos;s guidance on the Health and Safety (First-Aid) Regulations 1981. It is usually certificated as a Level 3 Award in First Aid at Work and covers everything on the one-day Emergency First Aid at Work course plus fractures, spinal injuries, chest injuries, burns, eye injuries, poisoning, anaphylaxis and major illness such as heart attack, stroke, epilepsy, asthma and diabetes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is First Aid at Work assessed, and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Trainers watch you carry out practical skills such as CPR, using an AED, the recovery position and bandaging, and you also sit a short written or multiple-choice theory paper. Each awarding body sets its own papers and pass marks, which usually sit around 70 percent. The mock tests here have 50 questions each and use a 70 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is a First Aid at Work certificate valid?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Three years. To stay qualified you take a two-day requalification course before the certificate expires. HSE also strongly recommends a short refresher course in each year of the three, so CPR and other skills stay sharp.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do these questions follow the 2025 resuscitation guidelines?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. CPR, AED, choking and first aid answers follow the Resuscitation Council UK guidelines published in October 2025, such as calling 999 as soon as someone is unresponsive, compressions 5 to 6 cm deep at 100 to 120 a minute and tourniquets 5 to 7 cm above a wound. Workplace rules follow HSE guidance L74 and RIDDOR.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this an official course or certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from HSE guidance and the Resuscitation Council UK guidelines that First Aid at Work courses are built on, so it tests the same knowledge without copying any awarding body&apos;s paper. It is free revision for the theory side of the course, not a certificate, and it cannot replace the hands-on practice and assessment that make you a qualified first-aider.
            </p>
          </div>
          <ExamClassFaq examId="ukfaw" />
        </div>
      </div>

      <ExamRelatedTests examId="ukfaw" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass First Aid at Work?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the FAW syllabus.</p>
          <ExamLandingCTA dashboardHref="/first-aid-at-work/dashboard" />
        </div>
      </div>
    </div>
  );
}
