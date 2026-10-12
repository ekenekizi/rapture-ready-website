import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Libre_Caslon_Display } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const serif = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-libre-caslon",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Endtime Watch",
    template: "%s | Endtime Watch",
  },
  description:
    "Biblical teachings to help believers understand the times, grow in discernment, and prepare for the return of Jesus Christ.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
