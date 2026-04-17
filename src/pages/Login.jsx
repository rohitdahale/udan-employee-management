import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import loginImage from '../assets/assetforlogin.jpeg';
import { api } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const resp = await api.login({ email, password });
      login(resp.user, resp.token);
      addToast(`Welcome back! Logged in as ${resp.user.role.toUpperCase()}`, 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#001f0f]">
      
      {/* 70% Left Side - Illustration */}
      <div className="hidden lg:block lg:w-[70%] relative">
<img 
  src={loginImage}
  alt="Industrial Manufacturing"
  className="absolute inset-0 w-full h-full object-cover"
/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#003D1F]/90 via-[#003D1F]/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-16 pb-24">
           <div className="max-w-3xl">
             <div className="w-16 h-1 bg-[#66BB6A] mb-8 rounded-full"></div>
             <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">Precision. Quality. Trust..</h2>
             <p className="text-xl text-white/80 font-medium max-w-2xl leading-relaxed">Secure employee access portal for Udan Metaplast.</p>
           </div>
        </div>
      </div>

      {/* 30% Right Side - Login Form */}
      <div className="w-full lg:w-[30%] min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#003D1F] to-[#001a0c] relative px-8 sm:px-12 py-12 shadow-[-20px_0_40px_-5px_rgba(0,0,0,0.5)] z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#66BB6A] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-10 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto relative z-10"
        >
          <div className="flex flex-col items-start mb-10">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#66BB6A] to-[#E8F5E9] rounded-2xl flex items-center justify-center shadow-lg mb-6 shadow-[#66BB6A]/20">
              <Building2 className="text-[#003D1F] h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Welcome back</h1>
            <p className="text-[#66BB6A] font-medium text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-4 text-white/50 h-5 w-5 group-hover:text-[#66BB6A] transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Email Address" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66BB6A]/50 focus:border-[#66BB6A]/50 focus:bg-black/40 transition-all font-medium shadow-inner"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-4 text-white/50 h-5 w-5 group-hover:text-[#66BB6A] transition-colors" />
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="Password" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66BB6A]/50 focus:border-[#66BB6A]/50 focus:bg-black/40 transition-all font-medium shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-black/20 accent-[#66BB6A]" />
                <span className="text-white/70 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[#66BB6A] hover:text-white transition-colors font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#66BB6A] to-[#2E7D32] hover:opacity-90 text-white font-bold transition-all shadow-[0_4px_14px_0_rgba(102,187,106,0.39)] flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? 'Authenticating...' : 'Secure Login'}
                {!isLoading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>
          
          <div className="mt-auto pt-16 pb-4">
             <div className="text-left text-xs text-white/40 font-medium tracking-wide">
               &copy; {new Date().getFullYear()} Udan Metaplast. All rights reserved.
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
