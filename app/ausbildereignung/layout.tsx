import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("deaevo");

export default function DeaevoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="deaevo" className="flex-1 flex flex-col">{children}</div>;
}
