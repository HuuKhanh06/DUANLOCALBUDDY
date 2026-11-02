// pages/guide/AvailabilityPage.tsx (S-19: Cấu hình lịch rảnh)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { TimeSlot } from '../../components/common/GuideCard';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { formatDate } from '../../utils/time';

export const AvailabilityPage: React.FC = () => {
  const { slots, toggleSlotAvailability } = useBookingContext();
  const { showToast } = useToast();

  const [selectedDate, setSelectedDate] = useState('2026-11-02');
  const [hasChanges, setHasChanges] = useState(false);

  // Lọc slot của Guide hiện tại (Lê Hoàng Nam)
  const currentSlots = slots.filter(
    (s) => s.guideId === 'u-guide-1' && s.date === selectedDate
  );

  const handleSlotClick = (slotId: string, status: string) => {
    if (status === 'HOLD' || status === 'BUSY') {
      showToast('Khung giờ đang có đơn đặt hoặc đã được chốt, không thể thay đổi!', 'warning');
      return;
    }
    toggleSlotAvailability(slotId);
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    showToast('Đã lưu cấu hình lịch rảnh thành công!', 'success');
  };

  return (
    <div className="py-6 space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-[#D6E2D9] pb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-[26px] font-bold text-[#14231A]">Cấu hình lịch rảnh (S-19)</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Quản lý các ca làm việc của bạn. Du khách chỉ có thể đặt các khung giờ đang mở "Trống".
          </p>
        </div>

        <Button
          variant="primary"
          disabled={!hasChanges}
          onClick={handleSave}
          className="px-6"
        >
          💾 Lưu thay đổi
        </Button>
      </div>

      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-6">
        {/* Chọn ngày trong tuần */}
        <div>
          <label className="text-[14px] font-bold text-[#14231A] block mb-2">Chọn ngày làm việc:</label>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {['2026-11-02', '2026-11-03', '2026-11-04'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDate(d)}
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
        </div>

        {/* Lưới các ca trong ngày */}
        <div>
          <h3 className="text-[14px] font-medium text-[#4B5B50] mb-3">
            Danh sách ca trong ngày {formatDate(selectedDate)} (Nhấp để Mở hoặc Đóng ca trống):
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentSlots.map((slot) => (
              <div key={slot.id} className="relative group">
                <TimeSlot
                  startTime={slot.startTime}
                  endTime={slot.endTime}
                  status={slot.status}
                  onClick={() => handleSlotClick(slot.id, slot.status)}
                  holdSecondsLeft={slot.status === 'HOLD' ? 720 : undefined}
                />
                {(slot.status === 'HOLD' || slot.status === 'BUSY') && (
                  <div className="text-[11px] text-[#9A3412] text-center mt-1 font-medium">
                    🔒 Khóa chỉnh sửa ({slot.bookingId || 'Đã có đơn'})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chú thích các trạng thái */}
        <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[12px] p-4 text-[13px] space-y-2">
          <div className="font-bold text-[#14231A] mb-1">Quy tắc quản lý lịch rảnh:</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white border border-[#15803D]"></span>
            <span><strong>Trống (AVAILABLE):</strong> Ca mở để khách đặt. Bấm để đóng ca nếu bạn bận.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FFEDD5] border border-[#FDBA74]"></span>
            <span><strong>Đang giữ chỗ (HOLD):</strong> Khách đang trong 15 phút đặt cọc. Không thể sửa.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E5E7EB]"></span>
            <span><strong>Đã có lịch (BUSY):</strong> Đơn đã cọc hoặc ca đã bị khóa. Không thể sửa.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

