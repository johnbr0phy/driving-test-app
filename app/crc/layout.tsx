import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("crc");

export default function CrcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="crc" className="flex-1 flex flex-col">{children}</div>;
}
