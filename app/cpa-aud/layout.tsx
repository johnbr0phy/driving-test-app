import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpaaud");

export default function CpaAudLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpaaud" className="flex-1 flex flex-col">{children}</div>;
}
