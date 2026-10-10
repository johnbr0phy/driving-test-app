import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Hunter Safety Practice Test 2026 - Hunter Education Exam Prep";
const description =
  "Free hunter safety practice test with 200 questions on the IHEA hunter education standards every state course uses: the four rules of firearm safety, safe carries, zones of fire, ammunition, shot placement, tree stand safety, wildlife identification, conservation, hunting ethics, laws and survival. Pass your hunter education exam.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "hunter safety practice test, hunter education test answers, hunter ed practice exam, hunter safety course test, hunting license test questions, hunter education exam 2026, free hunter safety quiz",
  alternates: {
    canonical: `${siteUrl}/hunter-safety-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/hunter-safety-practice-test`,
    images: [{ url: "/og/hunter", width: 1200, height: 630, alt: "TigerTest free Hunter Safety practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/hunter"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Hunter Safety Practice Tests",
      description,
      url: `${siteUrl}/hunter-safety-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 hunter safety practice questions",
        "4 practice tests weighted like the state exams",
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
          name: "Do I need a hunter safety course to get a hunting license?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nearly every state requires hunter education for first-time hunters, usually everyone born after a cutoff date (often 1960 to 1990 depending on the state). The certificate is recognized in every state and Canadian province and does not expire. Check your state wildlife agency for ages and exemptions.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the hunter education exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most state exams are about 50 multiple-choice questions with 80 percent to pass, taken online or at the end of a field day. Some states add a hands-on skills test. This practice bank uses the same topics in the same proportions.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover bowhunting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The basics of archery equipment, tree stand safety and shot placement are included. Several states require a separate bowhunter education course for archery seasons; this bank does not replace it.",
          },
        },
        {
          "@type": "Question",
          name: "Which state is this for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All of them. The IHEA standards are the same everywhere, and state-specific rules such as blaze orange, legal hours, baiting and minimum ages are noted as varying rather than asserted. Learn your state's regulations alongside this.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest hunter safety practice test free?",
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
  { name: "Firearm Safety", weight: "30%" },
  { name: "Firearms & Ammunition", weight: "16%" },
  { name: "Hunting Techniques", weight: "16%" },
  { name: "Wildlife & Conservation", weight: "16%" },
  { name: "Ethics & Laws", weight: "12%" },
  { name: "Survival & First Aid", weight: "10%" },
];

export default function HunterLandingPage() {
  return (
    <div data-theme="hunter" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="hunter" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Hunter Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hunter-safety/dashboard"
            shortName="Hunter Safety"
            subtitle="200 questions on the hunter education standards behind every state exam. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hunter-mobile.png", desktop: "/landing/hunter-desktop.png" }}
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
                Five sets: firearm safety, firearms, ammunition and archery, hunting techniques and game care, wildlife identification and conservation, and ethics, laws and survival. Questions you miss come back until you have mastered them.
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
                Four 50-question tests written like the course exams: three hunters in a field, a deer at an angle, a fence to cross, and the safe and ethical choice.
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
                Built on the IHEA Standards
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every state hunter education course follows the International Hunter Education Association standards, and every exam leans hardest on firearm safety. The practice tests here draw questions in those proportions so the carries, the zones of fire and the four rules come up again and again.
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
                src={getTigerAsset("hunter", 1)}
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
            The hunter safety practice test is brand new. If a question looks wrong or your state teaches it differently, tell us.
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
            How to Pass the Hunter Education Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Make the four rules automatic</h3>
              <p>
                Treat every firearm as loaded. Always point the muzzle in a safe direction. Be sure of your target and what is beyond it. Keep your finger off the trigger until ready to shoot. Almost every safety scenario is one of these four.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Know the carries and the zones</h3>
              <p>
                The two-hand carry gives the best control. Never use the trail, elbow or shoulder carry with someone in front of or behind you. In a line of three hunters each has a 45-degree zone of fire and nobody swings on a bird outside it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Learn the firearm facts</h3>
              <p>
                Caliber is bore diameter, gauge is lead balls per pound so smaller is bigger. A .22 travels over a mile. Match the data stamp to the box. Wait 30 seconds on a misfire, 60 on a muzzleloader. Full choke for turkeys, improved cylinder for close birds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak topic</h3>
              <p>
                TigerTest tracks your accuracy by topic. Most state exams require 80 percent, so retake the set you miss most until you clear 90 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Hunter Education Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Do I need a hunter safety course to get a hunting license?</h3>
            <p className="text-gray-600">
              Nearly every state requires hunter education for first-time hunters, usually everyone born after a cutoff date (often 1960 to 1990 depending on the state). The certificate is recognized in every state and Canadian province and does not expire. Check your state wildlife agency for ages and exemptions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the hunter education exam?</h3>
            <p className="text-gray-600">
              Most state exams are about 50 multiple-choice questions with 80 percent to pass, taken online or at the end of a field day. Some states add a hands-on skills test. This practice bank uses the same topics in the same proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover bowhunting?</h3>
            <p className="text-gray-600">
              The basics of archery equipment, tree stand safety and shot placement are included. Several states require a separate bowhunter education course for archery seasons; this bank does not replace it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which state is this for?</h3>
            <p className="text-gray-600">
              All of them. The IHEA standards are the same everywhere, and state-specific rules such as blaze orange, legal hours, baiting and minimum ages are noted as varying rather than asserted. Learn your state&apos;s regulations alongside this.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest hunter safety practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="hunter" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Hunter Education?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all six topics.</p>
          <ExamLandingCTA dashboardHref="/hunter-safety/dashboard" />
        </div>
      </div>
    </div>
  );
}
