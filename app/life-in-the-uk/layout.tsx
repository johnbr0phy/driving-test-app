import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("uklitu");

export default function UklituLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="uklitu" className="flex-1 flex flex-col">{children}</div>;
}
