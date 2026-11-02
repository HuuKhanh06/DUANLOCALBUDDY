// pages/guide/MyBookingsAndShiftsPage.tsx (S-21: Đơn và ca của tôi)
import React, { useState, useMemo } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { StatusBadge, PaymentBadge } from '../../components/common/StatusBadge';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/common/GuideCard';
import { useToast } from '../../components/ui/Toast';
import { formatDate, formatTimeRange, calcDeltaHours } from '../../utils/time';
import { formatMoney } from '../../utils/money';

export const MyBookingsAndShiftsPage: React.FC = () => {
  const {
    bookings,
    requestCompletion,
    confirmCashPayment,
    guideCancelBooking,
  } = useBookingContext();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<string | null>(null);

  // Toggle demo ca đã kết thúc để kiểm thử nút Yêu cầu hoàn thành
  const [demoShiftEnded, setDemoShiftEnded] = useState(false);

  // Lọc đơn thuộc về Guide hiện tại (Lê Hoàng Nam)
  const guideBookings = bookings.filter((b) => b.guideId === 'u-guide-1');

  const tabs = [
    { id: 'all', label: 'Tất cả đơn & ca', badge: guideBookings.length },
    {
      id: 'CONFIRMED',
      label: 'Sắp diễn ra',
      badge: guideBookings.filter((b) => b.bookingStatus === 'CONFIRMED').length || undefined,
    },
    {
      id: 'COMPLETED',
      label: 'Đã hoàn thành',
      badge: guideBookings.filter((b) => b.bookingStatus === 'COMPLETED').length || undefined,
    },
    {
      id: 'PENDING_WAITING',
      label: 'Đang xử lý',
      badge: guideBookings.filter((b) => b.bookingStatus === 'PENDING' || b.bookingStatus === 'WAITING_PAYMENT').length || undefined,
    },
    {
      id: 'CANCELLED_DISPUTED',
      label: 'Hủy / Tranh chấp',
      badge: guideBookings.filter((b) => b.bookingStatus === 'CANCELLED' || b.bookingStatus === 'DISPUTED').length || undefined,
    },
  ];

  const filtered = useMemo(() => {
    if (activeTab === 'all') return guideBookings;
    if (activeTab === 'PENDING_WAITING') {
      return guideBookings.filter(
        (b) => b.bookingStatus === 'PENDING' || b.bookingStatus === 'WAITING_PAYMENT'
      );
    }
    if (activeTab === 'CANCELLED_DISPUTED') {
      return guideBookings.filter(
        (b) => b.bookingStatus === 'CANCELLED' || b.bookingStatus === 'DISPUTED'
      );
    }
    return guideBookings.filter((b) => b.bookingStatus === activeTab);
  }, [guideBookings, activeTab]);

  const handleRequestComplete = (bookingId: string) => {
    requestCompletion(bookingId);
    showToast(
      `Đã gửi yêu cầu hoàn thành đơn ${bookingId}! Khách du lịch có 24 giờ để phản hồi.`,
      'success'
    );
  };

  const handleConfirmCash = (bookingId: string) => {
    confirmCashPayment(bookingId);
    showToast(
      `Đã xác nhận nhận 70% tiền mặt đơn ${bookingId}. Đơn đã chuyển sang PAID và cập nhật ví!`,
      'success'
    );
  };

  const handleGuideCancel = () => {
    if (!selectedBookingForCancel) return;
    guideCancelBooking(selectedBookingForCancel);
    showToast(
      `Đã hủy đơn ${selectedBookingForCancel}. Hệ thống đã hoàn trả 100% tiền cọc cho khách và ghi nhận vi phạm của Guide.`,
      'error'
    );
    setSelectedBookingForCancel(null);
  };

  return (
    <div className="py-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6E2D9] pb-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#14231A]">Đơn và ca làm việc của tôi (S-21)</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Quản lý các chuyến đi đã chốt, gửi yêu cầu hoàn thành và xác nhận nhận tiền mặt
          </p>
        </div>

        {/* Nút giả lập ca kết thúc cho demo */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-2 rounded-[8px] border border-[#D6E2D9] text-[12px]">
          <span className="text-[#4B5B50] font-semibold">Demo:</span>
          <button
            type="button"
            onClick={() => setDemoShiftEnded(!demoShiftEnded)}
            className={`px-2.5 py-1 rounded font-semibold ${
              demoShiftEnded ? 'bg-[#15803D] text-white' : 'bg-gray-100 text-[#14231A]'
            }`}
          >
            {demoShiftEnded ? '✓ Giả lập: Ca đã kết thúc' : 'Mô phỏng: Ca đã kết thúc'}
          </button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {filtered.length === 0 ? (
        <EmptyState
          title="Không có đơn nào trong mục này"
          description="Hiện tại không có đơn nào ở trạng thái bạn vừa chọn."
        />
      ) : (
        <div className="space-y-6">
          {filtered.map((b) => {
            const platformFee = Math.round(b.totalAmount * b.feeRate);
            const guideReceives = b.totalAmount - platformFee;
            const delta = b.deltaHours ?? Math.max(0, calcDeltaHours(b.date, b.startTime));

            // Điều kiện nút Yêu cầu hoàn thành: chỉ sau khi ca kết thúc (hoặc bật demo)
            const canRequestComplete =
              b.bookingStatus === 'CONFIRMED' && (delta <= 0 || demoShiftEnded);

            // Điều kiện nút Xác nhận tiền mặt: COMPLETED nhánh tiền mặt chưa PAID
            const canConfirmCash =
              b.bookingStatus === 'COMPLETED' &&
              b.paymentMethod === 'CASH' &&
              b.paymentStatus !== 'PAID';

            return (
              <div
                key={b.id}
                className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6E2D9] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#14231A] text-lg">{b.id}</span>
                      <StatusBadge status={b.bookingStatus} />
                      {b.bookingStatus !== 'CANCELLED' && b.bookingStatus !== 'DISPUTED' && (
                        <PaymentBadge status={b.paymentStatus} />
                      )}
                    </div>
                    <span className="text-[13px] text-[#4B5B50] mt-1 block">
                      Khách du lịch: <strong>Trần Minh Anh</strong> (0900 000 001)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[12px] text-[#4B5B50]">Thu nhập ước tính:</span>
                    <div className="text-[18px] font-bold text-[#15803D] tabular-nums">
                      {formatMoney(guideReceives)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[14px]">
                  <div className="space-y-1">
                    <div className="text-[#4B5B50]">
                      📅 Ngày: <strong className="text-[#14231A]">{formatDate(b.date)}</strong>
                    </div>
                    <div className="text-[#4B5B50]">
                      ⏰ Khung giờ: <strong className="text-[#14231A]">{formatTimeRange(b.startTime, b.endTime)} ({b.hours}h)</strong>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#4B5B50]">
                      📍 Điểm hẹn: <strong className="text-[#14231A]">{b.meetingLocation || 'Theo thỏa thuận'}</strong>
                    </div>
                    <div className="text-[#4B5B50]">
                      👥 Số khách: <strong className="text-[#14231A]">{b.guestCount} người</strong>
                    </div>
                  </div>
                </div>

                {/* Guide nhìn thấy chi tiết tiền và phí */}
                <PaymentSummary
                  total={b.totalAmount}
                  deposit={b.depositAmount}
                  remaining={b.remainingAmount}
                  platformFee={platformFee}
                  guideReceives={guideReceives}
                  mode="guide"
                />

                {/* Các nút hành động của Guide */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#D6E2D9]">
                  {/* Hủy đơn khi CONFIRMED: cảnh báo hoàn 100% & ghi vi phạm */}
                  {b.bookingStatus === 'CONFIRMED' && (
                    <Button
                      variant="danger"
                      onClick={() => setSelectedBookingForCancel(b.id)}
                      className="text-[13px] h-9 px-3"
                    >
                      Hủy đơn ca này
                    </Button>
                  )}

                  {/* Nút Yêu cầu hoàn thành: chỉ bật sau ca kết thúc */}
                  {b.bookingStatus === 'CONFIRMED' && (
                    <Button
                      variant="primary"
                      disabled={!canRequestComplete}
                      onClick={() => handleRequestComplete(b.id)}
                      className="text-[13px] h-9 px-4 font-semibold"
                    >
                      {canRequestComplete
                        ? '✓ Gửi yêu cầu hoàn thành'
                        : '🔒 Yêu cầu hoàn tất (Chỉ sau ca)'}
                    </Button>
                  )}

                  {/* Nút Xác nhận đã nhận tiền mặt */}
                  {canConfirmCash && (
                    <Button
                      variant="primary"
                      onClick={() => handleConfirmCash(b.id)}
                      className="text-[13px] h-9 px-4 font-bold bg-[#15803D]"
                    >
                      💵 Xác nhận đã nhận đủ {formatMoney(b.remainingAmount)} tiền mặt
                    </Button>
                  )}

                  {/* Đã thanh toán đủ */}
                  {b.bookingStatus === 'COMPLETED' && b.paymentStatus === 'PAID' && (
                    <span className="text-[13px] font-semibold text-[#166534] bg-[#DCFCE7] px-3 py-1 rounded-full">
                      ✓ Đã hoàn tất và quyết toán xong
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Guide hủy đơn CONFIRMED (S-16: cảnh báo hoàn 100% cho Tourist và ghi vi phạm) */}
      <Modal
        isOpen={Boolean(selectedBookingForCancel)}
        onClose={() => setSelectedBookingForCancel(null)}
        title="Cảnh báo hủy đơn từ phía Hướng dẫn viên (S-16)"
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelectedBookingForCancel(null)}>
              Đóng lại
            </Button>
            <Button variant="danger" onClick={handleGuideCancel}>
              Xác nhận hủy đơn & chấp nhận vi phạm
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-[14px]">
          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[8px] text-[#B91C1C]">
            ⚠️ <strong>Cảnh báo nghiêm trọng:</strong> Theo quy tắc nền tảng (BR), nếu Guide đơn phương hủy đơn đã xác nhận (CONFIRMED):
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Du khách sẽ được <strong>hoàn tiền 100%</strong> số tiền cọc đã đóng.</li>
              <li>Hệ thống sẽ <strong>ghi nhận 01 lần vi phạm</strong> hợp đồng của Guide vào hồ sơ quản trị.</li>
              <li>Hành vi hủy đơn cận ngày có thể dẫn tới việc tạm khóa tài khoản hướng dẫn viên.</li>
            </ul>
          </div>
          <p className="text-[#4B5B50]">
            Bạn có chắc chắn muốn hủy đơn <strong>{selectedBookingForCancel}</strong> không?
          </p>
        </div>
      </Modal>
    </div>
  );
};

