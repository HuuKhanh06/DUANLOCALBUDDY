// layouts/index.tsx – 4 Layouts: Public, Tourist, Guide, Admin
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, AdminSidebar, GuideBottomNav } from '../components/layout/Header';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAF6]">
      <Header role="tourist" />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-[#D6E2D9] py-6 text-center text-[12px] text-[#4B5B50]">
        <p>LOCALBUDDY © 2026 – Đồ án Phân tích & Thiết kế Hệ thống Nâng cao • Nền tảng Mock</p>
      </footer>
    </div>
  );
};

export const TouristLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAF6]">
      <Header role="tourist" userName="Trần Minh Anh" />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export const GuideLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAF6] pb-16 md:pb-0">
      <Header role="guide" userName="Lê Hoàng Nam" />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <GuideBottomNav />
    </div>
  );
};

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#F6FAF6]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-[#D6E2D9] px-6 flex items-center justify-between">
          <div className="text-[14px] text-[#4B5B50]">
            Bảng điều khiển quản trị hệ thống
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-semibold text-[#14231A]">Admin</span>
            <div className="w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

