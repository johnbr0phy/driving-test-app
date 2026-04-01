import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, LayoutDashboard, RefreshCw, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "TigerTest for Driving Schools — Bulk DMV Practice Test Pricing",
  description:
    "Give every student unlimited DMV practice tests with an admin dashboard to track progress. Reusable seats, usage tracking, and simple annual pricing starting at $149/yr.",
};

const plans = [
  {
    name: "Starter",
    price: "$149",
    period: "/yr",
    seats: "10 seats",
    features: [
      "Full question bank — all 50 states",
      "Admin dashboard",
      "Reusable seats",
      "Usage tracking",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$349",
    period: "/yr",
    seats: "30 seats",
    features: [
      "Everything in Starter",
      "Bulk student invites",
      "Priority support",
      "Pass-readiness insights",
    ],
    highlight: true,
  },
  {
    name: "School",
    price: "$699",
    period: "/yr",
    seats: "Unlimited seats",
    features: [
      "Everything in Growth",
      "Unlimited students",
      "Dedicated account manager",
      "Custom reporting",
    ],
    highlight: false,
  },
];

const comparisonRows = [
  { feature: "Price (30 students)", tiger: "$349/yr", competitor: "$450+/yr" },
  { feature: "Seats model", tiger: "Reusable", competitor: "Per-student" },
  { feature: "Admin dashboard", tiger: true, competitor: false },
  { feature: "Questions per state", tiger: "200+", competitor: "~100" },
  { feature: "Training mode", tiger: true, competitor: false },
  { feature: "Progress tracking", tiger: true, competitor: "Limited" },
  { feature: "All 50 states", tiger: true, competitor: true },
];

export default function SchoolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Prepare every student.<br />Pass every time.
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          TigerTest for Schools gives your students unlimited DMV practice with
          an admin dashboard so you can track who&apos;s ready — and who needs
          more time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/schools/signup"
            className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand/90 transition-colors"
          >
            Create free account
          </Link>
          <Link
            href="/schools/login"
            className="inline-block text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-gray-300"
          >
            Log in
          </Link>
        </div>
        <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 max-w-4xl mx-auto">
          <Image
            src="/schools-dashboard-preview.png"
            alt="TigerTest school dashboard showing student progress"
            width={1200}
            height={900}
            className="w-full h-auto"
          />
        </div>
        </div>
      </section>

      {/* Key benefits */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Why schools choose TigerTest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Admin dashboard",
                desc: "See every student's progress, tests taken, and pass-readiness at a glance.",
                icon: <LayoutDashboard className="w-7 h-7 text-brand" />,
                highlight: true,
              },
              {
                title: "Reusable seats",
                desc: "When a student graduates, free up their seat for the next one. No per-student fees.",
                icon: <RefreshCw className="w-7 h-7 text-gray-500" />,
                highlight: false,
              },
              {
                title: "Usage tracking",
                desc: "Know exactly how your investment is being used with detailed activity reports.",
                icon: <BarChart2 className="w-7 h-7 text-gray-500" />,
                highlight: false,
              },
            ].map((item) => (
              <div key={item.title} className="relative pt-8">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white ${item.highlight ? "border-2 border-brand-border-light" : "border-2 border-gray-200"} rounded-full flex items-center justify-center shadow-sm`}>
                  {item.icon}
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Simple annual pricing
        </h2>
        <p className="text-gray-600 text-center mb-12">
          One flat rate. No per-student surprises.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 ${
                plan.highlight
                  ? "border-brand bg-brand-light"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block bg-brand text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {plan.name}
              </h3>
              <div className="mb-1">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">{plan.seats}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/schools/signup"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Create free account
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            TigerTest vs driving-tests.org
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium text-gray-500">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-brand">
                    TigerTest
                  </th>
                  <th className="text-center py-3 pl-4 font-medium text-gray-500">
                    driving-tests.org
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.tiger === "boolean" ? (
                        row.tiger ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )
                      ) : (
                        <span className="font-medium text-gray-900">
                          {row.tiger}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-4 text-center">
                      {typeof row.competitor === "boolean" ? (
                        row.competitor ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )
                      ) : (
                        <span className="text-gray-500">
                          {row.competitor}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-light py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to boost your pass rates?
        </h2>
        <p className="text-gray-600 mb-8">
          Free to start. Invite students and track their progress today.
        </p>
        <Link
          href="/schools/signup"
          className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand/90 transition-colors"
        >
          Create free account
        </Link>
      </section>
    </>
  );
}
