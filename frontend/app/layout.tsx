import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Company Detailed View",
  description: "Indian listed company research dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}