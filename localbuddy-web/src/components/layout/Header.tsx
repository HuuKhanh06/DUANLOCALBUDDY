// components/layout/Header.tsx & Sidebar.tsx & BottomNav.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { UserRole } from '../../types';

// Header chung
export const Header: React.FC<{ role?: UserRole; userName?: string }> = ({ role = 'tourist', userName }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#14532D] text-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-[20px] font-bold tracking-tight">LOCALBUDDY</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium">
          {role === 'tourist' && (
            <>
              <Link to="/guides" className="hover:text-[#86EFAC] transition-colors">Tìm Guide</Link>
              <Link to="/don-cua-toi" className="hover:text-[#86EFAC] transition-colors">Đơn của tôi</Link>
              <Link to="/thong-bao" className="hover:text-[#86EFAC] transition-colors">Thông báo</Link>
            </>
          )}
          {role === 'guide' && (
            <>
              <Link to="/guide/don-va-ca" className="hover:text-[#86EFAC] transition-colors">Đơn & Ca</Link>
              <Link to="/guide/don-den" className="hover:text-[#86EFAC] transition-colors">Đơn đến</Link>
              <Link to="/guide/lich-ranh" className="hover:text-[#86EFAC] transition-colors">Lịch rảnh</Link>
              <Link to="/guide/vi" className="hover:text-[#86EFAC] transition-colors">Ví tiền</Link>
              <Link to="/guide/ho-so" className="hover:text-[#86EFAC] transition-colors">Hồ sơ & Giá</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/ui-kit"
            className="text-[12px] bg-[#15803D] hover:bg-[#86EFAC] hover:text-[#14532D] px-2.5 py-1 rounded-md font-semibold text-white border border-[#86EFAC]/40"
          >
            🎨 UI-Kit
          </Link>
          {userName ? (
            <div className="flex items-center gap-2">
              <span className="text-[14px] hidden sm:inline">{userName}</span>
              <div className="w-8 h-8 rounded-full bg-[#86EFAC] text-[#14532D] font-bold flex items-center justify-center text-[14px]">
                {userName.charAt(0)}
              </div>
            </div>
          ) : (
            <Link
              to="/dang-nhap"
              className="px-3 py-1.5 rounded-[8px] bg-[#86EFAC] text-[#14532D] text-[14px] font-bold hover:bg-white"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

// Admin Sidebar (240px desktop only)
export const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/admin/kyc', label: 'Thẩm định KYC', icon: '📋', id: 'S-26' },
    { to: '/admin/tranh-chap', label: 'Xử lý tranh chấp', icon: '⚖️', id: 'S-29' },
    { to: '/admin/tai-khoan', label: 'Quản lý tài khoản', icon: '👥', id: 'S-27' },
    { to: '/admin/rut-tien', label: 'Duyệt lệnh rút', icon: '💰', id: 'S-28' },
    { to: '/admin/bao-cao', label: 'Báo cáo & Thống kê', icon: '📊', id: 'S-30' },
    { to: '/admin/phi-san', label: 'Cấu hình phí sàn', icon: '⚙️', id: 'S-31' },
  ];

  return (
    <aside className="w-[240px] bg-[#14532D] text-white flex-shrink-0 min-h-screen flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-2 px-2 py-4 border-b border-white/20 mb-6">
          <span className="text-2xl">🌱</span>
          <div>
            <h1 className="font-bold text-[16px] leading-tight">LOCALBUDDY</h1>
            <span className="text-[11px] text-[#86EFAC] tracking-wider uppercase font-semibold">Admin Portal</span>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  'flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors',
                  isActive
                    ? 'bg-[#15803D] text-[#86EFAC] font-semibold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                <span className="text-[10px] opacity-60 font-mono">{link.id}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/20 pt-4 px-2">
        <Link to="/ui-kit" className="text-[12px] text-[#86EFAC] hover:underline flex items-center gap-1">
          <span>🎨</span> Xem /ui-kit
        </Link>
        <div className="text-[11px] text-white/50 mt-2">Dữ liệu Mock • Không backend</div>
      </div>
    </aside>
  );
};

// BottomNav cho mobile (Guide)
export const GuideBottomNav: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/guide/don-va-ca', label: 'Đơn & Ca', icon: '📋' },
    { to: '/guide/don-den', label: 'Đơn đến', icon: '🔔' },
    { to: '/guide/lich-ranh', label: 'Lịch rảnh', icon: '📅' },
    { to: '/guide/vi', label: 'Ví', icon: '💰' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6E2D9] z-40 flex items-center justify-around h-16 shadow-lg">
      {links.map((l) => {
        const isActive = location.pathname === l.to;
        return (
          <Link
            key={l.to}
            to={l.to}
            className={clsx(
              'flex flex-col items-center justify-center flex-1 h-full text-[11px] font-semibold gap-0.5',
              isActive ? 'text-[#15803D]' : 'text-[#4B5B50]'
            )}
          >
            <span className="text-lg">{l.icon}</span>
            <span>{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

