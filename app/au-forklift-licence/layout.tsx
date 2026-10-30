import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auforklift");

export default function AuForkliftLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auforklift" className="flex-1 flex flex-col">{children}</div>;
}
