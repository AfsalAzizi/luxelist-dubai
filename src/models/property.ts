export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
  };
  rating: number;
  thumbnail: string;
  images: {
    main: string;
    gallery: string[];
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
  };
  amenities: string[];
  propertyType: string;
  status: "for-sale" | "for-rent";
  yearBuilt: number;
  contactInfo: {
    agent: string;
    phone: string;
    email: string;
  };
}

export interface PropertySummary {
  id: string;
  slug: string;
  title: string;
  price: number;
  location: {
    city: string;
    state: string;
  };
  rating: number;
  thumbnail: string;
  shortDescription: string;
}

export function validateProperty(property: unknown): property is Property {
  if (!property || typeof property !== "object") return false;

  const p = property as Record<string, unknown>;

  // Check required fields
  if (
    typeof p.id !== "string" ||
    typeof p.slug !== "string" ||
    typeof p.title !== "string" ||
    typeof p.description !== "string" ||
    typeof p.price !== "number" ||
    typeof p.rating !== "number" ||
    typeof p.thumbnail !== "string" ||
    typeof p.propertyType !== "string" ||
    typeof p.status !== "string" ||
    typeof p.yearBuilt !== "number"
  ) {
    return false;
  }

  // Check location object
  if (!p.location || typeof p.location !== "object") return false;
  const location = p.location as Record<string, unknown>;
  if (
    typeof location.city !== "string" ||
    typeof location.state !== "string" ||
    typeof location.country !== "string" ||
    typeof location.address !== "string"
  ) {
    return false;
  }

  // Check images object
  if (!p.images || typeof p.images !== "object") return false;
  const images = p.images as Record<string, unknown>;
  if (
    typeof images.main !== "string" ||
    !Array.isArray(images.gallery) ||
    !images.gallery.every((img) => typeof img === "string")
  ) {
    return false;
  }

  // Check features object
  if (!p.features || typeof p.features !== "object") return false;
  const features = p.features as Record<string, unknown>;
  if (
    typeof features.bedrooms !== "number" ||
    typeof features.bathrooms !== "number" ||
    typeof features.area !== "number" ||
    typeof features.parking !== "number"
  ) {
    return false;
  }

  // Check amenities array
  if (
    !Array.isArray(p.amenities) ||
    !p.amenities.every((item) => typeof item === "string")
  ) {
    return false;
  }

  // Check contact info
  if (!p.contactInfo || typeof p.contactInfo !== "object") return false;
  const contactInfo = p.contactInfo as Record<string, unknown>;
  if (
    typeof contactInfo.agent !== "string" ||
    typeof contactInfo.phone !== "string" ||
    typeof contactInfo.email !== "string"
  ) {
    return false;
  }

  return true;
}
