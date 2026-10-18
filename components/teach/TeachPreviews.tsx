// Live mockups for the /teach landing: a phone showing the student join card
// and a browser window showing a class page. Sample data, real styling, so
// they stay in step with the product and work in dark mode.

import { Users } from "lucide-react";

export function PhonePreview() {
  return (
    <div className="w-[230px] md:w-[250px] rounded-[2rem] border-[6px] border-gray-900 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 shadow-2xl overflow-hidden" aria-hidden="true">
      <div className="h-6 flex items-center justify-center">
        <div className="h-1.5 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>
      <div className="px-3 pb-5 pt-2">
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 text-left">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 mb-1">
            <Users className="w-3 h-3" /> East Central CC · Ms. Shirley
          </div>
          <p className="text-base font-bold text-gray-900 dark:text-gray-50 leading-tight">Join your class</p>
          <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 mb-3">Surgical Tech, Fall: CST practice</p>
          <p className="text-[10px] text-gray-700 dark:text-gray-200 mb-1">Your name, as your instructor knows it</p>
          <div className="h-8 rounded-md border border-gray-300 dark:border-gray-700 px-2 flex items-center text-xs text-gray-900 dark:text-gray-50">
            Phoebe B.<span className="ml-0.5 w-px h-3.5 bg-gray-900 dark:bg-gray-50 animate-pulse" />
          </div>
          <div className="mt-3 h-8 rounded-md bg-black dark:bg-white text-white dark:text-gray-900 text-xs font-medium flex items-center justify-center">
            Start practicing
          </div>
          <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-2 leading-snug">
            Ms. Shirley will see your practice scores on this exam. Free, no account needed.
          </p>
        </div>
      </div>
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
  { name: "Devon W.", when: "Yesterday", answered: 288, acc: 69, test: "Test 1 · 66%", pass: false },
  { name: "Ashley T.", when: "3 days ago", answered: 150, acc: 74, test: "Test 1 · 72%", pass: true },
];

function barColor(p: number) {
  return p >= 70 ? "bg-green-500" : p >= 55 ? "bg-amber-500" : "bg-red-500";
}

export function BrowserPreview() {
  return (
    <div className="w-[330px] sm:w-[440px] md:w-[540px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden text-left" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-3 flex-1 h-5 rounded bg-white dark:bg-gray-900 text-[10px] text-gray-500 dark:text-gray-400 flex items-center px-2 truncate">
          tigertest.io/teach/classes/K7QF2
        </span>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-950 space-y-3">
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-50">Surgical Tech, Fall</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">CST · 18 students</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[["Active this week", "14 of 18"], ["Answered", "3,912"], ["Accuracy", "72%"], ["Passed a test", "9 of 18"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-1.5">
              <p className="text-[9px] text-gray-500 dark:text-gray-400 truncate">{k}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-50">{v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3">
          <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-50 mb-2">Where your class struggles</p>
          <div className="space-y-1.5">
            {TOPICS.map((t) => (
              <div key={t.label} className="grid grid-cols-[6rem_1fr_2rem] items-center gap-2 text-[10px] text-gray-700 dark:text-gray-200">
                <span className="truncate">{t.label}</span>
                <div className="h-1.5 rounded bg-gray-100 dark:bg-gray-800">
                  <div className={`h-1.5 rounded ${barColor(t.pct)}`} style={{ width: `${t.pct}%` }} />
                </div>
                <span className="text-right tabular-nums">{t.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3">
          <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-50 mb-1.5">Students</p>
          {STUDENTS.map((s) => (
            <div key={s.name} className="grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[5rem_4.5rem_1fr_auto] items-center gap-2 py-1 border-t border-gray-100 dark:border-gray-800 first:border-0 text-[10px] text-gray-800 dark:text-gray-100">
              <span>{s.name}</span>
              <span className="hidden sm:block text-gray-500 dark:text-gray-400">{s.when}</span>
              <span className="tabular-nums whitespace-nowrap">{s.answered} · {s.acc}%</span>
              <span className={`whitespace-nowrap rounded px-1.5 py-0.5 ${s.pass ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}>{s.test}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
