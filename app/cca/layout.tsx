import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cca");

export default function CcaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cca" className="flex-1 flex flex-col">{children}</div>;
}
