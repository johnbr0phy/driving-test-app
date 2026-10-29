import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("uklgv");

export default function UklgvLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="uklgv" className="flex-1 flex flex-col">{children}</div>;
}
