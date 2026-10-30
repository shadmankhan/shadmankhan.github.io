import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./world.css";
import { SiteChrome } from "@/components/shell/SiteChrome";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Shadman Ahmed Khan — Full-stack Engineer, Music Maker & Curious Mind",
  description: "Step into Shadman’s world: thoughtful software, independent music, games, research, travel, and the life around them.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${display.variable} ${mono.variable}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
