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
          content="5ab532c87ee279325dd12be64dbb27d0228837f2c2ad328660bee47423d6e164b7c0153afdee980ad9490109717409ac2189211cac54b71b944cb3ef2e62be4a"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
