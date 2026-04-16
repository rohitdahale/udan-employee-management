import React from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ icon: Icon = Search, title, description, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 sm:p-16 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 shadow-sm w-full">
       <div className="w-20 h-20 bg-[#E8F5E9] rounded-3xl flex items-center justify-center rotate-3 mb-6 shadow-sm border border-[#66BB6A]/30 transition-transform hover:rotate-6">
         <Icon className="w-10 h-10 text-[#2E7D32]" />
       </div>
       <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
       <p className="text-gray-500 text-sm max-w-sm text-center mb-8 font-medium">{description}</p>
       {actionText && (
         <Button onClick={onAction}>{actionText}</Button>
       )}
    </div>
  );
}
