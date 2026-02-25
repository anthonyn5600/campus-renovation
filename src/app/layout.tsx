import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSUF Campus Navigator",
  description: "Interactive campus map, events, food, and contact directory for Cal State Fullerton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
