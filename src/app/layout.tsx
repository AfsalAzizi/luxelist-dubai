import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeList Dubai | Premium Real Estate Properties",
  description:
    "Discover luxury properties in Dubai. Browse our exclusive collection of high-end apartments, villas, and penthouses in prime locations across Dubai.",
  keywords: [
    "Dubai real estate",
    "luxury properties Dubai",
    "premium apartments",
    "luxury villas",
    "penthouses Dubai",
    "real estate investment",
    "property for sale Dubai",
    "Dubai property listings",
    "luxury homes Dubai",
    "high-end real estate Dubai",
  ].join(", "),
  openGraph: {
    title: "LuxeList Dubai | Premium Real Estate Properties",
    description:
      "Discover luxury properties in Dubai. Browse our exclusive collection of high-end apartments, villas, and penthouses in prime locations across Dubai.",
    type: "website",
    url: "https://luxelist.ae",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LuxeList Dubai - Premium Real Estate",
      },
    ],
    siteName: "LuxeList Dubai",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeList Dubai | Premium Real Estate Properties",
    description:
      "Discover luxury properties in Dubai. Browse our exclusive collection of high-end apartments, villas, and penthouses in prime locations across Dubai.",
    images: ["/images/og-image.jpg"],
    creator: "@luxelistdubai",
    site: "@luxelistdubai",
  },
  alternates: {
    canonical: "https://luxelist.ae",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application-name": "LuxeList Dubai",
    author: "LuxeList Dubai",
    category: "Real Estate",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    ICBM: "25.2048, 55.2708",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
