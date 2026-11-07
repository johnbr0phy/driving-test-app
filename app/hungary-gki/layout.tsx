import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hugki");

export default function HugkiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hugki" className="flex-1 flex flex-col">{children}</div>;
}
