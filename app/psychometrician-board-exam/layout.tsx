import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phpsychom");

export default function PhpsychomLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phpsychom" className="flex-1 flex flex-col">{children}</div>;
}
