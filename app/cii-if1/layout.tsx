import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukif1");

export default function CiiIf1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukif1" className="flex-1 flex flex-col">{children}</div>;
}
