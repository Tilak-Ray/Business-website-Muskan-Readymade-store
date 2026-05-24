import React from 'react';
import { motion } from 'motion/react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/products';

const CategorySection: React.FC = () => {
  return (
    <section id="categories" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center text-center max-w-4xl mx-auto mb-16 px-6 py-12 bg-brand-card border border-brand-muted/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Curated Collections</span>
            <h2 className="serif text-4xl md:text-6xl text-brand-dark mb-6">
              A Symphony of <br /><span className="italic">Texture & Tradition</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
