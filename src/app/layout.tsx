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
          content="f502dfa54f43cc8307a8df054046f5d1cb684780295281a180e158b60b5e9b15461e881b4b512ba5efd727eb9f804400a1a8a6ac6dcd0e707ad57aecfcea4afb"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
