import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("bowhunter");

export default function BowhunterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="bowhunter" className="flex-1 flex flex-col">{children}</div>;
}
