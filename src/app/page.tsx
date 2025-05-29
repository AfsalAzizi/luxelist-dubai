"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import LocationFilter from "@/components/LocationFilter";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import { PropertySummary } from "@/models/property";
import { getAllProperties } from "@/lib/properties";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Generate structured data for properties
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: properties.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SingleFamilyResidence",
          name: property.title,
          description: property.shortDescription,
          image: property.thumbnail,
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location.city,
            addressRegion: property.location.state,
          },
          offers: {
            "@type": "Offer",
            price: property.price,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    };
    return JSON.stringify(structuredData);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const allProperties = await getAllProperties();
        // Filter properties based on criteria
        const filteredProperties = allProperties
          .filter((property) => {
            if (
              destinationId &&
              property.location.destinationId !== destinationId
            )
              return false;
            if (minPrice && property.price < minPrice) return false;
            if (maxPrice && property.price > maxPrice) return false;
            return true;
          })
          .map((property) => ({
            id: property.id,
            slug: property.slug,
            title: property.title,
            price: property.price,
            location: {
              destinationId: property.location.destinationId,
              city: property.location.city,
              state: property.location.state,
            },
            rating: property.rating,
            thumbnail: property.thumbnail,
            shortDescription: property.description.split(".")[0] + ".",
          }));
        setProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [destinationId, minPrice, maxPrice]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Structured Data */}
      <Script
        id="property-listings-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-700">Properties</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-8">Luxury Properties in Dubai</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <LocationFilter onFilterChange={setDestinationId} />
          <PriceRangeFilter
            onFilterChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Image
                src="/images/no-listing.jpg"
                alt="No properties found"
                width={400}
                height={400}
                className="mb-4"
              />
              <div className="flex flex-col items-center justify-center pt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600 text-center text-lg">
                  We couldn&apos;t find any properties matching your criteria.
                  Try adjusting your filters.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {properties.length} properties
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    priority={index === 0}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
