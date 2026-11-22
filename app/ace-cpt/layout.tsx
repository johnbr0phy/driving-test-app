import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("acecpt");

export default function AceCptLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="acecpt" className="flex-1 flex flex-col">{children}</div>;
}
