import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("espolicia");

export default function EspoliciaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="espolicia" className="flex-1 flex flex-col">{children}</div>;
}
