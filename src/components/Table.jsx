import React from 'react';
import { cn } from '../utils/cn';

export default function Table({ headers, data, renderRow, className }) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm", className)}>
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-[#E8F5E9]/50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200 tracking-wider">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50/70 transition-colors group">
              {renderRow(item)}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="px-6 py-8 text-center text-gray-500 font-medium">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
