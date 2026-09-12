import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sydney-chin.sydneychin13.chatgpt.site"),
  title: "Sydney Chin — Product, Data & Curious Things",
  description:
    "The personal portfolio of Sydney Chin: Information Science student at Cornell working across technical product management, sales engineering, and data analysis.",
  openGraph: {
    title: "Hi, my name is Sydney.",
    description:
      "Junior at Cornell studying Information Science. Technical Product Manager at Hack4Impact, IBM Campus Ambassador.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hi, my name is Sydney.",
    description:
      "Junior at Cornell studying Information Science. Technical Product Manager at Hack4Impact, IBM Campus Ambassador.",
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
        className={`${interSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
