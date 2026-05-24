import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NewArrivals from './components/NewArrivals';
import CategorySection from './components/CategorySection';
import WhyChooseUs from './components/WhyChooseUs';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import { Product } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* New Arrivals Section */}
        <NewArrivals onProductClick={setSelectedProduct} />

        {/* Categories Section */}
        <CategorySection />

        {/* About Section */}
        <About />

        {/* Product Gallery Section (Implicit in New Arrivals + Category highlights) */}
        {/* We can add a "Trending" grid if needed, but let's stick to the flow */}

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Location Section */}
        <LocationSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Scroll to Top button could be added here, but keep it clean */}
    </div>
  );
}
