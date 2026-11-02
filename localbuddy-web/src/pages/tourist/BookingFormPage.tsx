// pages/tourist/BookingFormPage.tsx (S-08)
import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { useToast } from '../../components/ui/Toast';
import { formatDate, calcDeltaHours } from '../../utils/time';

export const BookingFormPage: React.FC = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getGuideById, createBooking, slots } = useBookingContext();
  const { showToast } = useToast();

  const guideItem = getGuideById(guideId || '');
  const date = searchParams.get('date') || '2026-11-05';
  const startTime = searchParams.get('start') || '09:00';
  const endTime = searchParams.get('end') || '12:00';

  // Form states
  const [guestCount, setGuestCount] = useState<number>(2);
  const [location, setLocation] = useState('Bãi biển Mỹ Khê, Đà Nẵng');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!guideItem) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold">Không tìm thấy thông tin Guide</h2>
        <Button variant="primary" onClick={() => navigate('/guides')} className="mt-4">
          Quay lại tìm kiếm
        </Button>
      </div>
    );
  }

  const { user, profile } = guideItem;
  const hours = 3; // Ví dụ 09:00 - 12:00 = 3h
  const totalAmount = profile.hourlyRate * hours;
  const depositAmount = Math.round(totalAmount * 0.3);
  const remainingAmount = totalAmount - depositAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!guestCount || guestCount < 1) {
      setErrorMsg('Vui lòng nhập số lượng khách hợp lệ (tối thiểu 1 khách).');
      return;
    }

    // Kiểm tra giờ bắt đầu phải cách thời điểm đặt ít nhất 24 giờ [S]
    const delta = calcDeltaHours(date, startTime);
    if (delta < 24) {
      setErrorMsg('Theo quy định, giờ bắt đầu ca phải cách thời điểm đặt ít nhất 24 giờ để Guide kịp chuẩn bị.');
      return;
    }

    // Atomic Lock check: kiểm tra xem khung giờ này có vừa bị ai đặt không
    const currentSlot = slots.find(
      (s) => s.guideId === user.id && s.date === date && s.startTime === startTime
    );

    if (currentSlot && currentSlot.status === 'BUSY') {
      setErrorMsg('Khung giờ này vừa được đặt, vui lòng chọn khung khác.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newBooking = createBooking({
        guideId: user.id,
        date,
        startTime,
        endTime,
        hours,
        guestCount,
        meetingLocation: location,
        specialRequests,
      });

      showToast('Đã gửi yêu cầu đặt lịch, chờ Guide xác nhận trong 24 giờ!', 'success');
      navigate(`/don/${newBooking.id}`);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-[#D6E2D9] pb-4">
        <h1 className="text-[24px] font-bold text-[#14231A]">Xác nhận đặt lịch hướng dẫn viên</h1>
        <p className="text-[14px] text-[#4B5B50] mt-1">
          Điền thông tin chuyến đi để gửi yêu cầu đến Guide {user.fullName}
        </p>
      </div>

      {/* Tóm tắt ca làm việc đã chọn */}
      <div className="bg-white border border-[#D6E2D9] rounded-[12px] p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold flex items-center justify-center text-lg">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-[16px] text-[#14231A]">{user.fullName}</h3>
            <span className="text-[13px] text-[#4B5B50]">
              📅 {formatDate(date)} • ⏰ {startTime} – {endTime} ({hours} giờ)
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/guides/${user.id}`)}
          className="text-[13px] text-[#15803D] font-semibold hover:underline"
        >
          Đổi ca khác
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-5">
        <Input
          label="Số lượng khách tham gia * (Bắt buộc)"
          type="number"
          min={1}
          max={20}
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          hint="Bao gồm cả người lớn và trẻ em"
        />

        <Input
          label="Địa điểm gặp mặt đón khách (Tùy chọn)"
          placeholder="Ví dụ: Khách sạn Mường Thanh, bãi biển Mỹ Khê..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Textarea
          label="Yêu cầu riêng / Lưu ý đặc biệt (Tùy chọn)"
          placeholder="Ví dụ: Cần tour nhiều điểm chụp ảnh, có người lớn tuổi..."
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
        />

        {/* Tóm tắt thanh toán (Chế độ Tourist: TUYỆT ĐỐI KHÔNG HIỂN THỊ PHÍ SÀN theo Q13) */}
        <div>
          <PaymentSummary
            total={totalAmount}
            deposit={depositAmount}
            remaining={remainingAmount}
            mode="tourist"
          />
          <p className="text-[12px] text-[#4B5B50] mt-2 italic">
            * Bạn chưa cần thanh toán ngay. Sau khi Guide chấp nhận đơn, bạn sẽ có 15 phút để thanh toán cọc 30%.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
            {errorMsg}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#D6E2D9]">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(`/guides/${user.id}`)}
          >
            ← Quay lại
          </Button>

          <Button type="submit" variant="primary" isLoading={isSubmitting} className="px-6">
            Gửi yêu cầu đặt lịch
          </Button>
        </div>
      </form>
    </div>
  );
};

