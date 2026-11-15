import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("crfsc");

export default function CrfscLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="crfsc" className="flex-1 flex flex-col">{children}</div>;
}
