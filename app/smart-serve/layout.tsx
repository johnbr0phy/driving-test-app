import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("smartserve");

export default function SmartServeLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="smartserve" className="flex-1 flex flex-col">{children}</div>;
}
