import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("teas");

export default function TeasLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="teas" className="flex-1 flex flex-col">{children}</div>;
}
