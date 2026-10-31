"use client";

// The pieces every stats page is built from, so the DMV-style registry exam
// stats (components/exam/ExamStatsPage) and the v2 stats (components/v2/StatsV2)
// look and gate the same way: page shell, Your Stats / Common Mistakes tabs,
// header card, summary tiles, sort chips, the free rows and the blurred
// Premium lock over the rest. Data stays with each page (the two engines
// keep progress in different stores); only the look and the gate are shared.

import Link from "next/link";
import { ArrowLeft, BarChart3, Lock, Users } from "lucide-react";
import type { ReactNode } from "react";

/** Rows shown before the Premium lock: 5 on wider screens, 2 on phones. */
export const STATS_FREE_ROWS = 5;
export const STATS_FREE_ROWS_MOBILE = 2;

export type StatsTab = "yours" | "community";

export function StatsPageShell({ backHref, backLabel, children }: { backHref: string; backLabel: string; children: ReactNode }) {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-6 max-w-3xl">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}

export function StatsTabs({ active, onChange, yoursLabel, communityLabel }: {
  active: StatsTab;
  onChange: (tab: StatsTab) => void;
  yoursLabel: string;
  communityLabel: string;
}) {
  return (
    <div className="flex gap-1.5 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1.5 shadow-sm">
      {([
        { tab: "yours" as const, icon: BarChart3, label: yoursLabel },
        { tab: "community" as const, icon: Users, label: communityLabel },
      ]).map(({ tab, icon: Icon, label }) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          aria-pressed={active === tab}
          className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all ${
            active === tab
              ? "bg-brand text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

export function StatsHeaderCard({ title, subtitle, className = "mb-6" }: { title: string; subtitle: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 ${className}`}>
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{title}</h1>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

export function StatsTile({ value, label, good = false }: { value: string; label: string; good?: boolean }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-3 text-center">
      <div className={`text-xl font-black tabular-nums ${good ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>{value}</div>
      <div className="text-[10px] leading-tight text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

export function StatsSortBar<F extends string>({ fields, sortField, sortDirection, onSort, count }: {
  fields: { field: F; label: string }[];
  sortField: F;
  sortDirection: "asc" | "desc";
  onSort: (field: F) => void;
  /** Right-aligned count, e.g. "200 questions". */
  count: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
      {fields.map(({ field, label }) => (
        <button
          key={field}
          onClick={() => onSort(field)}
          className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full border transition-colors ${
            sortField === field
              ? "bg-brand-light border-brand-border text-brand-dark font-medium"
              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300"
          }`}
        >
          {label}
          {sortField === field && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
        </button>
      ))}
      <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{count}</span>
    </div>
  );
}

export interface StatsChip {
  value: string;
  label: string;
  color: string;
}

/** The free rows, then (when locked and there are more) the blurred preview with the unlock button. */
export function GatedStatsList<T>({ items, isPremium, keyOf, renderRow, previewOf, lockTitle, lockSubtitle, lockCta, onUnlock }: {
  items: T[];
  isPremium: boolean;
  keyOf: (item: T) => string;
  renderRow: (item: T) => ReactNode;
  previewOf: (item: T) => { chip: StatsChip; text: string };
  lockTitle: string;
  lockSubtitle: string;
  lockCta: string;
  onUnlock: () => void;
}) {
  return (
    <div className="space-y-2">
      {isPremium
        ? items.map((item) => <div key={keyOf(item)}>{renderRow(item)}</div>)
        : items.slice(0, STATS_FREE_ROWS).map((item, idx) => (
            <div key={keyOf(item)} className={idx >= STATS_FREE_ROWS_MOBILE ? "hidden md:block" : undefined}>
              {renderRow(item)}
            </div>
          ))}

      {!isPremium && items.length > STATS_FREE_ROWS && (
        <LockedPreview
          rows={items.slice(STATS_FREE_ROWS, STATS_FREE_ROWS + 4).map((item) => ({ key: keyOf(item), ...previewOf(item) }))}
          title={lockTitle}
          subtitle={lockSubtitle}
          cta={lockCta}
          onUnlock={onUnlock}
        />
      )}
    </div>
  );
}

/** Faded, blurred copies of the next rows with the unlock card on top. */
export function LockedPreview({ rows, title, subtitle, cta, onUnlock }: {
  rows: { key: string; chip: StatsChip; text: string }[];
  title: string;
  subtitle: string;
  cta: string;
  onUnlock: () => void;
}) {
  return (
    <div className="relative">
      <div
        className="space-y-2 overflow-hidden h-60 blur-[2px] opacity-40 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      >
        {rows.map(({ key, chip, text }) => (
          <div
            key={key}
            className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-4"
          >
            <div className="shrink-0 text-center min-w-[3rem]">
              <div className={`text-base font-bold tabular-nums leading-none ${chip.color}`}>{chip.value}</div>
              <div className="text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-0.5">{chip.label}</div>
            </div>
            <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 dark:text-gray-50 line-clamp-2">{text}</p>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-4 flex flex-col items-center shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-light mb-2">
            <Lock className="h-4 w-4 text-brand-dark" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-1">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2.5">{subtitle}</p>
          <button
            onClick={onUnlock}
            className="inline-flex items-center px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors shadow-lg"
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Green at 100, yellow from 50, red below: the per-question accuracy chip. */
export function accuracyChipColor(accuracy: number): string {
  return accuracy === 100 ? "text-green-600 dark:text-green-400" : accuracy >= 50 ? "text-yellow-600 dark:text-yellow-400" : "text-red-500 dark:text-red-400";
}
