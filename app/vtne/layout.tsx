import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("vtne");

export default function VtneLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="vtne" className="flex-1 flex flex-col">{children}</div>;
}
