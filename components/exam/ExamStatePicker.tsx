"use client";

// State choice for exam families with state variants (real estate: California,
// Texas, Florida, New York and New Jersey have their own exams; every other state uses the national
// bank). Same "I'm taking the exam in [State]" dropdown as DMV onboarding, but
// per exam family and never destructive: each state variant keeps its own
// progress, and the choice (examStates[familyId]) never touches the DMV state.
// Until a state is chosen the dashboard shows a prompt card; after that the
// state is one line in the hero with a Change control.

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";
import { ExamConfig, examFamilyId, getExamById, getExamVariant, getExamVariants } from "@/lib/exams";

function useExamStateChoice(exam: ExamConfig) {
  const router = useRouter();
  const familyId = examFamilyId(exam);
  const family = getExamById(familyId);
  const chosen = useStore((state) => state.examStates[familyId]);
  const setExamState = useStore((state) => state.setExamState);
  // On a variant page the page itself is the state; elsewhere the saved choice.
  const code = exam.jurisdiction?.code ?? chosen;
  const choose = (next: string) => {
    setExamState(familyId, next);
    const target = getExamVariant(familyId, next) ?? family;
    if (target && target.id !== exam.id) router.push(`${target.slug}/dashboard`);
  };
  return { familyId, family, chosen, code, choose };
}

function StateSelect({ value, onChange, className, placeholder, label }: {
  value: string | undefined;
  onChange: (code: string) => void;
  className: string;
  placeholder: string;
  /** Fixed trigger text (e.g. "Change") instead of the selected state's name. */
  label?: string;
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger aria-label="Exam state" className={className}>
        {label ?? <SelectValue placeholder={placeholder} />}
      </SelectTrigger>
      <SelectContent>
        {states.map((s) => (
          <SelectItem key={s.code} value={s.code}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** First-visit card on a family dashboard; renders nothing once a state is chosen. */
export function ExamStatePrompt({ exam }: { exam: ExamConfig }) {
  const hydrated = useHydration();
  const { familyId, chosen, choose } = useExamStateChoice(exam);
  const variants = getExamVariants(familyId);
  if (!hydrated || variants.length === 0 || exam.variantOf || chosen) return null;
  const names = variants.map((v) => v.jurisdiction!.name).join(" and ");

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-brand-border-light p-4 mb-4">
      <div className="flex flex-wrap items-center gap-x-1.5 text-lg font-medium text-gray-800 dark:text-gray-100">
        <span>I&apos;m taking the exam in</span>
        <StateSelect
          value={undefined}
          onChange={choose}
          placeholder="choose a state"
          className="w-auto inline-flex text-lg font-semibold text-brand-dark border-none shadow-none focus:ring-0 focus:ring-offset-0 px-1 underline decoration-brand-border decoration-2 underline-offset-4 hover:decoration-brand h-auto"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {names} have state-specific practice. Other states get the national topics.
      </p>
    </div>
  );
}

/** One line in the dashboard hero: the chosen state, its coverage and a Change control. */
export function ExamStateLine({ exam }: { exam: ExamConfig }) {
  const hydrated = useHydration();
  const { familyId, code, choose } = useExamStateChoice(exam);
  if (!hydrated || getExamVariants(familyId).length === 0 || !code) return null;
  const name = states.find((s) => s.code === code)?.name;
  if (!name) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 text-xs">
      <span className="text-gray-500 dark:text-gray-400 min-w-0">
        <span className="font-semibold text-gray-800 dark:text-gray-100">{name}</span>
        {exam.jurisdiction
          ? ` · ${exam.questionsPerTest} questions including ${name} law`
          : ` · national topics only, ${name} law not covered yet`}
      </span>
      <StateSelect
        value={code}
        onChange={choose}
        placeholder="Change"
        label="Change"
        className="w-auto h-auto p-0 border-none shadow-none focus:ring-0 focus:ring-offset-0 text-brand-dark font-medium text-xs gap-1 flex-shrink-0"
      />
    </div>
  );
}
