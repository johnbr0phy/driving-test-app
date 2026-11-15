import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ascpmlt");

export default function AscpMltLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ascpmlt" className="flex-1 flex flex-col">{children}</div>;
}
