import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("escapcond");

export default function EscapcondLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="escapcond" className="flex-1 flex flex-col">{children}</div>;
}
