import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("arrtct");

export default function ArrtCtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="arrtct" className="flex-1 flex flex-col">{children}</div>;
}
