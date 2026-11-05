import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pknle");

export default function PknleLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pknle" className="flex-1 flex flex-col">{children}</div>;
}
