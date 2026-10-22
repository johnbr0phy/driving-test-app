import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cosmetology");

export default function CosmetologyLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cosmetology" className="flex-1 flex flex-col">{children}</div>;
}
