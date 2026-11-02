import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";

// /terms: plain-language terms of service. Written for the connector
// directories, which require a terms URL, and for the quizzes feature, which
// is the first user-generated content on the site. Rewritten Nov 2026 with
// the privacy policy (classes, refunds, safety, consumer law).

const SITE = SITE_URL;
const CONTACT = "john@johnbrophy.net";
const UPDATED = "November 2, 2026";

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
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated {UPDATED}</p>
        <p className={`${p} mt-6`}>
          Tigertest (tigertest.io) is a practice-test site run by John Brophy. By using it you agree to these terms. If you do not agree, please do not use the site.
        </p>

        <h2 className={h2}>1. What Tigertest is</h2>
        <p className={p}>
          Tigertest offers practice questions for licence, certification and entrance exams, and lets you make your own practice tests. It is a study aid. It is not affiliated with, endorsed by or sponsored by any DMV, government agency, licensing board, test maker or school, and passing a Tigertest practice test does not guarantee a result on a real exam. Exam and product names are trademarks of their owners and are used only to say which exam a practice test is for. Rules, fees and formats change: check the official source for your exam before you rely on a detail.
        </p>

        <h2 className={h2}>2. Not professional advice</h2>
        <p className={p}>
          Tigertest is educational practice only. Nothing on it is medical, legal, financial, safety or other professional advice. Questions about first aid, nursing, medicines, electrical work, firearms, driving or any other safety-critical subject are for exam practice: in real life, follow your training, your employer&apos;s procedures, local law and local protocol, and call emergency services in an emergency.
        </p>

        <h2 className={h2}>3. Accounts</h2>
        <p className={p}>
          You can use most of the site without an account. An account (email or Google sign-in) saves your progress across devices and is needed to make quizzes, teach a class or connect an AI assistant. You are responsible for keeping your sign-in details private and for what happens under your account. You must be 13 or older to make an account (16 in the EU, EEA and UK unless a parent or guardian agrees). You can delete your account at any time in Settings.
        </p>

        <h2 className={h2}>4. Premium</h2>
        <p className={p}>
          Premium is a one-time purchase that unlocks the paid parts of the site, as described on the page where you buy it. The price is shown before you pay ($9.99 in the US, a local price elsewhere) and includes any tax we are required to charge. Payment is handled by Stripe. If you change your mind, email us within 14 days of buying and we will refund you in full, no questions asked. After that, if something you paid for does not work, email us and we will fix it or refund you. This does not affect any rights you have under consumer law.
        </p>

        <h2 className={h2}>5. Teachers and classes</h2>
        <p className={p}>
          If you make a class, you confirm that you are allowed to (for a school class, under your school&apos;s authority and its rules on student data), that you will ask students to use a first name or nickname only, and that you will use their results only to teach them. You can see the names and results of the students who join your class; they can leave at any time. Deleting your class or your account deletes their results for that class.
        </p>

        <h2 className={h2}>6. Quizzes you make</h2>
        <p className={p}>
          You own the questions you write or import. By saving a quiz on Tigertest you give us permission to store it, show it to the people you share it with (anyone with the link, or everyone if you set it to public), and display it on the site. You can edit or delete your quizzes at any time. Do not upload material you do not have the right to share (including questions copied from a real exam or a paid course), anything illegal, hateful, harassing or sexual, or anyone else&apos;s personal information. We may remove quizzes that break these rules, and we may feature public quizzes in the library. If you think a quiz infringes your rights, email us with the quiz link and we will look at it promptly and take it down if it does.
        </p>
        <p className={`${p} mt-3`}>
          When you play someone else&apos;s quiz and enter a name, the quiz&apos;s creator can see that name, your answers and your scores on that quiz. Play without a name if you do not want that.
        </p>

        <h2 className={h2}>7. AI assistants and the connector</h2>
        <p className={p}>
          You can connect AI assistants (such as Claude, ChatGPT or Meta&apos;s Muse) to your Tigertest account. The connector only reaches your own quizzes and practice progress. Questions an assistant writes are the assistant&apos;s output, not ours: review them before you rely on them. You can disconnect an assistant at any time from that assistant&apos;s settings.
        </p>

        <h2 className={h2}>8. Our content</h2>
        <p className={p}>
          Tigertest&apos;s own question banks, explanations, design and software are ours. You may use them to study, and teachers may use them with their classes. You may not copy, resell or scrape them, or use them to train a machine-learning model.
        </p>

        <h2 className={h2}>9. Acceptable use</h2>
        <p className={p}>
          Do not try to break the site, overload it, get around its limits, or access other people&apos;s accounts or data. Do not use Tigertest to cheat on a real exam. We may suspend an account that breaks these terms.
        </p>

        <h2 className={h2}>10. Privacy</h2>
        <p className={p}>
          How we handle your data is in the <Link href="/privacy" className="underline">privacy policy</Link>.
        </p>

        <h2 className={h2}>11. No warranty, limited liability</h2>
        <p className={p}>
          Tigertest is provided as is. We work hard to keep questions accurate and the site up, but we do not promise either. To the extent the law allows, we are not liable for exam results, for indirect or consequential losses, or for losses from using the site beyond what you paid us in the last 12 months. Nothing in these terms limits liability that the law does not allow us to limit, such as for death or personal injury caused by negligence, or fraud, or takes away rights you have as a consumer where you live.
        </p>

        <h2 className={h2}>12. Law and disputes</h2>
        <p className={p}>
          If something goes wrong, please email us first; most problems are fixed in a day. These terms are governed by the laws of the State of California, USA. If you are a consumer living elsewhere, you also keep the protection of your own country&apos;s mandatory laws and can bring a claim in your local courts.
        </p>

        <h2 className={h2}>13. Changes and contact</h2>
        <p className={p}>
          We may update these terms; the date at the top changes when we do, and we will tell account holders about significant changes. Questions: <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>.
        </p>
      </div>
    </div>
  );
}
