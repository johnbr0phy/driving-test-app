import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cosmoinstructor");

export default function CosmoInstructorLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cosmoinstructor" className="flex-1 flex flex-col">{children}</div>;
}
