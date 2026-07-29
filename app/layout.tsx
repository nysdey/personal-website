import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sydney-chin.sites.openai.com"),
  title: "Sydney Chin — Strategy, Design & Curious Things",
  description:
    "The personal portfolio of Sydney Chin: strategist, designer, writer, coffee enthusiast, and curious human.",
  openGraph: {
    title: "Sydney Chin — I make complex things feel clear.",
    description: "Strategy, design, culture, coffee, music, and ideas in progress.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydney Chin — I make complex things feel clear.",
    description: "Strategy, design, culture, coffee, music, and ideas in progress.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
