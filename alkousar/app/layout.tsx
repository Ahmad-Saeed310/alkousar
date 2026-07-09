import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans, Figtree } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
// import TransitionOverlay from "../animates/TransitionOverlay";
import LayoutContent from "../animates/LayoutContent";
import SmoothScrollProvider from "./Components/SmoothScrollProvider"; // adjust path to match your project

// import Transition from "./Components/common/Transition"

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Sans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al-Kousar Properties",
  description: "Real Estate Bahawalpur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${Sans.variable} ${geistMono.variable} ${figtree.variable} antialiased`}
    >
      <body>
        <SmoothScrollProvider>
          <TransitionProvider>
            <LayoutContent>{children}</LayoutContent>
          </TransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
