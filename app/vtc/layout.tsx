import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("frvtc");

export default function FrvtcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="frvtc" className="flex-1 flex flex-col">{children}</div>;
}
