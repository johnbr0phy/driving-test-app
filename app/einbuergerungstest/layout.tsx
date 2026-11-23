import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("deeinb");

export default function DeeinbLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="deeinb" className="flex-1 flex flex-col">{children}</div>;
}
