import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Udyog Radar — Industrial intelligence, ahead of the market",
  description:
    "Detect industrial expansion signals early and turn them into precise, territory-ready sales opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
