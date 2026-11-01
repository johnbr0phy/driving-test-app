import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rodrpciv");

export default function RodrpcivLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rodrpciv" className="flex-1 flex flex-col">{children}</div>;
}
