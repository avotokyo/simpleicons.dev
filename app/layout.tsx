import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "simpleicons.dev",
  description: "Simple Icons SVG API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
