import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('employee');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login({
        id: role === 'admin' ? 'EMP001' : role === 'hr' ? 'EMP003' : 'EMP042',
        name: role === 'admin' ? 'Admin Manager' : role === 'hr' ? 'HR Director' : 'Rohit Sharma',
        role: role
      });
      addToast(`Welcome back! Logged in as ${role.toUpperCase()}`, 'success');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003D1F] via-[#2E7D32] to-[#002611] relative overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#66BB6A] rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#E8F5E9] rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel-dark rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#66BB6A] to-[#E8F5E9] rounded-2xl flex items-center justify-center shadow-lg mb-4 hover:rotate-[10deg] transition-transform duration-300">
              <Building2 className="text-[#003D1F] h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Udan Metaplast</h1>
            <p className="text-[#66BB6A] font-medium text-sm text-center">Enterprise Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group flex items-center">
                <Shield className="absolute left-4 z-10 text-white/50 h-5 w-5 transition-colors" />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#66BB6A] focus:bg-black/40 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="employee" className="text-black">Standard Employee</option>
                  <option value="hr" className="text-black">HR Executive</option>
                  <option value="admin" className="text-black">System Admin</option>
                </select>
              </div>
            
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-white/50 h-5 w-5 group-hover:text-[#66BB6A] transition-colors" />
                <input 
                  type="text" 
                  required
                  defaultValue="demo@udan.com"
                  placeholder="Employee ID / Email" 
                  className="w-full bg-black/20 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66BB6A] focus:bg-black/30 transition-all font-medium"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-white/50 h-5 w-5 group-hover:text-[#66BB6A] transition-colors" />
                <input 
                  type="password" 
                  required
                  defaultValue="password"
                  placeholder="Password" 
                  className="w-full bg-black/20 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66BB6A] focus:bg-black/30 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
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
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#66BB6A] to-[#2E7D32] hover:opacity-90 text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-75"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? 'Authenticating...' : `Login as ${role.toUpperCase()}`}
                {!isLoading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-white/40 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Udan Metaplast. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
