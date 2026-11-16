import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pance");

export default function PanceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pance" className="flex-1 flex flex-col">{children}</div>;
}
