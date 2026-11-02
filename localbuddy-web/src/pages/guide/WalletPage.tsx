// pages/guide/WalletPage.tsx (S-24: Ví và rút tiền)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { formatMoney } from '../../utils/money';
import { formatDate } from '../../utils/time';

export const WalletPage: React.FC = () => {
  const { walletBalance, withdrawals, requestWithdrawal } = useBookingContext();
  const { showToast } = useToast();

  const [withdrawAmount, setWithdrawAmount] = useState<number>(200000);
  const [bankAccount, setBankAccount] = useState('1029384756 - Vietcombank');
  const [errorMsg, setErrorMsg] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quy tắc nghiệp vụ RQ-17: Rút tiền tối thiểu 200.000 đ
    if (withdrawAmount < 200000) {
      setErrorMsg('Số tiền rút tối thiểu là 200.000 đ.');
      return;
    }

    if (withdrawAmount > walletBalance) {
      setErrorMsg('Số tiền rút không được vượt quá số dư khả dụng hiện tại.');
      return;
    }

    const ok = requestWithdrawal(withdrawAmount);
    if (ok) {
      showToast(
        `Đã tạo yêu cầu rút ${formatMoney(withdrawAmount)} thành công! Quản trị viên sẽ chuyển khoản thủ công.`,
        'success'
      );
    }
  };

  const isBelowMin = walletBalance < 200000;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4">
        <h1 className="text-[26px] font-bold text-[#14231A]">Ví thu nhập & Rút tiền (S-24)</h1>
        <p className="text-[14px] text-[#4B5B50] mt-1">
          Theo dõi số dư khả dụng từ các chuyến đi đã hoàn thành và gửi lệnh yêu cầu rút tiền
        </p>
      </div>

      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-6">
        {/* Số dư khả dụng */}
        <div className="p-6 bg-[#F6FAF6] border border-[#86EFAC] rounded-[16px] text-center space-y-2">
          <span className="text-[14px] font-medium text-[#4B5B50]">Số dư khả dụng hiện tại:</span>
          <div className="text-[36px] font-bold text-[#15803D] tabular-nums">
            {formatMoney(walletBalance)}
          </div>
          <span className="text-[12px] text-[#4B5B50] block">
            * Số dư chỉ được cộng khi đơn đặt lịch đã thanh toán đủ (PAID).
          </span>
        </div>

        {/* Biểu mẫu rút tiền */}
        <form onSubmit={handleWithdraw} className="space-y-4 border-t border-[#D6E2D9] pt-4">
          <h3 className="text-[16px] font-bold text-[#14231A]">Tạo lệnh rút tiền về tài khoản ngân hàng</h3>

          <Input
            label="Số tài khoản ngân hàng nhận tiền"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
          />

          <Input
            label="Số tiền cần rút (VND) *"
            type="number"
            min={200000}
            max={walletBalance}
            step={50000}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            hint="Mức rút tối thiểu: 200.000 đ"
          />

          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
              {errorMsg}
            </div>
          )}

          {isBelowMin && (
            <div className="p-3 bg-[#FEF3C7] text-[#92400E] rounded-[8px] text-[13px]">
              ⚠️ Số dư khả dụng hiện tại dưới 200.000 đ. Bạn chưa đủ điều kiện tạo lệnh rút tiền.
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isBelowMin}
            className="w-full"
          >
            Gửi yêu cầu rút tiền
          </Button>

          <p className="text-[11px] text-[#4B5B50] text-center italic">
            Giao dịch thanh toán và chuyển khoản là mô phỏng học phần. Admin duyệt chuyển khoản thủ công tại S-28.
          </p>
        </form>
      </div>

      {/* Lịch sử lệnh rút */}
      {withdrawals.length > 0 && (
        <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-4">
          <h3 className="text-[16px] font-bold text-[#14231A]">Lịch sử yêu cầu rút tiền</h3>
          <div className="divide-y divide-[#D6E2D9]">
            {withdrawals.map((w) => (
              <div key={w.id} className="py-3 flex items-center justify-between text-[14px]">
                <div>
                  <span className="font-mono font-bold text-[#14231A]">{w.id}</span>
                  <span className="text-[12px] text-[#4B5B50] block">{formatDate(w.createdAt.split('T')[0])}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#15803D] tabular-nums">-{formatMoney(w.amount)}</span>
                  <span className="text-[11px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded font-semibold block mt-0.5">
                    {w.status === 'PENDING' ? 'Chờ Admin duyệt' : w.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

