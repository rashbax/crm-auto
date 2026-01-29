import type { Metadata } from "next";
import "./globals.css";
import "./legacy.css";

export const metadata: Metadata = {
  title: "Navruz CRM",
  description: "CRM System for Navruz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
