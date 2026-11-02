// pages/guide/ProfileAndPricePage.tsx (S-18: Hồ sơ, giá và trạng thái xác minh Guide)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { formatMoney } from '../../utils/money';

export const ProfileAndPricePage: React.FC = () => {
  const { allGuides, updateGuidePrice } = useBookingContext();
  const { showToast } = useToast();

  const guideItem = allGuides.find((g) => g.user.id === 'u-guide-1');
  const [rate, setRate] = useState<number>(guideItem?.profile.hourlyRate || 200000);
  const [bio, setBio] = useState<string>(guideItem?.profile.bio || '');
  const [errorMsg, setErrorMsg] = useState('');

  if (!guideItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quy tắc nghiệp vụ RQ-18: Giá theo giờ từ 80.000 đến 500.000 đ
    if (rate < 80000 || rate > 500000) {
      setErrorMsg('Mức giá theo giờ phải nằm trong khoảng từ 80.000 đ đến 500.000 đ.');
      return;
    }

    const ok = updateGuidePrice('u-guide-1', rate, bio);
    if (ok) {
      showToast('Đã cập nhật hồ sơ và giá dịch vụ thành công!', 'success');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4">
        <h1 className="text-[26px] font-bold text-[#14231A]">Hồ sơ, Giá & Xác minh (S-18)</h1>
        <p className="text-[14px] text-[#4B5B50] mt-1">
          Quản lý thông tin giới thiệu và điều chỉnh đơn giá tour theo giờ của bạn
        </p>
      </div>

      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-6">
        {/* Huy hiệu xác minh */}
        <div className="p-4 bg-[#F6FAF6] border border-[#D6E2D9] rounded-[12px] flex items-center justify-between">
          <div>
            <span className="text-[12px] font-semibold text-[#4B5B50] block">Trạng thái tài khoản:</span>
            <span className="text-[16px] font-bold text-[#14231A]">
              {guideItem.profile.isVerified ? '✓ Đã xác minh danh tính (Verified)' : '⏳ Chờ xác minh KYC'}
            </span>
          </div>
          <span className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-[13px] font-semibold">
            Đang hoạt động
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Đơn giá theo giờ (VND / giờ) *"
            type="number"
            min={80000}
            max={500000}
            step={10000}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            hint="Quy định nền tảng: từ 80.000 đ đến 500.000 đ / giờ"
          />

          <div className="text-[13px] text-[#15803D] font-semibold">
            Đơn giá đang chọn: {formatMoney(rate)} / giờ
          </div>

          <Textarea
            label="Lời giới thiệu bản thân (Bio) *"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Chia sẻ kinh nghiệm, sở trường và văn hóa Đà Nẵng..."
          />

          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
              {errorMsg}
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full">
              Lưu thay đổi hồ sơ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

