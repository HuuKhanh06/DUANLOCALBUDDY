// pages/DirectoryPage.tsx – Trang danh mục tra cứu và chuẩn bị nhập Figma
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ScreenItem {
  code: string;
  name: string;
  role: 'Tourist / Khách' | 'Guide' | 'Admin';
  url: string;
  frame: '390px (Mobile) & 1440px (Desktop)' | '1440px (Desktop only)';
  priority: 'P0' | 'P1' | 'P2';
}

export const DirectoryPage: React.FC = () => {
  const [useFigmaParam, setUseFigmaParam] = useState(false);

  const screens: ScreenItem[] = [
    // 1. Nhóm Tourist & Public
    { code: 'S-01', name: 'Trang chủ', role: 'Tourist / Khách', url: '/', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P1' },
    { code: 'S-02', name: 'Đăng ký (2 tab Tourist & nộp KYC Guide)', role: 'Tourist / Khách', url: '/dang-ky', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-04', name: 'Đăng nhập Tourist và Guide', role: 'Tourist / Khách', url: '/dang-nhap', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-06', name: 'Tìm kiếm, lọc và kết quả Guide', role: 'Tourist / Khách', url: '/guides', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-07', name: 'Hồ sơ Guide và lịch khả dụng', role: 'Tourist / Khách', url: '/guides/u-guide-1', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-08', name: 'Đặt lịch chuyến đi', role: 'Tourist / Khách', url: '/dat-lich/u-guide-1', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-09', name: 'Thanh toán cọc 30% (Hạn 15p)', role: 'Tourist / Khách', url: '/don/BK-1002/dat-coc', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-10', name: 'Đơn của tôi (Dashboard Tourist)', role: 'Tourist / Khách', url: '/don-cua-toi', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-11', name: 'Chi tiết đơn (Tourist)', role: 'Tourist / Khách', url: '/don/BK-1001', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-16', name: 'Modal hủy đơn và xem trước hoàn phạt', role: 'Tourist / Khách', url: '/don/BK-1003?huy=1', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-13', name: 'Thanh toán 70% và quyết toán', role: 'Tourist / Khách', url: '/don/BK-1004/thanh-toan-70', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-17', name: 'Trung tâm thông báo', role: 'Tourist / Khách', url: '/thong-bao', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P1' },

    // 2. Nhóm Guide
    { code: 'S-18', name: 'Hồ sơ, giá và xác minh Guide', role: 'Guide', url: '/guide/ho-so', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P1' },
    { code: 'S-19', name: 'Cấu hình lịch rảnh (3 trạng thái)', role: 'Guide', url: '/guide/lich-ranh', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-20', name: 'Đơn đến (Chấp nhận / Từ chối)', role: 'Guide', url: '/guide/don-den', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-21', name: 'Đơn và ca của tôi (Hoàn tất & Tiền mặt)', role: 'Guide', url: '/guide/don-va-ca', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P0' },
    { code: 'S-24', name: 'Ví thu nhập và rút tiền', role: 'Guide', url: '/guide/vi', frame: '390px (Mobile) & 1440px (Desktop)', priority: 'P1' },

    // 3. Nhóm Admin
    { code: 'S-05', name: 'Đăng nhập Quản trị viên Admin', role: 'Admin', url: '/admin/dang-nhap', frame: '1440px (Desktop only)', priority: 'P1' },
    { code: 'S-26', name: 'Thẩm định hồ sơ KYC Guide', role: 'Admin', url: '/admin/kyc', frame: '1440px (Desktop only)', priority: 'P0' },
    { code: 'S-27', name: 'Quản lý tài khoản (Khóa/Mở/Thu hồi)', role: 'Admin', url: '/admin/tai-khoan', frame: '1440px (Desktop only)', priority: 'P1' },
    { code: 'S-28', name: 'Duyệt lệnh rút tiền (Chuyển thủ công)', role: 'Admin', url: '/admin/rut-tien', frame: '1440px (Desktop only)', priority: 'P1' },
    { code: 'S-29', name: 'Xử lý khiếu nại và tranh chấp', role: 'Admin', url: '/admin/tranh-chap', frame: '1440px (Desktop only)', priority: 'P0' },
    { code: 'S-30', name: 'Báo cáo doanh thu và thống kê', role: 'Admin', url: '/admin/bao-cao', frame: '1440px (Desktop only)', priority: 'P2' },
    { code: 'S-31', name: 'Cấu hình phí sàn nền tảng (10-15%)', role: 'Admin', url: '/admin/phi-san', frame: '1440px (Desktop only)', priority: 'P2' },
  ];

  const getFullUrl = (baseUrl: string) => {
    if (!useFigmaParam) return baseUrl;
    return baseUrl.includes('?') ? `${baseUrl}&figma=1` : `${baseUrl}?figma=1`;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">MỤC 8 & 9 • FIGMA READY</span>
          <h1 className="text-[26px] font-bold text-[#14231A] mt-1">
            Danh mục 24 Màn hình LOCALBUDDY (Screen Inventory)
          </h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Mở nhanh từng màn hình để kiểm tra độc lập hoặc nhập vào Figma qua plugin <code>html.to.design</code>.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#F6FAF6] p-3 rounded-[12px] border border-[#D6E2D9] self-start md:self-auto">
          <input
            type="checkbox"
            id="figmaToggle"
            checked={useFigmaParam}
            onChange={(e) => setUseFigmaParam(e.target.checked)}
            className="w-4 h-4 accent-[#15803D] cursor-pointer"
          />
          <label htmlFor="figmaToggle" className="text-[13px] font-semibold text-[#14231A] cursor-pointer">
            Bật tham số <code>?figma=1</code> (Tắt animation để html.to.design chụp chuẩn)
          </label>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/ui-kit"
          className="px-4 py-2 bg-[#15803D] text-white rounded-[8px] text-[14px] font-bold hover:bg-[#14532D]"
        >
          🎨 Mở Trang UI-Kit Component
        </Link>
        <span className="text-[13px] text-[#4B5B50]">
          * Click vào bất kỳ dòng nào bên dưới để mở trực tiếp màn hình đó trên localhost.
        </span>
      </div>

      <div className="bg-white border border-[#D6E2D9] rounded-[16px] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead className="bg-[#F6FAF6] border-b border-[#D6E2D9] text-[#4B5B50] font-semibold">
            <tr>
              <th className="py-3 px-4">Mã S-xx</th>
              <th className="py-3 px-4">Tên màn hình</th>
              <th className="py-3 px-4">Vai trò</th>
              <th className="py-3 px-4">Ưu tiên</th>
              <th className="py-3 px-4">Khung thiết kế Figma</th>
              <th className="py-3 px-4 text-right">Đường dẫn Localhost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D6E2D9]">
            {screens.map((s) => {
              const targetUrl = getFullUrl(s.url);
              return (
                <tr key={s.code} className="hover:bg-[#F6FAF6]/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#15803D]">{s.code}</td>
                  <td className="py-3 px-4 font-semibold text-[#14231A]">{s.name}</td>
                  <td className="py-3 px-4">
                    <span className="text-[12px] bg-gray-100 px-2 py-0.5 rounded font-medium text-[#374151]">
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        s.priority === 'P0'
                          ? 'bg-[#DCFCE7] text-[#166534]'
                          : s.priority === 'P1'
                          ? 'bg-[#DBEAFE] text-[#1E40AF]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {s.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#4B5B50]">{s.frame}</td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] font-bold text-[#15803D] hover:underline bg-[#DCFCE7]/50 px-2 py-1 rounded"
                    >
                      {targetUrl} ↗
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

