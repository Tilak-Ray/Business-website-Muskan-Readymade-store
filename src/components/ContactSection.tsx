import React from 'react';
import { motion } from 'motion/react';
import { Send, PhoneCall } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-brand-card p-10 md:p-20 border border-brand-muted/30 flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Connections</span>
            <h2 className="serif text-4xl md:text-5xl text-brand-dark mb-8 leading-tight">
              Begin your <br /><span className="italic">Sartorial Journey</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-12 uppercase tracking-widest font-medium">
              For rare finds, bespoke size inquiries, or simply to greet our curators, we invite your message.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atelier Direct</h4>
                  <p className="serif text-2xl text-brand-dark">9807843158</p>
                </div>
              </div>
              <div className="pt-8 border-t border-brand-muted/30">
                <p className="text-[10px] text-gray-400 italic font-medium tracking-widest uppercase mb-4">
                  info@muskan-readymade-store.vercel.app
                </p>
                <p className="text-[10px] text-gray-400 italic font-medium tracking-widest uppercase">
                  * Note: Purchases are honored exclusively in person at our physical boutique.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-8 md:p-12 shadow-sm border border-brand-muted/20">
            <form 
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const phone = formData.get('phone');
                const message = formData.get('message');
                const mailtoUrl = `mailto:tilakraykurmi@gmail.com?subject=Inquiry from ${name}&body=Name: ${name}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
                window.location.href = mailtoUrl;
              }}
            >
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[9px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">Your Identity</label>
                  <input 
                    name="name"
                    type="text" 
                    placeholder="NAME"
                    required
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                  />
                </div>
                <div className="group">
                  <label className="block text-[9px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">Registry Phone</label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="+977"
                    required
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">Inquiry Details</label>
                <textarea 
                  name="message"
                  rows={4}
                  required
                  placeholder="WHICH PIECE HAS CAPTURED YOUR ATTENTION?"
                  className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-primary py-5 text-[11px] tracking-[0.3em]"
              >
                Honor Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
