import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("iespsv");

export default function IespsvLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="iespsv" className="flex-1 flex flex-col">{children}</div>;
}
