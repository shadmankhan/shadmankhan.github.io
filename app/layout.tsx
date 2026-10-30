import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata: Metadata = {
  title: "/home/shadman — a little corner of the internet",
  description: "A small, sunny home for software, music, games, research and side quests.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
