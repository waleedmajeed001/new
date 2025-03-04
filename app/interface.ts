// Define an interface for the image structure
interface ProductImage {
  url: string;
  alt?: string; // Optional alt text
}

// Simplified product interface
export interface SimplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
}

// Full product interface
export interface FullProduct {
  _id: string;
  images: ProductImage[]; // Array of image objects
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
}
