import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufirstaid");

export default function AuFirstAidLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufirstaid" className="flex-1 flex flex-col">{children}</div>;
}
