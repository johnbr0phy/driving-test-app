import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phnat");

export default function PhnatLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phnat" className="flex-1 flex flex-col">{children}</div>;
}
