import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("itcils");

export default function ItcilsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="itcils" className="flex-1 flex flex-col">{children}</div>;
}
