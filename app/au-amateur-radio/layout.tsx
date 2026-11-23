import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auham");

export default function AuhamLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auham" className="flex-1 flex flex-col">{children}</div>;
}
