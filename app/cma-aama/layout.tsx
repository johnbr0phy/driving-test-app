import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cma");

export default function CmaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cma" className="flex-1 flex flex-col">{children}</div>;
}
