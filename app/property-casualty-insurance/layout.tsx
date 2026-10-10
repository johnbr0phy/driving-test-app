import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pnc");

export default function PncLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pnc" className="flex-1 flex flex-col">{children}</div>;
}
