import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phmedtech");

export default function PhmedtechLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phmedtech" className="flex-1 flex flex-col">{children}</div>;
}
