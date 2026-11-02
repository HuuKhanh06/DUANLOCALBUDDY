// pages/admin/ReportsPage.tsx (S-30: Báo cáo doanh thu & Thống kê)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { formatMoney } from '../../utils/money';

export const ReportsPage: React.FC = () => {
  const { bookings } = useBookingContext();
  const { showToast } = useToast();
  const [filterPeriod, setFilterPeriod] = useState('month');

  // Thống kê thuần túy dựa trên bộ dữ liệu mock (không thêm chỉ số lạ)
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.bookingStatus === 'COMPLETED').length;
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === 'CANCELLED').length;
  const disputedBookings = bookings.filter((b) => b.bookingStatus === 'DISPUTED').length;

  // Doanh thu sàn thu được: Phí sàn từ các đơn đã thanh toán đủ (PAID) + tiền phạt đơn hủy
  const paidBookings = bookings.filter((b) => b.paymentStatus === 'PAID');
  const platformFeeEarned = paidBookings.reduce(
    (sum, b) => sum + Math.round(b.totalAmount * b.feeRate),
    0
  );
  const totalBookingValue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const handleExport = () => {
    showToast('Đã xuất báo cáo doanh thu định dạng mock (CSV/Excel) thành công!', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6E2D9] pb-4">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">S-30 • ADMIN DASHBOARD</span>
          <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Báo cáo doanh thu & Thống kê nền tảng</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Tổng hợp dữ liệu giao dịch, phí sàn thu được và hiệu quả vận hành thực tế
          </p>
        </div>

        <Button variant="secondary" onClick={handleExport} className="font-semibold">
          📥 Xuất báo cáo (CSV)
        </Button>
      </div>

      {/* Bộ lọc thời gian */}
      <Tabs
        tabs={[
          { id: 'day', label: 'Hôm nay' },
          { id: 'week', label: 'Tuần này' },
          { id: 'month', label: 'Tháng này (10/2026)' },
        ]}
        activeTab={filterPeriod}
        onChange={setFilterPeriod}
      />

      {/* 4 Thẻ chỉ số chuẩn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D6E2D9] rounded-[14px] p-5 shadow-sm space-y-1">
          <span className="text-[13px] text-[#4B5B50]">Doanh thu phí sàn thu được:</span>
          <div className="text-[26px] font-bold text-[#15803D] tabular-nums">
            {formatMoney(platformFeeEarned)}
          </div>
          <span className="text-[11px] text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded font-semibold inline-block">
            Từ các đơn đã PAID
          </span>
        </div>

        <div className="bg-white border border-[#D6E2D9] rounded-[14px] p-5 shadow-sm space-y-1">
          <span className="text-[13px] text-[#4B5B50]">Tổng giá trị đơn đặt (G):</span>
          <div className="text-[26px] font-bold text-[#14231A] tabular-nums">
            {formatMoney(totalBookingValue)}
          </div>
          <span className="text-[11px] text-[#4B5B50] block">Qua 7 đơn mẫu BK</span>
        </div>

        <div className="bg-white border border-[#D6E2D9] rounded-[14px] p-5 shadow-sm space-y-1">
          <span className="text-[13px] text-[#4B5B50]">Tổng số lượt đặt lịch:</span>
          <div className="text-[26px] font-bold text-[#14231A] tabular-nums">
            {totalBookings} đơn
          </div>
          <span className="text-[11px] text-[#15803D] block">
            {completedBookings} đơn đã hoàn tất
          </span>
        </div>

        <div className="bg-white border border-[#D6E2D9] rounded-[14px] p-5 shadow-sm space-y-1">
          <span className="text-[13px] text-[#4B5B50]">Hủy & Tranh chấp:</span>
          <div className="text-[26px] font-bold text-[#B91C1C] tabular-nums">
            {cancelledBookings + disputedBookings}
          </div>
          <span className="text-[11px] text-[#B91C1C] block">
            {cancelledBookings} đã hủy • {disputedBookings} tranh chấp
          </span>
        </div>
      </div>

      {/* Bảng phân bổ cơ cấu đơn theo trạng thái */}
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#14231A]">Cơ cấu trạng thái đơn hàng (Dữ liệu mock chuẩn):</h3>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[13px] mb-1">
              <span>Đã hoàn tất (COMPLETED)</span>
              <span className="font-bold">{completedBookings} / {totalBookings} đơn</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#15803D] h-full rounded-full"
                style={{ width: `${(completedBookings / totalBookings) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[13px] mb-1">
              <span>Đã hủy (CANCELLED)</span>
              <span className="font-bold">{cancelledBookings} / {totalBookings} đơn</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#9CA3AF] h-full rounded-full"
                style={{ width: `${(cancelledBookings / totalBookings) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[13px] mb-1">
              <span>Đang tranh chấp (DISPUTED)</span>
              <span className="font-bold">{disputedBookings} / {totalBookings} đơn</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#B91C1C] h-full rounded-full"
                style={{ width: `${(disputedBookings / totalBookings) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

