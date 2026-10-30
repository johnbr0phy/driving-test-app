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

const title = "Free REx-PN Practice Test 2026 - RPN and LPN Questions";
const metaDescription =
  "Free REx-PN practice questions for practical nurses in Ontario and BC, weighted by the REx-PN test plan: two 90-question tests plus drills for all eight Client Needs areas.";
const description =
  "Free REx-PN practice questions for Registered Practical Nurses in Ontario and Licensed Practical Nurses in British Columbia, weighted by the REx-PN test plan: management of care, working with unregulated care providers, consent and privacy, pharmacology and IV therapy, SI lab values and select all that apply items with a rationale on every answer. Two 90-question practice tests plus drills for all eight Client Needs areas.";

const faqs = [
  {
    q: "How many questions are on the REx-PN?",
    a: "Between 90 and 150, with a four-hour limit that includes the tutorial and any breaks. The exam is computerized adaptive: it stops once it is 95% certain your ability is above or below the passing standard, so the number of questions you get says nothing on its own about passing or failing. Thirty of the questions are unscored pretest items you cannot tell apart from the rest, and you cannot go back to an earlier question.",
  },
  {
    q: "What score do I need to pass the REx-PN?",
    a: "There is no percentage pass mark. The REx-PN compares your ability estimate with a passing standard and reports pass or fail. Since January 2026, select all that apply items earn partial credit; every other item is right or wrong. Tigertest reports percent correct on fixed practice items, scored all or nothing, so use it to track practice progress and choose topics to review, not to predict your result.",
  },
  {
    q: "What is on the REx-PN test plan?",
    a: "Eight Client Needs categories: Management of Care (18 to 24%), Safety and Infection Control (10 to 16%), Health Promotion and Maintenance (6 to 12%), Psychosocial Integrity (8 to 14%), Basic Care and Comfort (6 to 12%), Pharmacological and Parenteral Therapies (14 to 20%), Reduction of Risk Potential (8 to 14%) and Physiological Adaptation (6 to 12%). Question types are multiple choice, multiple response, fill-in-the-blank calculation, exhibit and graphic items.",
  },
  {
    q: "Who writes the REx-PN?",
    a: "Practical nursing graduates applying to become Registered Practical Nurses with the College of Nurses of Ontario or Licensed Practical Nurses with the British Columbia College of Nurses and Midwives. It is one of several registration requirements. Practical nurses in other provinces and territories write a different exam, so check with your regulator.",
  },
  {
    q: "How is the REx-PN different from the NCLEX-PN?",
    a: "Both are built by NCSBN with adaptive testing, but the REx-PN is written for Canadian practice: SI units such as mmol/L, Canadian drug names, Canadian law and regulation, and unregulated care providers such as PSWs. Its test plan keeps Management of Care and Pharmacological and Parenteral Therapies as categories, it has no Next Generation case studies, and it runs 90 to 150 questions in four hours. Tigertest's REx-PN bank is separate from its NCLEX-PN bank.",
  },
  {
    q: "Is the Tigertest REx-PN practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "REx-PN practice test, REx-PN practice questions, free REx-PN questions, RPN exam practice, LPN exam BC, practical nurse exam Canada, REx-PN SATA practice, CNO RPN exam, BCCNM LPN exam",
  alternates: {
    canonical: `${siteUrl}/rex-pn-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rex-pn-practice-test`,
    images: [{ url: shareImageUrl("rexpn"), width: 1200, height: 630, alt: "Tigertest free REx-PN practice test" }],
    siteName: "Tigertest",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rexpn")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free REx-PN Practice Test",
      description,
      url: `${siteUrl}/rex-pn-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "210 original REx-PN practice questions with rationales, written for Canadian practical nurses",
        "Two 90-question practice tests answered in order, no going back",
        "Select all that apply, dosage and IV flow rate calculations, and exhibit items",
        "Weighted by the REx-PN test plan Client Needs categories",
        "Mastery drills for all eight Client Needs areas",
        "Progress syncs between phone and computer",
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
        classFaqJsonLd("rexpn"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Management of Care", weight: "18-24%" },
  { name: "Safety and Infection Control", weight: "10-16%" },
  { name: "Health Promotion and Maintenance", weight: "6-12%" },
  { name: "Psychosocial Integrity", weight: "8-14%" },
  { name: "Basic Care and Comfort", weight: "6-12%" },
  { name: "Pharmacological and Parenteral Therapies", weight: "14-20%" },
  { name: "Reduction of Risk Potential", weight: "8-14%" },
  { name: "Physiological Adaptation", weight: "6-12%" },
];

export default function RexPnLandingPage() {
  return (
    <div data-theme="rexpn" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free REx-PN Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rex-pn/dashboard"
            shortName="REx-PN"
            subtitle="210 practical nursing questions with rationales, written for RPNs in Ontario and LPNs in BC, with SI units and Canadian drug names. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rexpn-mobile.png", desktop: "/landing/rexpn-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rexpn" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Client Needs Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, one per Client Needs category, from Management of Care to Physiological Adaptation. Check each answer and read the rationale on the spot; every miss comes back until you have mastered it.
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
                90 questions at the real exam&apos;s minimum length, answered in order with no going back, like the REx-PN. Practice Test 2 questions do not appear in the drills, so you can check your progress on a separate set of questions. Finish with a score by Client Needs category and a plan for what to drill next.
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
                Built on the REx-PN Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test follows the REx-PN Client Needs weights, so Management of Care and Pharmacological and Parenteral Therapies carry the most questions, just as they do on exam day. Lab values are in SI units, drugs go by their Canadian names, and consent, privacy and scope of practice questions follow Canadian law, with provincial differences stated as such.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("rexpn", 1)}
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
            How to Practise for the REx-PN
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer as an entry-level practical nurse</h3>
              <p>
                The REx-PN tests safe, entry-level practice. The practical nurse cares for clients whose condition is stable and predictable and consults the RN or health care provider as a client becomes more complex or unstable. When a client suddenly deteriorates, the right answer usually keeps the nurse with the client while getting help.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the priority rules</h3>
              <p>
                Airway, breathing, circulation. Acute before chronic, unstable before stable, actual before potential, physical before psychosocial. Most &quot;which client first&quot; and &quot;what first&quot; questions fall to one of these, so say the rule out loud before you pick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your numbers in SI units</h3>
              <p>
                Potassium 3.5 to 5.0 mmol/L, sodium 135 to 145 mmol/L, hypoglycemia below 4.0 mmol/L, hemoglobin in g/L and platelets in &times; 10&#8313;/L. Practise dosage and IV flow rate math until it is automatic: fill-in-the-blank calculations are scored right or wrong, so round only at the end and only as the question asks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Treat every SATA option as true or false, then drill your weakest area</h3>
              <p>
                Read each select all that apply option against the stem as its own true or false question, and do not hunt for a set number of answers. Tigertest shows practice scores by Client Needs category: review the rationales in the area you miss most, then use Practice Test 2 to check your progress on a separate set of questions. These scores do not predict your result on the real adaptive exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">For practical nursing faculty</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Practical nursing programs in Ontario and British Columbia can set Tigertest as REx-PN practice for a whole class and see which Client Needs areas and questions the class misses most, free. Set up a class at <Link href="/teach" className="text-brand-dark underline">/teach</Link>.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          REx-PN Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rexpn" />
        </div>
      </div>

      <ExamRelatedTests examId="rexpn" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your REx-PN Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 210 questions across all eight Client Needs areas, written for Canadian practical nurses.</p>
          <ExamLandingCTA dashboardHref="/rex-pn/dashboard" />
        </div>
      </div>
    </div>
  );
}
