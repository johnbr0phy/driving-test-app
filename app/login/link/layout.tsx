import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signing in | Tigertest",
  robots: { index: false, follow: false },
};

export default function LoginLinkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
