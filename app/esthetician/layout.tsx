import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("esthetician");

export default function EstheticianLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="esthetician" className="flex-1 flex flex-col">{children}</div>;
}
