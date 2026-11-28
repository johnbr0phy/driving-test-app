import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ccht");

export default function CchtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ccht" className="flex-1 flex flex-col">{children}</div>;
}
