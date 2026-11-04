"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, Mic, TrendingUp, ChevronRight, History } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { useTestsInProgress } from "@/hooks/useTestsInProgress";
import { FLAGS, readRegionCookie } from "@/components/CountryPills";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchTracking } from "@/hooks/useSearchTracking";
import { Region, TestRegion, regionInfo, regionOfTest } from "@/lib/region";
import { normalizeQuery, searchAllTests, SearchHit, SearchResult } from "@/lib/testSearch";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { asNotifyEmail } from "@/lib/test-requests";

const flagOf = (r: TestRegion) => (r === "GLOBAL" ? "🌐" : FLAGS[r]);
const SETTLE_MS = 800;

function progressLine(mastered: number, testsTaken: number): string {
  const parts = [];
  if (mastered > 0) parts.push(testsTaken > 0 ? `${mastered} mastered` : `${mastered} question${mastered === 1 ? "" : "s"} mastered`);
  if (testsTaken > 0) parts.push(`${testsTaken} test${testsTaken === 1 ? "" : "s"} taken`);
  return parts.join(" · ") || "Started";
}

// The bit of the Web Speech API the mic button uses (not in the TS DOM lib).
interface SpeechRec {
  lang: string;
  interimResults: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
}

/**
 * The search at the top of every English homepage (/, /uk, /ca...): one box, every test in every country,
 * a flag on each result, a tap goes straight to the test. What people type is
 * tracked (api/analytics/search) so searches that find nothing become the list
 * of tests to build.
 */
export function SearchHome({
  initialRegion,
  popularity,
  trending,
  answeredThisWeek,
  headline,
}: {
  initialRegion: Region;
  popularity: Record<string, number>;
  /** What people searched most this week, topped up with popular test names. */
  trending: string[];
  /** Questions answered on Tigertest in the last 7 days, null when unknown. */
  answeredThisWeek: number | null;
  /** A country homepage's own h1 ("Free UK practice tests: driving, school and more",
   *  lib/regionHeadline.ts). Rendered visually hidden (the page
   *  looks like the US one) and the wordmark is no longer the heading; the US page leaves it unset. */
  headline?: string;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [region, setRegion] = useState<Region>(initialRegion);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // A country the visitor picked on this device beats the server's guess.
  useEffect(() => {
    const saved = readRegionCookie();
    if (saved) setRegion(saved);
  }, []);

  // Voice search where the browser has it (Chrome, Safari): the mic sits in the box like Google's.
  const [canListen, setCanListen] = useState(false);
  const [listening, setListening] = useState(false);
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    setCanListen(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);
  function listen() {
    const w = window as unknown as Record<string, new () => SpeechRec>;
    const Rec = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Rec || listening) return;
    const rec = new Rec();
    rec.lang = navigator.language || "en-US";
    rec.interimResults = true;
    rec.onresult = (e) => setQuery(Array.from(e.results).map((r) => r[0].transcript).join(""));
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true);
    rec.start();
  }

  const live = useMemo(() => searchAllTests(query, region, popularity), [query, region, popularity]);
  const q = normalizeQuery(query);
  const showResults = q.length > 0;

  // While someone is still typing, a half-typed word that matches nothing
  // keeps the last results on screen; "we don't have it" waits until they
  // pause (or press Enter), so it never flashes mid-word.
  const [settledQ, setSettledQ] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setSettledQ(q), SETTLE_MS);
    return () => clearTimeout(timer);
  }, [q]);
  const settled = settledQ === q;
  const lastHits = useRef<SearchResult | null>(null);
  if (live.hits.length > 0) lastHits.current = live;
  else if (!showResults) lastHits.current = null;
  const result = !settled && live.hits.length === 0 && lastHits.current ? lastHits.current : live;
  const miss = showResults && settled && live.hits.length === 0;
  // What the tracking counts as found: a near miss (no test has every word) is a test to build.
  const foundCount = live.partial ? 0 : live.hits.length;

  useEffect(() => setActive(0), [query]);

  // One row per search on the Searches tab, not one per pause (hooks/useSearchTracking).
  const tracking = useSearchTracking(q, foundCount, region, user?.email);

  function open(hit: SearchHit) {
    tracking.picked(q, foundCount, hit.key);
    router.push(hit.href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showResults) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, result.hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = result.hits[active];
      setSettledQ(q);
      if (hit) open(hit);
      else tracking.submit(q, 0);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  }

  // Run a trending search the way Google does: it fills the box and shows the results.
  // The list sits below the fold, so go back to the top: the top bar, the box and the
  // results come into view together. On a phone the keyboard stays down (focusing would
  // raise it over the results and let the browser scroll the bar away).
  function runTrending(text: string) {
    setQuery(text);
    window.scrollTo({ top: 0 });
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus({ preventScroll: true });
  }

  const started = useTestsInProgress();

  return (
    <section aria-label="Find your test" data-search-home data-searching={showResults || undefined} className="bg-white dark:bg-gray-950">
      <div className="mx-auto w-full max-w-2xl px-4">
        {/* The wordmark. Shrinks to one line while searching so results stay above a phone keyboard. */}
        <div className={`flex items-center justify-center ${showResults ? "gap-2 pt-3 pb-4" : "gap-3 pt-10 pb-3 sm:pt-[12vh] sm:pb-4"}`}>
          <Image src="/tiger.png" alt="" width={96} height={96} priority className={showResults ? "w-8 h-8" : "w-16 h-16 sm:w-24 sm:h-24"} />
          {headline ? (
            <p className={`font-extrabold tracking-tight text-gray-900 dark:text-gray-50 ${showResults ? "text-2xl" : "text-5xl sm:text-7xl"}`}>Tigertest</p>
          ) : (
            <h1 className={`font-extrabold tracking-tight text-gray-900 dark:text-gray-50 ${showResults ? "text-2xl" : "text-5xl sm:text-7xl"}`}>
              Tigertest
              {/* What the page is, for search engines and screen readers; the wordmark stays the visible heading. */}
              <span className="sr-only">: free practice tests for {TEST_CATALOG.length} exams</span>
            </h1>
          )}
        </div>

        {/* A country page keeps its own h1 for search engines and screen readers, but every
            homepage looks the same: the shared tagline and the weekly count below. */}
        {headline && <h1 className="sr-only">{headline}</h1>}

        {!showResults && (
          <>
            <p className="text-center text-base text-gray-600 dark:text-gray-300 sm:text-lg">Free prep, any test, anywhere.</p>
            {answeredThisWeek !== null && answeredThisWeek > 0 ? (
              <p className="pt-2 pb-7 text-center text-sm text-gray-500 dark:text-gray-400 sm:pb-9">
                <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500 align-middle ring-[3px] ring-green-500/25" />
                <CountUp value={answeredThisWeek} className="font-semibold text-gray-900 dark:text-gray-50 tabular-nums" /> questions answered this week
              </p>
            ) : (
              <div className="pb-8 sm:pb-10" />
            )}
          </>
        )}

        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            inputMode="search"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search for your test"
            aria-label="Search for a test"
            role="combobox"
            aria-expanded={showResults}
            aria-controls="test-search-results"
            aria-activedescendant={showResults && result.hits[active] ? `hit-${result.hits[active].key}` : undefined}
            className="search-pill w-full h-14 pl-14 pr-24 rounded-full bg-white border border-gray-300 dark:border-transparent dark:bg-gray-800 text-lg text-gray-900 dark:text-gray-50 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:bg-white dark:focus:bg-gray-900 focus:shadow-[0_1px_6px_rgba(32,33,36,0.28)] transition [&::-webkit-search-cancel-button]:hidden"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="p-2.5 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {canListen && (
              <button
                type="button"
                onClick={listen}
                aria-label={listening ? "Listening" : "Search by voice"}
                className={`p-2.5 rounded-full ${listening ? "text-red-500 animate-pulse" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"}`}
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {showResults && !miss && result.hits.length > 0 && (
          <div className="mt-3 pb-10">
            {result.partial && settled ? (
              <p className="px-4 pb-2 text-sm text-gray-600 dark:text-gray-300">
                We don&apos;t have &ldquo;{query.trim()}&rdquo; yet. Closest matches:
              </p>
            ) : (
              result.fuzzy && <p className="px-4 pb-2 text-sm text-gray-500 dark:text-gray-400">Closest matches:</p>
            )}
            <ul id="test-search-results" role="listbox" className="rounded-3xl bg-white dark:bg-gray-900 overflow-hidden border border-gray-100 dark:border-gray-800">
              {result.hits.map((hit, i) => (
                <li key={hit.key} id={`hit-${hit.key}`} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onClick={() => open(hit)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 text-left ${i === active ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                  >
                    <span className="text-2xl leading-none shrink-0" title={hit.region === "GLOBAL" ? "Worldwide" : regionInfo(hit.region).name}>
                      {flagOf(hit.region)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-gray-900 dark:text-gray-50 truncate">{hit.title}</span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{hit.subtitle}</span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
            {result.partial && settled && (
              <MissingTest query={query.trim()} signedInEmail={user?.email ?? null} />
            )}
          </div>
        )}

        {miss && <MissingTest query={query.trim()} signedInEmail={user?.email ?? null} />}
      </div>

      {!showResults && (
        <div className="mx-auto w-full max-w-2xl px-4 pt-10 pb-6 space-y-10">
          {/* Anyone with progress on this device or account: their tests, the current one first. */}
          {started.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">Pick up where you left off</h2>
              <ul>
                {started.slice(0, 4).map(({ test, mastered, testsTaken }) => (
                  <li key={test.id} className="border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                    <Link
                      href={test.dashboardHref}
                      className="flex items-center gap-5 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <History className="w-5 h-5 shrink-0 text-gray-600 dark:text-gray-300" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-medium text-gray-900 dark:text-gray-50 truncate">{test.name}</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{progressLine(mastered, testsTaken)}</span>
                      </span>
                      <span className="text-xl leading-none shrink-0">{flagOf(regionOfTest(test.id))}</span>
                      <ChevronRight className="w-5 h-5 shrink-0 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Like Google: what people are searching for. A tap runs the search. */}
          {trending.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">Trending searches</h2>
              <ul>
                {trending.map((text) => (
                  <li key={text} className="border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => runTrending(text)}
                      className="w-full flex items-center gap-5 px-3 py-3 text-left text-base text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl"
                    >
                      <TrendingUp className="w-5 h-5 shrink-0 text-gray-600 dark:text-gray-300" aria-hidden />
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

/**
 * A search that found nothing (or only near misses): ask for an email so we
 * can say when the test ships. Posts to the test-request endpoint with the
 * search as the named test, so it lands on the Growth tab and emails John.
 */
function MissingTest({ query, signedInEmail }: { query: string; signedInEmail: string | null }) {
  const [email, setEmail] = useState(signedInEmail ?? "");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [sentFor, setSentFor] = useState("");
  useEffect(() => {
    if (signedInEmail) setEmail((e) => e || signedInEmail);
  }, [signedInEmail]);
  // A new search gets a fresh form.
  const done = state === "done" && sentFor === query;
  const valid = asNotifyEmail(email) !== null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/feedback/test-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pick: "other", source: "search", details: query, email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentFor(query);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mt-4 rounded-3xl bg-gray-100 dark:bg-gray-900 p-6 text-center">
      {done ? (
        <>
          <p className="font-semibold text-gray-900 dark:text-gray-50">Thanks! We&apos;re on it.</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            We&apos;ll email {email.trim()} when &ldquo;{query}&rdquo; ships.
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold text-gray-900 dark:text-gray-50">Are we missing your test?</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Let us know and we&apos;ll build it for you. Add your email address and we&apos;ll let you know when it ships.
          </p>
          <form onSubmit={submit} className="mt-4 mx-auto flex max-w-md flex-col sm:flex-row gap-2">
            <label htmlFor="missing-test-email" className="sr-only">Email address</label>
            <input
              id="missing-test-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              className="min-w-0 flex-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!valid || state === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {state === "sending" ? "Sending..." : "Let me know"}
            </button>
          </form>
          {state === "error" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">That didn&apos;t go through. Please try again.</p>
          )}
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Can&apos;t wait?{" "}
            <Link href="/create" className="font-semibold text-gray-900 dark:text-gray-50 underline underline-offset-2">
              Make your own quiz now
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
