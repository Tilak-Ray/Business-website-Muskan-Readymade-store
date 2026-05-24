import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { loginWithGoogle } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  // If already admin, redirect
  React.useEffect(() => {
    if (!loading && isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, loading, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      // Redirect handled by AuthContext change if they are admin
    } catch (error) {
      console.error("Login failure:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white shadow-2xl border border-brand-muted/20 overflow-hidden"
      >
        <div className="p-12 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="serif text-5xl text-brand-dark">Muskan</h1>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-8 bg-brand-muted/30"></span>
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em]">Management</span>
              <span className="h-[1px] w-8 bg-brand-muted/30"></span>
            </div>
          </div>

          <div className="bg-brand-card p-8 rounded-sm space-y-6">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
              AUTHORIZED ACCESS ONLY. PLEASE IDENTIFY YOURSELF TO PROCEED TO THE ADMINISTRATIVE ATELIER.
            </p>
            
            <div className="space-y-4 pt-4">
               <button 
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-4 bg-brand-dark text-white p-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-all group"
              >
                {isLoggingIn ? (
                  <span className="animate-pulse">Verifying...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Authenticate with Google
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-muted/10">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Secure Registry System v2.0</span>
            </div>
          </div>
        </div>

        {/* Decorative footer */}
        <div className="h-2 bg-brand-accent w-full" />
      </motion.div>
    </div>
  );
};

export default AdminLogin;
