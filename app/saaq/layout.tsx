import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caqc");

export default function CaqcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caqc" className="flex-1 flex flex-col">{children}</div>;
}
