// pages/guide/IncomingRequestsPage.tsx (S-20: Đơn đến: chấp nhận hoặc từ chối)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Countdown, EmptyState } from '../../components/common/GuideCard';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { useToast } from '../../components/ui/Toast';
import { formatDate, formatTimeRange } from '../../utils/time';
import { formatMoney } from '../../utils/money';

export const IncomingRequestsPage: React.FC = () => {
  const { bookings, acceptBooking, rejectBooking } = useBookingContext();
  const { showToast } = useToast();

  // Chỉ lấy các đơn PENDING (Chờ Guide xác nhận)
  const incomingBookings = bookings.filter((b) => b.bookingStatus === 'PENDING');

  // Modal từ chối
  const [rejectModalBookingId, setRejectModalBookingId] = useState<string | null>(null);

  const handleAccept = (bookingId: string) => {
    acceptBooking(bookingId);
    showToast(
      `Đã chấp nhận đơn ${bookingId}! Khách du lịch có 15 phút để hoàn tất đặt cọc.`,
      'success'
    );
  };

  const handleConfirmReject = () => {
    if (!rejectModalBookingId) return;
    rejectBooking(rejectModalBookingId);
    showToast(`Đã từ chối đơn ${rejectModalBookingId}. Khung giờ đã được mở lại.`, 'info');
    setRejectModalBookingId(null);
  };

  return (
    <div className="py-6 space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-[#D6E2D9] pb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-[26px] font-bold text-[#14231A]">Đơn yêu cầu đặt lịch đến (S-20)</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Các đơn mới gửi từ du khách. Hướng dẫn viên cần phản hồi trong vòng 24 giờ.
          </p>
        </div>
        <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-[13px] font-bold">
          {incomingBookings.length} đơn đang chờ
        </span>
      </div>

      {incomingBookings.length === 0 ? (
        <EmptyState
          title="Hiện chưa có đơn đặt lịch mới nào"
          description="Khi du khách chọn khung giờ và gửi yêu cầu, đơn sẽ xuất hiện tại đây để bạn duyệt trong vòng 24 giờ."
        />
      ) : (
        <div className="space-y-6">
          {incomingBookings.map((b) => {
            const platformFee = Math.round(b.totalAmount * b.feeRate);
            const guideReceives = b.totalAmount - platformFee;

            return (
              <div
                key={b.id}
                className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6E2D9] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#15803D]">{b.id}</span>
                      <span className="text-[12px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded font-semibold">
                        Chờ phản hồi
                      </span>
                    </div>
                    <h3 className="text-[18px] font-bold text-[#14231A] mt-1">
                      Khách du lịch: Trần Minh Anh
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Countdown seconds={86400} label="Hạn phản hồi 24h" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px]">
                  <div className="space-y-1.5">
                    <div className="text-[#4B5B50]">
                      📅 Ngày: <strong className="text-[#14231A]">{formatDate(b.date)}</strong>
                    </div>
                    <div className="text-[#4B5B50]">
                      ⏰ Ca: <strong className="text-[#14231A]">{formatTimeRange(b.startTime, b.endTime)} ({b.hours} giờ)</strong>
                    </div>
                    <div className="text-[#4B5B50]">
                      👥 Số lượng: <strong className="text-[#14231A]">{b.guestCount} người</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[#4B5B50]">
                      📍 Điểm đón: <strong className="text-[#14231A]">{b.meetingLocation || 'Theo thỏa thuận'}</strong>
                    </div>
                    {b.specialRequests && (
                      <div className="text-[#4B5B50]">
                        📝 Ghi chú: <span className="text-[#14231A] italic">{b.specialRequests}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tóm tắt thanh toán: GUIDE NHÌN THẤY PHÍ SÀN 12% VÀ SỐ TIỀN THỰC NHẬN */}
                <PaymentSummary
                  total={b.totalAmount}
                  deposit={b.depositAmount}
                  remaining={b.remainingAmount}
                  platformFee={platformFee}
                  guideReceives={guideReceives}
                  mode="guide"
                />

                <div className="flex items-center justify-between border-t border-[#D6E2D9] pt-4">
                  <div className="text-[13px] text-[#4B5B50]">
                    Nếu từ chối, khung giờ sẽ được mở lại ngay trên lịch khả dụng của bạn.
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="danger"
                      onClick={() => setRejectModalBookingId(b.id)}
                      className="px-4"
                    >
                      ✕ Từ chối đơn
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => handleAccept(b.id)}
                      className="px-5 font-bold"
                    >
                      ✓ Chấp nhận đơn
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal xác nhận từ chối đơn */}
      <Modal
        isOpen={Boolean(rejectModalBookingId)}
        onClose={() => setRejectModalBookingId(null)}
        title="Xác nhận từ chối đơn đặt lịch"
        footer={
          <>
            <Button variant="ghost" onClick={() => setRejectModalBookingId(null)}>
              Quay lại
            </Button>
            <Button variant="danger" onClick={handleConfirmReject}>
              Xác nhận từ chối
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#4B5B50]">
          Bạn có chắc chắn muốn từ chối yêu cầu đặt lịch <strong>{rejectModalBookingId}</strong> không? Đơn sẽ chuyển sang trạng thái <strong>Đã hủy</strong> và khung giờ được trả về trống.
        </p>
      </Modal>
    </div>
  );
};

