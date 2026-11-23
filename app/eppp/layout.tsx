import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("eppp");

export default function EpppLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="eppp" className="flex-1 flex flex-col">{children}</div>;
}
