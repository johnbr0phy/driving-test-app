import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TigerTest",
  description: "TigerTest privacy policy and data practices.",
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> February 19, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              TigerTest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates tigertest.io. This page explains how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect the following information when you use TigerTest:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Account Information:</strong> Email address and display name (if you sign up with Google)</li>
              <li><strong>Practice Test Data:</strong> Your test answers, scores, and progress</li>
              <li><strong>Usage Data:</strong> How you interact with the app (via Google Analytics)</li>
              <li><strong>Payment Information:</strong> Processed securely by Stripe (we never see your card details)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide and improve our practice test service</li>
              <li>Track your progress and show you relevant practice questions</li>
              <li>Send you helpful emails about your test preparation (you can unsubscribe anytime)</li>
              <li>Analyze usage patterns to improve the product</li>
              <li>Process premium upgrades</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li><strong>Google Analytics:</strong> For understanding how users interact with TigerTest</li>
              <li><strong>Stripe:</strong> For processing premium payments securely</li>
              <li><strong>Resend:</strong> For sending transactional emails</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Access your personal data</li>
              <li>Delete your account and data</li>
              <li>Opt out of marketing emails (click &quot;Unsubscribe&quot; in any email)</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, email us at <a href="mailto:john@johnbrophy.net" className="text-brand underline">john@johnbrophy.net</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We use industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Encrypted connections (HTTPS)</li>
              <li>Secure authentication via Google OAuth</li>
              <li>Firestore security rules to protect user data</li>
              <li>Regular security updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to keep you logged in and remember your preferences. Google Analytics also uses cookies to track usage. You can disable cookies in your browser settings, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              TigerTest is intended for users preparing for their driver&apos;s permit test (typically ages 15+). We do not knowingly collect data from children under 13. If you believe a child under 13 has created an account, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We&apos;ll notify you of significant changes via email or a notice on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              Questions about this privacy policy? Email us at{" "}
              <a href="mailto:john@johnbrophy.net" className="text-brand underline">
                john@johnbrophy.net
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
