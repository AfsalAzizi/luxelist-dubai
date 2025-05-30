"use client";

interface LocationFilterProps {
  onFilterChange: (destinationId: string | null) => void;
}

const locations = [
  { id: "dubai", name: "Dubai" },
  { id: "abu-dhabi", name: "Abu Dhabi" },
  { id: "sharjah", name: "Sharjah" },
  { id: "ajman", name: "Ajman" },
  { id: "ras-al-khaimah", name: "Ras Al Khaimah" },
];

export default function LocationFilter({
  onFilterChange,
}: LocationFilterProps) {
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange(value || null);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Location</h3>
      <select
        onChange={handleLocationChange}
        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none"
        defaultValue=""
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
}
