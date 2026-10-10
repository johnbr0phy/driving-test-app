"use client";

// State choice for exam families with state variants (real estate: General,
// California, New Jersey). Each choice is its own exam with its own progress,
// so switching never touches another state's work. The choice is remembered
// per family in the store (examStates) and never changes the DMV state.

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ExamConfig, examFamilyId, getExamById, getExamVariants } from "@/lib/exams";

export const GENERAL_STATE = "GENERAL";

export function ExamStatePicker({ exam }: { exam: ExamConfig }) {
  const familyId = examFamilyId(exam);
  const variants = getExamVariants(familyId);
  const family = getExamById(familyId);
  const examStates = useStore((state) => state.examStates);
  const setExamState = useStore((state) => state.setExamState);
  if (!family || variants.length === 0) return null;

  const chosen = examStates[familyId];
  const firstVisit = !exam.variantOf && !chosen;
  const options = [
    ...variants.map((v) => ({ code: v.jurisdiction!.code, label: v.jurisdiction!.name, href: `${v.slug}/dashboard` })),
    { code: GENERAL_STATE, label: "Other state", href: `${family.slug}/dashboard` },
  ];
  const current = exam.jurisdiction?.code ?? GENERAL_STATE;
  const names = variants.map((v) => v.jurisdiction!.name).join(" and ");

  return (
    <div className={`rounded-xl border p-4 mb-4 ${firstVisit ? "bg-white border-brand-border-light" : "bg-white border-gray-100"}`}>
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-brand flex-shrink-0" aria-hidden />
        <p className="text-sm font-semibold text-gray-900">
          {firstVisit ? "Which state's exam are you taking?" : "Your state"}
        </p>
      </div>
      <div role="radiogroup" aria-label="Exam state" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = !firstVisit && o.code === current;
          return (
            <Link
              key={o.code}
              href={o.href}
              role="radio"
              aria-checked={selected}
              onClick={() => setExamState(familyId, o.code)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selected
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-gray-700 border-gray-200 hover:border-brand hover:text-brand"
              }`}
            >
              {o.label}
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {exam.jurisdiction
          ? `${exam.questionsPerTest} source-checked questions for ${exam.jurisdiction.name}, including state law. Progress is saved separately for each state.`
          : firstVisit
            ? `${names} have state-specific practice. Other states get the national topics; your state law portion is not covered yet.`
            : `National topics only. Your state law portion is not covered yet. ${names} have state-specific practice.`}
      </p>
    </div>
  );
}
