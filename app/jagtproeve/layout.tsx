import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("dkjagt");

export default function DkjagtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dkjagt" className="flex-1 flex flex-col">{children}</div>;
}
