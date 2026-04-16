import React from 'react';
import { cn } from '../utils/cn';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, className }) {
  return (
    <div className={cn("glass-panel p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group", className)}>
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#66BB6A]/20 to-transparent rounded-full blur-2xl group-hover:bg-[#66BB6A]/30 transition-all duration-500"></div>
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-[#E8F5E9] text-[#2E7D32] rounded-xl shadow-sm">
          <Icon className="h-6 w-6 relative z-10" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn(
            "font-semibold flex items-center", 
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
          )}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {Math.abs(trendValue)}%
          </span>
          <span className="text-gray-400 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}
