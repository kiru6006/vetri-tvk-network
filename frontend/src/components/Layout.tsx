import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans antialiased text-slate-900 selection:bg-red-600 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
