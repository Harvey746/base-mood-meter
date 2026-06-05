import type { Metadata } from "next";
import { Fredoka, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Base Mood Meter",
  description: "A tiny onchain mood picker on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${geistMono.variable}`}>
      <head>
        <meta name="base:app_id" content="6a229f81ab28df7fd2fc1627" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
