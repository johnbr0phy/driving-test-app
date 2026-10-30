import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("gulfrn");

export default function GulfrnLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="gulfrn" className="flex-1 flex flex-col">{children}</div>;
}
