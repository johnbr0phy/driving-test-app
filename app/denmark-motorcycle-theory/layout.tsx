import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("dkmoto");

export default function DkmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dkmoto" className="flex-1 flex flex-col">{children}</div>;
}
