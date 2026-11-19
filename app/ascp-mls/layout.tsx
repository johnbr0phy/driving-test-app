import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ascpmls");

export default function AscpMlsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ascpmls" className="flex-1 flex flex-col">{children}</div>;
}
