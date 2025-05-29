import { Property, PropertySummary, validateProperty } from "@/models/property";
import propertiesData from "@/data/properties.json";

type RawProperty = (typeof propertiesData.properties)[number];

export async function getAllProperties(): Promise<Property[]> {
  const properties = propertiesData.properties as RawProperty[];

  // Validate all properties
  const validProperties = properties.filter((p): p is Property =>
    validateProperty(p)
  );

  // Log any invalid properties
  if (validProperties.length !== properties.length) {
    console.error(
      "Some properties failed validation:",
      properties.filter((p) => !validateProperty(p))
    );
  }

  return validProperties;
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | undefined> {
  const property = propertiesData.properties.find(
    (property) => property.slug === slug
  ) as RawProperty | undefined;

  if (!property) {
    return undefined;
  }

  // Validate the property
  if (!validateProperty(property)) {
    console.error("Invalid property data structure:", property);
    return undefined;
  }

  return property;
}

export async function getPropertySummaries(): Promise<PropertySummary[]> {
  const properties = await getAllProperties();
  return properties.map((property) => ({
    id: property.id,
    slug: property.slug,
    title: property.title,
    price: property.price,
    location: {
      city: property.location.city,
      state: property.location.state,
    },
    rating: property.rating,
    thumbnail: property.thumbnail,
    shortDescription: property.description.split(".")[0] + ".",
  }));
}
