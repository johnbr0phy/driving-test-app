import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cadronebasic");

export default function CanadaDroneBasicLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cadronebasic" className="flex-1 flex flex-col">{children}</div>;
}
