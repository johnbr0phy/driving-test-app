import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("oacp");

export default function OacpLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="oacp" className="flex-1 flex flex-col">{children}</div>;
}
