import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caplumb");

export default function RedSealPlumberLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caplumb" className="flex-1 flex flex-col">{children}</div>;
}
