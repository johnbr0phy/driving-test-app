import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("praxisplt");

export default function PraxispltLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="praxisplt" className="flex-1 flex flex-col">{children}</div>;
}
