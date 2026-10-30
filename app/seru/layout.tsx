import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukseru");

export default function UkseruLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukseru" className="flex-1 flex flex-col">{children}</div>;
}
