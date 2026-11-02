// pages/admin/FeeConfigPage.tsx (S-31: Cấu hình phí sàn)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

export const FeeConfigPage: React.FC = () => {
  const { feeRate, updateFeeRate } = useBookingContext();
  const { showToast } = useToast();

  // Tỷ lệ phần trăm hiển thị (10% - 15%)
  const [percent, setPercent] = useState<number>(Math.round(feeRate * 100));
  const [errorMsg, setErrorMsg] = useState('');

  const handleSaveFee = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quy tắc nghiệp vụ RQ-05 / UC.29: Phí sàn từ 10% đến 15%
    if (percent < 10 || percent > 15) {
      setErrorMsg('Tỷ lệ phí sàn nền tảng bắt buộc phải nằm trong khoảng từ 10% đến 15%.');
      return;
    }

    const newRate = percent / 100;
    const ok = updateFeeRate(newRate);
    if (ok) {
      showToast(
        `Đã cập nhật tỷ lệ phí sàn mới: ${percent}%. Tỷ lệ này sẽ áp dụng cho tất cả các đơn đặt mới tạo (S-08).`,
        'success'
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4">
        <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">S-31 • ADMIN PORTAL</span>
        <h1 className="text-[26px] font-bold text-[#14231A] mt-0.5">Cấu hình phí sàn nền tảng (Fee_Rate)</h1>
        <p className="text-[14px] text-[#4B5B50] mt-1">
          Thiết lập tỷ lệ chiết khấu nền tảng áp dụng khi du khách đặt lịch với hướng dẫn viên
        </p>
      </div>

      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-6">
        <div className="p-4 bg-[#F6FAF6] border border-[#86EFAC] rounded-[12px] flex items-center justify-between">
          <div>
            <span className="text-[12px] font-medium text-[#4B5B50] block">Tỷ lệ phí sàn đang áp dụng:</span>
            <span className="text-[28px] font-bold text-[#15803D] tabular-nums">
              {Math.round(feeRate * 100)}%
            </span>
          </div>
          <span className="text-[12px] bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full font-bold">
            Đang hoạt động
          </span>
        </div>

        <form onSubmit={handleSaveFee} className="space-y-4">
          <Input
            label="Tỷ lệ phí sàn mới (%) *"
            type="number"
            min={10}
            max={15}
            step={1}
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            hint="Giới hạn theo quy tắc nghiệp vụ: từ 10% đến 15%"
          />

          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
              {errorMsg}
            </div>
          )}

          <div className="p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-[10px] text-[13px] text-[#92400E] space-y-1">
            <strong>Lưu ý về quy tắc chụp tỷ lệ (Snapshotted Fee_Rate):</strong>
            <p>
              Tỷ lệ phí sàn được <strong>chụp cố định tại thời điểm tạo đơn</strong>. Khi Admin thay đổi tỷ lệ tại đây, chỉ các đơn mới tạo tại <code>S-08</code> mới áp dụng mức {percent}%. Các đơn cũ (BK-1001 đến BK-1007) vẫn giữ nguyên tỷ lệ 12% ban đầu.
            </p>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Lưu cấu hình phí sàn
          </Button>
        </form>
      </div>
    </div>
  );
};

