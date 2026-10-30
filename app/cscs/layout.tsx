import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cscs");

export default function CscsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cscs" className="flex-1 flex flex-col">{children}</div>;
}
