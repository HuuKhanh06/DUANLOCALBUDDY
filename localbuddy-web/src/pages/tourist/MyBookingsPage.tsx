// pages/tourist/MyBookingsPage.tsx (S-10)
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { BookingCard } from '../../components/common/BookingCard';
import { Tabs } from '../../components/ui/Tabs';
import { EmptyState, LoadingState, ErrorState } from '../../components/common/GuideCard';
import { Button } from '../../components/ui/Button';
import { BookingStatus } from '../../types';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, getGuideById } = useBookingContext();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Giả lập trạng thái tải / lỗi demo
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  const tabs = [
    { id: 'all', label: 'Tất cả đơn', badge: bookings.length },
    {
      id: 'PENDING',
      label: 'Chờ xác nhận',
      badge: bookings.filter((b) => b.bookingStatus === 'PENDING').length || undefined,
    },
    {
      id: 'WAITING_PAYMENT',
      label: 'Chờ đặt cọc',
      badge: bookings.filter((b) => b.bookingStatus === 'WAITING_PAYMENT').length || undefined,
    },
    {
      id: 'CONFIRMED',
      label: 'Đã xác nhận',
      badge: bookings.filter((b) => b.bookingStatus === 'CONFIRMED').length || undefined,
    },
    {
      id: 'COMPLETED',
      label: 'Đã hoàn thành',
      badge: bookings.filter((b) => b.bookingStatus === 'COMPLETED').length || undefined,
    },
    {
      id: 'CANCELLED_DISPUTED',
      label: 'Hủy / Tranh chấp',
      badge: bookings.filter((b) => b.bookingStatus === 'CANCELLED' || b.bookingStatus === 'DISPUTED').length || undefined,
    },
  ];

  const filteredBookings = useMemo(() => {
    if (activeTab === 'all') return bookings;
    if (activeTab === 'CANCELLED_DISPUTED') {
      return bookings.filter(
        (b) => b.bookingStatus === 'CANCELLED' || b.bookingStatus === 'DISPUTED'
      );
    }
    return bookings.filter((b) => b.bookingStatus === activeTab);
  }, [bookings, activeTab]);

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6E2D9] pb-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#14231A]">Đơn đặt lịch của tôi</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Theo dõi tiến độ, thanh toán cọc và quản lý các chuyến đi của bạn tại Đà Nẵng
          </p>
        </div>

        {/* Demo switches */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1.5 rounded-[8px] border border-[#D6E2D9] text-[12px]">
          <span className="text-[#4B5B50] font-semibold">Demo:</span>
          <button
            onClick={() => setSimulateLoading(!simulateLoading)}
            className={`px-2 py-1 rounded ${simulateLoading ? 'bg-[#15803D] text-white' : 'bg-gray-100 text-[#14231A]'}`}
          >
            {simulateLoading ? 'Tắt Loading' : 'Giả lập Loading'}
          </button>
          <button
            onClick={() => setSimulateError(!simulateError)}
            className={`px-2 py-1 rounded ${simulateError ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-[#14231A]'}`}
          >
            {simulateError ? 'Tắt Error' : 'Giả lập Lỗi'}
          </button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {simulateError ? (
        <ErrorState
          message="Lỗi mô phỏng: Không thể nạp danh sách đơn của bạn từ bộ nhớ."
          onRetry={() => setSimulateError(false)}
        />
      ) : simulateLoading ? (
        <LoadingState message="Đang tải danh sách đơn đặt lịch..." />
      ) : filteredBookings.length === 0 ? (
        <EmptyState
          title="Không có đơn nào trong mục này"
          description="Bạn chưa có chuyến đi nào ở trạng thái này. Hãy tìm kiếm và đặt lịch với một Local Guide ngay!"
          actionText="Tìm Local Guide"
          onAction={() => navigate('/guides')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookings.map((b) => {
            const guide = getGuideById(b.guideId);

            // Nút thanh toán cọc nhanh nếu là WAITING_PAYMENT
            const quickAction =
              b.bookingStatus === 'WAITING_PAYMENT' ? (
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/don/${b.id}/dat-coc`);
                  }}
                  className="text-[13px] h-9 px-3"
                >
                  💳 Cọc ngay 30%
                </Button>
              ) : undefined;

            return (
              <BookingCard
                key={b.id}
                booking={b}
                guideName={guide?.user.fullName}
                onClick={() => navigate(`/don/${b.id}`)}
                actionButton={quickAction}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

