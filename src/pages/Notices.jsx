import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar } from 'lucide-react';
import Badge from '../components/Badge';

export default function Notices() {
  const notices = [
    { title: 'Annual Safety Drill', desc: 'Mandatory safety drill for all production staff. Please assemble at the ground by 9AM.', date: 'Oct 28', type: 'Important' },
    { title: 'Diwali Holidays', desc: 'The factory will remain closed for 3 days for the Diwali festival. Bonus distribution will happen before.', date: 'Nov 10', type: 'Holiday' },
    { title: 'New Machinery Installation', desc: 'Line A will be paused for new injection molding machine installation until further notice.', date: 'Nov 02', type: 'General' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Company Notices</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">Latest circulars and announcements from Udan Metaplast.</p>
      </div>
      <div className="space-y-4">
        {notices.map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel p-5 md:p-6 rounded-2xl flex gap-6 hover:shadow-md transition-all border border-gray-100 hover:border-gray-200">
            <div className="hidden sm:flex flex-col items-center justify-center p-4 bg-[#E8F5E9] rounded-xl text-[#003D1F] border border-[#66BB6A]/30">
              <Calendar className="w-6 h-6 mb-1 text-[#2E7D32]" />
              <span className="text-xs font-bold text-center w-12 text-[#003D1F]">{n.date}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-800 leading-tight">{n.title}</h3>
                <Badge variant={n.type === 'Important' ? 'danger' : n.type === 'Holiday' ? 'success' : 'primary'}>{n.type}</Badge>
              </div>
              <p className="text-gray-600 font-medium text-sm">{n.desc}</p>
              <div className="sm:hidden mt-3 text-xs font-bold text-gray-400 bg-gray-50 inline-block px-2 py-1 rounded-md">{n.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
