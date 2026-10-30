import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pcoc");

export default function PcocLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pcoc" className="flex-1 flex flex-col">{children}</div>;
}
