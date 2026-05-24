import React from 'react';
import { motion } from 'motion/react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

interface NewArrivalsProps {
  onProductClick: (product: Product) => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ onProductClick }) => {
  const newArrivals = products.filter(p => p.isNewArrival);

  return (
    <section id="arrivals" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-gray-100 pb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="serif text-5xl text-brand-dark">
              Latest <span className="italic">Collection</span>
            </h2>
          </motion.div>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-10 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-300">
            Discover Full Collection
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;
