"use client";

import { useEffect, useState } from "react";
import { noteStatsSource } from "@/lib/statsViews";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Clock, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { RANK_SHOW_TOP_PERCENT_MAX, nextGoal, tigerTimeLeftMs, type RankNext } from "@/lib/dailyRank";
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
  return `${n}${suffix[new Intl.PluralRules("en-US", { type: "ordinal" }).select(n)]}`;
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
 * Quizzes (/q/...) have no stats page, so their chip stays a label.
 */
export function rankStatsHref(pathname: string | null): string | null {
  const parts = (pathname || "").split("/").filter(Boolean);
  if (!parts.length || parts[0] === "q" || parts[0] === "quiz" || parts[0] === "c") return null;
  const at = parts.findIndex((p) => RUNNER_SEGMENTS.has(p));
  if (at < 0) return null;
  return `/${[...parts.slice(0, at), "stats"].join("/")}`;
}

const CHIP_CLASS =
  "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200 sm:px-2.5";

/**
 * The small chip in the in-test bar (components/FocusBar.tsx). Updates after
 * every answer and links to the stats page, where the rank is explained.
 * Guests land on sign-up from there (stats pages need an account), and their
 * count carries over when they sign in.
 */
export function DailyRankChip({ href: hrefOverride, compact = false }: {
  /** Where the chip links. Omitted: worked out from the runner path. null: a plain chip. */
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
    <span aria-hidden className="mr-1 text-amber-400 dark:text-amber-600">
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
  if (!href) {
    return (
      <span data-daily-rank-chip title={t("dailyRank.label")} aria-label={`${count}${pct ? `, ${pct}` : ""}`} className={CHIP_CLASS}>
        {body}
      </span>
    );
  }
  return (
    <Link
      data-daily-rank-chip
      href={`${href}#today-rank`}
      onClick={() => noteStatsSource("bar_chip")}
      title={t("dailyRank.chipLink")}
      aria-label={`${t("dailyRank.chipLink")}: ${count}${pct ? `, ${pct}` : ""}`}
      className={`${CHIP_CLASS} hover:border-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900`}
    >
      {body}
    </Link>
  );
}

function nextLine(next: RankNext | null, t: (k: string) => string, nf: Intl.NumberFormat): string | null {
  if (!next) return null;
  if (next.kind === "top") return t("dailyRank.leading");
  const people = nf.format(next.people);
  if (next.kind === "block") {
    return next.need === 1 ? fill(t("dailyRank.nextBlockOne"), { people }) : fill(t("dailyRank.nextBlock"), { need: nf.format(next.need), people });
  }
  return next.need === 1 ? t("dailyRank.nextEveryoneOne") : fill(t("dailyRank.nextEveryone"), { need: nf.format(next.need) });
}

/**
 * The rank card at the end of every session: "41 correct today. Top 14%."
 * plus the "N more" line, and for guests a link to sign in and keep it.
 */
export function DailyRankCard({ className = "" }: { className?: string }) {
  const on = useInRankArm();
  const rank = useDailyRank();
  const { user } = useAuth();
  const pathname = usePathname();
  const { t, language } = useTranslation();
  useEffect(() => {
    if (!on) return;
    // Send the session's last answers now, then read the fresh rank.
    void flushRank().then(() => refreshRank(true));
  }, [on]);
  if (!on || !rank || rank.correct < 1) return null;
  const nf = new Intl.NumberFormat(language);
  const headline = rank.correct === 1 ? t("dailyRank.correctTodayOne") : fill(t("dailyRank.correctToday"), { n: nf.format(rank.correct) });
  const pct = showPercent(rank.topPercent) ? fill(t("dailyRank.topPercent"), { p: rank.topPercent }) : null;
  const more = nextLine(rank.next, t, nf);
  return (
    <section
      data-daily-rank-card
      aria-label={t("dailyRank.label")}
      className={`rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-800 dark:bg-amber-950 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white dark:bg-amber-500">
          <Trophy className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">{t("dailyRank.label")}</p>
          <p className="mt-0.5 text-lg font-bold leading-snug text-gray-900 dark:text-gray-50">
            {headline}
            {pct && <> {pct}</>}
          </p>
          {more && <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{more}</p>}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t("dailyRank.howItWorks")}</p>
        </div>
      </div>
      {!user && (
        <Link
          href={`/signup?redirect=${encodeURIComponent(pathname || "/")}`}
          className="mt-3 block rounded-full bg-black px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {t("dailyRank.signIn")}
        </Link>
      )}
    </section>
  );
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
 * and percent, the next goal (the closest percentile step up, or first
 * place), a button back to practice and the rules behind "How it works".
 * No head counts and nobody else's name or position.
 */
export function DailyRankPanel({ continueHref, className = "" }: { continueHref?: string; className?: string }) {
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
  const reach = (need: number) =>
    need === 1 ? t("dailyRank.goalPlaceOne") : fill(t("dailyRank.goalPlace"), { need: nf.format(need) });
  let goalTitle: string | null = null;
  let goalBody: string | null = null;
  if (goal?.kind === "tier") {
    goalTitle = fill(t("dailyRank.chipTop"), { p: goal.p });
    goalBody = fill(t(goal.need === 1 ? "dailyRank.goalCutoffOne" : "dailyRank.goalCutoff"), { need: nf.format(goal.need), cutoff: nf.format(goal.cutoff) });
  } else if (goal?.kind === "place") {
    goalTitle = placeText(t, language, "dailyRank.placeShort", goal.place);
    goalBody = reach(goal.need);
  } else if (goal?.kind === "top100") {
    goalTitle = t("dailyRank.top100");
    goalBody = reach(goal.need);
  } else if (goal?.kind === "tiedFirst") {
    goalTitle = t("dailyRank.firstPlace");
    goalBody = t("dailyRank.firstPlaceTied");
  } else if (goal?.kind === "first") {
    goalTitle = t("dailyRank.firstPlace");
    goalBody = t("dailyRank.firstPlaceHold");
  } else if (goal?.kind === "chase") {
    goalTitle = t("dailyRank.firstPlace");
    goalBody = goal.need === 1 ? t("dailyRank.nextEveryoneOne") : fill(t("dailyRank.nextEveryone"), { need: nf.format(goal.need) });
  }
  const eyebrow = "text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400";
  return (
    <section
      id="today-rank"
      data-daily-rank-panel
      aria-label={t("dailyRank.label")}
      className={`mb-4 scroll-mt-20 overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm dark:border-amber-900 dark:bg-gray-900 ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-amber-100 bg-amber-50 px-4 py-4 dark:border-amber-900 dark:bg-amber-950 sm:px-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-gray-900">
          <Trophy className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-50">{t("dailyRank.label")}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t("dailyRank.dailyChallenge")}</p>
        </div>
        {left && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-200 bg-white px-3 py-1 text-sm font-semibold text-amber-900 dark:border-amber-800 dark:bg-gray-900 dark:text-amber-200">
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
          {pct && <span className="mb-1 shrink-0 rounded-full bg-amber-100 px-3 py-1 text-base font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-100">{pct}</span>}
        </div>
        {rank.place && (
          <p className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-50">{placeText(t, language, "dailyRank.placeOfAll", rank.place)}</p>
        )}
        {goalTitle && (
          <div
            className={`mt-5 rounded-2xl border px-4 py-3 ${
              goal?.kind === "first" || goal?.kind === "tiedFirst"
                ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
                : "border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/60"
            }`}
          >
            {/* In first place there is no next goal: say where they are. */}
            <p className={eyebrow}>{t(goal?.kind === "first" || goal?.kind === "tiedFirst" ? "dailyRank.rightNow" : "dailyRank.nextGoal")}</p>
            <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-50">{goalTitle}</p>
            {goalBody && <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{goalBody}</p>}
          </div>
        )}
        {continueHref && (
          <Link
            href={continueHref}
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-3.5 text-base font-bold text-gray-900 hover:bg-amber-300"
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

