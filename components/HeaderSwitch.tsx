"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { CDLHeader } from "@/components/CDLHeader";
import { TestThemeProvider } from "@/contexts/TestThemeContext";
import { getExamByPath } from "@/lib/exams";

export function HeaderSwitch() {
  const pathname = usePathname();
  const exam = getExamByPath(pathname);

  if (exam) {
    return (
      <TestThemeProvider theme={exam.id}>
        <CDLHeader />
      </TestThemeProvider>
    );
  }

  return <Header />;
}
