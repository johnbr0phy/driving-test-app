import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("emt");

export default function EmtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="emt" className="flex-1 flex flex-col">{children}</div>;
}
