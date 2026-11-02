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

const title = "Standard First Aid Practice Test 2026 - Free Canada CPR C Quiz";
const metaDescription =
  "Free Standard First Aid and CPR Level C practice for Canada: 200 original questions on CPR and AEDs, choking, bleeding, fractures, medical emergencies and burns, every answer explained.";
const description =
  "Free practice for the written test on a Canadian Standard First Aid (Intermediate First Aid) course with CPR Level C and AED: 200 original questions on the first aider's role and consent, CPR and AED for adults, children and infants, choking and breathing emergencies, wounds, bleeding and shock, bone, joint, head and spinal injuries, sudden medical emergencies, and burns, poisons and environmental emergencies. Four 50-question practice tests with a 75 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "standard first aid practice test, standard first aid test questions canada, cpr level c test questions, intermediate first aid exam, first aid quiz canada, csa z1210 first aid, standard first aid written test, first aid cpr c aed practice exam",
  alternates: {
    canonical: `${siteUrl}/standard-first-aid-canada-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/standard-first-aid-canada-practice-test`,
    images: [{ url: shareImageUrl("casfa"), width: 1200, height: 630, alt: "Tigertest free Standard First Aid practice test for Canada" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("casfa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is Standard First Aid with CPR Level C?",
    a: "Standard First Aid is the usual name for the intermediate level of workplace first aid in Canada, the level described as intermediate in the CSA Z1210 standard for first aid training. It is usually a two-day course and covers the first aider's role, CPR and AED use, choking, bleeding and shock, fractures and head and spinal injuries, sudden medical emergencies, burns, poisoning and heat and cold emergencies. CPR Level C means CPR and AED for adults, children and infants, including with two rescuers.",
  },
  {
    q: "How is the course assessed, and what is the pass mark?",
    a: "Instructors check your practical skills, such as CPR on adult, child and infant manikins, using an AED, choking care and bandaging, and you sit a written multiple-choice knowledge test. The training agency sets the written test and its pass mark, which is commonly 75 percent, though some agencies use 70 or 80 percent. The practice tests here have 50 questions each and use a 75 percent pass line.",
  },
  {
    q: "How long is a Standard First Aid certificate valid?",
    a: "Usually three years, after which you take a shorter recertification course. Workplace first aid rules come from each province, territory or the federal government, so who needs the certificate, how many first aiders a workplace needs and some recertification rules vary by jurisdiction.",
  },
  {
    q: "Which guidelines do these questions follow?",
    a: "The answers follow the current Canadian first aid and resuscitation guidelines, which are based on the ILCOR international consensus: compressions at least 5 cm deep for an adult at 100 to 120 a minute, 30 compressions to 2 breaths, back blows and abdominal thrusts for a choking adult, firm direct pressure for bleeding and a tourniquet for life-threatening limb bleeding. Where rules differ by province or territory, the questions say so instead of picking one.",
  },
  {
    q: "Is this an official course or certificate?",
    a: "No. Every question is written by Tigertest from the CSA Z1210 topic list and the Canadian guidelines that Standard First Aid courses are built on, so it tests the same knowledge without copying any training agency's test. It is free study for the written part of the course, not a certificate, and it cannot replace the hands-on practice and skills check that make you a certified first aider.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Standard First Aid Practice Test",
      description,
      url: `${siteUrl}/standard-first-aid-canada-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Standard First Aid and CPR Level C practice questions",
        "4 practice tests of 50 questions with a 75% pass line",
        "4 training sets, one per practice test",
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
        classFaqJsonLd("casfa"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "The First Aider's Role, Consent & Assessment", weight: "14%" },
  { name: "CPR Level C & AED", weight: "18%" },
  { name: "Choking & Breathing Emergencies", weight: "12%" },
  { name: "Wounds, Bleeding & Shock", weight: "14%" },
  { name: "Bone, Joint, Head, Spine & Chest Injuries", weight: "14%" },
  { name: "Sudden Medical Emergencies", weight: "16%" },
  { name: "Burns, Eyes, Poisons & Environment", weight: "12%" },
];

export default function StandardFirstAidLandingPage() {
  return (
    <div data-theme="casfa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Standard First Aid Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/standard-first-aid/dashboard"
            shortName="Standard First Aid"
            subtitle="200 questions for the written test on a Canadian Standard First Aid and CPR Level C course: CPR and AEDs, choking, bleeding, fractures, medical emergencies and burns. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/casfa-mobile.png", desktop: "/landing/casfa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="casfa" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests covering every part of the course, with a 75 percent pass line, the mark most training agencies use for the written test, and an explanation of the right answer on every question.
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
                Built on the CSA Z1210 Intermediate Level
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The CSA Z1210 standard sets what a workplace first aid course in Canada must teach at each level. Standard First Aid is the intermediate level: CPR and AED, choking, bleeding and shock, plus fractures, head and spinal injuries, chest injuries, medical emergencies, burns, poisoning and heat and cold emergencies. No one publishes how many questions each topic gets, so the practice tests weight topics by how much of the course they fill. Instructors and training agencies can set Tigertest as practice for a class at{" "}
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
                src={getTigerAsset("casfa", 1)}
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
            How to Pass Standard First Aid
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Lock in the CPR numbers</h3>
              <p>
                Check breathing for no more than 10 seconds, then push in the centre of the chest at 100 to 120 a minute with 30 compressions to 2 breaths for every age. Go at least 5 cm deep for an adult and about one-third of the chest depth for a child or infant, about 4 cm for a baby. The AED goes on as soon as it arrives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn each condition by its signs</h3>
              <p>
                Pale, cool and clammy with a fast pulse is shock. Chest pressure spreading to the arm or jaw is a heart attack. A drooping face, weak arm or slurred speech is a stroke. Shaky, sweaty and confused in a person with diabetes is low blood sugar. Swelling of the face and throat is anaphylaxis. Tiny pupils and slow breathing point to an opioid overdose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know what you give and when</h3>
              <p>
                One 325 mg or two 81 mg ASA, chewed, for heart attack signs. Sugar for a person with diabetes who is confused but can swallow. An epinephrine auto-injector in the outer thigh, with a second dose after about 5 minutes if needed. Naloxone for an opioid overdose. Nothing by mouth for anyone who may need surgery or cannot swallow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four practice tests before your written test. After each test, drill the questions you missed and retrain that test&apos;s set. Then practise the hands-on skills in class.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Standard First Aid Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="casfa" />
        </div>
      </div>

      <ExamRelatedTests examId="casfa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Standard First Aid?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the Standard First Aid and CPR Level C course.</p>
          <ExamLandingCTA dashboardHref="/standard-first-aid/dashboard" />
        </div>
      </div>
    </div>
  );
}
