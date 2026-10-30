import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cacarp");

export default function RedSealCarpenterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cacarp" className="flex-1 flex flex-col">{children}</div>;
}
