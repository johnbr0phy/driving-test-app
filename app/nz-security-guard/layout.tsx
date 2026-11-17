import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzsecurity");

export default function NzsecurityLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzsecurity" className="flex-1 flex flex-col">{children}</div>;
}
