export interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  sizes: string[];
  colors: string[];
  description: string;
  image: string;
  isNewArrival: boolean;
  isTrending: boolean;
  isLimitedStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
