import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukmoto");

export default function UkmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukmoto" className="flex-1 flex flex-col">{children}</div>;
}
