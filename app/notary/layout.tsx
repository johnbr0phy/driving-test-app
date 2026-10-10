import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("notary");

export default function NotaryLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="notary" className="flex-1 flex flex-col">{children}</div>;
}
