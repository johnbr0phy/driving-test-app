import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("samuroor");

export default function SamuroorLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="samuroor" className="flex-1 flex flex-col">{children}</div>;
}
