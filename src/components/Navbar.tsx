import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
  onAdminToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onAdminToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Arrivals', href: '#arrivals' },
    { name: 'Categories', href: '#categories' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-brand-muted/40 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="serif text-3xl font-semibold tracking-wide uppercase text-brand-dark leading-none">
                MUSKAN
              </span>
              <span className="text-[8px] tracking-[0.3em] opacity-70 text-brand-dark uppercase">
                READYMADE GENERAL SHOP
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors relative group text-brand-dark"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const element = document.getElementById('arrivals');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative flex items-center bg-brand-card/50 hover:bg-brand-card px-4 py-2 rounded-full border border-brand-muted transition-all duration-300 group focus-within:ring-1 focus-within:ring-brand-primary focus-within:border-brand-primary"
            >
              <Search className="h-3.5 w-3.5 text-brand-primary/60 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search pieces or #tags..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent border-none text-[9px] uppercase tracking-[0.2em] focus:ring-0 focus:outline-none w-44 ml-2 font-bold text-brand-dark placeholder:text-gray-400"
              />
            </form>
            {isAdmin ? (
              <Link 
                to="/admin"
                className="flex items-center gap-2 text-[10px] font-bold text-brand-accent hover:text-brand-dark transition-colors uppercase tracking-widest"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/login"
                className="text-[10px] font-bold text-brand-accent hover:text-brand-dark transition-colors uppercase tracking-widest"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-bold text-brand-accent hover:bg-brand-card rounded-lg transition-all uppercase tracking-widest"
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-4 px-3">
                <div className="relative flex items-center bg-brand-bg p-3 rounded-sm border border-brand-muted/20">
                  <Search className="h-4 w-4 text-brand-dark mr-3" />
                  <input 
                    type="text"
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-transparent border-none text-xs uppercase tracking-widest focus:ring-0 focus:outline-none w-full font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
