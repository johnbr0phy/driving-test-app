import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hha");

export default function HhaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hha" className="flex-1 flex flex-col">{children}</div>;
}
