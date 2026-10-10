"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { CDLHeader } from "@/components/CDLHeader";
import { TestThemeProvider } from "@/contexts/TestThemeContext";
import { getExamByPath } from "@/lib/exams";
import { V2Header } from "@/components/v2/V2Header";
import { getExamV2ByPath } from "@/lib/v2/registry";

export function HeaderSwitch() {
  const pathname = usePathname();
  const exam = getExamByPath(pathname);
  const examV2 = getExamV2ByPath(pathname);

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
