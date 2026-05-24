import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-bg">
      {/* Sidebar-style Left Content */}
      <div className="w-full lg:w-[420px] p-8 md:p-16 flex flex-col justify-center border-r border-brand-muted/30 bg-brand-card">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 bg-brand-badge-bg text-brand-badge-text text-[10px] font-bold uppercase tracking-widest rounded-full mb-8">
            Est. Belaha, Siraha
          </div>
          
          <h1 className="serif text-5xl md:text-7xl leading-[1.1] mb-8 font-light text-brand-dark">
            Modern <br />
            <span className="italic">Fashion</span> for <br />
            Every Soul.
          </h1>
          
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-[320px]">
            Discover the finest selection of Kurti, Saree, and contemporary ethnic wear in the heart of Belaha. Handpicked quality for local hearts.
          </p>
          
          <div className="flex flex-col gap-4">
            <motion.a
              href="#arrivals"
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-brand-muted flex items-center justify-center group-hover:bg-brand-muted transition-all">
                <ArrowRight className="h-5 w-5 text-brand-dark" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark">New Arrivals</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Explore Collection</p>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Main Hero Visual Area */}
      <div className="flex-1 relative min-h-[400px] lg:min-h-0 overflow-hidden bg-white">
        <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0"
        >
          <img
            src="/src/assets/images/boutique_hero_banner_1779646610132.png"
            alt="Boutique Hero"
            className="w-full h-full object-cover grayscale-[20%] brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-card/60 to-transparent"></div>
        </motion.div>

        {/* Featured Card Overlay */}
        <div className="absolute bottom-12 right-12 hidden md:block">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/50 max-w-sm"
           >
              <p className="serif text-2xl italic text-brand-dark mb-2">Join our local family.</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-primary">Open Daily: 9AM - 7PM</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-brand-muted overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Trusted by 500+ locals</p>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
