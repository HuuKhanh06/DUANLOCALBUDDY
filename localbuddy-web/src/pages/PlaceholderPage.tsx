// pages/PlaceholderPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const PlaceholderPage: React.FC<{ code: string; title: string; role: string }> = ({
  code,
  title,
  role,
}) => {
  return (
    <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-8 max-w-2xl mx-auto my-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-4 mb-6">
        <div>
          <span className="px-2.5 py-1 bg-[#DCFCE7] text-[#15803D] rounded-full text-[12px] font-bold font-mono">
            {code}
          </span>
          <h2 className="text-[22px] font-bold text-[#14231A] mt-2">{title}</h2>
        </div>
        <span className="text-[12px] uppercase tracking-wider bg-[#F6FAF6] px-3 py-1 rounded-md border border-[#D6E2D9] text-[#4B5B50] font-semibold">
          Vai trò: {role}
        </span>
      </div>

      <p className="text-[14px] text-[#4B5B50] mb-6">
        Màn hình này đang là trang giữ chỗ (Placeholder) cho Giai đoạn 1. Logic nghiệp vụ chi tiết sẽ được hoàn thiện trong các giai đoạn tiếp theo (Giai đoạn 2 cho luồng Tourist P0, Giai đoạn 3 cho Guide, Giai đoạn 4 cho Admin, Giai đoạn 5 cho P1/P2).
      </p>

      <div className="flex gap-3">
        <Link
          to="/ui-kit"
          className="px-4 py-2 bg-[#15803D] text-white rounded-[8px] text-[14px] font-semibold hover:bg-[#14532D]"
        >
          🎨 Xem UI-Kit Component
        </Link>
        <Link
          to="/"
          className="px-4 py-2 bg-white border border-[#D6E2D9] text-[#14231A] rounded-[8px] text-[14px] font-semibold hover:bg-[#F6FAF6]"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

