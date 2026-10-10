import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phleb");

export default function PhlebLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phleb" className="flex-1 flex flex-col">{children}</div>;
}
