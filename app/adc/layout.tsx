import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cadc");

export default function AdcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cadc" className="flex-1 flex flex-col">{children}</div>;
}
