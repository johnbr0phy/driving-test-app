import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("plbron");

export default function PlbronLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="plbron" className="flex-1 flex flex-col">{children}</div>;
}
