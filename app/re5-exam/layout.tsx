import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zare5");

export default function Zare5Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zare5" className="flex-1 flex flex-col">{children}</div>;
}
