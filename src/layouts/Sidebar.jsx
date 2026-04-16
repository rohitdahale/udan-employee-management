import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, Users, CalendarPlus, FileText, 
  LayoutDashboard, Megaphone, UserCircle, LogOut, Settings as SettingsIcon 
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ...(role === 'admin' || role === 'hr' ? [{ name: 'Employees', href: '/employees', icon: Users }] : []),
    { name: 'Attendance', href: '/attendance', icon: CalendarPlus },
    { name: 'Leave Management', href: '/leaves', icon: FileText },
    ...(role === 'admin' ? [{ name: 'Departments', href: '/departments', icon: Building2 }] : []),
    { name: 'Notices', href: '/notices', icon: Megaphone },
    { name: 'Profile', href: '/profile', icon: UserCircle },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex shrink-0 flex-col w-64 bg-[#003D1F] text-white transition-all duration-300 shadow-xl z-20">
      <div className="flex h-16 shrink-0 items-center px-6 gap-3 pt-6 pb-2">
        <div className="w-8 h-8 rounded-md bg-[#66BB6A] flex items-center justify-center font-bold text-white shadow-md">
          UM
        </div>
        <span className="text-xl font-semibold tracking-wide">Udan Metaplast</span>
      </div>
      
      <div className="px-6 py-2">
        <div className="h-[1px] w-full bg-white/10 rounded-full" />
      </div>

      <nav className="flex flex-1 flex-col px-4 pt-4 pb-4 overflow-y-auto space-y-1 custom-scrollbar">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                isActive 
                  ? 'bg-[#2E7D32] text-white shadow-md' 
                  : 'text-white/70 hover:bg-[#2E7D32]/50 hover:text-white'
              )
            }
          >
            <item.icon
              className="mr-3 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
         <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#66BB6A]">
           <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
           Logout
         </button>
      </div>
    </div>
  );
}
