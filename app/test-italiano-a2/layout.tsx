import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ita2");

export default function Ita2Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ita2" className="flex-1 flex flex-col">{children}</div>;
}
