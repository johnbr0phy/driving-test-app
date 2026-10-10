import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("secplus");

export default function SecplusLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="secplus" className="flex-1 flex flex-col">{children}</div>;
}
