"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Property } from "@/types/property";
import Head from "next/head";

export default function PropertyDetails() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/404");
            return;
          }
          throw new Error("Failed to load property");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-[60vh] bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return null; // Return null since we're redirecting to 404
  }

  // Structured data for real estate listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    description: property.description,
    image: property.images.main,
    numberOfRooms: property.features.bedrooms,
    numberOfBathroomsTotal: property.features.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.features.area,
      unitText: "sq ft",
    },
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address,
      addressLocality: property.location.city,
      addressRegion: property.location.area,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "AED",
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <>
      <Head>
        <title>{`${property.title} | LuxeList Dubai`}</title>
        <meta name="description" content={property.description} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description} />
        <meta property="og:image" content={property.images.main} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property.title} />
        <meta name="twitter:description" content={property.description} />
        <meta name="twitter:image" content={property.images.main} />
        <link
          rel="canonical"
          href={`https://luxelist.ae/properties/${property.slug}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full mb-8">
          <Image
            src={property.images.main}
            alt={`${property.title} - Main Image`}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-600 mb-6">{property.description}</p>

            {/* Features */}
            <section aria-labelledby="features-heading" className="mb-8">
              <h2 id="features-heading" className="text-2xl font-semibold mb-4">
                Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-2">Bedrooms</div>
                  <div className="text-xl font-semibold">
                    {property.features.bedrooms}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-2">Bathrooms</div>
                  <div className="text-xl font-semibold">
                    {property.features.bathrooms}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-2">Area</div>
                  <div className="text-xl font-semibold">
                    {property.features.area} sq ft
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-2">Parking</div>
                  <div className="text-xl font-semibold">
                    {property.features.parking} spots
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section aria-labelledby="amenities-heading" className="mb-8">
              <h2
                id="amenities-heading"
                className="text-2xl font-semibold mb-4"
              >
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Image Gallery */}
            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-2xl font-semibold mb-4">
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.images.gallery.map((image, index) => (
                  <div key={index} className="relative h-64">
                    <Image
                      src={image}
                      alt={`${property.title} - Gallery Image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Agent:</span>{" "}
                  {property.contactInfo.agent}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {property.contactInfo.phone}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {property.contactInfo.email}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Viewing
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
