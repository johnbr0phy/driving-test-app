import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rhia");

export default function RhiaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rhia" className="flex-1 flex flex-col">{children}</div>;
}
