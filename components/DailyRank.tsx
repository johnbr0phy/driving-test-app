"use client";

// React in scope: tests render this file with the classic JSX transform.
import React, { useEffect, useState } from "react";
import { noteStatsSource } from "@/lib/statsViews";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, Clock, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { RANK_NEAR_TOP, RANK_SHOW_TOP_PERCENT_MAX, nextGoal, tigerTimeLeftMs, type RankNext } from "@/lib/dailyRank";
import { flushRank, refreshRank, useDailyRank } from "@/lib/dailyRankClient";

// Daily rank surfaces (lib/dailyRank.ts). They show for everyone, and only
// once the person has 1 correct
// answer today. "Top X%" is left out above the top half: it reads as a
// put-down and gives nothing to aim at.

/** True when the rank chip would show: not hidden with ?rank=off, and 1+ correct today. */
export function useRankChipVisible(): boolean {
  const on = useInRankArm();
  const rank = useDailyRank();
  return on && !!rank && rank.correct >= 1;
}

/**
 * Everyone sees Tiger Time (the A/B test ended Nov 25 2026: on for all).
 * `?rank=off` hides it in this tab, for previewing a page without it, and
 * `?rank=on` shows it again. Read after mount, so the server render and the
 * first client render agree (nothing shown).
 */
const RANK_OFF_KEY = "tigertest-rank-off";

function useInRankArm(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let off = false;
    try {
      const pin = new URLSearchParams(window.location.search).get("rank");
      if (pin === "off") sessionStorage.setItem(RANK_OFF_KEY, "1");
      if (pin === "on") sessionStorage.removeItem(RANK_OFF_KEY);
      off = sessionStorage.getItem(RANK_OFF_KEY) === "1";
    } catch {
      // Storage blocked: shown.
    }
    setOn(!off);
  }, []);
  return on;
}

function fill(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{\{(\w+)\}\}/g, (_, k: string) => String(vars[k] ?? ""));
}

/** "2nd" in English (a real ordinal), the language's own form elsewhere ("Platz 2"). */
function enOrdinal(n: number): string {
  const suffix: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };
  return `${n.toLocaleString("en-US")}${suffix[new Intl.PluralRules("en-US", { type: "ordinal" }).select(n)]}`;
}

function placeText(t: (k: string) => string, language: string, key: "dailyRank.placeShort" | "dailyRank.placeOfAll", n: number): string {
  return fill(t(key), { place: language === "en" ? enOrdinal(n) : new Intl.NumberFormat(language).format(n), n: new Intl.NumberFormat(language).format(n) });
}

function showPercent(p: number | null): p is number {
  return p !== null && p <= RANK_SHOW_TOP_PERCENT_MAX;
}

/** Path segments where a runner starts: everything before one is the test's base. */
const RUNNER_SEGMENTS = new Set(["test", "practice", "drill", "training"]);

/**
 * Where the chip links: the stats page of the test on screen, whose top
 * explains the rank (DailyRankPanel). Runner paths are <base>/test/<n>,
 * <base>/practice/<n>, <base>/drill (bases can be nested, /real-estate/ca),
 * and the stats page is <base>/stats; the DMV's base is empty (/stats).
 * Quizzes (/q/...) have no stats page, so they show no chip.
 */
export function rankStatsHref(pathname: string | null): string | null {
  const parts = (pathname || "").split("/").filter(Boolean);
  if (!parts.length || parts[0] === "q" || parts[0] === "quiz" || parts[0] === "c") return null;
  const at = parts.findIndex((p) => RUNNER_SEGMENTS.has(p));
  if (at < 0) return null;
  return `/${[...parts.slice(0, at), "stats"].join("/")}`;
}

/**
 * Where "Back" and "Continue practicing" on a stats page go. The chip in a
 * runner adds ?from=<runner path>, so both return to the question the person
 * left. Only a runner of this same stats page counts (no open redirects);
 * otherwise the fallback (the dashboard).
 */
export function rankReturnHref(from: string | null, statsPath: string | null, fallback: string): string {
  if (!from || !from.startsWith("/") || from.startsWith("//") || from.includes("\\")) return fallback;
  if (!statsPath || rankStatsHref(from) !== statsPath) return fallback;
  return from;
}

/** rankReturnHref for the stats page on screen. Needs a Suspense boundary (useSearchParams). */
export function useRankReturnHref(fallback: string): string {
  const pathname = usePathname();
  const from = useSearchParams()?.get("from") ?? null;
  return rankReturnHref(from, pathname, fallback);
}

const CHIP_CLASS =
  "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-brand-border-light bg-brand-light px-2 py-1 text-xs font-semibold text-brand-dark sm:px-2.5";

/**
 * The small chip in the in-test bar (components/FocusBar.tsx). Updates after
 * every answer and links to the stats page, where the rank is explained.
 * Guests land on sign-up from there (stats pages need an account), and their
 * count carries over when they sign in.
 */
export function DailyRankChip({ href: hrefOverride, compact = false }: {
  /** Where the chip links. Omitted: worked out from the runner path. null: no chip (nothing to open). */
  href?: string | null;
  /** Phones show only the count (the site header, which is fuller than the test bar). */
  compact?: boolean;
} = {}) {
  const on = useInRankArm();
  const rank = useDailyRank();
  const pathname = usePathname();
  const { t, language } = useTranslation();
  useEffect(() => {
    if (on) void refreshRank();
  }, [on]);
  if (!on || !rank || rank.correct < 1) return null;
  const nf = new Intl.NumberFormat(language);
  const count = rank.correct === 1 ? t("dailyRank.chipOne") : fill(t("dailyRank.chip"), { n: nf.format(rank.correct) });
  // In the top 100 the place ("2nd"), below it the percent ("Top 6%").
  const pct = rank.place
    ? placeText(t, language, "dailyRank.placeShort", rank.place)
    : showPercent(rank.topPercent)
      ? fill(t("dailyRank.chipTop"), { p: rank.topPercent })
      : null;
  // The count is always there, so the chip moves with every right answer:
  // phones "42 · Top 6%" (under 360px just "42"), sm+ "42 correct · Top 6%".
  // The chip takes the right slot's place in training and drills, so there
  // is room for both. Each part pops when it changes.
  const dot = (
    <span aria-hidden className="mr-1 opacity-50">
      ·
    </span>
  );
  const body = (
    <>
      <Trophy className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span key={`c${rank.correct}`} className="tabular-nums motion-safe:animate-[rank-pop_300ms_ease-out]">
        <span className="sm:hidden" aria-hidden>
          {compact && rank.correct >= 1000
            ? new Intl.NumberFormat(language, { notation: "compact", maximumFractionDigits: 1 }).format(rank.correct)
            : nf.format(rank.correct)}
        </span>
        <span className="hidden sm:inline">{count}</span>
      </span>
      {pct && (
        <span
          key={`p${rank.place ?? rank.topPercent}`}
          className={`hidden tabular-nums motion-safe:animate-[rank-pop_300ms_ease-out] ${compact ? "sm:inline" : "min-[360px]:inline"}`}
        >
          {dot}
          {pct}
        </span>
      )}
    </>
  );
  const href = hrefOverride === undefined ? rankStatsHref(pathname) : hrefOverride;
  // No stats page to open (quizzes, signed-out visitors on some pages): no chip.
  if (!href) return null;
  return (
    <Link
      data-daily-rank-chip
      // From a runner, the stats page's Back returns to this question (rankReturnHref).
      href={`${href}${hrefOverride === undefined && pathname ? `?from=${encodeURIComponent(pathname)}` : ""}#today-rank`}
      onClick={() => noteStatsSource(hrefOverride === undefined ? "bar_chip" : "header_chip")}
      title={t("dailyRank.chipLink")}
      aria-label={`${t("dailyRank.chipLink")}: ${count}${pct ? `, ${pct}` : ""}`}
      className={`${CHIP_CLASS} hover:border-brand-border`}
    >
      {body}
    </Link>
  );
}

/**
 * The rank card at the end of every session (results, finished sets): the
 * same design as the stats page panel, without "Continue practicing" (the
 * results page has its own buttons) and, for guests, with "Sign in to keep
 * your rank and win Tiger Time".
 */
export function DailyRankCard({ className = "" }: { className?: string }) {
  return <DailyRankPanel className={className} guestSignIn anchor={false} />;
}

/** "1 hr 38 min" left in today's Tiger Time, refreshed every 15 seconds. */
function useTigerTimeLeft(language: string): string | null {
  const [left, setLeft] = useState<string | null>(null);
  useEffect(() => {
    const unit = (u: "hour" | "minute", n: number) => new Intl.NumberFormat(language, { style: "unit", unit: u, unitDisplay: "short" }).format(n);
    const tick = () => {
      const mins = Math.max(1, Math.ceil(tigerTimeLeftMs() / 60_000));
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      setLeft(h ? (m ? `${unit("hour", h)} ${unit("minute", m)}` : unit("hour", h)) : unit("minute", m));
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [language]);
  return left;
}

/**
 * Top of every stats page (DMV, v1 and v2 exams): Tiger Time. Today's score
 * and percent (and a "Right now: 1st place" box in first place), a button back to practice and the rules behind "How it works".
 * No head counts and nobody else's name or position.
 */
export function DailyRankPanel({
  continueHref,
  guestSignIn = false,
  anchor = true,
  className = "",
}: {
  continueHref?: string;
  /** Guests get "Sign in to keep your rank and win Tiger Time" (the end-of-session card). */
  guestSignIn?: boolean;
  /** The stats page's #today-rank target (the chip links there); off on results. */
  anchor?: boolean;
  className?: string;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const on = useInRankArm();
  const rank = useDailyRank();
  const { t, language } = useTranslation();
  const left = useTigerTimeLeft(language);
  const [rules, setRules] = useState(false);
  useEffect(() => {
    if (on) void flushRank().then(() => refreshRank(true));
  }, [on]);
  if (!on || !rank || rank.correct < 1) return null;
  const nf = new Intl.NumberFormat(language);
  const pct = rank.place
    ? placeText(t, language, "dailyRank.placeShort", rank.place)
    : showPercent(rank.topPercent)
      ? fill(t("dailyRank.chipTop"), { p: rank.topPercent })
      : null;
  const goal = nextGoal(rank.cutoffs, rank.correct, rank.next, rank.place, rank.placeGoal, rank.enterTop);
  // Only first place gets a box ("Right now: 1st place"); the "Next goal"
  // box for everyone else was dropped (John, Nov 25 2026).
  const firstPlace = goal?.kind === "first" || goal?.kind === "tiedFirst";
  const goalBody = goal?.kind === "tiedFirst" ? t("dailyRank.firstPlaceTied") : t("dailyRank.firstPlaceHold");
  const eyebrow = "text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400";
  return (
    <section
      id={anchor ? "today-rank" : undefined}
      data-daily-rank-panel
      aria-label={t("dailyRank.label")}
      className={`mb-4 scroll-mt-20 overflow-hidden rounded-3xl border border-brand-border-light bg-white shadow-sm dark:bg-gray-900 ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-brand-border-light bg-brand-light px-4 py-4 sm:px-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
          <Trophy className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-50">{t("dailyRank.label")}</h2>
          <p className="truncate text-sm text-gray-600 dark:text-gray-300">{t("dailyRank.dailyChallenge")}</p>
        </div>
        {left && (
          <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-brand-border-light bg-white px-2.5 py-1 text-xs font-semibold text-brand-dark sm:gap-1.5 sm:px-3 sm:text-sm dark:bg-gray-900">
            <Clock className="h-4 w-4" aria-hidden />
            {fill(t("dailyRank.timeLeft"), { time: left })}
          </span>
        )}
      </div>
      <div className="px-4 py-5 sm:px-6">
        <p className={eyebrow}>{t("dailyRank.scoreToday")}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <p className="flex items-baseline gap-2 text-gray-900 dark:text-gray-50">
            <span className="text-5xl font-black leading-none tracking-tight tabular-nums">{nf.format(rank.correct)}</span>
            <span className="text-xl font-bold">{t("dailyRank.correctWord")}</span>
          </p>
          {pct && <span className="mb-1 shrink-0 rounded-full bg-brand-light px-3 py-1 text-base font-bold text-brand-dark">{pct}</span>}
        </div>
        {rank.place && (
          <div>
            <p className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-50">{placeText(t, language, "dailyRank.placeOfAll", rank.place)}</p>
            {/* A nudge under any place but first (first place has its own box). */}
            {rank.place > 1 && (
              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                {t(rank.place <= RANK_NEAR_TOP ? "dailyRank.encourageTop" : "dailyRank.encourage")}
              </p>
            )}
          </div>
        )}
        {firstPlace && (
          <div className="mt-5 rounded-2xl border border-brand-border-light bg-brand-light px-4 py-3">
            <p className={eyebrow}>{t("dailyRank.rightNow")}</p>
            <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-50">{t("dailyRank.firstPlace")}</p>
            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{goalBody}</p>
          </div>
        )}
        {guestSignIn && !user && (
          <Link
            href={`/signup?redirect=${encodeURIComponent(pathname || "/")}`}
            className="mt-5 flex items-center justify-center rounded-2xl bg-black px-4 py-3.5 text-center text-base font-bold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {t("dailyRank.signIn")}
          </Link>
        )}
        {continueHref && (
          <Link
            href={continueHref}
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3.5 text-base font-bold text-brand-foreground hover:bg-brand-hover"
          >
            {t("dailyRank.continue")}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        )}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setRules((v) => !v)}
            aria-expanded={rules}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
          >
            {t("dailyRank.howItWorksLink")}
          </button>
          {rules && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t("dailyRank.prize")} {t("dailyRank.howItWorks")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

