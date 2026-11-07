import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("bemoto");

export default function BemotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="bemoto" className="flex-1 flex flex-col">{children}</div>;
}
