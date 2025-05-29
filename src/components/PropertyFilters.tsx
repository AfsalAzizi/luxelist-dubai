"use client";

import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";

interface PropertyFiltersProps {
  onLocationChange: (destinationId: string | null) => void;
  onPriceChange: (minPrice: number | null, maxPrice: number | null) => void;
}

export default function PropertyFilters({
  onLocationChange,
  onPriceChange,
}: PropertyFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <LocationFilter onFilterChange={onLocationChange} />
      <div className="border-t border-gray-100">
        <PriceRangeFilter onFilterChange={onPriceChange} />
      </div>
    </div>
  );
}
