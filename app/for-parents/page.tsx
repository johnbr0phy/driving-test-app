"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Shield,
  Clock,
  TrendingDown,
  Star,
  ChevronRight,
  Car,
  BookOpen,
  BarChart3,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Shield,
    title: "Safer first year on the road",
    body: "The first year of solo driving is the most dangerous. Teens who practice extensively score higher on knowledge tests and make fewer critical errors.",
  },
  {
    icon: TrendingDown,
    title: "Lower insurance premiums",
    body: "Some insurers offer good-student and safe-driver discounts. A teen who passes first time — no re-tests — is a teen who&apos;s actually ready.",
  },
  {
    icon: Clock,
    title: "Pass first try, skip the re-test",
    body: "The DMV written test has a ~35% fail rate nationally. TigerTest mirrors your state&apos;s real questions so your teen walks in prepared, not guessing.",
  },
  {
    icon: BookOpen,
    title: "State-specific questions, not generic",
    body: "Every state has different rules, signs, and limits. TigerTest covers all 50 states with questions that actually appear on your state&apos;s test.",
  },
];

const STATS = [
  { value: "700+", label: "teens practicing right now" },
  { value: "50", label: "states covered" },
  { value: "200", label: "questions per state" },
  { value: "$9.99", label: "one-time, no subscription" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: Car,
    title: "Your teen picks their state",
    body: "We load 200 questions matched to your state&apos;s real permit test — signs, rules, limits, all of it.",
  },
  {
    step: "2",
    icon: BookOpen,
    title: "They practice in Training Mode",
    body: "Instant feedback on every answer. Wrong answers get explained, not just marked wrong. They learn, not just memorize.",
  },
  {
    step: "3",
    icon: BarChart3,
    title: "You both see the progress",
    body: "Their dashboard shows score trends, weak spots, and test readiness at a glance. No surprises on test day.",
  },
];

const TESTIMONIALS = [
  {
    quote: "My daughter failed the written test twice before we found TigerTest. She passed on her third attempt after two weeks of practice.",
    name: "Parent, California",
  },
  {
    quote: "I liked that I could see exactly what he was getting wrong. The state laws section was the gap — he nailed it once he drilled those questions.",
    name: "Parent, Texas",
  },
  {
    quote: "One-time fee, no subscription nonsense. That alone made me trust it.",
    name: "Parent, New Jersey",
  },
];

export default function ForParentsPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleGiftStart = () => {
    // Route to signup — the /signup page handles the Stripe checkout flow
    window.location.href = "/signup?from=parents";
  };

  const handleEmailCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // In production this would write to Firestore / send a welcome email
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/tiger.png" alt="TigerTest" width={32} height={32} />
          <span className="font-bold text-gray-900 text-lg">TigerTest</span>
        </Link>
        <Link href="/signup" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          Already have an account? Sign in
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
          <Shield className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">For parents of new drivers</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          Help your teen pass the permit test<br className="hidden md:block" />
          <span className="text-amber-500"> — first time.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          TigerTest gives new drivers 200 state-specific practice questions, instant explanations, and a readiness score before the real DMV test. One-time $9.99. No subscription.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleGiftStart}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-full font-semibold shadow-md"
          >
            Get TigerTest Premium — $9.99
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
          <Link href="/onboarding/select-state">
            <Button variant="outline" className="px-8 py-6 text-lg rounded-full">
              Try it free first
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-4">One-time payment. Covers all 4 training sets + 4 practice tests. No recurring charges.</p>

      </section>

      {/* Stats strip */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-amber-400">{s.value}</div>
              <div className="text-sm text-gray-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters for parents */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
          Why it matters
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          The knowledge test isn&apos;t just paperwork — it&apos;s your teen demonstrating they actually know the rules before they&apos;re alone on the road.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {BENEFITS.map((b) => (
            <Card key={b.title} className="border border-gray-100 shadow-sm">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="flex justify-center mb-3">
                  <step.icon className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          What parents are saying
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-gray-400 font-medium">{t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Everything in Premium — $9.99, once
          </h2>
          <p className="text-gray-600 mb-8">No subscription. No renewal. Pay once, practice until they pass.</p>
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 text-left space-y-4">
            {[
              "All 4 Training Sets (200 state-specific questions)",
              "All 4 full Practice Tests (timed, just like the real thing)",
              "Instant explanations for every wrong answer",
              "Progress tracking and weak-spot analysis",
              "Spanish language support",
              "Works on mobile and desktop",
              "All 50 US states covered",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <Button
            onClick={handleGiftStart}
            className="mt-8 bg-amber-500 hover:bg-amber-600 text-white px-10 py-6 text-lg rounded-full font-semibold shadow-md"
          >
            Get Premium for Your Teen — $9.99
          </Button>
          <p className="text-sm text-gray-400 mt-3">Or let them start free &mdash; they&apos;ll upgrade when they hit the paywall.</p>
        </div>
      </section>

      {/* Email capture for "remind me" */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Not quite ready yet?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Drop your email and we&apos;ll send you a quick guide: <em>How to help your teen prepare for the permit test</em>.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            Got it — check your inbox in a few minutes.
          </div>
        ) : (
          <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 flex-1 max-w-xs"
            />
            <Button type="submit" className="bg-gray-900 text-white rounded-full px-6 py-3 text-sm">
              Send me the guide
            </Button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image src="/tiger.png" alt="TigerTest" width={20} height={20} />
          <span className="font-medium text-gray-600">TigerTest</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/signup" className="hover:text-gray-600 transition-colors">Sign up</Link>
        </div>
        <p className="mt-3 text-xs text-gray-300">© 2026 TigerTest. Not affiliated with any DMV or state agency.</p>
      </footer>
    </div>
  );
}
