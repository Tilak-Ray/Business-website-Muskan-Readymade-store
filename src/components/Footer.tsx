import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-bg pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-8">
            <a href="#" className="flex flex-col">
              <span className="serif text-3xl font-semibold tracking-wide uppercase text-white leading-none">
                MUSKAN
              </span>
              <span className="text-[8px] tracking-[0.3em] opacity-50 text-white uppercase mt-1">
                READYMADE GENERAL SHOP
              </span>
            </a>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs uppercase tracking-widest">
              WEAVING TRADITION INTO MODERNITY. EST 2012 BELAHA, SIRAHA. 
              <br />
              TEL: 9807843158
              <br />
              info@muskan-readymade-store.vercel.app
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-8">Collections</h4>
            <ul className="space-y-4">
              {['New Arrivals', 'Women Collection', 'Men Collection', 'Trending Now', 'Bridal Wear'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-8">The Registry</h4>
            <ul className="space-y-4">
              {['Our Story', 'Visit Store', 'Product Inquiry', 'Size Guide', 'Ethical Sourcing'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-8">Newsletter</h4>
            <p className="text-gray-400 text-[10px] mb-6 uppercase tracking-widest">Be the first to hear about new cultural arrivals.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="w-full pl-0 pr-14 py-3 bg-transparent border-b border-white/20 focus:border-brand-accent text-white text-[10px] focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-600"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 bottom-0 text-[10px] font-bold uppercase text-brand-accent hover:text-white transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-gray-500 uppercase tracking-[0.2em]">
          <p>© {currentYear} Muskan Readymade General Shop. Belaha, Siraha.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Digital Atelier</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
