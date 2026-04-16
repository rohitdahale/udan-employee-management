import React from 'react';
import { cn } from '../utils/cn';

const variants = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
  primary: 'bg-[#E8F5E9] text-[#003D1F] border-[#66BB6A]/30',
  default: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-sm",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
