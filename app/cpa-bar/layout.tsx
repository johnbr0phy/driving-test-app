import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpabar");

export default function CpaBarLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpabar" className="flex-1 flex flex-col">{children}</div>;
}
