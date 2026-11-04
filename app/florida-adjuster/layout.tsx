import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("fladjuster");

export default function FlAdjusterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="fladjuster" className="flex-1 flex flex-col">{children}</div>;
}
