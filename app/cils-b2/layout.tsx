import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("itcilsb2");

export default function Itcilsb2Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="itcilsb2" className="flex-1 flex flex-col">{children}</div>;
}
