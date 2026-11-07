import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("esvigilante");

export default function EsvigilanteLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="esvigilante" className="flex-1 flex flex-col">{children}</div>;
}
