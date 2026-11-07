import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("demotorrad");

export default function DemotorradLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="demotorrad" className="flex-1 flex flex-col">{children}</div>;
}
