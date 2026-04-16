import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#E8F5E9]">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
