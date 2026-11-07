import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pttvde");

export default function PttvdeLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pttvde" className="flex-1 flex flex-col">{children}</div>;
}
