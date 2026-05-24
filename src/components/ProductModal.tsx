import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Ruler, Palette, Calendar, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 sm:pb-24 lg:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row rounded-sm"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white ring-1 ring-brand-muted hover:bg-brand-muted transition-colors rounded-full"
          >
            <X className="w-5 h-5 text-brand-dark" />
          </button>

          {/* Left: Image Side */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto relative bg-brand-card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right: Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto bg-brand-bg custom-scrollbar">
            <div className="flex items-center gap-2 text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4">
              {product.category}
            </div>
            
            <h2 className="serif text-4xl md:text-5xl text-brand-dark mb-6 leading-tight">{product.name}</h2>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-brand-badge-bg text-brand-badge-text border border-brand-accent/20">
                In Store Only
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-brand-muted/30">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sizes</h4>
                <p className="text-sm font-medium text-brand-dark">{product.sizes.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Fabric</h4>
                <p className="text-sm font-medium text-brand-dark">{product.material}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Colors</h4>
                <p className="text-sm font-medium text-brand-dark">{product.colors.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Heritage</h4>
                <p className="text-sm font-medium text-brand-dark">Local Nepal</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
               <button className="btn-primary w-full py-4 text-xs font-bold tracking-[0.3em]">
                 Visit Store in Belaha
               </button>
               <p className="text-[10px] text-center text-gray-400 italic">
                 Contact us for availability at +977 98XXXXXXX
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MapPin = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default ProductModal;
