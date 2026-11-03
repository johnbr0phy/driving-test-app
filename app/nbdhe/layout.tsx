import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nbdhe");

export default function NbdheLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nbdhe" className="flex-1 flex flex-col">{children}</div>;
}
