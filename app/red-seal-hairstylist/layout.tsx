import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("carshair");

export default function CarshairLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="carshair" className="flex-1 flex flex-col">{children}</div>;
}
