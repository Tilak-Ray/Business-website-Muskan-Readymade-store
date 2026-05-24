import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Users, 
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react';
import { collection, query, getDocs, limit, orderBy, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    arrivals: 0,
    trending: 0,
    women: 0,
    men: 0
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const prodSnapshot = await getDocs(collection(db, 'products'));
        const allProds = prodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        
        setStats({
          total: allProds.length,
          arrivals: allProds.filter(p => p.status === 'New Arrival').length,
          trending: allProds.filter(p => p.status === 'Trending').length,
          women: allProds.filter(p => p.gender === 'Women').length,
          men: allProds.filter(p => p.gender === 'Men').length
        });

        // Fetch recent
        const recentQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(5));
        const recentSnapshot = await getDocs(recentQuery);
        setRecentProducts(recentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
        
        setLoading(false);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { label: 'Total Inventory', value: stats.total, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'New Arrivals', value: stats.arrivals, icon: Sparkles, color: 'bg-amber-50 text-amber-600' },
    { label: 'Trending Pieces', value: stats.trending, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Collection Reach', value: `${stats.women + stats.men}`, icon: Users, color: 'bg-purple-50 text-purple-600' },
  ];

  if (loading) {
    return (
      <div className="animate-pulse space-y-12">
        <div className="h-12 w-48 bg-gray-200 rounded-sm" />
        <div className="grid grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-sm" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="serif text-4xl text-brand-dark mb-2">Workspace <span className="italic">Overview</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Status: Optimal • {new Date().toLocaleDateString()}</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-all rounded-sm"
        >
          <Plus className="w-4 h-4" />
          Introduce New Piece
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 border border-brand-muted/10 shadow-sm hover:shadow-md transition-all flex justify-between items-start"
          >
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{card.label}</p>
              <h3 className="serif text-3xl text-brand-dark">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-full ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Products */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-brand-muted/10 pb-4">
            <h2 className="serif text-2xl text-brand-dark">Latest <span className="italic">Additions</span></h2>
            <Link to="/admin/products" className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 border border-brand-muted/10 flex items-center gap-6 group hover:border-brand-accent/30 transition-colors">
                <img 
                  src={product.image || product.images?.[0]} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover grayscale-[30%] group-hover:grayscale-0 transition-all rounded-sm"
                />
                <div className="flex-1">
                  <h4 className="text-[11px] font-bold text-brand-dark uppercase tracking-widest mb-1">{product.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category} • {product.gender}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    product.status === 'New Arrival' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {product.status}
                  </span>
                  <div className="flex items-center gap-1 text-[8px] text-gray-300 uppercase mt-2 font-medium">
                    <Clock className="w-3 h-3" />
                    {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity or Tips */}
        <div className="space-y-6">
          <h2 className="serif text-2xl text-brand-dark">Curation <span className="italic">Tips</span></h2>
          <div className="bg-brand-card p-8 space-y-6 border border-brand-muted/10">
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-brand-dark uppercase tracking-widest italic">Seasonal Focus</h5>
              <p className="text-xs text-gray-500 leading-relaxed">Consider highlighting #Silk fabrics as the festive season approaches for maximum engagement.</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-brand-dark uppercase tracking-widest italic">Stock Notice</h5>
              <p className="text-xs text-gray-500 leading-relaxed">3 items are currently marked as "Limited Stock". Ensure descriptions are detailed to capture interest.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
