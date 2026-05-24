import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group aspect-[4/5] overflow-hidden cursor-pointer bg-brand-card"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="serif text-3xl font-medium text-white mb-2">{category.name}</h3>
        <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Explore the artisans path
        </p>
      </div>
      
      {/* Decorative inner border on hover */}
      <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default CategoryCard;
