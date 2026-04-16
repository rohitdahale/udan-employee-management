import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, X, Info, AlertTriangle, PartyPopper } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function Navbar() {
  const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
  const { user } = useAuth();
  const { state } = useData();
  const initials = user?.name?.split(' ').map(n=>n[0]).join('') || 'UM';
  
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-sm z-10 transition-all">
      <div className="flex items-center flex-1 gap-4">
        <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden md:flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Good Morning, {user?.name.split(' ')[0]}</h2>
          <p className="text-xs text-gray-500 font-medium">{currentDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user?.role === 'admin' && (
          <span className="hidden sm:inline-block px-3 py-1 bg-red-100 text-red-800 text-[10px] font-bold rounded-full border border-red-200 uppercase tracking-widest">
            {user.role} View
          </span>
        )}
        {user?.role === 'hr' && (
          <span className="hidden sm:inline-block px-3 py-1 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-full border border-purple-200 uppercase tracking-widest">
            {user.role} View
          </span>
        )}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 w-64 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#66BB6A]/50 transition-all focus:bg-white shadow-inner"
          />
        </div>
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 text-gray-500 hover:text-[#003D1F] hover:bg-[#E8F5E9] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#66BB6A]/50 ${showNotifications ? 'bg-[#E8F5E9] text-[#003D1F]' : ''}`}
          >
            <Bell className="h-5 w-5 flex-shrink-0" />
            {(state.notices?.length > 0) && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 transform origin-top-right"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-800 tracking-tight">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar p-2">
                  {state.notices?.length > 0 ? (
                    state.notices.map((notice) => (
                      <div key={notice.id} className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer mb-1 border border-transparent hover:border-gray-100 group">
                        <div className="flex gap-3">
                           <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                             notice.type === 'Important' ? 'bg-red-100 text-red-600' :
                             notice.type === 'Good News' ? 'bg-green-100 text-green-600' :
                             'bg-blue-100 text-blue-600'
                           }`}>
                             {notice.type === 'Important' ? <AlertTriangle className="w-4 h-4" /> :
                              notice.type === 'Good News' ? <PartyPopper className="w-4 h-4" /> :
                              <Info className="w-4 h-4" />}
                           </div>
                           <div>
                             <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2E7D32] transition-colors line-clamp-2">{notice.title}</p>
                             <p className="text-xs text-gray-500 font-medium mt-1">{notice.date}</p>
                           </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm font-medium">No new notifications</p>
                    </div>
                  )}
                </div>
                {state.notices?.length > 0 && (
                  <div className="p-3 border-t border-gray-100 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                     <p className="text-xs font-bold text-[#2E7D32]">View All Activity</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-9 w-9 rounded-full bg-[#003D1F] border-2 border-[#66BB6A] flex items-center justify-center text-white text-sm font-bold cursor-pointer shadow-md hover:scale-105 transition-transform tracking-wider">
          {initials.substring(0,2)}
        </div>
      </div>
    </header>
  );
}
