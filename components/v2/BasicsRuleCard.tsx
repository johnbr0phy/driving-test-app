"use client";

import { ReactNode } from "react";
import { BasicsSkill, BasicsTable } from "@/lib/v2/basics";

/** The text side of a Basics skill: the rule card, the ELI5 toggle and the passage and table blocks it reads from. */

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{children}</div>;
}

/** The skill explained like you're five: a picture a kid already knows, plus a tiny example story. */
export function Eli5Card({ skill }: { skill: BasicsSkill }) {
  return (
    <div>
      <SectionLabel>ELI5 · explained like you&apos;re five</SectionLabel>
      <p className="mt-1.5 text-[17px] leading-relaxed text-gray-900 dark:text-gray-50">{skill.another.text}</p>
      <div className="mt-3 whitespace-pre-line border-l-2 border-brand pl-3 text-[17px] leading-relaxed text-gray-800 dark:text-gray-100">{skill.another.example}</div>
    </div>
  );
}

/** "Still confused? ELI5" link that turns into the ELI5 card. */
export function Eli5Toggle({ skill, open, onOpen }: { skill: BasicsSkill; open: boolean; onOpen: () => void }) {
  if (open) return <Eli5Card skill={skill} />;
  return (
    <button type="button" onClick={onOpen} className="self-start text-[15px] font-semibold text-brand-dark">
      Still confused? ELI5
    </button>
  );
}

/** The rule, the trick, the skill's table if any, and the examples. */
export function RuleCard({ skill }: { skill: BasicsSkill }) {
  const marks = { good: "✓", bad: "✗", eg: "→" };
  const markClass = { good: "text-green-600 dark:text-green-300", bad: "text-red-500 dark:text-red-300", eg: "text-brand-dark" };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionLabel>The rule</SectionLabel>
        <p className="mt-1.5 text-xl font-semibold leading-snug text-gray-900 dark:text-gray-50">{skill.rule}</p>
      </div>
      <div>
        <SectionLabel>The trick</SectionLabel>
        <p className="mt-1.5 text-[17px] leading-relaxed text-gray-900 dark:text-gray-50">{skill.trick}</p>
      </div>
      {skill.table && <DataTable table={skill.table} />}
      {skill.passage && <Passage text={skill.passage} />}
      <div>
        <SectionLabel>Examples</SectionLabel>
        <ul className="mt-1 divide-y divide-gray-200 dark:divide-gray-800">
          {skill.examples.map((e, i) => (
            <li key={i} className="flex items-start gap-3 py-2.5">
              <span className={`w-5 shrink-0 text-center text-[17px] font-bold leading-relaxed ${markClass[e.kind]}`}>{marks[e.kind]}</span>
              <div className="min-w-0 text-[17px] leading-relaxed text-gray-900 dark:text-gray-50">
                {e.text}
                {e.note && <div className="text-[15px] leading-snug text-gray-500 dark:text-gray-400">{e.note}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Passage({ text }: { text: string }) {
  return <div className="whitespace-pre-line rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-[16px] leading-relaxed text-gray-800 dark:text-gray-100">{text}</div>;
}

export function DataTable({ table }: { table: BasicsTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[15px] tabular-nums">
        <thead>
          <tr>
            {table.head.map((h) => (
              <th key={h} className="border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 px-2.5 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="border border-gray-200 dark:border-gray-800 px-2.5 py-2">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
