import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'women',
    name: "Women's Collection",
    description: 'Elegant and trendy fashion for the modern woman.',
    image: '/src/assets/images/women_collection_category_1779646627709.png'
  },
  {
    id: 'men',
    name: "Men's Collection",
    description: 'Casual and formal wear for the contemporary man.',
    image: '/src/assets/images/men_collection_category_1779646644494.png'
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
    material: 'Pure Silk',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Emerald Green', 'Royal Blue', 'Maroon'],
    description: 'A luxurious silk kurti with intricate embroidery, perfect for festive occasions and elegant gatherings.',
    image: 'https://images.unsplash.com/photo-1610030469915-9a88edc1bf74?q=80&w=1000',
    isNewArrival: true,
    isTrending: true,
    isLimitedStock: false
  },
  {
    id: '2',
    name: 'Embroidered Chiffon Saree',
    category: 'Saree',
    material: 'Chiffon',
    sizes: ['Free Size'],
    colors: ['Soft Pink', 'Lavender', 'Peach'],
    description: 'Lightweight and graceful chiffon saree with delicate stone work and a matching blouse piece.',
    image: 'https://images.unsplash.com/photo-1610030469668-935142764eed?q=80&w=1000',
    isNewArrival: true,
    isTrending: false,
    isLimitedStock: true
  },
  {
    id: '3',
    name: 'Cotton Floral Top',
    category: 'Tops',
    material: 'High-quality Cotton',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Light Blue', 'Yellow'],
    description: 'Breathable and stylish floral print top, ideal for casual outings and warm summer days.',
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1000',
    isNewArrival: false,
    isTrending: true,
    isLimitedStock: false
  },
  {
    id: '4',
    name: 'Slim Fit Denim Jeans',
    category: 'Jeans',
    material: 'Stretchable Denim',
    sizes: ['28', '30', '32', '34'],
    colors: ['Deep Blue', 'Light Wash', 'Black'],
    description: 'Classic slim-fit denim jeans that offer both comfort and a modern silhouette.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000',
    isNewArrival: true,
    isTrending: false,
    isLimitedStock: false
  },
  {
    id: '5',
    name: 'Designer Salwar Set',
    category: 'Salwar Set',
    material: 'Cotton Silk Blend',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Olive Green', 'Mustard', 'Dusty Rose'],
    description: 'Comes with a beautifully tailored kameez, comfortable salwar, and a matching dupatta.',
    image: 'https://images.unsplash.com/photo-1583391733975-ad939920364d?q=80&w=1000',
    isNewArrival: false,
    isTrending: false,
    isLimitedStock: false
  },
  {
    id: '6',
    name: 'Casual Checkered Shirt',
    category: 'Men Shirts',
    material: 'Linen Cotton',
    sizes: ['M', 'L', 'XL'],
    colors: ['Red/Navy', 'Green/Black', 'Blue/White'],
    description: 'A versatile checkered shirt for men, perfect for both office wear and casual weekends.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000',
    isNewArrival: true,
    isTrending: false,
    isLimitedStock: false
  },
  {
    id: '7',
    name: 'Graphic Print T-Shirt',
    category: 'Men T-shirts',
    material: '100% Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    description: 'Trendy graphic T-shirt with high-quality print and a comfortable relaxed fit.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000',
    isNewArrival: false,
    isTrending: true,
    isLimitedStock: false
  },
  {
    id: '8',
    name: 'Style Bomber Jacket',
    category: 'Jackets',
    material: 'Nylon Blend',
    sizes: ['M', 'L', 'XL'],
    colors: ['Army Green', 'Black', 'Tan'],
    description: 'Lightweight bomber jacket that adds a stylish layer to any outfit while keeping you comfortable.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',
    isNewArrival: true,
    isTrending: true,
    isLimitedStock: true
  }
];
