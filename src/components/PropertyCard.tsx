import { PropertySummary } from "@/models/property";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface PropertyCardProps {
  property: PropertySummary;
  priority?: boolean;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};

export default function PropertyCard({
  property,
  priority = false,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
        <div className="relative h-48 w-full">
          <Image
            src={property.thumbnail}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {property.title}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-yellow-400 text-base">★</span>
              <span className="ml-1">{property.rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 flex items-center">
            <MapPinIcon className="w-5 h-5 text-gray-400 mr-1.5" />
            {property.location.city}, {property.location.state}
          </p>

          <p className="text-sm text-gray-500 line-clamp-2">
            {property.shortDescription}
          </p>

          <hr className="my-2 border-gray-200" />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </span>
            <span
              className="ml-4 flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full bg-white transition-all duration-200 group-hover:border-blue-600 group-hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 focus:bg-blue-50 outline-none"
              tabIndex={0}
              aria-label="View Details"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
