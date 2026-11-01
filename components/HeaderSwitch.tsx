"use client";

import { useThemePath } from "@/hooks/useThemePath";
import { Header } from "@/components/Header";
import { CDLHeader } from "@/components/CDLHeader";
import { TestThemeProvider } from "@/contexts/TestThemeContext";
import { getExamByPath } from "@/lib/exams";
import { V2Header } from "@/components/v2/V2Header";
import { getExamV2ByPath } from "@/lib/v2/registry";

export function HeaderSwitch() {
  const pathname = useThemePath();
  const exam = getExamByPath(pathname);
  const examV2 = getExamV2ByPath(pathname);

  // The search homepage trial draws its own Google-style top bar.
  if (pathname === "/home-v2") return null;

  if (examV2) return <V2Header exam={examV2} />;

  if (exam) {
    return (
      <TestThemeProvider theme={exam.id}>
        <CDLHeader />
      </TestThemeProvider>
    );
  }

  return <Header />;
}
