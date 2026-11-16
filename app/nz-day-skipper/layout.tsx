import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzboat");

export default function NzBoatLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzboat" className="flex-1 flex flex-col">{children}</div>;
}
