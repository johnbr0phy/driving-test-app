"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";

const phrases = [
  "in bed",
  "while watching TV",
  "on the toilet",
  "in the waiting room",
  "on your lunch break",
  "the night before",
];

function useTypewriter(phrases: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - US Driving Test Practice",
      description:
        "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
      url: "https://tigertest.io",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "200 questions per state",
        "All 50 US states covered",
        "Training mode with instant feedback",
        "Practice tests simulating real exams",
        "Detailed analytics and progress tracking",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: "https://tigertest.io",
      logo: "https://tigertest.io/tiger.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the DMV written test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states have between 20-50 questions on the DMV written test. TigerTest offers 200 practice questions per state so you're fully prepared.",
          },
        },
        {
          "@type": "Question",
          name: "Is TigerTest really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, TigerTest is 100% free forever. All 50 states, all questions, no premium tiers or hidden costs.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass the DMV test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states require a score of 80% or higher to pass. TigerTest tracks your progress and shows your pass probability as you practice.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const animatedText = useTypewriter(phrases);

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            The DMV app for studying{" "}
            <span className="text-orange-600">{animatedText}</span>
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            200 state-specific questions. Tuned for mobile. No account needed.
          </p>

          {!loading && (
            <>
              {user || isGuest ? (
                <Link href="/dashboard">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleTryFree}
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
                >
                  Start practicing
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Testimonial 1 */}
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
          &quot;i passed in 3 minutes&quot;
        </p>
        <a
          href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          u/Curdled_Cave on Reddit
        </a>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How it works
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Training mode for learning
            </h3>
            <p className="text-gray-600">
              Go through questions at your own pace. Get instant feedback after each answer with explanations of why you got it right or wrong.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Practice tests when you&apos;re ready
            </h3>
            <p className="text-gray-600">
              Take full 50-question tests that simulate the real DMV exam. Track your scores and see your pass probability increase over time.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
            &quot;felt confident after just studying the previous day&quot;
          </p>
          <p className="text-gray-500 text-sm">JayjayX12</p>
        </div>
      </div>

      {/* State specific */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Questions written for your state,<br className="hidden sm:block" /> not generic filler
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Every state has different driving laws. TigerTest uses questions specific to your state&apos;s DMV handbook - the same material that&apos;s on your actual test.
          </p>
          <p className="text-gray-500">
            All 50 states covered. 200 questions each.
          </p>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
          &quot;it really helped me prepare, and I passed my exam today&quot;
        </p>
        <p className="text-gray-500 text-sm">Big-Burrito-8765</p>
      </div>

      {/* No tricks */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl ml-auto text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              No tricks, no timers,<br className="hidden sm:block" /> no upsells
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Other apps lock features behind paywalls or pressure you with countdown timers. TigerTest is 100% free - all states, all questions, forever.
            </p>
            <p className="text-gray-500">
              Just practice tests that work.
            </p>
          </div>
        </div>
      </div>

      {/* Reddit proof section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Built for people who just need to pass
        </h2>
        <p className="text-gray-600 text-center mb-12">
          From r/driving and r/DMV
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
          >
            <p className="text-gray-800 mb-3">&quot;Used this to help me study. Passed today! Thank you :)&quot;</p>
            <p className="text-gray-500 text-sm">u/Naive_Usual1910</p>
          </a>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;passed within seven minutes&quot;</p>
            <p className="text-gray-500 text-sm">vivacious-vi</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;it was very helpful... I passed the written test this morning&quot;</p>
            <p className="text-gray-500 text-sm">ideapad101</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;helped a lot&quot;</p>
            <p className="text-gray-500 text-sm">WorthEducational523</p>
          </div>

          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
          >
            <p className="text-gray-800 mb-3">&quot;i passed in 3 minutes&quot;</p>
            <p className="text-gray-500 text-sm">u/Curdled_Cave</p>
          </a>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;felt confident after just studying the previous day&quot;</p>
            <p className="text-gray-500 text-sm">JayjayX12</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-50 to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to pass your permit test?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Free to start. No account required.
          </p>

          {!loading && !user && !isGuest && (
            <Button
              onClick={handleTryFree}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
            >
              Start practicing
            </Button>
          )}

          {!loading && (user || isGuest) && (
            <Link href="/dashboard">
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
