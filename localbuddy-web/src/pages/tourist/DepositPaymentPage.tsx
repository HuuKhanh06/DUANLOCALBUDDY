// pages/tourist/DepositPaymentPage.tsx (S-09)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { Countdown } from '../../components/common/GuideCard';
import { Button } from '../../components/ui/Button';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { useToast } from '../../components/ui/Toast';
import { formatMoney } from '../../utils/money';
import { formatDate, formatTimeRange } from '../../utils/time';

export const DepositPaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookingById, getGuideById, payDeposit, expireDeposit } = useBookingContext();
  const { showToast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);

  const booking = getBookingById(id || '');
  const guideItem = booking ? getGuideById(booking.guideId) : undefined;

  if (!booking) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold">Không tìm thấy đơn đặt lịch</h2>
        <Button variant="primary" onClick={() => navigate('/don-cua-toi')} className="mt-4">
          Về danh sách đơn
        </Button>
      </div>
    );
  }

  // Xử lý khi hết hạn 15 phút
  const handleExpire = () => {
    setHasExpired(true);
    expireDeposit(booking.id);
    showToast('Đã hết 15 phút, đơn đặt lịch đã tự động bị hủy.', 'error');
  };

  // Giả lập thanh toán
  const handlePayment = (isSuccess: boolean) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const ok = payDeposit(booking.id, isSuccess);

      if (ok) {
        showToast('Đặt cọc 30% thành công! Đơn đã được xác nhận.', 'success');
        navigate(`/don/${booking.id}`);
      } else {
        showToast('Thanh toán không thành công. Bạn có thể thử lại trước khi hết giờ.', 'error');
      }
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-[12px] font-bold text-[#15803D] uppercase tracking-wider">
            Thanh toán cọc 30% • {booking.id}
          </span>
          <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Đặt cọc giữ chỗ</h1>
        </div>

        {!hasExpired && booking.bookingStatus === 'WAITING_PAYMENT' && (
          <Countdown seconds={900} onExpire={handleExpire} label="Hạn cọc" />
        )}
      </div>

      {hasExpired || booking.bookingStatus === 'CANCELLED' ? (
        <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-[16px] p-6 text-center space-y-4">
          <span className="text-4xl">⏰</span>
          <h2 className="text-[20px] font-bold text-[#B91C1C]">Đã hết hạn đặt cọc 15 phút</h2>
          <p className="text-[14px] text-[#4B5B50]">
            Đơn {booking.id} đã bị hủy tự động và khung giờ đã được hoàn trả lại cho hướng dẫn viên.
          </p>
          <Button variant="primary" onClick={() => navigate('/guides')}>
            Tìm & đặt lịch lại
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-6">
          {/* Thông tin đơn */}
          <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[12px] p-4 text-[14px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Hướng dẫn viên:</span>
              <span className="font-semibold text-[#14231A]">
                {guideItem?.user.fullName || 'Lê Hoàng Nam'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Thời gian:</span>
              <span className="font-semibold text-[#14231A]">
                {formatDate(booking.date)} ({formatTimeRange(booking.startTime, booking.endTime)})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Số khách:</span>
              <span className="font-semibold text-[#14231A]">{booking.guestCount} người</span>
            </div>
          </div>

          {/* Tóm tắt số tiền */}
          <PaymentSummary
            total={booking.totalAmount}
            deposit={booking.depositAmount}
            remaining={booking.remainingAmount}
            mode="tourist"
          />

          <div className="p-4 bg-[#DCFCE7] rounded-[12px] border border-[#86EFAC] text-center">
            <span className="text-[13px] text-[#166534] block">Số tiền cọc cần thanh toán ngay:</span>
            <span className="text-[28px] font-bold text-[#15803D] tabular-nums">
              {formatMoney(booking.depositAmount)}
            </span>
          </div>

          {/* Cổng giả lập */}
          <div className="border border-[#D6E2D9] rounded-[12px] p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-3">
              <span className="font-semibold text-[14px] text-[#14231A]">
                Cổng thanh toán giả lập (Demo Antigravity)
              </span>
              <span className="text-[11px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded font-medium">
                Không giao dịch thật
              </span>
            </div>

            <p className="text-[13px] text-[#4B5B50]">
              Chọn kết quả mô phỏng bên dưới để kiểm thử các luồng nghiệp vụ của hệ thống:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="primary"
                isLoading={isProcessing}
                onClick={() => handlePayment(true)}
                className="w-full"
              >
                ✓ Thanh toán Thành Công
              </Button>

              <Button
                variant="danger"
                isLoading={isProcessing}
                onClick={() => handlePayment(false)}
                className="w-full"
              >
                ✕ Thanh toán Thất Bại
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

