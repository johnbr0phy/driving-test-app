import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("series63");

export default function Series63Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="series63" className="flex-1 flex flex-col">{children}</div>;
}
