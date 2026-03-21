'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SchoolsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    school: '',
    email: '',
    students: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const plans = [
    {
      name: 'Starter',
      price: '$25',
      period: '/month',
      students: 'Up to 10 students',
      features: ['Full question bank access', 'Progress tracking', 'Pass prediction scores', 'Email support'],
      cta: 'Start free trial',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$60',
      period: '/month',
      students: 'Up to 30 students',
      features: ['Everything in Starter', 'Class dashboard', 'Bulk student invites', 'Priority support'],
      cta: 'Start free trial',
      highlight: true,
    },
    {
      name: 'School',
      price: '$150',
      period: '/month',
      students: 'Unlimited students',
      features: ['Everything in Pro', 'White-label option', 'Dedicated account manager', 'Custom reporting'],
      cta: 'Contact us',
      highlight: false,
    },
  ];

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          For driving schools &amp; instructors
        </span>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Give your students the best shot at passing
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          TigerTest for Schools gives your students unlimited practice with the same questions that appear on the real permit exam — with a class dashboard so you can track their progress.
        </p>
        <a href="#contact" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors">
          Start a free school trial →
        </a>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why schools choose TigerTest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📚', title: 'Full question banks', desc: 'Every state. Updated when the DMV changes the exam. Your students always practice the right material.' },
              { icon: '📊', title: 'Class dashboard', desc: "See who's ready to test and who needs more time — at a glance. No more guessing." },
              { icon: '💰', title: 'Simple bulk pricing', desc: 'One flat monthly fee covers all your students. No per-seat surprises.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Simple school pricing</h2>
        <p className="text-gray-600 text-center mb-12">All plans include a 14-day free trial. No credit card required.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 ${plan.highlight ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
            >
              {plan.highlight && (
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">{plan.students}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Get started today</h2>
          <p className="text-gray-600 text-center mb-10">Tell us about your school and we will set you up with a free trial.</p>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You are on the list!</h3>
              <p className="text-gray-600">We will be in touch within one business day to set up your free school trial.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School or driving school name</label>
                <input
                  required
                  type="text"
                  value={form.school}
                  onChange={(e) => setForm({ ...form, school: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Smith Driving Academy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jane@smithdriving.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approx. number of students per month</label>
                <select
                  value={form.students}
                  onChange={(e) => setForm({ ...form, students: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="1-10">1 to 10 students</option>
                  <option value="11-30">11 to 30 students</option>
                  <option value="31+">31+ students</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Get my free school trial →
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
