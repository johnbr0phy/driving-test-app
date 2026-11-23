import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nscacpt");

export default function NscaCptLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nscacpt" className="flex-1 flex flex-col">{children}</div>;
}
