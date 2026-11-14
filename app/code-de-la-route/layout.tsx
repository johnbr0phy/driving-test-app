import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("frcode");

export default function FrcodeLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="frcode" className="flex-1 flex flex-col">{children}</div>;
}
