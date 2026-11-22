import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nltheorie");

export default function NltheorieLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nltheorie" className="flex-1 flex flex-col">{children}</div>;
}
