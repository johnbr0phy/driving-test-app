import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("coc");

export default function CocLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="coc" className="flex-1 flex flex-col">{children}</div>;
}
