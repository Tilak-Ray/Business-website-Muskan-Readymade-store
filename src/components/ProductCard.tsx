import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-brand-card mb-4 overflow-hidden rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-brand-dark text-white text-[9px] px-2 py-1 uppercase tracking-tighter shadow-sm font-semibold">
              New Arrival
            </span>
          )}
          {product.isTrending && (
            <span className="bg-brand-accent text-white text-[9px] px-2 py-1 uppercase tracking-tighter shadow-sm font-semibold">
              Trending
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
             onClick={(e) => { e.stopPropagation(); onClick(product); }}
             className="px-6 py-2 bg-white text-brand-dark text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all shadow-xl"
           >
             Quick View
           </button>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="serif text-xl font-medium text-brand-dark group-hover:italic transition-all duration-300">
            {product.name}
          </h3>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
            {product.material} | {product.category}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {product.price > 0 && (
            <span className="text-[11px] font-bold text-brand-dark tabular-nums tracking-widest bg-brand-primary/5 px-2 py-0.5 rounded-sm">
              NPR {product.price}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase py-0.5 px-2 border border-brand-muted text-gray-400">
            Available
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
