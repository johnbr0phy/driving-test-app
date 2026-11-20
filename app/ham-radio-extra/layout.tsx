import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hamextra");

export default function HamextraLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hamextra" className="flex-1 flex flex-col">{children}</div>;
}
