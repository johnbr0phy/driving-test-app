"use client";

import { createContext, useContext, ReactNode } from "react";
import { EXAMS, examLandingPath } from "@/lib/exams";
import { getTigerAsset, hasTigerSet } from "@/lib/tigerAssets";

export interface TestTheme {
  id: string;
  name: string;
  slug: string;
  // Header
  headerTitle: string;
  logoHome: string;
  logoIcon: string | null;
  // Test config
  testsPerSet: number;
  totalTests: number;
  totalTrainingSets: number;
  questionsPerTest: number;
  passPercentage: number;
  // Route base
  routeBase: string;
  dashboardPath: string;
  landingPath: string;
  // Auth links (non-DMV exams carry ?redirect= back to their dashboard)
  signupPath: string;
  loginPath: string;
}

export const themes: Record<string, TestTheme> = {
  dmv: {
    id: "dmv",
    name: "TigerTest",
    slug: "dmv",
    headerTitle: "tigertest.io",
    logoHome: "/dashboard",
    logoIcon: "/tiger.png",
    testsPerSet: 50,
    totalTests: 4,
    totalTrainingSets: 4,
    questionsPerTest: 50,
    passPercentage: 70,
    routeBase: "",
    dashboardPath: "/dashboard",
    landingPath: "/",
    signupPath: "/signup",
    loginPath: "/login",
  },
  ...Object.fromEntries(
    EXAMS.map((exam) => [
      exam.id,
      {
        id: exam.id,
        name: exam.name,
        slug: exam.id,
        headerTitle: exam.name,
        logoHome: examLandingPath(exam),
        logoIcon: hasTigerSet(exam.id) ? getTigerAsset(exam.id) : null,
        testsPerSet: exam.questionsPerTest,
        totalTests: exam.testCount,
        totalTrainingSets: exam.trainingSets.length,
        questionsPerTest: exam.questionsPerTest,
        passPercentage: exam.passPct,
        routeBase: exam.slug,
        dashboardPath: `${exam.slug}/dashboard`,
        landingPath: examLandingPath(exam),
        signupPath: `/signup?redirect=${exam.slug}/dashboard`,
        loginPath: `/login?redirect=${exam.slug}/dashboard`,
      } satisfies TestTheme,
    ])
  ),
};

const TestThemeContext = createContext<TestTheme>(themes.dmv);

export function TestThemeProvider({ theme, children }: { theme: string; children: ReactNode }) {
  const t = themes[theme] || themes.dmv;
  return (
    <TestThemeContext.Provider value={t}>
      <div data-theme={theme === "dmv" ? undefined : theme}>
        {children}
      </div>
    </TestThemeContext.Provider>
  );
}

export function useTestTheme() {
  return useContext(TestThemeContext);
}
