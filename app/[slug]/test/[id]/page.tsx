"use client";

import { SharedExamAppPage } from "@/components/exam/SharedExamAppPage";

// Every v1 and v2 exam's test page (lib/examAppRoute.ts).
export default function Page() {
  return <SharedExamAppPage kind="test" />;
}
