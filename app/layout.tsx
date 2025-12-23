import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TigerTest - The DMV app for studying while watching TV",
    template: "%s | TigerTest",
  },
  description:
    "Free DMV practice tests for all 50 states. 200+ questions per state with instant feedback and detailed explanations. Track your progress and pass your driving test on the first try.",
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
    title: "Free DMV Practice Test 2025 | TigerTest",
    description:
      "Free DMV practice tests for all 50 states. 200+ questions per state with instant feedback and detailed explanations.",
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
    title: "Free DMV Practice Test 2025 | TigerTest",
    description:
      "Free DMV practice tests for all 50 states. 200+ questions with instant feedback.",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-28J0RC9MJ5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-28J0RC9MJ5');
          `}
        </Script>
      </head>
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
