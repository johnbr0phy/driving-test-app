import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("osha");

export default function OshaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="osha" className="flex-1 flex flex-col">{children}</div>;
}
