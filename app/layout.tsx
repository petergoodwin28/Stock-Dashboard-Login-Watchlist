import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FeatureFlagProvider } from "@/components/FeatureFlagWrapper";

import { ThemeProvider } from "@/components/theme-provider";

import Head from "next/head";

//import nightwind from 'nightwind/helper'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stock Dashboard",
  description:
    "Keep a watchlist of your favorite stocks, and view simple price and volume charts for a chosen stock.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <FeatureFlagProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          >
            <Navigation></Navigation>
            <main className="flex-grow"> {children} </main>

            <Footer></Footer>
          </body>
        </html>
      </FeatureFlagProvider>
    </SessionWrapper>
  );
}
