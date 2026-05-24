import React, { useEffect, useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Grid, 
  ExternalLink,
  ChevronRight,
  Upload
} from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  type: 'Banner' | 'Gallery' | 'Hero';
}

const GalleryManagement: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ url: '', title: '', type: 'Gallery' as any });

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'gallery'));
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem)));
    } catch (error) {
      console.error("Gallery fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'gallery'), {
        ...newItem,
        createdAt: new Date().toISOString()
      });
      setItems([...items, { ...newItem, id: docRef.id }]);
      setIsAdding(false);
      setNewItem({ url: '', title: '', type: 'Gallery' });
    } catch (error) {
      console.error("Add gallery item error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove this asset from the visual manifest?")) {
       try {
        await deleteDoc(doc(db, 'gallery', id));
        setItems(items.filter(i => i.id !== id));
      } catch (error) {
        console.error("Delete gallery error:", error);
      }
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="serif text-4xl text-brand-dark mb-2">Visual <span className="italic">Atelier</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Brand Narrative & Asset Curation</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-all rounded-sm"
        >
          <Plus className="w-4 h-4" />
          Append Visual Asset
        </button>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [1,2,3,4].map(i => <div key={i} className="h-64 bg-white animate-pulse" />)
        ) : items.length === 0 ? (
          <div className="lg:col-span-4 p-24 bg-white border border-dashed border-brand-muted/30 text-center">
            <ImageIcon className="w-8 h-8 text-gray-200 mx-auto mb-4" />
            <p className="serif text-2xl text-gray-400 italic">Static brand assets detected.</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-4">Initialize the dynamic gallery by appending new assets.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white border border-brand-muted/10 group overflow-hidden">
               <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-dark/80 text-white text-[8px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                      {item.type}
                    </span>
                  </div>
               </div>
               <div className="p-4 bg-white border-t border-brand-muted/10">
                 <h4 className="text-[10px] font-bold text-brand-dark uppercase tracking-widest mb-1">{item.title || 'Untitled Motif'}</h4>
                 <div className="flex items-center gap-2 text-gray-400">
                    <ExternalLink className="w-3 h-3" />
                    <span className="text-[8px] font-medium uppercase truncate w-full">{item.url}</span>
                 </div>
               </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full bg-white p-12 relative shadow-2xl"
            >
              <h2 className="serif text-3xl text-brand-dark mb-8">Asset <span className="italic">Manifest</span></h2>
              
              <form onSubmit={handleAdd} className="space-y-8">
                <label className="block">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Visual URL</span>
                  <input 
                    type="url" 
                    value={newItem.url}
                    onChange={e => setNewItem({...newItem, url: e.target.value})}
                    required
                    placeholder="HTTPS://..."
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest"
                  />
                </label>
                
                <label className="block">
                   <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Asset Context</span>
                   <select 
                    value={newItem.type}
                    onChange={e => setNewItem({...newItem, type: e.target.value as any})}
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest cursor-pointer"
                   >
                     <option>Gallery</option>
                     <option>Banner</option>
                     <option>Hero</option>
                   </select>
                </label>

                <label className="block">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Asset Title</span>
                  <input 
                    type="text" 
                    value={newItem.title}
                    onChange={e => setNewItem({...newItem, title: e.target.value})}
                    placeholder="E.G. SUMMER COLLECTION"
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest"
                  />
                </label>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsAdding(false)}
                    className="flex-1 px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 btn-primary py-4 text-[10px]"
                  >
                    Commit Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryManagement;
