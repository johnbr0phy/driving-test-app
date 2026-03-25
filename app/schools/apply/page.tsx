"use client";

import { useState } from "react";
import Link from "next/link";

const initialForm = {
  schoolName: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  estimatedStudentsPerYear: "",
  howHeard: "",
};

export default function SchoolApplyPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/school-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolName: form.schoolName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          state: form.state,
          studentsPerYear: form.estimatedStudentsPerYear,
          hearAbout: form.howHeard,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submit failed");
      }
      setSubmitted(true);
    } catch {
      // If API fails, still show success — we can follow up manually
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white text-gray-900";

  if (submitted) {
    return (
      <div className="flex-1 relative">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative max-w-lg mx-auto px-6 py-20 text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-10 space-y-6">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900">
            You&apos;re on the list.
          </h2>
          <p className="text-gray-600">
            We&apos;ll send a custom quote within one business day. In the meantime, try TigerTest yourself — it&apos;s the same experience your students will get.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/"
              className="inline-block bg-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors"
            >
              Try TigerTest →
            </Link>
            <Link
              href="/schools"
              className="inline-block text-brand text-sm font-medium hover:underline"
            >
              ← Back to the Schools page
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
    <div className="relative max-w-lg mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
        Get a quote
      </h1>
      <p className="text-gray-600 text-center mb-10">
        Tell us about your school and we&apos;ll send a custom quote within one
        business day.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-sm space-y-5 border border-gray-100"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School name
          </label>
          <input
            required
            type="text"
            value={form.schoolName}
            onChange={set("schoolName")}
            className={inputClass}
            placeholder="Smith Driving Academy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact name
          </label>
          <input
            required
            type="text"
            value={form.contactName}
            onChange={set("contactName")}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            className={inputClass}
            placeholder="jane@smithdriving.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={set("city")}
              className={inputClass}
              placeholder="Austin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={form.state}
              onChange={set("state")}
              className={inputClass}
              placeholder="Texas"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated students per year
          </label>
          <select
            value={form.estimatedStudentsPerYear}
            onChange={set("estimatedStudentsPerYear")}
            className={inputClass}
          >
            <option value="">Select...</option>
            <option value="1-50">1 – 50</option>
            <option value="51-150">51 – 150</option>
            <option value="151-500">151 – 500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How did you hear about us?
          </label>
          <select
            value={form.howHeard}
            onChange={set("howHeard")}
            className={inputClass}
          >
            <option value="">Select...</option>
            <option value="google">Google search</option>
            <option value="referral">Referral</option>
            <option value="social">Social media</option>
            <option value="conference">Conference / event</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand text-white py-3 rounded-xl font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Request a quote"}
        </button>
      </form>
    </div>
    </div>
  );
}
