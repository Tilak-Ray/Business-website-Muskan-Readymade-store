import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

const LocationSection: React.FC = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "Belaha, Siraha, Nepal",
      sub: "Muskan Readymade Ward 4"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "9807843158",
      sub: "Available 10 AM - 8 PM"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Opening Hours",
      value: "10:00 AM - 08:00 PM",
      sub: "Monday to Saturday"
    }
  ];

  return (
    <section id="location" className="py-24 bg-brand-dark text-brand-bg overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4 block">Visit Our Sanctuary</span>
            <h2 className="serif text-4xl md:text-6xl mb-8 leading-tight">
              Quality Fashion <br /> <span className="italic">At Your Doorstep</span>
            </h2>
            
            <div className="space-y-10">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">{info.label}</h4>
                    <p className="serif text-2xl mb-1">{info.value}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[600px] relative shadow-2xl bg-brand-card flex items-center justify-center overflow-hidden border border-white/10"
          >
            {/* Map Placeholder */}
            <div className="text-center p-12 relative z-10">
               <div className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                 <MapPin className="w-10 h-10 text-brand-accent" />
               </div>
               <h3 className="serif text-4xl italic text-brand-bg mb-4">Belaha, Siraha</h3>
               <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed uppercase tracking-widest">
                 A JOURNEY OF A THOUSAND STYLES BEGINS HERE.
               </p>
               <a 
                 href="https://www.google.com/maps/place/muskan+readymade+and+general+store/@26.7020321,86.2135602,830m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ec21db7ce53b31:0x2ed821d609827e92!8m2!3d26.7020321!4d86.2135602!16s%2Fg%2F11sv0y8g82?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block px-10 py-4 bg-brand-bg text-brand-dark font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all"
               >
                 Open Directions
               </a>
            </div>
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none grayscale" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/pinstripe.png)' }}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
