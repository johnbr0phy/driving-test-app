import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("itpatente");

export default function ItpatenteLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="itpatente" className="flex-1 flex flex-col">{children}</div>;
}
