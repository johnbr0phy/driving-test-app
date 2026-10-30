import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("iedtt");

export default function IedttLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="iedtt" className="flex-1 flex flex-col">{children}</div>;
}
