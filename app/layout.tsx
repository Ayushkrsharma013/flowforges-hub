import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowForges Hub — App Launcher",
  description: "Central hub for all FlowForges products — Prospecting OS, Support OS, and more.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
    other: [
      { url: "/logo-icon.png", type: "image/png", sizes: "512x512" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
