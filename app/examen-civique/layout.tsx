import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("frcivique");

export default function FrciviqueLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="frcivique" className="flex-1 flex flex-col">{children}</div>;
}
