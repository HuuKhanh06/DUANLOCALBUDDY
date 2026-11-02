// pages/tourist/GuideProfilePage.tsx (S-07)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { TimeSlot } from '../../components/common/GuideCard';
import { Button } from '../../components/ui/Button';
import { formatMoney } from '../../utils/money';
import { formatDate } from '../../utils/time';
import { TimeSlotData } from '../../types';

export const GuideProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGuideById, slots, reviews, currentUser } = useBookingContext();

  const guideItem = getGuideById(id || '');
  const [selectedDate, setSelectedDate] = useState('2026-11-02');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotData | null>(null);

  if (!guideItem) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold text-[#14231A]">Không tìm thấy hướng dẫn viên</h2>
        <Button variant="primary" onClick={() => navigate('/guides')} className="mt-4">
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const { user, profile } = guideItem;

  // Lọc các khung giờ của Guide này theo ngày đang chọn
  const daySlots = slots.filter(
    (s) => s.guideId === user.id && s.date === selectedDate
  );

  // Đánh giá của Guide này
  const guideReviews = reviews.filter((r) => r.guideId === user.id);

  const handleProceedBooking = () => {
    if (!selectedSlot) return;

    if (!currentUser) {
      navigate('/dang-nhap');
      return;
    }

    // Chuyển sang màn S-08 kèm params
    navigate(
      `/dat-lich/${user.id}?date=${selectedSlot.date}&start=${selectedSlot.startTime}&end=${selectedSlot.endTime}`
    );
  };

  return (
    <div className="py-6 space-y-8 max-w-4xl mx-auto">
      {/* Khối thông tin Guide */}
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold flex items-center justify-center text-4xl flex-shrink-0">
          {user.fullName.charAt(0)}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[24px] font-bold text-[#14231A]">{user.fullName}</h1>
                {profile.isVerified && (
                  <span className="text-[12px] bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full font-semibold">
                    ✓ Đã xác minh
                  </span>
                )}
              </div>
              <p className="text-[14px] text-[#4B5B50] mt-0.5">Local Guide Đà Nẵng</p>
            </div>

            <div className="text-right">
              <span className="text-[12px] text-[#4B5B50]">Giá dịch vụ:</span>
              <div className="text-[22px] font-bold text-[#15803D] tabular-nums">
                {formatMoney(profile.hourlyRate)}/giờ
              </div>
            </div>
          </div>

          <p className="text-[15px] text-[#14231A] leading-relaxed">{profile.bio}</p>

          <div className="flex flex-wrap items-center gap-4 text-[13px] pt-1">
            <div className="flex items-center gap-1 font-semibold text-[#14231A]">
              <span className="text-amber-500 text-base">★</span>
              <span>{profile.avgRating.toFixed(1)}</span>
              <span className="text-[#4B5B50] font-normal">({profile.totalReviews} đánh giá)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.areas.map((a, i) => (
                <span key={i} className="bg-[#F6FAF6] border border-[#D6E2D9] px-2.5 py-0.5 rounded-md text-[#4B5B50]">
                  📍 {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lịch khả dụng & Đặt ca */}
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-3">
          <h2 className="text-[18px] font-bold text-[#14231A]">Lịch làm việc khả dụng</h2>
          <span className="text-[13px] text-[#4B5B50]">Chọn khung giờ trống để đặt lịch</span>
        </div>

        {/* Bộ chọn ngày */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {['2026-11-02', '2026-11-03', '2026-11-04'].map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDate(d);
                setSelectedSlot(null);
              }}
              className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold border transition-colors ${
                selectedDate === d
                  ? 'bg-[#15803D] text-white border-[#15803D]'
                  : 'bg-white border-[#D6E2D9] text-[#14231A] hover:border-[#15803D]'
              }`}
            >
              📅 {formatDate(d)}
            </button>
          ))}
        </div>

        {/* Lưới khung giờ */}
        <div>
          <h3 className="text-[14px] font-medium text-[#4B5B50] mb-3">
            Khung giờ ngày {formatDate(selectedDate)}:
          </h3>

          {daySlots.length === 0 ? (
            <div className="p-4 bg-[#F6FAF6] rounded-[8px] text-center text-[14px] text-[#4B5B50]">
              Chưa có khung giờ làm việc nào cho ngày này.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {daySlots.map((slot) => (
                <TimeSlot
                  key={slot.id}
                  startTime={slot.startTime}
                  endTime={slot.endTime}
                  status={slot.status}
                  isSelected={selectedSlot?.id === slot.id}
                  onClick={() => setSelectedSlot(slot)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Chú giải trạng thái */}
        <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#4B5B50] pt-2 border-t border-[#D6E2D9]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white border border-[#D6E2D9]"></span> Trống (Có thể đặt)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FFEDD5] border border-[#FDBA74]"></span> Đang giữ chỗ (HOLD)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E5E7EB]"></span> Đã có lịch (BUSY)
          </span>
        </div>

        {/* Nút hành động đặt lịch */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D6E2D9]">
          <div>
            {selectedSlot ? (
              <span className="text-[14px] font-semibold text-[#15803D]">
                Đã chọn: {selectedSlot.startTime} – {selectedSlot.endTime} ({formatDate(selectedSlot.date)})
              </span>
            ) : (
              <span className="text-[14px] text-[#4B5B50]">Vui lòng nhấp chọn 1 khung giờ trống ở trên</span>
            )}
          </div>
          <Button
            variant="primary"
            disabled={!selectedSlot}
            onClick={handleProceedBooking}
            className="px-6"
          >
            Tiến hành Đặt lịch →
          </Button>
        </div>
      </div>

      {/* Đánh giá từ khách du lịch */}
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-4">
        <h2 className="text-[18px] font-bold text-[#14231A]">
          Đánh giá từ khách du lịch ({guideReviews.length})
        </h2>

        {guideReviews.length === 0 ? (
          <p className="text-[14px] text-[#4B5B50]">Chưa có đánh giá nào cho hướng dẫn viên này.</p>
        ) : (
          <div className="divide-y divide-[#D6E2D9]">
            {guideReviews.map((rev) => (
              <div key={rev.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[14px] text-[#14231A]">Trần Minh Anh</span>
                  <span className="text-amber-500 text-sm">{'★'.repeat(rev.stars)}</span>
                </div>
                <p className="text-[14px] text-[#4B5B50]">{rev.comment}</p>
                <span className="text-[11px] text-[#4B5B50]">{formatDate(rev.createdAt.split('T')[0])}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

