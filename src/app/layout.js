import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Adaline - AI Agent Platform",
  description: "The single platform to iterate, evaluate, deploy, and monitor AI agents",
};

const akkurat = localFont({
  src: "./fonts/Akkurat.ttf",
  variable: "--font-akkurat",
});

const fragmentMono = localFont({
  src: "./fonts/FragmentMono-Regular.otf",
  variable: "--font-fragment-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${akkurat.variable} ${fragmentMono.variable} font-sans`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
