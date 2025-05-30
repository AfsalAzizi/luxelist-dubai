"use client";

import { useState } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface PriceRangeFilterProps {
  onFilterChange: (minPrice: number | null, maxPrice: number | null) => void;
}

const priceRanges = [
  { label: "All Prices", value: "all", min: null, max: null },
  {
    label: "Below 35,000,000 AED",
    value: "below-35m",
    min: null,
    max: 35000000,
  },
  {
    label: "Below 40,000,000 AED",
    value: "below-40m",
    min: null,
    max: 40000000,
  },
  {
    label: "Below 45,000,000 AED",
    value: "below-45m",
    min: null,
    max: 45000000,
  },
  {
    label: "Above 45,000,000 AED",
    value: "above-45m",
    min: 45000000,
    max: null,
  },
];

export default function PriceRangeFilter({
  onFilterChange,
}: PriceRangeFilterProps) {
  const [selectedRange, setSelectedRange] = useState<string>("all");

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedRange(value);

    const range = priceRanges.find((r) => r.value === value);
    if (range) {
      onFilterChange(range.min, range.max);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>

      <RadioGroup
        value={selectedRange}
        onChange={handleRangeChange}
        className="space-y-1"
      >
        {priceRanges.map((range) => (
          <FormControlLabel
            key={range.value}
            value={range.value}
            control={<Radio size="small" />}
            label={range.label}
            className="hover:bg-gray-50 rounded-md px-2 py-0.5 cursor-pointer text-sm"
          />
        ))}
      </RadioGroup>
    </div>
  );
}
