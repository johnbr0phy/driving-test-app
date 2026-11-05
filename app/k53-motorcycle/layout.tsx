import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zak53moto");

export default function Zak53motoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zak53moto" className="flex-1 flex flex-col">{children}</div>;
}
