import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";
import { QUIZZES_PAGES_UPDATED_AT } from "@/lib/seoDates";

// /terms: plain-language terms of service. Written for the connector
// directories, which require a terms URL, and for the quizzes feature, which
// is the first user-generated content on the site. A draft for John to
// review, not legal advice.

const SITE = SITE_URL;
const CONTACT = "john@johnbrophy.net";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Tigertest: accounts, Premium, quizzes you make, and the AI connector.",
  alternates: { canonical: `${SITE}/terms` },
  robots: { index: true, follow: true },
};

const h2 = "text-lg font-semibold text-gray-900 dark:text-gray-50 mt-8 mb-2";
const p = "text-gray-700 dark:text-gray-200 leading-relaxed";

export default function TermsPage() {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated {QUIZZES_PAGES_UPDATED_AT}</p>
        <p className={`${p} mt-6`}>
          Tigertest (tigertest.io) is a practice-test site run by John Brophy. By using it you agree to these terms. If you do not agree, please do not use the site.
        </p>

        <h2 className={h2}>1. What Tigertest is</h2>
        <p className={p}>
          Tigertest offers practice questions for licence, certification and entrance exams, and lets you make your own practice tests. It is a study aid. It is not affiliated with any DMV, licensing board, test maker or school, and passing a Tigertest practice test does not guarantee a result on a real exam.
        </p>

        <h2 className={h2}>2. Accounts</h2>
        <p className={p}>
          You can use most of the site without an account. An account (email or Google sign-in) saves your progress across devices and is needed to make quizzes or connect an AI assistant. You are responsible for keeping your sign-in details private and for what happens under your account. You must be 13 or older to make an account.
        </p>

        <h2 className={h2}>3. Premium</h2>
        <p className={p}>
          Premium is a one-time purchase of $9.99 that unlocks the paid parts of the site, as described on the page where you buy it. Payment is handled by Stripe. If something you paid for does not work, email us and we will fix it or refund you.
        </p>

        <h2 className={h2}>4. Quizzes you make</h2>
        <p className={p}>
          You own the questions you write or import. By saving a quiz on Tigertest you give us permission to store it, show it to the people you share it with (anyone with the link, or everyone if you set it to public), and display it on the site. You can edit or delete your quizzes at any time. Do not upload material you do not have the right to share, anything illegal, hateful, harassing or sexual, or anyone else&apos;s personal information. We may remove quizzes that break these rules, and we may feature public quizzes in the library.
        </p>
        <p className={`${p} mt-3`}>
          When you play someone else&apos;s quiz and enter a name, the quiz&apos;s creator can see that name, your answers and your scores on that quiz. Play without a name if you do not want that.
        </p>

        <h2 className={h2}>5. AI assistants and the connector</h2>
        <p className={p}>
          You can connect AI assistants (such as Claude, ChatGPT or Meta&apos;s Muse) to your Tigertest account. The connector only reaches your own quizzes and practice progress. Questions an assistant writes are the assistant&apos;s output, not ours: review them before you rely on them. You can disconnect an assistant at any time from that assistant&apos;s settings.
        </p>

        <h2 className={h2}>6. Our content</h2>
        <p className={p}>
          Tigertest&apos;s own question banks, explanations, design and software are ours. You may use them to study. You may not copy, resell or scrape them, or use them to train a machine-learning model.
        </p>

        <h2 className={h2}>7. Acceptable use</h2>
        <p className={p}>
          Do not try to break the site, overload it, get around its limits, or access other people&apos;s accounts or data. Do not use Tigertest to cheat on a real exam.
        </p>

        <h2 className={h2}>8. Privacy</h2>
        <p className={p}>
          How we handle your data is in the <Link href="/privacy" className="underline">privacy policy</Link>.
        </p>

        <h2 className={h2}>9. No warranty, limited liability</h2>
        <p className={p}>
          Tigertest is provided as is. We work hard to keep questions accurate and the site up, but we do not promise either, and we are not liable for exam results or for losses from using the site, beyond what you paid us in the last 12 months.
        </p>

        <h2 className={h2}>10. Changes and contact</h2>
        <p className={p}>
          We may update these terms; the date at the top changes when we do. Questions: <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>.
        </p>
      </div>
    </div>
  );
}
