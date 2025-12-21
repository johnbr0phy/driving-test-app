import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driving Test Practice App",
  description: "Practice for your driving test with 200 state-specific questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
