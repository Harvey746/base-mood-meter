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
        <meta
          name="talentapp:project_verification"
          content="e6020be58e1d56cfa86d6392508dd443cbdc816277943ad3c63f0667cf9b0fe25b85c0a6abdf6029a62fe67917a148e8ac866e7090af15acfbbf0a7ebeb63ecb"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
