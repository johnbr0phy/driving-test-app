import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("jelec");

export default function JelecLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="jelec" className="flex-1 flex flex-col">{children}</div>;
}
