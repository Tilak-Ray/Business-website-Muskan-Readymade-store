import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently remove this piece from inventory?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || p.category === filter || p.gender === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', 'Women Kurti', 'Saree', 'Men Shirt', 'Women', 'Men'];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="serif text-4xl text-brand-dark mb-2">Master <span className="italic">Inventory</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{products.length} Active Records</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-all rounded-sm"
        >
          <Plus className="w-4 h-4" />
          Introduce New Piece
        </Link>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-brand-muted/10">
        <div className="flex-1 relative flex items-center bg-brand-bg px-4 rounded-sm border border-brand-muted/20">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-[10px] uppercase font-bold tracking-widest focus:ring-0 placeholder:text-gray-300 py-3 ml-3"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-sm">
            <Filter className="w-3 h-3 text-brand-primary" />
            <select 
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest focus:ring-0 p-0 pr-6"
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-muted/10 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-brand-muted/10">
              <th className="p-6 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Asset</th>
              <th className="p-6 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Taxonomy</th>
              <th className="p-6 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Status</th>
              <th className="p-6 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Registry</th>
              <th className="p-6 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Value</th>
              <th className="p-6 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-muted/10">
            {loading ? (
              [1,2,3,4].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="p-6 h-20 bg-gray-50/50" />
                </tr>
              ))
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-24 text-center">
                  <p className="serif text-2xl text-gray-400 italic">No inventory records found matching your query.</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-brand-card/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image || product.images?.[0]} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover grayscale-[30%] group-hover:grayscale-0 transition-all rounded-sm"
                      />
                      <div>
                        <p className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{product.name}</p>
                        <p className="text-[8px] text-gray-400 uppercase font-medium mt-1">ID: {product.id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[9px] font-bold text-brand-primary/60 uppercase tracking-widest">{product.category}</span>
                    <span className="block text-[8px] text-gray-400 uppercase mt-1 font-medium italic">{product.gender}</span>
                  </td>
                  <td className="p-6">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      product.status === 'New Arrival' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 
                      product.status === 'Trending' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                      'bg-gray-50 text-gray-400 border border-gray-200'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      {product.availability ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-[9px] font-bold text-brand-dark uppercase tracking-widest">
                        {product.availability ? 'Active' : 'Archived'}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] font-bold text-brand-dark tabular-nums tracking-widest">NPR {product.price || '-'}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="p-2 text-gray-400 hover:text-brand-dark transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
