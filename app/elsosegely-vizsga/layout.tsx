import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("huelsoseg");

export default function HuelsosegLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="huelsoseg" className="flex-1 flex flex-col">{children}</div>;
}
