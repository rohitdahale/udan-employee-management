import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building2, Edit } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function Profile() {
  const { user } = useAuth();
  const { state } = useData();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 text-gray-500">
        Loading profile...
      </div>
    );
  }

  // Merge authentication user details with full employee info from database state
  const profileUser = {
    ...user,
    ...(state.employees.find(emp => emp.id === user?.id || emp.empId === user?.id || emp.email === user?.email) || {})
  };

  const initial = profileUser.name ? profileUser.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-white">
        <div className="h-40 bg-gradient-to-r from-[#003D1F] via-[#00522A] to-[#2E7D32] relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        <div className="px-6 md:px-10 pb-10 relative">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 gap-4">
            <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-xl -mt-16 overflow-hidden flex items-center justify-center relative z-10">
              <div className="w-full h-full bg-[#E8F5E9] text-[#003D1F] flex items-center justify-center text-5xl font-bold tracking-tighter">{initial}</div>
            </div>
            <Button variant="outline" className="hidden sm:flex"><Edit className="w-4 h-4 mr-2" /> Edit Profile</Button>
          </div>
          
          <div className="text-center sm:text-left">
             <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{profileUser.name}</h2>
             <p className="text-[#2E7D32] font-semibold flex items-center justify-center sm:justify-start mt-1.5"><Building2 className="w-4 h-4 mr-2" /> {profileUser.originalRole || profileUser.role} • {profileUser.dept || 'Management'} Dept</p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold border-b border-gray-200 pb-3 text-gray-800">Contact Info</h3>
              <div className="flex items-center text-gray-600 font-medium"><Mail className="w-5 h-5 mr-3 text-[#66BB6A]" /> {profileUser.email || 'N/A'}</div>
              <div className="flex items-center text-gray-600 font-medium"><Phone className="w-5 h-5 mr-3 text-[#66BB6A]" /> {profileUser.phone || 'N/A'}</div>
              <div className="flex items-center text-gray-600 font-medium">
                <MapPin className="w-5 h-5 mr-3 text-[#66BB6A] flex-shrink-0" />
                <span className="text-sm">Plot no H146/1/1, near Nashik, MIDC Ambad, Nashik, Maharashtra 422010</span>
              </div>
            </div>
            <div className="space-y-5 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold border-b border-gray-200 pb-3 text-gray-800">Work Details</h3>
              <div className="flex items-center justify-between text-gray-600 font-medium"><span>Employee ID</span> <span className="font-bold text-[#003D1F] bg-[#E8F5E9] px-2 py-0.5 rounded-md">{profileUser.id || 'N/A'}</span></div>
              <div className="flex items-center justify-between text-gray-600 font-medium"><span>Joining Date</span> <span className="font-bold text-gray-800">{profileUser.joinDate || 'N/A'}</span></div>
              <div className="flex items-center justify-between text-gray-600 font-medium"><span>Shift Status</span> <span className="font-bold text-green-600">{profileUser.status || 'Active'}</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
