import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auqld");

export default function AuqldLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auqld" className="flex-1 flex flex-col">{children}</div>;
}
