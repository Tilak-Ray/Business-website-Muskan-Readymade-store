import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Heart, Star } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <MapPin className="h-6 w-6 text-gray-900" />,
      title: "Located in Belaha",
      description: "Conveniently situated in Siraha, Nepal, serving our local community with pride."
    },
    {
      icon: <Users className="h-6 w-6 text-gray-900" />,
      title: "Women's Fashion Expert",
      description: "Specialized in ethnic and modern women's wear with a premium touch."
    },
    {
      icon: <Heart className="h-6 w-6 text-gray-900" />,
      title: "Customer First",
      description: "Dedicated to providing the best shopping experience for every family member."
    },
    {
      icon: <Star className="h-6 w-6 text-gray-900" />,
      title: "Trusted Local Shop",
      description: "A reliable destination for quality readymade clothing at affordable prices."
    }
  ];

  return (
    <section id="about" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Our Heritage</span>
            <h2 className="serif text-4xl md:text-6xl text-brand-dark mb-8 leading-[1.1]">
              A Legacy of <span className="italic">Style</span> <br /> in Belaha, Siraha
            </h2>
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed max-w-xl">
              <p>
                Founded on the principles of quality and cultural pride, Muskan Readymade General Shop has become a cornerstone of fashion in Siraha. We curate each piece with the local identity in mind, blending tradition with modern trends.
              </p>
              <p>
                Our boutiques are designed to be sanctuaries of style, where every visitor is treated like family. We specialize in the intricate textures of regional women's wear, while providing an essential selection for men and children.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-brand-accent/30 flex items-center justify-center group-hover:bg-brand-accent transition-all">
                    {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4 group-hover:text-white' })}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-brand-dark uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-normal uppercase tracking-wider">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000" 
                alt="Shop Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Abstract decorative shape */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-pink rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-cream rounded-full blur-3xl opacity-60 z-0"></div>
            
            <div className="absolute bottom-10 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-xs font-bold">5.0</span>
              </div>
              <p className="text-sm font-medium text-gray-800 italic">"Best collection for kurtis in Siraha! Very friendly staff."</p>
              <p className="text-[10px] text-gray-400 mt-2">— Local Customer</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
