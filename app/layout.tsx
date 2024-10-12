import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS - Ecommerce",
  description: "Ecommerce Application",
};

const font = Inter({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
