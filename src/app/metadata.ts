import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Luxury Properties in Dubai | LuxeList Dubai",
    description:
      "Browse our exclusive collection of luxury properties in Dubai. Find high-end apartments, villas, and penthouses in prime locations across Dubai.",
    alternates: {
      canonical: "https://luxelist.ae",
    },
    openGraph: {
      title: "Luxury Properties in Dubai | LuxeList Dubai",
      description:
        "Browse our exclusive collection of luxury properties in Dubai. Find high-end apartments, villas, and penthouses in prime locations across Dubai.",
      type: "website",
      url: "https://luxelist.ae",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Luxury Properties in Dubai - LuxeList Dubai",
        },
      ],
    },
  };
};
