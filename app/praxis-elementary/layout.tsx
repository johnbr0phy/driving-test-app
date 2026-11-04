import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("praxis5001");

export default function Praxis5001Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="praxis5001" className="flex-1 flex flex-col">{children}</div>;
}
