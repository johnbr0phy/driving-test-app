import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auwa");

export default function AuwaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auwa" className="flex-1 flex flex-col">{children}</div>;
}
