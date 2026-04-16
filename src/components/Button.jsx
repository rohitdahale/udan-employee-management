import React from 'react';
import { cn } from '../utils/cn';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: 'bg-[#003D1F] hover:bg-[#2E7D32] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-[#E8F5E9] hover:bg-[#66BB6A]/20 text-[#003D1F] border border-[#66BB6A]/30',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white shadow-sm'
  };

  return (
    <button 
      className={cn(
        "px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66BB6A]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
