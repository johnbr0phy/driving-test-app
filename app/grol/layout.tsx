import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("grol");

export default function GrolLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="grol" className="flex-1 flex flex-col">{children}</div>;
}
