"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, Mic, Grip } from "lucide-react";
import { FLAGS, readRegionCookie } from "@/components/CountryPills";
import { useAuth } from "@/contexts/AuthContext";
import { isInternalBrowser } from "@/lib/internal";
import { Region, TestRegion, regionInfo, regionOfTest } from "@/lib/region";
import { normalizeQuery, searchAllTests, SearchHit } from "@/lib/testSearch";
import type { TestCatalogEntry } from "@/lib/testCatalog";
import { getTigerAsset } from "@/lib/tigerAssets";

const flagOf = (r: TestRegion) => (r === "GLOBAL" ? "🌐" : FLAGS[r]);
const TRACK_DELAY_MS = 1200;

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
 * The search-first homepage (/home-v2): one box, every test in every country,
 * a flag on each result, a tap goes straight to the test. What people type is
 * tracked (api/analytics/search) so searches that find nothing become the list
 * of tests to build.
 */
export function SearchHome({
  initialRegion,
  popularity,
  popular,
}: {
  initialRegion: Region;
  popularity: Record<string, number>;
  popular: { test: TestCatalogEntry; answered: number | null }[];
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [region, setRegion] = useState<Region>(initialRegion);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const sent = useRef(new Set<string>());

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

  const result = useMemo(() => searchAllTests(query, region, popularity), [query, region, popularity]);
  const q = normalizeQuery(query);
  const showResults = q.length > 0;
  const miss = showResults && result.hits.length === 0;

  useEffect(() => setActive(0), [query]);

  function track(body: Record<string, unknown>) {
    if (isInternalBrowser(user?.email)) return;
    const payload = JSON.stringify({ ...body, region });
    try {
      if (navigator.sendBeacon?.("/api/analytics/search", new Blob([payload], { type: "application/json" }))) return;
    } catch {
      // Fall through to fetch.
    }
    fetch("/api/analytics/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }

  function trackQuery(text: string, results: number) {
    if (text.length < 2 || sent.current.has(text)) return;
    sent.current.add(text);
    track({ kind: "query", q: text, results });
  }

  // Count a query once the visitor stops typing, so "c", "ca", "cal" never count.
  useEffect(() => {
    if (q.length < 2) return;
    const results = result.hits.length;
    const timer = setTimeout(() => trackQuery(q, results), TRACK_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, result.hits.length]);

  function open(hit: SearchHit) {
    if (q.length >= 2) {
      trackQuery(q, result.hits.length);
      track({ kind: "pick", q, pick: hit.key });
    }
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
      if (hit) open(hit);
      else trackQuery(q, 0);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  }

  const avatar = user?.photoURL;
  const initial = (user?.displayName || user?.email || "?").trim()[0]?.toUpperCase();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Top bar, like Google's: tabs on the left, the account on the right. */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-transparent">
        <nav className="flex items-center gap-6 text-sm font-semibold tracking-wide">
          <span className="relative py-4 text-blue-600 dark:text-blue-400">
            TESTS
            <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          </span>
          <Link href="/quizzes" className="py-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">
            QUIZZES
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/tests" aria-label="Every test" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Grip className="w-5 h-5" />
          </Link>
          {user ? (
            <Link href="/settings" aria-label="Your account" className="block w-9 h-9 rounded-full overflow-hidden bg-brand text-white grid place-items-center font-semibold ring-2 ring-white dark:ring-gray-950">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                initial
              )}
            </Link>
          ) : (
            <Link href="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Sign in
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4">
        {/* The wordmark. Shrinks to one line while searching so results stay above a phone keyboard. */}
        <div className={`flex items-center justify-center ${showResults ? "gap-2 pt-3 pb-4" : "gap-3 pt-10 pb-8 sm:pt-[12vh] sm:pb-10"}`}>
          <Image src="/tiger.png" alt="" width={96} height={96} priority className={showResults ? "w-8 h-8" : "w-16 h-16 sm:w-24 sm:h-24"} />
          <h1 className={`font-extrabold tracking-tight text-gray-900 dark:text-gray-50 ${showResults ? "text-2xl" : "text-5xl sm:text-7xl"}`}>
            Tigertest
          </h1>
        </div>

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
            className="search-pill w-full h-14 pl-14 pr-24 rounded-full bg-gray-100 dark:bg-gray-800 text-lg text-gray-900 dark:text-gray-50 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:bg-white dark:focus:bg-gray-900 focus:shadow-[0_1px_6px_rgba(32,33,36,0.28)] transition [&::-webkit-search-cancel-button]:hidden"
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

        {showResults && !miss && (
          <div className="mt-3 pb-10">
            {result.fuzzy && <p className="px-4 pb-2 text-sm text-gray-500 dark:text-gray-400">Closest matches:</p>}
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
          </div>
        )}

        {miss && (
          <div className="mt-4 rounded-3xl bg-gray-100 dark:bg-gray-900 p-6 text-center">
            <p className="font-semibold text-gray-900 dark:text-gray-50">We don&apos;t have &ldquo;{query.trim()}&rdquo; yet.</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">We&apos;ve noted it. The tests people search for most get built next.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/request-test?src=search&pick=other" className="inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-semibold">
                Tell us about this test
              </Link>
              <Link href="/create" className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-50">
                Make your own quiz now
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* The feed under the box, like Google's Discover: this week's most practised tests near you. */}
      {!showResults && popular.length > 0 && (
        <section className="mx-auto w-full max-w-2xl px-4 pt-10 pb-16">
          <h2 className="px-1 pb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            {flagOf(region)} Popular this week in {regionInfo(region).name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {popular.map(({ test, answered }) => (
              <Link
                key={test.id}
                href={test.dashboardHref}
                data-theme={test.theme}
                className="group block rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="relative h-36 bg-gradient-to-br from-brand-light to-brand-muted dark:from-brand-darker dark:to-brand-dark grid place-items-center">
                  <Image src={getTigerAsset(test.id)} alt="" width={112} height={112} className="w-28 h-28 object-contain group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 right-3 text-2xl leading-none">{flagOf(regionOfTest(test.id))}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-gray-50">{test.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{test.blurb}</p>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    {answered ? `${answered.toLocaleString()} questions answered this week` : `${test.questions} questions`} · {test.org}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm">
            <Link href="/tests" className="text-gray-500 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-gray-50">
              Browse every test
            </Link>
          </p>
        </section>
      )}
    </main>
  );
}
