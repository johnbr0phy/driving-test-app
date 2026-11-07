import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rotaxi");

export default function RotaxiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rotaxi" className="flex-1 flex flex-col">{children}</div>;
}
