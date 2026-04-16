import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
  const { user } = useAuth();
  const initials = user?.name?.split(' ').map(n=>n[0]).join('') || 'UM';

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
        
        <button className="relative p-2 text-gray-500 hover:text-[#003D1F] hover:bg-[#E8F5E9] rounded-full transition-colors">
          <Bell className="h-5 w-5 flex-shrink-0" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        <div className="h-9 w-9 rounded-full bg-[#003D1F] border-2 border-[#66BB6A] flex items-center justify-center text-white text-sm font-bold cursor-pointer shadow-md hover:scale-105 transition-transform tracking-wider">
          {initials.substring(0,2)}
        </div>
      </div>
    </header>
  );
}
