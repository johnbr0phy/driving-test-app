import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caguard");

export default function CaguardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caguard" className="flex-1 flex flex-col">{children}</div>;
}
