"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { CDLHeader } from "@/components/CDLHeader";
import { TestThemeProvider } from "@/contexts/TestThemeContext";
import { getExamByPath } from "@/lib/exams";

export function HeaderSwitch() {
  const pathname = usePathname();
  const isCDL = pathname?.startsWith("/cdl") || pathname === "/cdl-practice-test";
  const exam = getExamByPath(pathname);

  if (exam) {
    return (
      <TestThemeProvider theme={exam.id}>
        <CDLHeader />
      </TestThemeProvider>
    );
  }

  if (isCDL) {
    return (
      <TestThemeProvider theme="cdl">
        <CDLHeader />
      </TestThemeProvider>
    );
  }

  return <Header />;
}
