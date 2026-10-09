"use client";

import { createContext, useContext, ReactNode } from "react";

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
  cdl: {
    id: "cdl",
    name: "CDL Practice Test",
    slug: "cdl",
    headerTitle: "CDL Practice Test",
    logoHome: "/cdl-practice-test",
    logoIcon: null,
    testsPerSet: 50,
    totalTests: 12,
    totalTrainingSets: 12,
    questionsPerTest: 50,
    passPercentage: 80,
    routeBase: "/cdl",
    dashboardPath: "/cdl/dashboard",
    landingPath: "/cdl-practice-test",
    signupPath: "/signup",
    loginPath: "/login",
  },
  htl: {
    id: "htl",
    name: "HTL Practice Test",
    slug: "htl",
    headerTitle: "HTL Practice Test",
    logoHome: "/htl",
    logoIcon: null,
    testsPerSet: 50,
    totalTests: 4,
    totalTrainingSets: 5,
    questionsPerTest: 50,
    passPercentage: 70,
    routeBase: "/htl",
    dashboardPath: "/htl/dashboard",
    landingPath: "/htl",
    signupPath: "/signup?redirect=/htl/dashboard",
    loginPath: "/login?redirect=/htl/dashboard",
  },
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
