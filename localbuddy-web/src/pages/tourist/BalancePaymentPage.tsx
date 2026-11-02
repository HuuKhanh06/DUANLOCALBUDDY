// pages/tourist/BalancePaymentPage.tsx (S-13: Thanh toán 70% và quyết toán)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { useToast } from '../../components/ui/Toast';
import { formatMoney } from '../../utils/money';

export const BalancePaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookingById, payFinal } = useBookingContext();
  const { showToast } = useToast();

  const booking = getBookingById(id || '');

  // Lựa chọn phương thức: Online hoặc Tiền mặt (Cash)
  const [method, setMethod] = useState<'ONLINE' | 'CASH'>('ONLINE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [onlineFailed, setOnlineFailed] = useState(false);
  const [cashWaiting, setCashWaiting] = useState(false);

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

  const handleOnlinePay = (simulateSuccess: boolean) => {
    setIsProcessing(true);
    setOnlineFailed(false);

    setTimeout(() => {
      setIsProcessing(false);
      if (simulateSuccess) {
        payFinal(booking.id, 'ONLINE', true);
        showToast('Thanh toán 70% thành công! Chuyến đi đã quyết toán xong.', 'success');
        navigate(`/don/${booking.id}`);
      } else {
        setOnlineFailed(true);
        showToast('Giao dịch trực tuyến không thành công. Bạn có thể thử lại hoặc đổi sang trả tiền mặt.', 'error');
      }
    }, 600);
  };

  const handleCashConfirm = () => {
    payFinal(booking.id, 'CASH', true);
    setCashWaiting(true);
    showToast('Đã chọn thanh toán tiền mặt. Vui lòng thanh toán trực tiếp cho Guide.', 'info');
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4">
        <span className="text-[12px] font-bold text-[#15803D] uppercase tracking-wider">
          Quyết toán chuyến đi • {booking.id}
        </span>
        <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Thanh toán 70% còn lại</h1>
        <p className="text-[14px] text-[#4B5B50] mt-1">
          Chuyến đi đã hoàn thành. Vui lòng thanh toán khoản tiền còn lại cho hướng dẫn viên.
        </p>
      </div>

      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-6">
        <PaymentSummary
          total={booking.totalAmount}
          deposit={booking.depositAmount}
          remaining={booking.remainingAmount}
          mode="tourist"
        />

        <div className="p-4 bg-[#DCFCE7] rounded-[12px] border border-[#86EFAC] text-center">
          <span className="text-[13px] text-[#166534] block">Số tiền còn lại cần thanh toán (B = 70%):</span>
          <span className="text-[28px] font-bold text-[#15803D] tabular-nums">
            {formatMoney(booking.remainingAmount)}
          </span>
        </div>

        {cashWaiting ? (
          <div className="p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-[12px] space-y-3 text-center">
            <span className="text-3xl">💵</span>
            <h3 className="font-bold text-[16px] text-[#92400E]">Đang chờ Guide xác nhận đã nhận tiền mặt</h3>
            <p className="text-[13px] text-[#4B5B50]">
              Bạn đã chọn phương thức thanh toán tiền mặt trực tiếp. Khi Guide xác nhận đã nhận đủ số tiền tại màn hình của Guide, đơn sẽ chuyển sang <strong>Đã thanh toán đủ (PAID)</strong>.
            </p>
            <Button variant="primary" onClick={() => navigate(`/don/${booking.id}`)} className="mt-2">
              Quay lại chi tiết đơn
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold text-[#14231A]">Chọn phương thức thanh toán:</h3>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer transition-all ${
                  method === 'ONLINE'
                    ? 'border-[#15803D] bg-[#F6FAF6] font-semibold text-[#15803D]'
                    : 'border-[#D6E2D9] text-[#14231A]'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={method === 'ONLINE'}
                  onChange={() => {
                    setMethod('ONLINE');
                    setOnlineFailed(false);
                  }}
                  className="accent-[#15803D]"
                />
                <span>💳 Thanh toán Online</span>
              </label>

              <label
                className={`flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer transition-all ${
                  method === 'CASH'
                    ? 'border-[#15803D] bg-[#F6FAF6] font-semibold text-[#15803D]'
                    : 'border-[#D6E2D9] text-[#14231A]'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={method === 'CASH'}
                  onChange={() => {
                    setMethod('CASH');
                    setOnlineFailed(false);
                  }}
                  className="accent-[#15803D]"
                />
                <span>💵 Tiền mặt trực tiếp</span>
              </label>
            </div>

            {/* Khối xử lý cho Online */}
            {method === 'ONLINE' && (
              <div className="border border-[#D6E2D9] rounded-[12px] p-4 bg-white space-y-3">
                <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-2">
                  <span className="text-[13px] font-semibold text-[#14231A]">Cổng thanh toán giả lập</span>
                  <span className="text-[11px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded font-medium">Demo</span>
                </div>

                {onlineFailed ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
                      ✕ Thanh toán trực tuyến không thành công. Vui lòng thử lại hoặc chuyển sang trả tiền mặt.
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        isLoading={isProcessing}
                        onClick={() => handleOnlinePay(true)}
                        className="flex-1"
                      >
                        Thử lại Online
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setMethod('CASH')}
                        className="flex-1"
                      >
                        Chọn tiền mặt
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[13px] text-[#4B5B50]">
                      Mô phỏng cổng thanh toán trực tuyến:
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <Button
                        variant="primary"
                        isLoading={isProcessing}
                        onClick={() => handleOnlinePay(true)}
                        className="w-full"
                      >
                        ✓ Trả thành công
                      </Button>
                      <Button
                        variant="danger"
                        isLoading={isProcessing}
                        onClick={() => handleOnlinePay(false)}
                        className="w-full"
                      >
                        ✕ Giả lập lỗi
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Khối xử lý cho Tiền mặt */}
            {method === 'CASH' && (
              <div className="border border-[#D6E2D9] rounded-[12px] p-4 bg-[#F6FAF6] space-y-3">
                <p className="text-[13px] text-[#14231A]">
                  Bạn sẽ đưa <strong>{formatMoney(booking.remainingAmount)}</strong> trực tiếp cho Guide sau khi chuyến đi kết thúc. Guide sẽ xác nhận nhận tiền trên hệ thống.
                </p>
                <Button variant="primary" onClick={handleCashConfirm} className="w-full">
                  Xác nhận chọn trả tiền mặt
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

