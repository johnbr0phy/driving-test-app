import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("trapper");

export default function TrapperLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="trapper" className="flex-1 flex flex-col">{children}</div>;
}
