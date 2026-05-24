import React from 'react';
import { motion } from 'motion/react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000',
    title: 'Boutique Interior',
    span: 'col-span-1 row-span-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000',
    title: 'Customer Style',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000',
    title: 'Collection Grid',
    span: 'col-span-2 row-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1539109132382-381bb3f1cff6?q=80&w=1000',
    title: 'Fashion Detail',
    span: 'col-span-1 row-span-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000',
    title: 'Store Display',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000',
    title: 'Ethnic Texture',
    span: 'col-span-1 row-span-1'
  }
];

const MasonryGallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Lifestyle & Soul</span>
          <h2 className="serif text-4xl md:text-5xl text-brand-dark mb-6">
            Capturing the <span className="italic">Muskan Spirit</span>
          </h2>
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em] max-w-lg mx-auto">
            A glimpse into our sanctuary of style and the community that brings it to life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 md:gap-6 h-[600px] md:h-[800px]">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden group rounded-sm ${image.span}`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="serif text-white text-xl italic">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryGallery;
