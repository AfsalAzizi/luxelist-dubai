export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
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
  contactInfo: {
    agent: string;
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    area: string;
  };
  status: "available" | "sold" | "pending";
  type: "villa" | "apartment" | "penthouse" | "townhouse";
  createdAt: string;
  updatedAt: string;
}
