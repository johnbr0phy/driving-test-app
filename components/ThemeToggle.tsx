"use client";

import { useEffect, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme, type ThemePreference } from "@/contexts/ThemeContext";
import { useTranslation } from "@/contexts/LanguageContext";

const OPTIONS: { value: ThemePreference; Icon: typeof Sun }[] = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
  { value: "system", Icon: Monitor },
];

/**
 * Light / dark / system picker. Compact icon trigger (the header has no room
 * for a label) opening a small popover, same pattern as LanguageSwitcher.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // The stored preference is only known on the client; render the neutral
  // icon until then so server and client markup match.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Icon = !mounted ? Monitor : resolvedTheme === "dark" ? Moon : Sun;
  const labels: Record<ThemePreference, string> = {
    light: t("theme.light"),
    dark: t("theme.dark"),
    system: t("theme.system"),
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`${t("theme.appearance")}: ${labels[theme]}`}
        title={t("theme.appearance")}
        className={`flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${className}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-44 p-1">
        <ul role="group" aria-label={t("theme.appearance")}>
          {OPTIONS.map(({ value, Icon: OptionIcon }) => {
            const isActive = theme === value;
            return (
              <li key={value}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive ? "font-semibold text-gray-900 dark:text-gray-50" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <OptionIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  <span className="flex-1">{labels[value]}</span>
                  {isActive && <Check className="h-4 w-4 text-brand-dark" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Three-way segmented control for the settings page, where there is room
 * for labels.
 */
export function ThemeSegmentedControl() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const labels: Record<ThemePreference, string> = {
    light: t("theme.light"),
    dark: t("theme.dark"),
    system: t("theme.system"),
  };

  return (
    <div role="group" aria-label={t("theme.appearance")} className="inline-flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900">
      {OPTIONS.map(({ value, Icon }) => {
        const isActive = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setTheme(value)}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-900 text-white shadow-sm dark:bg-gray-100 dark:text-gray-900"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {labels[value]}
          </button>
        );
      })}
    </div>
  );
}
