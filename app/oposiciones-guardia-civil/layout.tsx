import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("esguardia");

export default function EsguardiaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="esguardia" className="flex-1 flex flex-col">{children}</div>;
}
