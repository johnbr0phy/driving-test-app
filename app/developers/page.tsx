import type { Metadata } from "next";
import Link from "next/link";
import { QUIZZES_PAGES_UPDATED_AT } from "@/lib/seoDates";

// /developers: the technical page for anyone wiring an agent to TigerTest,
// and the docs URL the connector directories (Claude, ChatGPT, Meta's Muse)
// ask for. Endpoint, auth, the tool list and example prompts. /connect is
// the version for people; this one is for reviewers and builders.

const SITE = "https://tigertest.io";
const SUPPORT_EMAIL = "john@johnbrophy.net";

export const metadata: Metadata = {
  title: "TigerTest for agents and developers",
  description:
    "Connect any AI agent to TigerTest over MCP: quiz a person on their own material or the DMV test in two tool calls, make quizzes, and read who played. OAuth 2.1 with PKCE, no API key.",
  alternates: { canonical: `${SITE}/developers` },
  openGraph: { title: "TigerTest for agents and developers", description: "Quiz a person in two tool calls over MCP.", url: `${SITE}/developers`, type: "website" },
};

const TOOL_GROUPS: { title: string; blurb: string; tools: { name: string; what: string }[] }[] = [
  {
    title: "Quiz the person (two calls)",
    blurb: "The whole loop an agent needs. No state on the agent's side: TigerTest keeps the mastery queue and sends the next question back with every graded answer.",
    tools: [
      { name: "quiz_me", what: "Start or continue a quiz by code, by \"dmv\", or by words (\"British phrases\"). Returns one question with options A to D." },
      { name: "answer", what: "Grade the person's letter. Returns right or wrong, the explanation, progress, and the next question." },
      { name: "find_quiz", what: "Search the person's own quizzes and the public library; returns codes to pass to quiz_me." },
      { name: "reset_quiz_play", what: "Start a quiz over for this person (confirm first)." },
    ],
  },
  {
    title: "Make and track quizzes",
    blurb: "The agent writes the questions (call get_quiz_writing_guide first) and TigerTest stores them. The creator can share the link and see who played.",
    tools: [
      { name: "get_quiz_writing_guide", what: "The rules our own question banks follow: research first, four short options, a key that never stands out." },
      { name: "create_quiz", what: "Save a quiz (title, questions, visibility). Returns the share link." },
      { name: "add_quiz_questions", what: "Append questions to a quiz the person owns." },
      { name: "list_my_quizzes", what: "The person's quizzes with plays, players and links." },
      { name: "get_quiz", what: "A quiz's questions (owner) or its public summary." },
      { name: "update_quiz", what: "Title, description, visibility, pass mark." },
      { name: "delete_quiz", what: "Delete a quiz (confirm first)." },
      { name: "get_quiz_report", what: "Who played, which questions and topics they missed most." },
    ],
  },
  {
    title: "DMV permit test tutor",
    blurb: "The original tool set: the person's state, the four practice tests and four training sets, their weak areas and pass odds.",
    tools: [
      { name: "list_states, get_user_state, set_user_state, set_language", what: "Which state's test, in English or Spanish." },
      { name: "get_progress, get_weak_areas, get_test_attempt_stats, get_training_set_progress", what: "How they are doing and what to study." },
      { name: "start_training_set, get_next_training_question, submit_training_answer, reset_training_set", what: "Mastery practice, set by set (quiz_me with \"dmv\" wraps these)." },
      { name: "start_practice_test, get_next_test_question, submit_test_answer, submit_practice_test, resume_practice_test, abandon_practice_test, get_test_results", what: "A full 50-question practice test with the score at the end." },
    ],
  },
];

const PROMPTS = [
  "Quiz me on my biology notes until I get them all right.",
  "Turn these notes into a TigerTest quiz and give me the link for my study group.",
  "Quiz me for the California DMV test.",
  "How did people do on my British phrases quiz? Which questions did they miss?",
  "Where am I weakest on the DMV test? Drill me on that.",
];

const code = "font-mono text-[13px] bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-gray-900 dark:text-gray-50";

export default function DevelopersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/developers#webpage`,
    url: `${SITE}/developers`,
    name: "TigerTest for agents and developers",
    description: metadata.description,
    dateModified: QUIZZES_PAGES_UPDATED_AT,
    isPartOf: { "@id": `${SITE}/#website` },
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">TigerTest for agents</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            One MCP server. Any agent that speaks it can quiz a person on their own material or the DMV test, make quizzes, and read
            who played. Two tool calls run a whole session. TigerTest never runs a model on your behalf: your agent writes the
            questions and does the talking, TigerTest keeps the questions, the mastery queue and the scores.
          </p>
        </header>

        <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Endpoint</h2>
          <dl className="grid sm:grid-cols-[11rem_1fr] gap-y-3 gap-x-4 text-sm">
            <dt className="text-gray-600 dark:text-gray-300">MCP server</dt>
            <dd><span className={code}>{SITE}/api/mcp</span> (Streamable HTTP, stateless)</dd>
            <dt className="text-gray-600 dark:text-gray-300">Auth</dt>
            <dd className="text-gray-900 dark:text-gray-50">OAuth 2.1 with PKCE, dynamic client registration, no API keys. The person signs in to TigerTest once (or creates an account on the consent screen).</dd>
            <dt className="text-gray-600 dark:text-gray-300">Discovery</dt>
            <dd>
              <span className={code}>/.well-known/oauth-protected-resource</span> and <span className={code}>/.well-known/oauth-authorization-server</span>
            </dd>
            <dt className="text-gray-600 dark:text-gray-300">Scope</dt>
            <dd><span className={code}>mcp</span>: the signed-in account&apos;s own quizzes and progress, nothing else</dd>
            <dt className="text-gray-600 dark:text-gray-300">Rate limit</dt>
            <dd className="text-gray-900 dark:text-gray-50">60 requests a minute per account</dd>
            <dt className="text-gray-600 dark:text-gray-300">Prompt</dt>
            <dd className="text-gray-900 dark:text-gray-50"><span className={code}>write_quiz</span>, the question-writing guide with an optional material argument</dd>
          </dl>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Add it to a client</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
            <li>Claude: Settings, Connectors, Add custom connector, URL <span className={code}>{SITE}/api/mcp</span>.</li>
            <li>ChatGPT: Settings, Connectors (developer mode), Create, MCP server URL <span className={code}>{SITE}/api/mcp</span>, OAuth.</li>
            <li>Meta Muse and other agent platforms: submit the same endpoint as an existing MCP connector with OAuth and PKCE.</li>
            <li>
              Any MCP SDK or MCP Inspector: point at the endpoint; the 401 carries a <span className={code}>resource_metadata</span> hint, so the OAuth flow starts on its own.
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Step-by-step screenshots for people are on <Link href="/connect" className="underline text-gray-900 dark:text-gray-50">/connect</Link>.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Tools</h2>
          {TOOL_GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-50">{g.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{g.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {g.tools.map((t) => (
                  <li key={t.name} className="grid sm:grid-cols-[14rem_1fr] gap-x-4 gap-y-0.5">
                    <span className={`${code} break-words self-start`}>{t.name}</span>
                    <span className="text-gray-700 dark:text-gray-200">{t.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Example prompts</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
            {PROMPTS.map((p) => (
              <li key={p}>&ldquo;{p}&rdquo;</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 text-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">For directory listings</h2>
          <dl className="grid sm:grid-cols-[11rem_1fr] gap-y-2 gap-x-4">
            <dt className="text-gray-600 dark:text-gray-300">Name</dt>
            <dd className="text-gray-900 dark:text-gray-50">TigerTest</dd>
            <dt className="text-gray-600 dark:text-gray-300">One line</dt>
            <dd className="text-gray-900 dark:text-gray-50">Practice tests from your own notes, plus the DMV test. Quiz me, track what I miss, share with my class.</dd>
            <dt className="text-gray-600 dark:text-gray-300">Icon</dt>
            <dd><a href="/icon-512.png" className="underline text-gray-900 dark:text-gray-50">{SITE}/icon-512.png</a> (512 by 512 PNG)</dd>
            <dt className="text-gray-600 dark:text-gray-300">Privacy</dt>
            <dd><Link href="/privacy" className="underline text-gray-900 dark:text-gray-50">{SITE}/privacy</Link></dd>
            <dt className="text-gray-600 dark:text-gray-300">Terms</dt>
            <dd><Link href="/terms" className="underline text-gray-900 dark:text-gray-50">{SITE}/terms</Link></dd>
            <dt className="text-gray-600 dark:text-gray-300">Support</dt>
            <dd><a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-gray-900 dark:text-gray-50">{SUPPORT_EMAIL}</a></dd>
            <dt className="text-gray-600 dark:text-gray-300">Payments</dt>
            <dd className="text-gray-900 dark:text-gray-50">None through the connector. Premium ($9.99 one time) is bought on the site.</dd>
            <dt className="text-gray-600 dark:text-gray-300">Data</dt>
            <dd className="text-gray-900 dark:text-gray-50">Only the signed-in account&apos;s quizzes and practice progress. No access to other people&apos;s quizzes beyond what a public link shows.</dd>
          </dl>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Questions or a platform we should list on? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
