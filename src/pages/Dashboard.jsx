import React from 'react';
import { Users, UserCheck, CalendarOff, Layers, ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';

const attendanceData = [
  { name: 'Mon', present: 240, absent: 10 },
  { name: 'Tue', present: 238, absent: 12 },
  { name: 'Wed', present: 245, absent: 5 },
  { name: 'Thu', present: 242, absent: 8 },
  { name: 'Fri', present: 235, absent: 15 },
  { name: 'Sat', present: 220, absent: 30 },
];

const notices = [
  { id: 1, title: 'Annual Quality Audit Update', date: 'Oct 24, 2023', type: 'Important' },
  { id: 2, title: 'Shift Timings Updated for Winter', date: 'Oct 22, 2023', type: 'General' },
  { id: 3, title: 'Diwali Bonus Announcement', date: 'Oct 18, 2023', type: 'Good News' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-5 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-[#2E7D32]"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome back, Rohit.</h2>
          <p className="text-gray-500 mt-1 font-medium">Here is what's happening at Udan Metaplast today.</p>
        </div>
        <div className="flex bg-[#E8F5E9] px-4 py-2.5 rounded-xl border border-[#66BB6A]/30 self-start md:self-auto shadow-sm">
          <Clock className="w-5 h-5 text-[#2E7D32] mr-2 flex-shrink-0" />
          <span className="text-sm font-semibold text-[#003D1F]">Shift A (08:00 - 16:00)</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <StatCard title="Total Employees" value="250" icon={Users} trend="up" trendValue={2.4} />
        <StatCard title="Present Today" value="238" icon={UserCheck} trend="up" trendValue={1.2} />
        <StatCard title="On Leave" value="12" icon={CalendarOff} trend="down" trendValue={5.0} />
        <StatCard title="Departments" value="6" icon={Layers} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Weekly Attendance Overview</h3>
            <button className="text-sm text-[#2E7D32] font-semibold flex items-center hover:underline bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors hover:bg-[#66BB6A]/20">
              Full Report <ArrowUpRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(232, 245, 233, 0.5)' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 600 }}
                />
                <Bar dataKey="present" name="Present" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#2E7D32" />
                  ))}
                </Bar>
                <Bar dataKey="absent" name="Absent" fill="#66BB6A" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-2xl flex flex-col shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Notices</h3>
            <button className="text-sm text-[#2E7D32] font-semibold hover:underline">View All</button>
          </div>
          
          <div className="space-y-4 flex-1">
            {notices.map((notice, i) => (
              <div key={notice.id} className="p-4 rounded-xl border border-gray-100 bg-white/50 hover:bg-white transition-all duration-300 group cursor-pointer hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={notice.type === 'Important' ? 'danger' : notice.type === 'Good News' ? 'success' : 'primary'}>
                    {notice.type}
                  </Badge>
                  <span className="text-xs text-gray-400 font-medium">{notice.date}</span>
                </div>
                <h4 className="font-semibold text-gray-800 group-hover:text-[#2E7D32] transition-colors leading-tight">{notice.title}</h4>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
             <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <MapPin className="w-5 h-5 mr-3 text-[#66BB6A]" />
                Factory Floor A - <span className="text-green-600 ml-1">Active</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
