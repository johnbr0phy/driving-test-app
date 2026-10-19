"use client";

// The DMV state choice, on the dashboard itself (it used to be its own
// onboarding page and the first step of signup). Same shape as the exam
// families' picker (components/exam/ExamStatePicker.tsx): a prompt card at the
// top until a state is chosen, then one line in the hero with a Change control.
// Unlike an exam family, switching DMV states deletes the current state's
// progress (setSelectedState), so Change asks first when there is any.

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";

function useDmvStateChoice() {
  const { t } = useTranslation();
  const selectedState = useStore((state) => state.selectedState);
  const setSelectedState = useStore((state) => state.setSelectedState);
  const hasProgress = useStore(
    (state) => state.training.totalCorrectAllTime > 0 || state.completedTests.some((c) => c.state === state.selectedState)
  );
  const choose = (code: string) => {
    if (code === selectedState) return;
    if (selectedState && hasProgress && !window.confirm(t("settings.switchStateWarning"))) return;
    setSelectedState(code);
  };
  return { selectedState, choose };
}

/** Top-of-dashboard card while no state is chosen; renders nothing after. */
export function DmvStatePrompt() {
  const { t } = useTranslation();
  const { selectedState, choose } = useDmvStateChoice();
  if (selectedState) return null;

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border-2 border-brand-border-light p-5 mb-6 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100">
        <span>{t("onboarding.iNeedToPass")}</span>
        <Select onValueChange={choose}>
          <SelectTrigger
            aria-label={t("signup.selectLocation")}
            className="w-auto inline-flex text-xl md:text-2xl font-semibold text-brand-dark border-none shadow-none focus:ring-0 focus:ring-offset-0 px-1 underline decoration-brand-border decoration-2 underline-offset-4 hover:decoration-brand h-auto"
          >
            <SelectValue placeholder={t("onboarding.selectLocation")} />
          </SelectTrigger>
          <SelectContent>
            {states.map((s) => (
              <SelectItem key={s.code} value={s.code}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>{t("onboarding.drivingTest")}</span>
      </div>
    </div>
  );
}

/** One line in the dashboard hero: the chosen state and a Change control. */
export function DmvStateLine() {
  const { t } = useTranslation();
  const { selectedState, choose } = useDmvStateChoice();
  const name = states.find((s) => s.code === selectedState)?.name;
  if (!selectedState || !name) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 text-xs">
      <span className="font-semibold text-gray-800 dark:text-gray-100 min-w-0">{name}</span>
      <Select onValueChange={choose} value={selectedState}>
        <SelectTrigger
          aria-label={t("signup.selectLocation")}
          className="w-auto h-auto p-0 border-none shadow-none focus:ring-0 focus:ring-offset-0 text-brand-dark font-medium text-xs gap-1 flex-shrink-0"
        >
          {t("common.change")}
        </SelectTrigger>
        <SelectContent>
          {states.map((s) => (
            <SelectItem key={s.code} value={s.code}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
