import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("dejagd");

export default function DejagdLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dejagd" className="flex-1 flex flex-col">{children}</div>;
}
