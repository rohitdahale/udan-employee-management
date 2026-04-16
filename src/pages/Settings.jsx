import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Building2, Calendar as CalendarIcon, Clock, Palette, Save } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function Settings() {
  const { role } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('company');

  const isManager = role === 'admin';

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings saved successfully!', 'success');
  };

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'holidays', label: 'Holidays List', icon: CalendarIcon },
    { id: 'shifts', label: 'Shift Timings', icon: Clock },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">System Settings</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">Manage portal configurations and global preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {/* Sidebar Tabs */}
         <div className="md:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-left ${activeTab === tab.id ? 'bg-[#003D1F] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
              >
                 <tab.icon className="w-5 h-5 flex-shrink-0" />
                 {tab.label}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="md:col-span-3">
            <motion.div 
               key={activeTab}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-panel p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]"
            >
               <AnimatePresence mode="wait">
                  {activeTab === 'company' && (
                    <motion.form key="company" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSave} className="space-y-6 max-w-2xl">
                       <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Company Configuration</h3>
                       <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Company Name</label>
                            <input disabled={!isManager} type="text" defaultValue="Udan Metaplast" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors disabled:opacity-60" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Registration Number</label>
                            <input disabled={!isManager} type="text" defaultValue="CIN-U25209MH2000PTC123456" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors disabled:opacity-60" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Corporate Address</label>
                            <textarea disabled={!isManager} rows="3" defaultValue="Plot No. 42, MIDC Industrial Area, Phase II&#10;Andheri East, Mumbai - 400093&#10;Maharashtra, India" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors disabled:opacity-60" />
                          </div>
                       </div>
                       {isManager && (
                         <div className="pt-4 flex justify-end">
                            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                         </div>
                       )}
                    </motion.form>
                  )}

                  {activeTab === 'holidays' && (
                    <motion.div key="holidays" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                       <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-4">
                          <h3 className="text-lg font-bold text-gray-800">Public Holidays - 2023</h3>
                          {isManager && <Button variant="outline" size="sm">Add Holiday</Button>}
                       </div>
                       <div className="space-y-3">
                          {[
                            { date: 'Jan 26', name: 'Republic Day' },
                            { date: 'Mar 08', name: 'Holi' },
                            { date: 'Aug 15', name: 'Independence Day' },
                            { date: 'Oct 24', name: 'Dussehra' },
                            { date: 'Nov 12', name: 'Diwali' },
                          ].map((h, i) => (
                             <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white transition-colors">
                               <div className="flex items-center gap-4">
                                  <div className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-lg text-sm border border-red-100 w-16 text-center">{h.date}</div>
                                  <p className="font-bold text-gray-700">{h.name}</p>
                               </div>
                               {isManager && <Button variant="ghost" className="text-gray-400 hover:text-red-500 bg-transparent shadow-none px-2 py-1">Remove</Button>}
                             </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'shifts' && (
                    <motion.div key="shifts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                       <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Factory Shift Timings</h3>
                       <div className="grid grid-cols-1 gap-4">
                          {[
                            { name: 'Shift A (Morning)', time: '08:00 AM - 04:00 PM', variant: 'bg-orange-50 text-orange-700 border-orange-200' },
                            { name: 'Shift B (General)', time: '10:00 AM - 06:00 PM', variant: 'bg-green-50 text-green-700 border-green-200' },
                            { name: 'Shift C (Night)', time: '04:00 PM - 12:00 AM', variant: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                          ].map((s, i) => (
                            <div key={i} className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                               <div>
                                  <p className="font-bold text-gray-800">{s.name}</p>
                                  <p className="text-sm text-gray-500 font-medium mt-1">Includes 30m meal break</p>
                               </div>
                               <div className={`px-4 py-2 rounded-lg font-bold border ${s.variant}`}>
                                 {s.time}
                               </div>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'preferences' && (
                    <motion.form key="preferences" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSave} className="space-y-6 max-w-xl">
                       <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Display & Notifications</h3>
                       <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                             <div>
                                <h4 className="font-bold text-gray-700">Email Notifications</h4>
                                <p className="text-sm text-gray-500">Receive leave updates via email</p>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
                             </label>
                          </div>
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                             <div>
                                <h4 className="font-bold text-gray-700">Compact Table View</h4>
                                <p className="text-sm text-gray-500">Decrease spacing in data tables</p>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
                             </label>
                          </div>
                       </div>
                       <div className="pt-2">
                          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Preferences</Button>
                       </div>
                    </motion.form>
                  )}
               </AnimatePresence>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
