import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";
import { CookieSettingsButton } from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Tigertest collects, why, who it is shared with, how long it is kept, and your rights.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

// Keep in step with what the code does: lib/privacyRegion.ts (analytics
// consent and children's pages), app/api/account/delete (what deletion
// removes), lib/classes.ts and lib/quizzes.ts (what teachers and quiz makers
// see), lib/funnel.ts and the other anonymous counters.
const UPDATED = "November 4, 2026";
const CONTACT = "john@johnbrophy.net";

const h2 = "text-2xl font-semibold mb-4 mt-2";
const p = "text-gray-700 dark:text-gray-200 leading-relaxed";
const ul = "list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200";

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          <strong>Last updated:</strong> {UPDATED}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className={h2}>Who we are</h2>
            <p className={p}>
              Tigertest (tigertest.io) is a practice-test site run by John Brophy, who is the data controller for the
              personal information described here. Contact: <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>.
              The short version: we collect what we need to save your progress and run the site, we never sell it, and
              you can delete your account yourself at any time.
            </p>
          </section>

          <section>
            <h2 className={h2}>What we collect</h2>
            <ul className={ul}>
              <li>
                <strong>Account:</strong> your email address, and your name and photo if you sign in with Google. You can use
                most of Tigertest without an account; then your progress stays in your browser.
              </li>
              <li>
                <strong>Study data:</strong> the tests you start, your answers, scores and progress, your chosen state or
                country, language and settings.
              </li>
              <li>
                <strong>Classes and quizzes:</strong> if you join a teacher&apos;s class or play a quiz under a name, the name
                you type and your answers and scores on that class&apos;s test or that quiz. If you teach a class or make a
                quiz, its name, questions and settings.
              </li>
              <li>
                <strong>Question reports:</strong> if you report a question, the reason you pick, anything you write, the
                language and page, and which option you chose. Reports are not linked to your account.
              </li>
              <li>
                <strong>Searches and requests:</strong> what you type into the test search (stored without who typed it) and
                any exam you ask us to build.
              </li>
              <li>
                <strong>Device and visit:</strong> your approximate country from your IP address (used to show your
                country&apos;s tests and prices and to decide which privacy rules apply; we do not store your IP address
                with your account), the page that sent you here, a random browser ID kept in your browser, and whether
                you came from a school learning system.
              </li>
              <li>
                <strong>Payments:</strong> if you buy Premium, Stripe handles the card. We receive the amount, currency,
                country, date and the page you bought from, never your card number.
              </li>
              <li>
                <strong>AI assistants:</strong> if you connect Claude, ChatGPT or another assistant, the sign-in link
                between that assistant and your account, and the practice you do through it.
              </li>
              <li>
                <strong>Email:</strong> which of our emails we sent you and whether you clicked them.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>Why we use it (and the legal basis)</h2>
            <ul className={ul}>
              <li>
                <strong>To run the service you asked for</strong> (contract): saving progress, syncing devices, showing
                results, classes, quizzes, Premium and connected assistants.
              </li>
              <li>
                <strong>To understand and improve Tigertest</strong> (legitimate interest): counting answers, visits,
                signups and which pages help, mostly as anonymous totals.
              </li>
              <li>
                <strong>Google Analytics</strong> (your consent where the law requires it, otherwise legitimate interest):
                see Cookies below.
              </li>
              <li>
                <strong>Study emails</strong> (consent): reminders, tips and news about tests. Every one has a one-click
                unsubscribe. Account and receipt emails are sent because you have an account or bought something.
              </li>
              <li>
                <strong>Payments, tax and fraud</strong> (legal obligation and legitimate interest).
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>Who we share it with</h2>
            <p className={`${p} mb-3`}>
              We do not sell or rent personal information, and we do not show ads. We use these service providers, who
              process data only to provide their service to us:
            </p>
            <ul className={ul}>
              <li><strong>Google Firebase / Google Cloud</strong>: sign-in and the database that stores accounts and progress.</li>
              <li><strong>Vercel</strong>: hosting, and the IP-based country lookup.</li>
              <li><strong>Google Analytics</strong>: site usage, where allowed (see Cookies).</li>
              <li><strong>Stripe</strong>: payments.</li>
              <li><strong>Resend</strong>: sending email.</li>
              <li><strong>Anthropic</strong>: writes our internal daily summary from site-wide totals. No personal information is sent.</li>
            </ul>
            <p className={`${p} mt-3`}>
              Other people see your information only where the feature is built for it: a teacher sees the name and
              results of each student in their class; a quiz maker sees the name, answers and scores of each person who
              plays their quiz under a name; anyone with a quiz&apos;s link sees the quiz. An AI assistant you connect
              sees what you ask it to fetch. We may also disclose information if the law requires it.
            </p>
            <p className={`${p} mt-3`}>
              These providers are based in or process data in the United States. Where data leaves the UK, EEA or
              Switzerland, we rely on the providers&apos; Standard Contractual Clauses or the EU-US Data Privacy
              Framework.
            </p>
          </section>

          <section id="cookies">
            <h2 className={h2}>Cookies and similar storage</h2>
            <ul className={ul}>
              <li>
                <strong>Needed to work:</strong> sign-in, your progress and settings (kept in your browser&apos;s storage),
                your country, language and theme, and your cookie choice.
              </li>
              <li>
                <strong>Google Analytics</strong> (cookies named _ga): how people use the site. In the EU, EEA, UK and
                Switzerland it is off until you allow it. Elsewhere it is on until you turn it off. It is always off on
                our children&apos;s tests and for anyone who has joined a teacher&apos;s class or a named quiz on that
                device.
              </li>
              <li>
                <strong>Our own counts:</strong> anonymous totals such as questions answered and signups, using a random
                ID in your browser. Turning off analytics stops these too.
              </li>
            </ul>
            <p className={`${p} mt-3`}>
              <CookieSettingsButton />
            </p>
          </section>

          <section>
            <h2 className={h2}>Children</h2>
            <p className={p}>
              Some of our tests are for school pupils, including younger children (times tables, KS2 SATs, the 11+ and
              other school entrance tests). Children can practise these without an account and without giving us any
              personal information. On these tests we turn Google Analytics off and keep only anonymous totals. You must
              be 13 or older (16 in the EU, EEA and UK unless a parent agrees) to create an account; a younger child
              should use Tigertest without one or with a parent&apos;s account.
            </p>
            <p className={`${p} mt-3`}>
              Teachers who set a class link for pupils agree to do so under their school&apos;s authority and to ask
              pupils to use a first name or nickname only. Pupils in a class have no account; their results are visible
              only to that teacher. If you are a parent and think your child has given us personal information, email
              us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className={h2}>How long we keep it</h2>
            <ul className={ul}>
              <li>Accounts and progress: until you delete your account. We may delete an account unused for three years.</li>
              <li>Class and quiz results: until the teacher deletes the class or the maker deletes the quiz, or the account that holds them is deleted.</li>
              <li>Payment records: as long as tax law requires (normally up to seven years), even after an account is deleted.</li>
              <li>Search terms and anonymous totals: kept, but not linked to you.</li>
              <li>Google Analytics data: kept by Google for no more than 14 months.</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>Your rights</h2>
            <p className={`${p} mb-3`}>Wherever you live, you can:</p>
            <ul className={ul}>
              <li>
                <strong>Delete your account</strong> yourself: <Link href="/settings" className="underline">Settings</Link>,
                then Delete account. It removes your account, progress, quizzes and the classes you teach.
              </li>
              <li><strong>Stop emails</strong> with the unsubscribe link in any email.</li>
              <li><strong>Turn off analytics</strong> with the cookie button above.</li>
              <li>
                <strong>Get a copy</strong> of your data, <strong>correct</strong> it, <strong>object</strong> to or
                <strong> restrict</strong> how we use it, or <strong>withdraw consent</strong>, by emailing{" "}
                <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>. We answer within 30 days.
              </li>
            </ul>
            <p className={`${p} mt-3`}>
              These are your rights under the GDPR and UK GDPR, US state privacy laws such as California&apos;s (CCPA), and
              similar laws in Canada, Australia, India and elsewhere. We do not sell or share personal information for
              targeted advertising. If you are unhappy with our answer, you can complain to your data protection
              authority (in the UK, the ICO).
            </p>
          </section>

          <section>
            <h2 className={h2}>Security</h2>
            <p className={p}>
              Connections are encrypted (HTTPS), sign-in is handled by Firebase Authentication, database rules limit
              each account to its own data, and payments never touch our servers. No system is perfectly secure; if a
              breach affects you, we will tell you and the authorities as the law requires.
            </p>
          </section>

          <section>
            <h2 className={h2}>Changes</h2>
            <p className={p}>
              When this policy changes, the date at the top changes. For a significant change we will also tell account
              holders by email or on the site.
            </p>
          </section>

          <section>
            <h2 className={h2}>Contact</h2>
            <p className={p}>
              Questions or requests: <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
