import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpr");

export default function CprLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpr" className="flex-1 flex flex-col">{children}</div>;
}
