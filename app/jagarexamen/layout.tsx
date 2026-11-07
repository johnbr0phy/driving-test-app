import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sejakt");

export default function SejaktLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sejakt" className="flex-1 flex flex-col">{children}</div>;
}
