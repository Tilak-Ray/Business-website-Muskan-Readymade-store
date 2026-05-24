import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, DollarSign, Smile, House, Sparkles } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality Materials",
      description: "We handpick each fabric to ensure comfort and long-lasting quality for our customers."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Trendy Fashion",
      description: "Stay ahead of the curve with our frequently updated collection of the latest styles."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Affordable Prices",
      description: "High-end style doesn't have to be expensive. We offer premium fashion at fair local prices."
    },
    {
      icon: <Smile className="w-8 h-8" />,
      title: "Friendly Service",
      description: "Our staff is dedicated to helping you find the perfect outfit in a welcoming boutique atmosphere."
    },
    {
      icon: <House className="w-8 h-8" />,
      title: "Trusted Local Shop",
      description: "Proudly serving Belaha for years with a reputation for honesty and style."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Latest Arrivals",
      description: "Something new every time you visit. We keep our collections fresh and exciting."
    }
  ];

  return (
    <section className="py-24 bg-brand-bg overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">THE MUSKAN PHILOSOPHY</span>
            <h2 className="serif text-4xl md:text-5xl text-brand-dark leading-tight">
              Crafted with <span className="italic">Purpose</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 bg-white border border-brand-muted/20 hover:border-brand-primary transition-all duration-500 group relative overflow-hidden rounded-sm shadow-sm"
            >
              <div className="w-12 h-12 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                {reason.icon}
              </div>
              <h3 className="serif text-2xl text-brand-dark mb-4">{reason.title}</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-medium">
                {reason.description}
              </p>
              
              {/* Decorative corner tag */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-badge-bg rotate-45 group-hover:bg-brand-primary transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
