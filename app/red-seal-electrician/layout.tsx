import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caelec");

export default function CaelecLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caelec" className="flex-1 flex flex-col">{children}</div>;
}
