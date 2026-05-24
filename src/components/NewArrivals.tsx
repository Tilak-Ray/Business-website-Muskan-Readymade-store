import React from 'react';
import { motion } from 'motion/react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

interface NewArrivalsProps {
  onProductClick: (product: Product) => void;
  searchQuery: string;
  customProducts: Product[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ onProductClick, searchQuery, customProducts }) => {
  const allProducts = [...products, ...customProducts];
  
  const filteredProducts = allProducts.filter(p => {
    if (!searchQuery) return p.isNewArrival;

    const query = searchQuery.toLowerCase().trim();
    
    // 1. Primary check: Name or Category
    const nameMatch = p.name.toLowerCase().includes(query);
    const categoryMatch = p.category.toLowerCase().includes(query);
    
    if (nameMatch || categoryMatch) return true;
    
    // 2. Explicit Fallback: Tags
    if (p.tags && p.tags.length > 0) {
      const queryWithoutHash = query.startsWith('#') ? query.slice(1) : query;
      return p.tags.some(tag => {
        const tagText = tag.toLowerCase().startsWith('#') ? tag.slice(1).toLowerCase() : tag.toLowerCase();
        return tagText.includes(queryWithoutHash);
      });
    }
    
    return false;
  });

  return (
    <section id="arrivals" className="py-24 bg-white min-h-[400px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-gray-100 pb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="serif text-5xl text-brand-dark">
              {searchQuery ? (
                <>Found <span className="italic">Result</span></>
              ) : (
                <>Latest <span className="italic">Collection</span></>
              )}
            </h2>
          </motion.div>
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary"
            >
              <span className="cursor-pointer hover:opacity-100">Women</span>
              <span className="text-gray-200">|</span>
              <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">Men</span>
              <span className="text-gray-200">|</span>
              <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">Kids</span>
            </motion.div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-card rounded-sm border border-brand-muted/20">
            <p className="serif text-4xl italic text-gray-400">No pieces found matching your search.</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-4">Try searching for #silk #festive or piece names.</p>
          </div>
        )}

        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button className="px-10 py-4 border-2 border-brand-dark text-brand-dark font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-white transition-all duration-300">
              Discover Full Collection
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
