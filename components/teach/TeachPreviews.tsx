// Live mockups for the /teach landing: a phone showing the student join card
// and a browser window showing a class page. Sample data, real styling, so
// they stay in step with the product and work in dark mode.

import { Users } from "lucide-react";
import { scoreBar, scoreChip, scoreLevel, scoreTrack } from "./scoreColors";

export function PhonePreview() {
  return (
    <div className="w-[260px] h-[520px] rounded-[2.25rem] border-[5px] border-gray-900 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 shadow-2xl overflow-hidden flex flex-col text-left" aria-hidden="true">
      <div className="relative h-8 shrink-0 flex items-center justify-between px-6 text-[11px] font-semibold text-gray-900 dark:text-gray-50">
        <span>9:41</span>
        <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-5 w-20 rounded-full bg-gray-900 dark:bg-gray-700" />
        <span className="flex items-end gap-0.5">
          <span className="w-0.5 h-1.5 rounded-sm bg-current" />
          <span className="w-0.5 h-2 rounded-sm bg-current" />
          <span className="w-0.5 h-2.5 rounded-sm bg-current" />
          <span className="ml-1 w-5 h-2.5 rounded-[3px] border border-current" />
        </span>
      </div>
      <div className="shrink-0 mx-3 mt-1 mb-3 h-7 rounded-full bg-gray-200/70 dark:bg-gray-800 text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-center">
        tigertest.io/c/K7QF2
      </div>
      <div className="px-3">
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 mb-2">
            <Users className="w-3.5 h-3.5" /> Lakeview CC · Ms. Rivera
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-50 leading-tight">Join your class</p>
          <p className="text-[13px] text-gray-600 dark:text-gray-300 mt-1 mb-4">Surgical Tech, Fall: CST practice</p>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1.5">Your name, as your instructor knows it</p>
          <div className="h-10 rounded-lg border-2 border-brand-border-light px-3 flex items-center text-sm text-gray-900 dark:text-gray-50">
            Phoebe B.<span className="ml-0.5 w-px h-4 bg-gray-900 dark:bg-gray-50 animate-pulse" />
          </div>
          <div className="mt-3 h-10 rounded-lg bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-medium flex items-center justify-center">
            Start practicing
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 leading-snug">
            Ms. Rivera will see your practice scores on this exam. No account needed.
          </p>
        </div>
      </div>
      <div className="mt-auto mb-2 mx-auto h-1 w-24 rounded-full bg-gray-900/80 dark:bg-gray-500" />
    </div>
  );
}

const TOPICS = [
  { label: "Sterilization", pct: 51 },
  { label: "Pharmacology", pct: 58 },
  { label: "Microbiology", pct: 66 },
  { label: "Intraoperative", pct: 79 },
];

const STUDENTS = [
  { name: "Phoebe B.", when: "Today", answered: 412, acc: 81, test: "Test 2 · 84%", pass: true },
  { name: "Maya B.", when: "Yesterday", answered: 288, acc: 69, test: "Test 1 · 66%", pass: false },
  { name: "Barney B.", when: "3 days ago", answered: 150, acc: 74, test: "Test 1 · 72%", pass: true },
];

export function BrowserPreview() {
  return (
    <div className="w-full max-w-[640px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden text-left" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-3 h-9 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span className="ml-3 flex-1 h-6 rounded-md bg-white dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400 flex items-center px-2 truncate">
          tigertest.io/teach/classes/K7QF2
        </span>
      </div>
      <div className="p-4 sm:p-5 bg-gray-50 dark:bg-gray-950 space-y-3">
        <div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-50">Surgical Tech, Fall</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">CST · 18 students</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[["Active this week", "14 of 18"], ["Answered", "3,912"], ["Accuracy", "72%"], ["Passed a test", "9 of 18"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2.5 py-2">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{k}</p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-50">{v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3">
          <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-50 mb-2">Where your class struggles</p>
          <div className="space-y-1.5">
            {TOPICS.map((t) => (
              <div key={t.label} className="grid grid-cols-[6.5rem_1fr_2.25rem] items-center gap-2 text-xs text-gray-700 dark:text-gray-200">
                <span className="truncate">{t.label}</span>
                <div className={`h-2 rounded-sm ${scoreTrack}`}>
                  <div className={`h-2 rounded-sm ${scoreBar(scoreLevel(t.pct, 70))}`} style={{ width: `${t.pct}%` }} />
                </div>
                <span className="text-right tabular-nums">{t.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3">
          <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-50 mb-1.5">Students</p>
          {STUDENTS.map((s) => (
            <div key={s.name} className="grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[5.5rem_5.5rem_1fr_auto] items-center gap-2 py-1.5 border-t border-gray-100 dark:border-gray-800 first:border-0 text-xs text-gray-800 dark:text-gray-100">
              <span>{s.name}</span>
              <span className="hidden sm:block text-gray-500 dark:text-gray-400">{s.when}</span>
              <span className="tabular-nums whitespace-nowrap">{s.answered} · {s.acc}%</span>
              <span className={`whitespace-nowrap rounded-sm px-1.5 py-0.5 font-medium ${scoreChip(s.pass ? "good" : "near")}`}>{s.test}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
