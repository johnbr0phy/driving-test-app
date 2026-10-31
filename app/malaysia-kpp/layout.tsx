import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mykpp");

export default function MykppLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mykpp" className="flex-1 flex flex-col">{children}</div>;
}
