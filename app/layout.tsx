import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Libre_Caslon_Display } from "next/font/google";
import "./globals.css";
import "./navigation.css";
import "./gallery.css";
import "./video-teachings.css";
import { getSiteSettings } from "@/sanity/lib/pages";
import { pageMetadata, siteDescription, siteUrl } from "@/lib/seo";

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

export async function generateMetadata(): Promise<Metadata> {
  "use cache";

  const settings = await getSiteSettings();
  return {
    ...pageMetadata({
      title: "Endtime Watch",
      description: settings?.seoDescription?.trim() || siteDescription,
      path: "/",
    }),
    metadataBase: siteUrl,
    title: {
      default: "Endtime Watch",
      template: "%s | Endtime Watch",
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
