"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { leaveClass, membershipsForExam, type ClassMembership } from "@/lib/classProgress";

// On an exam dashboard: which instructor class this browser practices for,
// so a student always knows their scores are shared, with a way out.
export function ClassBanner({ examId, className = "" }: { examId: string; className?: string }) {
  const [classes, setClasses] = useState<ClassMembership[]>([]);
  useEffect(() => setClasses(membershipsForExam(examId)), [examId]);
  if (!classes.length) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {classes.map((m) => (
        <div
          key={m.code}
          className="flex items-start gap-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 px-4 py-3 text-sm"
        >
          <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-700 dark:text-blue-300" aria-hidden="true" />
          <p className="flex-1 text-blue-900 dark:text-blue-100">
            Practicing as <strong>{m.name}</strong> in {m.className}. {m.teacherName} sees your scores on this exam.
          </p>
          <button
            type="button"
            className="text-blue-700 dark:text-blue-300 underline flex-shrink-0"
            onClick={() => {
              if (!window.confirm(`Leave ${m.className}? ${m.teacherName} will stop seeing new practice from this device.`)) return;
              leaveClass(m.code);
              setClasses(membershipsForExam(examId));
            }}
          >
            Leave
          </button>
        </div>
      ))}
    </div>
  );
}
