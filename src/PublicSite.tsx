import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';
import CategorySection from './components/CategorySection';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import MasonryGallery from './components/MasonryGallery';
import AdminPanel from './components/AdminPanel';
import { Product } from './types';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';

const PublicSite: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setDbProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      } catch (error) {
        console.error("Site fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar onSearch={setSearchQuery} onAdminToggle={() => window.location.href = '/login'} />
      
      <main>
        <Hero />
        <NewArrivals 
          onProductClick={setSelectedProduct} 
          searchQuery={searchQuery}
          customProducts={dbProducts}
        />
        {!searchQuery && <MasonryGallery />}
        <CategorySection />
        <About />
        <WhyChooseUs />
        <LocationSection />
        <ContactSection />
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PublicSite;
