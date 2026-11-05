import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgres");

export default function SgresLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgres" className="flex-1 flex flex-col">{children}</div>;
}
