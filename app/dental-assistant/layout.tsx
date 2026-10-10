import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("danb");

export default function DanbLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="danb" className="flex-1 flex flex-col">{children}</div>;
}
