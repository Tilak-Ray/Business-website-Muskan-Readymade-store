import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Plus } from 'lucide-react';
import { Product } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onAddProduct }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: Date.now().toString(),
    name: '',
    category: 'Women Kurti',
    material: '',
    sizes: ['M', 'L'],
    colors: ['White'],
    description: '',
    image: 'https://images.unsplash.com/photo-1610030469915-9a88edc1bf74?q=80&w=1000',
    tags: [],
    isNewArrival: true,
    isTrending: false,
    isLimitedStock: false
  });

  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput && !formData.tags?.includes(tagInput)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.startsWith('#') ? tagInput : `#${tagInput}`]
      });
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(formData as Product);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-brand-bg rounded-sm shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 ring-1 ring-brand-muted hover:bg-brand-muted rounded-full">
            <X className="w-5 h-5" />
          </button>

          <h2 className="serif text-4xl text-brand-dark mb-8">Admin <span className="italic">Inventory</span></h2>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Piece Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Category</label>
                <select 
                  className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Women Kurti</option>
                  <option>Saree</option>
                  <option>Tops</option>
                  <option>Men Shirts</option>
                  <option>Jackets</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Fabrication</label>
              <input 
                type="text" 
                value={formData.material}
                onChange={(e) => setFormData({...formData, material: e.target.value})}
                className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Hashtags (#silk #pattern)</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                />
                <button type="button" onClick={handleAddTag} className="p-2 bg-brand-dark text-white rounded-full">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.tags?.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-brand-badge-bg text-brand-badge-text text-[9px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                    {tag}
                    <X className="w-2 h-2 cursor-pointer" onClick={() => setFormData({...formData, tags: formData.tags?.filter(t => t !== tag)})} />
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-5 text-xs tracking-[0.3em]">
              Commit to Inventory
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminPanel;
