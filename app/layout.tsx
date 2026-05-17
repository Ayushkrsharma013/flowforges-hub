import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowForges Hub — App Launcher",
  description: "Central hub for all FlowForges products — Prospecting OS, Support OS, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
