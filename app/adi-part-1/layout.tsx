import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukadi");

export default function UkadiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukadi" className="flex-1 flex flex-col">{children}</div>;
}
