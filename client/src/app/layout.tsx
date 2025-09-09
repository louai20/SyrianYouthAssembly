import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { fetchGlobalData } from "@/lib/strapi";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYA",
  description: "Syrian Youth Assembly",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await fetchGlobalData();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="mx-auto  h-screen flex flex-col">
          <Navbar navbar={globalData.header} />
          <div className="flex-grow">{children}</div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}