import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CheckCircle, Package, Users, Calculator, Shield } from 'lucide-react';

const depts = [
  { name: 'Production', count: 120, icon: Settings, color: 'text-blue-600', bg: 'bg-blue-100 border-blue-200' },
  { name: 'Quality', count: 35, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 border-green-200' },
  { name: 'Packing', count: 60, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100 border-orange-200' },
  { name: 'HR', count: 10, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 border-purple-200' },
  { name: 'Accounts', count: 15, icon: Calculator, color: 'text-teal-600', bg: 'bg-teal-100 border-teal-200' },
  { name: 'Admin', count: 10, icon: Shield, color: 'text-gray-600', bg: 'bg-gray-200 border-gray-300' },
];

export default function Departments() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Departments</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">Overview of factory and office divisions.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {depts.map((d, i) => (
          <motion.div key={d.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel p-6 rounded-2xl flex items-center gap-5 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-gray-200">
            <div className={`p-4 rounded-2xl border ${d.bg} ${d.color} shadow-sm group-hover:scale-110 transition-transform`}>
               <d.icon className="w-8 h-8" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">{d.name}</h3>
               <p className="text-gray-500 font-medium text-sm mt-0.5">{d.count} Employees</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
