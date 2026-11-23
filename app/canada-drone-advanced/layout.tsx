import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cadroneadv");

export default function CanadaDroneAdvancedLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cadroneadv" className="flex-1 flex flex-col">{children}</div>;
}
