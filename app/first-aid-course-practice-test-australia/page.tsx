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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "First Aid Course Practice Test Australia 2026 - Free HLTAID011 Quiz";
const metaDescription =
  "Free HLTAID011 Provide First Aid practice: 200 original questions on DRSABCD, CPR and AEDs, choking, asthma, anaphylaxis, snake bite and more, to current ARC guidelines.";
const description =
  "Free practice for the knowledge assessment in HLTAID011 Provide First Aid, the national first aid unit in Australia: 200 original questions on the first aider's role, consent and DRSABCD, CPR and AEDs, choking, asthma and anaphylaxis, bleeding and shock, fractures and spinal injuries, heart attack, stroke, diabetes and seizures, burns, heat illness and bushfire smoke, and snake, spider and marine envenomation. Four 50-question mock tests with an 80 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "first aid course practice test australia, HLTAID011 practice test, HLTAID011 questions and answers, provide first aid quiz, first aid test questions australia, CPR test australia, DRSABCD quiz, first aid assessment practice, HLTAID009 CPR questions",
  alternates: {
    canonical: `${siteUrl}/first-aid-course-practice-test-australia`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/first-aid-course-practice-test-australia`,
    images: [{ url: shareImageUrl("aufirstaid"), width: 1200, height: 630, alt: "Tigertest free HLTAID011 Provide First Aid practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufirstaid")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HLTAID011 Provide First Aid Practice Test",
      description,
      url: `${siteUrl}/first-aid-course-practice-test-australia`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 HLTAID011 Provide First Aid practice questions",
        "4 mock tests of 50 questions with an 80% readiness line",
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
          name: "What is HLTAID011 Provide First Aid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "HLTAID011 Provide First Aid is the nationally recognised unit of competency that most Australian workplaces ask their first aiders to hold. It includes CPR and covers responding to an emergency, applying first aid to illnesses and injuries such as bleeding, fractures, asthma, anaphylaxis, envenomation, burns and seizures, communicating with emergency services, and reporting and reviewing the incident. It is delivered by registered training organisations and replaced the older HLTAID003.",
          },
        },
        {
          "@type": "Question",
          name: "How is HLTAID011 assessed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You are assessed on practical skills and on knowledge. The practical part includes at least 2 minutes of uninterrupted single-rescuer CPR on an adult manikin on the floor and 2 minutes on an infant manikin, using an AED, managing anaphylaxis, asthma, bleeding, choking, envenomation and fractures, and giving a verbal and written incident report. Knowledge is usually checked with a written or online quiz set by the training organisation, which sets its own pass requirements. The mock tests here use an 80 percent readiness line.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a first aid certificate last in Australia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The industry standard is to renew HLTAID011 every 3 years and to refresh CPR every 12 months, which is what Safe Work Australia's model Code of Practice on first aid in the workplace recommends. Some employers and industries ask for more frequent training, so check what your workplace requires.",
          },
        },
        {
          "@type": "Question",
          name: "Do these questions follow Australian first aid guidelines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Answers follow the Australian Resuscitation Council (ARC) guidelines that HLTAID011 requires, such as DRSABCD, 30 compressions to 2 breaths at 100 to 120 a minute, back blows then chest thrusts for choking, 4 x 4 x 4 asthma first aid, pressure immobilisation for snake and funnel-web bites, and vinegar for box jellyfish stings. Allergy items follow Australian allergy advice, and workplace items follow the model Code of Practice. Triple zero (000) is the emergency number throughout.",
          },
        },
        {
          "@type": "Question",
          name: "Is this an official first aid course or certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from the HLTAID011 unit and the ARC guidelines it is built on, so it covers the same knowledge without copying any training organisation's assessment. It is free revision for the theory side of the course, not a certificate, and it cannot replace the hands-on practice and assessment of a registered training organisation.",
          },
        },
        classFaqJsonLd("aufirstaid"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Role, Legal & DRSABCD", weight: "14%" },
  { name: "CPR, AED & the Unconscious Casualty", weight: "18%" },
  { name: "Choking, Asthma & Anaphylaxis", weight: "14%" },
  { name: "Bleeding, Shock, Wounds & Eyes", weight: "14%" },
  { name: "Fractures, Sprains, Head & Spine", weight: "12%" },
  { name: "Heart, Stroke, Diabetes, Seizures & Poisons", weight: "12%" },
  { name: "Burns, Heat, Cold & Smoke", weight: "8%" },
  { name: "Bites & Stings", weight: "8%" },
];

export default function AuFirstAidLandingPage() {
  return (
    <div data-theme="aufirstaid" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free First Aid Course Practice Test (HLTAID011) 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/au-first-aid/dashboard"
            shortName="First Aid (HLTAID011)"
            subtitle="200 questions on DRSABCD, CPR and AEDs, choking, asthma, anaphylaxis, bleeding, snake bite and more, written to current Australian Resuscitation Council guidelines. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aufirstaid-mobile.png", desktop: "/landing/aufirstaid-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufirstaid" />

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
                Four 50-question mock tests covering every part of the unit, with an 80 percent readiness line and an explanation of the right answer on every question. Training organisations set their own knowledge quizzes, so aim high.
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
                Built on the HLTAID011 Unit and ARC Guidelines
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The HLTAID011 assessment requirements list the knowledge every candidate must show: duty of care, consent and privacy, infection control, CPR for adults, children and infants, AED use, and the signs and management of conditions from anaphylaxis and asthma to burns, envenomation, hypothermia, seizures and stroke. The unit does not set question weights, so the mock tests here weight topics by how much of the course they fill. Registered trainers, schools and employers who run first aid courses can set Tigertest as practice at{" "}
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
                src={getTigerAsset("aufirstaid", 1)}
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
            How to Pass HLTAID011 Provide First Aid
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Lock in DRSABCD and the CPR numbers</h3>
              <p>
                Danger, Response, Send for help, Airway, Breathing, CPR, Defibrillation. Call 000, check breathing for no more than 10 seconds, then press the lower half of the breastbone a third of the chest depth at 100 to 120 a minute, 30 compressions to 2 breaths for every age. Attach an AED as soon as it arrives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Australian differences</h3>
              <p>
                Choking is back blows then chest thrusts, not abdominal thrusts. Asthma first aid is 4 x 4 x 4. Snake, funnel-web, blue-ringed octopus and cone shell get pressure immobilisation; redback gets a cold pack. Box jellyfish gets vinegar for 30 seconds; bluebottle gets hot water for 20 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the treatment numbers</h3>
              <p>
                Cool burns under running water for 20 minutes, pinch a nosebleed for at least 10 minutes, give 300 mg of aspirin for heart attack chest pain, repeat adrenaline after 5 minutes with no response, give 15 to 20 g of glucose for a hypo and call 000 for a seizure over 5 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four mock tests before your course. After each test, drill the questions you missed and retrain that test&apos;s set. Then practise the hands-on skills, especially 2 minutes of CPR on the floor, on the course itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HLTAID011 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is HLTAID011 Provide First Aid?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              HLTAID011 Provide First Aid is the nationally recognised unit of competency that most Australian workplaces ask their first aiders to hold. It includes CPR and covers responding to an emergency, applying first aid to illnesses and injuries such as bleeding, fractures, asthma, anaphylaxis, envenomation, burns and seizures, communicating with emergency services, and reporting and reviewing the incident. It is delivered by registered training organisations and replaced the older HLTAID003.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is HLTAID011 assessed?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You are assessed on practical skills and on knowledge. The practical part includes at least 2 minutes of uninterrupted single-rescuer CPR on an adult manikin on the floor and 2 minutes on an infant manikin, using an AED, managing anaphylaxis, asthma, bleeding, choking, envenomation and fractures, and giving a verbal and written incident report. Knowledge is usually checked with a written or online quiz set by the training organisation, which sets its own pass requirements. The mock tests here use an 80 percent readiness line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long does a first aid certificate last in Australia?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The industry standard is to renew HLTAID011 every 3 years and to refresh CPR every 12 months, which is what Safe Work Australia&apos;s model Code of Practice on first aid in the workplace recommends. Some employers and industries ask for more frequent training, so check what your workplace requires.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do these questions follow Australian first aid guidelines?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Answers follow the Australian Resuscitation Council (ARC) guidelines that HLTAID011 requires, such as DRSABCD, 30 compressions to 2 breaths at 100 to 120 a minute, back blows then chest thrusts for choking, 4 x 4 x 4 asthma first aid, pressure immobilisation for snake and funnel-web bites, and vinegar for box jellyfish stings. Allergy items follow Australian allergy advice, and workplace items follow the model Code of Practice. Triple zero (000) is the emergency number throughout.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this an official first aid course or certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from the HLTAID011 unit and the ARC guidelines it is built on, so it covers the same knowledge without copying any training organisation&apos;s assessment. It is free revision for the theory side of the course, not a certificate, and it cannot replace the hands-on practice and assessment of a registered training organisation.
            </p>
          </div>
          <ExamClassFaq examId="aufirstaid" />
        </div>
      </div>

      <ExamRelatedTests examId="aufirstaid" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your First Aid Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of HLTAID011 Provide First Aid.</p>
          <ExamLandingCTA dashboardHref="/au-first-aid/dashboard" />
        </div>
      </div>
    </div>
  );
}
