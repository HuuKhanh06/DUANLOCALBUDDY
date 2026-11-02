// components/common/PaymentSummary.tsx
import React from 'react';
import { formatMoney } from '../../utils/money';

interface PaymentSummaryProps {
  total: number;         // G
  deposit: number;       // D
  remaining: number;     // B
  platformFee?: number;  // Phí sàn (chỉ cho Guide & Admin)
  guideReceives?: number;// Tiền Guide nhận (chỉ cho Guide & Admin)
  mode: 'tourist' | 'guide' | 'admin';
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  total,
  deposit,
  remaining,
  platformFee,
  guideReceives,
  mode,
}) => {
  return (
    <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[12px] p-4 space-y-2.5">
      <h4 className="text-[14px] font-semibold text-[#14231A] mb-3">Tóm tắt thanh toán</h4>
      
      <div className="flex justify-between text-[14px]">
        <span className="text-[#4B5B50]">Tổng tiền dịch vụ (G):</span>
        <span className="font-semibold tabular-nums text-[#14231A]">{formatMoney(total)}</span>
      </div>

      <div className="flex justify-between text-[14px]">
        <span className="text-[#4B5B50]">Đặt cọc 30% (D):</span>
        <span className="font-semibold tabular-nums text-[#15803D]">{formatMoney(deposit)}</span>
      </div>

      <div className="flex justify-between text-[14px]">
        <span className="text-[#4B5B50]">Còn lại 70% (B):</span>
        <span className="font-semibold tabular-nums text-[#14231A]">{formatMoney(remaining)}</span>
      </div>

      {/* Guide và Admin mới thấy phí sàn và thu nhập thực */}
      {mode !== 'tourist' && platformFee !== undefined && (
        <>
          <div className="border-t border-[#D6E2D9] pt-2 flex justify-between text-[14px]">
            <span className="text-[#4B5B50]">Phí sàn nền tảng:</span>
            <span className="text-[#92400E] tabular-nums font-medium">-{formatMoney(platformFee)}</span>
          </div>

          {guideReceives !== undefined && (
            <div className="flex justify-between text-[14px] font-bold text-[#15803D] border-t border-[#D6E2D9] pt-2">
              <span>Guide thực nhận (Online):</span>
              <span className="tabular-nums">{formatMoney(guideReceives)}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

