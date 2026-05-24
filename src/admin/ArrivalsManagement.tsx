import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  LayoutGrid,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Link } from 'react-router-dom';

const ArrivalsManagement: React.FC = () => {
  const [arrivals, setArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArrivals = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), where('status', '==', 'New Arrival'));
      const snapshot = await getDocs(q);
      setArrivals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      console.error("Error fetching arrivals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArrivals();
  }, []);

  const toggleFeatured = async (product: Product) => {
    try {
      await updateDoc(doc(db, 'products', product.id), {
        featured: !product.featured
      });
      setArrivals(arrivals.map(p => p.id === product.id ? { ...p, featured: !p.featured } : p));
    } catch (error) {
      console.error("Feature toggle error:", error);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="serif text-4xl text-brand-dark mb-2">Curated <span className="italic">Arrivals</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Front-Row Collection Management</p>
        </div>
        <Link 
          to="/admin/products"
          className="flex items-center gap-2 px-6 py-3 bg-white border border-brand-muted/30 text-brand-dark text-[10px] font-bold uppercase tracking-widest hover:bg-brand-card transition-all rounded-sm"
        >
          Manage All Products
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white animate-pulse" />)
        ) : arrivals.length === 0 ? (
          <div className="lg:col-span-3 p-24 bg-white border border-dashed border-brand-muted/30 text-center">
            <Sparkles className="w-8 h-8 text-gray-200 mx-auto mb-4" />
            <p className="serif text-2xl text-gray-400 italic">No pieces currently marked as New Arrivals.</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-4">Update product status in the inventory manifest.</p>
          </div>
        ) : (
          arrivals.map((product) => (
            <div key={product.id} className="bg-white border border-brand-muted/10 group overflow-hidden">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={product.image || product.images?.[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => toggleFeatured(product)}
                    className={`p-3 rounded-full transition-all border ${
                      product.featured 
                      ? 'bg-amber-400 border-amber-400 text-white shadow-lg' 
                      : 'bg-white/90 border-white/20 text-gray-300 hover:text-amber-400'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[11px] font-bold text-brand-dark uppercase tracking-widest">{product.name}</h3>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">{product.category}</p>
                  </div>
                  <Link to={`/admin/products/edit/${product.id}`} className="text-gray-300 hover:text-brand-dark transition-colors">
                    <LayoutGrid className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-brand-muted/10">
                   <div className="flex items-center gap-2">
                     <Zap className={`w-3 h-3 ${product.featured ? 'text-amber-500' : 'text-gray-200'}`} />
                     <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                       {product.featured ? 'Featured on Main' : 'Regular Arrival'}
                     </span>
                   </div>
                   <span className="text-[10px] font-bold text-brand-dark tabular-nums tracking-widest">NPR {product.price}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArrivalsManagement;
