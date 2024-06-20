import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
// import { Analytics } from '@vercel/analytics/react';
import { Navbar } from "@/components/Navbar";
import { siteUrl } from "@/lib/consts";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import type { FC, ReactNode } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const name = "Souradip Chandra";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  applicationName: name,
  authors: [
    {
      name,
      url: siteUrl,
    },
  ],
  creator: name,
  // metadataBase: new URL(siteUrl),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    siteName: name,
    locale: "en_US",
  },
  publisher: name,
};

export const runtime = "edge";

const RootLayout: FC<RootLayoutProperties> = ({ children }) => (
  <html lang="en">
    <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        "bg-white dark:bg-neutral-900 font-sans"
      )}
    >
      {/* {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics strategy="lazyOnload" />
      )} */}
      {children}
      <Navbar />
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
