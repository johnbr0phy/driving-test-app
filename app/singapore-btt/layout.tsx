import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgbtt");

export default function SgbttLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgbtt" className="flex-1 flex flex-col">{children}</div>;
}
