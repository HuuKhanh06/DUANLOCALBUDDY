// pages/UIKitPage.tsx – Trang kiểm chứng Design System và Component
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { StatusBadge, PaymentBadge } from '../components/common/StatusBadge';
import { PaymentSummary } from '../components/common/PaymentSummary';
import { BookingCard } from '../components/common/BookingCard';
import { GuideCard, TimeSlot, Countdown, EmptyState, LoadingState, ErrorState } from '../components/common/GuideCard';
import { mockBookings } from '../data/bookings';
import { BookingStatus, PaymentStatus, SlotStatus } from '../types';

export const UIKitPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(0);

  const bookingStatuses: BookingStatus[] = [
    'PENDING',
    'WAITING_PAYMENT',
    'CONFIRMED',
    'COMPLETED',
    'DISPUTED',
    'CANCELLED',
  ];

  const paymentStatuses: PaymentStatus[] = [
    'UNPAID',
    'WAITING_DEPOSIT',
    'DEPOSITED',
    'WAITING_FINAL',
    'PAID',
    'WAITING_REFUND',
    'REFUNDED',
    'WAITING_RECONCILE',
  ];

  const slotStatuses: SlotStatus[] = ['AVAILABLE', 'HOLD', 'BUSY'];

  return (
    <div className="max-w-[1100px] mx-auto py-8 px-4 space-y-10">
      <div className="border-b border-[#D6E2D9] pb-4">
        <h1 className="text-[28px] font-bold text-[#14231A]">🎨 LOCALBUDDY UI-Kit & Design System</h1>
        <p className="text-[14px] text-[#4B5B50] mt-1">
          Bảng kiểm chứng toàn bộ component, màu sắc token, trạng thái huy hiệu và phản hồi giao diện theo Mục 4 của đặc tả.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'badges', label: '1. Huy hiệu Trạng thái' },
          { id: 'buttons', label: '2. Nút & Ô nhập' },
          { id: 'slots', label: '3. Khung giờ & Đồng hồ' },
          { id: 'cards', label: '4. Thẻ & Tóm tắt tiền' },
          { id: 'feedback', label: '5. Modal & Trạng thái' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: BADGES */}
      {activeTab === 'badges' && (
        <div className="space-y-8 bg-white p-6 rounded-[16px] border border-[#D6E2D9]">
          <div>
            <h3 className="text-[18px] font-bold text-[#14231A] mb-2">
              BookingStatus Badge (Dạng đặc có biểu tượng - 6 giá trị)
            </h3>
            <p className="text-[13px] text-[#4B5B50] mb-4">Nền nhạt, chữ đậm, luôn có nhãn tiếng Việt rõ ràng.</p>
            <div className="flex flex-wrap gap-3">
              {bookingStatuses.map((s) => (
                <div key={s} className="flex flex-col gap-1 items-start">
                  <span className="text-[11px] font-mono text-[#4B5B50]">{s}</span>
                  <StatusBadge status={s} />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#D6E2D9] pt-6">
            <h3 className="text-[18px] font-bold text-[#14231A] mb-2">
              PaymentStatus Badge (Dạng viền - 8 giá trị)
            </h3>
            <p className="text-[13px] text-[#4B5B50] mb-4">Nền trắng, viền mảnh để phân biệt với BookingStatus.</p>
            <div className="flex flex-wrap gap-3">
              {paymentStatuses.map((s) => (
                <div key={s} className="flex flex-col gap-1 items-start">
                  <span className="text-[11px] font-mono text-[#4B5B50]">{s}</span>
                  <PaymentBadge status={s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BUTTONS & INPUTS */}
      {activeTab === 'buttons' && (
        <div className="space-y-8 bg-white p-6 rounded-[16px] border border-[#D6E2D9]">
          <div>
            <h3 className="text-[18px] font-bold text-[#14231A] mb-4">Các biến thể Nút (Button)</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Nút Primary (#15803D)</Button>
              <Button variant="secondary">Nút Secondary</Button>
              <Button variant="danger">Nút Danger (#B91C1C)</Button>
              <Button variant="ghost">Nút Ghost</Button>
              <Button variant="primary" disabled>Bị vô hiệu</Button>
              <Button variant="primary" isLoading>Đang xử lý...</Button>
            </div>
          </div>

          <div className="border-t border-[#D6E2D9] pt-6 max-w-lg space-y-4">
            <h3 className="text-[18px] font-bold text-[#14231A] mb-2">Ô nhập liệu (Input & Textarea)</h3>
            <Input label="Họ và tên" placeholder="Nhập họ và tên..." />
            <Input label="Email đăng nhập" error="Email này đã được sử dụng" defaultValue="test@example.com" />
            <Input label="Số điện thoại" hint="Đầu số Việt Nam (10 số)" placeholder="0900 000 000" />
            <Textarea label="Yêu cầu riêng (tùy chọn)" placeholder="Nhập ghi chú hoặc địa điểm đón..." />
          </div>
        </div>
      )}

      {/* TAB 3: SLOTS & COUNTDOWN */}
      {activeTab === 'slots' && (
        <div className="space-y-8 bg-white p-6 rounded-[16px] border border-[#D6E2D9]">
          <div>
            <h3 className="text-[18px] font-bold text-[#14231A] mb-2">Khung giờ TimeSlot (4 trạng thái)</h3>
            <p className="text-[13px] text-[#4B5B50] mb-4">Trống (AVAILABLE), Đang giữ chỗ (HOLD), Đã có lịch (BUSY), Đang chọn (SELECTED)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              <TimeSlot
                startTime="09:00"
                endTime="12:00"
                status="AVAILABLE"
                isSelected={selectedSlot === 0}
                onClick={() => setSelectedSlot(0)}
              />
              <TimeSlot
                startTime="14:00"
                endTime="17:00"
                status="AVAILABLE"
                isSelected={selectedSlot === 1}
                onClick={() => setSelectedSlot(1)}
              />
              <TimeSlot
                startTime="18:00"
                endTime="20:00"
                status="HOLD"
                holdSecondsLeft={720}
              />
              <TimeSlot
                startTime="20:00"
                endTime="22:00"
                status="BUSY"
              />
            </div>
          </div>

          <div className="border-t border-[#D6E2D9] pt-6">
            <h3 className="text-[18px] font-bold text-[#14231A] mb-2">Đồng hồ đếm ngược (Countdown)</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Countdown seconds={900} label="Hạn cọc 15 phút" />
              <Countdown seconds={180} label="Sắp hết hạn (<5p)" />
              <Countdown seconds={86400} label="Phản hồi 24 giờ" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CARDS & SUMMARY */}
      {activeTab === 'cards' && (
        <div className="space-y-8">
          <div>
            <h3 className="text-[18px] font-bold text-[#14231A] mb-4">Tóm tắt thanh toán PaymentSummary (2 chế độ)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <span className="text-[13px] font-semibold text-[#15803D] mb-2 block">Chế độ Tourist (Ẩn phí sàn theo Q13)</span>
                <PaymentSummary total={600000} deposit={180000} remaining={420000} mode="tourist" />
              </div>
              <div>
                <span className="text-[13px] font-semibold text-[#14532D] mb-2 block">Chế độ Guide (Hiện phí 12% & Guide nhận)</span>
                <PaymentSummary
                  total={600000}
                  deposit={180000}
                  remaining={420000}
                  platformFee={72000}
                  guideReceives={528000}
                  mode="guide"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#D6E2D9] pt-6">
            <h3 className="text-[18px] font-bold text-[#14231A] mb-4">Guide Card & Booking Card</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <GuideCard
                id="u-guide-1"
                name="Lê Hoàng Nam"
                bio="Hướng dẫn viên địa phương tại Đà Nẵng với 5 năm kinh nghiệm. Thông thạo tiếng Anh và tiếng Việt."
                hourlyRate={200000}
                avgRating={4.8}
                totalReviews={42}
                areas={['Mỹ Khê', 'Bà Nà', 'Hội An']}
                isVerified={true}
              />

              <BookingCard
                booking={mockBookings[0]}
                guideName="Lê Hoàng Nam"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="space-y-8 bg-white p-6 rounded-[16px] border border-[#D6E2D9]">
          <div>
            <h3 className="text-[18px] font-bold text-[#14231A] mb-4">Hộp thoại xác nhận (Modal)</h3>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Mở Modal Thử Nghiệm
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Xác nhận hủy đơn đặt lịch"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Đóng
                  </Button>
                  <Button variant="danger" onClick={() => setIsModalOpen(false)}>
                    Xác nhận hủy đơn
                  </Button>
                </>
              }
            >
              <p className="text-[14px] text-[#4B5B50] mb-3">
                Bạn đang chuẩn bị hủy đơn đặt lịch. Thời gian còn lại đến ca là 30 giờ (Mức phạt 50% tiền cọc).
              </p>
              <div className="bg-[#FEE2E2] p-3 rounded-[8px] text-[13px] text-[#B91C1C]">
                Số tiền phạt: 90.000 đ • Số tiền hoàn: 90.000 đ
              </div>
            </Modal>
          </div>

          <div className="border-t border-[#D6E2D9] pt-6 space-y-4">
            <h3 className="text-[18px] font-bold text-[#14231A] mb-4">Các trạng thái danh sách chuẩn</h3>
            <EmptyState title="Không tìm thấy Guide phù hợp" description="Thử đổi từ khóa hoặc điều chỉnh khoảng giá lọc." />
            <LoadingState message="Đang tải danh sách đơn của bạn..." />
            <ErrorState message="Không thể kết nối đến dữ liệu. Vui lòng thử lại." onRetry={() => alert('Thử lại')} />
          </div>
        </div>
      )}
    </div>
  );
};

