export interface Product {
  id: string;
  name: string;
  category: string;
  gender: 'Women' | 'Men' | 'Unisex';
  material: string;
  sizes: string[];
  colors: string[];
  description: string;
  image: string;
  images?: string[];
  isNewArrival: boolean;
  isTrending: boolean;
  status: 'New Arrival' | 'Trending' | 'Regular';
  featured: boolean;
  availability: boolean;
  price: number;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
