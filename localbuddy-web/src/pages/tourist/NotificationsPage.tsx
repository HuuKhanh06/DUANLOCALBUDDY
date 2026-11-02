// pages/tourist/NotificationsPage.tsx (S-17: Trung tâm thông báo)
import React from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/common/GuideCard';
import { formatDate } from '../../utils/time';
import { useNavigate } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead } = useBookingContext();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4 flex items-center justify-between">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">S-17 • THÔNG BÁO</span>
          <h1 className="text-[26px] font-bold text-[#14231A] mt-0.5">Trung tâm thông báo</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Cập nhật sự kiện đơn đặt lịch, biến động ví tiền và kết quả xử lý từ hệ thống
          </p>
        </div>
        <span className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-[13px] font-bold">
          {notifications.filter((n) => !n.isRead).length} chưa đọc
        </span>
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="Bạn chưa có thông báo nào" description="Khi có cập nhật về đơn hoặc ví, hệ thống sẽ gửi thông báo đến bạn." />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.bookingId) navigate(`/don/${n.bookingId}`);
              }}
              className={`p-4 rounded-[12px] border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                n.isRead
                  ? 'bg-white border-[#D6E2D9] text-[#4B5B50]'
                  : 'bg-[#F6FAF6] border-[#86EFAC] text-[#14231A] shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">🔔</span>
                <div>
                  <p className="text-[14px] font-medium leading-relaxed">{n.content}</p>
                  <span className="text-[12px] text-[#4B5B50] mt-1 block">
                    {formatDate(n.createdAt.split('T')[0])}
                  </span>
                </div>
              </div>

              {!n.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] flex-shrink-0 mt-2"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

