import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free US Driving Test Practice | TigerTest",
    template: "%s | TigerTest",
  },
  description:
    "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
  keywords: [
    "driving test practice",
    "DMV practice test",
    "driving knowledge test",
    "US driving test",
    "state driving test",
    "DMV test questions",
    "driving permit test",
    "driver license test",
    "free driving test",
    "driving test prep",
  ],
  authors: [{ name: "TigerTest" }],
  creator: "TigerTest",
  publisher: "TigerTest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TigerTest",
    title: "Free US Driving Test Practice | TigerTest",
    description:
      "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
    images: [
      {
        url: "/tiger.png",
        width: 512,
        height: 512,
        alt: "TigerTest - US Driving Test Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free US Driving Test Practice | TigerTest",
    description:
      "Pass your US driving knowledge test with 200 state-specific practice questions. Free for all 50 states.",
    images: ["/tiger.png"],
  },
  icons: {
    icon: "/tiger.png",
    shortcut: "/tiger.png",
    apple: "/tiger.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
