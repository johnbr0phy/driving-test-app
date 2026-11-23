import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cnor");

export default function CnorLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cnor" className="flex-1 flex flex-col">{children}</div>;
}
