import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("carstruck");

export default function CarstruckLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="carstruck" className="flex-1 flex flex-col">{children}</div>;
}
