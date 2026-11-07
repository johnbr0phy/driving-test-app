import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mttaxi");

export default function MttaxiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mttaxi" className="flex-1 flex flex-col">{children}</div>;
}
