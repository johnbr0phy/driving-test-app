import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aurcg");

export default function AurcgLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aurcg" className="flex-1 flex flex-col">{children}</div>;
}
