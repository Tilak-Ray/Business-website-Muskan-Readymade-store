import { Product, Category } from '../types';

// Importing local images to ensure Vite bundles them correctly
import heroBanner from '../assets/images/boutique_hero_banner_1779646610132.png';
import womenCategory from '../assets/images/women_collection_category_1779646627709.png';
import menCategory from '../assets/images/men_collection_category_1779646644494.png';

export const ASSETS = {
  heroBanner,
  womenCategory,
  menCategory
};

export const categories: Category[] = [
  {
    id: 'women',
    name: "Women's Collection",
    description: 'Elegant and trendy fashion for the modern woman.',
    image: womenCategory
  },
  {
    id: 'men',
    name: "Men's Collection",
    description: 'Casual and formal wear for the contemporary man.',
    image: menCategory
  },
  {
    id: 'traditional',
    name: 'Traditional Wear',
    description: 'Beautiful ethnic clothing for special occasions.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000'
  },
  {
    id: 'casual',
    name: 'Casual Wear',
    description: 'Comfortable everyday outfits for your lifestyle.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Silk Kurti',
    category: 'Women Kurti',
    gender: 'Women',
    material: 'Pure Silk',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Emerald Green', 'Royal Blue', 'Maroon'],
    description: 'A luxurious silk kurti with intricate embroidery, perfect for festive occasions and elegant gatherings.',
    image: 'https://images.unsplash.com/photo-1610030469915-9a88edc1bf74?q=80&w=1000',
    isNewArrival: true,
    isTrending: true,
    status: 'New Arrival',
    featured: true,
    availability: true,
    price: 3500,
    tags: ['#ethnic', '#silk', '#festive', '#premium'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Embroidered Chiffon Saree',
    category: 'Saree',
    gender: 'Women',
    material: 'Chiffon',
    sizes: ['Free Size'],
    colors: ['Soft Pink', 'Lavender', 'Peach'],
    description: 'Lightweight and graceful chiffon saree with delicate stone work and a matching blouse piece.',
    image: 'https://images.unsplash.com/photo-1610030469668-935142764eed?q=80&w=1000',
    isNewArrival: true,
    isTrending: false,
    status: 'New Arrival',
    featured: false,
    availability: true,
    price: 4200,
    tags: ['#saree', '#partywear', '#chiffon', '#elegant'],
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Cotton Floral Top',
    category: 'Tops',
    gender: 'Women',
    material: 'High-quality Cotton',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Light Blue', 'Yellow'],
    description: 'Breathable and stylish floral print top, ideal for casual outings and warm summer days.',
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1000',
    isNewArrival: false,
    isTrending: true,
    status: 'Trending',
    featured: true,
    availability: true,
    price: 1500,
    tags: ['#casual', '#floral', '#cotton', '#summer'],
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Slim Fit Denim Jeans',
    category: 'Jeans',
    gender: 'Unisex',
    material: 'Stretchable Denim',
    sizes: ['28', '30', '32', '34'],
    colors: ['Deep Blue', 'Light Wash', 'Black'],
    description: 'Classic slim-fit denim jeans that offer both comfort and a modern silhouette.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000',
    isNewArrival: true,
    isTrending: false,
    status: 'New Arrival',
    featured: false,
    availability: true,
    price: 2800,
    tags: ['#denim', '#slimfit', '#men', '#women', '#essential'],
    createdAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Designer Salwar Set',
    category: 'Salwar Set',
    gender: 'Women',
    material: 'Cotton Silk Blend',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Olive Green', 'Mustard', 'Dusty Rose'],
    description: 'Comes with a beautifully tailored kameez, comfortable salwar, and a matching dupatta.',
    image: 'https://images.unsplash.com/photo-1583391733975-ad939920364d?q=80&w=1000',
    isNewArrival: false,
    isTrending: false,
    status: 'Regular',
    featured: false,
    availability: true,
    price: 3200,
    tags: ['#salwar', '#designer', '#comfort', '#dailywear'],
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Casual Checkered Shirt',
    category: 'Men Shirts',
    gender: 'Men',
    material: 'Linen Cotton',
    sizes: ['M', 'L', 'XL'],
    colors: ['Red/Navy', 'Green/Black', 'Blue/White'],
    description: 'A versatile checkered shirt for men, perfect for both office wear and casual weekends.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000',
    isNewArrival: true,
    isTrending: false,
    status: 'New Arrival',
    featured: false,
    availability: true,
    price: 1800,
    tags: ['#men', '#shirt', '#office', '#casual', '#checkered'],
    createdAt: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Graphic Print T-Shirt',
    category: 'Men T-shirts',
    gender: 'Men',
    material: '100% Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    description: 'Trendy graphic T-shirt with high-quality print and a comfortable relaxed fit.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000',
    isNewArrival: false,
    isTrending: true,
    status: 'Trending',
    featured: false,
    availability: true,
    price: 1200,
    tags: ['#men', '#tshirt', '#graphic', '#young', '#streetwear'],
    createdAt: '2024-01-07T00:00:00Z'
  },
  {
    id: '8',
    name: 'Style Bomber Jacket',
    category: 'Jackets',
    gender: 'Men',
    material: 'Nylon Blend',
    sizes: ['M', 'L', 'XL'],
    colors: ['Army Green', 'Black', 'Tan'],
    description: 'Lightweight bomber jacket that adds a stylish layer to any outfit while keeping you comfortable.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',
    isNewArrival: true,
    isTrending: true,
    status: 'New Arrival',
    featured: true,
    availability: true,
    price: 4500,
    tags: ['#winter', '#jacket', '#style', '#men', '#trending'],
    createdAt: '2024-01-08T00:00:00Z'
  }
];
