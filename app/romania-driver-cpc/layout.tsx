import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rocpi");

export default function RocpiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rocpi" className="flex-1 flex flex-col">{children}</div>;
}
