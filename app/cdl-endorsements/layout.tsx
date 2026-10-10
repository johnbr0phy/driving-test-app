import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cdlx");

export default function CDLEndorsementsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cdlx" className="flex-1 flex flex-col">{children}</div>;
}
