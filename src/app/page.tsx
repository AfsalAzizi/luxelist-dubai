"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import LocationFilter from "@/components/LocationFilter";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import { PropertySummary } from "@/models/property";
import { getAllProperties } from "@/lib/properties";
import Image from "next/image";

export default function Home() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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
      <h1 className="text-4xl font-bold mb-8">LuxeList Dubai</h1>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
