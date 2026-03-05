"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  BarChart3,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Shield,
} from "lucide-react";

const PRICING_TIERS = [
  {
    name: "Starter",
    students: "Up to 25 students",
    price: "$49",
    period: "/month",
    perStudent: "$1.96/student",
    features: [
      "All 50 states covered",
      "Student progress dashboard",
      "Pass/fail tracking",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "School",
    students: "Up to 100 students",
    price: "$129",
    period: "/month",
    perStudent: "$1.29/student",
    features: [
      "Everything in Starter",
      "Instructor portal",
      "Weekly progress reports",
      "Bulk student enrolment",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Fleet",
    students: "Unlimited students",
    price: "$299",
    period: "/month",
    perStudent: "Unlimited",
    features: [
      "Everything in School",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Santos",
    role: "Owner, Bay Area Driving Academy",
    quote:
      "Our student pass rates jumped from 67% to 89% in the first month. TigerTest is now part of every lesson plan.",
    stars: 5,
  },
  {
    name: "James Okafor",
    role: "Lead Instructor, NextGen Driver Training",
    quote:
      "The progress dashboard saves me hours a week. I can see exactly which students need extra help before their test.",
    stars: 5,
  },
  {
    name: "Linda Park",
    role: "Director, SafeRoads Driving School",
    quote:
      "We used to hand out printed worksheets. Now our students practice on TigerTest and results speak for themselves.",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "How does student enrolment work?",
    a: "You get a unique school code to share with students. They sign up, enter your code, and are automatically linked to your instructor dashboard — no manual CSV imports.",
  },
  {
    q: "Can students access TigerTest on mobile?",
    a: "Yes. TigerTest is fully mobile-optimised. Students can practice on their phone between lessons.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — 14 days free, no credit card required. Add up to 10 students during the trial.",
  },
  {
    q: "What states are covered?",
    a: "All 50 US states. Each state has 200+ questions mapped to the official DMV handbook.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans cancel with 30 days notice. Annual plans get a pro-rated refund.",
  },
];

const STATS = [
  { value: "89%", label: "Average school pass rate" },
  { value: "701+", label: "Active students" },
  { value: "108", label: "Tests completed per week" },
  { value: "4.9★", label: "Instructor satisfaction" },
];

export default function SchoolsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    students: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would POST to an API route
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/tiger.png" alt="TigerTest" width={32} height={32} />
          <span className="font-bold text-lg">TigerTest</span>
          <Badge variant="outline" className="text-xs ml-1">
            For Schools
          </Badge>
        </Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
            Pricing
          </a>
          <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">
            Contact
          </a>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Instructor Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <Badge className="bg-brand-light text-brand-dark border-brand-border-light mb-6 text-sm px-4 py-1.5">
          🏫 Built for Driving Schools
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your students will pass.<br />
          <span className="text-brand">You&apos;ll have the data to prove it.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          TigerTest for Schools gives driving instructors a real-time dashboard of every student&apos;s
          progress — so you know who&apos;s ready and who needs another session before test day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="#pricing">
            <Button variant="outline" className="px-8 py-6 text-lg rounded-full">
              View Pricing
            </Button>
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">14-day free trial · No credit card required</p>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-900 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-gray-500 text-center mb-12">Set up in under 5 minutes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="h-8 w-8 text-brand" />,
              step: "1",
              title: "Enrol your school",
              desc: "Sign up and get your unique school code. Invite your colleagues as co-instructors.",
            },
            {
              icon: <BookOpen className="h-8 w-8 text-brand" />,
              step: "2",
              title: "Share with students",
              desc: "Students enter your code when signing up. They're automatically added to your dashboard.",
            },
            {
              icon: <BarChart3 className="h-8 w-8 text-brand" />,
              step: "3",
              title: "Track their progress",
              desc: "See scores, weak topics, and test readiness for every student in real time.",
            },
          ].map((item) => (
            <Card key={item.step} className="border-2 border-gray-100 text-center p-2">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Step {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything your school needs
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Built for instructors, loved by students.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <BarChart3 className="h-6 w-6 text-brand" />,
                title: "Instructor Dashboard",
                desc: "Real-time view of every student's score history, weak topics, and test attempts. Filter by student, date, or topic.",
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-brand" />,
                title: "Pass Readiness Score",
                desc: "Each student gets a readiness percentage. Know before test day who's likely to pass — and who needs more practice.",
              },
              {
                icon: <Users className="h-6 w-6 text-brand" />,
                title: "Bulk Enrolment",
                desc: "Share a join link or add students manually. Works for classes of 5 or 500.",
              },
              {
                icon: <Shield className="h-6 w-6 text-brand" />,
                title: "All 50 States",
                desc: "TigerTest covers every US state with questions mapped to official DMV handbooks. Multi-state schools, sorted.",
              },
              {
                icon: <Award className="h-6 w-6 text-brand" />,
                title: "Certificates & Badges",
                desc: "Students earn shareable certificates when they hit passing scores — great for motivation and your school's reputation.",
              },
              {
                icon: <BookOpen className="h-6 w-6 text-brand" />,
                title: "Custom Study Plans",
                desc: "Assign specific training sets to individual students based on their weak areas. One-click from the dashboard.",
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Schools that use TigerTest
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="border-2 border-gray-100">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">&quot;{t.quote}&quot;</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple school pricing</h2>
          <p className="text-gray-500 text-center mb-12">
            A fraction of the cost of a single failed DMV test re-sit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={`relative border-2 ${
                  tier.highlight
                    ? "border-brand shadow-lg scale-105"
                    : "border-gray-200"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-brand text-white px-4 py-1">{tier.badge}</Badge>
                  </div>
                )}
                <CardContent className="pt-8 pb-6">
                  <div className="text-center mb-6">
                    <div className="font-bold text-lg mb-1">{tier.name}</div>
                    <div className="text-sm text-gray-500 mb-4">{tier.students}</div>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                      <span className="text-gray-500 mb-1">{tier.period}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{tier.perStudent}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact">
                    <Button
                      className={`w-full ${
                        tier.highlight
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : "bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between font-medium hover:bg-gray-50"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-20 px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Start your free trial
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Tell us about your school and we&apos;ll set you up in minutes.
          </p>

          {submitted ? (
            <Card className="bg-white text-center py-12">
              <CardContent>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
                <p className="text-gray-500">
                  We&apos;ll be in touch within 24 hours to set up your school account.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Work email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="jane@drivingschool.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  School name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Bay Area Driving Academy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  How many students per month?
                </label>
                <select
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                >
                  <option value="">Select a range</option>
                  <option value="1-25">1 – 25</option>
                  <option value="26-100">26 – 100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Anything else?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                  placeholder="Tell us about your school or any specific requirements..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 py-6 text-lg font-semibold"
              >
                Request Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 text-center text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-700">
          ← Back to TigerTest
        </Link>
        <span className="mx-4">·</span>
        <span>© {new Date().getFullYear()} TigerTest</span>
      </footer>
    </div>
  );
}
